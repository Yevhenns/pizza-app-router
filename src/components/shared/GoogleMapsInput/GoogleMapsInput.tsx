import { HTMLProps, useEffect, useRef, useState } from 'react';

import { useMapsLibrary } from '@vis.gl/react-google-maps';

import css from './GoogleMapsInput.module.scss';

type PlaceAutocompleteProps = {
  label?: string;
  error?: string;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
} & HTMLProps<HTMLInputElement>;

export const GoogleMapsInput = ({
  label,
  error,
  onPlaceSelect,
  ...props
}: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
      componentRestrictions: { country: 'ua' },
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <fieldset className={css.fieldset}>
      <label htmlFor={props.htmlFor}>{label}</label>
      <input className={css.input} ref={inputRef} {...props} />
      <div>{error && <span>{error}</span>}</div>
    </fieldset>
  );
};
