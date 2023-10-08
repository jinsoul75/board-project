'use client';
import Link from 'next/link';
import tw from 'tailwind-styled-components';

import dateFommatter from '@/util/dateFomatter';
import { Post } from '@/util/types';

import Category from '../common/Category';

import { AiFillHeart, AiOutlineMessage } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';

interface PostListProps {
  posts: Post[];
}

export default function ListItem({ posts }: PostListProps) {
  return (
    <ul
      className="grow
    px-[20px]
    w-full"
    >
      {posts.map((post: Post) => (
        <li
          className="m-1
        border
        p-[20px]
        hover:bg-slate-100
        "
          key={post._id}
        >
          <Category categoryName={post.category} />
          <FlexDiv className="mb-2 text-gray-500">
            <FlexDiv className="mr-2">
              <BsPersonCircle className="mr-1" />
              {post.author}
            </FlexDiv>
            <div>{dateFommatter(post.date)}</div>
          </FlexDiv>
          <Link
            prefetch={false}
            href={`list/detail/${post._id}`}
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
        </li>
      ))}
    </ul>
  );
}

const FlexDiv = tw.div`
  flex
  items-center
  text-l
`;
