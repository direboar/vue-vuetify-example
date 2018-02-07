<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar color="cyan" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>Classes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list>
            <template v-for="item in items">
              <v-subheader v-if="item.header" v-bind:key="item.id" v-text="item.header"></v-subheader>
              <v-divider  v-else-if="item.divider" v-bind:key="item.id" v-bind:inset="item.inset"></v-divider>
              <v-list-tile avatar v-else v-bind:key="item.id" @click="openDialog(item)">
                <v-list-tile-avatar>
                  <img v-bind:src="item.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.name"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog persistent max-width="500" v-model="dialog" v-if="dialog">
        <v-card color="grey lighten-4">
        <v-card-title class="headline">Class : {{currentitem.name}}</v-card-title>
        <v-card-text >ヒットダイス : 1d{{currentitem.hit_die}}</v-card-text>
        <v-card-text>技能習熟 : {{proficiencychoices}}</v-card-text>
        <v-card-text>武器習熟 : {{proficiencie}}</v-card-text>
        <v-card-text>セービングスロー : {{savingthrow}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Close.</v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<style>

</style>

<script>
import Dnd5eapi from '../api/dnd5eapi';

const api = new Dnd5eapi()
export default {
  data () {
    return {
      items: [],
      dialog: false,
      currentitem: {},
      proficiency_choices: undefined
    }
  },
  created () {
    this.items.push({ header: 'Classes', id: -1 })
    api.classes(aClass => {
      this.items.push(aClass)
    })
  },
  computed: {
    proficiencychoices () {
      let ret = '';
      this.proficiency_choices.from.forEach((element, i) => {
        ret = ret + element.name.replace('Skill: ', '') + ', ';
      })
      return ret
    },
    proficiencie () {
      let ret = '';
      this.currentitem.proficiencies.forEach((element, i) => {
        ret = ret + element.name + ', ';
      })
      return ret
    },
    savingthrow () {
      let ret = '';
      if (this.currentitem === undefined) {
        return ret
      } else {
        this.currentitem.saving_throws.forEach((element, i) => {
          ret = ret + element.name + ', ';
        })
        return ret
      }
    }
  },
  methods: {
    openDialog (item) {
      api.classOf(item.url, aClsss => {
        this.currentitem = aClsss
        this.proficiency_choices = this.currentitem.proficiency_choices[0]
        this.dialog = true
      })
    }
  }
}
</script>