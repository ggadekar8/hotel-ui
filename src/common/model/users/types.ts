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
 