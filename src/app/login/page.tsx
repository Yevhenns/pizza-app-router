'use client';

import { useState } from 'react';

import Image from 'next/image';

import { GoogleLogin } from '@react-oauth/google';
import { JwtPayload, jwtDecode } from 'jwt-decode';

import css from './page.module.scss';

interface CustomJwtPayload extends JwtPayload {
  name?: string;
  picture?: string;
}

export default function Login() {
  const [decoded, setDecoded] = useState<CustomJwtPayload | null>(null);

  return (
    <div className={css.layout}>
      <GoogleLogin
        onSuccess={credentialResponse => {
          if (credentialResponse.credential) {
            const decoded = jwtDecode(credentialResponse.credential);
            setDecoded(decoded);
            console.log(decoded);
          }
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />

      {decoded && (
        <>
          {decoded.picture && (
            <Image
              src={decoded.picture}
              alt="item photo"
              width={200}
              height={200}
              priority={true}
            />
          )}
          <p>Привіт, {decoded.name}!</p>
        </>
      )}
    </div>
  );
}
