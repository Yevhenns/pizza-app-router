'use client';

import css from './Addresses.module.scss';
import { AddressesLinks } from './AddressesLinks';
import { GoogleMap } from './GoogleMap';

export function Addresses() {
  return (
    <>
      <h2 className={'sectionTitle'}>Наші адреси</h2>
      <div className={css.wrapper}>
        <AddressesLinks />
        <GoogleMap />
      </div>
    </>
  );
}
