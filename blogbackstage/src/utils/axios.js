import axios from 'axios';
import qs from 'qs';
// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://39.98.74.46:8081' : "";
axios.defaults.baseURL = 'http://192.168.0.126:8089'
// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://192.168.43.67:8090' : "";
axios.defaults.timeout = 10000;
const service = axios.create({
    retry: 2 ,// 请求次数,
    retryInterval: 1000 // 请求超时后，1s再次请求
});

service.interceptors.request.use(function (config) {
    // 请求之前的处理,token,(js-cookie),store处理
    config.method === 'POST'
        ? config.data = qs.stringify({...config.data})
        : config.params = {...config.params};
    // config.headers['Content-type'] = 'application/x-www-form-urlencoded;chartset=UTF-8';
    console.log(config+"<-----------------------")
    return config
}, function (error) {
    return Promise.reject(error)
});

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data
        } else if (response.status === 500) {
            //
            //console.log('0000')
        }
    } ,
    error => {
        //console.log(error)
        //  请求超时,处理
        const config = error.config;
        if(!config || !config.retry) return Promise.reject(error);
        // 重新请求次数
        config.retryCount = config.retryCount || 0;
        // 请求次数是否上限
        if(config.retryCount >= config.retry){
            return Promise.reject(error)
        }
        config.retryCount += 1;
        // 重新发起请求
        const back = new Promise(function(resolve){
            setTimeout(() => {
                resolve()
            },config.retryInterval || 1)
        });
        // 返回axios实体
        return back.then(() => {
            return service(config)
        })
    }
);

export default service
