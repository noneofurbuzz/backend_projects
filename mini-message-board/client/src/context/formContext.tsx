import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";


interface FormContextType {
    showForm: boolean
    setShowForm: Dispatch<SetStateAction<boolean>>
}
const FormContext = createContext<FormContextType>({
    showForm: false,
    setShowForm: () => {}
})

function FormProvider({children}: {children: ReactNode}){
    const [showForm, setShowForm] = useState(false)

    return(
        <FormContext.Provider value={{showForm,setShowForm}}>
            {children}
        </FormContext.Provider>
    )
}

export {FormContext,FormProvider}