<template>
  <v-dialog
    v-model="showDialog"
    persistent
    max-width="480"
  >
    <v-card
      color="grey lighten-4"
      flat
    >
      <v-card-text>
        <v-container fluid>
          <v-form ref="form">
            <v-text-field
              name="タグ名"
              label="タグ名"
              v-model="l_tagName"
              required
              :rules="tagNameRule"
            />
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          flat
          @click.native="saveTag"
        >保存</v-btn>
        <v-btn
          color="green darken-1"
          flat
          @click.native="cancelTag"
        >キャンセル</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
</style>

<script>
export default {
  props: {
    //ダイアログ表示フラグ。
    showDialog: {
      type: Boolean,
      default: true
    },
    //tag名
    tagName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      l_showDialog: this.showDialog,
      l_tagName: this.tagName,
      tagNameRule: [v => v !== "" || "タグ名は必須です"]
    };
  },
  watch: {
    //タグ名の変更を検知できないので、watchで設定。
    tagName(val) {
      this.l_tagName = val;
    }
  },
  computed: {},
  methods: {
    saveTag() {
      if (!this.$refs.form.validate()) {
        // バリデーションエラーのためサブミットさせない
      } else {
        this.$emit("save", this.l_tagName);
        this._clear();
      }
    },
    cancelTag() {
      this.$emit("cancel", this.l_tagName);
      this._clear();
    },
    _clear() {
      this.l_tagName = "";
    }
  }
};
</script>