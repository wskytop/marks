---
title：webpack 简单面试题
date：2022-03-06 17:00:00
tags：webpack
cover_picture：/images/cover1.jpg
---
### webpack 是什么

webpack 是自动化打包解决方案，也可以理解为是一个模块打包机。它帮助我们分析项目结构，找到 JavaScript 模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript 等），并将其打包为合适的格式以供浏览器使用

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/8/171f313316994b08~tplv-t2oaga2asx-watermark.awebp)

### webpack 常见有哪些配置

- Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入
- Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。
- mode：提供 mode 配置选项，告知 webpack 使用相应模式的内置优化
- Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。
- Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割
- Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
- Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情

### webpack 工作流程

1. 参数解析：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
2. 找到入口文件：从 Entry 里配置的 Module 开始递归解析 Entry 依赖的所有 Module
3. 调用 Loader 编译文件：每找到一个 Module， 就会根据配置的 Loader 去找出对应的转换规则
4. 遍历 AST，收集依赖：对 Module 进行转换后，再解析出当前 Module 依赖的 Module
5. 生成 Chunk：这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk
6. 输出文件：最后 Webpack 会把所有 Chunk 转换成文件输出

### Loader和Plugin 有什么区别

 Loader：直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到`loader`。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。   

Plugin：直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。