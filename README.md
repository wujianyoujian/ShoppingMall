## 接口的设计

## 数据库
* 一张存放每一个用户信息的表
* 一张每一个用户信息具体信息的表
* 一张存储全部商品的表

**它是这样的所有的相同的信息放在一张表里面，然后通过用户名去查询**

| 目标 | 路由 | 请求 | 值 |
| :----: | :----:| :----:| :----:|
| 全部商品信息 | /shop/good/list | GET | Array |
| 主页中某一件商品的详情页 | /shop/good/detail?id | GET | |
| 用户登录 | /shop/user/login | POST | Bollean |
| 用户加入的商品信息 | /shop/cart/list?username | POST | Array |
| 用户注册 | /shop/user/register | POST | Bollean |

那么就是三张表good、user、cart
在good里面只有全部商品和单个商品的查看
user里面有登录注册
cart有购物车的全部商品，单个商品增加,减少,删除