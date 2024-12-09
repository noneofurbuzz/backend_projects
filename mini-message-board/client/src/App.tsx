import axios, { AxiosError, AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { Loader } from "./components/Loader"
import {messages} from '@backend/types.ts'

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

  function getUserImage(){
  return `https://rickandmortyapi.com/api/character/avatar/${Math.floor(Math.random() * 826) + 1}.jpeg`
  }

  
  return (
    <div className="bg-[#F196E5] min-h-screen pt-4">
    {loading ? <Loader /> :
    messages.length !=0 ? messages.map((message) => {
      return( 
      <div key={message.id} className="border-2 rounded-2xl px-5 items-center border-black mb-4 mx-9 flex bg-[#FF7F00] shadow-sm shadow-black">
      <img src={getUserImage()} className="rounded-full w-14 h-14 mr-5"/>
      <div className="[overflow-wrap:anywhere]">
      <h1 className="">{message?.user}</h1>
      <h1 className="">{message?.text}</h1>  
      <h1>{message.added.toString()}</h1>
      </div>
      </div>
      )
      }) :
      <h1>No messages here</h1>
      }
    </div>
  )
}

export default App
