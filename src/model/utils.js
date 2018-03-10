
/***TODO */
export default class Utils {
  static formatArray(val, table) {
    var array = [];
    val.forEach(element => {
      array.push(this.format(element, table));
    });
    return array.join(",");
  }

  static arrayToString(array) {
    return array.join(",");
  }
}
