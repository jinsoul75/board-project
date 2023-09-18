"use client";
import { signOut } from "next-auth/react";
export default function LoginOut() {
  return (
    <button
      className='border border-soul-black rounded py-1 px-5'
      onClick={() => signOut()}
    >
      로그아웃
    </button>
  );
}
