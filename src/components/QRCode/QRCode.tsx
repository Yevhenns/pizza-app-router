'use client';

import { useQRCode } from 'next-qrcode';

import css from './QRCode.module.scss';

export function QRCode() {
  const { Canvas } = useQRCode();

  return (
    <div className={css.layout}>
      <span className={css.text}>З мобільного?</span>
      <span className={css.text}>Скануйте QR-код і переходьте на сайт</span>
      <Canvas
        text={'https://nostrra-pizzza.vercel.app/'}
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
