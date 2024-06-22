'use client'

import React from 'react';
import css from './Error500.module.scss';

const Error500 = () => {
  return (
    <div className={css.modalWrapper}>
      <div className={css.modal}>
        <p className={css.resultText}>
          Щось пішло не так!
          <br />
          Перезавантажте сторінку,
          <br />
          або завітайте пізніше
        </p>
      </div>
    </div>
  );
};

export default Error500;
