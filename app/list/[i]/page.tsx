import { connectDB } from "@/util/database";
import ListItem from "../../../components/ListItem";
import Aside from "../../../components/Aside";
import tw from "tailwind-styled-components";
import Pagination from "@/components/Pagination";

export default async function Home() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  result = result.map((d: any) => {
    d._id = d._id.toString();
    return d;
  });
  
  const splitResult = [...result.slice(0,9)]
  const pageSize = 10;

  return (
    <Main>
      <Aside />
      <Container>
        <ListItem result={splitResult} />
        <Pagination totalPosts={result.length} currentPage={undefined} pageSize={pageSize} />
      </Container>
      <Aside banner={"banner"} />
    </Main>
  );
}

const Main = tw.main`
  flex
  p-[20px]
  mb-[40px]
`;

const Container = tw.div`
  flex
  flex-col
`;
