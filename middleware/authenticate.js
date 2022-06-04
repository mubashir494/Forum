import Jwt  from "jsonwebtoken";

export const authenticate = (req,res,next) =>{
    const head = req.headers["token"]
   
    if(!head){
        return res.status(403).send("token is required")
    }
    try{
        const decoded = Jwt.verify(head, process.env.ACCESS_TOKEN_SECRET);
       
        req.userId = decoded;
    }catch(error){
        return res.status(401).json({"message" : "invalid token"})
    }
    return next()

}