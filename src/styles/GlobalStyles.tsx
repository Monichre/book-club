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
/* input {
    background:transparent!important;
    inset: 0;
    border: none;
    box-shadow: 0 0 0 rgba(255, 255, 255, 0.15)!important;
    
  } */

  /* .nextui-grid-item {
    span.rc-time-picker.xxx {
  box-shadow: 0 0 0 rgba(255, 255, 255, 0.5)!important;
  background:transparent!important;
  border: none;
  inset: 0;
    align-items: center;
    
    
    background: transparent;
    border: none;
    
    border-radius: 8px;
    outline: none;
    width: 270px;
    height: 40px;
    min-width: 0px;
    }
  } */

/* .rc-time-picker-panel, .rc-time-picker-panel-inner, .rc-time-picker-panel-input, span.rc-time-picker.xxx {
  box-shadow: 0 0 0 rgba(255, 255, 255, 0.5)!important;
  background:transparent!important;
  border: none;
  inset: 0;
    align-items: center;
    
    
    background: transparent;
    border: none;
    
    border-radius: 8px;
    outline: none;
    width: 270px;
    height: 40px;
    min-width: 0px;
    


  input {
    border: none;
    background:transparent!important;
    inset: 0;
    /* box-shadow: 0 0 0 rgba(255, 255, 255, 0.15)!important; */
  

.rc-time-picker-panel-input {
  background:transparent!important;
  box-shadow: 0 0 0 rgba(255, 255, 255, 0.15)!important;
}
.rc-time-picker-panel-select {
  ul {
    * {
  background:transparent!important;
  }
    background:transparent!important;
    li {
      color: #000;
      * {
  background:transparent!important;
  }
    }
  }
}

/* 
/* Profile */
.rectangle-div18 {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: var(--br-lg);
  background-color: var(--color-gray-1300);
  width: 280px;
  height: 631px;
}
.group-icon6 {
  position: absolute;
  top: 25px;
  left: 85px;
  width: 109px;
  height: 109px;
}
.james-kilan {
  position: absolute;
  top: 143px;
  left: 68px;
  font-size: var(--font-size-7xl);
  font-weight: 500;
  color: var(--white);
  display: inline-block;
}
.rectangle-div19 {
  position: absolute;
  top: 271px;
  left: 15px;
  border-radius: var(--br-xs);
  background-color: var(--color-gray-1400);
  width: 250px;
  height: 50px;
}
.product-designer {
  position: absolute;
  top: 178px;
  left: 73px;
  font-size: var(--size-14-size-14-medium1-size);
  display: inline-block;
}
.user1-1-icon {
  position: absolute;
  height: 92.31%;
  width: 18.9%;
  top: 0;
  right: 81.1%;
  bottom: 7.69%;
  left: 0;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}
.my-profile1 {
  position: absolute;
  top: 3px;
  left: 44px;
  font-weight: 500;
  display: inline-block;
}
.group-div15 {
  position: absolute;
  height: 4.12%;
  width: 45.36%;
  top: 44.85%;
  right: 43.93%;
  bottom: 51.03%;
  left: 10.71%;
}
.notification-bing-1-icon {
  position: absolute;
  height: 92.31%;
  width: 17.39%;
  top: 0;
  right: 82.61%;
  bottom: 7.69%;
  left: 0;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}
.notification {
  position: absolute;
  top: 3px;
  left: 44px;
  display: inline-block;
}
.group-div16 {
  position: absolute;
  height: 4.12%;
  width: 49.29%;
  top: 54.36%;
  right: 40%;
  bottom: 41.52%;
  left: 10.71%;
}
.code-circle9-1-icon {
  position: absolute;
  height: 92.31%;
  width: 21.24%;
  top: 0;
  right: 78.76%;
  bottom: 7.69%;
  left: 0;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}
.api-keys {
  position: absolute;
  top: 3px;
  left: 43px;
  display: inline-block;
}
.group-div17 {
  position: absolute;
  height: 4.12%;
  width: 40.36%;
  top: 61.65%;
  right: 48.57%;
  bottom: 34.23%;
  left: 11.07%;
}
.group-div14 {
  position: absolute;
  top: 221px;
  left: 329px;
  width: 280px;
  height: 631px;
  text-align: left;
  font-size: var(--font-size-2xl);
  color: var(--color-gray-500);
  font-family: var(--font-gordita);
}
.personal-information1 {
  position: relative;
  line-height: 30px;
  font-weight: 500;
  display: inline-block;
}
.frame-div29 {
  width: 398px;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.iconedit {
  position: relative;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  overflow: hidden;
}
.frame-div30 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.edit1 {
  position: relative;
  line-height: 30px;
  font-weight: 500;
  display: inline-block;
  width: 41px;
  height: 26px;
  flex-shrink: 0;
}
.frame-div31 {
  justify-content: flex-end;
}
.edit,
.frame-div31,
.personal-information {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.edit {
  width: 196px;
  flex-shrink: 0;
  justify-content: flex-end;
  gap: var(--gap-sm);
  text-align: right;
  font-size: var(--font-size-6xl);
  color: var(--secondary-color-secondary-201);
}
.personal-information {
  width: 690px;
  justify-content: space-between;
}
.first-name {
  position: relative;
  line-height: 22px;
  display: inline-block;
}
.frame-div32 {
  align-self: stretch;
  display: flex;
  flex-direction: row;
  padding: var(--padding-3xs) var(--padding-3xs) var(--padding-3xs) 0;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: flex-start;
}
.james {
  position: relative;
  line-height: 22px;
  font-weight: 500;
  display: inline-block;
}
.frame-div33 {
  align-self: stretch;
  border-radius: var(--br-sm);
  border: 1px solid var(--color-gray-1000);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  padding: var(--padding-lg) var(--padding-4xl);
  align-items: center;
  justify-content: flex-start;
  color: var(--white);
}
.input3 {
  width: 330px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: var(--gap-0);
}
.fastlast-name,
.frame-div37 {
  display: flex;
  flex-direction: row;
}
.fastlast-name {
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-6xl);
}
.frame-div37 {
  align-self: stretch;
  border-radius: var(--br-sm);
  border: 1px solid var(--color-gray-1000);
  box-sizing: border-box;
  padding: var(--padding-sm) var(--padding-4xl);
  align-items: center;
  justify-content: space-between;
  color: var(--white);
}
.input5 {
  width: 330px;
  flex-shrink: 0;
  gap: var(--gap-0);
}
.info,
.input5,
.personal-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.info {
  gap: var(--gap-2xl);
  font-size: var(--size-14-size-14-medium1-size);
  color: var(--color-gray-500);
}
.personal-info {
  gap: var(--gap-sm);
}
.frame-div41,
.frame-div42 {
  flex-direction: row;
  align-items: center;
}
.frame-div42 {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  gap: var(--gap-2xl);
}
.frame-div41 {
  align-self: stretch;
  border-radius: var(--br-sm);
  border: 1px solid var(--color-gray-1000);
  box-sizing: border-box;
  padding: var(--padding-sm) var(--padding-4xl);
  color: var(--white);
  font-family: var(--size-14-size-14-medium1);
}
.frame-div41,
.frame-div44,
.input7 {
  display: flex;
  justify-content: flex-start;
}
.input7 {
  width: 690px;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-0);
}
.frame-div44 {
  align-self: stretch;
  border-radius: var(--br-sm);
  border: 1px solid var(--color-gray-1000);
  box-sizing: border-box;
  flex-direction: row;
  padding: var(--padding-sm) var(--padding-4xl);
  align-items: center;
  gap: var(--gap-4xl);
  color: var(--white);
  font-family: var(--size-14-size-14-medium1);
}
.emailpassword {
  gap: var(--gap-2xl);
}
.credentials,
.emailpassword,
.personalcredentials-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.credentials {
  width: 690px;
  font-size: var(--size-14-size-14-medium1-size);
  color: var(--color-gray-500);
}
.personalcredentials-info {
  /* position: absolute; */
  top: 341px;
  left: 674px;
  gap: var(--gap-2xl);
  text-align: left;
  font-size: var(--font-size-5xl);
  color: var(--white);
  font-family: var(--font-gordita);
}
.rectangle-div17 {
  position: absolute;
  top: 221px;
  left: 639px;
  border-radius: var(--br-lg);
  background-color: var(--color-gray-1300);
  width: 761px;
  height: 631px;
} */
`
