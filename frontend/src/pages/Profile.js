import React,{useEffect,useState} from "react";
import api from "../api";


function Profile(){


const [user,setUser]=useState(null);
const [posts,setPosts]=useState([]);



useEffect(()=>{

getProfile();

},[]);



const getProfile=async()=>{


try{


const res =
await api.get("/auth/profile",
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
});


setUser(res.data.user);

setPosts(res.data.posts);



}
catch(error){

console.log(error.response?.data);

}


};




return(

<div className="container">


{
user &&

<>


<h1>
👤 {user.name}
</h1>


<h3>
{user.email}
</h3>



<h2>
My Posts : {posts.length}
</h2>



{
posts.map(post=>(


<div 
className="post-card"
key={post._id}
>


<h2>
{post.title}
</h2>


<p>
{post.content}
</p>


</div>


))

}



</>

}



</div>

)

}


export default Profile;