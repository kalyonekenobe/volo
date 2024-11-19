import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

export const getImageSignedUrl = async (assetName: string): Promise<string | null> => {
  if (!assetName) {
    return null;
  }

  const { data, error } = await supabase.storage
    .from(import.meta.env.VITE_SUPABASE_BUCKET)
    .createSignedUrl(assetName, 7200);
  if (error) {
    return null;
  }

  return data.signedUrl;
};
