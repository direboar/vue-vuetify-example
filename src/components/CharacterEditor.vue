<template>
  <v-dialog v-model="dialog" persistent max-width="480" @input="input">
    <v-btn color="primary" dark slot="activator" @click="onclick">{{btnmessage}}</v-btn>
    <v-card color="grey lighten-4" flat>
      <v-card-text>
        <v-container fluid>
          <v-text-field name="キャラクター名" label="キャラクター名" id="charctername" v-model="editcharacter.charctername"/>
          <v-text-field name="イニシアチブ修正値" label="イニシアチブ修正値" v-model="editcharacter.initiativemodifier" />
          <v-text-field name="イニシアチブ" label="イニシアチブ" v-model="editcharacter.initiative" />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click.native="save">セーブ</v-btn>
        <v-btn color="green darken-1" flat @click.native="cancel">キャンセル</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CharacterEditor',
  props: {
    btnmessage: {
      type: String,
      default: 'Edit'
    },
    character: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      editcharacter: {
        charctername: '',
        initiative: 0,
        initiativemodifier: 0
      },
      dialog: false
    }
  },
  methods: {
    onclick () {
      this.$emit('onclick', this.character)
    },
    input () {
      Object.assign(this.editcharacter, this.character)
      this.dialog = true
    },
    save () {
      this.dialog = false
      // .syncではうまくいかないぞ…
      // this.$emit('update:character', {
      //   charctername: this.editcharacter.charctername,
      //   initiative: this.editcharacter.initiative,
      //   initiativemodifier: this.editcharacter.initiativemodifier
      // })
      this.$emit('updatecharacter', this.editcharacter)
      this.editcharacter = {}
    },
    cancel () {
      this.dialog = false
    }
  }
}
</script>
