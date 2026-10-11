export interface User {
  id: number;
  name: string;
  email: string;
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