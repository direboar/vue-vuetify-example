<!--
  ファイルをDrag and Dropできるエリアです。
　取得したファイルは、onFileReadイベントで取得してください。
  -->
<template>
  <v-card class="blue lighten-4" @dragleave.prevent @dragover.prevent @drop.prevent="onDrop">
    <v-card-text>{{message}}</v-card-text>
  </v-card>
</template>
<style>

</style>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "ファイルをドラッグしてください"
    }
  },
  methods: {
    onDrop(e) {
      var dt = e.dataTransfer;
      var files = dt.files;
      this.$emit("onFileRead", files);
    }
  }
};
</script>