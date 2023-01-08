import * as React from 'react';

import { MainWrapper } from './Main.style';

export type MainProps = {
  children: any
}

export const Main: React.FunctionComponent<MainProps> = ({
  children,
}: MainProps) => {
  return <MainWrapper>{children}</MainWrapper>
}
