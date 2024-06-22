import css from './Footer.module.scss';
import { Icon } from '@/UI/basic/Icon';
import { Container } from '@/UI/common/Container';
import { FooterNavigation } from '../FooterNavigation';

export function Footer() {
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
          &copy; 2023 “Nostra pizza” LLC, м. Дніпро. Всі права захищено.
        </p>
      </Container>
    </footer>
  );
}
