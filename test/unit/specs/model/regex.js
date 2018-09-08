
describe('Regex', () => {
  it('regex', () => {
    var myRe = new RegExp("d(b+)d", "g");
    var myArray = myRe.exec("cdbbdbsbz");
    console.log(myArray)
  })
})
