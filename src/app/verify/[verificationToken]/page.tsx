'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { parseError } from '@/helpers/parseError';
import { verifyEmail } from '@/store/auth/authOperations';
import { addUserInfo } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';

import { Button } from '@/components/shared/Button/Button';
import { LoaderModal } from '@/components/shared/LoaderModal/LoaderModal';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

export default function Verify() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(false);

  const { verificationToken } = useParams<{ verificationToken: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const verify = async () => {
      setIsLoading(true);
      try {
        const response = await verifyEmail(verificationToken);
        dispatch(addUserInfo(response));
      } catch (error) {
        setError(error);
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    verify();
  }, [dispatch, verificationToken]);

  return (
    <SectionContainer>
      {isLoading && <LoaderModal />}
      {!isLoading && (
        <Link href={'/'}>
          <Button>На головну</Button>
        </Link>
      )}
      {error && <p>{parseError(error)}</p>}
      {!isLoading && !error && (
        <div>
          <p>Email підтверджено</p>
        </div>
      )}
    </SectionContainer>
  );
}
