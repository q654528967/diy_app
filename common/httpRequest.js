import configdata from './config'
import cache from './cache'
module.exports = {
	config: function(name) {
		var info = null;
		if (name) {
			var name2 = name.split("."); //字符分割
			if (name2.length > 1) {
				info = configdata[name2[0]][name2[1]] || null;
			} else {
				info = configdata[name] || null;
			}
			if (info == null) {
				let web_config = cache.get("web_config");
				if (web_config) {
					if (name2.length > 1) {
						info = web_config[name2[0]][name2[1]] || null;
					} else {
						info = web_config[name] || null;
					}
				}
			}
		}
		return info;
	},
	postzf: function(url, data, header) {
		header = header || "application/json";
		url = this.config("APIHOST1") + url;
		// console.log('zhifu',url)
		let token = uni.getStorageSync("token");
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: {
					"content-type": header,
					"Authorization":token
				},
				success: function(result) {
					if (result.data.code == 401 && result.code==401) {
						uni.clearStorageSync()
						uni.showModal({
							title: '您的认证信息失效，请重新登录',
							success: function (res) {
								if (res.confirm) {
									uni.switchTab({
										url: `/pages/user/user`
									})
									
								}
								uni.clearStorageSync()
							}
						});
					}
					if(result.data.code == 500 && result.code==500){
						uni.showToast({
							title:result.data.msg || result.msg,
							icon:'none'
						})
					}
					succ.call(self, result.data)
				},
				fail: function(e) {
					if(e.code==500){
						uni.showToast({
							title:'请检查网络是否链接',
							icon:'none'
						})
						uni.clearStorageSync()
					}
					error.call(self, e)
				}
			})
		})
	},
	post: function(url, data, header) {
		header = header || "application/json";
		url = this.config("APIHOST1") + url;
		let token = uni.getStorageSync("token");
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: {
						"content-type": header,
						"Authorization":token
					},
					success: function(result) {
						// console.log('result优惠',result)
						if(result.code == 401 || result.data.code == 401){
							uni.clearStorageSync()
							uni.redirectTo({
								url: `/pages/warrant/warrant`
							})
							// uni.showModal({
							// 	title: '您的认证信息失效,请重新登录',
							// 	success: function (res) {
							// 		if (res.confirm) {
							// 			uni.navigateTo({
							// 				url: `/pages/warrant/warrant`
							// 			})
							// 			// uni.clearStorageSync()
							// 		}
							// 	}
							// });
						}
						if(result.data.code == 500 && result.code==500){
							uni.showToast({
								title:result.data.msg || result.msg,
								icon:'none'
							})
						}
						succ.call(self, result.data)
					},
					fail: function(e) {
						// console.log('eeeeeee',e)
						error.call(self, e)
					}
				})
			})
	},
	poststate: function(url, data, header) {
		header = header || "application/json";
		url = this.config("APIHOST1") + url;
		let token = uni.getStorageSync("token");
		if (token) {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: {
						"content-type": header,
						"Authorization":token
					},
					success: function(result) {
						// alert('kkkkkk')
						succ.call(self, result.data)
					},
					fail: function(e) {
						if(e.code==500){
							uni.showToast({
								title:'请检查网络是否链接',
								icon:'none'
							})
							uni.clearStorageSync()
						}
						// console.log('eeeeeee',e)
						error.call(self, e)
					}
				})
			})
		} else {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: {
						"content-type": header,
						"token": token
					},
					success: function(result) {
						succ.call(self, result.data)
					},
					fail: function(e) {
						uni.showToast({
							title:'请检查网络是否链接',
							icon:'none'
						})
						error.call(self, e)
					}
				})
			})
		}
	},
	getT: function(url, data, header) {
		header = header || "application/json";
		url = this.config("APIHOST1") + url;
		let token = uni.getStorageSync("token");
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "GET",
					header: {
						"content-type": header,
						"Authorization": token
					},
					success: function(result) {
						if(result.code == 401 || result.data.code == 401){
							uni.clearStorageSync()
							uni.redirectTo({
								url: `/pages/warrant/warrant`
							})
							// uni.showModal({
							// 	title: '您的认证信息失效,请重新登录',
							// 	success: function (res) {
							// 		if (res.confirm) {
							// 			uni.navigateTo({
							// 				url: `/pages/warrant/warrant`
							// 			})
							// 			// uni.clearStorageSync()
							// 		}
							// 	}
							// });
						}
						if(result.data.code == 500 && result.code==500){
							uni.showToast({
								title:result.data.msg || result.msg,
								icon:'none'
							})
						}
						succ.call(self, result.data)
					},
					fail: function(e) {
						// if(e.code==500){
						// 	uni.clearStorageSync()
						// }
						error.call(self, e)
					}
				})
			})

	},
	getstate: function(url, data, header) {
		header = header || "application/json";
		url = this.config("APIHOST1") + url;
		let token = uni.getStorageSync("token");
		if (token) {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "GET",
					header: {
						"content-type": header,
						// "Authorization": token
					},
					success: function(result) {
						succ.call(self, result.data)
					},
					fail: function(e) {
						error.call(self, e)
					}
				})
			})
		} else {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "GET",
					header: {
						"content-type": header
					},
					success: function(result) {
						succ.call(self, result.data)
					},
					fail: function(e) {
						uni.showToast({
							title:'请检查网络是否链接',
							icon:'none'
						})
						error.call(self, e)
					}
				})
			})
		}
	
	},
	gets: function(url, data, header) {
		header = header || "application/json";
		url = this.config("APIHOST1") + url;
		let token = uni.getStorageSync("token");
		if (token) {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "GET",
					header: {
						"content-type": header,
						"Authorization": token
					},
				})
			})
		} else {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "GET",
					header: {
						"content-type": header
					},
					success: function(result) {
						succ.call(self, result.data)
					},
					fail: function(e) {
						uni.showToast({
							title:'请检查网络是否链接',
							icon:'none'
						})
						error.call(self, e)
					}
				})
			})
		}
	
	},
	posts: function(url, data, header) {
		header = header || "application/json";
		url = this.config("APIHOST1") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: {
					"content-type": header
				},
				success: function(result) {
					if (result.data.code == 401 && result.code==401) {
						uni.clearStorageSync()
						uni.redirectTo({
							url: `/pages/warrant/warrant`
						})
					}
					if(result.data.code == 500 && result.code==500){
						uni.showToast({
							title:result.data.msg || result.msg,
							icon:'none'
						})
					}
					succ.call(self, result.data)
				},
				fail: function(e) {
					uni.showToast({
						title:'请检查网络是否链接',
						icon:'none'
					})
					error.call(self, e)
				}
			})
		})
	},
	
	get: function(url, data, header) {
		// let token = uni.getStorageSync("token");
		header = header || "application/json";
		url = this.config("APIHOST1") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "GET",
				header: {
					"content-type": header,
					// "token": token
				},
				success: function(result) {
					if(result.code == 401 || result.data.code == 401){
						uni.clearStorageSync()
						uni.redirectTo({
							url: `/pages/warrant/warrant`
						})
					}
					if(result.data.code == 500 && result.code==500){
						uni.showToast({
							title:result.data.msg || result.msg,
							icon:'none'
						})
					}
					succ.call(self, result.data)
				},
				fail: function(e) {
					if(e.code==500){
						uni.showToast({
							title:'请检查网络是否链接',
							icon:'none'
						})
						uni.clearStorageSync()
					}
					error.call(self, e)
				}
			})
		})
	},
	// 扫一扫
	scget: function(url, data, header) {
		header = header || "application/json";
		url = this.config("APIHOST") + url;
		// let token = uni.getStorageSync("token");
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "GET",
					header: {
						"content-type": header,
						// "Authorization": token
					},
					success: function(result) {
						
						succ.call(self, result.data)
					},
					fail: function(e) {
						// if(e.code==500){
						// 	uni.clearStorageSync()
						// }
						error.call(self, e)
					}
				})
			})
	
	},
	//获取二维码
	minqrcode: function(url, data, header) {
		header = header || "application/json";
		url = this.config("APIHOST1") + url;
		let token = uni.getStorageSync("token");
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					responseType: 'arraybuffer',
					header: {
						"content-type": header,
						"Authorization":token
					},
					success: function(result) {
						// console.log('result优惠',result)
						if(result.code == 401 || result.data.code == 401){
							uni.clearStorageSync()
							uni.showModal({
								title: '您的认证信息失效,请重新登录',
								success: function (res) {
									if (res.confirm) {
										uni.navigateTo({
											url: `/pages/warrant/warrant`
										})
										// uni.clearStorageSync()
									}
								}
							});
						}
						if(result.data.code == 500 && result.code==500){
							uni.showToast({
								title:result.data.msg || result.msg,
								icon:'none'
							})
						}
						// alert('kkkkkk')
						succ.call(self, result.data)
					},
					fail: function(e) {
						// console.log('eeeeeee',e)
						error.call(self, e)
					}
				})
			})
	},
};
