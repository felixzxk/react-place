var React = require('react');
var RRCell = React.createClass({
    getInitialState: function () {
        return {
            size: this.props.size || 1,
            bgc: this.props.bgc || '#f5f5f5',
            style: this.props.style
        };
    },
    componentWillReceiveProps: function (nextProp) {
        this.setState({
            size: nextProp.size || 1,
            bgc: nextProp.bgc || '#f5f5f5',
            style: nextProp.style
        })
    },
    render: function () {
        var cellWrapStyle = {
                float: 'left',
                backgroundColor: this.state.bgc
            },
            cellContStyle = this.state.style || {};
        cellContStyle.overflowY = 'auto';
        cellContStyle.height = '100%';
        cellContStyle.width = '100%';
        return (
            <div
                className='PMCell'
                style={cellWrapStyle}
                data-size={this.state.size}
            >
                <div
                    style={cellContStyle}
                >
                    {this.props.children}
                </div>
            </div>
        )
    }
});
var RRFix = React.createClass({
    getInitialState: function () {
        return {
            type: this.props.type || 'Top',
            width: this.props.width,
            height: this.props.height,
            defaultVisible: this.props.defaultVisible !== false,
            pin: this.props.pin || false,
            style: this.props.style,
            bgc: this.props.bgc || '#ddd',
            title: this.props.title || ''
        };
    },
    componentWillReceiveProps: function (nextProp) {
        this.setState({
            type: nextProp.type || 'Top',
            width: nextProp.width,
            height: nextProp.height,
            defaultVisible: nextProp.defaultVisible !== false,
            pin: nextProp.pin || false,
            style: nextProp.style,
            bgc: nextProp.bgc || '#ddd',
            title: nextProp.title || ''
        })
    },
    render: function () {
        var type = (function (type) {
                switch (type) {
                    case 't':
                    case 'top':
                    case 'Top':
                    case 'TOP':
                        return 'Top';
                    case 'b':
                    case 'bottom':
                    case 'Bottom':
                    case 'BOTTOM':
                        return 'Bottom';
                    case 'l':
                    case 'left':
                    case 'Left':
                    case 'LEFT':
                        return 'Left';
                    case 'r':
                    case 'right':
                    case 'Right':
                    case 'RIGHT':
                        return 'Right';
                    default:
                        return 'Top'
                }
            })(this.state.type),
            id = 'PMFix' + type,
            id2 = '_PMFix' + type,
            id3 = '__PMFix' + type,
            className = 'PMFix' + type + ' PMFixes',
            isShow = this.state.defaultVisible ? 'block' : 'none',
            style = this.state.style || {},
            wrapStyle0 = {
                width: this.state.width || 'auto',
                height: this.state.height || 'auto',
                position: 'fixed',
                zIndex: 9999,
                display: isShow,
                backgroundColor: this.state.bgc
            },
            wrapStyle = {
                height: '100%',
                overflowY: 'auto',
                overflowX: 'hidden',
                margin: '0 auto'
            };
        style.height = '100%';
        return (
            <div
                id={id}
                className={className}
                style={wrapStyle0}
                data-defaultVisible={this.state.defaultVisible}
                data-type={this.state.type}
                title={this.state.title}
            >
                <div
                    id={id2}
                    style={wrapStyle}
                >
                    <div
                        id={id3}
                        style={style}
                    >
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
});
var ReactRespond = React.createClass({
    getInitialState: function () {
        var respond = ReactRespond._.getRespond(ReactRespond._.respond, this.props.respond);
        return {
            id: this.props.id || '__PM__',
            margin: this.props.margin || 0,
            potion: this.props.potion || 12,
            sameHeight: this.props.sameHeight || 'auto',
            respond: respond,
            style: this.props.style,
            curSize: '',
            sameSize: this.props.sameSize || 0,
            allowControlSideBar: this.props.allowControlSideBar !== false
        };
    },
    componentWillMount: function () {
        this.onLoading()
    },
    componentWillReceiveProps: function (nextProp) {
        var respond = ReactRespond._.getRespond(ReactRespond._.respond, nextProp.respond);
        this.setState({
            margin: nextProp.margin,
            sameHeight: nextProp.sameHeight,
            style: nextProp.style,
            respond: respond,
            sameSize: nextProp.sameSize || 0,
            allowControlSideBar: nextProp.allowControlSideBar !== false
        }, function () {
            this.needSetting();
        })
    },
    setCell: function () {
        var cellsWrap = document.getElementById('cells'),
            cells = cellsWrap.childNodes,
            fixes = document.getElementById('fixes'),
            wrapW = Math.round(fixes.offsetWidth),
            potion = this.state.potion,
            margin = this.state.margin,
            height = typeof this.state.sameHeight !== 'number' ? this.state.sameHeight : this.state.sameHeight + 'px',
            cellUnit = Math.floor((wrapW - ((potion + 1) * margin)) / potion),
            setCellWidth = function (size) {
                return (cellUnit * size) + (margin * (size - 1)) + 'px'
            };
        var count = 0,
            needClear = [],
            removeClear = [];
        //先删除所有clear元素
        for (var a = 0; a < cells.length; a++) {
            if (cells[a].className == '_clear_') {
                removeClear.push(a)
            }
        }
        if (removeClear.length > 0) {
            removeClear.forEach(function (o, i) {
                ReactRespond._.removeClear(cellsWrap, (o - i))
            })
        }
        for (var i = 0; i < cells.length; i++) {
            var size = this.state.sameSize == 0 ? parseInt(cells[i].dataset.size) : this.state.sameSize;
            if (size > potion) size = potion;
            if (cells[i].className != '_clear_') {
                cells[i].style.width = setCellWidth(size);
                cells[i].style.marginTop = margin + 'px';
                cells[i].style.marginLeft = margin + 'px';
                cells[i].style.height = height;
            }
            if (potion < count + size) {
                var poor = potion - count;
                count = size;
                if (poor > 0) {
                    cells[i - 1].style.width = setCellWidth(parseInt(cells[i - 1].dataset.size) + poor)
                }
                needClear.push(i);
            } else {
                count += size;
            }
        }
        if (needClear.length > 0) {
            needClear.forEach(function (o, i) {
                ReactRespond._.insertClear(cellsWrap, (o + i))
            })
        }
    },
    setFixedCells: function (self, wrap, curSize) {
        var node = ReactRespond._.getFixes(),
            selfH = self.offsetHeight,
            curW = this.state.respond[curSize].width,
            curHideSide = this.state.respond[curSize].hideSideBar,
            margin = this.state.margin,
            PM_WIDTH = document.getElementById('__PM_Width_'),
            _wrapW = Math.round(PM_WIDTH.offsetWidth),
            wrapW = curW < 1 && curW !== 0 ? Math.round(_wrapW * curW) : 'auto',
            marginLeft = wrapW !== 'auto' ? Math.round((_wrapW - wrapW) / 2) : 0,
            _wrapWidth = wrapW == 'auto' ? wrapW : wrapW,
            wrapWidth = _wrapWidth !== 'auto' ? _wrapWidth + 'px' : 'auto';
        wrap.style.width = wrapWidth;
        console.log('wrapWidth', wrapWidth)
        var fixProps = this.state.fixProps;
        var pds = (function () {
            if (fixProps == undefined) {
                fixProps = {
                    count: 0,
                    ready: false
                }
            } else {
                fixProps.ready = true
            }
            var _top = node[0] && (node[0].offsetHeight + 'px') || 0;

            function _topD(btn) {
                var _top_ = document.getElementById('_PMFixTop'),
                    topD = '10px';
                if (_top_) {
                    var _topH = _top_.offsetHeight,
                        _btnH = btn.offsetHeight,
                        _poor = _topH - _btnH;
                    topD = _poor > 0 ? _poor / 2 : 10;
                    topD += 'px'
                }
                return topD
            }

            return node.map(function (n, i) {
                if (n) {
                    var defaultVisible = n.dataset.defaultVisible !== false,
                        height = n.offsetHeight,
                        title = n.title;
                    switch (i) {
                        case 0:
                            var topWrap = document.getElementById('_PMFixTop');
                            topWrap.style.width = wrapWidth;
                            n.style.left = 0;
                            n.style.top = 0;
                            n.style.width = _wrapW + 'px';
                            if (!fixProps.top) {
                                fixProps.top = {
                                    visible: defaultVisible,
                                    pin: false,
                                    title: title
                                };
                                fixProps.count += 1;
                                n.style.display = defaultVisible ? '' : 'none';
                            } else {
                                n.style.display = fixProps.top.visible;
                            }
                            return height + 'px';
                        case 2:
                            var bottomWrap = document.getElementById('_PMFixBottom');
                            bottomWrap.style.width = wrapWidth;
                            n.style.left = 0;
                            n.style.bottom = 0;
                            n.style.width = _wrapW + 'px';
                            if (!fixProps.bottom) {
                                fixProps.bottom = {
                                    visible: defaultVisible,
                                    pin: false,
                                    title: title
                                };
                                fixProps.count += 1;
                                n.style.display = defaultVisible ? '' : 'none';
                            } else {
                                n.style.display = fixProps.bottom.visible
                            }
                            return height + 'px';
                        case 1:
                            var rightSwitchBtn = document.getElementById('rightSwitchBtn'),
                                scrollWidth = document.getElementById('__PM__').offsetWidth - _wrapW;
                            if (rightSwitchBtn) {
                                if (_wrapWidth !== 'auto') {
                                    rightSwitchBtn.style.right = (marginLeft + scrollWidth) + 'px'
                                } else {
                                    rightSwitchBtn.style.right = scrollWidth + 'px'
                                }
                                rightSwitchBtn.style.top = _topD(rightSwitchBtn)
                            }
                            n.style.right = _wrapWidth !== 'auto' ? (marginLeft + scrollWidth) + 'px' : scrollWidth + 'px';
                            n.style.top = _top;
                            if (!fixProps.right) {
                                fixProps.right = {
                                    visible: defaultVisible,
                                    pin: curHideSide,
                                    title: title
                                };
                                fixProps.count += 1;
                                n.style.display = defaultVisible ? '' : 'none';
                            } else {
                                n.style.display = fixProps.right.visible ? '' : 'none';
                            }
                            return fixProps.right.pin ? 0 : n.offsetWidth + 'px';
                        case 3:
                            var leftSwitchBtn = document.getElementById('leftSwitchBtn');
                            if (leftSwitchBtn) {
                                leftSwitchBtn.style.left = marginLeft + 'px';
                                leftSwitchBtn.style.top = _topD(leftSwitchBtn)
                            }
                            n.style.left = marginLeft + 'px';
                            n.style.top = _top;
                            if (!fixProps.left) {
                                fixProps.left = {
                                    visible: defaultVisible,
                                    pin: curHideSide,
                                    title: title
                                };
                                fixProps.count += 1;
                                n.style.display = defaultVisible ? '' : 'none';
                            } else {
                                n.style.display = fixProps.left.visible ? '' : 'none';
                            }
                            return fixProps.left.pin ? 0 : n.offsetWidth + 'px';
                        default :
                            return 0
                    }
                } else {
                    return 0
                }
            });
        })();
        if (!fixProps.ready) {
            this.setState({
                fixProps: fixProps
            });
        }
        var targetY = [self];
        if (node[1]) {
            targetY.push(node[1])
        }
        if (node[3]) {
            targetY.push(node[3])
        }
        ReactRespond._.setSize(targetY, (parseInt(pds[0]) + parseInt(pds[2]) ), 'y');
        ReactRespond._.setSize(wrap, (parseInt(pds[1]) + parseInt(pds[3]) ), 'x');
        wrap.style.padding = '0 ' + pds[1] + ' ' + margin + 'px ' + pds[3];
        self.style.padding = pds[0] + ' 0 ' + pds[2];
    },
    needSetting: function () {
        var self = document.getElementById(this.state.id),
            wrap = document.getElementById('__PM_WRAP__'),
            parent = self && self.parentNode || false,
            res = this.state.respond,
            potion = this.props.potion || 12,
            curSize = this.state.curSize;
        var _w = ReactRespond._.operateSize(parent, curSize, res);
        if (_w && _w !== curSize) {
            var oldSameSize = this.props.sameSize || 0;
            this.setState({
                curSize: _w,
                potion: res[_w].potion !== 0 ? res[_w].potion : potion,
                sameSize: res[_w].unifySize !== 0 ? res[_w].unifySize : oldSameSize
            }, function () {
                this.onRespond(_w, this.state.potion, this.state.sameSize)
            })
        }
        var _pm_ = document.getElementById('__PM__');
        this.setFixedCells(self, wrap, _w || curSize);
        this.setCell(self, wrap, _w || curSize)
    },
    onScroll: function (target, wrap) {
        var scrollTop = target.scrollTop,
            targetPT = parseInt(target.style.paddingTop),
            targetPB = parseInt(target.style.paddingBottom),
            targetH = parseInt(target.offsetHeight),
            wrapH = parseInt(wrap.offsetHeight),
            scrollBottom = wrapH - targetH + targetPT + targetPB;
        if (scrollTop == 0) {
            if (typeof this.props.onScrollTop == 'function') this.props.onScrollTop(scrollTop)
        } else if (scrollTop >= scrollBottom) {
            if (typeof this.props.onScrollBottom == 'function') this.props.onScrollBottom(scrollTop)
        } else {
            if (scrollTop > ReactRespond._var._scrollTop) {
                if (typeof this.props.onScrollDown == 'function') this.props.onScrollDown(scrollTop)
            } else {
                if (typeof this.props.onScrollUp == 'function') this.props.onScrollUp(scrollTop)
            }
            if (typeof this.props.onScroll == 'function') this.props.onScroll(scrollTop)
        }
        ReactRespond._var._scrollTop = scrollTop;
    },
    onLoading: function () {
        if (typeof this.props.onLoading == 'function') {
            this.props.onLoading()
        }
    },
    onLoaded: function () {
        if (typeof this.props.onLoaded == 'function') {
            this.props.onLoaded()
        }
    },
    opened: function (type) {
        var fixProps = this.state.fixProps;
        this.triggerSideBar(false, fixProps, type);
    },
    closed: function (type) {
        var fixProps = this.state.fixProps;
        this.triggerSideBar(true, fixProps, type);
    },
    triggerSideBar: function (need2hide, fixProps, type) {
        if (!type) {
            return
        }
        var targetId = 'PMFix' + type.substring(0, 1).toUpperCase() + type.substring(1),
            hasThis = document.getElementById(targetId);
        if (!!hasThis) {
            var curSize = this.state.curSize,
                isPin = ReactRespond._.respond[curSize].hideSideBar;
            if (fixProps !== undefined) {
                if (!!need2hide) {
                    fixProps[type].visible = false;
                    fixProps[type].pin = true
                } else {
                    fixProps[type].visible = true;
                    fixProps[type].pin = isPin
                }
                this.setState({
                    fixProps
                }, function () {
                    this.needSetting()
                })
            }
        }
    },
    onRespond: function (type, potion, sameSize) {
        var fixProps = this.state.fixProps,
            hideSideBar = ReactRespond._.respond[type].hideSideBar;
        this.triggerSideBar(hideSideBar, fixProps, 'left');
        this.triggerSideBar(hideSideBar, fixProps, 'right');
        if (typeof this.props.onRespond == 'function') {
            this.props.onRespond(type, potion, sameSize)
        }
    },
    componentDidMount: function () {
        var body = document.body.style;
        body.margin = 0;
        body.height = '100%';
        body.width = '100%';
        body.overflow = 'hidden';
        var _this = this,
            wrap = document.getElementById('__PM_WRAP__'),
            children = wrap.children,
            __PM__ = document.getElementById(this.state.id),
            cellsWrap = document.getElementById('cells'),
            fixesWrap = document.getElementById('fixes'),
            regFix = /PMFix/,
            regCell = /PMCell/;
        //需要先将不同类型的子元素放入相应的元素类型的容器里
        while (children[2]) {
            var className = children[2].className;
            if (regCell.test(className)) {
                cellsWrap.appendChild(children[2]);
            } else if (regFix.test(className)) {
                fixesWrap.appendChild(children[2]);
            } else {
                document.getElementById('__PM_WRAP__').removeChild(children[2]);
                console.error('ReactRespond组件中只能包含PMCell或者PMFix子组件，或者以‘_’或大写字母开头的变量名引用组件，其余的元素都会被删除');
            }
        }
        this.needSetting();
        window.onresize = function () {
            _this.needSetting()
        };
        __PM__.onscroll = function () {
            _this.onScroll(this, wrap)
        };
        this.onLoaded();
    },
    render: function () {
        var _this = this,
            sideBarController = (function () {
                var fixProps = _this.state.fixProps;
                if (fixProps) {
                    var hideSideBar = ReactRespond._.respond[_this.state.curSize].hideSideBar,
                        allowControlSideBar = _this.state.allowControlSideBar,
                        fixLeft = fixProps.left,
                        fixRight = fixProps.right,
                        show = hideSideBar ? true : (allowControlSideBar ? true : false);
                    return (
                        <div>
                            {fixLeft ?
                                <SwitchBtn
                                    id = 'leftSwitchBtn'
                                    icoPos = 'left'
                                    show = {fixLeft.visible}
                                    type = 'left'
                                    opened = {_this.opened}
                                    closed = {_this.closed}
                                    visible = {show}
                                    title = {fixLeft.title}
                                /> : ''}
                            {fixRight ?
                                <SwitchBtn
                                    id = 'rightSwitchBtn'
                                    show = {fixRight.visible}
                                    type = 'right'
                                    opened = {_this.opened}
                                    closed = {_this.closed}
                                    visible = {show}
                                    title = {fixRight.title}
                                /> : ''}
                        </div>
                    )
                }
            })(),
            mainStyle = {
                overflow: 'auto',
                overflowX: 'hidden',
                overflowY: 'auto',
                position: 'relative',
                backgroundColor: '#fff'
            },
            cellsWrapStyle = {
                overflow: 'hidden',
                width: '110%'
            },
            wrapStyle = {
                overflow: 'hidden',
                margin: '0 auto'
            };
        return (
            <div
                id = {this.state.id}
                className = {`__PM__ ${this.state.curSize}`}
                style = {mainStyle}
            >
                {sideBarController}
                <div
                    id = "__PM_WRAP__"
                    style = {wrapStyle}
                >
                    <div
                        id = "cells"
                        style = {cellsWrapStyle}
                    ></div>
                    <div id = "fixes"></div>
                    {this.props.children}
                </div>
                <div id = "__PM_Width_" title = "用来侦测可用宽度常量"></div>
            </div>
        )
    }
});
ReactRespond._ = {
    setSize: function (target, padding, type) {
        var _p = parseInt(padding);
        if (type == 'x') {
            var oldW = parseInt(target.style.width),
                newW = (oldW - _p) + 'px';
            target.style.width = newW
        } else if (type == 'y') {
            var windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                targetHeight = (windowH - _p) + 'px';
            target.forEach(function (t) {
                t.style.height = targetHeight
            })
        }
    },
    operateSize: function (parent, curSize, res) {
        var newSize = '';
        if (parent) {
            var _w = parent.offsetWidth;
            if (_w > res.lg.threshold) {
                if (curSize == 'lg') {
                    newSize = false
                } else {
                    newSize = 'lg'
                }
            } else if (_w > res.md.threshold) {
                if (curSize == 'md') {
                    newSize = false
                } else {
                    newSize = 'md'
                }
            } else if (_w > res.sm.threshold) {
                if (curSize == 'sm') {
                    newSize = false
                } else {
                    newSize = 'sm'
                }
            } else {
                if (curSize == 'xs') {
                    newSize = false
                } else {
                    newSize = 'xs'
                }
            }
        } else {
            newSize = false
        }
        return newSize
    },
    /**
     * 获得组件中现存的指定的fix类型组件
     * @param which [0,1,2,3]，0-3的整数的数组，对应上，右，下，左
     * @returns {Array}，[nodeTop, nodeRight, nodeBottom, nodeLeft]，返回获取到的dom节点，如果该位置没有节点则返回 undefined
     **/
    getFixes: function (which) {
        var top = document.getElementsByClassName('PMFixTop'),
            right = document.getElementsByClassName('PMFixRight'),
            bottom = document.getElementsByClassName('PMFixBottom'),
            left = document.getElementsByClassName('PMFixLeft');
        if (top && top.length > 1) {
            console.error('fixes的元素同一方向只允许存在一个，top方向有多个fixes元素存在')
        }
        if (right && right.length > 1) {
            console.error('fixes的元素同一方向只允许存在一个，right方向有多个fixes元素存在')
        }
        if (bottom && bottom.length > 1) {
            console.error('fixes的元素同一方向只允许存在一个，bottom方向有多个fixes元素存在')
        }
        if (left && left.length > 1) {
            console.error('fixes的元素同一方向只允许存在一个，left方向有多个fixes元素存在')
        }
        var getF = function (node, i) {
            switch (i) {
                case 0:
                    node[0] = top[0] || false;
                    break;
                case 1:
                    node[1] = right[0] || false;
                    break;
                case 2:
                    node[2] = bottom[0] || false;
                    break;
                case 3:
                    node[3] = left[0] || false;
                    break;
                default:
                    throw new Error('方法：getFixes，参数：which，是个只能包含0-3之间整数的数组，或者为空')
            }
        };
        var node = [];
        if (which && which.length > 0) {
            for (var a = 0; a < which.length; a++) {
                getF(node, which[a])
            }
        } else {
            var _witch = [0, 1, 2, 3];
            for (var b = 0; b < _witch.length; b++) {
                getF(node, _witch[b])
            }
        }
        return node;
    },
    insertClear: function (cells, before) {
        var clearElm = document.createElement('div');
        clearElm.style.clear = 'both';
        clearElm.className = '_clear_';
        cells.insertBefore(clearElm, cells.children[before])
    },
    removeClear: function (cells, n) {
        cells.removeChild(cells.children[n])
    },
    getRespond: function (base, _import, cb) {
        var clone = (function () {
            var _c = {};
            for (var _b in base) {
                if (base.hasOwnProperty(_b)) {
                    _c[_b] = base[_b]
                }
            }
            return _c
        })();
        for (var _r in clone) {
            if (clone.hasOwnProperty(_r) && _import[_r]) {
                for (var __r in clone[_r]) {
                    if (clone[_r].hasOwnProperty(__r) && _import[_r][__r]) {
                        if (_import[_r][__r]) {
                            clone[_r][__r] = _import[_r][__r]
                        }
                    }
                }
            }
        }
        if (typeof cb == 'function') {
            cb(clone)
        }
        return clone
    },
    respond: {
        lg: {
            threshold: 1600,
            width: .8,
            potion: 0,
            unifySize: 0,
            hideSideBar: false
        },
        md: {
            threshold: 1280,
            width: .9,
            potion: 0,
            unifySize: 0,
            hideSideBar: false
        },
        sm: {
            threshold: 768,
            width: 0,
            potion: 2,
            unifySize: 1,
            hideSideBar: true
        },
        xs: {
            threshold: 0,
            width: 0,
            potion: 1,
            unifySize: 1,
            hideSideBar: true
        }
    }
};
ReactRespond._var = {
    _scrollTop: 0
};
var SwitchBtn = React.createClass({
    getInitialState: function () {
        var defaultId = 'switchB_' + (SwitchBtn.defaultIdIndex++);
        return {
            id: this.props.id || defaultId,
            show: this.props.show || false,
            icoPos: this.props.icoPos || 'right',
            style: this.props.style || {},
            title: this.props.title || '',
            left: this.props.left,
            right: this.props.right,
            top: this.props.top,
            bottom: this.props.bottom,
            gbc: this.props.gbc || 'transparent',
            type: this.props.type,
            visible: this.props.visible !== false
        }
    },
    componentWillReceiveProps: function (nextProp) {
        var show = nextProp.show;
        if (show) {
            this.open()
        } else if (show === false) {
            this.close()
        }
        this.setState({
            icoPos: nextProp.icoPos || 'right',
            title: nextProp.title || '',
            top: nextProp.top,
            right: nextProp.right,
            bottom: nextProp.bottom,
            left: nextProp.left,
            gbc: nextProp.gbc || 'transparent',
            type: nextProp.type,
            visible: nextProp.visible !== false
        })
    },
    trigger: function (e) {
        e.preventDefault();
        var type = this.state.type;
        if (!this.state.show) {
            this.open(type)
        } else {
            this.close(type)
        }
    },
    open: function (type) {
        if (!this.state.show) {
            this.willOpen(type);
            this.setState({
                show: true
            }, function () {
                this.opened(type)
            })
        }
    },
    close: function (type) {
        if (this.state.show) {
            this.willClose(type);
            this.setState({
                show: false
            }, function () {
                this.closed(type)
            })
        }
    },
    willOpen: function (type) {
        if (typeof this.props.willOpen == 'function') {
            this.props.willOpen(type)
        }
    },
    opened: function (type) {
        if (typeof this.props.opened == 'function') {
            this.props.opened(type)
        }
    },
    willClose: function (type) {
        if (typeof this.props.willClose == 'function') {
            this.props.willClose(type)
        }
    },
    closed: function (type) {
        if (typeof this.props.closed == 'function') {
            this.props.closed(type)
        }
    },
    render: function () {
        var style = SwitchBtn.style,
            mainStyle = {
                position: 'fixed',
                top: this.state.top + 'px',
                left: this.state.left + 'px',
                bottom: this.state.bottom + 'px',
                right: this.state.right + 'px',
                zIndex: 99999,
                backgroundColor: this.state.gbc,
                display: this.state.visible ? '' : 'none'
            },
            btnStyle = this.state.icoPos == 'right' ? style.btn : _assign(style.btn, style.icoLeftBtn),
            lineStyle = this.state.icoPos == 'right' ? style.lineWrap : _assign(style.lineWrap, style.icoLeftLineWrap),
            lineStyleTop = this.state.show ? _assign(style.line, style.lineRotateTop) : style.line,
            lineStyleBottom = this.state.show ? _assign(style.line, style.line2, style.lineRotateBottom) : _assign(style.line, style.line2),
            btnClassName = this.state.show ? 'toClose' : 'toOpen';
        return (
            <div
                id = {this.state.id}
                style = {mainStyle}
            >
                <a href = "###"
                   className = {btnClassName}
                   onClick = {this.trigger}
                   style = {btnStyle}
                   data-type = {this.state.type}
                >
                    {this.state.title}
                    <span
                        id = {`${this.state.id}_line`}
                        style = {lineStyle}
                    >
                        <i
                            id = {`${this.state.id}_lineTop`}
                            style = {lineStyleTop}
                        />
                        <i
                            id = {`${this.state.id}_lineBottom`}
                            style = {lineStyleBottom}
                        />
                    </span>
                </a>
            </div>
        )
    }
});
SwitchBtn.style = {
    btn: {
        display: 'block',
        lineHeight: '32px',
        height: '32px',
        padding: '0 32px 0 5px',
        color: '#333',
        fontSize: '12px',
        overflow: 'hidden',
        maxWidth: '64px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    icoLeftBtn: {
        padding: '0 5px 0 32px',
        textAlign: 'right'
    },
    lineWrap: {
        position: 'absolute',
        right: 0,
        top: 0,
        display: 'block',
        height: '32px',
        width: '32px'
    },
    icoLeftLineWrap: {
        right: 'auto',
        left: 0
    },
    line: {
        transition: '0.5s',
        position: 'absolute',
        left: '8px',
        top: '12px',
        display: 'block',
        height: '1px',
        width: '16px',
        backgroundColor: '#333'
    },
    line2: {
        top: '20px'
    },
    lineRotateTop: {
        transform: 'rotate(-315deg)',
        top: '16px',
        left: '10px'
    },
    lineRotateBottom: {
        transform: 'rotate(315deg)',
        top: '16px',
        left: '10px'
    }
};
SwitchBtn.defaultIdIndex = 0;
var _assign = function () {
    var args = arguments;
    var _finalObj = {};
    for (var i = 0; i < args.length; i++) {
        if (!!args[i] && typeof args[i] == 'object') {
            for (var o in args[i]) {
                if (args[i].hasOwnProperty(o)) {
                    _finalObj[o] = args[i][o]
                }
            }
        }
    }
    return _finalObj
};
ReactRespond.RRCell = RRCell;
ReactRespond.RRFix = RRFix;
ReactRespond.SwitchBtn = SwitchBtn;
module.exports = ReactRespond;