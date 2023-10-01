import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import { StyledLabel } from '../edit/[id]/page';

export default async function write() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');
  }

  return (
    <main className="p-4">
      <section>
        <form action="/api/post/new" method="POST" className="flex flex-col border p-4 mt-4">
          <h1 className="text-3xl font-bold">새글작성</h1>
          <hr className='my-4'></hr>
          <StyledLabel htmlFor="category">카테고리</StyledLabel>
          <select className="border rounded-2xl p-2 w-40" id="category" name="category">
            <option value="FRONTEND">프론트앤드</option>
            <option value="BACKEND">백앤드</option>
          </select>
          <StyledLabel htmlFor="title">제목</StyledLabel>
          <input
            className="border p-2 rounded-xl"
            id="title"
            name="title"
            type="text"
            placeholder="제목을 입력해주세요"
          ></input>
          <StyledLabel htmlFor="content">내용</StyledLabel>
          <textarea
            className="border p-2 rounded-lg"
            id="content"
            name="content"
            placeholder="내용을 입력해주세요"
          ></textarea>{' '}
          <input className="hidden" name="date" defaultValue={new Date().toLocaleString()}></input>
          <input className="hidden" name="likeCount" defaultValue={0}></input>
          <input className="hidden" name="commentCount" defaultValue={0}></input>
          <div className="flex justify-center mt-4">
            <button className="border p-2 w-20 rounded-lg hover:bg-blue-500" type="submit">
              작성완료
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
