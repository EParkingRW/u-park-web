import Secure from "../system/helpers/secureLs";


const HTTP_HEADERS: any = {
  'Content-Type': 'multipart/form-data',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
};

if (Secure.getToken()) {
  HTTP_HEADERS.Authorization = `Bearer ${Secure.getToken()}`;
}

const Config = {
  HTTP_HEADERS,
};

export default Config;
