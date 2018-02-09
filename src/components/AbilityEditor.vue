<template>
  <v-container fluid grid-list-md>
    <v-card color="grey lighten-4" flat>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <v-data-table v-bind:headers="headers" :items="items" hide-actions :total-items="totalItems" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="text-xs-right">{{props.item.type.name}}</td>
              <td>
                <v-select
                  v-bind:items="abilityselectlist"
                  v-model="props.item.assignment"
                  v-on:input="input(props.item)"
                ></v-select>
              </td>
              <td class="text-xs-right">
                <v-select
                  v-bind:items="racialmodifierlist"
                  v-model="props.item.racialmodifier"
                  v-on:input="input(props.item)"
                ></v-select>
              </td>
              <td class="text-xs-right">{{props.item.ability.value}}</td>
              <td class="text-xs-right">{{props.item.ability.modifier}}</td>
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
      totalItems: 1,
      headers: [
        { text: "能力値", sortable: false },
        { text: "割当", sortable: false },
        { text: "種族修正", sortable: false },
        { text: "合計", sortable: false },
        { text: "修正値", sortable: false }
      ],
      items: [
        {
          type: AbilityType.STRENGTH,
          assignment: 8,
          racialmodifier: 0,
          ability: new Ability(AbilityType.STRENGTH, 8)
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
      abilityselectlist: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      racialmodifierlist: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  methods: {
    xxx() {
      alert();
    },
    input(item) {
      item.ability.value = item.assignment + item.racialmodifier;
    }
  }
};
</script>

