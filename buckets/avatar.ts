import { client } from "../lib/supabase";

export const uploadAvatar = async (
  file: any,
) => {
  const { data: session, error: sessionError } = await client.auth.getSession();

  if (sessionError) throw new Error(sessionError.message);
  const user = session?.session?.user;

  const filePath = `${user!.id}/avatar.png`;

  const { data: dataBucket, error: errorBucket } = await client
    .storage
    .from("avatars")
    .upload(
      filePath,
      file,
      {
        cacheControl: "3600",
        upsert: true,
        contentType: "image/png",
      },
    );

  if (errorBucket) throw new Error(errorBucket.message);

  console.log(dataBucket);

  const { data: dataProfile, error: errorProfile } = await client.from(
    "profiles",
  ).update({
    avatar_url: dataBucket.fullPath,
  }).eq("user_id", user!.id);

  if (errorProfile) throw new Error(errorProfile.message);

  return dataProfile;
};
