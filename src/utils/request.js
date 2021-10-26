import axios from "axios";
import router from '../router';
import ElementUI from 'element-ui';

//创建axios 实例
var $request = axios.create();
$request.defaults.baseURL = "/api/v1"; //拼接
$request.defaults.timeout = 2000;

//请求拦截
$request.interceptors.request.use(function(config) {
	var manager = JSON.parse(sessionStorage.getItem("manager"));
	if (manager && manager.token) {
		config.headers.token = manager.token;
	}
	return config;
}, function(error) {
	return Promise.reject(error);
})
export {
	$request
}

$request.interceptors.response.use(function(res) {
	return res;
}, function(error) {
	console.log(error.response);
	switch (error.response.status) {
		case 401:
			ElementUI.Message({
				message: error.response.data.info,
				type: "error",
				duration: 2000
			})
			break;
		case 403:
			ElementUI.Message({
				message: error.response.data.info,
				type: "error",
				onClose: function() {
					sessionStorage.removeItem("manager");
					//跳转login
					//replace 跳转并不保留历史记录
					router.replace({
						path: "/"
					})
				}
			})
			break;
		case 404:
			ElementUI.Message({
				message: error.response.data.info,
				type: "error",
				duration: 2000
			})
			break;

	}
	return Promise.reject(error)
})