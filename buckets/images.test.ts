import { uploadImage } from "./images";
import * as FileSystem from "expo-file-system";
import { client } from "../lib/supabase";
import { decode } from "base64-arraybuffer";

jest.mock("expo-file-system");
jest.mock("base64-arraybuffer");
jest.mock("../lib/supabase", () => ({
  client: {
    storage: {
      from: jest.fn().mockReturnThis(),
      upload: jest.fn(),
    },
  },
}));

describe("uploadImage", () => {
  const mockUri = "mock-uri";
  const mockPath = "images/test.png";
  const mockBase64 = "mock-base64-string";
  const mockDecodedFile = new ArrayBuffer(8);
  const mockUploadData = { Key: mockPath };

  beforeEach(() => {
    jest.clearAllMocks();

    FileSystem.readAsStringAsync.mockResolvedValue(mockBase64);

    decode.mockReturnValue(mockDecodedFile);

    client.storage.upload.mockResolvedValue({
      data: mockUploadData,
      error: null,
    });
  });

  it("should upload image and return data", async () => {
    const result = await uploadImage(mockUri, mockPath);

    // Assertions
    expect(FileSystem.readAsStringAsync).toHaveBeenCalledWith(mockUri, {
      encoding: "base64",
    });
    expect(decode).toHaveBeenCalledWith(mockBase64);

    expect(client.storage.from).toHaveBeenCalledWith("images");
    expect(client.storage.upload).toHaveBeenCalledWith(
      mockPath,
      mockDecodedFile,
      {
        cacheControl: "3600",
        upsert: true,
        contentType: "image/png",
      },
    );

    expect(result).toEqual(mockUploadData);
  });

  it("should throw an error when upload fails", async () => {
    const mockError = { message: "Upload failed" };
    client.storage.upload.mockResolvedValue({ data: null, error: mockError });

    await expect(uploadImage(mockUri, mockPath)).rejects.toThrow(
      "Upload failed",
    );
  });
});
