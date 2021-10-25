import { ExceptionTypes } from "./types/ExceptionTypes"

export class BaseException
{
    public id:number
    public type: ExceptionTypes
    public source:object
    public date: string
    public resolved: boolean
    public message:string
    public test: object
}
