'use client';

import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';

import css from './GoogleMap.module.scss';

export function GoogleMap() {
  const defaultProps = {
    lat: 48.4211840588917,
    lng: 35.00988524052585,
    zoom: 12,
  };

  const markers = [
    { id: '1', lat: 48.407641691999906, lng: 35.00017456670064 },
    { id: '2', lat: 48.42555310026097, lng: 35.022020774202005 },
    { id: '3', lat: 48.43342155185263, lng: 35.00226293664556 },
  ];

  return (
    <div className={css.wrapper}>
      <Map
        mapId={'1'}
        defaultCenter={{ lat: defaultProps.lat, lng: defaultProps.lng }}
        defaultZoom={12}
        gestureHandling={'greedy'}
        disableDefaultUI={false}
      >
        {markers.map(({ id, lat, lng }) => {
          return <AdvancedMarker key={id} position={{ lat, lng }} />;
        })}
      </Map>
    </div>
  );
}
