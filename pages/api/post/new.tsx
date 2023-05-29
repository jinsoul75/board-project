import { connectDB } from "@/util/database";
export default async function handler(req,res){
    console.log(req.body)
if(req.method === "POST"){
    if (req.body.title === ""||req.body.content==="") {
        return res.status(500).json("fill all!!!");
    }
    try {
        const db = (await connectDB).db("forum");
        let result = await db.collection("post").find({title:req.body.title}).toArray()
        result = await db.collection('post').insertOne(req.body)
        res.redirect(302, '/')
    } catch(error){
        console.error();
    }
}
}