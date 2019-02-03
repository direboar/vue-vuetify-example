import MachineType from '@/model/embriomachine/machinetype'
//import Position from '@/model/embriomachine/position'

describe('machineTypeTest', () => {
  let machineType = new MachineType("1","2","3","4","5","6",1,2,3,4,5,6)
  it('machineTypeのテスト', () => {
    console.log(JSON.stringify(machineType))
    expect(machineType.getSlot(MachineType.POSITION_HEAD)).to.equal(1)
    expect(machineType.getSlot(MachineType.POSITION_BODY)).to.equal(2)
    expect(machineType.getSlot(MachineType.POSITION_RIGHTARM)).to.equal(3)
    expect(machineType.getSlot(MachineType.POSITION_LEFTARM)).to.equal(4)
    expect(machineType.getSlot(MachineType.POSITION_RIGHTLEG)).to.equal(5)
    expect(machineType.getSlot(MachineType.POSITION_LEFTLEG)).to.equal(6)
  })
  it('getTotalSlotのテスト', () => {
    expect(machineType.getTotalSlot()).to.equal(21)
  })

})
//constructor(name,movility,evadeRate,armorPoint,constitution,initiative,headSlot,bodySlot,leftArmSlot,rightArmSlot,leftLegSlot,rightLegSlot) {
