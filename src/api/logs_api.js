import myAxios from './axios';
import qs from 'qs';
export function GetLogsAPI(params) {
  return myAxios({
    url: '/readlogs',
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
