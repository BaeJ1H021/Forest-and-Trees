import { RouterProvider } from 'react-router-dom';
import { GlobalFonts, GlobalStyles } from './styles';
import { router } from './router';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GlobalFonts />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
