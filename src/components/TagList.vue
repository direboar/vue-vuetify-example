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
                    @click="deleteTagClicked(item)"
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
      :showDialog="addTagDialog"
      :tagName="tagName"
      @save="saveTag"
      @cancel="cancelTag"
    />
    <!--タグ削除確認ダイアログ-->
    <ok-ng-dialog
      :showDialog.sync="showConfirmDialog"
      :message="confirmDialogMessage"
      @callback="callbackConfirmDialog"
    />
  </div>
</template>

<style>
</style>

<script>
import TagEditDialog from "@/components/TagEditDialog";
import OkNgDialog from "@/components/common/OkNgDialog";
import Tag from "@/model/tag";

export default {
  components: {
    TagEditDialog,
    OkNgDialog
  },
  mounted() {
    this.loadFromLocalStrage();
  },
  data() {
    return {
      addTagDialog: false,
      editedTag: null,
      deleteTag: null,
      tagName: "",
      tags: [],
      showConfirmDialog: false
    };
  },
  computed: {
    confirmDialogMessage() {
      if (this.deleteTag) {
        return this.deleteTag.name + "を削除します。よろしいですか？";
      } else {
        return "";
      }
    }
  },
  methods: {
    saveTag(tagName) {
      this.addTagDialog = false;
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
    deleteTagClicked(tag) {
      this.deleteTag = tag;
      this.showConfirmDialog = true;
    },
    addTagClicked() {
      this.addTagDialog = true;
    },
    editTagClicked(tag) {
      this.editedTag = tag;
      this.tagName = this.editedTag.name;
      this.addTagDialog = true;
    },
    loadFromLocalStrage() {
      this.tags = Tag.load();
    },
    saveTagsToLocalStrage(tags) {
      Tag.save(tags);
    },
    callbackConfirmDialog(callback) {
      if (callback) {
        let index = this.tags.indexOf(this.deleteTag);
        this.tags.splice(index, 1);
        this.saveTagsToLocalStrage(this.tags);
      }
      this._clear();
    },
    _clear() {
      this.tagName = "";
      this.editedTag = null;
      this.deleteTag = null;
    }
  }
};
</script>