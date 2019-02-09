<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="showList">
          <v-toolbar>
            <v-toolbar-title>エムブリオマシン機体作成リスト </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip>
              <v-btn
                slot="activator"
                icon
                @click.native="addMachine()"
              >
                <v-icon>add</v-icon>
              </v-btn>
              <span>機体を追加します。</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn
                v-if="this.user ==null"
                slot="activator"
                icon
                @click.native="login()"
              >
                <v-icon>fab fa-twitter-square</v-icon>ログイン
              </v-btn>
              <span>ログインします。</span>
            </v-tooltip>
            <v-tooltip>
              <v-btn
                v-if="this.user !=null"
                slot="activator"
                icon
                @click.native="logout()"
              >
                <img
                  v-if="this.user != null"
                  :src="this.user.photoURL"
                />
              </v-btn>
              <span>ログアウトします。</span>
            </v-tooltip>
          </v-toolbar>
          <v-container
            style="max-height: 800px; max-width: 100%"
            class="scroll-y"
            id="scroll-target"
            v-on:scroll="onScroll"
          >
            <v-list
              two-line
              subheader
            >
              <v-list-tile
                avatar
                v-for="(item,index) in machines"
                :key="index"
              >
                <v-list-tile-avatar>
                  <v-icon class="grey lighten-1 white--text">folder</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>作成者：{{item.userName}}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>最終更新日時: {{ item.lastUpdateTime }} </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                      icon
                      ripple
                      @click="editMachine(item)"
                    >
                      <v-icon color="grey lighten-1">edit</v-icon>
                    </v-btn>
                    <span>機体を編集します。</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                      icon
                      ripple
                      @click="deleteMachine(item)"
                    >
                      <v-icon color="grey lighten-1">delete</v-icon>
                    </v-btn>
                    <span>機体を削除します。（確認ダイアログは表示されません。）</span>
                  </v-tooltip>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider inset></v-divider>
            </v-list>
          </v-container>
        </v-card>
        <v-card>
          <ins
            class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-9097509632200457"
            data-ad-slot="5985300299"
            data-ad-format="auto"
          ></ins>
        </v-card>
        <machine-construct-panel
          :targetMachine.sync="this.dialogMachine"
          @save="saveMachine"
          @cancel="cancel"
          v-if="!showList"
        />
      </v-flex>
    </v-layout>

  </div>
</template>

<style>
</style>

<script>
import MachineConstructPanel from "@/components/embriomachine/MachineConstructPanel";
import Machine from "@/model/embriomachine/machine";
import moment from "moment";
import firebase from "firebase";

export default {
  components: {
    MachineConstructPanel
  },
  mounted() {
    //1.firebaseのデータを読み込む
    this.load = true;
    //2.google adsenceのサイズ調整
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    //3.認証状態のフックを設定
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });
  },
  data() {
    return {
      showList: true,
      dialogMachine: new Machine(""),
      machines: [],
      editingMachineId: null,
      seek: false,
      load: false,
      user: null
    };
  },
  watch: {
    seek(val) {
      if (val === true) {
        this.fetchNextPageFromFirebase(this.machines[this.machines.length - 1]);
      }
    },
    load(val) {
      if (val === true) {
        this.loadFromFirebase();
      }
    }
  },
  computed: {},
  methods: {
    //新しい機体を追加
    addMachine() {
      this.dialogMachine = new Machine("");
      this.showList = false;
    },
    editMachine(machine) {
      this.dialogMachine = machine;
      this.editingMachineId = machine.id;
      this.showList = false;
    },
    deleteMachine(machine) {
      this.deleteFromFirebase(machine);
    },
    //callback.
    saveMachine(machine) {
      if (this.editingMachineId === null) {
        this.saveToFirebase(machine);
      } else {
        this.updateToFirebase(this.editingMachineId, machine);
      }
      this.dialogMachine = new Machine("");
      this.showList = true;
      this.editingMachineId = null;
    },
    cancel() {
      this.dialogMachine = new Machine("");
      this.showList = true;
      this.editingMachineId = null;
    },

    loadFromFirebase() {
      this.machines = [];

      var query = firebase
        .database()
        .ref("embriomachine")
        .orderByChild("orderBy")
        .limitToFirst(12);

      query.once("value").then(snapshot => {
        snapshot.forEach(childSnapshot => {
          let key = childSnapshot.key;
          let childData = childSnapshot.val();
          this.machines.push(
            Machine.fromRealtimeDatabaseObject(key, childData)
          );
        });
        this.load = false;
      });
    },

    fetchNextPageFromFirebase(lastSearchedMachine) {
      var query = firebase
        .database()
        .ref("embriomachine")
        .orderByChild("orderBy")
        .startAt(lastSearchedMachine.orderBy)
        .limitToFirst(13);

      query.once("value").then(snapshot => {
        snapshot.forEach(childSnapshot => {
          let key = childSnapshot.key;
          let childData = childSnapshot.val();

          //最終行のデータも取得されてしまうため、最終更新時間が同じデータは飛ばす。
          if (!(key === lastSearchedMachine.id)) {
            this.machines.push(
              Machine.fromRealtimeDatabaseObject(key, childData)
            );
          }
        });
        this.seek = false;
      });
    },

    saveToFirebase(machine) {
      alert(JSON.stringify(this.user));
      let userId = this.user === null ? "anonimous" : this.user.uid;
      let userName = this.user === null ? "anonimous" : this.user.displayName;

      machine.setUserIdAndUserName(userId, userName);
      machine.setLastUpdateTime(firebase.database.ServerValue.TIMESTAMP);

      let updated = firebase
        .database()
        .ref("embriomachine")
        .push(machine.toRealtimeDatabaseObject());

      let updatedQuery = firebase.database().ref(updated);

      updatedQuery.once("value").then(snapshot => {
        let updated = snapshot.val();

        updatedQuery
          .update({ orderBy: Machine.getOrderBy(updated) })
          .then(() => {
            this.load = true;
          });
      });

      //FIXME error
    },

    updateToFirebase(id, machine) {
      machine.setLastUpdateTime(firebase.database.ServerValue.TIMESTAMP);
      firebase
        .database()
        .ref("embriomachine/" + id)
        .set(machine.toRealtimeDatabaseObject())
        .then(() => {
          this.load = true;
        });
    },

    deleteFromFirebase(machine) {
      firebase
        .database()
        .ref("embriomachine/" + machine.id)
        .remove()
        .then(() => {
          this.load = true;
        });
    },

    onScroll(event) {
      if (
        event.target.scrollTop + event.target.offsetHeight >=
        event.target.scrollHeight - 40
      ) {
        this.seek = true;
      }
    },
    login() {
      var provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().languageCode = "jp";
      firebase.auth().signInWithRedirect(provider);
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.user = null;
        });
      // .catch(function(error, error2) {
      //   alert(JSON.stringify(error));
      //   alert(JSON.stringify(error2));
      // });
    }
  }
};
</script>