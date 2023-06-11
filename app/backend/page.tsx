import { connectDB } from "@/util/database";
import ListItem from "../../components/ListItem";
import Aside from "../../components/Aside";
import tw from "tailwind-styled-components";

export default async function Backend() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  result = result.map((d:any) => {
    d._id = d._id.toString();
    return d;
  });
  const newResult = result.filter(d => d.category === 'BACKEND')

  return (
    <Main>
      <Aside />
      <ListItem result={newResult} />
      <Aside banner={'banner'} />
    </Main>
  );
}

const Main = tw.main`
  flex
  p-[20px]
  overflow-auto
`
