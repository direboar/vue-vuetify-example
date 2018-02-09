import Ability from '@/model/ability'
import AbilityType from '@/model/abilitytype'

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
