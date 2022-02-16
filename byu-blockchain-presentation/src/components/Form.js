import ABI from "../abi.json";
import {ethers} from "ethers";
import React, { useState } from "react"



export default function Form() {
  const [name, setName] = useState("")

  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.avax-test.network/ext/bc/C/rpc"
  );
  console.log(ABI)
  const smartContractAddress = 0x9e6a83Ac9CeaaF91f9F754A4221775f975c319d5;
  
  const smartContract = new ethers.Contract(smartContractAddress, ABI, provider);
  console.log(smartContract)

  const addStudent = () => {
    smartContract.addStudent(name);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Start handle submit")
    console.log(name) // from elements property
    // console.log(event.target.username.value)          // or directly
    addStudent()
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up to get paid in the new BYU Token</h2>
          </div>
          <form className="mt-8 space-y-6" action="http://localhost:3000" method="POST">
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onSubmit={handleSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
