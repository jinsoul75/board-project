import { connectDB } from '@/util/database';
import ListItem, { Post } from '../../../components/ListItem';
import Aside from '../../../components/Aside';
import tw from 'tailwind-styled-components';
import Pagination from '@/components/Pagination';

export default async function Frontend({ params }: { params: { i: string } }) {
  const db = (await connectDB).db('forum');
  let result: Post[] = await db.collection<Post>('post').find().sort({ 'date': -1 }).toArray();
  result = result.map((d) => {
    d._id = d._id.toString() as unknown as string;
    return d;
  });

  const newResult = result.filter((d) => d.category === 'FRONTEND');

  const pageSize = 10;
  const currentPage = Number(params.i);
  const startIndex = (currentPage - 1) * pageSize;

  return (
    <Main>
      <Aside banner={null} />
      <Container>
        <ListItem result={newResult.slice(startIndex, startIndex + pageSize)} />
        <Pagination totalPosts={result.length} currentPage={currentPage} pageSize={pageSize} />
      </Container>
      <Aside banner={'banner'} />
    </Main>
  );
}

const Main = tw.main`
  flex
  p-[20px]
  mb-[40px]
`;

const Container = tw.div`
  flex
  flex-col
`;