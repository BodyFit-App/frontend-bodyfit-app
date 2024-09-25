import { decode } from "base64-arraybuffer";
import { client } from "../lib/supabase";
import * as FileSystem from "expo-file-system";

/**
 * Uploads an image to a Supabase storage bucket.
 *
 * @param {string} uri - The local file URI of the image to upload.
 * @param {string} path - The path in the Supabase storage where the image should be uploaded.
 * @returns {Promise<object>} - Returns the metadata of the uploaded file if successful.
 * @throws {Error} - Throws an error if the upload fails.
 *
 * @example
 * const fileUri = "file://path/to/image.png";
 * const uploadPath = "uploads/my-image.png";
 * 
 * uploadImage(fileUri, uploadPath)
 *   .then(data => console.log("Image uploaded:", data))
 *   .catch(err => console.error("Upload failed:", err));
 */

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
