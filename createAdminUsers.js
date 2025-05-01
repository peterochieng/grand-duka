// Make sure to set SUPABASE_URL and SUPABASE_SERVICE_KEY in your environment

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the admin client using your service key
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log(supabaseUrl);
console.log(supabaseServiceKey);

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser(email, password, role) {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    user_metadata: { user_type: role },
  });

  if (error) {
    console.error(`Error creating ${role}:`, error);
  } else {
    console.log(`${role} created:`, data);
  }
}

async function createMissingAdminUsers() {
  // Create Super Admin
  await createAdminUser('xehivo8856@idoidraw.com', 'SuperAdmin123!', 'super-admin');

  // Create Support Admin
//   await createAdminUser('mikilip467@javbing.com', 'SupportAdmin123!', 'support-admin');

  // Create Developer
//   await createAdminUser('pofibi2680@idoidraw.com', 'Developer123!', 'developer');
}

createMissingAdminUsers();