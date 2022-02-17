import ABI from "../abi.json";
import {ethers} from "ethers";
import React, { useEffect, useState } from "react"



export default function Form() {
  const [name, setName] = useState("")
  const [smartContract, setSmartContract] = useState();

  useEffect(()=>{
    const smartContractAddress = "0xC1Ebf03B6130E02ADb9ca9279CE548A174bd6649";
    const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner()
    
    const smartContract = new ethers.Contract(smartContractAddress, ABI, signer);

    setSmartContract(smartContract);
  },[])
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await smartContract.addStudent(name);
    }
    catch (err){
      alert(err.data.message)
    }
    alert("Name has been submitted.")
    setName("")
    document.getElementById("fullname").reset();
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-16 w-auto"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbVfNG3fTiRfqRJqW4EOycCi13vdafScxaRA&usqp=CAU"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up to get paid in the new BYU Token</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="fullname" className="sr-only">
                  Full Name
                </label>
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  autoComplete="fullname"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-700 focus:border-blue-700 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
              >
                Sign up
              </button>
            </div>
          </form>
          <div>
              <h2>
                {smartContract ? smartContract.address : null}
              </h2>
            </div>
        </div>
      </div>
    </>
  )
}
