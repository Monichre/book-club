import 'rc-time-picker/assets/index.css';

import { FriendsList } from '@/components/FriendsList';
import { UserBookClubs } from '@/components/UserBookClubs';
import UserContext from '@/features/auth/UserContext';
import { fetchUser } from '@/lib/Store';
import { ProfileSideBarMenu } from '@/pages/profile/Profile.style';
import { Grid } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FunctionComponent, useContext, useEffect } from 'react';

interface BookSearchResultsProps {}

export const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const { currentUser, updateCurrentUser } = useContext(UserContext)
  const {
    query: { id },
  } = useRouter()

  useEffect(() => {
    if (id) {
      fetchUser({ userId: id }).then((res) => {
        console.log('res: ', res)
        updateCurrentUser(res)
      })
    }
  }, [id])
  // useEffect(() => {
  //   if (!currentUser) {
  //     router.push(`/`)
  //   }
  // }, [currentUser])

  return (
    <Grid.Container gap={2} justify='space-evenly'>
      <Grid xs={2}>
        <ProfileSideBarMenu>
          <li>Edit</li>
        </ProfileSideBarMenu>
      </Grid>
      <Grid xs={8}>
        {currentUser && <UserBookClubs bookClubs={currentUser?.book_clubs} />}
      </Grid>
      <Grid xs={2}>{currentUser && <FriendsList />}</Grid>
    </Grid.Container>
  )
}

export default Profile
