import * as Elrond from "@elrondnetwork/dapp";
import { ElrondDappConfig, walletConnectBridge, walletConnectDeepLink } from "./Config";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { routes } from "./routes"
import { ContextProvider } from "./context";
import Layout from "./components/LoginLayout";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ContextProvider>
        <Elrond.Context
          config={{
            network: ElrondDappConfig,
            walletConnectBridge,
            walletConnectDeepLink
          }}
        >
          <Layout>
            <Switch>
              <Route
                path="/unlock"
                component={() => (
                  <Elrond.Pages.Unlock
                    callbackRoute="/transfer"
                    title="Elrond Login"
                    lead="Please select your login method:"
                    ledgerRoute="/ledger"
                    walletConnectRoute="/walletconnect"
                  />
                )}
                exact={true}
                />
              <Route
                path="/ledger"
                component={() => (
                  <Elrond.Pages.Ledger callbackRoute="/transfer" />
                )}
                exact={true}
                />
              <Route
                path="/walletconnect"
                component={() => (
                  <Elrond.Pages.WalletConnect
                    callbackRoute="/transfer"
                    logoutRoute="/unlock"
                    title="Maiar Login"
                    lead="Scan the QR code using Maiar"
                  />
                )}
                exact={true}
              />

              {routes.map((route, i) => (
                <Route
                  path={route.path}
                  key={route.path + i}
                  component={route.component}
                  exact={true}
                />
              ))}
            </Switch>
          </Layout>
        </Elrond.Context>
      </ContextProvider>*
    </Router>
  )
}

export default App;