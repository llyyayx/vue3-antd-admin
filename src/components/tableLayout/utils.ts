import type { FormItem } from './type'
export default {

  /**
   * @desc: 初始化(编辑)表单数据
   * @param { FormItem[] } formItem
   * @param { nay } formData
   * @return { never } 结果
   */
  initData(formItem: FormItem[], formData: any) {
    // 数据录入组件值为数组的
    const dataComponentArray: string[] = ['rangePicker', 'checkbox']

    formItem.forEach((item) => {
      if (dataComponentArray.includes(item.type))
        formData[item.key] = item.defaultVal || []
      else
        formData[item.key] = item.defaultVal || undefined
    })
  },

  /**
   * @desc: 数组中含有对象，判断值在不在数组的对象中
   * @param { any[] } arr
   * @param { string } key
   * @param { (string | number) } value
   * @return { boolean } 结果
   */
  arrIsKey(arr: any[], key: string, value: string | number) {
    let result = false
    result = arr.some((item: any) => { if (item[key] == value) { return true } })
    return result
  },

  /**
   * @desc: 在数组[对象]中追加数需要更换的键名
   * @param { any[] } arr 数组
   * @param { object } replaceFields 跟换的键名 { 原键名: 新键名 }
   * @return { any[] } 追加更换键名的数组[对象]
   */
  addKeyIsReplace(arr: any[], replaceFields: any) {
    const tableData = arr
    const replaceKeys = Object.keys(replaceFields)
    if (replaceKeys.length > 0) {
      tableData.forEach((item: any) => {
        replaceKeys.forEach((replaceKey: string) => {
          if (item.hasOwnProperty(replaceKey))
            item[replaceFields[replaceKey]] = item[replaceKey]
        })
      })
    }
    return tableData
  },

  /**
   * @desc: 在对象中追加数需要更换的键名
   * @param { object } obj 数据对象
   * @param { object } replaceFields 跟换的键名 { 原键名: 新键名 }
   * @return { object } 追加更换键名的数据对象
   */
  objKeyIsReplace(obj: any, replaceFields: any) {
    const replaceKeys = Object.keys(replaceFields)
    if (replaceKeys.length > 0) {
      replaceKeys.forEach((replaceKey: string) => {
        if (obj.hasOwnProperty(replaceKey))
          obj[replaceFields[replaceKey]] = obj[replaceKey]
      })
    }
    return obj
  },

}
