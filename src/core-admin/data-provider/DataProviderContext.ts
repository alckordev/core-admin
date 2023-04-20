import { createContext } from "react";
import { DataProvider } from "../types";

export const DataProviderContext = createContext<DataProvider | undefined>(
  undefined
);
