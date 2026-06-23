const router = require("express").Router();

const Post = require("../models/Post");

const auth = require("../middleware/auth");


// CREATE POST

router.post("/", auth, async(req,res)=>{

try{

const post = await Post.create({

title:req.body.title,

content:req.body.content,

author:req.user.id

});


res.json(post);


}
catch(error){

res.status(500).json({
message:error.message
});

}

});




// GET ALL POSTS

router.get("/", async(req,res)=>{


try{


const posts = await Post.find()
.populate({
    path:"author",
    select:"name",
    strictPopulate:false
});


res.json(posts);


}
catch(error){

console.log(error);

res.status(500).json({
message:error.message
});

}


});




// UPDATE POST

router.put("/:id",auth,async(req,res)=>{


try{


await Post.findByIdAndUpdate(

req.params.id,

req.body

);


res.json("Updated");


}
catch(error){

res.status(500).json({
message:error.message
});

}


});




// DELETE POST

router.delete("/:id",auth,async(req,res)=>{


try{


await Post.findByIdAndDelete(
req.params.id
);


res.json("Deleted");


}
catch(error){

res.status(500).json({
message:error.message
});

}


});

router.put("/:id/like",auth,async(req,res)=>{


try{


const post =
await Post.findById(req.params.id);



if(
post.likes.includes(req.user.id)
){

post.likes =
post.likes.filter(
id=>id.toString()!==req.user.id
);

}

else{

post.likes.push(req.user.id);

}



await post.save();


res.json(post);


}
catch(error){

res.status(500).json({
message:error.message
});

}


});

module.exports = router;