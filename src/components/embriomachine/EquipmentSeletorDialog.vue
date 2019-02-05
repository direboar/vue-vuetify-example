<template>
  <div>
    <v-dialog
      v-model="showDialog"
      :persistent="editMode"
      max-width="800"
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
              <v-flex xs3>
                <v-radio-group
                  label="ランク"
                  v-model="rank"
                  row
                >
                  <v-radio
                    v-for="rank in ranks"
                    :label="rank"
                    :value="rank"
                    :key="rank"
                    :disabled="!editMode"
                    class="body-1"
                  ></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs9>
                <v-radio-group
                  label="種類"
                  v-model="type"
                  row
                  class="body-1"
                >
                  <v-radio
                    v-for="type in types"
                    :label="type"
                    :value="type"
                    :key="type"
                    :disabled="!editMode"
                  ></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs5>
                <v-radio-group
                  label="装備"
                  v-model="selectedEquipmentName"
                  :mandatory="false"
                >
                  <v-radio
                    v-for="equipment in equipments"
                    :label="formatEquipmentName(equipment)"
                    :value="equipment.name"
                    :key="equipment.name"
                    :disabled="!editMode"
                  ></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs7>
                <v-layout
                  row
                  wrap
                >
                  <v-flex xs6>
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">名称:</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">種別:</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">射程</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">ダメージ</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">搭載可能部位</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">最低枚数</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">上限枚数</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                    </v-list>
                  </v-flex>
                  <v-flex xs6>
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">{{equipment.name}}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">{{equipment.type}}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">{{equipment.range}}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">{{this.formatDamage(equipment)}}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">{{equipment.mountPosition}}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">{{equipment.formatMinLimit}}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">{{equipment.maxLimit}}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                    </v-list>
                  </v-flex>
                  <v-flex xs12>
                    <v-card-text class="body-1">
                      <span
                        style="white-space: pre-wrap;display: inline-block;height:100px;"
                        v-html="equipment.effect"
                      ></span>
                    </v-card-text>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs6>
                    <v-select
                      v-if="editMode"
                      :items="itemcounts"
                      v-model="itemcount"
                      label="追加装備数"
                      item-value="text"
                    ></v-select>
                  </v-flex>
                  <v-flex xs6>
                    <v-btn
                      v-if="editMode"
                      color="green darken-1"
                      flat
                      @click.native="select"
                    >選択する</v-btn>
                    <v-btn
                      color="green darken-1"
                      flat
                      @click.native="closeDialog"
                    >閉じる</v-btn>
                  </v-flex>
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
    },
    //編集モードかどうかの指定。
    editMode: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      selectedEquipmentName: this.targetEquipment.name,
      types: ["射撃", "白兵", "機雷", "装甲", "補助", "その他"],
      type: "射撃",
      ranks: ["A", "B"],
      selectedRanks: ["B"],
      rank: "B",
      itemcounts: [1, 2, 3],
      itemcount: 1
    };
  },

  watch: {
    targetEquipment: function(val) {
      if (val != null) {
        this.selectedEquipmentName = val.name;
        this.type = val.type;
        this.rank = val.rank;
        if (this.type === "" || this.type === undefined) {
          this.type = "射撃";
          this.rank = "B";
        }
      } else {
        this.selectedEquipment = "";
        this.type = "射撃";
        this.rank = "B";
      }
    },
    equipment: function(val) {
      this.itemcount = val.minLimit;
    },
    showDialog: function(val) {
      if (!val) {
        this.closeDialog();
      }
    }
  },

  computed: {
    equipments() {
      return Equipment.getEquipments().filter(equipment => {
        if (this.type !== null) {
          if (equipment.type !== this.type) {
            return false;
          }
          if (equipment.rank !== this.rank) {
            return false;
          }
        }
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
      this.itemcount = 1;
    },
    select() {
      this.$emit("update:targetEquipment", this.equipment);
      this.$emit("select", this.equipment, this.itemcount);
      this.selectedEquipmentName = "";
      this.$emit("update:showDialog", false);
      this.itemcount = 1;
    },
    formatEquipmentName(equipment) {
      return equipment.name + "(ランク" + equipment.rank + ")";
    },
    formatDamage(equipment) {
      if (
        equipment === null ||
        equipment === undefined ||
        equipment.damage === undefined
      ) {
        return "";
      } else {
        return equipment.damage + "(" + equipment.damageType + ")";
      }
    }
  }
};
</script>
