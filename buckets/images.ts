import { client } from "../lib/supabase";

export const uploadImage = async (
  exerciseId: number,
  file: any,
) => {
  const filePath = `${exerciseId}/banner.png`;

  const { data, error } = await client
    .storage
    .from("images")
    .upload(
      filePath,
      file,
      {
        cacheControl: "3600",
        upsert: true,
        contentType: "image/png",
      },
    );

  if (error) throw new Error(error.message);

  return data;
};
