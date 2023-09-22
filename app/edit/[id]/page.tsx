import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

import Button from '../../../components/Button';

export default async function Edit(props: { params: { id: number } }) {
  const db = (await connectDB).db('forum');
  let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div>
      <h4>수정페이지</h4>
      <form action="/api/post/add_email" method="POST">
        <label htmlFor="title">제목</label>
        <input id="title" name="title" defaultValue={result?.title} type="text"></input>
        <label htmlFor="content">내용</label>
        <input id="content" name="content" defaultValue={result?.content} type="text"></input>
        <input name="id" defaultValue={result?._id.toString()}></input>
        <input name="author" defaultValue={result?.author}></input>
        <Button buttonName={"Submit"} />
      </form>
    </div>
  );
}
