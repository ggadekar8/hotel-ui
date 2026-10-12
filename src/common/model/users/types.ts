export interface IUser {
  id: number;
  name: string;
  email: string;
  password:string;
  roleId:number
}

export interface IRole {
  id: number;
  role: string;
}
export interface Menu {
  id: number;
  menu: string;
  submenu: SubMenu[];
}
export interface SubMenu {
  id: number;
  submenu: string;
  description: string;
  price:number
}
 export interface IWaiter {
   id: number | string;
   name: string;
   code: string;
   assignedTables: ITable[];
   image: string;
   status?: string;
 }
 export interface ITable{
   id: number | string;
   numberOfChairs: number;
   status: string;
 }

 export interface ICounter {
   id: string | number;
   name: string;
   code: string;
   status: string;
 }
 
 export interface ITable  {
   id: number | string;
   numberOfChairs: number;
   status: string;
 }
 

 export interface  ICustomerUser {
  id: number;
  name: string;
  phone: string;
  password:string;
  roleId:number
}