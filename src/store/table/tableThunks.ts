import { createAsyncThunk } from
"@reduxjs/toolkit";

import { getTables,createTable} from "../../services/table.service";
import type { ITable } from "../../common/model/users/types";

export const fetchTables =
  createAsyncThunk(
    "tables/fetchTables",
    async () => {
      return await getTables();
    }
  );

export const addTable =
  createAsyncThunk(
    "tables/addTable",
    async (data: Partial<ITable>) => { 
      return await createTable(data); 
    } 
  );
 