<template>
  <div>
    <!--編集ダイアログ-->
    <v-dialog v-model="showEditDialog" persistent v-if="editmode">
      <v-container grid-list-md>
        <v-card color="grey lighten-4" flat>
          <v-card-text>
            <v-container fluid>
              <v-form ref="form">
                <v-layout row wrap>
                  <v-flex xs4>
                    <v-text-field name="名前" type="text" label="名前" v-model="spell.name" required/>
                  </v-flex>
                  <v-flex xs3>
                    <v-select label="Select" :items="classes" v-model="spell.class" multiple max-height="400" hint="クラス" persistent-hint></v-select>
                  </v-flex>
                  <v-flex xs3>
                    <v-select label="Select" :items="levels" v-model="spell.level" max-height="400" hint="呪文レベル" persistent-hint></v-select>
                  </v-flex>
                  <v-flex xs3>
                    <v-select label="Select" :items="components" v-model="spell.components" multiple max-height="400" hint="構成要素" persistent-hint></v-select>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field name="物質要素詳細" type="text" label="物質要素詳細" v-model="spell.materialdeteil" />
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field name="詠唱時間" label="詠唱時間" v-model="spell.casting_time" required />
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field name="持続時間" label="持続時間" v-model="spell.duration" required />
                  </v-flex>
                  <v-flex xs2>
                    <v-select label="Select" :items="concentration" v-model="spell.concentration" max-height="400" hint="集中" persistent-hint></v-select>
                  </v-flex>
                  <v-flex xs2>
                    <v-text-field name="距離／エリア" label="距離／エリア" v-model="spell.range" required />
                  </v-flex>
                  <v-flex xs2>
                    <v-select label="Select" :items="rituals" v-model="spell.ritual" max-height="400" hint="儀式" persistent-hint></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field class="nowrap" name="本文" label="本文" v-model="spell.desc" multi-line required />
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="save">セーブ</v-btn>
            <v-btn color="green darken-1" flat @click.native="cancel">キャンセル</v-btn>
            <v-btn color="green darken-1" flat @click.native="remove">削除</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-dialog>
    <!--表示ダイアログ-->
    <v-dialog v-model="showEditDialog" persistent v-if="editmode === false">
      <v-container grid-list-md>
        <v-card color="grey lighten-4" flat>
          <v-card-title>
            <h2>{{spell.name}}</h2>
          </v-card-title>
          <v-divider></v-divider>
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
              <v-card-text class="body-2">{{ formatArray(spell.class,classes)}}</v-card-text>
            </v-flex>
            <v-flex xs3>
              <v-card-text class="body-2">{{ spell.level }}</v-card-text>
            </v-flex>
            <v-flex xs3>
              <v-card-text class="body-2">{{ formatArray(spell.components,components) }} {{spell.materialdeteil}}</v-card-text>
            </v-flex>
            <v-flex xs3>
              <v-card-text class="body-2">{{ spell.casting_time }}</v-card-text>
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
              <v-card-text class="body-2">{{ spell.duration }}</v-card-text>
            </v-flex>
            <v-flex xs3>
              <v-card-text class="body-2">{{ format(spell.concentration,concentration) }}</v-card-text>
            </v-flex>
            <v-flex xs3>
              <v-card-text class="body-2">{{ spell.range }}</v-card-text>
            </v-flex>
            <v-flex xs3>
              <v-card-text class="body-2">{{ format(spell.ritual,rituals) }}</v-card-text>
            </v-flex>
            <v-flex xs12>
              <v-divider/>
              <v-card-text class="body-2">
                <span style="white-space: pre-wrap;" v-html="spell.desc"></span>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="close">閉じる</v-btn>
            <v-btn color="green darken-1" flat @click.native="edit">編集する</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-dialog>
  </div>
</template>

<style>

</style>

<script>
import constants from "@/model/constants";

export default {
  name: "SpellDetailDialog",
  props: {
    //ダイアログ表示フラグ。
    showEditDialog: {
      type: Boolean,
      default: false
    },
    //編集対象の呪文データ。新規作成の場合はnullを指定。
    targetSpell: {
      type: Object,
      default: null
    },
    //呪文を新規作成する場合のフラグ。
    createSpell: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //編集モード
      editmode: false,
      //呪文データのコピー。
      spell: this.defaultData(),
      classes: constants.classes,
      components: constants.components,
      concentration: constants.concentration,
      levels: constants.levels,
      rituals: constants.rituals
    };
  },
  watch: {
    //編集対象の呪文データが変更されたら、呪文データのコピーを作り直す。
    targetSpell: function(val) {
      if (val != null) {
        this.spell = val;
      } else {
        this.spell = this.defaultData();
      }
    },
    //v-bindしている新規作成フラグが変更されたら、編集モードを変更する。
    createSpell: function(val) {
      this.editmode = val;
    }
  },
  methods: {
    //編集モードに移行する
    edit() {
      this.editmode = true;
    },
    //ダイアログを閉じる
    close() {
      this.$emit("update:showEditDialog", false);
      this.editmode = false;
      this.$emit("close", this.spell);
      this.spell = this.defaultData();
    },
    //呪文編集・追加ダイアログ上で呪文を保存する。
    save() {
      this.$emit("update:showEditDialog", false);
      this.editmode = false;
      this.$emit("save", this.spell);
      this.spell = this.defaultData();
    },
    //呪文編集・追加ダイアログ上で操作をキャンセルする。
    cancel() {
      this.$emit("update:showEditDialog", false);
      this.editmode = false;
      this.$emit("cancel", this.spell);
      this.spell = this.defaultData();
    },
    //呪文編集・追加ダイアログ上で呪文を削除する。
    remove() {
      this.$emit("update:showEditDialog", false);
      this.editmode = false;
      this.$emit("remove", this.spell);
      this.spell = this.defaultData();
    },
    //呪文が未選択の場合のデフォルトデータを返却する。（描画エラー防止）
    defaultData() {
      return {
        name: "",
        desc: "",
        page: "",
        range: "",
        components: [],
        material: "",
        ritual: "",
        duration: "",
        concentration: "",
        casting_time: "",
        level: "",
        school: "",
        class: [],
        archetype: "",
        circles: ""
      };
    },

    //FIXME util.
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

    //FIXME util.
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
