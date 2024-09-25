import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Creates a Supabase client instance using the provided Supabase URL and anonymous key.
 * Configures authentication to use AsyncStorage for session persistence in a React Native environment.
 * 
 * @see {@link https://supabase.com/docs/reference/javascript/overview} for more information on Supabase client configuration.
 */

export const client = createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

/**
 * Generates a public URL for accessing a file stored in a Supabase bucket.
 *
 * @param {string} from - The bucket name in which the file is stored.
 * @param {string} file - The file path within the bucket.
 * @returns {string} - The public URL for the specified file.
 *
 * @example
 * // Returns a public URL to access 'avatar.png' in the 'images' bucket
 * const url = getPublicUrl('images', 'avatar.png');
 */

export const getPublicUrl = (from: string, file: string) => {
  const { data } = client.storage.from(from).getPublicUrl(file);
  return data.publicUrl;
};
