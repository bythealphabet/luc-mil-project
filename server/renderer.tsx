import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../client/App';

export function render() {
  const head = '';
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  return { html, head };
}
