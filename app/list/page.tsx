import { connectDB } from '@/util/database';
import ListItem from '../../components/ListItem';
import Aside from '../../components/Aside';
import tw from 'tailwind-styled-components';
import Pagination from '@/components/Pagination';
import { ObjectId } from 'mongodb';

export default async function List() {
  const db = (await connectDB).db('forum');
  let result = await db.collection('post').find().toArray();
  result = result.map((d) => {
    d._id = d._id.toString() as unknown as ObjectId;
    return d;
  });
  const splitResult = [...result.slice(0, 10)];
  const pageSize = 10;
  const currentPage = 1;
  return (
    <Main>
      <Aside banner={null} />
      <Container>
        {splitResult.map((a, i) => (
          <ListItem key={i} result={splitResult[i]} />
        ))}
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
