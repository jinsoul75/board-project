import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

import Button from '../../../components/Button';

export default async function Edit(props: { params: { id: number } }) {
  const db = (await connectDB).db('forum');
  let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div>
      <h4>수정페이지</h4>
      <form action="/api/post/edit" method="POST">
        <label htmlFor="title">제목</label>
        <input id="title" name="title" defaultValue={result?.title} type="text"></input>
        <label htmlFor="content">내용</label>
        <input id="content" name="content" defaultValue={result?.content} type="text"></input>
        <input name="_id" defaultValue={result?._id.toString()}></input>
        <Button type='submit' buttonName={"수정완료"} />
      </form>
    </div>
  );
}
