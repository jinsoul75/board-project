import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { ObjectId } from 'mongodb';
import tw from 'tailwind-styled-components';

import { connectDB } from '@/util/database';
import { UserInfo } from '@/util/types';
import dateFommatter from '@/util/dateFomatter';
import { POST, FORUM } from '@/util/constants';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import DeleteBtn from '../../../../components/post/DeleteBtn';
import Comment from '../../../../components/comment/Comment';
import Like from '../../../../components/post/LikeBtn';
import Category from '@/components/common/Category';

import { AiOutlineEdit } from 'react-icons/ai';

export default async function Detail(props: { params: { id: string } }) {
  const session: UserInfo | null = await getServerSession(authOptions);
  
  const db = (await connectDB).db(FORUM);

  const post = await db.collection(POST).findOne({ _id: new ObjectId(props.params.id) });

  if (post) {
    post._id = post._id.toString() as unknown as ObjectId;
  }

  let foundOne;

  if (session) {
    foundOne = await db.collection('like').findOne({
      userId: new ObjectId(session.user.id),
      pageId: new ObjectId(post?._id),
    });
    if (foundOne) {
      foundOne._id = foundOne._id.toString() as unknown as ObjectId;
      foundOne.pageId = foundOne.pageId.toString();
      foundOne.userId = foundOne.userId.toString();
    }
  }

  return (
    <section className="flex flex-col p-[20px] grow">
      <article className="mb-6">
        <Category categoryName={post?.category} />
        <h1 className="text-xl font-bold mt-2 mb-6">{post?.title}</h1>
        <p className="text-gray-600 text-l mb-6">{post?.content}</p>
        <div className="flex items-end flex-col">
          <div>{dateFommatter(post?.date)}</div>
          <div>{post?.author}</div>
        </div>
        <Buttons>
          {session && session.user.email === post?.email ? (
            <>
              <Like isLike={{ pageId: foundOne?.pageId }} pageId={post?._id} />
              <Link
                className="text-xl hover:text-blue-600  mr-1 flex items-center"
                prefetch={false}
                href={`list/edit/${post?._id}`}
              >
                <AiOutlineEdit />
                수정하기
              </Link>
              <DeleteBtn />
            </>
          ) : null}
        </Buttons>
      </article>
      <Comment _id={post?._id as unknown as number} session={session} />
    </section>
  );
}

const Buttons = tw.div`
  flex
`;
