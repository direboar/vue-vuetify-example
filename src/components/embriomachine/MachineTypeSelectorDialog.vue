<template>
  <div>
    <v-dialog
      v-model="showDialog"
      max-width="500"
      persistent
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
              <v-flex xs5>
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
              <v-flex xs7>
                <v-layout
                  row
                  wrap
                >
                  <v-flex xs12>
                    <v-list dense>
                      <v-list-tile>
                        <v-list-tile-content>名称:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{machineType.name}}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content>移動力:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{machineType.movility}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>回避値:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{machineType.evadeRate}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>装甲値:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{machineType.armorPoint}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>耐久値:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{machineType.constitution}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>イニシアチブ:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{machineType.initiative}}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content>スロット（頭）:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{machineType.headSlot}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>スロット（胴）:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{machineType.bodySlot}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>スロット（右腕）:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{machineType.rightArmSlot}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>スロット（左腕）:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{machineType.leftArmSlot}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>スロット（右足）:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{machineType.rightLegSlot}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>スロット（左足）:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{machineType.leftLegSlot}}</v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                </v-layout>
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
      machineTypes: MachineType.getMachineTypes()
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
