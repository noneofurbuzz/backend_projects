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
  
  return (
    <>
    {loading ? <Loader /> :
    messages.length !=0 ? messages.map((message) => {
      return( 
      <div key={message.id}>
      <h1>{message?.user}</h1>
      <h1>{message?.text}</h1>
      <h1>{message.added.toString()}</h1>
      </div>
      )
      }) :
      <h1>No messages here</h1>
      }
    </>
  )
}

export default App
