import { Container } from '@/components/shared/Container/Container';
import { Icon } from '@/components/shared/Icon/Icon';

import css from './Footer.module.scss';
import { FooterNavigation } from './FooterNavigation/FooterNavigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <Container>
        <FooterNavigation />
        <div className={css.contactsWrapper}>
          <div className={css.socialSet}>
            <a
              className={css.socialLink}
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="facebook"
            >
              <Icon svg="facebook" iconWidth={30} iconHeight={30} />
            </a>
            <a
              className={css.socialLink}
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="instagram"
            >
              <Icon svg="instagram" iconWidth={30} iconHeight={30} />
            </a>
          </div>
        </div>
        <p className={css.copyright}>
          &copy; {currentYear} “Nostra pizza” LLC, м. Дніпро. Всі права
          захищено.
        </p>
      </Container>
    </footer>
  );
}
