// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qvagggrnwcwzxollyurx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2YWdnZ3Jud2N3enhvbGx5dXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzNzMxMTAsImV4cCI6MjA0MDk0OTExMH0.UZoVuxjO6yK7A2aTgq3BQ3uE0NPOl2VSKLIkqc7eWxI';

export const supabase = createClient(supabaseUrl, supabaseKey);
