import { Loader } from '../Loader/Loader';
import { ModalWrapper } from '../ModalWrapper/ModalWrapper';
import css from './LoaderModal.module.scss';

export function LoaderModal() {
  return (
    <ModalWrapper>
      <div className={css.loaderWrapper}>
        <Loader />
      </div>
    </ModalWrapper>
  );
}
