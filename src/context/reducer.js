export function reducer(state, action) {
  switch (action.type) {
    case "setTransactions": {
      const newState = {
        ...state,
        transactions: action.transactions,
        transactionsFetched: action.transactionsFetched,
      };
      return newState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
