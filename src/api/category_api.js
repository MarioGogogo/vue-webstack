import myAxios from './axios';
import qs from 'qs';
export function GetCategoryAPI(params) {
  return myAxios({
    url: '/categorylist',
    method: 'get',
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

export function CreateCategoryAPI(params) {
  return myAxios({
    url: '/createcategory',
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

export function UpdateCategoryAPI(params) {
  return myAxios({
    url: '/updatecategory',
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

export function DeleteCategoryAPI(params) {
  return myAxios({
    url: '/deletecategory',
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

export function BathDeleteCategoryAPI(params) {
  return myAxios({
    url: '/bathdeletecategory',
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
