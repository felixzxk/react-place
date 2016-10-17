# react-respond
## 这是啥？
这是一个基于reactjs的布局组件
## 为啥？
这类组件应该是比较多的，而且很多成熟框架都有此类功能，做这玩意儿不是浪费时间吗？
对，是在浪费时间，我再来个粗糙的轮子就是以为了练手！
现在这东西还很渣，只具备基本的布局功能，还不够灵活，性能一般！
## 特点
响应式布局，自定义响应式布局的规则，自动显示或隐藏侧边栏，没有行的概念，只要按文本流顺序插入cell元素就行了，详见 [wiki](https://github.com/felixzxk/react-respond/wiki)
## 安装demo
先clone到本地

    git clone https://github.com/felixzxk/react-respond.git

然后到demo目录安装依赖
    
    npm i

按装react-respond组件（demo里已经有组件了，不需要另外安装）

    npm i --save react-respond
    
## 运行demo
依赖包安装完成后，执行下面的命令

    npm run dev

编译完成后访问 [localhost:3001](localhost:3001) 
## 关于webpack
只设置了开发服务，可以热加载，没有配置打包服务，本demo旨在演示功能；
webpack需要全局安装

    npm i webpack -g

需要修改端口号的话可以在package.json文件中配置port的值:

    "scripts": {
        "dev": "webpack-dev-server --progress --colors --host localhost --port 3001 --inline --hot"
    },

## 使用
    var ReactRespond = require('react-respond'),    //主体容器
     RRCell = ReactRespond.RRCell,                //基础子元素
     RRFix = ReactRespond.RRFix,                  //浮动fix定位的子元素
     
    <ReactRespond
        {/* ...someProps goes here */}
    >
        <RRCell
            {/* ...someProps goes here */}
        >
            {/* your content goes here */}
        </RRCell>
        {/* ... any other RRCells ... */}
        <RRCell
            {/* ...someProps goes here */}
        >
            {/* your content goes here */}
        </RRCell>
        <RRFix
            type = 'top'                        //fix的元素需要存在type属性，定义它在页面上的位置类型，默认是“top”
            {/* ...someProps goes here */}
        >
            {/* your content goes here */}
        </RRFix>
    </ReactRespond>
在ReactRespond只允许存在RRCell、RRFix两类元素，其他元素将被移除；
RRFix同方向的元最多只能存在1个，多余的将被移除。
## 注意
本来为了尽量少在demo上引用依赖，把原来的es6风格写回es5，结果，组件中的jsx还是需要babel-loader编译；
所以在安装完依赖后需要将babel-loader的作用范围扩大到./node_modules/react-respond目录；
图样图森破！
在webpack.config.js文件中修改include属性的值：

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: [srcDir, modulesDir]
            }
        ]
    }
