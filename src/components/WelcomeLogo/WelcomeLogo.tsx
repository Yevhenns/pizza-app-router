import { Loader } from '../shared/Loader/Loader';
import { Logo } from '../shared/Logo/Logo';
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
