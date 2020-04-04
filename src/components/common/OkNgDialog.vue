<template>
  <div>
    <v-dialog
      v-model="showDialog"
      :max-width="dialogSize"
      :persistent="true"
    >
      <v-card>
        <v-layout
          row
          wrap
        >
          <v-flex xs12>
            <v-card-text>
              {{message}}
            </v-card-text>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs3 />
          <v-flex xs3>
            <v-btn
              color="green darken-1"
              flat
              @click.native="YES"
            >はい</v-btn>
          </v-flex>
          <v-flex xs3>
            <v-btn
              color="green darken-1"
              flat
              @click.native="NO"
            >いいえ</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
</style>

<script>
export default {
  name: "OkNgDialog",
  props: {
    //ダイアログ表示フラグ
    dialogSize: {
      type: Number,
      default: 700
    },
    showDialog: {
      type: Boolean,
      default: true
    },
    message: {
      type: String,
      default: ""
    }
  },

  data() {
    return {};
  },

  watch: {},

  methods: {
    YES() {
      this.$emit("callback", true);
      this.$emit("update:showDialog", false);
    },
    NO() {
      this.$emit("callback", false);
      this.$emit("update:showDialog", false);
    }
  }
};
</script>
