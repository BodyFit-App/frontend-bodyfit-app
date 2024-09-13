import { decode } from "base64-arraybuffer";
import { client } from "../lib/supabase";
import * as FileSystem from "expo-file-system";
import { slugify } from "../lib/helpers";

export const uploadImage = async (
  uri: string,
  title: string,
) => {
  const { data: session, error: sessionError } = await client.auth.getSession();

  if (sessionError) throw new Error(sessionError.message);
  const user = session?.session?.user;

  const path = `${user!.id}/exercises/${slugify(title)}.png`;

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
