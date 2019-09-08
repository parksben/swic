# Swic

**S**imple **W**eb **I**nfomation **C**ollector

简单易用的 Node.js 网页信息采集工具

## 🍺 功能特性

- 适用于博客类站点的内容采集
- 支持全部类型的 http 请求，定制性强
- 按队列并发请求数据，效率可控

## 🍿 安装

Clone 项目代码到本地：

```bash
git clone git@github.com:parksben/swic.git
```

使用 yarn 命令安装项目依赖：

```bash
yarn
```

**注：** 若未安装 npm 包管理工具 yarn，可先执行 `npm i yarn -g` 进行安装

## 🍳 运行环境

推荐 Node.js 10.x 以上版本

## 🌭 快速入门

### 1. 创建工程

创建新的采集器工程：

```bash
yarn create-project my-project
```

### 2. 配置工程

已生成的 **工程文件** 名为 `my-project.project.js`，在 ./project 目录下找到此文件并配置其内容

项目源码中 ./project 目录下已存在一个名为 `demo.project.js` 的示例工程，**工程文件** 的编写可参考此示例

点此查看详细的 [配置项手册](#-配置项手册)

### 3. 切换工程

切换当前工程为新创建的工程：

```
yarn switch-project my-project
```

### 4. 开始采集

运行当前采集器工程，开始数据采集

```
yarn start
```

**注：** 若想直接体验示例工程的效果，可执行 `yarn switch-project demo && yarn start`

### 5. 查看数据

根据 **工程文件** `my-project.project.js` 中 `task.list.output` 和 `task.detail.output` 两项的配置，查看工程输出的数据结果（JSON 格式）

## 🍩 采集原理

待完成

## 🍔 配置项手册

待完成
