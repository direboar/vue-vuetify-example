<template>
  <div>
    <v-container fluid grid-list-md>
      <v-card>
        <v-toolbar>
          <v-toolbar-title>D&D5版 呪文検索アプリケーション</v-toolbar-title>
          <v-spacer></v-spacer>
          <file-upload-icon tooltip="呪文データファイルをアップロードします。" @onFileRead="onFileRead" />
          <v-tooltip top>
            <v-btn icon small slot="activator" @click="saveSpellData">
              <v-icon>save</v-icon>
            </v-btn>
            <span>ブラウザのローカルストレージに呪文データを保存します。</span>
          </v-tooltip>
          <file-download-icon tooltip="現在の呪文データを、ファイルにダウンロードします。" :data="jesonspelldata" />
          <v-tooltip top>
            <v-btn icon small slot="activator" @click="loadSpellData">
              <v-icon>redo</v-icon>
            </v-btn>
            <span>ブラウザのローカルストレージに保存されている呪文データを再ロードします。</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn icon small slot="activator" @click="deleteSpellData">
              <v-icon>delete</v-icon>
            </v-btn>
            <span>ブラウザのローカルストレージから呪文データを全削除します。</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn icon small slot="activator" @click="addSpell">
              <v-icon>add</v-icon>
            </v-btn>
            <span>呪文を追加します。</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn icon small slot="activator" @click="showHelp">
              <v-icon>help</v-icon>
            </v-btn>
            <span>ヘルプを表示します</span>
          </v-tooltip>
        </v-toolbar>
        <v-card-title>
          <v-layout row wrap>
            <v-flex xs12>
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
              <td class="text-xs-left">{{ props.item.hoge }} {{ props.item.level}}</td>
              <td class="text-xs-left">{{ props.item.formatArray(props.item.components,components) }}</td>
              <td class="text-xs-left nowrap">{{ props.item.casting_time }}</td>
              <td class="text-xs-left">{{ props.item.formatDuration }}</td>
              <td class="text-xs-left">{{ props.item.range }}</td>
              <td class="text-xs-left">
                <v-icon>add</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
        <!--モバイル-->
        <v-list class="hidden-sm-and-up" two-line>
          <v-data-iterator content-tag="v-card" :items="items">
            <v-list-tile avatar slot="item" slot-scope="props" @click="clickCell(props.item)">
              <v-list-tile-content>
                <v-list-tile-title>{{props.item.name}} </v-list-tile-title>
                <v-list-tile-sub-title>{{props.item.level}}/{{props.item.format(props.item.school,schools)}}/{{props.item.formatArray(props.item.components,components)}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-avatar>
                <v-icon>add</v-icon>
              </v-list-tile-avatar>
            </v-list-tile>
          </v-data-iterator>
        </v-list>
      </v-card>
    </v-container>
    <spell-detail-dialog :showEditDialog.sync="showEditDialog" v-bind:targetSpell="targetSpell" v-bind:createSpell="createSpell" @save="save" @remove="remove" @cancel="cancelOrClose" @close="cancelOrClose" />
    <v-snackbar top :color="snackbar.level" :timeout="3000" v-model="snackbar.show">
      {{ snackbar.message }}
    </v-snackbar>
    <v-dialog fullscreen v-model="showHelpDialog">
      <v-card>
        <v-card-title>
          <H2>D&D呪文検索用アプリケーションの利用方法</H2>
        </v-card-title>
        <v-card-text>
          <p>このアプリケーションは、D&D5版の呪文を検索するためのアプリケーションです。</p>
          <h3>重要事項</h3>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <div slot="header">
                <h4>1.呪文データの扱い</h4>
              </div>
              <v-card>
                <v-card-text>本アプリケーションは、デフォルトではOpen SRDに掲載されている呪文のうち、一部の呪文のみを選別し、掲載しています。 本アプリケーションは、利用者が呪文データを独自に作成することで、日本語環境の呪文データを使用することが可能です。</v-card-text>
                <v-card-text>使用した呪文データは、本アプリケーションを使用するブラウザ上にのみ保存されます。よって、本アプリケーションを使用して、個人で作成した呪文データが第三者に自動的に配布されることはありません。よって、PHBをはじめとした日本語訳された呪文データの和訳データを、個人の責任で作成し、使用する分には、著作権法を侵害することはありません。</v-card-text>
                <v-card-text>ただし、個人が作成したデータを第三者に無断で譲渡した場合は、譲渡者が著作権法を侵害したことになりますので、十分ご注意ください。</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <h3>利用方法</h3>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <div slot="header">
                <h4>1.呪文データのロード</h4>
              </div>
              <v-card>
                <v-card-text><img src="../assets/upload.png">呪文データファイルをロードします。ほかの人が作成し、ダウンロードしたファイルを読み込むことができます。</v-card-text>
                <v-card-text><img src="../assets/save.png">ブラウザのローカルストレージに、現在の呪文データを保存します。次回以降は保存された呪文データが使用されます。</v-card-text>
                <v-card-text><img src="../assets/download.png">現在の呪文データを、ファイルにダウンロードします。ダウンロードしたデータはアップロードで読み込むことができます。</v-card-text>
                <v-card-text><img src="../assets/reload.png">ブラウザのローカルストレージに保存されている呪文データを再ロードします。再ロード前に行った呪文の追加・変更は失われます。</v-card-text>
                <v-card-text><img src="../assets/discard.png">ブラウザのローカルストレージから、呪文データを全削除します。</v-card-text>
                <v-card-text><img src="../assets/add.png">新しい呪文データを追加します。ダイアログが表示されるので、呪文データを作成してください。</v-card-text>
                <v-card-text><img src="../assets/help.png">このヘルプを表示します。</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <div slot="header">
                <h4>2.呪文の検索・表示</h4>
              </div>
              <v-card>
                <v-card-text>TODO</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <div slot="header">
                <h4>3.呪文の追加・編集・削除</h4>
              </div>
              <v-card>
                <v-card-text>TODO</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="showHelpDialog=false">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import Spell from "@/model/spell";

// import FileUploadButton from "@/components/FileUploadButton";
import FileUploadIcon from "@/components/FileUploadIcon";
import FileDownloadIcon from "@/components/FileDownloadIcon";
import SpellDetailDialog from "@/components/SpellDetailDialog";

export default {
  name: "SearchSpellTable",
  components: {
    FileUploadIcon: FileUploadIcon,
    FileDownloadIcon: FileDownloadIcon,
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
      //アラートダイアログ
      snackbar: {
        show: false,
        level: "info",
        message: ""
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
          width: "15%"
        },
        { text: "持続時間", value: "duration", align: "left", width: "10%" },
        { text: "距離／エリア", value: "range", align: "left", width: "15%" },
        { text: " ", value: "dummy", align: "left", width: "5%" }
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
      targetSpell: null,
      //ヘルプダイアログ表示フラグ
      showHelpDialog: false
    };
  },
  beforeMount() {
    //1.ローカルストレージをチェックする
    var spellsjson = localStorage.getItem("dndapp.spells");
    //2.ストレージに登録されていればそのデータを復元。
    if (spellsjson != undefined && spellsjson != null) {
      //初期表示用の呪文データを取得する。
      this.spelldata = Spell.assigns(JSON.parse(spellsjson));
    } else {
      //2.ストレージに登録されていなければデフォルトデータを読込の上、デフォルトデータをセーブ。
      this.spelldata = Spell.assigns(spells());
    }
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
    jesonspelldata() {
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
            this.spelldata = Spell.assigns(spells);
            this.showSnackbar(
              "success",
              "呪文データをファイルから読み込みました。"
            );
          } catch (e) {
            //FIXME
            this.showSnackbar("error", "呪文データの読み込みに失敗しました。");
            this.console.log(e);
          }
        };
        fileReader.readAsText(file);
      }
    },
    //テーブルセルをクリック時、expandを表示する。
    clickCell(item) {
      // props.expanded = !props.expanded;
      this.targetSpell = item;
      this.showEditDialog = true;
    },
    //呪文追加ボタンを押した際、追加用のダイアログを上げる。
    addSpell() {
      this.targetSpell = null;
      this.createSpell = true;
      this.showEditDialog = true;
    },
    // //呪文編集・追加ダイアログ上で呪文を保存する。編集時は呪文データを上書きする。新規追加の場合は追加する。
    save(result) {
      if (this.targetSpell == null) {
        this.spelldata.push(result);
        this.showSnackbar(
          "success",
          "呪文" + this.result.name + "を追加しました。"
        );
      } else {
        Object.assign(this.targetSpell, result);
        this.targetSpell = null;
        this.showSnackbar(
          "success",
          "呪文" + this.result.name + "を更新しました。"
        );
      }
    },
    // //呪文編集・追加ダイアログ上で呪文を削除する。編集中の呪文データを消去する。
    remove() {
      let index = this.spelldata.indexOf(this.targetSpell);
      this.spelldata.splice(index, 1);
      this.targetSpell = null;
      this.showSnackbar(
        "success",
        "呪文データをブラウザのローカルストレージから削除しました。"
      );
    },

    // キャンセルもしくはクローズを押したときの挙動。
    cancelOrClose() {
      this.targetSpell = null;
    },

    showHelp() {
      this.showHelpDialog = true;
    },

    //呪文データをローカルストレージに保存する
    saveSpellData() {
      localStorage.setItem("dndapp.spells", this.jesonspelldata);
      this.showSnackbar(
        "success",
        "呪文データをブラウザのローカルストレージに登録しました。"
      );
    },

    //呪文データをローカルストレージから再ロードする
    loadSpellData() {
      var spellsFromStorage = localStorage.getItem("dndapp.spells");
      //ストレージに登録されていればそのデータを復元。
      if (spellsFromStorage != undefined && spellsFromStorage != null) {
        this.spelldata = Spell.assigns(JSON.parse(spellsFromStorage));
        this.showSnackbar(
          "success",
          "ブラウザのローカルストレージに保存された呪文データを再ロードしました。"
        );
      } else {
        this.showSnackbar(
          "error",
          "ブラウザのローカルストレージに呪文データが保存されていないため、再ロードに失敗しました。"
        );
      }
    },

    //呪文データをローカルストレージから削除する。
    deleteSpellData() {
      localStorage.removeItem("dndapp.spells");
      this.spelldata = [];
      //this.spelldata = spells(); //うまく戻らない。
      this.showSnackbar(
        "success",
        "呪文データをブラウザのローカルストレージから削除しました。"
      );
    },

    formatSpellName(item) {
      var retVal = item.name + " （" + item.format(item.school, this.schools);
      if (item.ritual === "yes") {
        retVal += "、儀式";
      }
      retVal += ")";
      return retVal;
    },

    showSnackbar(level, message) {
      this.snackbar.level = level;
      this.snackbar.message = message;
      this.snackbar.show = true;
    }
  }
};
</script>
