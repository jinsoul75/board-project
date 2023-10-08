import Image from 'next/image';

import { connectDB } from '@/util/database';
import { Post } from '@/util/types';
import { POST, FORUM } from '@/util/constants';

import ListItem from '../../components/post/ListItem';
import Pagination from '@/components/common/Pagination';

import nodata from '../../public/images/nodata.jpg';

export default async function List({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const db = (await connectDB).db(FORUM);

  const pageSize = 10;
  const currentPage = Number(searchParams.page);
  const collection = db.collection(POST);
  const totalPosts = await collection.countDocuments();

  let posts: Post[] = await db
    .collection<Post>(POST)
    .find()
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
      {posts.length === 0 ? <Image src={nodata} alt="no-data"></Image> : <ListItem posts={posts} />}
      <Pagination
        totalPosts={totalPosts}
        currentPage={currentPage}
        pageSize={pageSize}
        category="list"
      />
    </>
  );
}
