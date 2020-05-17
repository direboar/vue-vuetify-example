<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      width="220"
    >
      <v-list dense>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          @click="route(item)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="brown lighten-1"
      dark
      dense
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import router from "@/router/index";

export default {
  router: router,
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mode_edit",
          title: "ユドナリウムMonster",
          linkTo: "UdnonariumMonstar"
        },
        {
          icon: "mode_edit",
          title: "ユドナリウムPCコマ",
          linkTo: "UdnonariumPlayerCharacter"
        },
        {
          icon: "find_in_page",
          title: "呪文検索",
          linkTo: "SpellSerachTable"
        },
        {
          icon: "note",
          title: "呪文検索タグ管理",
          linkTo: "TagList"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "D&D5版 キャラクター作成支援ツール"
    };
  },
  name: "App",
  methods: {
    route(item) {
      router.push({
        name: item.linkTo
      });
    }
  }
};
</script>
