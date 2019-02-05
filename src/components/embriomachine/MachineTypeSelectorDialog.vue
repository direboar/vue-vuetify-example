<template>
  <div>
    <v-dialog
      v-model="showDialog"
      persistent
      :fullscreen="isXs"
      max-width="500"
    >
      <v-card>
        <v-layout
          row
          wrap
        >
          <v-flex xs12>
            <v-layout
              row
              wrap
            >
              <v-flex
                sm5
                xs6
              >
                <v-radio-group
                  v-model="selectedMachineTypeName"
                  :mandatory="false"
                >
                  <v-radio
                    v-for="machineType in machineTypes"
                    :label="machineType.name"
                    :value="machineType.name"
                    :key="machineType.name"
                  ></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex
                sm7
                xs6
              >
                <v-layout
                  row
                  wrap
                >
                  <v-flex xs6>
                    <v-list dense>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">名称</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">移動力</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">回避値</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">装甲値</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">耐久値</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">イニシアチブ</v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                    <v-divider />
                  </v-flex>
                  <v-flex xs6>
                    <v-list dense>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">{{machineType.name}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">{{machineType.movility}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">{{machineType.evadeRate}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">{{machineType.armorPoint}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">{{machineType.constitution}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">{{machineType.initiative}}</v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                    <v-divider />
                  </v-flex>
                  <v-flex xs6>
                    <v-list dense>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">スロット</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">頭</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">胴</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">右腕</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">左腕</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">右脚</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">左脚</v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                  <v-flex xs6>
                    <v-list dense>
                      <v-list-tile>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">{{machineType.headSlot}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">{{machineType.bodySlot}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">{{machineType.rightArmSlot}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">{{machineType.leftArmSlot}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">{{machineType.rightLegSlot}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content :class="contentClass">{{machineType.leftLegSlot}}</v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      flat
                      @click.native="select"
                    >選択する</v-btn>
                    <v-btn
                      color="green darken-1"
                      flat
                      @click.native="closeDialog"
                    >閉じる</v-btn>
                  </v-card-actions>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
</style>

<script>
import MachineType from "@/model/embriomachine/machinetype";

export default {
  name: "MachineTypeSelectorDialog",
  props: {
    //ダイアログ表示フラグ。
    showDialog: {
      type: Boolean,
      default: true
    },
    //編集対象の装備データ。未選択の場合はnullを指定。
    targetMachineType: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      selectedMachineTypeName: this.targetMachineType.name,
      machineTypes: MachineType.getMachineTypes(),
      POSITION_CONST: MachineType.getPositionConst()
    };
  },

  watch: {
    targetMachineType: function(val) {
      if (val != null) {
        this.selectedMachineTypeName = val.name;
      } else {
        this.selectedMachineTypeName = "";
      }
    }
  },

  computed: {
    machineType() {
      let ret = {};
      this.machineTypes.forEach(item => {
        if (item.name === this.selectedMachineTypeName) {
          ret = item;
        }
      });
      return ret;
    },
    headSlot() {
      return this.machineType.headSlot;
      //return "";
      //return MachineType.POSITION_HEAD;
    },
    contentClass() {
      if (this.$vuetify.breakpoint.name === "xs") {
        return "caption";
      } else {
        return "subheading";
      }
    },
    isXs() {
      return this.$vuetify.breakpoint.name === "xs";
    }
  },

  methods: {
    closeDialog() {
      this.$emit("update:targetMachineType", {});
      this.$emit("cancel");
      this.selectedMachineTypeName = "";
      this.$emit("update:showDialog", false);
    },
    select() {
      this.$emit("update:targetMachineType", this.machineType);
      this.$emit("select", this.machineType);
      this.selectedMachineTypeName = "";
      this.$emit("update:showDialog", false);
    }
  }
};
</script>
