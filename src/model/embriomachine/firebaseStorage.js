import Machine from "@/model/embriomachine/machine";
import firebase from "firebase";

//FIXME つかってない。

export default class FirebaseStorage {
  constructor() {
    this.machines = []
  }

  load(callback) {
    this.machines = [];

    var query = firebase
      .database()
      .ref("embriomachine")
      .orderByChild("orderBy")
      .limitToFirst(12);

    query.once("value").then(snapshot => {
      snapshot.forEach(childSnapshot => {
        let key = childSnapshot.key;
        let childData = childSnapshot.val();
        this.machines.push(
          Machine.fromRealtimeDatabaseObject(key, childData)
        );
      });
      callback();
      //   this.load = false;
    });
  }

  fetch(lastSearchedMachine, callback) {
    var query = firebase
      .database()
      .ref("embriomachine")
      .orderByChild("orderBy")
      .startAt(lastSearchedMachine.orderBy)
      .limitToFirst(13);

    query.once("value").then(snapshot => {
      snapshot.forEach(childSnapshot => {
        let key = childSnapshot.key;
        let childData = childSnapshot.val();

        //最終行のデータも取得されてしまうため、最終更新時間が同じデータは飛ばす。
        if (!(childData.lastUpdateTime === lastSearchedMachine.orderBy)) {
          this.machines.push(
            Machine.fromRealtimeDatabaseObject(key, childData)
          );
        }
      });
      //   this.seek = false;
      callback();
    });
  }

  save(machine) {
    machine.setLastUpdateTime(firebase.database.ServerValue.TIMESTAMP);

    let updated = firebase
      .database()
      .ref("embriomachine")
      .push(machine.toRealtimeDatabaseObject());

    let updatedQuery = firebase.database().ref(updated);

    updatedQuery.once("value").then(snapshot => {
      let updated = snapshot.val();

      updatedQuery
        .update({
          orderBy: Machine.getOrderBy(updated)
        })
        .then(() => {
          this.load = true;
        });
    });

    //FIXME error
  }

  update(id, machine) {
    machine.setLastUpdateTime(firebase.database.ServerValue.TIMESTAMP);
    firebase
      .database()
      .ref("embriomachine/" + id)
      .set(machine.toRealtimeDatabaseObject())
      .then(() => {
        this.load = true;
      });
  }

  delete(machine) {
    firebase
      .database()
      .ref("embriomachine/" + machine.id)
      .remove()
      .then(() => {
        this.load = true;
      });
  }
}
