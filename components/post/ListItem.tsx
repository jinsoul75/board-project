'use client';
import Link from 'next/link';
import tw from 'tailwind-styled-components';

import { AiFillHeart, AiOutlineMessage } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import dateFommatter from '@/util/dateFomatter';
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
      {result.map((post: Post) => (
        <StyledListItem key={post._id}>
          <div className="p-[20px]">
            {post.category === 'FRONTEND' ? (
              <div className="font-bold text-orange-600 mb-0.5">{post.category}</div>
            ) : (
              <div className="font-bold text-emerald-600 mb-0.5">{post.category}</div>
            )}
            <FlexDiv className="mb-2 text-gray-500">
              <FlexDiv className="mr-2">
                <BsPersonCircle className="mr-1" />
                {post.author}
              </FlexDiv>
              <div>{dateFommatter(post.date)}</div>
            </FlexDiv>
            <Link
              className="hover:underline decoration-red-500 underline-offset-4"
              prefetch={false}
              href={`/detail/${post._id}`}
            >
              <div className="flex justify-between mb-1">
                <div className="font-bold text-xl">{post.title}</div>
              </div>
            </Link>
            <p className="mb-3 text-gray-600">
              {post.content.length > 165 ? `${post.content.slice(0, 166)}...` : post.content}
            </p>
            <FlexDiv>
              <FlexDiv className="mr-[10px]">
                <AiFillHeart className="mr-2" />
                {post.likeCount}
              </FlexDiv>
              <FlexDiv>
                <AiOutlineMessage className="mr-2" />
                {post.commentCount}
              </FlexDiv>
            </FlexDiv>
          </div>
        </StyledListItem>
      ))}
    </StyledUl>
  );
}

const StyledUl = tw.ul`
grow
px-[20px]
w-full
`;
const StyledListItem = tw.li`
m-1
border
`;

const FlexDiv = tw.div`
  flex
  items-center
  text-l
`;
