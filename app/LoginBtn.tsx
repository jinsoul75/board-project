"use client";
import { signIn } from "next-auth/react";
export default function LoginBtn() {
  return <button className="border border-soul-black rounded py-1 px-5" onClick={() => signIn()}>로그인</button>;
}
