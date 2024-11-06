const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
main()
.then((res)=>{
    console.log("successful");
}).catch(err=>{
    console.log (err);
})
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/mywhatsapp")
}
let allchats= [{
    from:"mohan",
    to:"Sohan",
    msg:"whatsapp bro",
    created_at:new Date()
},
{
    from:"Rohit",
    to:"Mohit",
    msg:"which model of car you like ",
    created_at:new Date()
},
{ from:"Somya ",
    to:"Ritika",
    msg:"where is your new modeling function ",
    created_at:new Date()

},
{ from:"Ayush",
    to:"Kartik",
    msg:"Bhai tu kya khayega ",
    created_at:new Date()
}
]
Chat.insertMany(allchats);


