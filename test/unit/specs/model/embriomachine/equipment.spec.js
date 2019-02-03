import Equipment from '@/model/embriomachine/equipment'
import MountPosition from '@/model/embriomachine/mountposition'
import MachineType from '@/model/embriomachine/machinetype'

describe('test', () => {
  it('equipmentのテスト', () => {
//    let mountingPositon  = new MountPosition(MountPosition.ALL,MountPosition.INFINITY)
    let equipment = new Equipment("パルスレーザー","A","射撃武器","③～⑤","2","射撃",MountPosition.ALL,1,true,"",1)
    console.log(JSON.stringify(equipment))
    expect(equipment.name).to.equal("パルスレーザー")
     // expect(machineType.getSlot(Position.BODY)).to.equal(2)
     // expect(machineType.getSlot(Position.RIGHTARM)).to.equal(3)
     // expect(machineType.getSlot(Position.LEFTARM)).to.equal(4)
     // expect(machineType.getSlot(Position.RIGHTLEG)).to.equal(5)
     // expect(machineType.getSlot(Position.LEFTLEG)).to.equal(6)
  })
})
