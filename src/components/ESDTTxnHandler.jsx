import { Address, TransactionHash } from "@elrondnetwork/erdjs/out";
import { useEffect, useRef } from "react";
import { ChainFactory } from "../@utils/helper_functions";
import * as Elrond from "@elrondnetwork/dapp";
import { useLocation } from "react-router-dom";

const decoder = new TextDecoder();

export default function ESDTTxnHandler() {
  const query = useRef(new URLSearchParams(useLocation().search));

  const sendElrdTx = Elrond.useSendTransaction();

  useEffect(() => {
    (async () => {
      const elrd = await ChainFactory["Elrond"].inner();
      const res = await elrd.rawTxnResult(
        new TransactionHash(query.current.get("txHash"))
      );

      const sender = res["sender"];

      let token_ident;
      for (const scres of res["smartContractResults"]) {
        if (scres["receiver"] !== sender) {
          continue;
        }

        const hexstr = scres["data"].split("@")[2];
        const data = new Uint8Array(
          hexstr.match(/.{1,2}/g).map((by) => parseInt(by, 16))
        );

        token_ident = decoder.decode(data);
      }

      const txu = elrd.unsignedSetESDTRoles(token_ident, new Address(sender), [
        "ESDTRoleNFTCreate",
      ]);

      sendElrdTx({
        transaction: txu,
        callbackRoute: "/processelrd",
      });
    })();
  });

  return (
    <div>
      <p>processing... please wait!</p>
    </div>
  );
}
