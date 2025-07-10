import fs from "fs/promises"
import path from "path"
import { ApiError } from "./ApiError"
import { ApiResponse } from "./apiResponse"

const deleteTemporaryFile = async (localPath) =>{
    try{
        await fs.unlink(localPath)
       return new ApiResponse(202,{},"file deleted from local storage successfully")
    }
    catch(error){
        throw new ApiError(501,"got error while delete photos store in local storage ")
    }
    
}

export {
    deleteTemporaryFile
}