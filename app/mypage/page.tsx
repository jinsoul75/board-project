import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import Button from '@/components/common/Button';
import ListItem, { Post } from '@/components/post/ListItem';
interface Sessiontype {
  user: {
    name: string;
    image: string;
    email: string;
    id: string;
  };
}

export default async function Mypage() {
  const session: Sessiontype | null = await getServerSession(authOptions);
  const db = (await connectDB).db('forum');
  let result: Post[] = await db.collection<Post>('post').find().sort({ date: -1 }).toArray();
  result = result.map((d) => {
    d._id = d._id.toString() as unknown as string;
    return d;
  });
  let myResult: Post[] = [];
  if (session) {
    myResult = result.filter((d) => d.email === session.user?.email);
  }

  return (
    <div className="p-[20px]">
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
            <div>
              <ListItem result={myResult} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
