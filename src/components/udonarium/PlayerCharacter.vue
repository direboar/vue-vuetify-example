<template>
  <div>
    <a
      href="#"
      ref="downloadlink"
      class="display : none"
    ></a>
    <v-card>
      <v-toolbar
        card
        dark
        color="blue lighten-1"
      >
        <v-toolbar-title>D&D5Eプレイヤーキャラクター コマ作成</v-toolbar-title>
      </v-toolbar>
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <v-card-text>
            <h5>
              <a href="http://dndjp.sakura.ne.jp/LIST.php">D&D5E キャラクターデータベース</a>に登録したキャラクターの情報から、ユドナリウムのキャラコマを作成します。
              以下のURLにキャラクターのURLを張り付け、「コマ作成」を押してください。
            </h5>
          </v-card-text>
        </v-flex>
        <v-flex xs8>
          <v-text-field
            class="ml-3 mr-3"
            v-model="url"
            label="D&D5E キャラクターデータベースに作成したキャラクターのURLを張り付けてください"
          ></v-text-field>
        </v-flex>
        <v-flex xs4>
          <v-btn
            class="white--text"
            color="indigo lighten-1"
            @click.native="create"
          >コマ作成</v-btn>
        </v-flex>
        <v-card-text>
          <div v-if="inProgress">
            <v-flex xs3>
              <b>コマを作成しています・・・</b>
            </v-flex>
            <v-flex xs9 />
            <v-flex xs12>
              <v-progress-linear :indeterminate="true"></v-progress-linear>
            </v-flex>
          </div>
        </v-card-text>
        <v-spacer></v-spacer>
      </v-layout>
    </v-card>
    <v-snackbar
      top
      :color="snackbar.level"
      :timeout="3000"
      v-model="snackbar.show"
    >
      {{ errorMessage }}
    </v-snackbar>
  </div>
</template>

<style></style>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      url: "http://dndjp.sakura.ne.jp/OUTPUT.php?ID=xxx",
      inProgress: false,
      //アラートダイアログ
      snackbar: {
        show: false,
        level: "error"
      },
      errorMessage: null
    };
  },

  watch: {},

  computed: {},

  methods: {
    create() {
      (async () => {
        try {
          if (this.url) {
            const lower = this.url.trim().toLowerCase();
            const regex = /http:\/\/dndjp.sakura.ne.jp\/output\.php\?id=(?<id>[0-9]+)/;
            const match = lower.match(regex);
            if (match && match.groups) {
              const id = match.groups.id;
              this.inProgress = true;
              const helloWorld = firebase
                .functions()
                .httpsCallable("helloWorld", { timeout: 60000 });
              const response = await helloWorld({ id: id });
              let downloadlink = this.$refs.downloadlink;
              downloadlink.href = response.data.url;
              if (this.fileName) {
                downloadlink.download = this.fileName;
              }
              downloadlink.click();
              this.showInfoMessage("コマの作成が完了しました。");
            } else {
              this.showErrorMessage(
                `URLの形式が誤っています。キャラクターシートのURLを直接貼り付けてください。`
              );
            }
          }
        } catch (error) {
          window.console.error(error);
          window.console.error(JSON.stringify(error));
          window.console.error(`message=${error.details.message}`);
          this.showErrorMessage(
            `コマの生成に失敗しました。message=${error.details.message}`
          );
        } finally {
          this.inProgress = false;
        }
      })();
    },
    showErrorMessage(errorMessage) {
      this.errorMessage = errorMessage;
      this.snackbar = { show: true, level: "error" };
    },
    showInfoMessage(errorMessage) {
      this.errorMessage = errorMessage;
      this.snackbar = { show: true, level: "info" };
    }
    // download(url) {
    //   //https://developer.mozilla.org/ja/docs/Web/API/Blob
    //   //https://stackoverflow.com/questions/30694453/blob-createobjecturl-download-not-working-in-firefox-but-works-when-debugging 隠しリンクを作ってonClickでダウンロード
    //   var blob = new Blob([this.data()], {
    //     type: "application/octet-stream;charset=UTF-8;"
    //   });
    // }
    // closeDialog() {
    //   this.$emit("update:showDialog", false);
    // },
    // save() {
    //   this.l_tags.forEach(tag => {
    //     if (
    //       this.selectedTags.some(selectedTag => {
    //         selectedTag.spellname === tag.spellname;
    //       })
    //     ) {
    //       tag.addSpellName(this.spellname);
    //     } else {
    //       tag.removeSpellName(this.spellname);
    //     }
    //   });
    //   this.selectedTags.forEach(tag => {
    //     tag.addSpellName(this.spellname);
    //   });

    //   this.$emit("save", this.l_tags);
    //   this.clear();
    // },
    // close() {
    //   this.$emit("cancel");
    //   this.clear();
    // },
    // clear() {
    //   this.selectedTags = [];
    //   this.newTagName = "";
    //   this.snackbar.show = false;
    // },
    // addTag() {
    //   if (this.validateerror) {
    //     this.snackbar.show = true;
    //   } else {
    //     const newTag = new Tag();
    //     newTag.name = this.newTagName;
    //     this.l_tags.push(newTag);
    //     this.newTagName = "";
    //   }
    // }
  }
};
</script>
