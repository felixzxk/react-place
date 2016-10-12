# react-place
## 这是啥？
这是一个基于reactjs的布局组件
## 为啥？
这类组件应该是比较多的，而且很多成熟框架都有此类功能，做这玩意儿不是浪费时间吗？
对，是在浪费时间，我再来个粗糙的轮子就是以为了练手！
没准儿将来有一天这玩意儿也能转得飞起来...
不过现在这东西还很渣！
## 特点
响应式布局，自定义响应式布局的规则，自动显示或隐藏侧边栏，详见 [wiki](https://github.com/felixzxk/react-place/wiki)
## 安装demo
先clone到本地，然后安装依赖

    npm i

按装react-place组件（demo里已经有组件了，不需要另外安装）

    npm i --save react-place
    
## 运行demo
依赖包安装完成后，执行下面的命令

    npm run dev
## 使用
    var ReactPlace = require('react-place'),    //主体容器
     RPCell = ReactPlace.RPCell,                //基础子元素
     RPFix = ReactPlace.RPFix,                  //浮动fix定位的子元素
     
    <ReactPlace
        {/* ...someProps goes here */}
    >
        <RPCell
            {/* ...someProps goes here */}
        >
            {/* your content gose here */}
        </RPCell>
        {/* ... any other RPCells ... */}
        <RPCell
            {/* ...someProps goes here */}
        >
            {/* your content gose here */}
        </RPCell>
        <RPFix
            type = 'top'                        //fix的元素需要存在type属性，定义它在页面上的位置类型，默认是“top”
            {/* ...someProps goes here */}
        >
            {/* your content gose here */}
        </RPFix>
    </ReactPlace>
在ReactPlace只允许存在RPCell、RPFix两类元素，其他元素将被移除；
RPFix同方向的元最多只能存在1个，多余的将被移除。
