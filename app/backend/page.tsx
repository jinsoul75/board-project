import { connectDB } from '@/util/database';
import ListItem, { Post } from '../../components/ListItem';
import Aside from '../../components/Aside';
import tw from 'tailwind-styled-components';

export default async function Backend() {
  const db = (await connectDB).db('forum');
  let result: Post[] = await db.collection<Post>('post').find().toArray();
  result = result.map((d) => {
    d._id = d._id.toString() as unknown as string;
    return d;
  });
  const newResult = result.filter((d) => d.category === 'BACKEND');

  return (
    <Main>
      <Aside banner={null} />
      <ListItem result={newResult} />
      <Aside banner={'banner'} />
    </Main>
  );
}

const Main = tw.main`
  flex
  p-[20px]
  overflow-auto
`;
