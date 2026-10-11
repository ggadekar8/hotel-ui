import type { IWaiter } from "../common/model/users/types";
import waiters from "./mock-data/waiter.json";
export const getWaiters =
  async (): Promise<IWaiter[]> => {
    return waiters;
    // const response =
    //   await axiosClient.get<User[]>(
    //     "/users"
    //   );

    // return response.data;
  };
 

export const createWaiter =
  async (
    user: Partial<IWaiter>
  ): Promise<IWaiter> => {
    return {
      id: waiters.length + 1,
      name: user.name ?? "",
      code: user.code ?? "",
      assignedTables: user.assignedTables ?? [],
      image: user.image ?? "",
      status: user.status ?? "Available",
    };
    // const response =
    //   await axiosClient.post<User>(
    //     "/users",
    //     user
    //   );

    // return response.data;
  };
