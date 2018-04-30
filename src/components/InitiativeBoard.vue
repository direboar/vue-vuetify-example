
<template>
  <div>
    <!--キャラクター一覧-->
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-data-table v-bind:headers="headers" :items="items" hide-actions :total-items="totalItems" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="text-xs-right">{{ props.item.charctername }}</td>
              <td class="text-xs-right">{{ props.item.initiative }}</td>
              <td class="text-xs-right">{{ props.item.initiativemodifier }}</td>
              <td>
                <v-tooltip top>
                  <v-btn color="primary" fab small dark slot="activator" @click="openEditDialig(props.item)">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <!--activatorスロットの意味が分からん。消すとボタン消える-->
                  <span>編集</span>
                </v-tooltip>
                <v-tooltip top>
                  <v-btn color="secondary" fab small dark slot="activator" @click="deleteItem(props.item)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                  <span>削除</span>
                </v-tooltip>
              </td>
            </template>
          </v-data-table>
        </v-card>
        <v-card color="indigo lighten-4">
          <v-tooltip top>
            <v-btn color="primary" fab small dark slot="activator" @click="openAddDialig()">
              <v-icon>add</v-icon>
            </v-btn>
            <span>追加</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn color="secondary" fab small dark slot="activator" @click="sort()">
              <v-icon>sort</v-icon>
            </v-btn>
            <span>ソート</span>
          </v-tooltip>
          <v-tooltip top>
            <v-btn color="accent" fab small dark slot="activator" @click="clearInitiative()">
              <v-icon>clear</v-icon>
            </v-btn>
            <span>イニシアチブ初期化</span>
          </v-tooltip>
        </v-card>
        <v-card>
          <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9097509632200457" data-ad-slot="5985300299" data-ad-format="auto"></ins>
        </v-card>
      </v-flex>
    </v-layout>

    <!--キャラクター編集ダイアログ-->
    <v-dialog v-model="dialog" persistent max-width="480">
      <v-card color="grey lighten-4" flat>
        <v-card-text>
          <v-container fluid>
            <v-form ref="form">
              <v-text-field name="キャラクター名" label="キャラクター名" v-model="editcharacter.charctername" :rules="charcternameRule" required />
              <v-text-field name="イニシアチブ修正値" label="イニシアチブ修正値" type="number" v-model.number="editcharacter.initiativemodifier" :rules="initiativemodifierRule" required/>
              <v-text-field name="イニシアチブ" label="イニシアチブ" type="number" v-model.number="editcharacter.initiative" :rules="initiativeRule" />
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="save">セーブ</v-btn>
          <v-btn color="green darken-1" flat @click.native="cancel">キャンセル</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--スナックバー表示-->
    <v-snackbar timeout=1000 :color="snackbarcolor" vertical=true v-model="snackbar">
      {{ snackbarmessage }}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<style>

</style>

<script>
export default {
  // コンポーネント名
  name: "InitiativeBoard",
  data() {
    return {
      // totalItems ソートを無効にするために設定。
      totalItems: 2,
      // // ヘッダ
      headers: [
        {
          text: "キャラクター名",
          value: "charctername",
          align: "right",
          sortable: false,
          width: "40%"
        },
        {
          text: "イニシアチブ",
          value: "initiative",
          align: "right",
          sortable: false,
          width: "15%"
        },
        {
          text: "修正値",
          value: "initiativemodifier",
          align: "right",
          sortable: false,
          width: "15%"
        },
        {
          text: "",
          value: "action",
          align: "right",
          sortable: false,
          width: "30%"
        }
      ],
      // 一覧に表示するアイテム
      items: [
        {
          charctername: "サンプルキャラクターA",
          initiative: 1,
          initiativemodifier: 1
        },
        {
          charctername: "サンプルキャラクターB",
          initiative: 2,
          initiativemodifier: 0
        }
      ],

      // 現在編集中のitem。itemsのうち、現在編集中のitemの参照が入る。新規登録中はnull。
      edititem: null,
      // ダイアログで編集中のキャラクターの内容
      editcharacter: {
        charctername: "",
        initiative: 0,
        initiativemodifier: 0
      },
      // ダイアログ表示フラグ
      dialog: false,
      // スナックバー表示フラグ
      snackbar: false,
      snackbarcolor: "error",
      snackbarmessage: "",
      // バリデーション
      // FIXME VeeValidate の適用を検討。
      // https://qiita.com/acro5piano/items/2be6068b0647ecffcd86
      // https://vuetifyjs.com/components/forms #4 Vee-validate
      charcternameRule: [v => !!v || "キャラクター名は必須です"],
      initiativemodifierRule: [
        v => v !== "" || "イニシアチブ修正値は必須です", // 空文字を指定すると.numberをつけてもStringの空文字てきてしまうので、それをはじく。いまいち。
        v => !isNaN(v) || "イニシアチブ修正値は数値を入力してください"
      ],
      initiativeRule: [
        v => !v || !isNaN(v) || "イニシアチブは数値を入力してください"
      ]
    };
  },
  methods: {
    // キャラクターをソートする
    sort() {
      // 1.イニシアチブ未入力でないかをチェック
      var check = this.items.some(c => {
        return c.initiative === undefined;
      });
      if (check) {
        this._showSnackbar(
          "error",
          "イニシアチブが未入力のキャラクターがいます。"
        );
      } else {
        this.items.sort((a, b) => {
          if (a.initiative < b.initiative) {
            return 1;
          } else if (a.initiative > b.initiative) {
            return -1;
          } else if (a.initiativemodifier < b.initiativemodifier) {
            return 1;
          } else {
            return 0;
          }
        });
        this._showSnackbar("success", "ソートしました");
      }
    },
    // イニシアチブを初期化する
    clearInitiative() {
      this.items.forEach(i => (i.initiative = undefined));
    },
    // 指定したキャラクターを編集するダイアログをオープンする
    openEditDialig(item) {
      this.edititem = item;
      Object.assign(this.editcharacter, item);
      this.dialog = true;
    },
    // キャラクターを新規追加するダイアログをオープンする
    openAddDialig() {
      this.edititem = null;
      this.editcharacter = {};
      this.dialog = true;
    },
    // 指定されたキャラクターを削除する
    deleteItem(item) {
      var index = this.items.indexOf(item);
      if (index >= 0) {
        this.items.splice(index, 1);
      }
      this._showSnackbar("success", "キャラクターを削除しました");
    },
    // ダイアログでセーブボタンを押した場合に呼び出す。
    // 新規追加時は、ダイアログで編集したキャラクターをitemsに追加する。
    // 編集時は、ダイアログで編集したキャラクターを編集元のitemに反映する。
    // 新規追加か、編集中かは、edititemがnullかどうかで判定する。
    save() {
      if (!this.$refs.form.validate()) {
        // バリデーションエラーのためサブミットさせない
      } else {
        if (this.edititem != null) {
          this.dialog = false;
          Object.assign(this.edititem, this.editcharacter);
          this._clear();
        } else {
          this.dialog = false;
          this.items.push(this.editcharacter);
          this._clear();
        }
      }
    },
    // ダイアログでキャンセルボタンを押した場合に呼び出す。
    // ダイアログをクローズする。
    cancel() {
      this._clear();
      this.dialog = false;
    },
    // ダイアログをクローズした際の後処理。一時変数を初期化する。
    _clear() {
      this.editcharacter = {};
      this.edititem = null;
    },
    // スナックバーを表示する
    _showSnackbar(color, message) {
      this.snackbarmessage = message;
      this.snackbarcolor = color;
      this.snackbar = true;
    }
  }
};
</script>