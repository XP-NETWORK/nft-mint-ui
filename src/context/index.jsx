import * as React from "react";
import { reducer } from "./reducer";

const Context = React.createContext(undefined);
const Dispatch = React.createContext(undefined);

const initialState = () => {
  return {
    transactions: [],
    transactionsFetched: undefined,
  };
};

function ContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState());
  return (
    <Context.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Context.Provider>
  );
}

function useContext() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useState must be used within a Context.Provider");
  }
  return context;
}

function useDispatch() {
  const context = React.useContext(Dispatch);
  if (context === undefined) {
    throw new Error("useDispatch must be used within a Dispatch.Provider");
  }
  return context;
}

export { ContextProvider, useContext, useDispatch };
