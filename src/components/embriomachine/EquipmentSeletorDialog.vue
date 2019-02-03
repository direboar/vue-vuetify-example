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
                <v-card>
                  <v-radio-group
                    v-model="selectedEquipmentName"
                    :mandatory="false"
                  >
                    <v-radio
                      v-for="equipment in equipments"
                      :label="equipment.name"
                      :value="equipment.name"
                      :key="equipment.name"
                    ></v-radio>
                  </v-radio-group>
                </v-card>
              </v-flex>
              <v-flex xs7>
                <v-card>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex xs12>
                      <v-list dense>
                        <v-list-tile>
                          <v-list-tile-content>名称:</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{equipment.name}}</v-list-tile-content>
                        </v-list-tile>
                        <v-divider />
                        <v-list-tile>
                          <v-list-tile-content>種別:</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{equipment.type}}</v-list-tile-content>
                        </v-list-tile>
                        <v-divider />
                        <v-list-tile>
                          <v-list-tile-content>射程</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{equipment.range}}</v-list-tile-content>
                        </v-list-tile>
                        <v-divider />
                        <v-list-tile>
                          <v-list-tile-content>ダメージ</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{equipment.damage}}({{equipment.damageType}})</v-list-tile-content>
                        </v-list-tile>
                        <v-divider />
                        <v-list-tile>
                          <v-list-tile-content>搭載可能部位</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{equipment.mountPosition}}</v-list-tile-content>
                        </v-list-tile>
                        <v-divider />
                        <v-list-tile>
                          <v-list-tile-content>最低枚数</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{equipment.formatMinLimit}}</v-list-tile-content>
                        </v-list-tile>
                        <v-divider />
                        <v-list-tile>
                          <v-list-tile-content>上限枚数</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{equipment.maxLimit}}</v-list-tile-content>
                        </v-list-tile>
                        <v-divider />
                      </v-list>
                    </v-flex>
                    <v-flex xs12>
                      <v-subheader>効果</v-subheader>
                      <v-card-text class="body-2">
                        <span
                          style="white-space: pre-wrap;"
                          v-html="equipment.effect"
                        ></span>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
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
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
</style>

<script>
import Equipment from "@/model/embriomachine/equipment";

export default {
  name: "EquipmentSeletorDialog",
  props: {
    //ダイアログ表示フラグ。
    showDialog: {
      type: Boolean,
      default: true
    },
    //編集対象の装備データ。未選択の場合はnullを指定。
    targetEquipment: {
      type: Object,
      default: null
    },
    //ダイアログ表示フラグ。
    targetPosition: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      selectedEquipmentName: this.targetEquipment.name
    };
  },

  watch: {
    targetEquipment: function(val) {
      if (val != null) {
        this.selectedEquipmentName = val.name;
      } else {
        this.selectedEquipment = "";
      }
    }
  },

  computed: {
    equipments() {
      return Equipment.getEquipments().filter(equipment => {
        if (this.targetPosition === null) {
          return true;
        } else {
          return equipment.canEquip(this.targetPosition);
        }
      });
    },

    equipment() {
      let ret = {};
      this.equipments.forEach(item => {
        if (item.name === this.selectedEquipmentName) {
          ret = item;
        }
      });
      return ret;
    }
  },

  methods: {
    closeDialog() {
      this.$emit("update:targetEquipment", {});
      this.$emit("cancel");
      this.selectedEquipmentName = "";
      this.$emit("update:showDialog", false);
    },
    select() {
      this.$emit("update:targetEquipment", this.equipment);
      this.$emit("select", this.equipment);
      //this.$emit("selected", this.equipment);
      this.selectedEquipmentName = "";
      this.$emit("update:showDialog", false);
    }
  }
};
</script>
