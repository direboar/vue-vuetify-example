import Machine from "@/model/embriomachine/machine";

//FIXME つかってない。

export default class LocalStorage {
  constructor() {
    this.machines = []
    this.castedMachines = []
  }

  load(callback) {
    let scenariosFromStorage = localStorage.getItem(
      "embriomachine.constructon.machines"
    );

    //ストレージに登録されていればそのデータを復元。
    if (scenariosFromStorage != undefined && scenariosFromStorage != null) {
      let objects = JSON.parse(scenariosFromStorage);
      this.castedMachines = Machine.assigns(objects);
      this.machines = castedMachines.slice(0,11);
    } else {
      let newMachines = [];
      this.saveToLocalStrage(newMachines);
      this.machines = newMachines;
    }

    callback();
  }

  fetch(lastSearchedMachine, callback) {
    let index = this.castedMachines.indexOf(lastSearchedMachine);
    this.machines.push(this.castedMachines.slice(index,index+12));

    callback();
  }

  save(machine) {
    this.machines.push(machine);
    localStorage.setItem(
      "embriomachine.constructon.machines",
      JSON.stringify(this.machines)
    );
  }

  update(id, machine) {
    let index = this.machines.indexOf(machine);
    this.machines[index] = machine;
    localStorage.setItem(
      "embriomachine.constructon.machines",
      JSON.stringify(this.machines)
    );
  }

  delete(machine) {
    let index = this.machines.indexOf(machine);
    this.machines.slice(index, 1);
    localStorage.setItem(
      "embriomachine.constructon.machines",
      JSON.stringify(this.machines)
    );
  }
}
