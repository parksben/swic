# Swic

**S**imple **W**eb **I**nfomation **C**ollector

简单、轻量级的网页信息采集器

## 安装

克隆仓库代码到本地

```bash
git clone git@github.com:parksben/crawler.git
```

安装项目依赖

```bash
yarn # OR npm i
```

## 使用

> 建议使用 Node.js 10.x 以上版本

- config 目录中添加爬虫任务的配置脚本，如：`chanpin100.config.js`
- 修改 .env 文件中环境变量 `CRAWLER_TARGET` 为要执行的爬虫任务，如：`CRAWLER_TARGET=chanpin100`
- 项目目录下执行 `yarn start` 或者 `npm run start` 开始执行爬虫任务
