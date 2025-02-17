'use client';

import css from './Addresses.module.scss';
import { AddressesLinks } from './AddressesLinks/AddressesLinks';
import { GoogleMap } from './GoogleMap/GoogleMap';

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
