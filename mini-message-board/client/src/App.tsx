import axios, { AxiosError, AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { Loader } from "./components/Loader"
import {messages} from '@backend/types.ts'
import { getUserTime, getUserImage } from "./helpers"
import { Header } from "./components/Header"
import { NoMessages } from "./pages/noMessages"

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
      <Header />
    {loading ? <div className="absolute top-1/2 w-full"><Loader/></div> :
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
      <section className=" absolute top-[45%] w-full">
      <NoMessages />
      </section>
      }
    </div>
    
  )
}

export default App
