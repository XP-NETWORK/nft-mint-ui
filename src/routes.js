import MintView from "./components/MinterView";
import ElrondTxnHandler from "./components/ElrondTxnHandler"

export const routes = [
  {
    path: "/",
    component: MintView
  },
  {
    path: "/processelrd",
    component: ElrondTxnHandler
  }
]