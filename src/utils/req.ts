import envConfig from "@/config/dotenv";

export const getBaseUrl = (path: string) => {
  return `${envConfig.SERVER_BASE_URL}${path}`;
};
