'use client';
import Image from 'next/image';
import css from './ProductDescription.module.scss';

interface ProductDescriptionProps {
  photo: string;
  title: string;
  description: string;
  dimension: string;
}

export function ProductDescription({
  photo,
  title,
  description,
  dimension,
}: ProductDescriptionProps) {
  return (
    <div className={css.descriprionWrapper}>
      <Image
        src={photo}
        alt="item photo"
        width={200}
        height={200}
        priority={true}
      />
      <hgroup className={css.info}>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{dimension}</p>
      </hgroup>
    </div>
  );
}
