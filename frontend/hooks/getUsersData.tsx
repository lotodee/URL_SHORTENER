import { TableResponseData } from "@/types/types";
import axios from "axios";

interface RequestBody {
  token?: string;
}

// interface ResponseData {
//   name: string;
//   description: string;
//   shortened_url: string;
// }

export const getUserData = async ({ token }: RequestBody) => {
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  try {
    const response = await axios.get<TableResponseData>('http://localhost:3333/api/url', { headers });
 
      return response.data;
    
  } catch (err) {
    console.log(err);
    throw err;
  }
};
