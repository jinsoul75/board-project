"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function DetailLink({ result }: any) {
  const router = useRouter();
  return (
    <button
      className='border border-soul-black rounded py-1 px-5'
      onClick={() => {
        axios
          .post("/api/post/delete", {
            _id: result._id,
          })
          .then((res) => {
            if (res.status === 200) {
              router.push("/");
            }
          })
          .catch(() => {
            alert("삭제할 권한이 없습니다.");
          });
      }}
    >
      삭제버튼
    </button>
  );
}
