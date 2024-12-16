import { Response,Request,NextFunction } from "express"

const errorHandler = ((err:Error,req:Request,res:Response,next:NextFunction) => {
    console.error(err.stack)
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500
    res.send(statusCode).send('Something went wrong')
})

export default errorHandler