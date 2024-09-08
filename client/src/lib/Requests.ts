import axios from "axios";

namespace Request {
  const URL: string = import.meta.env.VITE_SERVER;

  export function GET(endpoint: string, headers: Record<string, string>) {
    return axios.get(URL + endpoint, {
      headers,
    });
  }

  export function POST(
    endpoint: string,
    headers: Record<string, string>,
    body: Record<string, any>
  ) {
    return axios.post(URL + endpoint, body, { headers });
  }
}

export default Request;
