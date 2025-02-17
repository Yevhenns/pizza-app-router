'use client';

import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import css from './ModalWrapper.module.scss';

type ModalWrapperProps = {
  children: ReactNode;
};

export function ModalWrapper({ children }: ModalWrapperProps) {
  return createPortal(
    <div className={css.modalWrapper}>{children}</div>,
    document.body
  );
}
