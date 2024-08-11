import { GoogleMap } from './GoogleMap';
import { Section } from '@/UI/common/Section';
import { Container } from '@/UI/common/Container';
import css from './Addresses.module.scss';

export function Addresses() {
  return (
    <Section>
      <Container>
        <div className={css.wrapper}>
          <address>
            <p>Наші адреси:</p>
            <p>м. Дніпро, пр. Богдана Хмельницького 118Д</p>
            <p>м. Дніпро, Зоряний бульвар 1А</p>
            <p>м. Дніпро, вулиця Титова 36</p>
          </address>
          <GoogleMap />
        </div>
      </Container>
    </Section>
  );
}
