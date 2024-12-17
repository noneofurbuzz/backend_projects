import { Header } from "./components/header"
import { Form } from "./components/form"
import { Messages } from "./components/messages"
import { useContext } from "react"
import { FormContext } from "./context/formContext"
import { MessagePagination} from "./components/pagination"

function App() {

  const {showForm} = useContext(FormContext)
  return (
    <div className={`flex flex-col min-h-screen  font-host bg-[#F196E5]`}>
      {showForm ? <section className="z-10 bg-filter fixed h-full w-full"></section> : ""}
      <Header/>
      <section className="flex-1">
      <Messages />
      </section>
      <section className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full 360:w-[90%] 990:w-[70%] max-w-full"> 
      <Form />
      </section>
      <footer className="my-4">
      <MessagePagination  />
      </footer>
    </div>
    
  )
}

export default App
