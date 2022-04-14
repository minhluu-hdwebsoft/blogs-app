import { Api, createApiClient } from "api-sdk/api";

const config = {
  baseUrl: "http://localhost:5000",
};

const client = createApiClient(config);
const api = new Api(client);

export default api;
