import { SyntheticEvent } from "react"

export function Form(){

    function handleSubmit(e: SyntheticEvent){
        e.preventDefault()
    }

    return(
        <form className={``} onSubmit={handleSubmit}>
            <button >No</button>
        </form>
    )
}