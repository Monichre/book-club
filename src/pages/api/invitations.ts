import { supabaseAuthAdmin } from '@/lib/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body } = req

  const { email, from }: any = body

  const { data, error } = await supabaseAuthAdmin.inviteUserByEmail(email)

  // Get data from your database
  res.status(200).json(data)
}

export default handler
