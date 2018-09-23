import Ability from '@/model/ability'
import AbilityType from '@/model/abilitytype'

describe('Regex', () => {
  it('regex', () => {
    var myRe = new RegExp("[ |　]?[^ ]+", "g");
    var myArray;
    while(myArray = myRe.exec("aaaaa +bbbbb ccccc +ddd")){
      console.log(myArray)
    }
  })
})

describe('Ability', () => {
  it('modifierのテスト', () => {
    let a = new Ability(AbilityType.STRENGTH)
    expect(a.modifier).to.equal(0)
    a.value = 9
    expect(a.modifier).to.equal(0)
    a.value = 10
    expect(a.modifier).to.equal(1)
    a.value = 11
    expect(a.modifier).to.equal(1)
    a.value = 12
    expect(a.modifier).to.equal(2)
  })
})

describe('Array', () => {
  it('Array', () => {
    var a1 = ["1","2"]
    var a2 = ["2","2"]

    let l = a1.every(current=>{
      return a2.includes(current);
    })
    expect(l).to.equal(true);
  })
})

