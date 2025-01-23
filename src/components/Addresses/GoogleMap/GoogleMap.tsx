'use client';

import { markers } from '@/assets/addresses';
import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';

import css from './GoogleMap.module.scss';

export function GoogleMap() {
  const defaultProps = {
    lat: 48.4211840588917,
    lng: 35.00988524052585,
    zoom: 12,
  };

  return (
    <div className={css.wrapper}>
      <Map
        mapId={'1'}
        defaultCenter={{ lat: defaultProps.lat, lng: defaultProps.lng }}
        defaultZoom={12}
        gestureHandling={'cooperative'}
        disableDefaultUI={false}
      >
        {markers.map(({ id, lat, lng }) => {
          return <AdvancedMarker key={id} position={{ lat, lng }} />;
        })}
      </Map>
    </div>
  );
}
