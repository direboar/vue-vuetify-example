<template>
  <v-container fluid>
    <v-layout row wrap>
      <!--@see https://developer.mozilla.org/ja/docs/Web/API/File/Using_files_from_web_applications-->
      <!--@see https://qiita.com/komatzz/items/f2a25db16aca388845d3-->
      <input type="file" v-on:change="onFileChange($event)">

      <input type="file" id="fileElem" multiple accept="image/*" style="display:none" onchange="handleFiles(this.files)">
      <a href="#" id="fileSelect">ファイルを選択</a>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6>
        <file-drag @onFileRead="onReadFile"></file-drag>
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

export default {
  components: {
    FileDrag: FileDrag
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
    onReadFile(files) {
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