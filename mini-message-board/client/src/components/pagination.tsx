import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { getMessages} from "@/api"
import { useQuery } from "react-query"
import { pagination } from "@backend/types";
import { useContext} from "react";
import { PaginationContext } from "@/context/paginationContext";

export function MessagePagination(){
  const {currentPageNumber,setCurrentPageNumber} = useContext(PaginationContext)
  let paginationLimit = 0
    const {data: messages, isLoading} = useQuery({
      queryFn:getMessages,
      queryKey:["messages"]
    })
    let paginationData: pagination[] = [];
    let id = 1
    if (messages){
    let length = messages.length !== 0 ? (messages.length)%6 !==0 ? Math.floor(messages.length/6 + 1) : messages.length/6 : 1
    for (let i = 1;i<= length;i = i + 1){
      paginationData.push({
        number: i,
        id: id ++
      })
    }
    }
    
    function handleClick(id: number){
      setCurrentPageNumber(id)
    }
    function previousNumber(){
      if (currentPageNumber !== 1){
        setCurrentPageNumber(prev => prev - 1)
      }
    }
    function nextNumber(){
      if (currentPageNumber !== paginationData.length){
        setCurrentPageNumber(prev => prev + 1)
      }
    }
    return(
       !isLoading ? <Pagination>
            <PaginationContent>
                <PaginationItem>
                <PaginationPrevious href="#" onClick={previousNumber}/>
                </PaginationItem>
                {paginationData ? (currentPageNumber > 2 ? (currentPageNumber > (paginationData.length - 1) ?paginationData.slice((currentPageNumber -1)-2):paginationData.slice(currentPageNumber-2)) : paginationData.slice(0)).map((number,index) => {
                  if (index < 3){
                  return (
                  <PaginationItem key={number.id} >
                  <PaginationLink href="#" onClick={() => handleClick(number.id)} isActive = {currentPageNumber === number.id ? true : false}>{number.number}</PaginationLink>
                  </PaginationItem>
                  )}
                  }) : ""}
                {currentPageNumber !== paginationData.length ? <PaginationItem>
                <PaginationEllipsis />
                </PaginationItem> : ""}
                <PaginationItem>
                <PaginationNext href="#" onClick={nextNumber}/>
                </PaginationItem>
            </PaginationContent>
</Pagination> : ""
    )
              } 

  