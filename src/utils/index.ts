export default {
  
  /**
   *@desc: 数组中含有对象，判断值在不在数组的对象中
   * @param {any[]} arr
   * @param {string} key
   * @param {(string | number)} value
   * @return { boolean} 结果 
   */
  arrIsKey (arr: any[], key: string, value: string | number) {
    let result = false
    result = arr.some((item: any) => { if(item[key]==value){ return true } })
    return result
  }

}