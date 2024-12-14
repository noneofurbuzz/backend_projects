import { useQuery } from "react-query"
import { getUserImage, getUserTime } from "../helpers"
import { getMessages } from "../api"
import { NoMessages } from "../pages/NoMessages"
import { Loader } from "./loader"


export function Messages(){
    const {data: images} = useQuery(
        { queryFn: getUserImage,
          queryKey: ["images"],
          refetchOnWindowFocus: false
        })
    
    const {data: messages,isLoading} = useQuery({
        queryFn: getMessages,
        queryKey: ["messages"]

    })
      
    return(
        isLoading ? <div className="absolute top-1/2 w-full"><Loader/></div> :
        messages ? 
        messages.length !== 0 ? messages.map((message) => {
            return( 
            <main key={message.id} className="flex justify-center">
            <section  className="box-shadow border-2 rounded-2xl px-5 mx-8 border-black mb-4 flex max-w-[48rem] w-full  bg-[#FF7F00]">
            {images ?
            <img src={images[message.id - 1]} className="rounded-full w-10 my-2 h-10 mr-5 max-w-full"/> : ""}
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
            }) : <section className=" absolute top-1/2 w-full">
            <NoMessages/>
            </section> : ""
    )
}