<template>
  <div>
    <v-layout column justify-center align-center>
      <v-subheader>Offset Top</v-subheader>
      {{ offsetTop }}
    </v-layout>
    <v-container style="max-height: 400px" class="scroll-y" id="scroll-target">
      <v-layout column align-center justify-center class="scroll-y" style="height: 1000px">
      </v-layout>
    </v-container>
  </div>
</template>

<style>

</style>

<script>
export default {
  data: () => ({
    offsetTop: 0
  }),

  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    }
  }
};
</script>

