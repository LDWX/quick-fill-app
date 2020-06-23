## 缓存集合
```javascript
// 当前登录用户的基本信息
userInfo: {}, 	
// 账户信息
accountInfo: {
	account: ""
	password: ""
}

// 推荐学校列表
recommandObj: {	
	highRisk: [],
	lowRisk: [],
	safe: [],
	steady: []	
},

// 志愿池
choicePool: [{}]

// 专业树
professionTree: []

// 评测结果
valuateResult: {
	content: [],
	title: ""
}

```




## 用户登录

### 简要描述

用户登录接口，对登录账号密码校验，返回登录状态，200状态码为登录成功呢，并返回cookie记录登录状态

### URL

- /common/login


### 请求方式

- get

### 请求示例

**请求参数**

| 参数名   | 必须 | 类型   | 说明                 |
| -------- | ---- | ------ | -------------------- |
| name     | 是   | string | 用户id               |
| password | 是   | string | 密码(大于6， 小于32) |

**请求示例**

- url:  http://127.0.0.1:8080/common/login

**返回示例**

```json
{
    "id": 1,
    "user_id": "17621871016",
    "user_ps": "",
    "score": 100,
    "rank": 0,
    "province": "",
    "vip": 1,
    "subject": "1",
    "city": "",
    "school": "",
    "class": "",
    "change_times": 3,
    "valuating": "",
    "valuating_result": "",
    "evaluating": "",
    "evaluating_result": "",
    "create_time": "2020-05-19 17:46:58"
}


//cookie: 
//X-TOKEN=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3NjIxODcxMDE2IiwibWFwX2RpY3QiOnsiaWQiOiIxNzYyMTg3MTAxNiIsInByb3ZpbmNlIjoiIiwicmFuayI6MCwic2NvcmUiOjEwMCwic3ViamVjdCI6IjEiLCJ2aXAiOjF9LCJleHAiOjE1OTAwMzA5MTUsImlhdCI6MTU4OTk0NDUxNSwiaXNzIjoiMTc2MjE4NzEwMTYifQ.3J49q_7Nh0GmTKsbcKCIf9ClRvC_NLjPbndEAatGXXE; path=/; domain=127.0.0.1; Expires=Tue, 19 Jan 2038 03:14:07 GMT;
```