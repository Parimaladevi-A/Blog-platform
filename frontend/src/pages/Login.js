import React,{useState} from "react";
import api from "../api";


function Login(){


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");



const login=async()=>{


try{


const res =
await api.post("/auth/login",{

email,
password

});



localStorage.setItem(
"token",
res.data.token
);



alert("Login Success");


console.log(
localStorage.getItem("token")
);



}
catch(error){

alert(
error.response?.data?.message
);

}


}



return(

<div>

<h1>Login</h1>


<input

placeholder="Email"

onChange={(e)=>setEmail(e.target.value)}

/>


<input

placeholder="Password"

type="password"

onChange={(e)=>setPassword(e.target.value)}

/>


<button onClick={login}>
Login
</button>


</div>

)


}


export default Login;