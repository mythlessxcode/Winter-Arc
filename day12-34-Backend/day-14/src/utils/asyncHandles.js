
//this is try and catch method
// const asyncHandler= (fn)=> async(req, res, next)=>{
//     try {
        
//     } catch (error) {
//         res.status(error.code|| 500).json({
//             success: false;
//             message: err.message
//         })
        
//     }
// }

//this is promisified method


const asyncHandler= (requestHandler)=>{
   return (req,res, next)=>{
        Promise.resolve(requestHandler(req, res, next)).catch((err)=>(err))
        .catch(next);
    }
}

export {asyncHandler}