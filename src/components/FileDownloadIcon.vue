<!--
  ファイルをダウンロードできるボタンです。
　ダウンロードするデータは、dataにバインドしてください。
  -->
<template>
  <div>
    <v-tooltip top>
      <v-btn icon small slot="activator" @click="download">
        <v-icon>file_download</v-icon>
      </v-btn>
      <span>{{tooltip}}</span>
    </v-tooltip>
    <a href="#" ref="downloadlink" class="display : none"></a>
  </div>
</template>

<style>

</style>

<script>
export default {
  props: {
    tooltip: {
      type: String,
      default: "ファイルダウンロード"
    },
    data: {
      type: String,
      required: true
    }
  },
  methods: {
    download() {
      //https://developer.mozilla.org/ja/docs/Web/API/Blob
      //https://stackoverflow.com/questions/30694453/blob-createobjecturl-download-not-working-in-firefox-but-works-when-debugging 隠しリンクを作ってonClickでダウンロード
      var blob = new Blob([this.data], {
        type: "application/octet-stream;charset=UTF-8;"
      });

      let downloadlink = this.$refs.downloadlink;
      downloadlink.href = URL.createObjectURL(blob);
      downloadlink.click();
    }
  }
};
</script>