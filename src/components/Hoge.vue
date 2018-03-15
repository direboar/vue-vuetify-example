<template>
  <v-card>
    <v-card-title>
      <H2>D&D呪文検索用アプリケーションの利用方法</H2>
    </v-card-title>
    <v-card-text>
      <p>このアプリケーションは、D&D5版の呪文を検索するためのアプリケーションです。</p>
      <h3>重要事項</h3>
      <v-expansion-panel>
        <v-expansion-panel-content ripple lazy>
          <div slot="header">
            <h4>1.呪文データの扱い</h4>
          </div>
          <v-card>
            <v-card-text>本アプリケーションは、デフォルトではOpen SRDに掲載されている呪文のうち、一部の呪文のみを選別し、掲載しています。 本アプリケーションは、利用者が呪文データを独自に作成することで、日本語環境の呪文データを使用することが可能です。</v-card-text>
            <v-card-text>使用した呪文データは、本アプリケーションを使用するブラウザ上にのみ保存されます。よって、本アプリケーションを使用して、個人で作成した呪文データが第三者に自動的に配布されることはありません。よって、PHBをはじめとした日本語訳された呪文データの和訳データを、個人の責任で作成し、使用する分には、著作権法を侵害することはありません。</v-card-text>
            <v-card-text>ただし、個人が作成したデータを第三者に無断で譲渡した場合は、譲渡者が著作権法を侵害したことになりますので、十分ご注意ください。</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <h3>利用方法</h3>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">
            <h4>1.呪文データのロード</h4>
          </div>
          <v-card>
            <v-card-text><img src="../assets/upload.png">呪文データファイルをロードします。ほかの人が作成し、ダウンロードしたファイルを読み込むことができます。</v-card-text>
            <v-card-text><img src="../assets/save.png">ブラウザのローカルストレージに、現在の呪文データを保存します。次回以降は保存された呪文データが使用されます。</v-card-text>
            <v-card-text><img src="../assets/download.png">現在の呪文データを、ファイルにダウンロードします。ダウンロードしたデータはアップロードで読み込むことができます。</v-card-text>
            <v-card-text><img src="../assets/reload.png">ブラウザのローカルストレージに保存されている呪文データを再ロードします。再ロード前に行った呪文の追加・変更は失われます。</v-card-text>
            <v-card-text><img src="../assets/discard.png">ブラウザのローカルストレージから、呪文データを全削除します。</v-card-text>
            <v-card-text><img src="../assets/add.png">新しい呪文データを追加します。ダイアログが表示されるので、呪文データを作成してください。</v-card-text>
            <v-card-text><img src="../assets/help.png">このヘルプを表示します。</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">
            <h4>2.呪文の検索・表示</h4>
          </div>
          <v-card>
            <v-card-text>TODO</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">
            <h4>3.呪文の追加・編集・削除</h4>
          </div>
          <v-card>
            <v-card-text>TODO</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" flat @click.native="closeDialog">閉じる</v-btn>
    </v-card-actions>
  </v-card>
</template>
<style>

</style>

<script>
export default {
  data() {
    return {};
  }
};
</script>