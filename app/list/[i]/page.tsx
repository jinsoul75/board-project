import { connectDB } from "@/util/database";
import ListItem from "../../../components/ListItem";
import Aside from "../../../components/Aside";
import tw from "tailwind-styled-components";
import Pagination from "@/components/Pagination";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result:any = await db.collection("post").find().toArray();
  result = result.map((d: any) => {
    d._id = d._id.toString();
    return d;
  });
  let splitResult = [...result.slice(0,10)]
  splitResult = [splitResult]
  const pageSize = 10;
  const currentPage = 1;

  return (
    <Main>
      <Aside />
      <Container>
      {splitResult.map((a,i)=>
         <ListItem key={i} result={splitResult[i]} />)
        } 
        <Pagination totalPosts={result.length} currentPage={currentPage} pageSize={pageSize} />
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
