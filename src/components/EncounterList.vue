<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>シナリオリスト</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <v-btn slot="activator" icon @click.native="addScenarioDialog=true">
                <v-icon>add</v-icon>
              </v-btn>
              <span>シナリオを追加します。</span>
            </v-tooltip>
          </v-toolbar>
        </v-card>
        <v-card>
          <!-- TODO 遭遇リストとHPボードのデータ受け渡しをどうするか -->
          <!-- TODO 保存の責務は、HPボード側に移動 -->
          <HitPointBoard :targetScenario="this.editedScenalio" @save="saveScenalio" @cancel="cancelEditScenalio" v-if="!isEncountrList">
          </HitPointBoard>
          <v-list two-line subheader v-if="isEncountrList">
            <v-list-tile avatar v-for="item in scenarios" :key="item.title">
              <v-list-tile-avatar>
                <v-icon class="grey lighten-1 white--text">folder</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                <v-list-tile-sub-title>最終更新日時: {{ item.updated }} </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-tooltip top>
                  <v-btn slot="activator" icon ripple @click="editScenailo(item)">
                    <v-icon color="grey lighten-1">edit</v-icon>
                  </v-btn>
                  <span>シナリオを編集します。</span>
                </v-tooltip>
                <v-tooltip top>
                  <v-btn slot="activator" icon ripple @click="deleteScenalio(item)">
                    <v-icon color="grey lighten-1">delete</v-icon>
                  </v-btn>
                  <span>シナリオを削除します。（確認ダイアログは表示されません。）</span>
                </v-tooltip>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider inset></v-divider>
          </v-list>
        </v-card>
        <v-card>
          <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9097509632200457" data-ad-slot="5985300299" data-ad-format="auto"></ins>
        </v-card>
      </v-flex>
    </v-layout>

    <!--シナリオ追加ダイアログ-->
    <v-dialog v-model="addScenarioDialog" persistent max-width="480">
      <v-card color="grey lighten-4" flat>
        <v-card-text>
          <v-container fluid>
            <v-form ref="form">
              <v-text-field name="シナリオ名" label="シナリオ名" v-model="newScenario.name" required :rules="scenalioNameRule" />
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="addScenalio">追加</v-btn>
          <v-btn color="green darken-1" flat @click.native="cancelAddScenalio">キャンセル</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>

</style>

<script>
import HitPointBoard from "@/components/HitPointBoard";
import moment from "moment";

export default {
  components: {
    HitPointBoard
  },
  mounted() {
    this.loadFromLocalStrage();
  },
  data() {
    return {
      isEncountrList: true,
      addScenarioDialog: false,
      newScenario: {
        name: "",
        created: "",
        updated: "",
        encounters: []
      },
      scenarios: [],
      //validation
      scenalioNameRule: [v => v !== "" || "シナリオ名は必須です"]
    };
  },
  computed: {},
  methods: {
    addScenalio() {
      if (!this.$refs.form.validate()) {
        // バリデーションエラーのためサブミットさせない
      } else {
        //ディープコピーはこうしないとダメ。
        //see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        let copied = JSON.parse(JSON.stringify(this.newScenario));
        this._updateLocalTimestamp(copied);
        this.scenarios.push(copied);
        this.saveScenariosToLocalStrage(this.scenarios);
        this.addScenarioDialog = false;
        this._clear();
      }
    },
    cancelAddScenalio() {
      this.addScenarioDialog = false;
      this._clear();
    },
    deleteScenalio(scenalio) {
      let index = this.scenarios.indexOf(scenalio);
      this.scenarios.splice(index, 1);
      this.saveScenariosToLocalStrage(this.scenarios);
    },
    deleteAllScenario() {
      this.deleteScenarioFromLocalStorage();
      this.scenarios = [];
    },
    editScenailo(scenario) {
      this.editedScenalio = scenario;
      this.isEncountrList = false;
    },
    saveScenalio(scenario) {
      let index = this.scenarios.indexOf(this.editedScenalio);
      this.scenarios[index] = Object.assign(scenario);
      this._updateLocalTimestamp(this.scenarios[index]);
      this.saveScenariosToLocalStrage(this.scenarios);
      this.isEncountrList = true;
    },
    cancelEditScenalio(scenario) {
      this.isEncountrList = true;
    },
    loadFromLocalStrage() {
      let scenariosFromStorage = localStorage.getItem("dndapp.scenarios");
      // alert(JSON.stringify(scenariosFromStorage));
      //ストレージに登録されていればそのデータを復元。
      if (scenariosFromStorage != undefined && scenariosFromStorage != null) {
        this.scenarios = JSON.parse(scenariosFromStorage);
      } else {
        let newScenarios = [];
        this.saveScenariosToLocalStrage(newScenarios);
        this.scenarios = newScenarios;
      }
    },
    saveScenariosToLocalStrage(scenarios) {
      localStorage.setItem("dndapp.scenarios", JSON.stringify(scenarios));
    },
    deleteScenarioFromLocalStorage() {
      localStorage.removeItem("dndapp.scenarios");
    },
    _updateLocalTimestamp(scenario) {
      scenario.updated = moment().toString();
    },
    _clear() {
      this.newScenario = {
        name: "",
        created: "",
        updated: "",
        encounters: []
      };
    }
  }
};
</script>