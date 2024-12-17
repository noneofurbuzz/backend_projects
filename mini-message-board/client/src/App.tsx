import { Header } from "./components/header"
import { Form } from "./components/form"
import { Messages } from "./components/messages"
import { useContext } from "react"
import { FormContext } from "./context/formContext"
import { MessagePagination} from "./components/pagination"

function App() {

  const {showForm} = useContext(FormContext)
  return (
    <div className={`relative min-h-screen  font-host bg-[#F196E5]`}>
      {showForm ? <section className="z-10 bg-filter fixed h-full w-full"></section> : ""}
      <Header/>
      <Messages />
      <section className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[90%] 990:w-[70%] max-w-full">
      <Form />
      </section>
      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 mb-4">
      <MessagePagination />
      </footer>
    </div>
    
  )
}

export default App
