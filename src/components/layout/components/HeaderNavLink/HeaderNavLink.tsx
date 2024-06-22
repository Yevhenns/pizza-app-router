import Link from 'next/link';
import css from './HeaderNavLink.module.scss';
import Icon from '@/UI/basic/Icon/Icon';

interface HeaderNavLinkProps {
  hrefProp: string;
  text: string | number;
  svg: TypeIcon;
}
export function HeaderNavLink({ hrefProp, text, svg }: HeaderNavLinkProps) {
  return (
    <Link className={css.navLink} href={hrefProp}>
      <Icon svg={svg} iconWidth={34} iconHeight={34} />
      <p>{text}</p>
    </Link>
  );
}
