import React,{useState} from "react";
import api from "../api";


function Register(){


const [form,setForm]=useState({

name:"",
email:"",
password:""

});



const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};



const register=async()=>{


try{


const res =
await api.post(
"/auth/register",
form
);


alert(res.data.message);


}


catch(error){


alert(
error.response?.data?.message ||
"Register failed"
);


console.log(error.response?.data);


}


};



return(

<div className="form">


<h2>Register</h2>


<input

name="name"

placeholder="Name"

onChange={handleChange}

/>


<input

name="email"

placeholder="Email"

onChange={handleChange}

/>


<input

name="password"

type="password"

placeholder="Password"

onChange={handleChange}

/>



<button onClick={register}>
Register
</button>


</div>


)

}


export default Register;