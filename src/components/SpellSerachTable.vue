<template>
  <div>
    <v-container fluid grid-list-md>
      <v-card>
        <v-card-title>
          <v-layout row wrap>
            <v-flex xs6 md2>
              <file-upload-button message="ファイル選択" @onFileRead="onFileRead" />
            </v-flex>
            <!--TODO ひとまずモバイルでは隠す-->
            <v-flex xs2 class="hidden-sm-and-down">
              <v-card>
                <file-download :data="downloaddata"></file-download>
              </v-card>
            </v-flex>
            <!--TODO ひとまずモバイルでは隠す-->
            <v-flex xs2 class="hidden-sm-and-down">
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
        <!--非モバイル-->
        <v-data-table class="hidden-xs-only" :headers="headers" :items="items" item-key="name" no-data-text="条件に一致する呪文がありません。">
          <template slot="items" slot-scope="props">
            <tr @click="clickCell(props.item)">
              <td class="text-xs-left">{{ formatSpellName(props.item) }} </td>
              <td class="text-xs-left">{{ props.item.level}}</td>
              <td class="text-xs-left">{{ formatArray(props.item.components,components) }}</td>
              <td class="text-xs-left nowrap">{{ props.item.casting_time }}</td>
              <td class="text-xs-left">{{ formatDuration(props.item) }}</td>
              <td class="text-xs-left">{{ props.item.range }}</td>
            </tr>
          </template>
        </v-data-table>
        <!--モバイル-->
        <v-list class="hidden-sm-and-up" two-line>
          <v-data-iterator content-tag="v-card" :items="items">
            <v-list-tile avatar slot="item" slot-scope="props" @click="clickCell(props.item)">
              <v-list-tile-avatar>
                <v-icon class="grey lighten-1 white--text">folder</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{props.item.name}} </v-list-tile-title>
                <v-list-tile-sub-title>{{props.item.level}}/{{ format(props.item.school,schools)}}/{{formatArray(props.item.components,components)}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-data-iterator>
        </v-list>
      </v-card>
    </v-container>
    <spell-detail-dialog :showEditDialog.sync="showEditDialog" v-bind:targetSpell="targetSpell" v-bind:createSpell="createSpell" @save="save" @remove="remove" @cancel="cancelOrClose" @close="cancelOrClose" />
  </div>
</template>

<style>
/*table-layout: fixed; せずに text-overflow: ellipsis; する方法（長すぎる文字を...で省略表示する。
 * http://chuckwebtips.hatenablog.com/entry/2017/07/09/183527 
 */
td.nowrap {
  max-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
</style>

<script>
import spells from "@/model/spells";
import constants from "@/model/constants";

import FileUploadButton from "@/components/FileUploadButton";
import FileDownload from "@/components/FileDownload";
import SpellDetailDialog from "@/components/SpellDetailDialog";

export default {
  name: "SearchSpellTable",
  components: {
    FileUploadButton: FileUploadButton,
    FileDownload: FileDownload,
    SpellDetailDialog: SpellDetailDialog
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
      schools: constants.schools,
      headers: [
        { text: "名前", value: "name", align: "left", width: "30%" },
        { text: "レベル", value: "level", align: "left", width: "5%" },
        { text: "構成要素", value: "components", align: "left", width: "20%" },
        {
          text: "詠唱時間",
          value: "casting_time",
          align: "left",
          width: "20%"
        },
        { text: "持続時間", value: "duration", align: "left", width: "15%" },
        { text: "距離／エリア", value: "range", align: "left", width: "10%" }
      ],
      conditonRituals: [
        { text: "ー", value: null },
        { text: "可", value: "yes" },
        { text: "不可", value: "no" }
      ],
      //編集ダイアログ表示フラグ
      showEditDialog: false,
      //編集モードとするかの指定
      createSpell: false,
      //編集ダイアログに渡した呪文データのポインタ。
      targetSpell: null
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
    clickCell(item) {
      // props.expanded = !props.expanded;
      this.targetSpell = item;
      this.editMode = false;
      this.showEditDialog = true;
    },
    //呪文追加ボタンを押した際、追加用のダイアログを上げる。
    addSpell() {
      this.targetSpell = null;
      this.editMode = true;
      this.showEditDialog = true;
    },
    // //呪文編集・追加ダイアログ上で呪文を保存する。編集時は呪文データを上書きする。新規追加の場合は追加する。
    save(result) {
      if (this.targetSpell == null) {
        this.spelldata.push(result);
      } else {
        Object.assign(this.targetSpell, result);
        this.targetSpell = null;
      }
    },
    // //呪文編集・追加ダイアログ上で呪文を削除する。編集中の呪文データを消去する。
    remove() {
      let index = this.spelldata.indexOf(this.targetSpell);
      this.spelldata.splice(index, 1);
      this.targetSpell = null;
    },

    cancelOrClose() {
      this.targetSpell = null;
    },

    //TODO 以下は共通ロジック。リファクタリングして一本化する
    //呪文の持続時間を編集して返却する
    formatDuration(item) {
      var retVal = item.duration;
      if (item.concentration === "yes") {
        retVal = "精神集中," + retVal;
      }
      return retVal;
    },

    //値を表示用の文字列にマッピングする。val:値 table：キーがvalueｍ表示の値がtextであるオブジェクトのリスト。
    format(val, table) {
      var retVal = val;
      table.forEach(element => {
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
    },

    formatSpellName(item) {
      var retVal = item.name + " （" + this.format(item.school, this.schools);
      if (item.ritual === "yes") {
        retVal += "、儀式";
      }
      retVal += ")";
      return retVal;
    },

    arrayToString(array) {
      return array.join(",");
    }
  }
};
</script>
