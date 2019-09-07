# Swic

**S**imple **W**eb **I**nfomation **C**ollector

超简单的 Node.js 网页信息采集工具

## 🛠 功能特性

- 适用于博客类站点的内容采集
- 支持全部类型的 http 请求，定制性强
- 按队列并发请求数据，效率可控

## 📦 安装

Clone 项目代码到本地：

```bash
git clone git@github.com:parksben/swic.git
```

使用 yarn 命令安装项目依赖：

```bash
yarn
```

> 注：若未安装 npm 包管理工具 yarn，可先执行 `npm i yarn -g` 进行安装

## 📀 运行环境

> 建议使用 Node.js 10.x 以上版本

## 🚚 快速开始

1. 创建新的采集器工程

```bash
yarn new-project my-project
```

2. 配置新工程

已生成的 **工程文件** 名为 `my-project.project.js`，在 ./project 目录下找到此文件并配置其内容

> 注：项目源码中 ./project 目录下已存在一个名为 `demo.project.js` 的示例工程，**工程文件** 的编写可参考此示例

3. 切换当前工程为已创建的工程

```
yarn use-project my-project
```

> 注：此命令实际上是更新了 .env 文件中配置项 `CURRENT_PROJECT` 的值，亦可直接编辑 .env 文件

4. 运行当前工程，开始数据采集

```
yarn start
```

> 注：若想直接体验示例工程的效果，可执行 `yarn use-project demo && yarn start`

5. 查看已采集的数据

根据 **工程文件** `my-project.project.js` 中配置的 `output` 一项的路径，查看工程输出的数据结果（JSON 格式数据）

> 注：示例工程的数据存放在 ./output 目录下
