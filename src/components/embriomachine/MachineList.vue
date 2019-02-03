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
        </v-card>
        <machine-construct-panel
          :targetMachine.sync="this.dialogMachine"
          @save="saveMachine"
          @cancel="cancel"
          v-if="!showList"
        />
        <v-card>
          <ins
            class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-9097509632200457"
            data-ad-slot="5985300299"
            data-ad-format="auto"
          ></ins>
        </v-card>
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

export default {
  components: {
    MachineConstructPanel
  },
  mounted() {
    this.loadFromLocalStrage();
  },
  data() {
    return {
      showList: true,
      dialogMachine: new Machine(""),
      machines: [],
      //編集中の機体のindex
      editingMachineIndex: -1
    };
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
      this.editingMachineIndex = this.machines.indexOf(machine);
      this.showList = false;
    },
    deleteMachine(machine) {
      this.machines.splice(this.machines.indexOf(machine), 1);
      this.saveToLocalStrage(this.machines);
    },
    //callback.
    saveMachine(machine) {
      //新規作成
      machine.setLastUpdateTime(moment().toString());

      if (this.editingMachineIndex === -1) {
        this.machines.push(machine);
      } else {
        this.machines[this.editingMachineIndex] = machine;
      }
      this.dialogMachine = new Machine("");
      this.showList = true;
      this.editingMachineIndex = -1;
      this.saveToLocalStrage(this.machines);
    },
    cancel() {
      this.dialogMachine = new Machine("");
      this.showList = true;
      this.editingMachineIndex = -1;
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
    }
  }
};
</script>