import { connectDB } from '@/util/database';
import ListItem, { Post } from '../../components/post/ListItem';
import Aside from '../../components/common/Aside';
import tw from 'tailwind-styled-components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ObjectId } from 'mongodb';
import { redirect } from 'next/navigation';

export default async function MyLikes() {
  const session: { user: { id: string } } | null = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');
  }

  //좋아요 데이터
  const db = (await connectDB).db('forum');
  let likes = await db
    .collection('like')
    .find({ userId: new ObjectId(session?.user.id) })
    .toArray();
  likes = likes.map((d) => {
    d.pageId = d.pageId.toString() as unknown as ObjectId;
    return d;
  });

  //전체 데이터 ?
  let result: Post[] = await db.collection<Post>('post').find().toArray();
  result = result.map((d) => {
    d._id = d._id.toString() as unknown as string;
    return d;
  });

  //좋아요 데이터중 postId 배열
  const likesArr = likes.map((d) => d.pageId);
  //전체 데이터중에 postId와 일치하는 데이터들의 배열
  const newResult = result.filter((d) => likesArr.includes(d._id));

  return (
    <Main>
      <Aside />
      <Container>
        {newResult.length === 0 ? (
          <div>좋아요한 게시글이 없어요!🥹</div>
        ) : (
          <ListItem result={newResult} />
        )}
      </Container>

      <Aside banner={'banner'} />
    </Main>
  );
}

const Main = tw.main`
  flex
  p-[20px]
  overflow-auto
`;

const Container = tw.div`
  grow
  flex
  flex-col
  justify-center
  items-center
`;
