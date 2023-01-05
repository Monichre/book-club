import { BookClubSchedule, NewBookClubData } from '@/pages/profile/[id]';
import { snakeCaseObjectFields } from '@/utils/functions';
import { createClient } from '@supabase/supabase-js';
import { SetStateAction, useEffect, useState } from 'react';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_KEY || ''
)

/**
 * @param {number} channelId the currently selected Channel
 */
export const useStore = (props: { channelId: any }) => {
  const [channels, setChannels] = useState([])
  const [messages, setMessages] = useState([])

  const [users] = useState(new Map())
  const [newMessage, handleNewMessage] = useState(null)

  const [newChannel, handleNewChannel] = useState(null)
  const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState(null)
  const [deletedChannel, handleDeletedChannel] = useState(null)
  const [deletedMessage, handleDeletedMessage] = useState(null)

  // Load initial data and set up listeners
  useEffect(() => {
    // Get Channels
    // fetchChannels(setChannels)
    // Listen for new and deleted messages
    const messageListener = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => handleNewMessage(payload.new)
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'messages' },
        (payload) => handleDeletedMessage(payload.old)
      )
      .subscribe()
    // Listen for changes to our users
    const userListener = supabase
      .channel('public:users')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'users' },
        (payload) => handleNewOrUpdatedUser(payload.new)
      )
      .subscribe()
    // Listen for new and deleted channels
    const channelListener = supabase
      .channel('public:channels')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'channels' },
        (payload) => handleNewChannel(payload.new)
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'channels' },
        (payload) => handleDeletedChannel(payload.old)
      )
      .subscribe()
    // Cleanup on unmount
    return () => {
      supabase.removeChannel('public:messages')
      supabase.removeChannel('public:users')
      supabase.removeChannel('public:channels')
    }
  }, [])

  // Update when the route changes
  useEffect(() => {
    if (props?.channelId > 0) {
      fetchMessages(
        props.channelId,
        (messages: any[] | ((prevState: never[]) => never[])) => {
          messages.forEach((x: { user_id: any; author: any }) =>
            users.set(x.user_id, x.author)
          )
          setMessages(messages)
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.channelId])

  // New message received from Postgres
  useEffect(() => {
    if (newMessage && newMessage.channel_id === Number(props.channelId)) {
      const handleAsync = async () => {
        let authorId = newMessage.user_id
        if (!users.get(authorId))
          await fetchUser(authorId, (user: SetStateAction<null>) =>
            handleNewOrUpdatedUser(user)
          )
        setMessages(messages.concat(newMessage))
      }
      handleAsync()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage])

  // Deleted message received from postgres
  useEffect(() => {
    if (deletedMessage)
      setMessages(
        messages.filter((message) => message.id !== deletedMessage.id)
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedMessage])

  // New channel received from Postgres
  useEffect(() => {
    if (newChannel) setChannels(channels.concat(newChannel))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newChannel])

  // Deleted channel received from postgres
  useEffect(() => {
    if (deletedChannel)
      setChannels(
        channels.filter((channel) => channel.id !== deletedChannel.id)
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedChannel])

  // New or updated user received from Postgres
  useEffect(() => {
    if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newOrUpdatedUser])

  return {
    // We can export computed values here to map the authors to each message
    messages: messages.map((x) => ({ ...x, author: users.get(x.user_id) })),
    channels:
      channels !== null
        ? channels.sort((a, b) => a.slug.localeCompare(b.slug))
        : [],
    users,
  }
}

/**
 * Fetch all channels
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchChannels = async (setState: {
  (value: SetStateAction<never[]>): void
  (arg0: any[] | null): void
}) => {
  try {
    let { data } = await supabase.from('book_club_channels').select('*')
    if (setState) setState(data)
    return data
  } catch (error) {
    console.log('error', error)
  }
}

/**
 * Fetch a single user
 * @param {number} userId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchUsersBookClubs = async (userId: any) => {
  try {
    let { data: bookClubs } = await supabase
      .from('book_club_users')
      .select(`*`)
      .eq('id', userId)
    console.log('bookClubs: ', bookClubs)

    return { bookClubs }
  } catch (error) {
    console.log('error', error)
  }
}

export const fetchUsersFriends = async (userId) => {
  let { data: friends } = await supabase
    .from('friends')
    .select(
      `*
   
    `
    )
    .or(`invitee_id.eq.${userId},invitor_id.eq.${userId}`)
  return { friends }
}

export const fetchUser = async ({
  userId = null,
  email = null,
  search = true,
}: any) => {
  console.log('email: ', email)
  const column = userId ? 'id' : 'email'
  const value = userId ? userId : email
  const select = search ? `*,book_clubs(*)` : `*`
  let { data } = await supabase.from('users').select(select).eq(column, value)
  console.log('data: ', data)
  const [user] = data || [null]
  console.log('user: ', user)

  return user
}
export const searchUsers = async (args) => {
  console.log('args: ', args)
  let { data } = await supabase
    .from('users')
    .select('*')
    .or(`name.eq.${args},email.eq.${args}`)

  console.log('data: ', data)

  return data
}

export const fetchUsers = async () => {
  let { data: users } = await supabase.from('users').select(
    `*
    `
  )
  console.log('users: ', users)

  return users
}

/**
 * Fetch all roles for the current user
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchUserRoles = async (
  setState: (arg0: any[] | null) => void
) => {
  try {
    let { data } = await supabase.from('user_roles').select(`*`)
    console.log('data: ', data)
    if (setState) setState(data)
    return data
  } catch (error) {
    console.log('error', error)
  }
}

/**
 * Fetch all messages and their authors
 * @param {number} channelId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchMessages = async (
  channelId: any,
  setState: { (messages: any): void; (arg0: any[] | null): void }
) => {
  try {
    let { data } = await supabase
      .from('messages')
      .select(`*, author:user_id(*)`)
      .eq('channel_id', channelId)
      .order('inserted_at', true)
    if (setState) setState(data)
    return data
  } catch (error) {
    console.log('error', error)
  }
}

/**
 * Insert a new channel into the DB
 * @param {string} slug The channel name
 * @param {number} user_id The channel creator
 */
export const addChannel = async (slug: any, user_id: any) => {
  try {
    let { data } = await supabase
      .from('channels')
      .insert([{ slug, created_by: user_id }])
      .select()
    return data
  } catch (error) {
    console.log('error', error)
  }
}

/**
 * Insert a new message into the DB
 * @param {string} message The message text
 * @param {number} channel_id
 * @param {number} user_id The author
 */
export const addMessage = async (
  message: any,
  channel_id: any,
  user_id: any
) => {
  try {
    let { data } = await supabase
      .from('messages')
      .insert([{ message, channel_id, user_id }])
      .select()
    return data
  } catch (error) {
    console.log('error', error)
  }
}

/**
 * Delete a channel from the DB
 * @param {number} channel_id
 */
export const deleteChannel = async (channel_id: any) => {
  try {
    let { data } = await supabase
      .from('channels')
      .delete()
      .match({ id: channel_id })
    return data
  } catch (error) {
    console.log('error', error)
  }
}

/**
 * Delete a message from the DB
 * @param {number} message_id
 */
export const deleteMessage = async (message_id: any) => {
  try {
    let { data } = await supabase
      .from('messages')
      .delete()
      .match({ id: message_id })
    return data
  } catch (error) {
    console.log('error', error)
  }
}

/**
 * Insert a new channel into the DB
 * @param {string} slug The channel name
 * @param {number} user_id The channel creator
 */
type BookClubChannelPayload = {
  name: string
  ownerId: string
  bookClubId: string
}

const createBookClubChannel = async (channel: BookClubChannelPayload) => {
  let { data } = await supabase
    .from('book_club_channels')
    .insert([
      {
        ...snakeCaseObjectFields(channel),
      },
    ])
    .select()
  console.log('data: ', data)
  return data
}

const createBookClubCurriculum = async (schedule: BookClubSchedule) => {
  let { data } = await supabase
    .from('book_club_schedule')
    .insert([
      {
        ...snakeCaseObjectFields(schedule),
      },
    ])
    .select()
  console.log('data: ', data)
  return data
}

export const createBookClub = async ({
  schedule,
  club,
}: {
  schedule: BookClubSchedule
  club: NewBookClubData
}) => {
  const payload = snakeCaseObjectFields(club)
  const { ownerId } = club
  try {
    let { data } = await supabase
      .from('book_clubs')
      .insert([
        {
          ...payload,
        },
      ])
      .select()

    const bookClub = data[0]
    const { name, id: bookClubId } = bookClub
    const channel = await createBookClubChannel({ ownerId, name, bookClubId })
    console.log('channel: ', channel)
    const bookClubSchedule = await createBookClubCurriculum(schedule)
    console.log('bookClubSchedule: ', bookClubSchedule)

    return {
      bookClub,
      channel,
      bookClubSchedule,
    }
  } catch (error) {
    console.log('error', error)
  }
}

export const sendFriendRequest = async ({ requestorId, inviteeId }) => {
  console.log('inviteeId: ', inviteeId)
  console.log('requestorId: ', requestorId)
  const args = snakeCaseObjectFields({ requestorId, inviteeId })
  console.log('args: ', args)
  let { data: friendRequest } = await supabase.from('friend_requests').insert([
    {
      ...snakeCaseObjectFields({ requestorId, inviteeId }),
    },
  ]).select(`*, 
  from: requestor_id(*),
  to: invitee_id(*)
  `)

  console.log('friendRequest: ', friendRequest)
  return friendRequest
}

export const sendJoinAppInvitation = async (invitation: any) => {
  let { data } = await supabase
    .from('app_invitations')
    .insert([
      {
        ...snakeCaseObjectFields(invitation),
      },
    ])
    .select()
  console.log('data: ', data)
  return data
}

export const sendBookClubJoinRequest = async (joinRequest: any) => {
  let { data } = await supabase
    .from('book_club_join_requests')
    .insert([
      {
        ...snakeCaseObjectFields(joinRequest),
      },
    ])
    .select()
  console.log('data: ', data)
  return data
}
