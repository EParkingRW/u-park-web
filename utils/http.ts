import axios, { AxiosInstance } from 'axios';

import Constants from "../system/constants";
import Config from "./config";

class Http {
  static axios = axios.create({
    baseURL: Constants.BACKEND_URL,
    headers: Config.HTTP_HEADERS,
  });

  instance: AxiosInstance;

  constructor(baseURL: string, headers: any) {
    this.instance = axios.create({ baseURL, headers });
  }
}
export default Http;
