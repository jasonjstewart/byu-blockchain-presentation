const AVALANCHE_TESTNET_PARAMS = {
    chainId: '43113',
    chainName: 'Avalanche TESTNET C-Chain',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://testnet.snowtrace.io/'],
  }

export default function addAvalancheNetwork() {
    window.ethereum
      .request({
        method: 'wallet_addEthereumChain',
        params: [
            AVALANCHE_TESTNET_PARAMS
        ],
      })
      .catch((error) => {
        console.log(error)
      })
  }