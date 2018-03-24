<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card hover>
          このサイトは、D&D5版のキャラクター作成を支援するツールを提供するページです。
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card to="SpellSerach" height="300px">
          <v-card-title>
            <H3>呪文検索</H3>
          </v-card-title>
          <!--https://github.com/vuetifyjs/vuetify/issues/1239-->
          <v-card-media v-bind:src="require('@/assets/spells.png')" contain height="200px" />
          <v-card-text>D&D５版の呪文検索・内容照会を行います。</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card to="AbilityEditor" height="300px">
          <v-card-title>
            <H2>能力値編集</H2>
          </v-card-title>
          <v-card-media v-bind:src="require('@/assets/ability.png')" contain height="200px" />
          <v-card-text>能力値計算を行います。</v-card-text>
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
            <p/> 広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie（クッキー）を使用することがあります。 Cookie（クッキー）を無効にする設定およびGoogleアドセンスに関する詳細は「
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
            <p/>・キャラクタービルダー（検討中）
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9097509632200457" data-ad-slot="5985300299" data-ad-format="auto"></ins>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>

</style>

<script>
export default {
  mounted() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
};
</script>
