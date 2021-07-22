export type LoginSuccess = {
  code: number,
  message: string,
  token: string
}

export interface RouterObj {
  id: number,
  path: string,
  name: string,
  component: string,
  key: string,
  redirect?: string,
  icon?: string,
  children?: RouterObj[],
  pid?: number,
  status?: number
}

export type RouterTable = RouterObj[]