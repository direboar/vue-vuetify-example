import Machine from '@/model/embriomachine/machine'
import MachineType from '@/model/embriomachine/machinetype'
import Equipment from '@/model/embriomachine/equipment'
//import Position from '@/model/embriomachine/position'
import MountPosition from '@/model/embriomachine/mountposition'

describe('Machineのテスト', () => {

  let machineType = new MachineType("中M","5","6","3","21","7",1,2,2,2,2,2)
  let pulselasor = new Equipment("パルスレーザー","A","射撃武器","③～⑤","2","射撃",MountPosition.ALL,1,true,"",1)
  let heatcrow = new Equipment("ヒートクロー","A","射撃武器","③～⑤","2","射撃",MountPosition.ARM_OR_LEG,1,true,"",1)

  it('Machineのテスト001', () => {

    let machine = new Machine("name",machineType);
    console.log(JSON.stringify(machine))

    machine.addEquipment(MachineType.POSITION_LEFTARM,pulselasor);
    machine.addEquipment(MachineType.POSITION_LEFTARM,pulselasor);
    machine.addEquipment(MachineType.POSITION_LEFTARM,heatcrow);

    console.log(JSON.stringify(machine))

    machine.deleteEquipment(MachineType.POSITION_LEFTARM,pulselasor);
    console.log(JSON.stringify(machine))

    machine.deleteEquipment(MachineType.POSITION_LEFTARM,pulselasor);
    console.log(JSON.stringify(machine))

  })
  it('getEquipmentCount', () => {
      let testEqyionent = new Equipment("test","A","射撃武器","③～⑤","2","射撃",MountPosition.ALL,1,true,"",99)

      let machine = new Machine("name",machineType);

      expect(machine.getEquipmentCount()).to.equal(0) //装備なし
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);
      expect(machine.getEquipmentCount()).to.equal(1) //装備１つ
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);
      expect(machine.getEquipmentCount()).to.equal(2) //同一部位複数

      machine = new Machine("name",machineType);
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);
      machine.addEquipment(MachineType.POSITION_RIGHTARM,testEqyionent);
      machine.addEquipment(MachineType.POSITION_LEFTLEG,testEqyionent);
      machine.addEquipment(MachineType.POSITION_LEFTLEG,testEqyionent);
      machine.addEquipment(MachineType.POSITION_HEAD,testEqyionent);
      machine.addEquipment(MachineType.POSITION_BODY,testEqyionent);
      expect(machine.getEquipmentCount()).to.equal(6) //全部位

      //getEquipmentCountOf（装備指定なし）
      machine.addEquipment(MachineType.POSITION_RIGHTARM,testEqyionent);
      expect(machine.getEquipmentCountOf([MachineType.POSITION_LEFTARM])).to.equal(1) //右手
      expect(machine.getEquipmentCountOf([MachineType.POSITION_LEFTARM,MachineType.POSITION_RIGHTARM])).to.equal(3) //右手＋左手

      //getEquipmentCountOf（装備指定あり）
      machine.addEquipment(MachineType.POSITION_RIGHTARM,pulselasor);
      expect(machine.getEquipmentCountOf([MachineType.POSITION_LEFTARM],testEqyionent)).to.equal(1) //右手
      expect(machine.getEquipmentCountOf([MachineType.POSITION_LEFTARM,MachineType.POSITION_RIGHTARM],testEqyionent)).to.equal(3) //右手＋左手
      expect(machine.getEquipmentCountOf([MachineType.POSITION_LEFTARM],pulselasor)).to.equal(0) //右手
      expect(machine.getEquipmentCountOf([MachineType.POSITION_LEFTARM,MachineType.POSITION_RIGHTARM],pulselasor)).to.equal(1) //右手＋左手

    })
    it('validateのテスト003装備合計数', () => {
      let testMachineType = new MachineType("xx","5","6","3","21","7",0,0,0,0,0,0)

      let testEqyionent = new Equipment("パルスレーザー","A","射撃武器","③～⑤","2","射撃",MountPosition.ALL,1,true,"",99)

      let machine = new Machine("name",testMachineType);
      //配列などはto.deep.equalsで比較
      expect(machine.validate()).to.deep.equal([]) //上限

      //各部位ごとの上限チェック
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);
      expect(machine.validate()).to.deep.equal(["左腕のスロット合計以上装備しています。"]) //上限超過

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_RIGHTARM,testEqyionent);
      expect(machine.validate()).to.deep.equal(["右腕のスロット合計以上装備しています。"]) //上限超過

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_LEFTLEG,testEqyionent);
      expect(machine.validate()).to.deep.equal(["左脚のスロット合計以上装備しています。"]) //上限超過

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_RIGHTLEG,testEqyionent);
      expect(machine.validate()).to.deep.equal(["右脚のスロット合計以上装備しています。"]) //上限超過

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_HEAD,testEqyionent);
      expect(machine.validate()).to.deep.equal(["頭のスロット合計以上装備しています。"]) //上限超過

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_BODY,testEqyionent);
      expect(machine.validate()).to.deep.equal(["胴のスロット合計以上装備しています。"]) //上限超過

    })

    it('validateのテスト004装備可能部位', () => {
      let testMachineType = new MachineType("xx","5","6","3","21","7",2,2,2,2,2,2)

      //腕
      let testEqyionent = new Equipment("パルスレーザー","A","射撃武器","③～⑤","2","射撃",MountPosition.ARM,1,true,"",99)
      let machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);
      machine.addEquipment(MachineType.POSITION_RIGHTARM,testEqyionent);
      expect(machine.validate()).to.deep.equal([]) //エラーなし
      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_LEFTLEG,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは左脚には装備できません。"]) //装備エラー

      //足はないのでテストしない
      //足各１
      testEqyionent = new Equipment("パルスレーザー","A","射撃武器","③～⑤","2","射撃",MountPosition.LEG_EACH_ONE,1,true,"",99)
      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_LEFTLEG,testEqyionent);
      machine.addEquipment(MachineType.POSITION_RIGHTLEG,testEqyionent);
      expect(machine.validate()).to.deep.equal([]) //エラーなし
      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);
      alert(machine.validate())
      expect(machine.validate()).to.deep.equal(["パルスレーザーは左腕には装備できません。","パルスレーザーは左脚,右脚にそれぞれ一つずつ装備しなければなりません。"]) //装備エラー

      //足・腕
      testEqyionent = new Equipment("パルスレーザー","A","射撃武器","③～⑤","2","射撃",MountPosition.ARM_OR_LEG,1,true,"",99)
      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);
      machine.addEquipment(MachineType.POSITION_RIGHTARM,testEqyionent);
      machine.addEquipment(MachineType.POSITION_LEFTLEG,testEqyionent);
      machine.addEquipment(MachineType.POSITION_RIGHTLEG,testEqyionent);

      expect(machine.validate()).to.deep.equal([]) //エラーなし

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_HEAD,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは頭には装備できません。"]) //装備エラー

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_BODY,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは胴には装備できません。"]) //装備エラー

      //頭×
      testEqyionent = new Equipment("パルスレーザー","A","射撃武器","③～⑤","2","射撃",MountPosition.WITHOUT_HEAD,1,true,"",99)
      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);
      machine.addEquipment(MachineType.POSITION_RIGHTARM,testEqyionent);
      machine.addEquipment(MachineType.POSITION_LEFTLEG,testEqyionent);
      machine.addEquipment(MachineType.POSITION_RIGHTLEG,testEqyionent);
      machine.addEquipment(MachineType.POSITION_BODY,testEqyionent);
      expect(machine.validate()).to.deep.equal([]) //エラーなし

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_HEAD,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは頭には装備できません。"]) //装備エラー
      
      //胴２or脚各１
      testEqyionent = new Equipment("パルスレーザー","A","射撃武器","③～⑤","2","射撃",MountPosition.BODY_TWO_OR_LEG_EACH_ONE,1,true,"",99)
      machine = new Machine("name",testMachineType);
      //machine.addEquipment(MachineType.POSITION_BODY,testEqyionent);
      machine.addEquipment(MachineType.POSITION_LEFTLEG,testEqyionent);
      machine.addEquipment(MachineType.POSITION_RIGHTLEG,testEqyionent);
      expect(machine.validate()).to.deep.equal([]) //エラーなし

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_BODY,testEqyionent);
      machine.addEquipment(MachineType.POSITION_BODY,testEqyionent);
      expect(machine.validate()).to.deep.equal([]) //エラーなし

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは左腕には装備できません。","パルスレーザーは胴に２つ、もしくは右脚,左脚にそれぞれ一つずつ装備しなければなりません。"]) //装備エラー

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_RIGHTARM,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは右腕には装備できません。","パルスレーザーは胴に２つ、もしくは右脚,左脚にそれぞれ一つずつ装備しなければなりません。"]) //装備エラー

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_HEAD,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは頭には装備できません。","パルスレーザーは胴に２つ、もしくは右脚,左脚にそれぞれ一つずつ装備しなければなりません。"]) //装備エラー

      //頭１＆胴１
      testEqyionent = new Equipment("パルスレーザー","A","射撃武器","③～⑤","2","射撃",MountPosition.HEAD_AND_BODY_EACH_ONE,1,true,"",99)
      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_HEAD,testEqyionent);
      machine.addEquipment(MachineType.POSITION_BODY,testEqyionent);
      expect(machine.validate()).to.deep.equal([]) //エラーなし

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは左腕には装備できません。","パルスレーザーは頭,胴にそれぞれ一つずつ装備しなければなりません。"]) //装備エラー

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_RIGHTARM,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは右腕には装備できません。","パルスレーザーは頭,胴にそれぞれ一つずつ装備しなければなりません。"]) //装備エラー

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_LEFTLEG,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは左脚には装備できません。","パルスレーザーは頭,胴にそれぞれ一つずつ装備しなければなりません。"]) //装備エラー

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_RIGHTLEG,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは右脚には装備できません。","パルスレーザーは頭,胴にそれぞれ一つずつ装備しなければなりません。"]) //装備エラー

    })

    it('validateのテスト005装備数', () => {
      let testMachineType = new MachineType("xx","5","6","3","21","7",3,3,3,3,3,3)

      //腕、２
      let testEqyionent = new Equipment("パルスレーザー","A","射撃武器","③～⑤","2","射撃",MountPosition.ARM,2,true,"",99)
      let machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);

      //腕１個だとエラー
      expect(machine.validate()).to.deep.equal(["パルスレーザーは左腕に2個以上装備しなければなりません。"]) 

      //腕２個だとOK
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);
      expect(machine.validate()).to.deep.equal([]) 

      //３個もOK
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);
      expect(machine.validate()).to.deep.equal([]) 

      //左右に１個ずつはNG
      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_RIGHTARM,testEqyionent);
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは右腕に2個以上装備しなければなりません。","パルスレーザーは左腕に2個以上装備しなければなりません。"]) 

      //一方が２個、一方が１個の場合は、そちらだけNG
      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_RIGHTARM,testEqyionent);
      machine.addEquipment(MachineType.POSITION_RIGHTARM,testEqyionent);
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは左腕に2個以上装備しなければなりません。"]) 
      
      //脚、➁
      testEqyionent = new Equipment("パルスレーザー","A","射撃武器","③～⑤","2","射撃",MountPosition.LEG,2,false,"",99)
      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_LEFTLEG,testEqyionent);

      //脚１個だとエラー
      expect(machine.validate()).to.deep.equal(["パルスレーザーは左脚,右脚に合計で2個以上装備しなければなりません。"]) 

      //同じ足２個だとOK
      machine.addEquipment(MachineType.POSITION_LEFTLEG,testEqyionent);
      expect(machine.validate()).to.deep.equal([]) 

      //３個もOK
      machine.addEquipment(MachineType.POSITION_LEFTLEG,testEqyionent);
      expect(machine.validate()).to.deep.equal([]) 

      //左右に１個ずつはOK
      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_RIGHTLEG,testEqyionent);
      machine.addEquipment(MachineType.POSITION_LEFTLEG,testEqyionent);
      expect(machine.validate()).to.deep.equal([]) 

    })    

    it('validateのテスト006装備上限数', () => {
      let testMachineType = new MachineType("xx","5","6","3","21","7",2,2,2,2,2,2)

      //上限3
      let testEqyionent = new Equipment("パルスレーザー","A","射撃武器","③～⑤","2","射撃",MountPosition.ALL,1,true,"",3)
      let machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);
      machine.addEquipment(MachineType.POSITION_LEFTARM,testEqyionent);
      machine.addEquipment(MachineType.POSITION_RIGHTARM,testEqyionent);
      expect(machine.validate()).to.deep.equal([])  //3個

      machine.addEquipment(MachineType.POSITION_RIGHTARM,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは3個以上装備できません。"])  //4個 エラー
    })        

    it('validateのテスト特殊チェック', () => {
      let testMachineType = new MachineType("xx","5","6","3","21","7",2,2,2,2,2,2)

      //脚各１
      let testEqyionent = new Equipment("パルスレーザー","A","射撃武器","③～⑤","2","射撃",MountPosition.LEG_EACH_ONE,2,false,"",3)
      let machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_RIGHTLEG,testEqyionent);
      machine.addEquipment(MachineType.POSITION_LEFTLEG,testEqyionent);
      expect(machine.validate()).to.deep.equal([]) 

      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_RIGHTLEG,testEqyionent);
      machine.addEquipment(MachineType.POSITION_RIGHTLEG,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは左脚,右脚にそれぞれ一つずつ装備しなければなりません。"]) 

      //胴２or脚各１ 正常系は上の方でやってそうなので、異常系のみ
      testEqyionent = new Equipment("パルスレーザー","A","射撃武器","③～⑤","2","射撃",MountPosition.BODY_TWO_OR_LEG_EACH_ONE,2,false,"",4)
      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_BODY,testEqyionent);
      machine.addEquipment(MachineType.POSITION_BODY,testEqyionent);
      machine.addEquipment(MachineType.POSITION_LEFTLEG,testEqyionent);
      machine.addEquipment(MachineType.POSITION_RIGHTLEG,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは胴に２つ、もしくは右脚,左脚にそれぞれ一つずつ装備しなければなりません。"]) 

      //頭１&胴１
      //上でやってなさそうなケースのみ
      testEqyionent = new Equipment("パルスレーザー","A","射撃武器","③～⑤","2","射撃",MountPosition.HEAD_AND_BODY_EACH_ONE,2,false,"",3)
      machine = new Machine("name",testMachineType);
      machine.addEquipment(MachineType.POSITION_HEAD,testEqyionent);
      machine.addEquipment(MachineType.POSITION_BODY,testEqyionent);
      machine.addEquipment(MachineType.POSITION_BODY,testEqyionent);
      expect(machine.validate()).to.deep.equal(["パルスレーザーは頭,胴にそれぞれ一つずつ装備しなければなりません。"]) 

    })

    //FIXME テストが古い。
    it('fromFirebaseObjectのテスト', () => {
      //fromFirebaseObject
      let fromFirebaseObject = {
        name : "111",
        machineType : "軽・サイズSS",
        equipments : {
          頭 : ["スモールレーザー"],
          胴 : [],
          右腕 : ["ラージレーザー","スモールレーザー"],
          右脚 : [],
          左腕 : [],
          左脚 : [],
        }
      }

      let machine = Machine.fromFirebaseObject(fromFirebaseObject);
      expect(machine.name).to.equal("111") 
      expect(machine.machineType.name).to.equal("軽・サイズSS") 
      expect(machine.equipments[MachineType.POSITION_HEAD].length).to.equal(1)
      expect(machine.equipments[MachineType.POSITION_BODY].length).to.equal(0)
      expect(machine.equipments[MachineType.POSITION_RIGHTARM].length).to.equal(2)
      expect(machine.equipments[MachineType.POSITION_HEAD][0].name).to.equal("スモールレーザー")
      expect(machine.equipments[MachineType.POSITION_RIGHTARM][0].name).to.equal("ラージレーザー")
      expect(machine.equipments[MachineType.POSITION_RIGHTARM][1].name).to.equal("スモールレーザー")

      //toFirebaseObject
      let toFirebaseObject = machine.toFirebaseObject();
      expect(toFirebaseObject.name).to.equal("111") 
      expect(toFirebaseObject.machineType).to.equal("軽・サイズSS") 
      expect(toFirebaseObject.equipments[MachineType.POSITION_HEAD].length).to.equal(1)
      expect(toFirebaseObject.equipments[MachineType.POSITION_BODY].length).to.equal(0)
      expect(toFirebaseObject.equipments[MachineType.POSITION_RIGHTARM].length).to.equal(2)
      expect(toFirebaseObject.equipments[MachineType.POSITION_HEAD][0]).to.equal("スモールレーザー")
      expect(toFirebaseObject.equipments[MachineType.POSITION_RIGHTARM][0]).to.equal("ラージレーザー")
      expect(toFirebaseObject.equipments[MachineType.POSITION_RIGHTARM][1]).to.equal("スモールレーザー")

      machine = new Machine("",null);
      alert(JSON.stringify(machine.toFirebaseObject()))
    })        
})

