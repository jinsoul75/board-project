import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Button from "@/components/Button";
import { connectDB } from "@/util/database";
import tw from "tailwind-styled-components";
import ListItem from "@/components/ListItem";
export default async function Mypage() {
  const session :any = await getServerSession(authOptions);
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  result = result.map((d: any) => {
    d._id = d._id.toString();
    return d;
  });
  const myResult = result.filter((d:any) => d.email === session.user.email);

  return (
    <div className='p-[20px]'>
      {session === null ? (
        <div>로그인해줘잉</div>
      ) : (
        <div>
          <div className='flex flex-col justify-center items-center'>
            <img
              className='w-[100px] h-[100px] rounded-full'
              src={session.user.image}
            ></img>
            <div className='mt-[20px]'>{session.user.name}</div>
            <div> 내정보 수정 </div>
          </div>
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
            <div>
              <ListItem result={myResult} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
