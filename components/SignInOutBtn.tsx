'use client';

import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';
import kakaoLoginBtn from '../public/images/kakao_login.png';

export function SignInBtn() {
  return (
    <button onClick={() => signIn()}>
      <Image src={kakaoLoginBtn} alt="login-button" />
    </button>
  );
}

export function SignOutBtn() {
  return (
    <button className="border border-soul-black rounded py-1 px-5" onClick={() => signOut()}>
      로그아웃
    </button>
  );
}
