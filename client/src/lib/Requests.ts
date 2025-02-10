import axios from "axios";

namespace Request {

  export function GET(endpoint: string, headers: Record<string, string>) {
    return axios.get(import.meta.env.VITE_SERVER + endpoint, {
      headers,
    });
  }

  export function POST(
    endpoint: string,
    headers: Record<string, string>,
    body: Record<string, any>
  ) {
    return axios.post(import.meta.env.VITE_SERVER + endpoint, body, { headers });
  }
}

export default Request;
