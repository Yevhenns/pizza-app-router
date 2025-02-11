import { useCallback, useEffect, useState } from 'react';

import { markers } from '@/assets/addresses';
import {
  AdvancedMarker,
  AdvancedMarkerProps,
  InfoWindow,
  Map,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

import css from './GoogleMap.module.scss';

export function GoogleMap() {
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<
    (typeof markers)[0] | null
  >(null);

  const defaultProps = {
    lat: 48.4211840588917,
    lng: 35.00988524052585,
    zoom: 12,
  };

  const handleInfowindowCloseClick = useCallback(
    () => setInfoWindowShown(false),
    []
  );

  const onMarkerClick = useCallback(
    (id: string | null, marker?: google.maps.marker.AdvancedMarkerElement) => {
      setSelectedId(id);

      if (marker) {
        setSelectedMarker(marker);
      }

      if (id !== selectedId) {
        setInfoWindowShown(true);
      } else {
        setInfoWindowShown(isShown => !isShown);
      }
    },
    [selectedId]
  );

  useEffect(() => {
    if (markers && selectedId) {
      const address = markers.find(item => item.id === selectedId) || null;
      setSelectedPlace(address);
    }
  }, [selectedId]);

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
          return (
            <AdvancedMarkerWithRef
              key={id}
              position={{
                lat: lat,
                lng: +lng,
              }}
              clickable={true}
              onMarkerClick={(
                marker: google.maps.marker.AdvancedMarkerElement
              ) => onMarkerClick(id, marker)}
            />
          );
        })}
        {infoWindowShown && selectedPlace && (
          <InfoWindow
            anchor={selectedMarker}
            onCloseClick={handleInfowindowCloseClick}
            headerContent={<h3>{selectedPlace.title}</h3>}
          >
            <ul className={css.list}>
              <li>
                <p>{selectedPlace.description}</p>
              </li>
            </ul>
            <a
              href={`https://www.google.com/maps?q=${selectedPlace.lat},${selectedPlace.lng}`}
              target="_blank"
              rel="noreferrer"
              className={css.link}
            >
              <span>Переглянути на Картах Google</span>
            </a>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
}

const AdvancedMarkerWithRef = (
  props: AdvancedMarkerProps & {
    onMarkerClick: (marker: google.maps.marker.AdvancedMarkerElement) => void;
  }
) => {
  const { children, onMarkerClick, ...advancedMarkerProps } = props;
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      onClick={() => {
        if (marker) {
          onMarkerClick(marker);
        }
      }}
      ref={markerRef}
      {...advancedMarkerProps}
    >
      {children}
    </AdvancedMarker>
  );
};
