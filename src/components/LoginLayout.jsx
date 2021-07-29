import React from "react";
import * as Dapp from "@elrondnetwork/dapp";
import { routes } from "../routes";

const Layout = ({ children }) => {
  return (
    <div className="bg-light d-flex flex-column flex-fill wrapper">
      <main className="d-flex flex-column flex-grow-1">
        <Dapp.Authenticate routes={routes} unlockRoute="/unlock">
          {children}
        </Dapp.Authenticate>
      </main>
    </div>
  );
};

export default Layout;