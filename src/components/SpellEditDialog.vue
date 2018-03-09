<template>
  <div>
    <v-dialog v-model="showEditDialog" persistent>
      <v-container grid-list-md>
        <v-card color="grey lighten-4" flat>
          <v-card-text>
            <v-container fluid>
              <v-form ref="form">
                <v-layout row wrap>
                  <v-flex xs4>
                    <v-text-field name="名前" type="text" label="名前" v-model="editspell.name" required/>
                  </v-flex>
                  <v-flex xs3>
                    <v-select label="Select" :items="classes" v-model="editspell.class" multiple max-height="400" hint="クラス" persistent-hint></v-select>
                  </v-flex>
                  <v-flex xs3>
                    <v-select label="Select" :items="levels" v-model="editspell.level" max-height="400" hint="呪文レベル" persistent-hint></v-select>
                  </v-flex>
                  <v-flex xs3>
                    <v-select label="Select" :items="components" v-model="editspell.components" multiple max-height="400" hint="構成要素" persistent-hint></v-select>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field name="物質要素詳細" type="text" label="物質要素詳細" v-model="editspell.materialdeteil" />
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field name="詠唱時間" label="詠唱時間" v-model="editspell.casting_time" required />
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field name="持続時間" label="持続時間" v-model="editspell.duration" required />
                  </v-flex>
                  <v-flex xs2>
                    <v-select label="Select" :items="concentration" v-model="editspell.concentration" max-height="400" hint="集中" persistent-hint></v-select>
                  </v-flex>
                  <v-flex xs2>
                    <v-text-field name="距離／エリア" label="距離／エリア" v-model="editspell.range" required />
                  </v-flex>
                  <v-flex xs2>
                    <v-select label="Select" :items="rituals" v-model="editspell.ritual" max-height="400" hint="儀式" persistent-hint></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field class="nowrap" name="本文" label="本文" v-model="editspell.desc" multi-line required />
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
  </div>
</template>

<style>

</style>

<script>
import constants from "@/model/constants";

export default {
  name: "SpellEditDialog",
  props: {
    //ダイアログ表示フラグ。
    showEditDialog: {
      type: Boolean,
      default: false
    },
    //編集対象の呪文データ。新規作成の場合はnullを指定。
    editedspell: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      //編集ダイアログで編集している呪文データの状態。
      editspell: this.defaultData(),
      classes: constants.classes,
      components: constants.components,
      concentration: constants.concentration,
      levels: constants.levels,
      rituals: constants.rituals
    };
  },
  watch: {
    //v-bindしているeditedspellの値がかわったら、編集用のコピーをローカル変数として作成する。
    editedspell: function(val) {
      if (val != null) {
        this.editspell = val;
      } else {
        this.editspell = this.defaultData();
      }
    }
  },
  methods: {
    //呪文編集・追加ダイアログ上で呪文を保存する。
    save() {
      this.$emit("save", this.editspell);
      this.editspell = {};
      this.$emit("update:showEditDialog", false);
    },
    //呪文編集・追加ダイアログ上で操作をキャンセルする。
    cancel() {
      this.$emit("update:showEditDialog", false);
      this.editspell = {};
    },
    //呪文編集・追加ダイアログ上で呪文を削除する。
    remove() {
      this.$emit("remove", this.editspell);
      this.editspell = {};
      this.$emit("update:showEditDialog", false);
    },
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
    }
  }
};
</script>
