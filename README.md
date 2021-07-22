### 插件

volar插件 替换 vetur插件 (https://m.imooc.com/article/317810)


### 问题已经解决

vite别名vscode不识别：https://blog.csdn.net/chendf__/article/details/115515736
增加$axios声明文件：https://www.jianshu.com/p/51e4c3331f8e
vite动态import问题：https://www.cnblogs.com/ljx20180807/p/14665505.html
tsx插槽： https://www.cnblogs.com/pinkchampagne/p/14083724.html https://segmentfault.com/q/1010000040025845

### 路由配置

路由支持无限嵌套！

```
router: RouteRecordRaw

{
  path => router.path
  name: router.meta.title 用于标签tab,
  component: router.component,
  key: router.name,
  redirect?: router.redirect,
  icon?: router.meta.icon 菜单栏图标,
  children?: router.children,
  id?: 后台返回,
  pid?: 后台返回,
  status?: 后台返回，前台可用于显示隐藏菜单，0隐藏1显示
}

```