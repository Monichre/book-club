import { SIDEBAR_WIDTH } from '@/components/Layout/SideBar/SideBar.style';
import styled from 'styled-components';

export const MainWrapper: any = styled.div`
  width: calc(100% - ${SIDEBAR_WIDTH});
  height: 100vh;
  overflow: scroll;
  padding: 16px;
`
