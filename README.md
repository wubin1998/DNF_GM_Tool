# DNF_GM_Tool
DNF GM网页管理系统

#### 已停止维护更新

## 安装环境

需要nodejs环境，下载[nodejs](https://nodejs.org/en/)

## 使用
安装好nodejs后，进入项目目录`./DNF_GM_Tool`


安装依赖模块

```bash
npm install 
```

等待安装完后

```bash
npm start  // 启动服务 
```

打开浏览器，输入地址[http://localhost:3000](http://localhost:3000)

## 开启注册

默认禁止注册


开启注册，在项目文件夹下创建名为reg的文件即可，不需要后缀名

## 数据库设置

在目录`db/config.js` 可以修改数据库配置，连接DNF私服的数据库。
