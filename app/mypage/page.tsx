import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Button from "@/components/Button";
import { connectDB } from "@/util/database";

export default async function Mypage() {
  const session = await getServerSession(authOptions);
  const db = (await connectDB).db("test");
  let result = await db.collection("users").find().toArray();

  return (
    <div>
      {session === null ? (
        <div>로그인해줘잉</div>
      ) : (
        <div>
          <img className='w-[50px] h-[50px]' src={session.user.image}></img>
          <span>{session.user.name}</span>
          {session.user.email === null ? (
            <form action='/api/post/add_email' method='POST'>
              <label htmlFor='category'>이메일을 입력해주세요.</label>
              <input id='email' name='email'></input>
              <input name='id' defaultValue={session?.user.id}></input>
              <Button
                colorName={"bg-emerald-600"}
                buttonName={"이메일입력"}
                type='submit'
              ></Button>
            </form>
          ) : (
            <div>여기에 니가쓴 글이 들어올꺼다</div>
          )}
        </div>
      )}
    </div>
  );
}
