import axios from 'axios';

export const inviteNewUser = async ({ email, from }) => {
  const { data } = await axios.post('/api/invitations', { email, from })
  return data
}
