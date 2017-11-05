import axios from 'axios';
import { notification } from 'antd';

/**
 * post请求封装
 * 
 * @param {*} url 
 * @param {*} params 
 */
// export const $post = (url, params) =>
//     axios.post(url, params).then(res => res.data).catch(error => {
//         let message = error.message === 'Network Error' ? '登录失效!' : error.message;
//         notification.open({
//             message: "错误提示",
//             description: message,
//         });
//     });

/**
 * get请求封装
 * 
 * @param {*} url 
 * @param {*} params 
 */
// export const $get = (url, params) => 
//     axios.get(url, params).then(res => res.data).catch(error => {
//         let message = error.message === 'Network Error' ? '登录失效!' : error.message;
//         notification.open({
//             message: "错误提示",
//             description: message,
//         });
//     })

/**
 * post请求封装
 * 
 * @param {*} url 
 * @param {*} params 
 */
export const $post = (url, params, icon = '') => {
    let xToken = localStorage.getItem("xToken") ? localStorage.getItem("xToken") : '';
    url = url.indexOf("?") >= 0 ? `${url}&xToken=${xToken}&app=SNAIL_ADMIN` : `${url}?xToken=${xToken}&app=SNAIL_ADMIN`;
    let data = axios.post(url, params).then(res => res.data).catch(error => {
        let message = error.message === 'Network Error' ? '登录失效!' : error.message;
        notification.open({
            message: "错误提示",
            description: message,
            icon: icon,
        });
    });

    return data;
}

/**
 * get请求封装
 * 
 * @param {*} url 
 * @param {*} params 
 */
export const $get = (url, params) => {
    let xToken = localStorage.getItem("xToken") ? localStorage.getItem("xToken") : '';
    url = url.indexOf("?") >= 0 ? `${url}&xToken=${xToken}&app=SNAIL_ADMIN` : `${url}?xToken=${xToken}&app=SNAIL_ADMIN`;
    let data = axios.get(url, params).then(res => res.data).catch(error => {
        let message = error.message === 'Network Error' ? '登录失效!' : error.message;
        notification.open({
            message: "错误提示",
            description: message,
        });
    })

    return data;
}

/**
 * 队请求进行拦截,设置请求头信息
 */
// axios.interceptors.request.use(function (config) {
//     config.headers.xToken = `Token 112`;
//     return config;
// }, function (err) {
//     return Promise.reject(err);
// });
    
    