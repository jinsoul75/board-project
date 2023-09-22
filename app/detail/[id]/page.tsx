import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import Aside from '../../../components/Aside';
import DeleteBtn from './DeleteBtn';
import Link from 'next/link';
import tw from 'tailwind-styled-components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Comment from './Comment';
import Like from './Like';
import { Post } from '@/components/ListItem';

export interface UserInfo {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
  }
}

export default async function Detail(props: { params: { id: string } }) {
  const session:UserInfo | null = await getServerSession(authOptions);
  const db = (await connectDB).db('forum');

  let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });

  if (result) {
    result._id = result._id.toString() as unknown as ObjectId;
  }

  let foundOne;

  if (session) {
    foundOne = await db.collection('like').findOne({
      userId: new ObjectId(session.user.id),
      pageId: new ObjectId(result?._id),
    });
    if (foundOne) {
      foundOne._id = foundOne._id.toString() as unknown as ObjectId;
      foundOne.pageId = foundOne.pageId.toString();
      foundOne.userId = foundOne.userId.toString();
    }
  }

  return (
    <Container>
      <Aside banner={null} />
      <div className="flex flex-col p-[20px]">
        <h4>{result?.title}</h4>
        <p>{result?.content}</p>
        <p>{result?.category}</p>
        <Comment _id={result?._id as unknown as number} />
        <Like isLike={{ pageId: foundOne?._id }} pageId={result?._id} />
        {session && session.user.email === result?.email ? (
          <>
            <Link prefetch={false} href={`/edit/${result?._id}`}>
              <button className="border border-soul-black rounded py-1 px-5">수정 버튼</button>
            </Link>
            <DeleteBtn />
          </>
        ) : null}
      </div>
      <Aside banner={'banner'} />
    </Container>
  );
}

const Container = tw.div`
  flex
  p-[20px]
`;
