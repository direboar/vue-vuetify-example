<template>
  <div>
    <v-container fluid grid-list-md>
      <v-card>
        <v-card-title>
          <v-layout row wrap>
            <v-flex xs2>
              <file-upload-button @onFileRead="onFileRead" />
            </v-flex>
            <v-flex xs2>
              <v-card>
                <file-download :data="downloaddata"></file-download>
              </v-card>
            </v-flex>
            <v-flex xs2>
              <v-card>
                <v-btn @click="addSpell">追加</v-btn>
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
              <v-select :items="conditonRituals" v-model="conditon.ritual" max-height="400" hint="儀式発動" persistent-hint></v-select>
            </v-flex>
            <v-flex xs3>
              <v-select label="Select" :items="components" v-model="conditon.components" multiple max-height="400" hint="構成要素" persistent-hint></v-select>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-data-table :headers="headers" :items="items" item-key="name" no-data-text="条件に一致する呪文がありません。">
          <template slot="items" slot-scope="props">
            <tr @click="clickCell(props)">
              <td class="text-xs-right">{{ props.item.name }}({{props.item.page}})</td>
              <td class="text-xs-right">{{ formatArray(props.item.class,classes)}}</td>
              <td class="text-xs-right">{{ props.item.level }}</td>
              <td class="text-xs-right">{{ formatArray(props.item.components,components) }}</td>
              <td class="text-xs-right">{{ props.item.casting_time }}</td>
              <td class="text-xs-right">{{ props.item.duration }}</td>
              <td class="text-xs-right">{{ format(props.item.concentration,concentration) }}</td>
              <td class="text-xs-right">{{ props.item.range }}</td>
              <td class="text-xs-right">{{ format(props.item.ritual,conditonRituals) }}</td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <v-card>
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
                <v-flex xs2>
                  <v-subheader class="body-2">詠唱時間</v-subheader>
                </v-flex>
                <v-flex xs1>
                  <v-btn color="primary" fab small dark @click="editSpell(props.item)">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs3>
                  <v-card-text class="body-2">{{ formatArray(props.item.class,classes)}}</v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text class="body-2">{{ props.item.level }}</v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text class="body-2">{{ formatArray(props.item.components,components) }} {{props.item.materialdeteil}}</v-card-text>
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
                  <v-card-text class="body-2">{{ format(props.item.concentration,concentration) }}</v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text class="body-2">{{ props.item.range }}</v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text class="body-2">{{ format(props.item.ritual,conditonRituals) }}</v-card-text>
                </v-flex>
                <v-flex xs12>
                  <v-divider/>
                  <v-card-text class="body-2">
                    <span style="white-space: pre-wrap;" v-html="props.item.desc"></span>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-card>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <spell-edit-dialog :showEditDialog.sync="showEditDialog" v-bind:editedspell="editTargetSpell" @save="save" @remove="remove" />
  </div>
</template>

<style>

</style>
</style>

<script>
import spells from "@/model/spells";
import constants from "@/model/constants";

import FileUploadButton from "@/components/FileUploadButton";
import FileDownload from "@/components/FileDownload";
import SpellEditDialog from "@/components/SpellEditDialog";

export default {
  name: "SearchSpellTable",
  components: {
    FileUploadButton: FileUploadButton,
    FileDownload: FileDownload,
    SpellEditDialog: SpellEditDialog
  },
  data() {
    return {
      //管理している呪文データ。
      spelldata: [],
      //検索条件
      conditon: {
        spellname: "",
        levels: [],
        classes: [],
        ritual: null,
        components: []
      },
      //検索ダイアログに出すラベル管理。
      levels: constants.levels,
      classes: constants.classes,
      components: constants.components,
      concentration: constants.concentration,
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
      ],
      conditonRituals: [
        { text: "ー", value: null },
        { text: "可", value: "yes" },
        { text: "不可", value: "no" }
      ],
      //編集ダイアログ表示フラグ
      showEditDialog: false,
      //編集ダイアログに渡した呪文データのポインタ。
      editTargetSpell: null
    };
  },
  beforeMount() {
    //初期表示用の呪文データを取得する。
    this.spelldata = spells();
  },
  computed: {
    //データテーブルに表示する呪文一覧を絞り込み返却する。
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
    //ダウンロード時の文字列を返却する。
    downloaddata() {
      return JSON.stringify(this.spelldata);
    }
  },
  methods: {
    //検索条件に従い、フィルタを行うメソッド。computedの中で呼び出されるのみで、テンプレートから直接呼ばれることはない。
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
    //FIXME バグフィックス。
    fliterComopnents(element) {
      if (this.conditon.components.length === 0) {
        return true;
      } else {
        if (element.components.length !== this.conditon.components.length) {
          return false;
        }
        for (const s of element.components) {
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
    //ファイル読み込み時の処理。ファイルを読み込み、JSONデータを解析の上、呪文データを置き換える。
    onFileRead(files) {
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

    //テーブルセルをクリック時、expandを表示する。
    clickCell(props) {
      props.expanded = !props.expanded;
    },

    //expandで呪文編集を選択時、呪文編集ダイアログを上げる。
    editSpell(spell) {
      this.editTargetSpell = spell;
      this.showEditDialog = true;
    },

    //呪文追加ボタンを押した際、追加用のダイアログを上げる。
    addSpell() {
      this.editTargetSpell = null;
      this.showEditDialog = true;
    },

    // //呪文編集・追加ダイアログ上で呪文を保存する。編集時は呪文データを上書きする。新規追加の場合は追加する。
    save(result) {
      if (this.editTargetSpell == null) {
        this.spelldata.push(result);
        this.showEditDialog = false;
      } else {
        Object.assign(this.editTargetSpell, result);
        this.showEditDialog = false;
        this.editTargetSpell = null;
      }
    },

    // //呪文編集・追加ダイアログ上で呪文を削除する。編集中の呪文データを消去する。
    remove() {
      this.showEditDialog = false;
      let index = this.spelldata.indexOf(this.editTargetSpell);
      this.spelldata.splice(index, 1);
      this.editTargetSpell = null;
    },

    //値を表示用の文字列にマッピングする。val:値 table：キーがvalueｍ表示の値がtextであるオブジェクトのリスト。
    format(val, table) {
      var retVal = val;
      // alert(val);
      table.forEach(element => {
        // alert(element.value);
        // alert(val);
        if (element.value === val) {
          retVal = element.text;
          return;
        }
      });
      return retVal;
    },

    //配列のデータを表示用文字列にマッピングする。
    formatArray(val, table) {
      var array = [];
      val.forEach(element => {
        array.push(this.format(element, table));
      });
      return array.join(",");
    }
  }
};
</script>
