'use client'
import Link from "next/link";
import tw from "tailwind-styled-components";

export default function ListItem({ result }: any) {
  return (
    <StyledUl>
      {result.map((_: any, i: any) => (
        <StyledListItem key={i}>
          <div className='p-[20px]'>
            {result[i].category === "FRONTEND" ? (
              <div className='font-bold text-orange-600 mb-0.5'>
                {result[i].category}
              </div>
            ) : (
              <div className='font-bold text-emerald-600 mb-0.5'>
                {result[i].category}
              </div>
            )}
            <Link prefetch={false} href={`/detail/${result[i]._id}`}>
              <div className='flex justify-between mb-3'>
                <div className='font-bold text-xl'>{result[i].title}</div>
                <div>{result[i].author}</div>
                <div>
                  <span className='mr-[10px]'>댓글 수{result[i].commentCount}</span>
                  <span>좋아요 수{result[i].likeCount}</span>
                </div>
              </div>
              <p className='mb-3'>{result[i].content.slice(0, 198)}</p>
            </Link>
            <div className='flex justify-end'>
              <div>{result[i].date}</div>
            </div>
          </div>
          {i === result.length - 1 ? null : <hr></hr>}
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
