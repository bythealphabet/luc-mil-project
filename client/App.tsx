import Layout from './layouts/layout';
import { css } from '@emotion/react';

function App() {
  return (
    <Layout>
      <h1
        css={css`
          font-size: 4rem;
          color: blue;
          margin-top: 2.4rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          grid-column: 2 / -2;
        `}
      >
        <span
          css={css`
            color: red;
          `}
        >
          MERN Stack using bundled with Vite,
        </span>
        <span> and also using Emotionjs, and TypeScript</span>
      </h1>
    </Layout>
  );
}

export default App;
