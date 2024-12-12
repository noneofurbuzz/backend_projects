import { useContext } from "react"
import { FormContext } from "../context/FormContext"

export function Header(){
  const {setShowForm} = useContext(FormContext)
    return(
        <header>
        <div className="grid-cols bg-black mb-4 sm:grid flex sm:grid-cols-3 py-3 gap-2 px-8 sm:px-0 items-center justify-between sm:justify-normal">
        <div className="hidden sm:block"></div>
        <h1 className="text-white justify-self-center font-grotesk uppercase tracking-widest ">messageboard</h1>
        <button className="bg-white justify-self-end mr-4 py-2 px-2 rounded-xl font-semibold sm:block hidden" onClick={() => setShowForm(true)}>New message</button>
        <button onClick={() => setShowForm(true)} className="block w-6 h-6 sm:hidden" ><svg xmlns="http://www.w3.org/2000/svg" className = "" viewBox="0 0 448 512"><path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
        </button>
        </div>
        <p className="text-center text-xl font-bold italic mb-3 mx-8">Send public messages for the world to see!</p>
      </header>
    )
}