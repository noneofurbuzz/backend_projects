import { Header } from "./components/header"
import { Form } from "./components/form"
import { Messages } from "./components/messages"


function App() {
  return (
    <div className=" min-h-screen  font-host ">
      <Header/>
      <Messages />
      <Form/>
    </div>
    
  )
}

export default App
