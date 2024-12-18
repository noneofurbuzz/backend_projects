import { SyntheticEvent, useContext, useState } from "react"
import { FormContext } from "../context/formContext"
import { useMutation } from "react-query"
import { postMessages } from "../api"
import { PaginationContext } from "@/context/paginationContext"
import { userSchema } from "@/schema"
import { userSchemaError } from "@/types"
export function Form(){  
    const {showForm, setShowForm} = useContext(FormContext)
    const {setCurrentPageNumber} = useContext(PaginationContext)
    const [error,setError] = useState<userSchemaError>()
    const [formData,setFormData] = useState({
        name: "",
        message: ""
    })
    const mutation = useMutation({
        mutationFn: (formData:{name:string,message:string}) => postMessages(formData),
    })

    function handleSubmit(e: SyntheticEvent){
        e.preventDefault()
        const validation = userSchema.safeParse(formData)
        if (validation.success){
            mutation.mutate(formData)
        setShowForm(false)
        setFormData({
            name: "",
            message: ""
        })
        setCurrentPageNumber(1)
        }
        else{
            setError(validation.error.format())
        }
    }

    function handleChange(e:SyntheticEvent){
        setFormData({
            ...formData,
            [(e.target as HTMLInputElement|HTMLTextAreaElement).name] : (e.target as HTMLInputElement|HTMLTextAreaElement).value
        })
    }
    function removeNameError(){
        if (error){
            if(error.name !== undefined) {
                setError({
                    ...error,
                    name: undefined
                })
            }
        }}
    function removeMessageError(){
        if (error){
        if(error.message !== undefined) {
            setError({
                ...error,
                message: undefined
            })
        }
    }}
    function handleForm(){
        setShowForm(false)
        setError(undefined)
    }

    return(
        <section className={`${showForm ? 'flex' : 'hidden'}`}>
        <form className={`font-host h-screen 360:h-full grayscale-0 bg-white 360:rounded-xl w-full  py-8 px-6 flex  flex-col`} onSubmit={handleSubmit}>
            <p className="font-bold text-[1.163rem] leading-nomal">Send a message!</p>
            <p className="text-[#545465] mt-2 mb-4 text-sm">Your Voice Matters – Share It with the World.</p>
            <label htmlFor="name" className="text-[0.94rem] mb-2 leading-[2.4rem]">Name</label>
            <input onChange={handleChange} onInput={removeNameError} value={formData.name}  autoComplete = "off" className=" border-[1px] border-[#D9D9D9] input-shadow mb-[1.5rem] rounded-lg h-10 px-3 text-base w-full" placeholder="Name" name="name"/>
            {error ? error.name !== undefined ? <p className="text-red-800 text-sm -mt-[1rem]">{error.name._errors[0]}</p> : null : null}
            <label htmlFor="message" className="text-[0.94rem] mb-2 leading-[2.4rem] ">Message</label>
            <textarea onChange={handleChange} onInput={removeMessageError} value={formData.message} autoComplete = "off" placeholder="Message" name="message" rows = {6} className=" px-3 input-shadow text-base w-full py-[10px] border-[1px] rounded-lg border-[#D9D9D9]"></textarea>
            {error ? error.message !== undefined ? <p className="text-sm mt-2 text-red-800">{error.message._errors[0]}</p> : null : null}
            <button className="bg-black mt-5 py-3 font-bold w-full text-xl text-white rounded-[45px]" >Send a message</button>
        </form>
        <button onClick={handleForm} className="rounded-full sm:bg-filter bg-transparent  absolute sm:static right-0 flex w-9 h-9 ml-2 justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" className="fill-black mt-3 sm:mt-0 mr-4 sm:mr-0 sm:fill-white  w-[1.4rem] h-[1.4rem]" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </button>
        </section>
    )
}
