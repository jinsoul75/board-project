import Image from 'next/image';
import { connectDB } from '@/util/database';
import ListItem, { Post } from '../../components/post/ListItem';
import Pagination from '@/components/common/Pagination';
import nodata from '../../public/images/nodata.jpg';

export default async function List({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const db = (await connectDB).db('forum');

  const pageSize = 10;
  const currentPage = Number(searchParams.page);
  const collection = db.collection('post');
  const totalPosts = await collection.countDocuments();

  let result: Post[] = await db
    .collection<Post>('post')
    .find()
    .sort({ date: -1 })
    .skip(10 * (currentPage - 1))
    .limit(10)
    .toArray();

  result = result.map((d) => {
    d._id = d._id.toString() as unknown as string;
    return d;
  });

  return (
    <>
      {result.length === 0 ? (
        <Image src={nodata} alt="no-data"></Image>
      ) : (
        <ListItem result={result} />
      )}
      <Pagination
        totalPosts={totalPosts}
        currentPage={currentPage}
        pageSize={pageSize}
        category="list"
      />
    </>
  );
}
