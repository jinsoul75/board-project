'use client';
import Link from 'next/link';
import tw from 'tailwind-styled-components';

export interface Post {
  author: string;
  category: string;
  commentCount: number;
  content: string;
  date: string;
  email: string;
  likeCount: number;
  title: string;
  _id: string;
}

interface PostListProps {
  result: Post[];
}

export default function ListItem({ result }: PostListProps) {

  return (
    <StyledUl>
      {result.map((post: Post, index: number) => (
        <StyledListItem key={post._id}>
          <div className="p-[20px]">
            {post.category === 'FRONTEND' ? (
              <div className="font-bold text-orange-600 mb-0.5">{post.category}</div>
            ) : (
              <div className="font-bold text-emerald-600 mb-0.5">{post.category}</div>
            )}
            <Link prefetch={false} href={`/detail/${post._id}`}>
              <div className="flex justify-between mb-3">
                <div className="font-bold text-xl">{post.title}</div>
                <div>{post.author}</div>
                <div>
                  <span className="mr-[10px]">댓글 수{post.commentCount}</span>
                  <span>좋아요 수{post.likeCount}</span>
                </div>
              </div>
              <p className="mb-3">{post.content.slice(0, 198)}</p>
            </Link>
            <div className="flex justify-end">
              <div>{post.date}</div>
            </div>
          </div>
          { index === result.length - 1 ? null : <hr></hr>}
        </StyledListItem>
      ))}
    </StyledUl>
  );
}

const StyledUl = tw.ul`
grow
px-[20px]
`;
const StyledListItem = tw.li`
m-1
`;
