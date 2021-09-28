import MintView from "./components/MinterView";
import ElrondTxnHandler from "./components/ElrondTxnHandler";
import ESDTTxnHandler from "./components/ESDTTxnHandler";

export const routes = [
  {
    path: "/",
    component: MintView,
  },
  {
    path: "/processelrd",
    component: () => ElrondTxnHandler({ redirect: "/" }),
  },
  {
    path: "/processesdt",
    component: ESDTTxnHandler,
  },
];
