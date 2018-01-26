
<template>
  <div>
    <v-data-table v-bind:headers="headers" :items="items" hide-actions :total-items="totalItems" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.charctername }}</td>
        <td class="text-xs-right">{{ props.item.initiative }}</td>
        <td class="text-xs-right">{{ props.item.initiativemodifier }}</td>
        <td>
          <!-- <CharacterEditor :character.sync="props.item" @onclick="onclick" @updatecharacter="update"></CharacterEditor> -->
          <CharacterEditor :character="props.item" @onclick="onclick" @updatecharacter="update"></CharacterEditor>
        </td>
      </template>
    </v-data-table>
    <v-btn @click="sort">ソート</v-btn>
  </div>
</template>

<style>

</style>

<script>
import CharacterEditor from './CharacterEditor.vue';

export default {
  data () {
    return {
      name: 'HelloWorld',
      totalItems: 2,
      editablecharacter: {},
      headers: [
        {
          text: 'キャラクター名',
          value: 'charctername',
          sortable: false
        },
        {
          text: 'イニシアチブ',
          value: 'initiative',
          sortable: false
        },
        {
          text: '修正値',
          value: 'initiativemodifier',
          sortable: false
        }
      ],
      items: [
        {
          charctername: 'ああああ',
          initiative: 1,
          initiativemodifier: 0
        },
        {
          charctername: 'いいい',
          initiative: 3,
          initiativemodifier: 0
        },
        {
          charctername: 'ううう',
          initiative: 3,
          initiativemodifier: 1
        },
        {
          charctername: 'えええ',
          initiative: 4,
          initiativemodifier: 1
        }
      ]
    }
  },
  components: {
    CharacterEditor
  },
  methods: {
    sort () {
      this.items.sort((a, b) => {
        if (a.initiative < b.initiative) {
          return 1
        } else if (a.initiative > b.initiative) {
          return -1
        } else if (a.initiativemodifier < b.initiativemodifier) {
          return 1
        } else {
          return 0
        }
      })
    },
    onclick (item) {
      this.editablecharacter = item
    },
    update (o) {
      Object.assign(this.editablecharacter, o)
      this.editablecharacter = {}
    }
  }
}
</script>