<template>
  <v-container fluid grid-list-md>
    <v-card color="grey lighten-4" flat>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <v-alert color="success" icon="check_circle" v-model="showSuccessAlert">
            {{errorAlertMessage}}
          </v-alert>
          <v-alert color="error" icon="warning" value="true" v-model="hasPointByError">
            {{errorAlertMessage}}
          </v-alert>
          <v-card>
            <v-layout row wrap>
              <v-flex xs6>
                <v-radio-group column v-model="pointby">
                  <v-radio label="能力値ポイント" :value=true v-on:change="changeToPointBy"></v-radio> <!--数値以外の型をバインドしたい場合はv-bindを使う-->
                  <v-radio label="ランダム/固定割振" :value=false ></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="subheading">能力値ポイント ： {{displayAbilityPoint}} / 27</v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
          <v-data-table v-bind:headers="headers" :items="items" hide-actions :total-items="totalItems" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="text-xs-right subheading">{{props.item.type.name}}</td>
              <td>
                <v-select
                  v-bind:items="abilityselectlist"
                  v-model="props.item.assignment"
                  v-on:input="pointByAbility(props.item)"
                ></v-select>
              </td>
              <td class="text-xs-right">
                <v-select
                  v-bind:items="racialmodifierlist"
                  v-model="props.item.racialmodifier"
                  v-on:input="updateRacialModifer(props.item)"
                ></v-select>
              </td>
              <td class="text-xs-right subheading">{{props.item.ability.value}}</td>
              <td class="text-xs-right subheading">{{props.item.ability.modifier}}</td>
           </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
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
        { text: "能力値", sortable: false, class: "subheading" },
        { text: "割当", sortable: false, class: "subheading" },
        { text: "種族/アイテム", sortable: false, class: "subheading" },
        { text: "合計", sortable: false, class: "subheading" },
        { text: "修正値", sortable: false, class: "subheading" }
      ],
      //入力業
      items: [
        {
          type: AbilityType.STRENGTH,
          assignment: 8,      //ポイントバイで割り当てた能力値
          racialmodifier: 0,  //種族ボーナス等の追加修正値
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
      abilitypoint: 27, //能力値ポイント
      pointby: true,    //ポイントバイで作成するかどうか
      abilityselectlist: [8, 9, 10, 11, 12, 13, 14, 15],  //ポイントバイで購入できる能力値の範囲
      racialmodifierlist: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], //種族ボーナス等の追加修正値の選択範囲

      //アラート表示用
      showSuccessAlert : false,
      successAlertMessage : "",
      showErrorAlert : false,
      errorAlertMessage : "能力値ポイントを27ポイント以上使用しています。",
    }
  },
  computed : {
    //画面に表示する能力値ポイント。
    displayAbilityPoint(){
      return this.pointby === true ? this.abilitypoint : "-"
    },

    hasPointByError(){
      let current = this._calcurateNext();
      if(this.pointby && current > 27){
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    //能力値ポイントを使って能力値を変更する
    pointByAbility(item) {
      if (this.pointby) {
        // let current = this._calcurateCurrent()
        let next = this._calcurateNext();
        // //能力値と能力値ポイントを更新する。
        item.ability.value = item.assignment + item.racialmodifier;
        this.abilitypoint = 27-next
      }else{
        //ポイントバイではない場合は、単純に更新する。
        item.ability.value = item.assignment + item.racialmodifier;
      }
    },
    //種族ボーナス等の追加修正を反映する。
    updateRacialModifer(item){
        //チェック不要なので単純に更新する。
        item.ability.value = item.assignment + item.racialmodifier;
    },

    //ポイントバイ方式に変更した際のチェックを行う。
    changeToPointBy(){
        // let current = this._calcurateNext();
        // if(current > 27){
        //   this.showErrorAlert = true
        // }
        // this.abilitypoint = 27-current
    },
    //現在割当済みの能力値から、能力値ポイントを算出する。（前回確定した能力値情報は、item.abilityに保管している）
    // _calcurateCurrent() {
    //   let total = 0;
    //   this.items.forEach(item => {
    //     total += Ability.calcPonit(item.ability.value);
    //   });
    //   return total;
    // },
    //画面に入力された能力値ごとの割当の値から、変更後の能力値ポイントを算出する。
    _calcurateNext() {
      let total = 0;
      this.items.forEach(item => {
        total += Ability.calcPonit(item.assignment);
      });
      return total;
    },
    _initView(){
      this.showErrorAlert = false
    }
  }
};
</script>
