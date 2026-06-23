import React,{useState} from "react";
import api from "../api";


function EditPost({id}){


const [title,setTitle]=useState("");
const [content,setContent]=useState("");



const updatePost=async()=>{


await api.put(

`/posts/${id}`,

{
title,
content
},

{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}

);


alert("Updated");

};



return(

<div>

<h3>Edit Post</h3>


<input

placeholder="Title"

onChange={(e)=>setTitle(e.target.value)}

/>


<textarea

placeholder="Content"

onChange={(e)=>setContent(e.target.value)}

/>


<button onClick={updatePost}>
Update
</button>


</div>

)

}


export default EditPost;