import axios, { AxiosError, AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { Loader } from "./components/Loader"
import {messages} from '@backend/types.ts'
import { getUserTime, getUserImage } from "./helpers"

function App() {
  const [messages,setMessages] = useState<messages[]>([])
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:3000/').then((response: AxiosResponse) => {
    const data: messages[] = response.data
    setMessages(data)
  }).catch((error: Error | AxiosError) => {
    console.log(error.message)
  })
  const timeOut = setTimeout(() => {
    setLoading(false)
  },2000)
  return (() => {
    clearTimeout(timeOut)
  })
  },[])
  
  return (
    <div className=" min-h-screen  font-host ">
      <header>
        <div className="grid-cols bg-black mb-4 sm:grid flex sm:grid-cols-3 py-3 gap-2 px-8 sm:px-0 items-center justify-between sm:justify-normal">
        <div className="hidden sm:block"></div>
        <h1 className="text-white justify-self-center font-grotesk uppercase tracking-widest ">messageboard</h1>
        <button className="bg-white justify-self-end mr-4 py-2 px-2 rounded-xl font-semibold sm:block hidden">New message</button>
        <svg xmlns="http://www.w3.org/2000/svg" className = "block w-6 h-6 sm:hidden" viewBox="0 0 448 512"><path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
        </div>
        <p className="text-center text-xl font-bold italic mb-3 mx-8">Send public messages for the world to see!</p>
      </header>
    {loading ? <Loader /> :
    messages.length !=0 ? messages.map((message) => {
      return( 
      <main className="flex justify-center">
      <section key={message.id} className="box-shadow border-2 rounded-2xl px-5 mx-8 border-black mb-4 flex max-w-[48rem] w-full  bg-[#FF7F00]">
      <img src={getUserImage()} className="rounded-full w-10 my-2 h-10 mr-5 max-w-full"/>
      <div className="font-extralight w-full">
      <div className="flex justify-between items-center flex-wrap gap-x-1.5">
      <h1 className="font-bold">{message?.user}</h1>
      <h1 className="text-xs">Sent {getUserTime(message.added)} ago</h1>
      </div>
      <h1 className="break-all">{message?.text}</h1>  
      </div>
      </section>
      </main>
      )
      }) :
      <h1>No messages here</h1>
      }
    </div>
    
  )
}

export default App
