import { connectDB } from "@/util/database";
import ListItem from "../../components/ListItem";
import Aside from "../../components/Aside";
import tw from "tailwind-styled-components";

export default async function Frontend() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  result = result.map((d: any) => {
    d._id = d._id.toString() as string;
    return d;
  });
  const newResult = result.filter((d) => d.category === "FRONTEND");

  return (
    <Main>
      <Aside />
      <ListItem result={newResult} />
      <Aside banner={"banner"} />
    </Main>
  );
}

const Main = tw.main`
  flex
  p-[20px]
  overflow-auto
`;
