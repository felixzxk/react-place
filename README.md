# react-respond
## 这是啥？
这是一个基于react的布局组件
## 为啥？
这类组件应该是比较多的，而且很多成熟框架都有此类功能，做这玩意儿不是浪费时间吗？
对，是在浪费时间，我再来个粗糙的轮子就是以为了练手！
没准儿将来有一天这玩意儿也能转得飞起来...
不过现在这东西还很渣！
## 特点
响应式布局，自定义响应式布局的规则，自动显示或隐藏侧边栏，详见 [wiki](https://github.com/felixzxk/react-place/wiki)
## 安装
    npm install --save react-respond
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
            {/* your content gose here */}
        </RRCell>
        {/* ... any other RRCells ... */}
        <RRCell
            {/* ...someProps goes here */}
        >
            {/* your content gose here */}
        </RRCell>
        <RRFix
            type = 'top'                        //fix的元素需要存在type属性，定义它在页面上的位置类型，默认是“top”
            {/* ...someProps goes here */}
        >
            {/* your content gose here */}
        </RRFix>
    </ReactRespond>
在ReactRespond只允许存在RRCell、RRFix两类元素，其他元素将被移除；
RRFix同方向的元最多只能存在1个，多余的将被移除。
