import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qcrwxyukbvxjkqrdrxze.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjcnd4eXVrYnZ4amtxcmRyeHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NDMyODgsImV4cCI6MjA0NzMxOTI4OH0.4z0VBK1sGtN5pJhJF7pqotTwq91FYTGbiGfcL1knzNc";

export const supabase = createClient(supabaseUrl, supabaseKey);
