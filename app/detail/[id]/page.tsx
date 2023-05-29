import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Aside from "@/app/components/Aside";
import Button from "@/app/components/Button";
import DeleteBtn from './DeleteBtn';
import Link from "next/link";

export default async function Detail(props:any) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) })
  result._id = result._id.toString()
  return (
    <div>
      <Aside />
      <h4>datail</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
      <p>{result.category}</p>
      <Link href={`/edit/${result._id}`}>
      <Button colorName={"bg-emerald-600"} buttonName={"수정"}/>
      </Link> 
      <DeleteBtn result={result}/>
      <Aside banner={"banner"} />
    </div>
  );
}
