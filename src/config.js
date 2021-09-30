export const UnsignedPreset = "ttivi2nm";

export const ChainConfig = {
  xpnode: "wss://bridge.xp.network/node",
  elrond_node: "https://devnet-api.elrond.com",
  // Placeholder values that we dont care about
  elrond_minter:
    "erd1qqqqqqqqqqqqqpgq7fzdnxa43vgau9myeasu2kw90fvpu40cs3ys5ez6s3",
  elrond_event_rest: "http://localhost:6644",
  elrond_esdt: "XPNET-054f6c",
  elrond_esdt_nft: "XPNFT-57cb06",
};

export const walletConnectBridge = "https://bridge.walletconnect.org";
export const walletConnectDeepLink =
  "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/";

export const ElrondDappConfig = {
  id: "devnet",
  name: "Devnet",
  egldLabel: "xEGLD",
  walletAddress: "https://devnet-wallet.elrond.com",
  apiAddress: "https://devnet-api.elrond.com",
  gatewayAddress: "https://devnet-gateway.elrond.com",
  explorerAddress: "http://devnet-explorer.elrond.com/",
};

export const ElrondKeys = {
  ALICE: `-----BEGIN PRIVATE KEY for erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th-----
    NDEzZjQyNTc1ZjdmMjZmYWQzMzE3YTc3ODc3MTIxMmZkYjgwMjQ1ODUwOTgxZTQ4
    YjU4YTRmMjVlMzQ0ZThmOTAxMzk0NzJlZmY2ODg2NzcxYTk4MmYzMDgzZGE1ZDQy
    MWYyNGMyOTE4MWU2Mzg4ODIyOGRjODFjYTYwZDY5ZTE=
-----END PRIVATE KEY for erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th-----`,

  BOB: `-----BEGIN PRIVATE KEY for erd1spyavw0956vq68xj8y4tenjpq2wd5a9p2c6j8gsz7ztyrnpxrruqzu66jx-----
    YjhjYTZmODIwM2ZiNGI1NDVhOGU4M2M1Mzg0ZGEwMzNjNDE1ZGIxNTViNTNmYjVi
    OGViYTdmZjVhMDM5ZDYzOTgwNDlkNjM5ZTVhNjk4MGQxY2QyMzkyYWJjY2U0MTAy
    OWNkYTc0YTE1NjM1MjNhMjAyZjA5NjQxY2MyNjE4Zjg=
-----END PRIVATE KEY for erd1spyavw0956vq68xj8y4tenjpq2wd5a9p2c6j8gsz7ztyrnpxrruqzu66jx-----`,

  CAROL: `-----BEGIN PRIVATE KEY for erd1k2s324ww2g0yj38qn2ch2jwctdy8mnfxep94q9arncc6xecg3xaq6mjse8-----
    ZTI1M2E1NzFjYTE1M2RjMmFlZTg0NTgxOWY3NGJjYzk3NzNiMDU4NmVkZWFkMTVh
    OTRjYjcyMzVhNTAyNzQzNmIyYTExNTU1Y2U1MjFlNDk0NGUwOWFiMTc1NDlkODVi
    NDg3ZGNkMjZjODRiNTAxN2EzOWUzMWEzNjcwODg5YmE=
-----END PRIVATE KEY for erd1k2s324ww2g0yj38qn2ch2jwctdy8mnfxep94q9arncc6xecg3xaq6mjse8-----`,
};

export const TronAccs = {
  ACC1: {
    name: "ACC1",
    account: "TJuG3kvmGBDxGyUPBbvKePUjbopLurtqSo",
    key: "991EE549C12DA5EC5AF246FB0733A334CB918D3A28D91DC4FEA19BAB7D3FFA8A",
  },
};

export const chains = [
  // "XP.network", // 0
  "BSC", // 1
  "Elrond", // 2
  "HECO", // 3
  "Ropsten", // 4
  "Fantom", // 5
  "Polygon", // 6
  "Tron", // 7
];

export const coins = [
  // "XPNET", // 0
  "BNB", // 1
  "eGLD", // 2
  "HT", // 3
  "ETH", // 4
];

export const CHAIN_INFO = {
  // "XP.network": { nonce: 1, native: "XPNET", decimals: 1e12 },
  Elrond: { nonce: 2, native: "EGLD", decimals: 1e18 },
  HECO: {
    nonce: 3,
    native: coins[2],
    chainId: 256,
    rpcUrl: "https://http-testnet.hecochain.com",
    decimals: 1e18,
    contract_owner:
      "0xbaedb25b3352638942e80aa3dbc2d54f2bab423849cce21a73c164f0c21103c8",
    contract: "0x8b9c95147C185A9d0940DC26a6EA774eE05D8853",
  },
  BSC: {
    nonce: 4,
    native: coins[3],
    chainId: 97,
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    decimals: 1e18,
    contract_owner:
      "0x5dca57fe4b6ed2572052efa01b37cc7e20ec1eee3dc3088ca0f5ebb59f875756",
    contract: "0x1d63023D01b9E09267245eAC3710C6efb01Fc715",
  },
  Ropsten: {
    nonce: 5,
    native: coins[4],
    chainId: 3,
    rpcUrl: "https://ropsten.infura.io/v3/182b3d3fb2d14d5fbe7421348624d1ce",
    decimals: 1e18,
    contract_owner:
      "0xbaedb25b3352638942e80aa3dbc2d54f2bab423849cce21a73c164f0c21103c8",
    contract: "0xf6fceC833bFb9bd26a898143A6b41799F5Abfe0f",
  },
  Fantom: {
    nonce: 0x8,
    rpcUrl: "https://rpc.testnet.fantom.network/",
    decimals: 1e18,
    contract_owner:
      "0xbaedb25b3352638942e80aa3dbc2d54f2bab423849cce21a73c164f0c21103c8",
    contract: "0xB0cA1d0424975EA639579BA72f4E5935391c7b4e",
  },
  Polygon: {
    nonce: 0x7,
    rpcUrl: "https://matic-testnet-archive-rpc.bwarelabs.com",
    decimals: 1e18,
    contract_owner:
      "0x5dca57fe4b6ed2572052efa01b37cc7e20ec1eee3dc3088ca0f5ebb59f875756",
    contract: "0x8Ae6d528c608C7a11485105D56BA3b67518bc060",
  },
  Tron: {
    nonce: 0x9,
    rpcUrl: "https://api.shasta.trongrid.io/",
    decimals: 1e6,
    contract_owner:
      "991EE549C12DA5EC5AF246FB0733A334CB918D3A28D91DC4FEA19BAB7D3FFA8A",
    contract: "417cc883b5da914678e0ac952d954adaa37156721d",
  },
};
