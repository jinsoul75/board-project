import { getServerSession } from 'next-auth';
import { ObjectId } from 'mongodb';
import { redirect } from 'next/navigation';

import { connectDB } from '@/util/database';
import { Post } from '@/util/types';
import { POST, FORUM } from '@/util/constants';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import ListItem from '../../../components/post/ListItem';

export default async function MyLikes() {
  const session: { user: { id: string } } | null = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');
  }

  const db = (await connectDB).db(FORUM);

  let likePosts = await db
    .collection('like')
    .find({ userId: new ObjectId(session?.user.id) })
    .toArray();

  const likePostsId = likePosts.map((likePost) => {
    likePost.pageId = likePost.pageId.toString() as unknown as string;
    return likePost.pageId;
  });

  let allPosts: Post[] = await db.collection<Post>(POST).find().toArray();

  allPosts = allPosts.map((post) => {
    post._id = post._id.toString() as unknown as string;
    return post;
  });

  const likedPosts = allPosts.filter((post) => likePostsId.includes(post._id));

  return (
    <>
      {likedPosts.length === 0 ? (
        <div>좋아요한 게시글이 없어요!🥹</div>
      ) : (
        <ListItem posts={likedPosts} />
      )}
    </>
  );
}
