import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
// import { supabaseAdmin } from '../src/integrations/supabase/supabaseAdmin.js';

dotenv.config();

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Service Role Key:', process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 6) + '...');

const { data: roleData } = await supabaseAdmin.rpc('my_current_user');
console.log('Database Role:', roleData);

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization');

  console.log('SERVICE_KEY present?', Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY));

  const { data: userInfo } = await supabaseAdmin.auth.getUser();
  console.log(userInfo);
  console.log('Current User Role:', userInfo.user?.role); // Should be "service_role"

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, first_name, last_name, role } = req.body;

  if (!email || !password || !first_name || role === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data: userData, error: userErr } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { first_name, last_name, role }
    });
    if (userErr) {
      console.error('Admin.createUser error:', userErr);
      return res.status(500).json({ error: userErr.message });
    }

    // Use nested property if available
    const userId = userData?.user?.id;
    if (!userId) {
      console.error('Missing user id in createUser result:', userData);
      return res.status(500).json({ error: 'Failed to retrieve user id' });
    }

    const { error: profErr } = await supabaseAdmin
      .from('profiles')
      .insert({ id: userId, first_name, last_name });
    
    if (profErr) {
      console.error('Insert profile error:', profErr);
      return res.status(500).json({ error: profErr.message });
    }

    return res.status(200).json(userData);
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Signup failed' });
  }
}