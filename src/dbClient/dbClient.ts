import { createClient } from "@supabase/supabase-js";
import { type Database } from "../generated/db.types";

export const dbClient = createClient<Database>(`https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co`, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);