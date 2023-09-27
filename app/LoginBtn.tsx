"use client";

import Image from 'next/image';
import { signIn } from "next-auth/react";
import kakaoLoginBtn from '../public/images/kakao_login.png'

export default function LoginBtn() {
  return (
    <button
      onClick={() => signIn()}
    >
      <Image src={kakaoLoginBtn} alt="login-button" />
    </button>
  );
}
