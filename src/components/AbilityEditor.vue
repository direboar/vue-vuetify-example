<template>
  <div>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 md6 offset-md3>
          <v-card color="grey lighten-4" flat>
            <v-flex d-flex xs12>
              <v-alert color="error" icon="warning" value="true" v-model="hasPointByError">
                {{errorAlertMessage}}
              </v-alert>
            </v-flex>
            <v-flex d-flex xs12 md6>
              <v-card flat>
                <v-layout row wrap>
                  <v-flex d-flex xs12 md8 offset-md2></v-flex>
                  <v-flex d-flex xs12 md8 offset-md2>
                    <v-switch label="ポイントバイ" v-model="pointby" hide-details></v-switch>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 md6>
              <v-card flat>
                <v-card-text class="subheading">能力値ポイント ： {{displayAbilityPoint}} / 27</v-card-text>
              </v-card>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container :style="containerHeigth" class="scroll-y">
      <v-layout row wrap>
        <v-flex d-flex xs12 md6 offset-md3>
          <v-card color="grey lighten-4" flat>
            <!--cardでまとめると、その下のレイアウトがまとまるらしい-->
            <v-layout row wrap>
              <v-flex d-flex xs2>
                <v-card-text class="caption text-xs-right">能力</v-card-text>
              </v-flex>
              <v-flex d-flex xs3>
                <v-card-text class="caption text-xs-right">割当</v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="caption text-xs-right">種族/アイテム</v-card-text>
              </v-flex>
              <v-flex d-flex xs2>
                <v-card-text class="caption text-xs-right">合計</v-card-text>
              </v-flex>
              <v-flex d-flex xs2>
                <v-card-text class="caption text-xs-right">修正</v-card-text>
              </v-flex>
              <template v-for="(item,index) in items">
                <v-flex d-flex xs2 v-bind:key="index + '.1'">
                  <v-card-text class="ext-xs-right">{{item.type.name}}</v-card-text>
                </v-flex>
                <v-flex d-flex xs3 v-bind:key="index + '.2'">
                  <v-select 
                    content-class="caption text-xs-right"
                    v-bind:items="abilityselectlist"
                    v-model="item.assignment"
                    v-on:input="pointByAbility(item)"
                  ></v-select>
                </v-flex>
                <v-flex d-flex xs3 v-bind:key="index + '.3'">
                  <v-select
                    content-class="caption text-xs-right"
                    v-bind:items="racialmodifierlist"
                    v-model="item.racialmodifier"
                    v-on:input="updateRacialModifer(item)"
                  ></v-select>
                </v-flex>
                <v-flex d-flex xs2 v-bind:key="index + '.4'">
                  <v-card-text class="text-xs-right ">{{item.ability.value}}</v-card-text>
                </v-flex>
                <v-flex d-flex xs2 v-bind:key="index + '.5'">
                  <v-card-text class="text-xs-right ">{{item.ability.modifier}}</v-card-text>
                </v-flex>
              </template>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style>

</style>

<script>
import Ability from "@/model/ability";

import AbilityType from "@/model/abilitytype";

export default {
  data() {
    return {
      totalItems: 1, //ソート禁止

      headers: [
        {
          text: "能力値",

          sortable: false,

          class: ""
        },

        {
          text: "割当",

          sortable: false,

          class: ""
        },

        {
          text: "種族/アイテム",

          sortable: false,

          class: ""
        },

        {
          text: "合計",

          sortable: false,

          class: ""
        },

        {
          text: "修正値",

          sortable: false,

          class: ""
        }
      ],

      //入力業

      items: [
        {
          type: AbilityType.STRENGTH,

          assignment: 8, //ポイントバイで割り当てた能力値

          racialmodifier: 0, //種族ボーナス等の追加修正値

          ability: new Ability(AbilityType.STRENGTH, 8) //修正後の能力値エンティティ。
        },

        {
          type: AbilityType.DEXTALITY,

          assignment: 8,

          racialmodifier: 0,

          ability: new Ability(AbilityType.DEXTALITY, 8)
        },

        {
          type: AbilityType.CONSTITUTION,

          assignment: 8,

          racialmodifier: 0,

          ability: new Ability(AbilityType.CONSTITUTION, 8)
        },

        {
          type: AbilityType.INTELLIGENCE,

          assignment: 8,

          racialmodifier: 0,

          ability: new Ability(AbilityType.INTELLIGENCE, 8)
        },

        {
          type: AbilityType.WISDOM,

          assignment: 8,

          racialmodifier: 0,

          ability: new Ability(AbilityType.WISDOM, 8)
        },

        {
          type: AbilityType.CHARISMA,

          assignment: 8,

          racialmodifier: 0,

          ability: new Ability(AbilityType.CHARISMA, 8)
        }
      ],

      pointby: true, //ポイントバイで作成するかどうか

      abilityselectlist: [8, 9, 10, 11, 12, 13, 14, 15], //ポイントバイで購入できる能力値の範囲

      racialmodifierlist: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], //種族ボーナス等の追加修正値の選択範囲

      //アラート表示用

      showSuccessAlert: false,

      successAlertMessage: "",

      showErrorAlert: false,

      errorAlertMessage: "能力値ポイントを27ポイント以上使用しています。"
    };
  },

  computed: {
    //画面に表示する能力値ポイント。

    displayAbilityPoint() {
      return this.pointby === true ? this.abilitypoint : "-";
    },

    hasPointByError() {
      let current = this._calcuratePoint();

      if (this.pointby && current > 27) {
        return true;
      } else {
        return false;
      }
    },

    abilitypoint() {
      return 27 - this._calcuratePoint();
    },

    //能力値編集コンテナの最大の高さ（スクロールバー表示のため）

    containerHeigth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "max-height: 480px";

        case "sm":
          return "max-height: 480px";

        case "md":
          return "max-height: 640px";

        case "lg":
          return "max-height: 640px";

        case "xl":
          return "max-height: 640px";
      }
    }
  },

  methods: {
    //能力値ポイントを使って能力値を変更する

    pointByAbility(item) {
      if (this.pointby) {
        let next = this._calcuratePoint();

        // //能力値と能力値ポイントを更新する。

        item.ability.value = item.assignment + item.racialmodifier;

        this.abilitypoint = 27 - next;
      } else {
        //ポイントバイではない場合は、単純に更新する。

        item.ability.value = item.assignment + item.racialmodifier;
      }
    },

    //種族ボーナス等の追加修正を反映する。

    updateRacialModifer(item) {
      //チェック不要なので単純に更新する。

      item.ability.value = item.assignment + item.racialmodifier;
    },

    _calcuratePoint() {
      let total = 0;

      this.items.forEach(item => {
        total += Ability.calcPonit(item.assignment);
      });

      return total;
    },

    _initView() {
      this.showErrorAlert = false;
    }
  }
};
</script>
