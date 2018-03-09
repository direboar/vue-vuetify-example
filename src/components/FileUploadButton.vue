<!--
  ファイルをアップロードできるボタンです。
　取得したファイルは、onFileReadイベントで取得してください。
  -->
<template>
  <div>
    <v-btn @click="onClick">{{message}}</v-btn>
    <input ref="fileUploadForm" type="file" style="display: none;" @change="uploaded" />
  </div>
</template>

<style>

</style>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "ファイルをアップロード"
    }
  },
  methods: {
    onClick() {
      let fileUploadForm = this.$refs.fileUploadForm;
      fileUploadForm.click();
    },
    uploaded(e) {
      let files = e.target.files;
      this.$emit("onFileRead", files);
    }
  }
};
</script>