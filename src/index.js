import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { ThemeProvider } from 'styled-components';
import App from './components/App';
import GlobalStyles from './assets/styles/global';
import defaultTheme from './assets/styles/themes/default';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyles />
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>,
);
