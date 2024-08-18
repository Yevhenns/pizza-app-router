import { cn } from '../../../helpers/combineClasses';
import css from './Icon.module.scss';

type IconProps = {
  iconWidth: number | undefined;
  iconHeight: number | undefined;
  svg: TypeIcon | undefined;
  color?: 'main' | 'white' | 'accent';
};

export function Icon({
  iconWidth,
  iconHeight,
  svg,
  color = 'main',
  ...props
}: IconProps) {
  return (
    <svg
      className={cn(css.svg, css[color])}
      width={iconWidth}
      height={iconHeight}
      {...props}
    >
      <use href={`/sprite.svg#${svg}`} />
    </svg>
  );
}
