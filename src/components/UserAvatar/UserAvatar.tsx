import { User } from '@nextui-org/react';
import * as React from 'react';

export type UserAvatarProps = {
  name: string
  avatar_url?: string
}

export const UserAvatar: React.FunctionComponent<UserAvatarProps> = ({
  name,
  email,
  avatar_url,
}: UserAvatarProps) => {
  return <User src={avatar_url} name={name || email} />
}
