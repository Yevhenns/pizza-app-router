import Image from 'next/image';

import css from './QRCode.module.scss';

export function QRCode() {
  return (
    <div className={css.layout}>
      <span className={css.text}>З мобільного?</span>
      <span className={css.text}>
        Скануйте QR-код і завантажуйте застосунок,
      </span>
      <span className={css.text}>
        або переходьте за{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className={css.link}
          href={
            'https://drive.google.com/file/d/1GedhDKwCOE6yS0tef-TOZ_SQlRa1egIA/view?usp=drive_link'
          }
        >
          посиланням
        </a>
      </span>
      <Image src={'/qr.jpeg'} width={200} height={200} alt="qr code" priority />
    </div>
  );
}
