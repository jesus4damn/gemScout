import {Component} from "../types";
import {IFilterForm, IGemstone, IMessage, INewUser, IShape, IUser} from "./commonInterfaces";

export interface IUserProfile {
   isLogin: boolean,
   authStep: {
      step: number,
      mobile: string | null
   },
   token: string | null,
   avatar: string,
   name: string,
   id: number | null
}

export interface ISystemInfo {
   applications: number,
   complaints: number,
   newUsers: number,
   sellerApplications: number,
   users: number,
   gemstones:{name:string, count:number}[],
   new_applications_per_date:any
}

export interface IModalWindow {
   isShow: boolean,
   modalBody: Component | null,
   title: string | null,
   haveCloseBtn: boolean,
   parameters: {[key: string]: any} | {},
   bodyWidth: string
}

export interface IUsers {
   allUsers: IUser[],
   currentPageAllUsers: number | null,
   newUsers: INewUser[],
   currentPageNewUsers: number | null,
   params: IFilterForm | undefined,
   subscribe: boolean,
   sendMessage: IMessage | null
}

export interface IGemstones {
   gemstonesList: IGemstone[],
   shapesList: IShape[],
}