import { FormItem } from './type'
export default {
  
  /**
   *@desc: 初始化(编辑)表单数据
   * @param { FormItem[] } formItem
   * @param { nay } formData
   * @return { never } 结果 
   */
  initData (formItem: FormItem[], formData: any) {

    // 数据录入组件值为数组的
    const dataComponentArray: string[] = ['rangePicker', 'checkbox']

    formItem.forEach(item => {
      if (dataComponentArray.includes(item.type)) {
        formData[item.key] = item.defaultVal || []
      } else {
        formData[item.key] = item.defaultVal || undefined
      }
    })

  },

  /**
   *@desc: 数组中含有对象，判断值在不在数组的对象中
   * @param { any[] } arr
   * @param { string } key
   * @param { (string | number) } value
   * @return { boolean } 结果 
   */
   arrIsKey (arr: any[], key: string, value: string | number) {
    let result = false
    result = arr.some((item: any) => { if(item[key]==value){ return true } })
    return result
  }

}