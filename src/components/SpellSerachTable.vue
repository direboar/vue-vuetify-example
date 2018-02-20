<template>
  <v-card>
    <v-card-title>
      TODO（なんか書く）
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" :search="search" item-key="name">
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.class }}</td>
          <td class="text-xs-right">{{ props.item.level }}</td>
          <td class="text-xs-right">{{ props.item.components }}</td>
          <td class="text-xs-right">{{ props.item.casting_time }}</td>
          <td class="text-xs-right">{{ props.item.duration }}</td>
          <td class="text-xs-right">{{ props.item.concentration }}</td>
          <td class="text-xs-right">{{ props.item.range }}</td>
          <td class="text-xs-right">{{ props.item.ritual }}</td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs3>
                <v-subheader class="body-2">クラス</v-subheader>
              </v-flex>
              <v-flex xs3>
                <v-subheader class="body-2">レベル</v-subheader>
              </v-flex>
              <v-flex xs3>
                <v-subheader class="body-2">構成要素</v-subheader>
              </v-flex>
              <v-flex xs3>
                <v-subheader class="body-2">詠唱時間</v-subheader>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="body-2">{{ props.item.class }}</v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="body-2">{{ props.item.level }}</v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="body-2">{{ props.item.components }}</v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="body-2">{{ props.item.casting_time }}</v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-subheader class="body-2">持続時間</v-subheader>
              </v-flex>
              <v-flex xs3>
                <v-subheader class="body-2">集中</v-subheader>
              </v-flex>
              <v-flex xs3>
                <v-subheader class="body-2">距離／エリア</v-subheader>
              </v-flex>
              <v-flex xs3>
                <v-subheader class="body-2">儀式</v-subheader>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="body-2">{{ props.item.duration }}</v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="body-2">{{ props.item.concentration }}</v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="body-2">{{ props.item.range }}</v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="body-2">{{ props.item.ritual }}</v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-divider/>
                <v-card-text class="body-2">
                  <span v-html="props.item.desc"></span>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<style>

</style>

<script>
// "name":"Abi-Dalzim's Horrid Wilting",
// "desc":"<p>You draw the moisture from every creature in a 30-foot cube centered on a point you choose within range. Each creature in that area must make a Constitution saving throw. Constructs and undead aren't affected, and plants and water elementals make this saving throw with disadvantage. A creature takes 10d8 necrotic damage on a failed save, or half as much damage on a successful one.You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage.</p><p>This spells damage increases by 1d6 when you reach 5th Level (2d6), 11th level (3d6) and 17th level (4d6).</p>",
// "page":"ee pc 15",
// "range":"150 feet",
// "components":"V, S, M",
// "material":"A bit of sponge.",
// "ritual":"no",
// "duration":"Instantaneous",
// "concentration":"no",
// "casting_time":"1 action",
// "level":"8th-level",
// "school":"Necromancy",
// "class":"Sorcerer, Wizard"

import spells from "@/model/spells";

export default {
  name: "SearchSpellTable",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "名前",
          align: "left",
          value: "name"
        },
        { text: "クラス", value: "class", align: "right" },
        { text: "レベル", value: "level", align: "right" },
        { text: "構成要素", value: "components", align: "right" },
        { text: "詠唱時間", value: "casting_time", align: "right" },
        { text: "持続時間", value: "duration", align: "right" },
        { text: "集中", value: "concentration", align: "right" },
        { text: "距離／エリア", value: "range", align: "right" },
        { text: "儀式", value: "ritual", align: "right" }
      ]
    };
  },
  computed: {
    items() {
      return spells();
    }
  },
  methods: {
    click(props) {
      alert(JSON.stringify(props));
    }
  }
};
</script>
