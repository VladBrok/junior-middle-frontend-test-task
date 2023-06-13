import axios from "axios";
import { API_BASE_URL } from "configs/AppConfig";
import Utils from "utils";

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

const ARTIFICIAL_API_DELAY_MS = 500;

service.interceptors.request.use(async (config) => {
  await Utils.delay(ARTIFICIAL_API_DELAY_MS);
  return config;
});

export default service;
