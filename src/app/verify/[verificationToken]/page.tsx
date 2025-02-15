'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useParams } from 'next/navigation';

import { parseError } from '@/helpers/parseError';
import { verifyEmail } from '@/store/auth/authOperations';
import { addUserInfo } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';

import { LoaderModal } from '@/components/shared/LoaderModal';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

export default function Verify() {
  const [isLoading, setIsLoading] = useState(false);

  const { verificationToken } = useParams<{ verificationToken: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const verify = async () => {
      setIsLoading(true);
      try {
        const response = await verifyEmail(verificationToken);
        dispatch(addUserInfo(response));
        toast.success('Email підтверджено', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: true,
          closeButton: false,
        });

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        return toast.error(parseError(error), {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: true,
          closeButton: false,
        });
      }
    };

    verify();
  }, [dispatch, verificationToken]);

  return <SectionContainer>{isLoading && <LoaderModal />}</SectionContainer>;
}
