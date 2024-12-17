import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

interface PaginationContextType{
    currentPageNumber: number
    setCurrentPageNumber: Dispatch<SetStateAction<number>>
}
const PaginationContext = createContext<PaginationContextType>({
    currentPageNumber: 1,
    setCurrentPageNumber: () => {}
})

function PaginationProvider({children} :{children : ReactNode}){
    const [currentPageNumber,setCurrentPageNumber] = useState(1)
    return (
        <PaginationContext.Provider value={{currentPageNumber,setCurrentPageNumber}}>
            {children}
        </PaginationContext.Provider>
    )
}

export {PaginationContext,PaginationProvider}