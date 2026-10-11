import type { ICounter } from "../common/model/users/types";
import counters from "./mock-data/Counter.json";
export const getCounters =
  async (): Promise<ICounter[]> => {
    return counters;
    // const response =
    //   await axiosClient.get<User[]>(
    //     "/users"
    //   );

    // return response.data;
  };
 

export const createCounter =
  async (
    user: Partial<ICounter>
  ): Promise<ICounter> => {
    return {
      id: counters.length + 1,
      name: user.name ?? "",
      code: user.code ?? "",
      status: user.status ?? "Available",
    };
    // const response =
    //   await axiosClient.post<User>(
    //     "/users",
    //     user
    //   );

    // return response.data;
  };
