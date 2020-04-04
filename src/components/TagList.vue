<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>呪文検索タグ管理</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <v-btn
                slot="activator"
                icon
                @click.native="addTagClicked"
              >
                <v-icon>add</v-icon>
              </v-btn>
              <span>タグを追加します。</span>
            </v-tooltip>
          </v-toolbar>
        </v-card>
        <v-card>
          <v-list
            two-line
            subheader
          >
            <v-list-tile
              avatar
              v-for="item in tags"
              :key="item.title"
            >
              <v-list-tile-avatar>
                <v-icon class="grey lighten-1 white--text">folder</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                <v-list-tile-sub-title></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    icon
                    ripple
                    @click="editTagClicked(item)"
                  >
                    <v-icon color="grey lighten-1">edit</v-icon>
                  </v-btn>
                  <span>タグ名を変更します。</span>
                </v-tooltip>
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    icon
                    ripple
                    @click="deleteTag(item)"
                  >
                    <v-icon color="grey lighten-1">delete</v-icon>
                  </v-btn>
                  <span>タグを削除します。（確認ダイアログは表示されません。）</span>
                </v-tooltip>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider inset></v-divider>
          </v-list>
        </v-card>
        <v-card>
          <ins
            class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-9097509632200457"
            data-ad-slot="5985300299"
            data-ad-format="auto"
          ></ins>
        </v-card>
      </v-flex>
    </v-layout>
    <!--タグ追加ダイアログ-->
    <tag-edit-dialog
      :showDialog.sync="addTagDialog"
      :tagName.sync="tagName"
      @save="saveTag"
      @cancel="cancelTag"
    />
  </div>
</template>

<style>
</style>

<script>
import TagEditDialog from "@/components/TagEditDialog";
import Tag from "@/model/tag";

export default {
  components: {
    TagEditDialog
  },
  mounted() {
    this.loadFromLocalStrage();
  },
  data() {
    return {
      addTagDialog: false,
      editedTag: null,
      tagName: "",
      tags: []
    };
  },
  computed: {},
  methods: {
    saveTag(tagName) {
      this.addTagDialog = false;
      //ディープコピーはこうしないとダメ。
      //see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
      // let copied = JSON.parse(JSON.stringify(this.newTag));
      // this._updateLocalTimestamp(copied);
      // this.tags.push(copied);
      if (this.editedTag) {
        this.editedTag.name = tagName;
        this.saveTagsToLocalStrage(this.tags);
        this._clear();
      } else {
        const tag = new Tag();
        tag.name = tagName;
        this.tags.push(tag);
        this.saveTagsToLocalStrage(this.tags);
        this._clear();
      }
    },
    cancelTag() {
      this.addTagDialog = false;
      this._clear();
    },
    deleteTag(tag) {
      let index = this.tags.indexOf(tag);
      this.tags.splice(index, 1);
      this.saveTagsToLocalStrage(this.tags);
    },
    addTagClicked() {
      this.addTagDialog = true;
    },
    editTagClicked(tag) {
      this.editedTag = tag;
      this.tagName = this.editedTag.name;
      console.log(this.tagName);
      this.addTagDialog = true;
    },
    loadFromLocalStrage() {
      this.tags = Tag.load();
    },
    saveTagsToLocalStrage(tags) {
      Tag.save(tags);
    },

    _clear() {
      this.tagName = "";
      this.editedTag = null;
    }
  }
};
</script>