import { GlobalStyles } from '../styles/GlobalStyles';
import { css } from '@emotion/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="base-grid" css={styles()}>
        <nav css={css``}>
          <ul role="list" css={css``}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      <GlobalStyles />
      <main
        className="base-grid"
        css={css`
          grid-row: 2;
        `}
      >
        {children}
      </main>
      <footer
        css={css`
          grid-row: 3;
          grid-column: 1 / -1;
          background-color: blue;
        `}
      >
        Footer
      </footer>
    </>
  );
}

function styles() {
  return css`
    grid-row: 1;
    grid-column: 1 / -1;
    background-color: red;

    nav {
      display: flex;
      justify-content: center;
      align-items: center;
      grid-column: 2 / -2;
      grid-row: 1;
    }

    ul {
      display: flex;
      justify-content: flex-end;
      gap: 2.4rem;
      align-items: center;
      text-decoration: none;
    }
  `;
}
