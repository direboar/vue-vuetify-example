<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="showList">
          <v-toolbar>
            <v-toolbar-title>エムブリオマシン機体作成リスト</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <v-btn
                slot="activator"
                icon
                @click.native="addMachine()"
              >
                <v-icon>add</v-icon>
              </v-btn>
              <span>機体を追加します。</span>
            </v-tooltip>
          </v-toolbar>
          <v-container
            style="max-height: 800px"
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
                  <v-list-tile-sub-title>最終更新日時: {{ item.lastUpdateTime.toDate() }} </v-list-tile-sub-title>
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
          <v-card>
            <v-pagination
              length="99"
              total-visible="5"
              model="1"
            ></v-pagination>
          </v-card>
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
    //this.loadFromLocalStrage();
    this.loadFromFirebase();
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  },
  data() {
    return {
      showList: true,
      dialogMachine: new Machine(""),
      machines: [],
      // //編集中の機体のindex
      // editingMachineIndex: -1
      editingMachineId: null,
      seek: false
    };
  },
  watch: {
    seek(val) {
      if (val === true) {
        this.fetchNextPageFromFirebase(
          this.machines[this.machines.length - 1].lastUpdateTime
        );
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
      //this.editingMachineIndex = this.machines.indexOf(machine);
      this.editingMachineId = machine.id;
      this.showList = false;
    },
    deleteMachine(machine) {
      // this.machines.splice(this.machines.indexOf(machine), 1);
      // this.saveToLocalStrage(this.machines);
      this.deleteFromFirebase(machine);
    },
    //callback.
    saveMachine(machine) {
      //新規作成
      //machine.setLastUpdateTime(moment().toString());

      //      if (this.editingMachineIndex === -1) {
      if (this.editingMachineId === null) {
        // this.machines.push(machine);
        this.saveToFirebase(machine);
      } else {
        this.updateToFirebase(this.editingMachineId, machine);
        // alert("更新は未サポート");
        //this.machines[this.editingMachineIndex] = machine;
      }
      this.dialogMachine = new Machine("");
      this.showList = true;
      this.editingMachineId = null;
      //this.editingMachineIndex = -1;
      //this.saveToLocalStrage(this.machines);
    },
    cancel() {
      this.dialogMachine = new Machine("");
      this.showList = true;
      this.editingMachineId = null;
      //this.editingMachineIndex = -1;
    },

    loadFromFirebase() {
      let db = firebase.firestore();
      this.machines = [];
      db.collection("embriomachine")
        .orderBy("lastUpdateTime", "desc")
        .limit(12)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // let data = doc.data();
            // this.machines.push(Machine.fromFirebaseObject(data));
            this.machines.push(Machine.fromFirebaseObject(doc));
          });
        });
      //FIXME error
    },
    fetchNextPageFromFirebase(lastUpdateTime) {
      let db = firebase.firestore();
      db.collection("embriomachine")
        .where("lastUpdateTime", "<", lastUpdateTime)
        .orderBy("lastUpdateTime", "desc")
        .limit(10)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.machines.push(Machine.fromFirebaseObject(doc));
          });
          this.seek = false;
        });
      //FIXME error
    },
    saveToFirebase(machine) {
      let db = firebase.firestore();
      machine.setLastUpdateTime(
        firebase.firestore.FieldValue.serverTimestamp()
      );
      db.collection("embriomachine").add(
        machine.toFirebaseObject()
        // data: JSON.stringify(machine)
      );
      this.loadFromFirebase();
      //FIXME error
    },

    updateToFirebase(id, machine) {
      let db = firebase.firestore();
      machine.setLastUpdateTime(
        firebase.firestore.FieldValue.serverTimestamp()
      );
      db.collection("embriomachine")
        .doc(id)
        .set(machine.toFirebaseObject());
      this.loadFromFirebase();
      //FIXME error
    },

    deleteFromFirebase(machine) {
      let db = firebase.firestore();
      db.collection("embriomachine")
        .doc(machine.id)
        .delete();
      this.loadFromFirebase();
    },

    loadFromLocalStrage() {
      let scenariosFromStorage = localStorage.getItem(
        "embriomachine.constructon.machines"
      );
      //ストレージに登録されていればそのデータを復元。
      if (scenariosFromStorage != undefined && scenariosFromStorage != null) {
        let objects = JSON.parse(scenariosFromStorage);
        let castedMachines = Machine.assigns(objects);
        this.machines = castedMachines;
      } else {
        let newMachines = [];
        this.saveToLocalStrage(newMachines);
        this.machines = newMachines;
      }
    },
    saveToLocalStrage(machines) {
      localStorage.setItem(
        "embriomachine.constructon.machines",
        JSON.stringify(machines)
      );
    },
    deleteFromLocalStorage() {
      localStorage.removeItem("embriomachine.constructon.machines");
    },

    onScroll(event) {
      if (
        event.target.scrollTop + event.target.offsetHeight >=
        event.target.scrollHeight - 20
      ) {
        this.seek = true;
      }
    }
  }
};
</script>