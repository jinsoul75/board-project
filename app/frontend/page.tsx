import { connectDB } from '@/util/database';
import ListItem, { Post } from '../../components/post/ListItem';
import Aside from '../../components/common/Aside';
import tw from 'tailwind-styled-components';
import Pagination from '@/components/common/Pagination';

export default async function Frontend({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const db = (await connectDB).db('forum');

  const pageSize = 10;
  const currentPage = Number(searchParams.page);
  const collection = db.collection('post');
  const totalPosts = await collection.countDocuments({category:'FRONTEND'});

  let result: Post[] = await db
    .collection<Post>('post')
    .find({ category: 'FRONTEND' })
    .sort({ date: -1 })
    .skip(10 * (currentPage - 1))
    .limit(10)
    .toArray();
  result = result.map((d) => {
    d._id = d._id.toString() as unknown as string;
    return d;
  });

  return (
    <Main>
      <Aside />
      <Container>
        <ListItem result={result} />
        <Pagination
          totalPosts={totalPosts}
          currentPage={currentPage}
          pageSize={pageSize}
          category="frontend"
        />
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
  grow
`;
