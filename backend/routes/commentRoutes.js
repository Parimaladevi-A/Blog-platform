const router=require("express").Router();

const Comment=require("../models/Comment");

const auth=require("../middleware/auth");



router.post("/:postId",auth,async(req,res)=>{


try{


const comment =
await Comment.create({

text:req.body.text,

post:req.params.postId,

user:req.user.id

});


res.json(comment);


}
catch(error){

res.status(500).json({
message:error.message
});

}


});




router.get("/:postId",async(req,res)=>{


const comments =
await Comment.find({

post:req.params.postId

})
.populate("user","name");


res.json(comments);


});



module.exports=router;