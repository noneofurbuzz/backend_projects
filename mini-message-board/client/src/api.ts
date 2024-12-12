import axios, { AxiosError, AxiosResponse } from "axios"
import {messages} from '@backend/types.ts'


export default () => axios.get('http://localhost:3000/').then((response: AxiosResponse) => {
    const data: messages[] = response.data
    return data
  }).catch((error: Error | AxiosError) => {
    console.log(error.message)
    return null
  })