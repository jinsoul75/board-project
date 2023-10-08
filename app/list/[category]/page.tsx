import { connectDB } from '@/util/database';
import ListItem from '../../../components/post/ListItem';
import Pagination from '@/components/common/Pagination';
import { Post } from '@/util/types';
import { POST, FORUM } from '@/util/constants';

export default async function Category({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = params.category.toUpperCase();

  const db = (await connectDB).db(FORUM);

  const pageSize = 10;
  const currentPage = Number(searchParams.page);
  const collection = db.collection(POST);
  const totalPosts = await collection.countDocuments({ category: `${category}` });

  let posts: Post[] = await db
    .collection<Post>(POST)
    .find({ category: `${category}` })
    .sort({ date: -1 })
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize)
    .toArray();

  posts = posts.map((post) => {
    post._id = post._id.toString() as unknown as string;
    return post;
  });

  return (
    <>
      <ListItem posts={posts} />
      <Pagination
        totalPosts={totalPosts}
        currentPage={currentPage}
        pageSize={pageSize}
        category={`list/${params.category}`}
      />
    </>
  );
}
