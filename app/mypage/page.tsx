import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import Button from '@/components/common/Button';
import ListItem from '@/components/post/ListItem';
import { Post } from '@/util/types';
import { POST, FORUM } from '@/util/constants';
import { UserInfo } from '@/util/types';

export default async function Mypage() {
  const session: UserInfo | null = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');
  }

  const db = (await connectDB).db(FORUM);

  let posts: Post[] = await db.collection<Post>(POST).find().sort({ date: -1 }).toArray();
  
  posts = posts.map((post) => {
    post._id = post._id.toString() as unknown as string;
    return post;
  });

  let myPosts: Post[] = [];

  if (session) {
    myPosts = posts.filter((post) => post.email === session.user?.email);
  }

  return (
    <div className="p-[20px] mb-[40px]">
      {session === null ? (
        <div>로그인이 필요한 서비스입니다.</div>
      ) : (
        <div>
          <div className="flex flex-col justify-center items-center">
            <Image
              className="rounded-full"
              src={session.user.image}
              alt="user-image"
              width={100}
              height={100}
            ></Image>
            <div className="mt-4 text-3xl font-bold text-blue-600">{session.user.name}</div>
            <div className="mt-4">{session.user.email}</div>
          </div>
          {session.user.email === null ? (
            <form action="/api/post/add_email" method="POST">
              <label htmlFor="category">이메일을 입력해주세요.</label>
              <input id="email" name="email"></input>
              <input name="id" defaultValue={session.user.id}></input>
              <Button colorName={'bg-emerald-600'} buttonName={'이메일입력'} type="submit"></Button>
            </form>
          ) : (
            <div className="flex flex-col items-center border mt-5">
              <div className="text-2xl font-bold m-5">내가 쓴 글</div>
              <ListItem posts={myPosts} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
