import {ethers} from "ethers";
import { useEffect, useState } from "react";


export default function ConnectButton() {
    const [installed, setInstalled] = useState();
    const [provider, setProvider] = useState();
    const [balance, setBalance] = useState();

    useEffect(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        const { ethereum } = window;
        setInstalled(Boolean(ethereum && ethereum.isMetaMask))
        const interval = setInterval(async () => {
            if(localStorage.getItem('account')){
                var bal = await provider.getBalance(localStorage.getItem('account'))
                setBalance(ethers.utils.formatEther(bal.toString()))
            }
          }, 1000);
          return () => clearInterval(interval);
    }, [])

    async function getChainId(provider){
        const { chainId } = await provider.getNetwork()
        return chainId;
    }

    async function handleConnectWallet() {
        var chainId = await getChainId(provider);
        if (chainId!==43113){
            alert("Need to change your network to Avalanche Fuji Testnet")
        }
        else{
            let acct = await window.ethereum.request({method: 'eth_requestAccounts'})
            localStorage.setItem( 'account', acct )
        }
    }

  return localStorage.getItem('account') ? (
    <div className="mt-3 sm:mt-0 sm:ml-3">
        {balance ? 
        <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-blue-300 md:py-4 md:text-lg md:px-10">
            {Number(balance).toFixed(3)} AVAX
        </div> :
        <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-blue-300 md:py-4 md:text-lg md:px-10">
            Loading Avax Balance
        </div>

        }
    </div>
  ) : (
    <div className="mt-3 sm:mt-0 sm:ml-3">
    { installed ?
    <button
        onClick={handleConnectWallet}
        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
    >
        Connect to Wallet
    </button> 
    :<a
        href="https://metamask.io/download/"
        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
    >
        Click here to install MetaMask!
    </a>
    }
</div>
  );
}