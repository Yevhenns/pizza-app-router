import { Loader } from '../Loader';
import css from './LoaderModal.module.scss';

export function LoaderModal() {
  return (
    <div className={css.modalWrapper}>
      <div className={css.loaderWrapper}>
        <Loader />
      </div>
    </div>
  );
}
