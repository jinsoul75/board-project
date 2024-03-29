import tw from 'tailwind-styled-components';
import { ObjectId } from 'mongodb';

import { connectDB } from '@/util/database';
import { POST, FORUM, FRONTEND, BACKEND } from '@/util/constants';

export default async function Edit({ params }: { params: { id: number } }) {
  const db = (await connectDB).db(FORUM);
  const post = await db.collection(POST).findOne({ _id: new ObjectId(params.id) });

  return (
    <section className="p-4">
      <form action="/api/post/edit" method="POST" className="flex flex-col border p-4 mt-4">
        <h1 className="text-3xl font-bold">수정페이지</h1>
        <hr className="my-4"></hr>
        <StyledLabel htmlFor="category">카테고리</StyledLabel>
        <select
          className="border rounded-2xl p-2 w-40"
          id="category"
          name="category"
          value={post?.category}
        >
          <option value={FRONTEND}>프론트엔드</option>
          <option value={BACKEND}>백엔드</option>
        </select>
        <StyledLabel htmlFor="title">제목</StyledLabel>
        <input
          className="border p-2 rounded-lg"
          id="title"
          name="title"
          defaultValue={post?.title}
          type="text"
        ></input>
        <StyledLabel htmlFor="content">내용</StyledLabel>
        <textarea
          className="border p-2 rounded-lg"
          id="content"
          name="content"
          defaultValue={post?.content}
        ></textarea>
        <input className="hidden" name="_id" defaultValue={post?._id.toString()}></input>
        <div className="flex justify-center mt-4">
          <button className="border p-2 w-20 rounded-lg hover:bg-blue-500" type="submit">
            수정완료
          </button>
        </div>
      </form>
    </section>
  );
}

export const StyledLabel = tw.label`
  text-lg
  font-bold
  mt-4
  mb-2
`;
