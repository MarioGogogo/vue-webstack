import myAxios from './axios';
import qs from 'qs';
export function GetLinksAPI(params) {
  return myAxios({
    url: '/linkslist',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [
      (data) => {
        return qs.stringify(data);
      },
    ],
  });
}

export function GetAllLinksAPI() {
  return myAxios({
    url: '/linksalllist',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [
      (data) => {
        return qs.stringify(data);
      },
    ],
  });
}

export function CreateLinksAPI(params) {
  return myAxios({
    url: '/createlinks',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [
      (data) => {
        return qs.stringify(data);
      },
    ],
  });
}

export function UpdateLinksAPI(params) {
  return myAxios({
    url: '/updatelinks',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [
      (data) => {
        return qs.stringify(data);
      },
    ],
  });
}

export function DeleteLinksAPI(params) {
  return myAxios({
    url: '/deletelinks',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [
      (data) => {
        return qs.stringify(data);
      },
    ],
  });
}

export function BathDeleteLinksAPI(params) {
  return myAxios({
    url: '/bathdeletelinks',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [
      (data) => {
        return qs.stringify(data);
      },
    ],
  });
}
