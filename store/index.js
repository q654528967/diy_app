import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {                    //全局变量定义
		hasLogin: false,        //用户是否登录
		userInfo: {
			avatarUrl:'',
			nickName:''
		},			//用于存放用户数据账号数据
	},
	mutations: {                //全局方法定义出
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo.avatarUrl = provider.avatarUrl||'';
			state.userInfo.nickName = provider.nickName||'';
			uni.setStorageSync('userInfo',provider)    //缓存用户登陆状态
			console.log('我的',state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		}
	},
	actions: {
	
	}
})

export default store
