<template>
  <div>
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
            <v-flex xs12>
              <v-alert
                :value="true"
                type="error"
                v-if="validateerror.length>0"
              >
                {{formatErrorMessage(validateerror)}}
              </v-alert>
            </v-flex>
            <v-flex xs4>
              <v-card>
                <v-toolbar
                  color="green"
                  dark
                >
                  <v-toolbar-title>基本データ</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-list>
                  <v-list-tile>
                    <v-text-field
                      name="名前"
                      type="text"
                      label="名前"
                      v-model="machine.name"
                      required
                    />
                  </v-list-tile>
                  <v-divider />
                  <v-list-tile>
                    <v-text-field
                      name="装甲・サイズ"
                      type="text"
                      label="装甲・サイズ"
                      v-model="machine.machineType.name"
                      required
                      readonly
                    />
                    <v-btn
                      color="green darken-1"
                      flat
                      @click.native="showMachineTypeDialog"
                    >選択</v-btn>
                  </v-list-tile>
                  <v-divider />
                  <v-list-tile>
                    <v-list-tile-content>移動力</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{machine.machineType.movility}}</v-list-tile-content>
                  </v-list-tile>
                  <v-divider />
                  <v-list-tile>
                    <v-list-tile-content>回避値</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{machine.machineType.evadeRate}}</v-list-tile-content>
                  </v-list-tile>
                  <v-divider />
                  <v-list-tile>
                    <v-list-tile-content>装甲値</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{machine.machineType.armorPoint}}</v-list-tile-content>
                  </v-list-tile>
                  <v-divider />
                  <v-list-tile>
                    <v-list-tile-content>耐久値</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{machine.machineType.constitution}}</v-list-tile-content>
                  </v-list-tile>
                  <v-divider />
                  <v-list-tile>
                    <v-list-tile-content>イニシアチブ</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{machine.machineType.initiative}}</v-list-tile-content>
                  </v-list-tile>
                  <v-divider />
                </v-list>
              </v-card>
            </v-flex>
            <v-flex xs8>
              <v-card>
                <v-layout
                  row
                  wrap
                >
                  <v-flex xs6>
                    <v-toolbar
                      color="green"
                      dark
                    >
                      <v-toolbar-title>装備品（頭)</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                        icon
                        @click.native="showEquipmentDialog(POSITION_CONST.POSITION_HEAD)"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-list>
                      <v-list-tile
                        v-for="(equipment, index)  in this.machine.equipments[POSITION_CONST.POSITION_HEAD]"
                        :key="index"
                      >
                        <v-list-tile-content></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{equipment.name}}</v-list-tile-content>
                        <v-btn
                          color="green darken-1"
                          flat
                          @click.native="deleteEquipment(POSITION_CONST.POSITION_HEAD,equipment)"
                        >削除</v-btn>
                        <v-divider />
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                  <v-flex xs6>
                    <v-toolbar
                      color="green"
                      dark
                    >
                      <v-toolbar-title>装備品（胴)</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                        icon
                        @click.native="showEquipmentDialog(POSITION_CONST.POSITION_BODY)"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-list>
                      <v-list-tile
                        v-for="(equipment, index)  in this.machine.equipments[POSITION_CONST.POSITION_BODY]"
                        :key="index"
                      >
                        <v-list-tile-content></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{equipment.name}}</v-list-tile-content>
                        <v-btn
                          color="green darken-1"
                          flat
                          @click.native="deleteEquipment(POSITION_CONST.POSITION_BODY,equipment)"
                        >削除</v-btn>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                  <v-flex xs6>
                    <v-toolbar
                      color="green"
                      dark
                    >
                      <v-toolbar-title>装備品（右手)</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                        icon
                        @click.native="showEquipmentDialog(POSITION_CONST.POSITION_RIGHTARM)"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-list>
                      <v-list-tile
                        v-for="(equipment, index)  in this.machine.equipments[POSITION_CONST.POSITION_RIGHTARM]"
                        :key="index"
                      >
                        <v-list-tile-content></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{equipment.name}}</v-list-tile-content>
                        <v-btn
                          color="green darken-1"
                          flat
                          @click.native="deleteEquipment(POSITION_CONST.POSITION_RIGHTARM,equipment)"
                        >削除</v-btn>
                        <v-divider />
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                  <v-flex xs6>
                    <v-toolbar
                      color="green"
                      dark
                    >
                      <v-toolbar-title>装備品（左手)</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                        icon
                        @click.native="showEquipmentDialog(POSITION_CONST.POSITION_LEFTARM)"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-list>
                      <v-list-tile
                        v-for="(equipment, index)  in this.machine.equipments[POSITION_CONST.POSITION_LEFTARM]"
                        :key="index"
                      >
                        <v-list-tile-content></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{equipment.name}}</v-list-tile-content>
                        <v-btn
                          color="green darken-1"
                          flat
                          @click.native="deleteEquipment(POSITION_CONST.POSITION_LEFTARM,equipment)"
                        >削除</v-btn>
                        <v-divider />
                      </v-list-tile>
                      <v-divider />
                    </v-list>
                  </v-flex>
                  <v-divider></v-divider>
                  <v-flex xs6>
                    <v-toolbar
                      color="green"
                      dark
                    >
                      <v-toolbar-title>装備品（右脚)</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                        icon
                        @click.native="showEquipmentDialog(POSITION_CONST.POSITION_RIGHTLEG)"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-list>
                      <v-list-tile
                        v-for="(equipment, index)  in this.machine.equipments[POSITION_CONST.POSITION_RIGHTLEG]"
                        :key="index"
                      >
                        <v-list-tile-content></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{equipment.name}}</v-list-tile-content>
                        <v-btn
                          color="green darken-1"
                          flat
                          @click.native="deleteEquipment(POSITION_CONST.POSITION_RIGHTLEG,equipment)"
                        >削除</v-btn>
                        <v-divider />
                      </v-list-tile>
                      <v-divider />
                    </v-list>
                  </v-flex>
                  <v-flex xs6>
                    <v-toolbar
                      color="green"
                      dark
                    >
                      <v-toolbar-title>装備品（左脚)</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                        icon
                        @click.native="showEquipmentDialog(POSITION_CONST.POSITION_LEFTLEG)"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-list>
                      <v-list-tile
                        v-for="(equipment, index)  in this.machine.equipments[POSITION_CONST.POSITION_LEFTLEG]"
                        :key="index"
                      >
                        <v-list-tile-content></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{equipment.name}}</v-list-tile-content>
                        <v-btn
                          color="green darken-1"
                          flat
                          @click.native="deleteEquipment(POSITION_CONST.POSITION_LEFTLEG,equipment)"
                        >削除</v-btn>
                        <v-divider />
                      </v-list-tile>
                      <v-divider />
                    </v-list>
                  </v-flex>
                  <v-divider></v-divider>
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
          @click.native="save"
        >保存する</v-btn>
      </v-card-actions>
    </v-card>
    <machine-type-selector-dialog
      :show-dialog.sync="showMachineType"
      :targetMachineType.sync="dialogMachineType"
      @select="acceptMachineType"
      @cancel="cancel"
    />
    <equipment-seletor-dialog
      :show-dialog.sync="showEquipment"
      :targetEquipment.sync="dialogEquipment"
      :targetPosition.sync="dialogTargetPosition"
      @select="acceptSelectedEquipment"
      @cancel="cancel"
    />
  </div>
</template>

<style>
</style>

<script>
import EquipmentSeletorDialog from "@/components/embriomachine/EquipmentSeletorDialog";
import MachineTypeSelectorDialog from "@/components/embriomachine/MachineTypeSelectorDialog";
import Machine from "@/model/embriomachine/machine";
import MachineType from "@/model/embriomachine/machinetype";
import Equipment from "@/model/embriomachine/equipment";

export default {
  name: "MachineConstructPanel",
  components: {
    EquipmentSeletorDialog: EquipmentSeletorDialog,
    MachineTypeSelectorDialog: MachineTypeSelectorDialog
  },
  data() {
    return {
      machine: new Machine("", new MachineType()),
      showEquipment: false,
      showMachineType: false,
      dialogEquipment: {},
      dialogMachineType: {},
      dialogTargetPosition: null,
      editingEquipmentPosition: {},
      editingEquipment: {},
      POSITION_CONST: MachineType.getPositionConst()
    };
  },

  watch: {},

  computed: {
    validateerror() {
      return this.machine.validate();
    }
  },

  methods: {
    showMachineTypeDialog() {
      this.dialogMachineType = this.machine.machineType;
      this.showMachineType = true;
    },
    showEquipmentDialog(position) {
      this.dialogEquipment = this.machine.equipment;
      this.editingEquipmentPosition = position;
      this.dialogTargetPosition = position;
      this.showEquipment = true;
    },
    acceptMachineType() {
      this.machine.machineType = this.dialogMachineType;
    },
    acceptSelectedEquipment() {
      this.machine.addEquipment(
        this.editingEquipmentPosition,
        this.dialogEquipment
      );
      this.dialogTargetPosition = null;
      this.editingEquipmentPosition = {};
    },
    deleteEquipment(position, equipment) {
      this.machine.deleteEquipment(position, equipment);
    },
    formatErrorMessage(messages) {
      return messages.join();
    },
    cancel() {
      this.dialogTargetPosition = null;
      this.editingEquipmentPosition = {};
      this.dialogMachineType = {};
    },
    save() {
      let message = this.machine.validate();
    },
    delete() {}
  }
};
</script>
