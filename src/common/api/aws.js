import axios from "axios";
import { URL } from "../app/api";

export async function uploadToS3(file) {
  try {
    const url = (await axios.get(`${URL}/aws/presigned-url`)).data;

    await axios({
      url: url.data,
      method: "put",
      data: file,
      headers: { 
        "Content-Type" : file.type, 
        'Without-Token': 'true'
      },
    });

    return url.data.split('?')[0];
    
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPresignedUrl() {
    return (await axios.get(`${URL}/aws/presigned-url`)).data;
}