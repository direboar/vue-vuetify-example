<template>
  <v-container
    fluid
    grid-list-md
  >
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <v-card hover>
          D&D5版をユドナリウムで遊ぶ際に使用する、モンスターやプレイヤーのキャラコマ作成を支援します。
        </v-card>
      </v-flex>
      <v-flex
        xs12
        md6
      >
        <v-card
          to="/udonarium/monstar"
          height="300px"
        >
          <v-card-title>
            <H3>ユドナリウム　モンスターデータキャラコマ</H3>
          </v-card-title>
          <!--https://github.com/vuetifyjs/vuetify/issues/1239-->
          <v-card-media
            src="./static/images/udonarium/monstars.png"
            contain
            height="200px"
          />
          <v-card-text>D&D５版のユドナリウム　モンスターデータキャラコマを提供します。</v-card-text>
        </v-card>
      </v-flex>
      <v-flex
        xs12
        md6
      >
        <v-card
          to="/udonarium/playercharacter"
          height="300px"
        >
          <v-card-title>
            <H3>D&D5Eプレイヤーキャラクター コマ作成</H3>
          </v-card-title>
          <v-card-media
            src="./static/images/udonarium/character.png"
            contain
            height="200px"
          />
          <v-card-text><a href="http://dndjp.sakura.ne.jp/LIST.php">D&D5E キャラクターデータベース</a>に登録したキャラクターの情報から、ユドナリウムのキャラコマを作成します。</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <H3>当サイトに掲載されている広告について</H3>
          </v-card-title>
          <v-card-text>
            当サイトは第三者配信の広告サービス「
            <a href="http://www.google.com/adsense/start/">Google Adsense グーグルアドセンス」</a>を利用しています。
            <p />
            広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie（クッキー）を使用することがあります。
            Cookie（クッキー）を無効にする設定およびGoogleアドセンスに関する詳細は「
            <a href="http://www.google.co.jp/policies/technologies/ads/">広告 – ポリシーと規約 – Google</a>」をご覧ください。
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <H3>今後の機能追加予定について</H3>
          </v-card-title>
          <v-card-text>
            ・キャラクターごとに管理する呪文書作成機能
            <p />
            ・キャラクタービルダー（検討中）
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
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
  </v-container>
</template>

<style></style>

<script>
export default {
  mounted() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
};
</script>
