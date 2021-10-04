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
  "BSC", // 1
  "Elrond", // 2
  "HECO", // 3
  "Ropsten", // 4
  "Avalance",
  "Polygon",
  "Fantom", // 5
  "Tron", // 7
  "Celo",
  "Harmony",
  "Ontology",
];

export const coins = [
  "eGLD", // 0
  "HT", // 1
  "BNB", // 2
  "ETH", // 3
  "AVAX", // 4
  "MATIC", // 5
  "FTM", // 6
  "TRX", // 7
  "CELO", // 8
  "ONE", // 9
  "ONG", // 10
];

export const CHAIN_INFO = {
  Elrond: { nonce: 2, native: "EGLD", decimals: 1e18 },
  HECO: {
    nonce: 3,
    native: coins[1],
    chainId: 256,
    rpcUrl: "https://http-testnet.hecochain.com",
    decimals: 1e18,
    contract: "0x1247a6cB7aA2c90C6B9eF96AE3E7b269139BE06b",
    blockExplorerUrls: "https://testnet.hecoinfo.com/tx",
  },
  BSC: {
    nonce: 4,
    native: coins[2],
    chainId: 97,
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    decimals: 1e18,
    contract: "0x12889E870A48Be2A04564e74f66fC91D439Da03e",
    blockExplorerUrls: "https://testnet.bscscan.com/tx",
  },
  Ropsten: {
    nonce: 5,
    native: coins[3],
    chainId: 3,
    rpcUrl: "https://ropsten.infura.io/v3/182b3d3fb2d14d5fbe7421348624d1ce",
    decimals: 1e18,
    contract: "0x2C742F65E6FEcDbb4ceE3D35473e39012aEDf3DD",
    blockExplorerUrls: "https://ropsten.etherscan.io/tx",
  },
  Avalanche: {
    nonce: 6,
    native: coins[4],
    chainId: 43113,
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    decimals: 1e18,
    blockExplorerUrls: "https://cchain.explorer.avax-test.network/tx",
    contract: "0xAcFB2E7d6e6272f192D0D573A9bD1CC9d534dE1c",
  },
  Polygon: {
    nonce: 0x7,
    native: coins[5],
    chainId: 80001,
    decimals: 1e18,
    rpcUrl: "https://matic-testnet-archive-rpc.bwarelabs.com",
    contract: "0x9E93256Df2a4fE757f8AEB533D3943E56ba8CF94",
    blockExplorerUrls: "https://mumbai.polygonscan.com/tx",
  },
  Fantom: {
    native: coins[6],
    nonce: 0x8,
    rpcUrl: "https://rpc.testnet.fantom.network/",
    decimals: 1e18,
    chainId: 4002,
    contract: "0xbc53f71E12007b93Ed2868E5f6CAE1D2ceB7287C",
    blockExplorerUrls: "https://explorer.testnet.fantom.network/transactions",
  },
  Tron: {
    native: coins[7],
    nonce: 0x9,
    rpcUrl: "https://api.shasta.trongrid.io/",
    decimals: 1e6,
    contract: "417cc883b5da914678e0ac952d954adaa37156721d",
    blockExplorerUrls: "https://shasta.tronscan.org/#/transaction",
  },
  Celo: {
    native: coins[8],
    nonce: 0xb,
    decimals: 1e18,
    rpcUrl: "https://alfajores-forno.celo-testnet.org",
    chainId: 44787,
    blockExplorerUrls: "https://alfajores-blockscout.celo-testnet.org/tx",
    contract: "0xE595D1CD77619d891A338dD09Fd64A57704a5375",
  },
  Harmony: {
    native: coins[9],
    nonce: 0xc,
    decimals: 1e18,
    rpcUrl: "https://api.s0.b.hmny.io",
    chainId: 1666700000,
    blockExplorerUrls: "https://explorer.pops.one/tx",
    contract: "0x22ddFB8954c9D75598385c6ad82cDeb124a78Bb3",
  },
  Ont: {
    native: coins[10],
    nonce: 0xd,
    decimals: 1e18,
    rpcUrl: "https://testing-bridge.xp.network/ontio",
    chainId: 5851,
    blockExplorerUrls: "https://explorer.ont.io/testnet/tx",
    contract: "0xdceB7a6b2d2cC149aA74E049231c94D072eDF3E8",
  },
};
