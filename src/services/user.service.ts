import type { User,Menu } from "../common/model/users/types";
import users from "./mock-data/user.json";
import menus from "./mock-data/menu.json";
export const getUsers =
  async (): Promise<User[]> => {
    return users;
    // const response =
    //   await axiosClient.get<User[]>(
    //     "/users"
    //   );

    // return response.data;
  };

export const getMenus =
  async (): Promise<Menu[]> => {
    return Object.entries(menus).map(([menu, submenu], index) => ({
      id: index + 1,
      menu,
      submenu: submenu.map((item) => ({
        id: item.id,
        submenu: item.name,
        description: item.description,
        price: item.price,
      })),
    }));
    // const response =
    //   await axiosClient.get<User[]>(
    //     "/users"
    //   );

    // return response.data;
  };

export const createUser =
  async (
    user: Partial<User>
  ): Promise<User> => {
    return {
      id: users.length + 1,
      name: user.name ?? "",
      email: user.email ?? "",
    };
    // const response =
    //   await axiosClient.post<User>(
    //     "/users",
    //     user
    //   );

    // return response.data;
  };

export const createMenu = async (menu: Menu): Promise<Menu> => menu;