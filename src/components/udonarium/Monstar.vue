<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                ユドナリウム　モンスターデータキャラコマ
              </h3>
              <div>
                D&D5版
                SRDのモンスターデータを元に、自動作成したユドナリウムのキャラクターデータを提供します。
              </div>
            </div>
          </v-card-title>
          <v-carousel
            :style="{height:height}"
            :hide-delimiters="true"
          >
            <v-carousel-item
              v-for="(item,i) in items"
              :key="i"
            >
              <img
                :src="item"
                :style="{height:height}"
              />
            </v-carousel-item>
          </v-carousel>
          <v-card-text>
            <h5 class="headline mb-0">
              <a href="./static/SRD_MonstarDataUdonarium.1.0.3.zip">ここからダウンロードしてください</a><br />
            </h5>
            <br />
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
            <br />
            <h5 class="headline mb-0">
              コマの仕様
            </h5>
            <p>
              コマの大きさは、クリーチャーのサイズに応じて調整しています。
            </p>
            <p>
              コマの詳細画面は、デフォルトサイズで開いたときに一番見やすくなるように調整しています。<br />
              見やすくなるように、クリーチャーの名前の後ろにスペースを追加しています。これを削除すると詳細画面が崩れて見づらくなります。<br />
              また、詳細画面を最大化するなどサイズを広げると、かえって見づらくなると思います。
            </p>
            <p>
              詳細画面の「特徴」「アクション」「レジェンダリーアクション」については、原文と対となるように日本語訳をつけています。<br />
              日本語訳は、Google翻訳で自動翻訳した結果をそのままつけています。<br />
              特にゲーム用語などは自動翻訳では意味が通らない箇所があると思います。その際は、原文も併せて参照するようにしてください。<br />
              翻訳対象は、ベーシックルール掲載のモンスターに限定しています。
            </p>
            <p>
              チャットパレットは、以下のダイスロールを可能にしています。
              <ol>
                <li>能力値判定</li>
                <li>技能判定</li>
                <li>セービングスロー</li>
                <li>イニシアチブ</li>
                <li>代表的な攻撃ロールとダメージロール</li>
              </ol>
              攻撃ロールとダメージロールは、原文の文字列パターンをベースに抽出しています。そのため、完璧に抽出できていない可能性があります。<br />
              使用前に、元のモンスターデータを必ず参照してください。<br />
            </p>
            <p>
              ダメージロールは特に注意してください。<br />
              ヒット時の効果の原文が、&lt;xx damege plus yy damage&gt;という形式になっている場合は、以下のようにまとめてダメージを振れるよう、チャットパレットを生成しています。<br />
              <img
                class="chatpallette"
                border="5"
                v-bind:src="require('@/assets/udonarium/chatpallette1.png')"
              />
              <br />
              上記以外の記載の場合は、チャットパレット上で自動で振ることはできません。<br />
              チャットパレット上、ダイスロールの左側にヒット時の効果の原文をそのまま添付しているので、原文のテキストを参照して個別に対応してください。<br />
              （英語を読むのが面倒な場合、機械翻訳による日本語訳が詳細画面の「アクション」に記載されているので、そちらを参照して下さい）
            </p>
            <br />
            <h5 class="headline mb-0">
              データの精度について
            </h5>
            <p>
              代表的なデータをサンプリングして、内容を確認しています。ただし、全量確認はしていません。（お仕事じゃないので、、）<br />
              必要に応じて、元データやルールブックを参照して内容の妥当性を確認してください。
            </p>
            <p>
              もし誤りを見つけた場合、<a href="https://twitter.com/minokuba">「みのくば」</a>までDM等でご連絡ください。<br />
              必ず修正することはお約束はできませんが、より良いものにできると思いますので、是非ご連絡ください。<br />
              連絡いただいた場合、類似のミスに私が気が付くことができるので、全体的な質の向上につながります。<br />
            </p>
            <br />
            <h5 class="headline mb-0">
              コマに含まれるデータについて
            </h5>
            <p>
              コマデータのZIPファイルには、モンスターの画像データは含まれておりません。<br />
              コマデータにはモンスターの画像データのURLが記載されています。<br />
              ユドナリウム上でコマデータを表示する際、このURLを元に画像データが表示されます。<br />
            </p>
            <br />
            <h5 class="headline mb-0">
              ライセンス
            </h5>
            <p>
              このデータは<a v-on:click="showLicence = true">Open Game Licence</a>が適用されます。
            </p>
          </v-card-text>
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
    <v-dialog
      fullscreen
      v-model="showLicence"
    >
      <v-card>
        <OpenLicence :showDialog.sync="showLicence" />
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
img.chatpallette {
  border: 2px solid #131213;
}
</style>
<script>
import OpenLicence from "@/components/udonarium/OpenLicence";

export default {
  components: {
    OpenLicence: OpenLicence
  },

  mounted() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  },
  computed: {
    height() {
      // switch(this.$vuetify.breakpoint.name)
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "220px";
        case "sm":
          return "400px";
        case "md":
          return "500px";
        case "lg":
          return "600px";
        case "xl":
          return "800px";
      }
    }
  },
  data() {
    return {
      showLicence: false,
      items: [
        "./static/images/udonarium/monstars.png",
        "./static/images/udonarium/dragon-1.png",
        "./static/images/udonarium/dragon-2.png"
      ]
    };
  }
};
</script>
