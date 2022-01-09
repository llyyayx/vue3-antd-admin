<div align="center">
  <img width="320" src="http://www.lelebk.com/docs/img/logo.png">
</div>

<div align="center">
  <h1>vue3-antd-admin</h1>
<div>

<div align="center">
  <img src="https://img.shields.io/badge/vue-3.0.5-brightgreen.svg">
  <img src="https://img.shields.io/badge/ant--design-2.2.6-brightgreen.svg">
  <img src="https://img.shields.io/badge/build-rollup-brightgreen.svg">
  <img src="https://img.shields.io/badge/vite-2.4.0-brightgreen.svg">
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg">
</div> 
  
<div align="left">
  <h2>简介</h2>
  <p>vue3-antd-admin是一个后台前端解决方案，它基于vue3和antd-ui实现。它使用了最新的前端技术栈，集成了动态路由、鉴权登录、菜单管理等基础功能，在此之上对样式进行优化，解决了其他框架菜单超出不滚动、未BFC隔离等被忽略的问题。它与同类型框架相比逻辑更加清晰简洁，没有冗余代码上手更加快速。相信不管你的需求是什么，本项目都能帮助到你。good luck！</p>
<div>
  
>仅对对华友好并尊重中华人民共和国主权与领土完整的各界人士开放使用！  
>It can be used by people who respect the sovereignty and territorial integrity of the People's Republic of China
  
<div align="left">
  <h2>资料</h2>
  <p><a href="http://www.lelebl.com/admin/" target="_blank">demo在线预览</a></p>
  <p><a href="http://www.lelebl.com/docs/" target="_blank">使用文档</a></p>
  <p>账号：admin | 密码：123456</p>
<div>

## 安装使用

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
具体详细的使用说明请阅读文档。为了更好的使用请务必阅读文档-开箱即用部分。
  
## 发布

```
# 构建生产环境
npm run build
```
  
## 功能

```
- 登录 / 注销
- 权限验证
  - 页面权限
  - 二步登录
- 多环境发布
  - dev
  - sit
  - stage
  - prod
- 全局功能
  - 动态侧边栏（支持多级路由嵌套）
  - 快捷导航(标签页)
  - 自适应收缩侧边栏
- 表格
  - josn配置省心开发
- 错误页面
  - 401
  - 404
  - 500
- 组件
  - tableLayout表格
  - a-icon图标
```
  
## 未来规划

本项目当前只是基础部分完成了，还有很多地方需要完善，例如：H5适配、页面动画、指令权限、更多好用的组件等等等等，由于本人平时工作原因并不能快速迭代更新，所以希望更多的开发者加入进来，
你只需要Fork本仓库，创建自己的分支并`pull request`你的杰作即可，贡献者名单中也会收录你的名字。当然在使用过程中遇到问题你也可以提出`issue`，我们会尽快安排时间解决。
在这里非常欢迎你的加入，期待你的一个`issue`或者是一个`pull reques`

## 如何贡献

非常欢迎你的加入！[提一个 Issue](https://github.com/llyyayx/vue3-antd-admin/issues) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`
  
## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 相关仓库

如果这些插件对你有帮助，可以给一个 star 支持下

- [vite-plugin-mock](https://github.com/anncwb/vite-plugin-mock) - 用于本地及开发环境数据 mock
- [vite-plugin-html](https://github.com/anncwb/vite-plugin-html) - 用于 html 模版转换及压缩
- [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import) - 用于组件库样式按需引入
- [vite-plugin-theme](https://github.com/anncwb/vite-plugin-theme) - 用于在线切换主题色等颜色相关配置
- [vite-plugin-imagemin](https://github.com/anncwb/vite-plugin-imagemin) - 用于打包压缩图片资源
- [vite-plugin-compression](https://github.com/anncwb/vite-plugin-compression) - 用于打包输出.gz|.brotil 文件
- [vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons) - 用于快速生成 svg 雪碧图
  
 ## 捐赠

如果你觉得这个项目对你有帮助，你可以帮作者买一杯咖啡表示支持!

<img width="320" src="http://www.lelebk.com/docs/img/zsm.jpg">

## 交流

vue3-antd-admin是完全开源免费的项目，在帮助开发者更方便地进行中大型管理系统开发，同时也提供 QQ 交流群使用问题欢迎在群内提问。

- QQ 群 `719251151`

## License

[MIT © llyyayx-2021](./LICENSE)