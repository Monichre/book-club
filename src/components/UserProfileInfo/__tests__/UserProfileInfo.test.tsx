import * as React from "react";

import { rtlRender, screen } from '@/test/test-utils';

import { UserProfileInfo } from '../UserProfileInfo';

test('should render', async () => {
  
  await rtlRender(
    <UserProfileInfo id="UserProfileInfo-default-test" />
  );

  expect(screen.queryById("UserProfileInfo-default-test")).toBeInTheDocument();
});
