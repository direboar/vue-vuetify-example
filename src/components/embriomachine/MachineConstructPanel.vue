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
                :value="validateerror.length>0"
                type="error"
              >
                <p v-html="formatErrorMessage(validateerror)"></p>
              </v-alert>
            </v-flex>
            <v-flex
              xl3
              md4
              sm6
              xs12
            >
              <v-card>
                <v-toolbar
                  color="grey darken-1"
                  dark
                  dense
                >
                  <v-toolbar-title>基本データ</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-layout
                  row
                  wrap
                >
                  <v-flex xs4>
                    <v-list
                      two-line
                      subheader
                    >
                      <v-list-tile>
                        <v-list-tile-content>名前</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content>装甲/サイズ</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content>移動力</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content>回避値</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content>装甲値</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content>耐久値</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content>イニシアチブ</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                    </v-list>
                  </v-flex>
                  <v-flex xs8>
                    <v-list
                      two-line
                      subheader
                    >
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-text-field
                            type="text"
                            v-model="machine.name"
                            required
                          />
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">{{machine.machineType.name}}</v-list-tile-content>
                        <v-list-tile-action>
                          <v-btn
                            color="grey darken-4"
                            flat
                            @click.native="showMachineTypeDialog"
                          >
                            <v-icon>edit</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">{{machine.machineType.movility}}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">{{machine.machineType.evadeRate}}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">{{machine.machineType.armorPoint}}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">{{machine.machineType.constitution}}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                      <v-list-tile>
                        <v-list-tile-content class="subheaders">{{machine.machineType.initiative}}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider />
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex
              xl9
              md8
              sm6
              xs12
            >
              <v-card>
                <v-layout
                  row
                  wrap
                >
                  <v-flex
                    md6
                    xs12
                  >
                    <v-toolbar
                      color="grey darken-1"
                      dark
                      dense
                    >
                      <v-toolbar-title>頭／SLOT:{{machine.machineType.getSlot(POSITION_CONST.POSITION_HEAD)}}</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                        icon
                        @click.native="showEquipmentSelectDialog(POSITION_CONST.POSITION_HEAD)"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-list
                      two-line
                      subheader
                    >
                      <v-list-tile
                        v-for="(equipment, index)  in this.machine.equipments[POSITION_CONST.POSITION_HEAD]"
                        :key="index"
                      >
                        <v-list-tile-content></v-list-tile-content>
                        <v-list-tile-content class="subheaders">{{equipment.name}}</v-list-tile-content>
                        <v-list-tile-action>
                          <v-btn
                            color="grey darken-4"
                            flat
                            @click.native="showEquipmentViewDialog(POSITION_CONST.POSITION_HEAD,equipment)"
                          >
                            <v-icon>zoom_in</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-action>
                          <v-btn
                            color="grey darken-4"
                            flat
                            @click.native="deleteEquipment(POSITION_CONST.POSITION_HEAD,equipment)"
                          >
                            <v-icon>delete</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                  <v-flex
                    md6
                    xs12
                  >
                    <v-toolbar
                      color="grey darken-1"
                      dark
                      dense
                    >
                      <v-toolbar-title>胴／SLOT:{{machine.machineType.getSlot(POSITION_CONST.POSITION_BODY)}}</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                        icon
                        @click.native="showEquipmentSelectDialog(POSITION_CONST.POSITION_BODY)"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-list
                      two-line
                      subheader
                    >
                      <v-list-tile
                        v-for="(equipment, index)  in this.machine.equipments[POSITION_CONST.POSITION_BODY]"
                        :key="index"
                      >
                        <v-list-tile-content></v-list-tile-content>
                        <v-list-tile-content class="subheaders">{{equipment.name}}</v-list-tile-content>
                        <v-list-tile-action>
                          <v-btn
                            color="grey darken-4"
                            flat
                            @click.native="showEquipmentViewDialog(POSITION_CONST.POSITION_BODY,equipment)"
                          >
                            <v-icon>zoom_in</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-action>
                          <v-btn
                            color="grey darken-4"
                            flat
                            @click.native="deleteEquipment(POSITION_CONST.POSITION_BODY,equipment)"
                          >
                            <v-icon>delete</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                  <v-flex
                    md6
                    xs12
                  >
                    <v-toolbar
                      color="grey darken-1"
                      dark
                      dense
                    >
                      <v-toolbar-title>右腕／SLOT:{{machine.machineType.getSlot(POSITION_CONST.POSITION_RIGHTARM)}}</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                        icon
                        @click.native="showEquipmentSelectDialog(POSITION_CONST.POSITION_RIGHTARM)"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-list
                      two-line
                      subheader
                    >
                      <v-list-tile
                        v-for="(equipment, index)  in this.machine.equipments[POSITION_CONST.POSITION_RIGHTARM]"
                        :key="index"
                      >
                        <v-list-tile-content></v-list-tile-content>
                        <v-list-tile-content class="subheaders">{{equipment.name}}</v-list-tile-content>
                        <v-list-tile-action>
                          <v-btn
                            color="grey darken-4"
                            flat
                            @click.native="showEquipmentViewDialog(POSITION_CONST.POSITION_RIGHTARM,equipment)"
                          >
                            <v-icon>zoom_in</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-action>
                          <v-btn
                            color="grey darken-4"
                            flat
                            @click.native="deleteEquipment(POSITION_CONST.POSITION_RIGHTARM,equipment)"
                          >
                            <v-icon>delete</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                  <v-flex
                    md6
                    xs12
                  >
                    <v-toolbar
                      color="grey darken-1"
                      dark
                      dense
                    >
                      <v-toolbar-title>左腕／SLOT:{{machine.machineType.getSlot(POSITION_CONST.POSITION_LEFTARM)}}</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                        icon
                        @click.native="showEquipmentSelectDialog(POSITION_CONST.POSITION_LEFTARM)"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-list
                      two-line
                      subheader
                    >
                      <v-list-tile
                        v-for="(equipment, index)  in this.machine.equipments[POSITION_CONST.POSITION_LEFTARM]"
                        :key="index"
                      >
                        <v-list-tile-content></v-list-tile-content>
                        <v-list-tile-content class="subheaders">{{equipment.name}}</v-list-tile-content>
                        <v-list-tile-action>
                          <v-btn
                            color="grey darken-4"
                            flat
                            @click.native="showEquipmentViewDialog(POSITION_CONST.POSITION_LEFTARM,equipment)"
                          >
                            <v-icon>zoom_in</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-action>
                          <v-btn
                            color="grey darken-4"
                            flat
                            @click.native="deleteEquipment(POSITION_CONST.POSITION_LEFTARM,equipment)"
                          >
                            <v-icon>delete</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider />
                    </v-list>
                  </v-flex>
                  <v-flex
                    md6
                    xs12
                  >
                    <v-toolbar
                      color="grey darken-1"
                      dark
                      dense
                    >
                      <v-toolbar-title>右脚／SLOT:{{machine.machineType.getSlot(POSITION_CONST.POSITION_RIGHTLEG)}}</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                        icon
                        @click.native="showEquipmentSelectDialog(POSITION_CONST.POSITION_RIGHTLEG)"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-list
                      two-line
                      subheader
                    >
                      <v-list-tile
                        v-for="(equipment, index)  in this.machine.equipments[POSITION_CONST.POSITION_RIGHTLEG]"
                        :key="index"
                      >
                        <v-list-tile-content></v-list-tile-content>
                        <v-list-tile-content class="subheaders">{{equipment.name}}</v-list-tile-content>
                        <v-list-tile-action>
                          <v-btn
                            color="grey darken-4"
                            flat
                            @click.native="showEquipmentViewDialog(POSITION_CONST.POSITION_RIGHTLEG,equipment)"
                          >
                            <v-icon>zoom_in</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-action>
                          <v-btn
                            color="grey darken-4"
                            flat
                            @click.native="deleteEquipment(POSITION_CONST.POSITION_RIGHTLEG,equipment)"
                          >
                            <v-icon>delete</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                  <v-flex
                    md6
                    xs12
                  >
                    <v-toolbar
                      color="grey darken-1"
                      dark
                      dense
                    >
                      <v-toolbar-title>左脚／SLOT:{{machine.machineType.getSlot(POSITION_CONST.POSITION_LEFTLEG)}}</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                        icon
                        @click.native="showEquipmentSelectDialog(POSITION_CONST.POSITION_LEFTLEG)"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-list
                      two-line
                      subheader
                    >
                      <v-list-tile
                        v-for="(equipment, index)  in this.machine.equipments[POSITION_CONST.POSITION_LEFTLEG]"
                        :key="index"
                      >
                        <v-list-tile-content></v-list-tile-content>
                        <v-list-tile-content class="subheaders">{{equipment.name}}</v-list-tile-content>
                        <v-list-tile-action>
                          <v-btn
                            color="grey darken-4"
                            flat
                            @click.native="showEquipmentViewDialog(POSITION_CONST.POSITION_LEFTLEG,equipment)"
                          >
                            <v-icon>zoom_in</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-action>
                          <v-btn
                            color="grey darken-4"
                            flat
                            @click.native="deleteEquipment(POSITION_CONST.POSITION_LEFTLEG,equipment)"
                          >
                            <v-icon>delete</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
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
          @click.native="save"
        >保存する</v-btn>
        <v-btn
          color="green darken-1"
          flat
          @click.native="back"
        >戻る</v-btn>
      </v-card-actions>
      <v-card>
        <ins
          class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-9097509632200457"
          data-ad-slot="5985300299"
          data-ad-format="auto"
        ></ins>
      </v-card>
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
      :editMode.sync="equipmentDialogEditMode"
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
  mounted() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  },
  props: {
    //編集対象の装備データ。未選択の場合はnullを指定。
    targetMachine: {
      type: Object,
      default: new Machine("")
    }
  },
  data() {
    return {
      machine: Machine.assign(this.targetMachine),
      showEquipment: false,
      showMachineType: false,
      dialogEquipment: {},
      dialogMachineType: {},
      dialogTargetPosition: null,
      editingEquipmentPosition: {},
      editingEquipment: {},
      equipmentDialogEditMode: false,
      POSITION_CONST: MachineType.getPositionConst()
    };
  },

  watch: {
    targetMachine: function(val) {
      this.machine = Machine.assign(val);
    }
  },

  computed: {
    validateerror() {
      if (this.machine.machineType.name === undefined) {
        return ["機体の装甲・サイズが未選択です"];
      } else {
        return this.machine.validate();
      }
    }
  },

  methods: {
    showMachineTypeDialog() {
      let machineType = this.machine.machineType;
      //初期値としては「軽・SS」を選択する。
      if (machineType.name === undefined || machineType.name === "") {
        this.dialogMachineType = MachineType.getDefaultMachineType();
      } else {
        this.dialogMachineType = this.machine.machineType;
      }
      this.showMachineType = true;
    },
    //装備選択
    showEquipmentSelectDialog(position) {
      this.dialogEquipment = new Equipment("");
      this.editingEquipmentPosition = position;
      this.dialogTargetPosition = position;
      this.equipmentDialogEditMode = true;
      this.showEquipment = true;
    },
    //装備表示
    showEquipmentViewDialog(position, equipment) {
      this.dialogEquipment = equipment;
      this.editingEquipmentPosition = position;
      this.dialogTargetPosition = position;
      this.equipmentDialogEditMode = false;
      this.showEquipment = true;
    },
    acceptMachineType() {
      this.machine.machineType = this.dialogMachineType;
    },
    acceptSelectedEquipment(equipment, count) {
      for (let i = 0; i < count; i++) {
        this.machine.addEquipment(
          this.editingEquipmentPosition,
          this.dialogEquipment
        );
      }
      this.dialogTargetPosition = null;
      this.editingEquipmentPosition = {};
    },
    deleteEquipment(position, equipment) {
      this.machine.deleteEquipment(position, equipment);
    },
    formatErrorMessage(messages) {
      let ret = "";
      messages.forEach(message => {
        ret += message + "<br/>";
      });
      return ret;
    },
    cancel() {
      this.dialogTargetPosition = null;
      this.editingEquipmentPosition = {};
      this.dialogMachineType = {};
    },
    save() {
      this.$emit("update:targetMachine", this.machine);
      this.$emit("save", this.machine);
      this.machine = new Machine("", new MachineType());
      this.dialogTargetPosition = null;
      this.editingEquipmentPosition = {};
      this.dialogMachineType = new MachineType();
    },
    back() {
      this.$emit("update:targetMachine", this.machine);
      this.$emit("cancel");
      this.machine = new Machine("", new MachineType());
      this.dialogTargetPosition = null;
      this.editingEquipmentPosition = {};
      this.dialogMachineType = new MachineType();
    }
  }
};
</script>
