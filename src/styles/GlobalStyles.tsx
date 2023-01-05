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

.nextui-c-BDLTQ-iceFDCK-css {
    width: 50%;
    height: auto;
    margin: 30% auto 0px;
    border: none!important;
    box-shadow: none;
}
.supabase-ui-auth_ui-divider {
  display: none;
}
`
