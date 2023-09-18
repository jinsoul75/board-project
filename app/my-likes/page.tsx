import { connectDB } from "@/util/database";
import ListItem from "../../components/ListItem";
import Aside from "../../components/Aside";
import tw from "tailwind-styled-components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ObjectId } from "mongodb";
export default async function MyLikes() {
  const session: any = await getServerSession(authOptions);

  //좋아요 데이터
  const db = (await connectDB).db("forum");
  let likes = await db
    .collection("like")
    .find({ userId: new ObjectId(session.user.id) })
    .toArray();
  likes = likes.map((d: any) => {
    d.pageId = d.pageId.toString();
    return d;
  });

  //전체 데이터 ?
  let result = await db.collection("post").find().toArray();
  result = result.map((d: any) => {
    d._id = d._id.toString();
    return d;
  });

  //좋아요 데이터중 postId 배열
  const likesArr = likes.map((d) => d.pageId);
  //전체 데이터중에 postId와 일치하는 데이터들의 배열
  const newResult = result.filter((d) => likesArr.includes(d._id));

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
