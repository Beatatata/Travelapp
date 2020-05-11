# Project Title 行程助手
帮助用户查询行程地的图片信息以及倒计时，当地天气情况

## Project description 项目说明
一个虚拟的行程助手项目，制作这个页面的目的为完成Udacity的毕业作业。
在这个项目中，我主要做了以下：

* 使用 express 建立本地服务器
* 将用户输入信息保存至服务器，并使用异步函数获得 3 个 API 服务的接口信息返回，处理成我需要返回给用户的信息后返回至客户端并 Update UI
* 使用了 3 个接口，分别是：geonames，pixabay，darkSky
* 使用 Webpack，建立了 test，prod，dev 三种模式
* 扩展内容：使用户可以打印或将行程信息保存成 PDF

## Directory structure 目录结构

* src
  - client
    - js
      - app.js
      - app.test.js
    - styles
      - main.scss
    - views
      - index.html
    - index.js
  - server
    - app.js
    - app.test.js
    - index.js    
* dist
  - index.html
  - main.js
  - service-worker.js
  - workbox-1bbb3e0s.js
* node_modules
* package-lock.json
* package.json
* webpack.config.js
* webpack.dev.js
* webpack.prod.js
* README.md

## Run the application 运行应用
1. install [node.js]
2. npm install
3. npm run build-prod
4. npm start
5. View the URL **localhost:3030** in brower


## Release History 版本历史

* 1.0.0

## Authors 关于作者

* Beata weibo@北塔塔塔塔