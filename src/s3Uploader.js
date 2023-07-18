import axios from "axios";

const wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

export async function uploadImage(image) {
  const QUERY_PARAMS = `?name=${image.name}&type=${image.type}`;
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT + QUERY_PARAMS;
  const API_KEY = import.meta.env.VITE_API_KEY;

  let presignedURL;

  const response = await axios({
    method: "GET",
    url: API_ENDPOINT,
    headers: {
      "x-api-key": `${API_KEY}`,
    },
  });

  if (response.status === 200) {
    presignedURL = response.data;
  }

  if (presignedURL) {
    try {
      const result = await fetch(presignedURL.uploadURL, {
        method: "PUT",
        body: image,
      });
      return result;
    } catch {
      throw new Error("An error occurred during image upload.");
    }
  } else {
    throw new Error("Failed to obtain presigned URL.");
  }
}
