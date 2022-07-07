import { createContext } from "react";

export const PopupContext = createContext({
  Isopen: false,
  setOpen: (value) => {},
});

export const formInfo = createContext({
  products: [],
  setProducts: (product) => {},
});

export const secformInfo = createContext({
  isSecOpen: false,
  setSecOpen: (value) => {},
  indexVal: null,
  setIndex: (index) => {},
});

export const inputContext = createContext({
  inputVal: "",
  setInputVal: (value) => {},
  filteredResults: [],
  setFilteredResults: (value) => {},
});

export const checkedInputs = createContext({
  checkedInput: [],
  setCheckedInputs: (value) => {},
});

export const chatsArray = createContext({
  chats: [],
  setchats: (value) => {},
});
