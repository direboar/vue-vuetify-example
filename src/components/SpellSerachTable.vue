<template>
  <v-container fluid grid-list-md>
    <v-card>
      <v-card-title>
        <v-layout row wrap>
          <v-flex xs3>
            <file-drag @onFileRead="onReadFile"></file-drag>
          </v-flex>
          <v-flex xs3>
            <v-card>
              <file-download :data="downloaddata"></file-download>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-text-field append-icon="search" label="Input" single-line v-model="conditon.spellname" hint="呪文名" persistent-hint></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-select label="Select" :items="levels" v-model="conditon.levels" multiple max-height="400" hint="呪文レベル" persistent-hint></v-select>
          </v-flex>
          <v-flex xs3>
            <v-select label="Select" :items="classes" v-model="conditon.classes" multiple max-height="400" hint="クラス" persistent-hint></v-select>
          </v-flex>
          <v-flex xs3>
            <v-select :items="rituals" v-model="conditon.ritual" max-height="400" hint="儀式発動" persistent-hint></v-select>
          </v-flex>
          <v-flex xs3>
            <v-select label="Select" :items="components" v-model="conditon.components" multiple max-height="400" hint="構成要素" persistent-hint></v-select>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-data-table :headers="headers" :items="items" item-key="name" no-data-text="条件に一致する呪文がありません。">
        <template slot="items" slot-scope="props">
          <tr @click="props.expanded = !props.expanded">
            <td class="text-xs-right">{{ props.item.name }}</td>
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
      </v-data-table>
    </v-card>
  </v-container>
</template>

<style>

</style>

<script>
import spells from "@/model/spells";
import FileDrag from "@/components/FileDrag";
import FileDownload from "@/components/FileDownload";

export default {
  name: "SearchSpellTable",
  components: {
    FileDrag: FileDrag,
    FileDownload: FileDownload
  },
  data() {
    return {
      spelldata: [],
      conditon: {
        spellname: "",
        levels: [],
        classes: [],
        ritual: null,
        components: []
      },
      levels: [
        "Cantrip",
        "1st-level",
        "2nd-level",
        "3rd-level",
        "4th-level",
        "5th-level",
        "6th-level",
        "7th-level",
        "8th-level",
        "9th-level"
      ],
      //FIXME 変換テーブルを全体で共有。
      classes: [
        { text: "バード", value: "Bard" },
        { text: "クレリック", value: "Cleric" },
        { text: "ドルイド", value: "Druid" },
        { text: "パラディン", value: "Paladin" },
        { text: "レンジャー", value: "Ranger" },
        { text: "ソーサラー", value: "Sorcerer" },
        { text: "ウィザード", value: "Wizard" }
      ],
      rituals: [
        { text: "ー", value: null },
        { text: "可", value: "yes" },
        { text: "不可", value: "no" }
      ],
      components: [
        { text: "動作(S)", value: "S" },
        { text: "音声(V)", value: "V" },
        { text: "物質(M)", value: "M" }
      ],
      headers: [
        { text: "名前", value: "name", align: "right" },
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
  beforeMount() {
    this.spelldata = spells();
  },
  computed: {
    items() {
      return (
        this.spelldata
          // .slice(1, 10) //for debug.
          .filter(element => {
            if (!this.filterSpellname(element)) {
              return false;
            }
            if (!this.fliterRitual(element)) {
              return false;
            }
            if (!this.fliterLevels(element)) {
              return false;
            }
            if (!this.fliterClasses(element)) {
              return false;
            }
            if (!this.fliterComopnents(element)) {
              return false;
            }
            return true;
          })
      );
    },
    downloaddata() {
      return JSON.stringify(this.spelldata);
    }
  },
  methods: {
    fliterRitual(element) {
      if (this.conditon.ritual === null) {
        return true;
      } else {
        return element.ritual === this.conditon.ritual;
      }
    },

    fliterLevels(element) {
      if (this.conditon.levels.length === 0) {
        return true;
      } else {
        return this.conditon.levels.some(e => {
          return e === element.level;
        });
      }
    },
    fliterClasses(element) {
      if (this.conditon.classes.length === 0) {
        return true;
      } else {
        return this.conditon.classes.some(e => {
          return element.class.includes(e);
        });
      }
    },
    fliterComopnents(element) {
      if (this.conditon.components.length === 0) {
        return true;
      } else {
        //,間のスペースを削除し、,でスプリットする。
        var splittedComponents = element.components
          .replace(/ /g, "")
          .split(",");

        if (splittedComponents.length !== this.conditon.components.length) {
          return false;
        }
        for (const s of splittedComponents) {
          if (this.conditon.components.indexOf(s) === -1) {
            return false;
          }
        }
        return true;
      }
    },
    filterSpellname(element) {
      var trimed = this.conditon.spellname.trim();
      if (trimed === "") {
        return true;
      } else {
        //FIXME 前方一致か、includesかを指定できるようにしたい
        return element.name.includes(trimed);
        //return element.name.startsWith(trimed);
      }
    },
    onReadFile(files) {
      for (const file of files) {
        let fileReader = new FileReader();
        fileReader.onload = data => {
          let json = data.target.result;
          try {
            let spells = JSON.parse(json);
            this.spelldata = spells;
          } catch (e) {
            //FIXME
            alert(e);
          }
        };
        fileReader.readAsText(file);
      }
    },
    download() {
      var debug = { hello: "world" };
      var blob = new Blob([JSON.stringify(debug, null, 2)], {
        type: "application/octet-stream"
      });

      let downloadlink = this.$refs.downloadlink;
      downloadlink.href = URL.createObjectURL(blob);
      downloadlink.click();
    }
  }
};
</script>
