
<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="480">
      <v-card color="grey lighten-4" flat>
        <v-card-text>
          <v-container fluid>
            <v-form ref="form">
              <v-text-field name="キャラクター名" label="キャラクター名" id="charctername" v-model="editcharacter.charctername" :rules="charcternameRule" required />
              <v-text-field name="イニシアチブ修正値" label="イニシアチブ修正値" type="number" v-model.number="editcharacter.initiativemodifier" :rules="initiativemodifierRule" required/>
              <v-text-field name="イニシアチブ" label="イニシアチブ" type="number" v-model.number="editcharacter.initiative" :rules="initiativeRule"/>
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
    <v-data-table v-bind:headers="headers" :items="items" hide-actions :total-items="totalItems" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.charctername }}</td>
        <td class="text-xs-right">{{ props.item.initiative }}</td>
        <td class="text-xs-right">{{ props.item.initiativemodifier }}</td>
        <td>
          <v-btn color="primary" dark slot="activator" @click="openEditDialig(props.item)">編集</v-btn>
          <v-btn color="primary" dark slot="activator" @click="deleteItem(props.item)">削除</v-btn>
        </td>
　　　</template>
    </v-data-table>
    <v-btn color="primary" dark slot="activator" @click="openAddDialig()">追加</v-btn>
    <v-btn color="primary" dark slot="activator" @click="clearInitiative()">イニシアチブをクリア</v-btn>
    <v-btn @click="sort">ソート</v-btn>
  </div>
</template>

<style>

</style>

<script>
export default {
  data () {
    return {
      // コンポーネント名
      name: 'InitiativeBoard',
      // totalItems ソートを無効にするために設定。
      totalItems: 2,
      // ヘッダ
      headers: [
        {
          text: 'キャラクター名',
          value: 'charctername',
          sortable: false
        },
        {
          text: 'イニシアチブ',
          value: 'initiative',
          sortable: false
        },
        {
          text: '修正値',
          value: 'initiativemodifier',
          sortable: false
        }
      ],
      // 一覧に表示するアイテム
      items: [
        {
          charctername: 'ああああ',
          initiative: 1,
          initiativemodifier: 0
        },
        {
          charctername: 'いいい',
          initiative: 3,
          initiativemodifier: 0
        },
        {
          charctername: 'ううう',
          initiative: 3,
          initiativemodifier: 1
        },
        {
          charctername: 'えええ',
          initiative: 4,
          initiativemodifier: 1
        }
      ],
      // 現在編集中のitem。itemsのうち、現在編集中のitemの参照が入る。新規登録中はnull。
      edititem: null,
      // ダイアログで編集中のキャラクターの内容
      editcharacter: {
        charctername: '',
        initiative: 0,
        initiativemodifier: 0
      },
      // ダイアログ表示フラグ
      dialog: false,

      // バリデーション
      // FIXME VeeValidate の適用を検討。
      // https://qiita.com/acro5piano/items/2be6068b0647ecffcd86
      // https://vuetifyjs.com/components/forms #4 Vee-validate
      charcternameRule: [v => !!v || 'キャラクター名は必須です'],
      initiativemodifierRule: [
        v => !!v || 'イニシアチブ修正値は必須です', // FIXME 初期値0が許容されない。数値型の0がバインドされたとき、!!vでfalseになってしまうためだと思う。

        v => !isNaN(v) || 'イニシアチブ修正値は数値を入力してください'
      ],
      initiativeRule: [
        v => !v || !isNaN(v) || 'イニシアチブは数値を入力してください'
      ]
    }
  },
  methods: {
    // キャラクターをソートする
    sort () {
      this.items.sort((a, b) => {
        if (a.initiative < b.initiative) {
          return 1
        } else if (a.initiative > b.initiative) {
          return -1
        } else if (a.initiativemodifier < b.initiativemodifier) {
          return 1
        } else {
          return 0
        }
      })
    },
    // イニシアチブを初期化する
    clearInitiative () {
      this.items.forEach(i => (i.initiative = 0))
    },
    // 指定したキャラクターを編集するダイアログをオープンする
    openEditDialig (item) {
      this.edititem = item
      Object.assign(this.editcharacter, item)
      this.dialog = true
    },
    // キャラクターを新規追加するダイアログをオープンする
    openAddDialig () {
      this.edititem = null
      this.editcharacter = {}
      this.dialog = true
    },
    // 指定されたキャラクターを削除する
    deleteItem (item) {
      var index = this.items.indexOf(item)
      if (index >= 0) {
        this.items.splice(index, 1)
      }
    },
    // ダイアログでセーブボタンを押した場合に呼び出す。
    // 新規追加時は、ダイアログで編集したキャラクターをitemsに追加する。
    // 編集時は、ダイアログで編集したキャラクターを編集元のitemに反映する。
    // 新規追加か、編集中かは、edititemがnullかどうかで判定する。
    save () {
      if (!this.$refs.form.validate()) {
        // バリデーションエラーのためサブミットさせない
      } else {
        if (this.edititem != null) {
          this.dialog = false
          Object.assign(this.edititem, this.editcharacter)
          this._clear()
        } else {
          this.dialog = false
          this.items.push(this.editcharacter)
          this._clear()
        }
      }
    },
    // ダイアログでキャンセルボタンを押した場合に呼び出す。
    // ダイアログをクローズする。
    cancel () {
      this._clear()
      this.dialog = false
    },
    // ダイアログをクローズした際の後処理。一時変数を初期化する。
    _clear () {
      this.editcharacter = {}
      this.edititem = null
    }
  }
}
</script>