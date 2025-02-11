import css from './AddressesLinks.module.scss';

export function AddressesLinks() {
  return (
    <address className={css.address}>
      <a
        href="https://maps.app.goo.gl/uXvE1tN8KBKD2eVKA"
        target="_blank"
        rel="noopener noreferrer"
      >
        м. Дніпро, пр. Богдана Хмельницького 118Д
      </a>
      <a
        href="https://maps.app.goo.gl/d2CBDEjWHvkmGzHM6"
        target="_blank"
        rel="noopener noreferrer"
      >
        м. Дніпро, Зоряний бульвар 1А
      </a>
      <a
        href="https://maps.app.goo.gl/28DNQbpdw6RoRt7s7"
        target="_blank"
        rel="noopener noreferrer"
      >
        м. Дніпро, вулиця Незалежності 36
      </a>
    </address>
  );
}
