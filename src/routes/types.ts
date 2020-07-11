export interface IBaseHeaders {
  user?: string
  authorization?: string
}

export type IHeaders = { Headers: IBaseHeaders }
