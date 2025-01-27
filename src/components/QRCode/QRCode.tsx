'use client';

import { useQRCode } from 'next-qrcode';
import Image from 'next/image';

import css from './QRCode.module.scss';

export function QRCode() {
  const { Canvas } = useQRCode();

  const appLink =
    'https://drive.google.com/drive/folders/19eDB_avqBPFiX5XsRcBlwu1bf6313EXN?usp=sharing';

  return (
    <div className={css.layout}>
      <div className={css.titleWrapper}>
        <span className={css.text}>З мобільного?</span>
        <Image
          src={'/android.svg'}
          width={20}
          height={20}
          alt="qr code"
          priority
        />
      </div>
      <span className={css.text}>
        Скануйте QR-код і завантажуйте застосунок,
      </span>
      <span className={css.text}>
        або переходьте за{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className={css.link}
          href={appLink}
        >
          посиланням
        </a>
      </span>
      <Canvas
        text={appLink}
        options={{
          type: 'image/jpeg',
          quality: 0.3,
          errorCorrectionLevel: 'M',
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: '#000',
            light: '#FFBF60FF',
          },
        }}
      />
    </div>
  );
}
