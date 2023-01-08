import { Main } from '@/components/Layout/Main';
import { SideBar } from '@/components/Layout/SideBar';
import * as React from 'react';

import { LayoutWrapper } from './Layout.style';

export type LayoutProps = {
  children: any
}

export const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
}: LayoutProps) => {
  return (
    <LayoutWrapper>
      <SideBar />
      <Main>{children}</Main>
    </LayoutWrapper>
  )
}
