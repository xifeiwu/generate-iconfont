fork from [gulp-iconfont-example](https://github.com/benweizhu/gulp-iconfont-example.git)

### 简介

打包svg格式的图片

**单色的svg**打包到eot, woff格式的字体中，通过class引用

```
<li>
  <i class="paas-icons-app"></i>
  <div class=name>app</div>
</li>
```

**多色的svg**将symbol的svg结点加入到body中，通过symbol的id值引用symbol中的svg图片。

结点样式：

```
<svg xmlns="http://www.w3.org/2000/svg"><symbol id="paas-icons-java" viewBox="0 0 1024 1024"><path d="M701.72245 245.828637s-162.696653 40.05327-190.648146 134.112978c-27.951493 94.059708 107.42585 114.379856 24.790581 191.957666 0 0 71.165674-36.847202 71.165675-85.796181s-67.37258-73.73956-48.316797-120.746836c19.055783-47.097588 143.008687-119.527627 143.008687-119.527627z" fill="#E83418" p-id="1584"/><path d="M594.2966 68.501477s64.843851 74.371742-34.950655 184.326322-185.590687 106.116329-55.948141 286.017375c0 0-141.11214-93.427526-103.5876-183.69414s234.539666-126.481633 194.486396-286.649557z" fill="#E83418" p-id="1585"/><path d="M408.073731 545.79918s-88.324911 23.526216-88.324911 38.788905c0 15.262689 223.702253 34.318472 370.549191-7.631345 0 0-102.323235 46.375094-266.284253 46.375094s-251.06672-48.976.900471s-294.867928-22.261851-294.867927-22.261851zM708.08943 552.798342s81.370904-17.159236 81.370904 48.948979-99.162323 105.484147-99.162323 105.484147 136.641707-21.629669 136.641708-110.586762-118.850289-43.846364-118.850289-43.846364z" fill="#06509B" p-id="1587"/></symbol></svg>';
```

引用格式：

```
<svg role="img" class="github">
  <use xlink:href="#github"></use>
</svg>
```

**为什么要打包svg图片？**

- 可以像字体一样，设置大小，颜色
- 一次传输，减少网络请求次数



### 项目结构

```
├── README.md
├── assets
│   ├── js
│   │   ├── gulp-my-icons.js，gulp中间件，用于生成插入svg-symbol的脚本（output/assets/fonts/paas-icons.js）
│   │   └── svg-symbols.demo.js
│   └── templates, 模板文件
│       ├── _icons.scss.tpl，css模板
│       └── index.html.tpl，网页模板
├── projects，svg图片按项目分类
│   └── paas-icons，用于paas前端的svg图片
│       ├── svg-font，打包到字体
│       │   ├── app.svg
│       │   ├── service.svg
│       │   ├── user.svg
│       │   └── work-order.svg
│       └── svg-symbols，打包到symbols
│           ├── java.svg
│           ├── nodejs.svg
│           └── python.svg
│   └── paas-icons，用于短信平台前端的svg图片
│       ├── svg-font
│       └── svg-symbols
├── output，存放编译后的文件
│   ├── assets
│   │   ├── fonts，存放所有预处理后的结果
│   │   │   ├── paas-icons.css，配合字体使用的css
│   │   │   ├── paas-icons.eot，字体文件
│   │   │   ├── paas-icons.js，实现svg-symbol的逻辑
│   │   │   ├── paas-icons.ttf，字体文件
│   │   │   └── paas-icons.woff
│   │   └── scss
│   │       └── paas-icons.scss，中间文件，不需引用
│   └── index.html，用于展示字体及svg-symbol样式的网页文件
├── gulpfile.js，gulp脚本
├── server.js，koa server，静态服务器，指向output文件夹
├── package.json
└── yarn.lock
```


### 指令

npm run gulp-build：预处理指定项目（通过gulpfile.js中的projectName指定）的svg图片，并将结果输出到output目录

npm run gulp-server: 执行预处理（npm run gulp-build），并启动koa server静态服务，展示预处理后的所有图片

### Reference
[gulp-iconfont-css](https://www.npmjs.com/package/gulp-iconfont-css)

[gulp-iconfont](https://www.npmjs.com/package/gulp-iconfont)

[gulp-svg-symbols](https://www.npmjs.com/package/gulp-svg-symbols)

