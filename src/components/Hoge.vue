<template>
  <v-container fluid>
    <v-layout row wrap>
      <file-upload-button @onFileRead="onFileRead" />
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6>
        <file-drag @onFileRead="onFileRead"></file-drag>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <template v-for="(spell,index) in spells">
            <v-card-text :key="index">{{spell.name}}</v-card-text>
          </template>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template><style>

</style>

<script>
import FileDrag from "@/components/FileDrag";
import FileUploadButton from "@/components/FileUploadButton";

export default {
  components: {
    FileDrag: FileDrag,
    FileUploadButton: FileUploadButton
  },
  data() {
    return {
      spells: [
        {
          name: "-"
        }
      ]
    };
  },
  methods: {
    onFileRead(files) {
      for (const file of files) {
        let fileReader = new FileReader();
        fileReader.onload = data => {
          let json = data.target.result;
          alert(json);
          let spells = JSON.parse(json);
          alert(spells.spells.length);
          this.spells = spells.spells;
        };
        fileReader.readAsText(file);
      }
    }
  }
};
</script>