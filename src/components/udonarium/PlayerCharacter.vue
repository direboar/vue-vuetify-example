<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <a
          href="#"
          ref="downloadlink"
          class="display : none"
        ></a>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                D&D5Eプレイヤーキャラクター コマ作成
              </h3>
              <div>
                <a href="http://dndjp.sakura.ne.jp/LIST.php">D&D5E キャラクターデータベース</a>に登録したキャラクターの情報から、ユドナリウムのキャラコマを作成します。
                以下のURLにキャラクターのURLを張り付け、「コマ作成」を押してください。
              </div>
            </div>
          </v-card-title>
          <v-card-text>
            <h5 class="headline mb-0">
              支援について
            </h5>
            <p>気が向いたらウィッシュリストに支援いただけると喜びます＆モチベーションが上がります！
              <ul>
                <li><a href="https://www.amazon.co.jp/hz/wishlist/ls/3P2TRNT5L21EU">お酒等</a></li>
                <li><a href="https://www.amazon.co.jp/%E3%82%AE%E3%83%95%E3%83%88%E5%88%B8/b?ie=UTF8&node=2351652051">E-Mailでのギフト券</a>(minokuba.dnd@gmail.comまで。15円～可です！)</li>
                <li><a href="https://www.amazon.co.jp/hz/wishlist/ls/PZNEEB7AYNDD">郵送でのギフト券(500円～可能）</a></li>
              </ul>
            </p>
          </v-card-text>
          <v-card-action>
            <v-layout
              row
              wrap
            >
              <v-flex xs8>
                <v-card-text>
                  <v-text-field
                    class="ml-3 mr-3"
                    v-model="url"
                    label="D&D5E キャラクターデータベースに作成したキャラクターのURLを張り付けてください"
                  ></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-card-text>
                  <v-btn
                    class="white--text"
                    color="indigo lighten-1"
                    @click.native="create"
                    :disabled="inProgress"
                  >コマ作成</v-btn>
                </v-card-text>
              </v-flex>
              <v-flex
                sm11
                md6
                lg4
                v-if="inProgress"
              >
                <v-card-text>
                  <b>コマを作成しています・・・</b>
                </v-card-text>
              </v-flex>
              <v-flex
                sm1
                md6
                lg8
                v-if="inProgress"
              />
              <v-flex
                xs12
                v-if="inProgress"
              >
                <v-card-text>
                  <v-progress-linear :indeterminate="true"></v-progress-linear>
                </v-card-text>
              </v-flex>
              <v-spacer></v-spacer>
            </v-layout>
          </v-card-action>
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
        <v-snackbar
          top
          :color="snackbar.level"
          :timeout="3000"
          v-model="snackbar.show"
        >
          {{ errorMessage }}
        </v-snackbar>
      </v-flex>
    </v-layout>
  </div>
</template>

<style></style>

<script>
// import firebase from "firebase";
import axios from "axios";

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

  mounted() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
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
              const request = {
                data: {
                  id: id
                }
              };
              const response = await axios.post(
                process.env.UDONARIUM_CHARACTER_API,
                request,
                { responseType: "arraybuffer" }
              );
              const contentDisposition =
                response.headers["content-disposition"];
              const filename = this.parseContentDisposition(contentDisposition);
              const url = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/octet-stream" })
              );
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", filename); //or any other extension
              document.body.appendChild(link);
              link.click();
              this.showInfoMessage("コマの作成が完了しました。");
            } else {
              this.showErrorMessage(
                `URLの形式が誤っています。キャラクターシートのURLを直接貼り付けてください。`
              );
            }
          }
        } catch (error) {
          console.error(error);
          const detail = Buffer.from(error.response.data).toString("utf8");
          console.error(detail);
          const errorJson = JSON.parse(detail);
          if (errorJson.details) {
            this.showErrorMessage(
              `コマの生成に失敗しました。message=${errorJson.details.message}`
            );
          } else {
            this.showErrorMessage(
              `コマの生成で想定外のエラーが発生しました。message=${error}`
            );
          }
        } finally {
          this.inProgress = false;
        }
      })();
    },
    parseContentDisposition(contentDisposition) {
      const parsed = contentDisposition.split(";");
      return parsed.reduce((accumulator, item) => {
        if (accumulator) {
          return accumulator;
        }
        item = item.trim();
        if (item.startsWith("filename=")) {
          const lastDoubleQuote = item.lastIndexOf('"');
          const filename = item.slice(10, lastDoubleQuote);
          console.log(filename);
          return decodeURIComponent(filename);
        } else {
          return null;
        }
      }, null);
    },
    showErrorMessage(errorMessage) {
      this.errorMessage = errorMessage;
      this.snackbar = { show: true, level: "error" };
    },
    showInfoMessage(errorMessage) {
      this.errorMessage = errorMessage;
      this.snackbar = { show: true, level: "info" };
    }
  }
};
</script>
