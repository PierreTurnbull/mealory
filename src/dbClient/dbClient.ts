import { createClient } from "@supabase/supabase-js";

export const dbClient = createClient(`https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co`, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);