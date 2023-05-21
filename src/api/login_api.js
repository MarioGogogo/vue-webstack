import myAxios from './axios';
import qs from 'qs';
export function LoginAPI(params) {
  return myAxios({
    url: '/login',
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
