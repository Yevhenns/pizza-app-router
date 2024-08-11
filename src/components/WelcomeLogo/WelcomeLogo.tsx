import { Loader } from '@/components/common/Loader';

import { Logo } from '../Logo';
import css from './WelcomeLogo.module.scss';

export function WelcomeLogo() {
  return (
    <div className={css.layout}>
      <div className={css.wrapper}>
        <Logo />
        <Loader />
      </div>
    </div>
  );
}
