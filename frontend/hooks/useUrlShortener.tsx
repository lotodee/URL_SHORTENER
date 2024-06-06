import axios from "axios";

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
  const shorten = async ({ name, description, link, token }: RequestBody) => {
    const headers = {
      'Authorization': `Bearer ${token}` 
    };
    try {
      const response = await axios.post<ResponseData>(
        'http://localhost:3333/api/url-shortener',
        { name, description, link },
        { headers }
      );

      return response.data.shortenedUrl;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return shorten;
};
