import axios from "axios";
import { useState } from "react";

interface RequestBody {
  name: string;
  description: string;
  token?: string;
  link: string;
}

type ResponseData = {
  shortenedUrl: string;
};


export const useUrlShortener = () => {
  const [loading,setIsLoading] = useState(false);
  const shorten = async ({ name, description, link, token }: RequestBody) => {

    setIsLoading(true)
    const headers = {
      'Authorization': `Bearer ${token}` 
    };
    try {
      const response = await axios.post<ResponseData>(
        'http://localhost:3333/api/url-shortener',
        { name, description, link },
        { headers }
      );
if(response){setIsLoading(false)}
      return response.data.shortenedUrl;
     
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return {shorten ,loading};
};
