import { createContext, Dispatch, SetStateAction } from "react";

export interface NavContextProps {
  visibleGroup: string;
  setVisibleGroup: Dispatch<SetStateAction<string>>;
}

export const NavContext = createContext({} as NavContextProps);
