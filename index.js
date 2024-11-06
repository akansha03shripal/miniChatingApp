const express= require("express");
const mongoose=require("mongoose");
const app=express();
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.listen (8080,()=>{
    console.log("app is listening on port 8080");
})
app.get("/",(req,res)=>{
    res.render("home.ejs");

})
main()
.then((res)=>{
    console.log("successful");
}).catch(err=>{
    console.log (err);
})
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/mywhatsapp")
}
//  const chat1=new Chat({
//     from:"gk",
//     to:"Vk",
//     msg:"welcome to iitgjobs jhg",
//     created_at:new Date()
//  })
//  chat1.save().then((res)=>{
//     console.log("hello"+res.from);
//     console.log(res);
//  }).catch(err=>{
// console.log(err);
//  })
app.get("/chats", async(req,res)=>{
    let chats=await Chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats});
    
})
app.get("/chatee",(req,res)=>{
    console.log("home is working");
    res.redirect("/chats");
})

app.get("/newchats",(req,res)=>{
    console.log("new chat is also working");
    res.render("newchat.ejs")

})
app.post("/chats",(req,res)=>{
    let {from,msg,to}=req.body;
    let newchat=new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date()
    })
    newchat.save().then((res)=>{
        console.log("new chat added");
        console.log(newchat);
    }).catch(err=>{console.log(err);
        
    })
    res.redirect("/chats");
    
})
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});

}

)
//update route
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let{msg:newmsg}= req.body;
    let updatedChat= await Chat.findByIdAndUpdate(id,{msg:newmsg},{runValidators:true,new:true})
    console.log(updatedChat);
    res.redirect("/chats");
})
app.delete("/chats/:id",async(req,res)=>{
    let{id}=req.params;
    let deletechat= await Chat.findByIdAndDelete(id);
    console.log(deletechat);
    res.redirect("/chats");
})