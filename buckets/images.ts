import { decode } from "base64-arraybuffer";
import { client } from "../lib/supabase";
import * as FileSystem from "expo-file-system";

export const uploadImage = async (
  uri: string,
  path: string,
) => {
  const file = await FileSystem.readAsStringAsync(uri, {
    encoding: "base64",
  });

  const { data, error } = await client
    .storage
    .from("images")
    .upload(
      path,
      decode(file),
      {
        cacheControl: "3600",
        upsert: true,
        contentType: "image/png",
      },
    );

  if (error) throw new Error(error.message);

  return data;
};
