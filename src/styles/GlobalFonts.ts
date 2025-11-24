import { createGlobalStyle } from 'styled-components';

import SpoqaHanSansNeoBold from '../fonts/SpoqaHanSansNeo-Bold.woff';
import SpoqaHanSansNeoMedium from '../fonts/SpoqaHanSansNeo-Medium.woff';
import SpoqaHanSansNeoRegular from '../fonts/SpoqaHanSansNeo-Regular.woff';
import SpoqaHanSansNeoLight from '../fonts/SpoqaHanSansNeo-Light.woff';
import SpoqaHanSansNeoThin from '../fonts/SpoqaHanSansNeo-Thin.woff';

const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: SpoqaHanSansNeo;
    font-weight: 700;
    src: url(${SpoqaHanSansNeoBold}) format('woff');
  }

  @font-face {
    font-family: SpoqaHanSansNeo;
    font-weight: 500;
    src: url(${SpoqaHanSansNeoMedium}) format('woff');
  }

  @font-face {
    font-family: SpoqaHanSansNeo;
    font-weight: 400;
    src: url(${SpoqaHanSansNeoRegular}) format('woff');
  }

  @font-face {
    font-family: SpoqaHanSansNeo;
    font-weight: 300;
    src: url(${SpoqaHanSansNeoLight}) format('woff');
  }

  @font-face {
    font-family: SpoqaHanSansNeo;
    font-weight: 100;
    src: url(${SpoqaHanSansNeoThin}) format('woff');
  }
`;

export default GlobalFonts;
