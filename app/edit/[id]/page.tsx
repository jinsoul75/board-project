import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

import tw from 'tailwind-styled-components';

export default async function Edit(props: { params: { id: number } }) {
  const db = (await connectDB).db('forum');
  let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold">수정페이지</h1>
      <section>
        <form action="/api/post/edit" method="POST" className="flex flex-col border p-4 mt-4">
          <select className="border rounded-2xl p-2 w-40" id="category" name="category">
            <option value="FRONTEND">프론트앤드</option>
            <option value="BACKEND">백앤드</option>
          </select>
          <StyledLabel htmlFor="title">제목</StyledLabel>
          <input
            className="border p-2 rounded-lg"
            id="title"
            name="title"
            defaultValue={result?.title}
            type="text"
          ></input>
          <StyledLabel htmlFor="content">내용</StyledLabel>
          <textarea
            className="border p-2 rounded-lg"
            id="content"
            name="content"
            defaultValue={result?.content}
          ></textarea>
          <input className="hidden" name="_id" defaultValue={result?._id.toString()}></input>
          <div className='flex justify-center mt-4'>
            <button className="border p-2 w-20 rounded-lg hover:bg-blue-300" type="submit">
              수정완료
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

const StyledLabel = tw.label`
  text-lg
  font-bold
  mt-4
  mb-2
`;
