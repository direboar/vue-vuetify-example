import axios from 'axios'

// http://www.dnd5eapi.co/
export default class Dnd5eapi {
  async classes (callback) {
    const response = await axios.get('http://www.dnd5eapi.co/api/classes')
    response.data.results.forEach((element, index) => {
      let aClass = {}
      aClass = Object.assign(element)
      // aClass.name = element.name
      // aClass.url = element.url
      aClass.id = index
      callback(aClass)
    })
  }

  async classOf (url, callback) {
    const response = await axios.get(url)
    callback(response.data)
  }
}
