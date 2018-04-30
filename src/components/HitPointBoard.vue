<template>
  <div>
    <v-tabs color="blue lighten-2" dark slider-color="yellow">
      <v-tab v-for="encounter in scenario.encounters" :key="scenario.encounters.indexOf(encounter)" ripple>
        {{encounter.name}}
      </v-tab>

      <v-tab-item v-for="encounter in scenario.encounters" :key="scenario.encounters.indexOf(encounter)">
        <!--編集用カード-->
        <v-card v-if="editMode" flat>
          <v-data-table :headers="edit_headers" :items="encounter.monsters" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">
                <v-checkbox primary hide-details v-model="props.item.selected"></v-checkbox>
              </td>
              <td class="text-xs-left">
                <v-text-field v-model="props.item.name" required></v-text-field>
              </td>
              <td class="text-xs-left">
                <v-text-field v-model.number="props.item.maxhp" type="number" required></v-text-field>
              </td>
            </template>
          </v-data-table>
          <div class="text-xs-center mt-3">
            <v-btn @click.native="openMonsterDialog(encounter)">モンスター追加</v-btn>
            <v-btn @click.native="deleteMonsters(encounter)">モンスター削除</v-btn>
            <v-btn @click.native="copyMonster(encounter)">モンスターコピー</v-btn>
            <v-btn @click.native="deleteEncounter(encounter)">遭遇削除</v-btn>
          </div>
        </v-card>
        <!--表示用カード-->
        <v-card v-if="!editMode" flat>
          <v-data-table :headers="view_headers" :items="encounter.monsters" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
              <td :class="classOf(props.item,'text-xs-left')">
                <v-checkbox primary hide-details v-model="props.item.selected"></v-checkbox>
              </td>
              <td :class="classOf(props.item,'text-xs-left')">
                {{ props.item.name }}</td>
              <td :class="classOf(props.item,'text-xs-left')">
                <v-text-field v-model.number="props.item.damage" type="number"></v-text-field>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <div class="text-xs-center mt-3">
      <v-btn v-if="editMode" @click.native="addEncounterDialog=true">遭遇追加</v-btn>
      <v-btn v-if="editMode" @click.native="saveScenalio()">シナリオ保存</v-btn>
      <v-btn @click.native="cancelScenalio()">シナリオを保存せず一覧に戻る</v-btn>
      <v-btn @click.native="editMode=!editMode">{{!editMode ? 'シナリオ編集' : 'シナリオ開始'}}</v-btn>
    </div>

    <!--遭遇追加ダイアログ-->
    <v-dialog v-model="addEncounterDialog" persistent max-width="480">
      <v-card color="grey lighten-4" flat>
        <v-card-text>
          <v-container fluid>
            <v-form ref="form">
              <v-text-field name="遭遇名" label="遭遇名" v-model="editedEncounter.name" required :rules="encounterNameRule" />
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="saveEncounter">追加</v-btn>
          <v-btn color="green darken-1" flat @click.native="cancelEncounter">キャンセル</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--モンスター追加ダイアログ-->
    <v-dialog v-model="addMonsterDialog" persistent max-width="480">
      <v-card color="grey lighten-4" flat>
        <v-card-text>
          <v-container fluid>
            <v-form ref="form">
              <v-text-field name="モンスター名" label="モンスター名" v-model="editedMonster.name" required :rules="monsterNameRule" />
              <v-text-field name="最大HP" label="最大HP" v-model.number="editedMonster.maxhp" type="number" required :rules="maxHpRule" />
              <v-text-field name="モンスターの数" label="モンスターの数" v-model.number="addMonsterCount" type="number" required :rules="addMonsterCountRule" />
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="addMonster">追加</v-btn>
          <v-btn color="green darken-1" flat @click.native="cancelMonster">キャンセル</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>

</template>

<style>

</style>

<script>
export default {
  props: {
    targetScenario: Object,
    default: {
      encounters: []
    }
    // required: true
  },
  data() {
    return {
      name: "HitPointBoard",
      editMode: false,
      addEncounterDialog: false,
      addMonsterDialog: false,
      addMonsterCount: 1,
      editedMonster: {
        name: "モンスター名",
        damage: 0,
        maxhp: 1,
        selected: false
      },
      editedEncounter: {
        name: "第x遭遇",
        monsters: []
      },
      selected: [],
      view_headers: [
        {
          text: "選択",
          value: "select"
        },
        {
          text: "モンスター名",
          value: "name"
        },
        {
          text: "ダメージ",
          value: "damage"
        }
      ],
      edit_headers: [
        {
          text: "選択",
          value: "select"
        },
        {
          text: "モンスター名",
          value: "name"
        },
        {
          text: "最大HP",
          value: "maxhp"
        }
      ],
      //ディープコピーはこうしないとダメ。なぜdeepcopyしないといけないのか？
      //see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
      scenario: JSON.parse(JSON.stringify(this.targetScenario)),
      //validation
      encounterNameRule: [v => v !== "" || "遭遇名は必須です"],
      monsterNameRule: [v => v !== "" || "モンスター名は必須です"],
      maxHpRule: [
        v => v !== "" || "最大HPは必須です", // 空文字を指定すると.numberをつけてもStringの空文字てきてしまうので、それをはじく。いまいち。
        v => !isNaN(v) || "最大HPは数値を入力してください",
        v => v > 0 || "最大HPは1以上の数値を入力してください"
      ],
      addMonsterCountRule: [
        v => v !== "" || "モンスター数は必須です", // 空文字を指定すると.numberをつけてもStringの空文字てきてしまうので、それをはじく。いまいち。
        v => !isNaN(v) || "モンスター数は数値を入力してください",
        v => v > 0 || "モンスター数は1以上の数値を入力してください"
      ]
    };
  },
  computed: {},
  methods: {
    deleteEncounter(encounter) {
      this.scenario.encounters.splice(
        this.scenario.encounters.indexOf(encounter),
        1
      );
    },
    saveEncounter() {
      //FIXME 全てのバリデーションが走ってしまうので、バリデーションが通る形にしないとこの判定に失敗する。
      //      FORM毎に画面を分けるか、this.$refs.form.validate()の仕様を調べなおす。
      if (!this.$refs.form.validate()) {
        // バリデーションエラーのためサブミットさせない
      } else {
        this.addEncounterDialog = false;
        this.scenario.encounters.push(Object.assign(this.editedEncounter));
        this._clear();
      }
    },
    cancelEncounter() {
      this.addEncounterDialog = false;
      this._clear();
    },
    openMonsterDialog(encounter) {
      this.editedEncounter = encounter;
      this.addMonsterDialog = true;
    },
    addMonster() {
      if (!this.$refs.form.validate()) {
        // バリデーションエラーのためサブミットさせない
      } else {
        for (let i = 0; i < this.addMonsterCount; i++) {
          let monster = JSON.parse(JSON.stringify(this.editedMonster));
          monster.name = monster.name + (i + 1);
          this.editedEncounter.monsters.push(monster);
        }
        this.addMonsterDialog = false;
        this._clear();
      }
    },
    cancelMonster() {
      this.addMonsterDialog = false;
      this._clear();
    },
    copyMonster(encounter) {
      let copiedMonsters = encounter.monsters.filter(monster => {
        return monster.selected === true;
      });
      copiedMonsters.forEach(element => {
        //ディープコピーはこうしないとダメ。
        //see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        let copied = JSON.parse(JSON.stringify(element));
        copied.selected = false;
        encounter.monsters.push(copied);
      });
    },
    deleteMonsters(encounter) {
      let copiedMonsters = encounter.monsters.filter(monster => {
        return monster.selected === true;
      });
      copiedMonsters.forEach(element => {
        let index = encounter.monsters.indexOf(element);
        encounter.monsters.splice(index, 1);
      });
    },
    //TODO
    saveScenalio() {
      this.$emit("save", this.scenario);
    },
    cancelScenalio() {
      this.$emit("cancel", this.scenario);
    },
    _clear() {
      this.editedEncounter = {
        name: "第ｘ遭遇",
        monsters: []
      };
      this.editedMonster = {
        name: "モンスター名",
        damage: 0,
        maxhp: 1,
        selected: false
      };
      this.addMonsterCount = 1;
    },
    classOf(monster, classes) {
      if (monster.damage >= monster.maxhp) {
        return classes + " black";
      } else if (monster.damage * 2 >= monster.maxhp) {
        return classes + " red";
      } else {
        return classes;
      }
    }
  }
};
</script>