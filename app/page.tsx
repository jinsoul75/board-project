import { connectDB } from "@/util/database";
import ListItem from "./components/ListItem";
import Aside from "./components/Aside";
import tw from "tailwind-styled-components";

export default async function Home() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  result = result.map((d) => {
    d._id = d._id.toString();
    return d;
  });
  return (
    <Main>
      <Aside />
      <ListItem result={result} />
      <Aside banner={'banner'} />
    </Main>
  );
}

const Main = tw.main`
  flex
`
