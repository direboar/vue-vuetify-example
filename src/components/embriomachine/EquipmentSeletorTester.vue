<template>
  <div>
    {{equipmentName}} / {{machineTypeName}}
    <v-layout row>
      <v-flex xs12>
        <v-btn
          color="green darken-1"
          flat
          @click.native="showEquipmentDialog"
        >装備選択ダイアログ表示</v-btn>
        <v-btn
          color="green darken-1"
          flat
          @click.native="showMachineTypeDialog"
        >装甲・サイズ選択ダイアログ表示</v-btn>
      </v-flex>
    </v-layout>
    <equipment-seletor-dialog
      :show-dialog.sync="showEquipment"
      :targetEquipment.sync="dialogEquipment"
      :targetPosition.sync="targetPosition"
      @select="acceptSelectedEquipment"
      @cancel="cancel"
    />
    <machine-type-selector-dialog
      :show-dialog.sync="showMachineType"
      :targetMachineType.sync="dialogMachineType"
      @select="acceptMachineType"
      @cancel="cancel"
    />
  </div>
</template>

<style>
</style>

<script>
import EquipmentSeletorDialog from "@/components/embriomachine/EquipmentSeletorDialog";
import MachineTypeSelectorDialog from "@/components/embriomachine/MachineTypeSelectorDialog";

export default {
  components: {
    EquipmentSeletorDialog: EquipmentSeletorDialog,
    MachineTypeSelectorDialog: MachineTypeSelectorDialog
  },

  data() {
    return {
      showEquipment: false,
      showMachineType: false,
      equipment: {},
      dialogEquipment: {},
      machineType: {},
      dialogMachineType: {},
      targetPosition: "胴"
    };
  },

  computed: {
    equipmentName() {
      if (this.equipment === null) {
        return "-";
      } else {
        return this.equipment.name;
      }
    },
    machineTypeName() {
      if (this.machineType === null) {
        return "-";
      } else {
        return this.machineType.name;
      }
    }
  },

  methods: {
    showEquipmentDialog() {
      this.dialogEquipment = this.equipment;
      this.showEquipment = true;
    },
    showMachineTypeDialog() {
      this.dialogMachineType = this.machineType;
      this.showMachineType = true;
    },
    acceptSelectedEquipment() {
      this.equipment = this.dialogEquipment;
    },
    acceptMachineType() {
      this.machineType = this.dialogMachineType;
    },
    cancel() {}
  }
};
</script>
