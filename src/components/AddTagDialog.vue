<template>
  <div>
    <v-dialog
      v-model="showDialog"
      max-width="800"
      max-height="1000"
      :persistent="true"
    >
      <v-card>
        <v-toolbar
          card
          dark
          color="blue lighten-1"
        >
          <v-toolbar-title>タグの追加</v-toolbar-title>
        </v-toolbar>
        <v-layout
          row
          wrap
        >
          <v-flex xs12>
            <v-card-text>
              呪文「{{
                spellname
              }}」に割り当てるタグを選択し、「保存する」ボタンを押してください。<br />
              タグの割当を取りやめる場合は、「中断する」ボタンを押してください。<br />
              タグがまだ未作成の場合は、「追加するタグ名」に入力して「タグを追加」ボタンを押してください。<br />
            </v-card-text>
          </v-flex>
          <v-flex xs10>
            <v-text-field
              class="ml-3 mr-3"
              v-model="newTagName"
              label="追加するタグ名"
            ></v-text-field>
          </v-flex>
          <v-flex xs2>
            <v-btn
              class="white--text"
              color="indigo lighten-1"
              @click.native="addTag"
            >タグを追加</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12>
            <v-select
              class="ml-3 mr-3"
              dense
              label="Select"
              :items="tags"
              v-model="selectedTags"
              max-height="800"
              hint="呪文に割り当てるタグ"
              item-text="name"
              item-value="self"
              persistent-hint
              multiple
            ></v-select>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs6 />
          <v-flex xs3>
            <v-btn
              class="white--text"
              color="indigo lighten-1"
              @click.native="save"
            >保存する</v-btn>
          </v-flex>
          <v-flex xs3>
            <v-btn
              class="white--text"
              color="indigo lighten-1"
              @click.native="close"
            >中断する</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
    <v-snackbar
      top
      :color="snackbar.level"
      :timeout="3000"
      v-model="snackbar.show"
    >
      {{ validateerror }}
    </v-snackbar>
  </div>
</template>

<style></style>

<script>
import Tag from "@/model/tag";
export default {
  name: "AddTagDialog",
  props: {
    //ダイアログ表示フラグ。
    showDialog: {
      type: Boolean,
      default: true
    },
    tags: {
      type: Array,
      default: []
    },
    spellname: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      l_tags: this.tags,
      selectedTags: [],
      newTagName: "",
      //アラートダイアログ
      snackbar: {
        show: false,
        level: "error"
      }
    };
  },

  watch: {
    //ダイアログ表示時に行う初期化処理を実装。
    showDialog(val) {
      if (val) {
        this.selectedTags = this.l_tags.filter(tag => {
          return tag.contains(this.spellname);
        });
      }
    }
  },

  computed: {
    validateerror() {
      if (!this.newTagName) {
        return "タグ名は必須です";
      } else {
        if (
          this.l_tags
            .map(tag => {
              return tag.name;
            })
            .includes(this.newTagName)
        ) {
          return "タグ名" + this.newTagName + "は登録済みです";
        }
      }
      return null;
    }
  },

  methods: {
    closeDialog() {
      this.$emit("update:showDialog", false);
    },
    save() {
      this.l_tags.forEach(tag => {
        if (
          this.selectedTags.some(selectedTag => {
            selectedTag.spellname === tag.spellname;
          })
        ) {
          tag.addSpellName(this.spellname);
        } else {
          tag.removeSpellName(this.spellname);
        }
      });
      this.selectedTags.forEach(tag => {
        tag.addSpellName(this.spellname);
      });

      this.$emit("save", this.l_tags);
      this.clear();
    },
    close() {
      this.$emit("cancel");
      this.clear();
    },
    clear() {
      this.selectedTags = [];
      this.newTagName = "";
      this.snackbar.show = false;
    },
    addTag() {
      if (this.validateerror) {
        this.snackbar.show = true;
      } else {
        const newTag = new Tag();
        newTag.name = this.newTagName;
        this.l_tags.push(newTag);
        this.newTagName = "";
      }
    }
  }
};
</script>
