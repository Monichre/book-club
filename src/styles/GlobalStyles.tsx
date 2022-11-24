import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
#auth-sign-in, .footer {
  display: none;
}
.auth-container {
  height: min-content!important;
  display: flex;
  flex-direction: row!important;
  justify-content: center;
  .auth-button {
    
    margin: 0 24px;
  }
}
`
