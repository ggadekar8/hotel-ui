import type { ITable } from "../common/model/users/types";
import tables from "./mock-data/table.json";
export const getTables =
  async (): Promise<ITable[]> => {
    return tables;
    // const response =
    //   await axiosClient.get<User[]>(
    //     "/users"
    //   );

    // return response.data;
  };
 

export const createTable =
  async (
    table: Partial<ITable>
  ): Promise<ITable> => {
    return {
      id: tables.length + 1,
      numberOfChairs: table.numberOfChairs ?? 0,
      status: table.status ?? "Available",
    };
    // const response =
    //   await axiosClient.post<User>(
    //     "/users",
    //     user
    //   );

    // return response.data;
  };
