// lib/supabaseAdmin.ts
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js'
dotenv.config();

const SUPABASE_URL          = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE =  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  throw new Error(
    '[supabaseAdmin] Missing environment variables SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'
  )
}

export const supabaseAdmin = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE
)
