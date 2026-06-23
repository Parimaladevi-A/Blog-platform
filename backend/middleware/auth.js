const jwt=require("jsonwebtoken");


module.exports=(req,res,next)=>{


let token=req.headers.authorization;


if(!token)
return res.status(401).json("No token");


try{


token=token.split(" ")[1];


let decoded=
jwt.verify(token,process.env.JWT_SECRET);


req.user=decoded;


next();


}
catch(error){

res.status(401).json("Invalid Token");

}


}