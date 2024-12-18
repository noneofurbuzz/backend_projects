import axios, { AxiosError, AxiosResponse } from "axios"
import {messages} from '@backend/types.ts'


export function getMessages(){
let response = axios.get('http://192.168.100.129:3000/').then((response: AxiosResponse) => {
    const data: messages[] = response.data
    return data.reverse()
  }).catch((error: Error | AxiosError) => {
    console.log(error.message)
    return null
  })
  return response
}

export function postMessages(formData: {name:string, message:string}){
  let response = axios.post('http://localhost:3000/new',formData)
  .then((response) => {
    console.log(response)
  })
  .catch((error: AxiosError) => {
      console.error(error)
  })
  return response
}
