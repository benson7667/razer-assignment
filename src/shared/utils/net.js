import axios from "axios";
import config from "../../config";

const agent = axios.create({
  baseURL: config.apiHost,
});

const get = (uri, options = {}) => agent.get(uri, options);

const post = (uri, data = {}, config = {}) => agent.post(uri, data, config);

const put = (uri, data = {}, config = {}) => agent.put(uri, data, config);

const del = (uri, data = {}, config = {}) => agent.delete(uri, data, config);

export { get, post, put, del };
