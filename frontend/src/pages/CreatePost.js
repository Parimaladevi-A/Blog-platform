import React,{useState} from "react";
import api from "../api";


function CreatePost(){

const [post,setPost]=useState({
title:"",
content:"",
category:""

});


const handleChange=(e)=>{

setPost({
...post,
[e.target.name]:e.target.value
});

};



const createPost=async()=>{
console.log("Button clicked");

try{


await api.post(

"/posts",

post,

{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}

);


alert("Post created");


setPost({
title:"",
content:""
});


}
catch(error){

console.log(error.response?.data);

}


}



return(

<div>


<h1>Create Blog</h1>


<input

name="title"

placeholder="Title"

value={post.title}

onChange={handleChange}

/>
<input

name="category"

placeholder="Category"

onChange={handleChange}

/>

<br/>


<textarea

name="content"

placeholder="Content"

value={post.content}

onChange={handleChange}

/>


<br/>


<button onClick={createPost}>
Create Post
</button>


</div>


)

}


export default CreatePost;