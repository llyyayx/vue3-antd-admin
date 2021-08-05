<div align="center">
  <h2>vue3-antd-admin</h2>
  <h4>中文名称：通用后台模板，英文简称：tyong</h4>
</div>

###### tyong是以vue3、router4、typescript、vite、antd2为技术栈的后台框架，主要集成了动态路由(支持无限嵌套)、路由鉴权、登陆退出、公共组件等基础功能，再此之上对样式进行优化，解决了菜单超出不滚动、BFC隔离等一系列很容易被忽略的问题。封装常用组件两个:tableLayout、a-icon，tableLayout解决了平时开发中列表功能(增删改查)动不动写上几百行代码的痛苦局面，a-icon使用antd图标不用在个个引入组件，直接复制图标名称赋值type属性即可。更多的实用组件会不断推出，框架也会不断优化增加更多功能，请您start关注并参与维护中来！

***

> *仅对对华友好并尊重中华人民共和国领土与主权完整的各界人士开放使用！*


#### 预览地址

[http://www.lelebk.com](http://www.lelebk.com)

账号：admin    密码：123456


#### 安装使用

```
# 克隆项目
git clone git@github.com:llyyayx/vue3-antd-admin.git

# 进入项目目录
cd vue3-antd-admin

# 安装依赖
npm install

# 本地开发 启动项目
npm run dev
```


#### 路由菜单(后台)与router配置项对应关系
```
{
  # 路由路径
  path => router.path
  # 菜单名称
  name: router.meta.title,
  # 模板文件位置
  component: router.component,
  # 模板文件的name项
  key: router.name,
  # 重定向路径(可选)
  redirect?: router.redirect,
  # 菜单栏图标(可选)
  icon?: router.meta.icon,
  # 子菜单(可选)
  children?: router.children,
  # 菜单id(可选)
  id?: '',
  # 菜单父id(可选)
  pid?: ''
}
```


#### 鸣谢以下文章作者


| 问题 | 链接 |
| ------- | ------- |
| vue3增加$axios别名声明文件 | https://www.jianshu.com/p/51e4c3331f8e |
| vite动态import问题(动态菜单) | https://www.cnblogs.com/ljx20180807/p/14665505.html |
| vue3用tsx插槽疑难 | https://www.cnblogs.com/pinkchampagne/p/14083724.html 与 https://segmentfault.com/q/1010000040025845 |
| iis url rewrite | https://shiyousan.com/post/635659901987610088 |
| iis 配置vue history | https://blog.csdn.net/sr_www/article/details/104352523 |
| iis api转发 | https://www.cnblogs.com/mahatmasmile/p/5725253.html |
| volar插件替换vetur插件 | https://m.imooc.com/article/317810 |
| README在线 | https://markdowneditor.cn/ |