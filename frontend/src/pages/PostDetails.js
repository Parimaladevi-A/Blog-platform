import React,{useState,useEffect} from "react";
import api from "../api";


function PostDetails({postId}){


const [text,setText]=useState("");
const [comments,setComments]=useState([]);



useEffect(()=>{

getComments();

},[]);



const getComments=async()=>{


try{

const res =
await api.get(`/comments/${postId}`);


setComments(res.data);


}
catch(error){

console.log(
"Get comment error",
error.response?.data
);

}

};




const addComment=async()=>{


try{


const res =
await api.post(

`/comments/${postId}`,

{
text:text
},

{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}

);


console.log(res.data);


alert("Comment added");


setText("");


getComments();


}
catch(error){

console.log(
"Add comment error",
error.response?.data
);


alert(
error.response?.data || "Error"
);

}


};



return(

<div>


<h3>Comments</h3>


{
comments.map((c)=>(

<p key={c._id}>

<b>{c.user?.name}</b> : {c.text}

</p>

))
}



<textarea

value={text}

onChange={(e)=>setText(e.target.value)}

placeholder="Write comment"

/>


<br/>


<button onClick={addComment}>
Add Comment
</button>


</div>

)

}


export default PostDetails;