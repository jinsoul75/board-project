import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import Aside from '../../../components/common/Aside';
import DeleteBtn from '../../../components/post/DeleteBtn';
import Link from 'next/link';
import tw from 'tailwind-styled-components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Comment from '../../../components/comment/Comment';
import Like from '../../../components/post/LikeBtn';
import { AiOutlineEdit } from 'react-icons/ai';
export interface UserInfo {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
}

export default async function Detail(props: { params: { id: string } }) {
  const session: UserInfo | null = await getServerSession(authOptions);
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
      <Aside />
      <main className="flex flex-col p-[20px] grow">
        <article className="mb-6">
          {result?.category === 'FRONTEND' ? (
            <div className="font-bold text-orange-600 mb-0.5">{result?.category}</div>
          ) : (
            <div className="font-bold text-emerald-600 mb-0.5">{result?.category}</div>
          )}
          <h1 className="text-xl font-bold mt-2 mb-6">{result?.title}</h1>
          <p className="text-gray-600 text-l mb-6">{result?.content}</p>
          <div className="flex items-end flex-col">
            <div>{result?.date}</div>
            <div>{result?.author}</div>
          </div>
          <Buttons>
            <Like isLike={{ pageId: foundOne?.pageId }} pageId={result?._id} />
            {session && session.user.email === result?.email ? (
              <>
                <Link
                  className="text-xl hover:text-blue-600  mr-1 flex items-center"
                  prefetch={false}
                  href={`/edit/${result?._id}`}
                >
                  <AiOutlineEdit />
                  수정하기
                </Link>
                <DeleteBtn />
              </>
            ) : null}
          </Buttons>
        </article>
        <Comment _id={result?._id as unknown as number} />
      </main>
      <Aside banner={'banner'} />
    </Container>
  );
}

const Container = tw.div`
  flex
  p-[20px]
  justify-between
`;

const Buttons = tw.div`
  flex
`;
