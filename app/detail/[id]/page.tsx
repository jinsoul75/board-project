import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Aside from "../../../components/Aside";
import DeleteBtn from "./DeleteBtn";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Comment from "./Comment";

export default async function Detail(props: any) {
  const session: any = await getServerSession(authOptions);
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  result._id = result._id.toString();

  return (
    <Container>
      <Aside />
      <div className='flex flex-col p-[20px]'>
        <h4>{result.title}</h4>
        <p>{result.content}</p>
        <p>{result.category}</p>
        <Comment _id={result._id}/>
        {session.user.email === result.email ? (
          <>
            <Link href={`/edit/${result._id}`}>
              <button className='border border-soul-black rounded py-1 px-5'>
                수정 버튼
              </button>
            </Link>
            <DeleteBtn result={result} />
          </>
        ) : null}
      </div>
      <Aside banner={"banner"} />
    </Container>
  );
}

const Container = tw.div`
  flex
  p-[20px]
`;
