import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Aside from '@/app/components/Aside';
export default async function Detail(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div>
      <Aside/>
      <h4>datail</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
      <p>{result.category}</p>
      <Aside banner={'banner'}/>
    </div>
  );
}
