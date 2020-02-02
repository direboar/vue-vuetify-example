<template>
  <div>
    <!--編集ダイアログ-->
    <v-dialog
      v-model="showEditDialog"
      persistent
      v-if="editmode"
    >
      <v-card
        color="grey lighten-4"
        flat
      >
        <v-card-text>
          <v-container fluid>
            <v-form ref="form">
              <v-layout
                row
                wrap
              >
                <v-flex md4>
                  <v-text-field
                    name="名前"
                    type="text"
                    label="名前"
                    v-model="spell.name"
                    required
                  />
                </v-flex>
                <v-flex xs3>
                  <v-select
                    label="Select"
                    :items="classes"
                    v-model="spell.class"
                    multiple
                    max-height="400"
                    hint="クラス"
                    persistent-hint
                  ></v-select>
                </v-flex>
                <v-flex xs3>
                  <v-select
                    label="Select"
                    :items="subclassses"
                    v-model="spell.subclass"
                    multiple
                    max-height="400"
                    hint="サブクラス（バードの学派等）"
                    persistent-hint
                  ></v-select>
                </v-flex>
                <v-flex xs3>
                  <v-select
                    label="Select"
                    :items="levels"
                    v-model="spell.level"
                    max-height="400"
                    hint="呪文レベル"
                    persistent-hint
                  ></v-select>
                </v-flex>
                <v-flex xs2>
                  <v-select
                    label="Select"
                    :items="components"
                    v-model="spell.components"
                    multiple
                    max-height="400"
                    hint="構成要素"
                    persistent-hint
                  ></v-select>
                </v-flex>
                <v-flex xs2>
                  <v-select
                    label="Select"
                    :items="schools"
                    v-model="spell.school"
                    max-height="400"
                    hint="系統"
                    persistent-hint
                  ></v-select>
                </v-flex>
                <v-flex xs2>
                  <v-select
                    label="Select"
                    :items="sources"
                    v-model="spell.source"
                    max-height="400"
                    hint="出典"
                    persistent-hint
                  ></v-select>
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    name="物質要素詳細"
                    type="text"
                    label="物質要素詳細"
                    v-model="spell.materialdeteil"
                  />
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    name="詠唱時間"
                    label="詠唱時間"
                    v-model="spell.casting_time"
                    required
                  />
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    name="持続時間"
                    label="持続時間"
                    v-model="spell.duration"
                    required
                  />
                </v-flex>
                <v-flex xs2>
                  <v-select
                    label="Select"
                    :items="concentration"
                    v-model="spell.concentration"
                    max-height="400"
                    hint="集中"
                    persistent-hint
                  ></v-select>
                </v-flex>
                <v-flex xs2>
                  <v-text-field
                    name="距離／エリア"
                    label="距離／エリア"
                    v-model="spell.range"
                    required
                  />
                </v-flex>
                <v-flex xs2>
                  <v-select
                    label="Select"
                    :items="rituals"
                    v-model="spell.ritual"
                    max-height="400"
                    hint="儀式"
                    persistent-hint
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    class="nowrap"
                    name="本文"
                    label="本文"
                    v-model="spell.desc"
                    multi-line
                    required
                  />
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat
            @click.native="save"
          >セーブ</v-btn>
          <v-btn
            color="green darken-1"
            flat
            @click.native="cancel"
          >キャンセル</v-btn>
          <v-btn
            color="green darken-1"
            flat
            @click.native="remove"
          >削除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--表示ダイアログ-->
    <v-dialog
      v-model="showEditDialog"
      persistent
      v-if="editmode === false"
    >
      <!--デスクトップ用-->
      <v-card
        color="grey lighten-4"
        flat
        class="hidden-sm-and-down"
      >
        <v-card-title>
          <h2>{{spell.name}} ({{spell.source}})</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-layout
          row
          wrap
        >
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
            <v-card-text class="body-2">{{ spell.formatArray(spell.class,classes)}}</v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="body-2">{{ spell.level }}</v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="body-2">{{formatComponents(spell)}}</v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="body-2">{{ spell.casting_time }}</v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-subheader class="body-2">持続時間</v-subheader>
          </v-flex>
          <v-flex xs3>
            <v-subheader class="body-2">距離／エリア</v-subheader>
          </v-flex>
          <v-flex xs3>
            <v-subheader class="body-2">儀式</v-subheader>
          </v-flex>
          <v-flex xs3>
            <v-subheader class="body-2">系統</v-subheader>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="body-2">{{ spell.formatDuration }}</v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="body-2">{{ spell.range }}</v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="body-2">{{ spell.format(spell.ritual,rituals) }}</v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="body-2">{{ spell.format(spell.school,schools) }}</v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-divider />
            <v-card-text class="body-2">
              <span
                style="white-space: pre-wrap;"
                v-html="formatDesc(spell)"
              ></span>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat
            @click.native="close"
          >閉じる</v-btn>
          <v-btn
            color="green darken-1"
            flat
            @click.native="edit"
          >編集する</v-btn>
        </v-card-actions>
      </v-card>

      <!--モバイル用-->
      <v-card class="hidden-md-and-up">
        <v-card-title>
          <h2>{{spell.name}}</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-layout
          row
          wrap
        >
          <v-flex xs6>
            <v-list two-line>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title class="body-1">レベル</v-list-tile-title>
                  <v-list-tile-content class="body-1">{{spell.level}}</v-list-tile-content>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider />
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title class="body-1">距離／エリア</v-list-tile-title>
                  <v-list-tile-content class="body-1">{{spell.range}}</v-list-tile-content>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider />
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title class="body-1">持続時間</v-list-tile-title>
                  <v-list-tile-content class="body-1">{{spell.formatDuration}}</v-list-tile-content>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider />
            </v-list>
          </v-flex>
          <v-flex xs6>
            <v-list two-line>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title class="body-1">詠唱時間</v-list-tile-title>
                  <v-list-tile-content class="body-1">{{spell.casting_time}}</v-list-tile-content>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider />
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title class="body-1">構成要素</v-list-tile-title>
                  <v-list-tile-content class="body-1">{{formatComponents(spell)}}</v-list-tile-content>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider />
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title class="body-1">儀式</v-list-tile-title>
                  <v-list-tile-content class="body-1">{{spell.format(spell.ritual,rituals)}}</v-list-tile-content>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider />
            </v-list>
          </v-flex>
          <v-flex xs12>
            <v-card-text class="body-2 scroll-y">
              <span
                style="white-space: pre-wrap;"
                v-html="formatDescMobile(spell)"
              ></span><br />
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat
            @click.native="close"
          >閉じる</v-btn>
          <v-btn
            color="green darken-1"
            flat
            @click.native="edit"
          >編集する</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
</style>

<script>
import constants from "@/model/constants";
import Spell from "@/model/spell";

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
      rituals: constants.rituals,
      schools: constants.schools,
      subclassses: constants.subclassses,
      sources: constants.sources
    };
  },
  watch: {
    //編集対象の呪文データが変更されたら、呪文データのコピーを作り直す。
    //v-bindにしてないのは、たぶんSpell型のオブジェクトに変換したかったから。だったらリスト側でSpell型にすればよいのでは、、
    targetSpell: function(val) {
      if (val != null) {
        this.spell = Spell.assign(val);
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
      return new Spell();
    },

    formatComponents(spell) {
      var retVal = spell.formatArray(spell.components, this.components);
      if (spell.materialdeteil != "") {
        retVal += " * ";
      }
      return retVal;
    },

    formatDesc(spell) {
      var retVal = spell.desc;
      if (spell.materialdeteil != "") {
        retVal += "\r\n";
        retVal += "\r\n";
        retVal += "(*)物質要素：";
        retVal += spell.materialdeteil;
      }
      return retVal;
    },

    formatDescMobile(spell) {
      var retVal = this.formatDesc(spell);
      retVal += "\r\n";
      retVal += "\r\n";
      retVal += "クラス：";
      retVal += spell.formatArray(spell.class, this.classes);
      return retVal;
    }
  }
};
</script>
