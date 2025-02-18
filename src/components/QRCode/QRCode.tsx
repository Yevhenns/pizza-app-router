'use client';

import { useQRCode } from 'next-qrcode';

import { BASE_URL } from '@/assets/variables';

import css from './QRCode.module.scss';

export function QRCode() {
  const { Canvas } = useQRCode();

  return (
    <div className={css.layout}>
      <h2 className={css.text}>З мобільного?</h2>
      <span className={css.text}>Скануйте QR-код і переходьте на сайт</span>
      <Canvas
        text={BASE_URL}
        options={{
          type: 'image/jpeg',
          errorCorrectionLevel: 'M',
          quality: 0.3,
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
