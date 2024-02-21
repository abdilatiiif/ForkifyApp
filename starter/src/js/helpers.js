import { TIMEOUT_SEC } from "./config";


const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); 
    // if one of them fullfiles, returns a response, either success or error

    const data = await response.json();

    if (!response.ok) {
      throw new Error(` error: ${data.message} status: (${data.status} )`);
    }

    return data; // IMPORTANT
  } catch (error) {
    throw error;
  }
};
