import { createClient } from '@supabase/supabase-client';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials missing. Please check .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearSections() {
  console.log('Clearing all sections from site_sections...');
  const { error } = await supabase
    .from('site_sections')
    .delete()
    .neq('id', 0); // Delete everything

  if (error) {
    console.error('Error clearing sections:', error.message);
  } else {
    console.log('✅ All sections cleared successfully!');
  }
}

clearSections();
