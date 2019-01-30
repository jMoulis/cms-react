import { css } from '@emotion/core';

export default css`
  @import url('https://fonts.googleapis.com/css?family=Roboto:500,700');
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
  html {
    font-size: 62.5%;
  }
  body {
    box-sizing: border-box;
    font-size: 1.5rem;
    height: inherit;
    font-family: 'Roboto', 'Arial', sans-serif;
  }
  #root {
    height: inherit;
  }
`;
