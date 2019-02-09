<template>
  <div>
    <v-layout
      column
      justify-center
      align-center
      dark
    >
      <!-- The surrounding HTML is left untouched by FirebaseUI.
     Your app may use that space for branding, controls and other customizations.-->
      <h1>Welcome to My Awesome App</h1>
      <div id="loader">Loading...</div>
    </v-layout>
    <v-btn v-on:click="login()">
      <v-icon>fab fa-twitter-square</v-icon>ログイン
    </v-btn>
  </div>
</template>

<style>
</style>

<script>
import firebase from "firebase";
import firebaseui from "firebaseui";

export default {
  data: () => ({
    config: {
      signInFlow: "popup",
      signInSuccessUrl: "#/embrioMachine/MachineList",
      signInOptions: [firebase.auth.TwitterAuthProvider.PROVIDER_ID]
    }
  }),

  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        alert(JSON.stringify(user));
      } else {
        // No user is signed in.
      }
    });

    let ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", this.config);
  },

  methods: {
    login() {
      var provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().languageCode = "jp";
      firebase.auth().signInWithRedirect(provider);
    }
  }
};
</script>

