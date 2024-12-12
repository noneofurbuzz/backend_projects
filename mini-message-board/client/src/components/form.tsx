import { SyntheticEvent, useContext } from "react"
import { FormContext } from "../context/FormContext"

export function Form(){
    const {showForm, setShowForm} = useContext(FormContext)
    function handleSubmit(e: SyntheticEvent){
        e.preventDefault()
    }

    return(
        <form className={`${showForm ? 'block' : 'hidden'}`} onSubmit={handleSubmit}>
            <button onClick={() => setShowForm(false)}>No</button>
        </form>
    )
}