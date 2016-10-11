import React from 'react';
export class PMCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: this.props.size || 1,
            bgc: this.props.bgc || '#f5f5f5',
            style: this.props.style
        }
    }

    componentWillReceiveProps(nextProp) {
        this.setState({
            size: nextProp.size || 1,
            bgc: nextProp.bgc || '#f5f5f5',
            style: nextProp.style
        })
    }

    render() {
        const cellWrapStyle = {
                float: 'left',
                backgroundColor: this.state.bgc
            },
            cellContStyle = {
                ...this.state.style,
                overflowY: 'auto',
                height: '100%',
                width: '100%'
            };
        return (
            <div
                className = 'PMCell'
                style = {cellWrapStyle}
                data-size = {this.state.size}
            >
                <div
                    style = {cellContStyle}
                >
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export class PMFix extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type || 'Top',
            width: this.props.width,
            height: this.props.height,
            visible: this.props.defaultVisible !== false,
            pin: this.props.pin || false,
            style: this.props.style,
            bgc: this.props.bgc || '#ddd'
        }
    }

    componentWillReceiveProps(nextProp) {
        this.setState({
            type: nextProp.type || 'Top',
            width: nextProp.width,
            height: nextProp.height,
            pin: nextProp.pin || false,
            style: nextProp.style,
            bgc: nextProp.bgc || '#ddd'
        })
    }

    render() {
        const type = ((type) => {
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
            isShow = this.state.visible ? 'block' : 'none',
            style = {
                height: '100%',
                ...this.state.style
            };
        return (
            <div
                id = {`PMFix${type}`}
                className = {`PMFix${type} PMFixes`}
                style = {{
                width: this.state.width || 'auto',
                height: this.state.height || 'auto',
                position: 'fixed',
                zIndex: 9999,
                display: isShow,
                backgroundColor: this.state.bgc
            }}
                data-visible = {this.state.visible}
                data-type = {this.state.type}
            >
                <div
                    id = {`_PMFix${type}`}
                    style = {{
                    height: '100%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    margin: '0 auto'
                }}
                >
                    <div
                        id = {`__PMFix${type}`}
                        style = {style}
                    >
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
export class Placement extends React.Component {
    static _ = {
        setSize(self) {
            const topDisSelf = self.offsetTop,
                windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            self.style.height = (windowH - topDisSelf) + 'px';
        },
        operateSize(parent, curSize, res) {
            let newSize = '';
            if (parent) {
                const _w = parent.offsetWidth;
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
         */
        getFixes (which) {
            const top = document.getElementsByClassName('PMFixTop'),
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
            const getF = (node, i)=> {
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
            let node = [];
            if (which && which.length > 0) {
                for (let i = 0; i < which.length; i++) {
                    getF(node, which[i])
                }
            } else {
                const _witch = [0, 1, 2, 3];
                for (let i = 0; i < _witch.length; i++) {
                    getF(node, _witch[i])
                }
            }
            return node;
        },
        insertClear(cells, before){
            const clearElm = document.createElement('div');
            clearElm.style.clear = 'both';
            clearElm.className = '_clear_';
            cells.insertBefore(clearElm, cells.children[before])
        },
        removeClear(cells, n){
            cells.removeChild(cells.children[n])
        },
        getRespond(base, _import, cb){
            const clone = (() => {
                const _c = {};
                for (let _b in base) {
                    if (base.hasOwnProperty(_b)) {
                        _c[_b] = base[_b]
                    }
                }
                return _c
            })();
            for (let _r in clone) {
                if (clone.hasOwnProperty(_r) && _import[_r]) {
                    for (let __r in clone[_r]) {
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
    static _var = {
        switchId_index: 0,
        _scrollTop: 0
    };

    constructor(props) {
        super(props);
        //合并用户自定义的响应式参数
        const respond = Placement._.getRespond(Placement._.respond, this.props.respond);
        this.state = {
            id: this.props.id || '__PM__',
            margin: this.props.margin || 0,
            potion: this.props.potion || 12,
            sameHeight: this.props.sameHeight || 'auto',
            respond: respond,
            style: this.props.style,
            curSize: '',
            sameSize: this.props.sameSize || 'auto',
            allowControlSideBar: this.props.allowControlSideBar !== false
        };
        this.needSetting = this.needSetting.bind(this);
        this.setFixedCells = this.setFixedCells.bind(this)
    }

    componentWillMount() {
        this.onLoading()
    }

    componentWillReceiveProps(nextProp) {
        const respond = Placement._.getRespond(Placement._.respond, nextProp.respond);
        this.setState({
            margin: nextProp.margin,
            sameHeight: nextProp.sameHeight,
            style: nextProp.style,
            respond: respond,
            allowControlSideBar: nextProp.allowControlSideBar !== false
        }, function () {
            this.needSetting();
        })
    }

    setCell() {
        const cellsWrap = document.getElementById('cells'),
            cells = cellsWrap.childNodes,
            fixes = document.getElementById('fixes'),
            wrapW = Math.round(fixes.offsetWidth),
            potion = this.state.potion,
            margin = this.state.margin,
            height = typeof this.state.sameHeight !== 'number' ? this.state.sameHeight : this.state.sameHeight + 'px',
            cellUnit = Math.floor((wrapW - ((potion + 1) * margin)) / potion),
            setCellWidth = (size) => {
                return (cellUnit * size) + (margin * (size - 1)) + 'px'
            };
        let count = 0,
            needClear = [],
            removeClear = [];
        //先删除所有clear元素
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].className == '_clear_') {
                removeClear.push(i)
            }
        }
        if (removeClear.length > 0) {
            removeClear.forEach((o, i) => {
                Placement._.removeClear(cellsWrap, (o - i))
            })
        }
        for (let i = 0; i < cells.length; i++) {
            let size = this.state.sameSize == 'auto' ? parseInt(cells[i].dataset.size) : this.state.sameSize;
            if (size > potion) size = potion;
            if (cells[i].className != '_clear_') {
                cells[i].style.width = setCellWidth(size);
                cells[i].style.marginTop = margin + 'px';
                cells[i].style.marginLeft = margin + 'px';
                cells[i].style.height = height;
            }
            if (potion < count + size) {
                let poor = potion - count;
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
            needClear.forEach((o, i) => {
                Placement._.insertClear(cellsWrap, (o + i))
            })
        }
    }

    setFixedCells(self, wrap, curSize) {
        const node = Placement._.getFixes(),
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
        let fixProps = this.state.fixProps;
        const pds = (() => {
            if (fixProps == undefined) {
                fixProps = {
                    count: 0,
                    ready: false
                }
            } else {
                fixProps.ready = true
            }
            const fixedHeightY = (() => {
                    let _h = selfH;
                    if (node[0]) {
                        _h -= node[0].offsetHeight
                    }
                    if (node[2]) {
                        _h -= node[2].offsetHeight
                    }
                    return _h
                })(),
                _top = node[0] && (node[0].offsetHeight + 'px') || 0;
            return node.map((n, i) => {
                if (n) {
                    const defaultVisible = n.dataset.visible == 'true',
                        height = n.offsetHeight;
                    switch (i) {
                        case 0:
                            const topWrap = document.getElementById('_PMFixTop');
                            topWrap.style.width = wrapWidth;
                            n.style.left = 0;
                            n.style.top = 0;
                            n.style.width = _wrapW + 'px';
                            if (!fixProps.top) {
                                fixProps.top = {
                                    visible: defaultVisible,
                                    pin: false
                                };
                                fixProps.count += 1;
                                n.style.display = defaultVisible ? '' : 'none';
                            } else {
                                n.style.display = fixProps.top.visible;
                            }
                            return height + 'px';
                        case 2:
                            const bottomWrap = document.getElementById('_PMFixBottom');
                            bottomWrap.style.width = wrapWidth;
                            n.style.left = 0;
                            n.style.bottom = 0;
                            n.style.width = _wrapW + 'px';
                            if (!fixProps.bottom) {
                                fixProps.bottom = {
                                    visible: defaultVisible,
                                    pin: false
                                };
                                fixProps.count += 1;
                                n.style.display = defaultVisible ? '' : 'none';
                            } else {
                                n.style.display = fixProps.bottom.visible
                            }
                            return height + 'px';
                        case 1:
                            const rightSwitchBtn = document.getElementById('rightSwitchBtn'),
                                scrollWidth = document.getElementById('__PM__').offsetWidth - _wrapW;
                            rightSwitchBtn ? rightSwitchBtn.style.right = _wrapWidth !== 'auto' ? (marginLeft + scrollWidth) + 'px' : scrollWidth + 'px' : '';
                            rightSwitchBtn ? rightSwitchBtn.style.top = '10px' : '';
                            n.style.right = _wrapWidth !== 'auto' ? (marginLeft + scrollWidth) + 'px' : scrollWidth + 'px';
                            n.style.top = _top;
                            n.style.height = fixedHeightY + 'px';
                            if (!fixProps.right) {
                                fixProps.right = {
                                    visible: defaultVisible,
                                    pin: curHideSide
                                };
                                fixProps.count += 1;
                                n.style.display = defaultVisible ? '' : 'none';
                            } else {
                                n.style.display = fixProps.right.visible ? '' : 'none';
                            }
                            return fixProps.right.pin ? 0 : n.offsetWidth + 'px';
                        case 3:
                            const leftSwitchBtn = document.getElementById('leftSwitchBtn');
                            leftSwitchBtn ? leftSwitchBtn.style.left = marginLeft + 'px' : '';
                            leftSwitchBtn ? leftSwitchBtn.style.top = '10px' : '';
                            n.style.left = marginLeft + 'px';
                            n.style.top = _top;
                            n.style.height = fixedHeightY + 'px';
                            if (!fixProps.left) {
                                fixProps.left = {
                                    visible: defaultVisible,
                                    pin: curHideSide
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
                fixProps
            });
        }
        wrap.style.padding = `0 ${pds[1]} ${margin}px ${pds[3]}`;
        self.style.padding = `${pds[0]} 0 ${pds[2]}`;
    }

    needSetting() {
        const self = document.getElementById(this.state.id),
            wrap = document.getElementById('__PM_WRAP__'),
            parent = self && self.parentNode || false,
            res = this.state.respond,
            potion = this.props.potion || 12,
            curSize = this.state.curSize;
        const _w = Placement._.operateSize(parent, curSize, res);
        if (_w && _w !== curSize) {
            this.setState({
                curSize: _w,
                potion: res[_w].potion !== 0 ? res[_w].potion : potion,
                sameSize: res[_w].unifySize !== 0 ? res[_w].unifySize : 'auto'
            }, function () {
                this.onRespond(_w, this.state.potion, this.state.sameSize)
            })
        }
        Placement._.setSize(self);
        this.setFixedCells(self, wrap, _w || curSize);
        this.setCell(self, wrap, _w || curSize)
    }

    onScroll(target, wrap) {
        const scrollTop = target.scrollTop,
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
            if (scrollTop > Placement._var._scrollTop) {
                if (typeof this.props.onScrollDown == 'function') this.props.onScrollDown(scrollTop)
            } else {
                if (typeof this.props.onScrollUp == 'function') this.props.onScrollUp(scrollTop)
            }
            if (typeof this.props.onScroll == 'function') this.props.onScroll(scrollTop)
        }
        Placement._var._scrollTop = scrollTop;
    }

    onLoading() {
        if (typeof this.props.onLoading == 'function') {
            this.props.onLoading()
        }
    }

    onLoaded() {
        if (typeof this.props.onLoaded == 'function') {
            this.props.onLoaded()
        }
    }

    opened(type) {
        const fixProps = this.state.fixProps;
        this.triggerSideBar(false, fixProps, type);
    }

    closed(type) {
        const fixProps = this.state.fixProps;
        this.triggerSideBar(true, fixProps, type);
    }

    triggerSideBar(need2hide, fixProps, type) {
        const targetId = `PMFix${type.substring(0, 1).toUpperCase()}${type.substring(1)}`,
            hasThis = document.getElementById(targetId);
        if (!!hasThis) {
            const curSize = this.state.curSize,
                isPin = Placement._.respond[curSize].hideSideBar;
            if (fixProps !== undefined) {
                if (!!need2hide) {
                    fixProps[type] = {
                        visible: false,
                        pin: true
                    };
                } else {
                    fixProps[type] = {
                        visible: true,
                        pin: isPin
                    };
                }
                this.setState({
                    fixProps
                }, function () {
                    this.needSetting()
                })
            }
        }
    }

    onRespond(type, potion, sameSize) {
        const fixProps = this.state.fixProps,
            hideSideBar = Placement._.respond[type].hideSideBar;
        this.triggerSideBar(hideSideBar, fixProps, 'left');
        this.triggerSideBar(hideSideBar, fixProps, 'right');
        if (typeof this.props.onRespond == 'function') {
            this.props.onRespond(type, potion, sameSize)
        }
    }

    getState() {
        console.log('当前state:', this.state);
    }

    componentDidMount() {
        const _this = this,
            wrap = document.getElementById('__PM_WRAP__'),
            children = wrap.children,
            __PM__ = document.getElementById(this.state.id),
            cellsWrap = document.getElementById('cells'),
            fixesWrap = document.getElementById('fixes'),
            regFix = /PMFix/,
            regCell = /PMCell/;
        //需要先将不同类型的子元素放入相应的元素类型的容器里
        while (children[2]) {
            const className = children[2].className;
            if (regCell.test(className)) {
                cellsWrap.appendChild(children[2]);
            } else if (regFix.test(className)) {
                fixesWrap.appendChild(children[2]);
            } else {
                document.getElementById('__PM_WRAP__').removeChild(children[2]);
                console.error('Placement组件中只能包含PMCell或者PMFix子组件，其余的组件或元素都会被删除');
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
    }

    render() {
        const sideBarController = ((context) => {
            const fixProps = context.state.fixProps;
            if (fixProps) {
                const hideSideBar = Placement._.respond[context.state.curSize].hideSideBar,
                    allowControlSideBar = context.state.allowControlSideBar,
                    fixLeft = fixProps.left,
                    fixRight = fixProps.right,
                    show = hideSideBar ? true : (allowControlSideBar ? true : false);
                return (
                    <div>
                        {(fixLeft && show) ?
                            <SwitchBtn
                                id = 'leftSwitchBtn'
                                icoPos = 'left'
                                show = {fixLeft.visible}
                                type = 'left'
                                opened = {context.opened.bind(context)}
                                closed = {context.closed.bind(context)}
                            /> : ''}
                        {(fixRight && show) ?
                            <SwitchBtn
                                id = 'rightSwitchBtn'
                                show = {fixRight.visible}
                                type = 'right'
                                opened = {context.opened.bind(context)}
                                closed = {context.closed.bind(context)}
                            /> : ''}
                    </div>

                )
            }
        })(this);
        return (
            <div
                id = {this.state.id}
                className = {`__PM__ ${this.state.curSize}`}
                style = {{
                overflow: 'auto',
                overflowX: 'hidden',
                overflowY: 'auto',
                position: 'relative',
                backgroundColor: '#fff'
            }}
                onClick = {this.getState.bind(this)}
            >
                {sideBarController}
                <div
                    id = "__PM_WRAP__"
                    style = {{
                    overflow: 'hidden',
                    margin: '0 auto'
                  }}
                >
                    <div
                        id = "cells"
                        style = {{
                        overflow:'hidden',
                        width: '110%'
                      }}
                    ></div>
                    <div id = "fixes"></div>
                    {this.props.children}
                </div>
                <div id = "__PM_Width_" title = "用来侦测可用宽度常量"></div>
            </div>
        )
    }
}
export class SwitchBtn extends React.Component {
    static style = {
        btn: {
            display: 'block',
            lineHeight: '32px',
            height: '32px',
            padding: '0 32px 0 5px',
            color: '#333',
            fontSize: '14px',
            overflow: 'hidden'
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

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id || `switchB_${Placement._var.switchId_index++}`,
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
    }

    componentWillReceiveProps(nextProps) {
        const show = nextProps.show;
        if (show) {
            this.open()
        } else if (show === false) {
            this.close()
        }
        this.setState({
            icoPos: this.props.icoPos || 'right',
            top: nextProps.top,
            right: nextProps.right,
            bottom: nextProps.bottom,
            left: nextProps.left,
            gbc: nextProps.gbc || 'transparent',
            type: this.props.type,
            visible: this.props.visible !== false
        })
    }

    trigger(e) {
        e.preventDefault();
        const type = this.state.type;
        if (!this.state.show) {
            this.open(type)
        } else {
            this.close(type)
        }
    }

    open(type) {
        if (!this.state.show) {
            this.willOpen(type);
            this.setState({
                show: true
            }, function () {
                this.opened(type)
            })
        }
    }

    close(type) {
        if (this.state.show) {
            this.willClose(type);
            this.setState({
                show: false
            }, function () {
                this.closed(type)
            })
        }
    }

    willOpen(type) {
        if (typeof this.props.willOpen == 'function') {
            this.props.willOpen(type)
        }
    }

    opened(type) {
        if (typeof this.props.opened == 'function') {
            this.props.opened(type)
        }
    }

    willClose(type) {
        if (typeof this.props.willClose == 'function') {
            this.props.willClose(type)
        }
    }

    closed(type) {
        if (typeof this.props.closed == 'function') {
            this.props.closed(type)
        }
    }

    render() {
        const style = SwitchBtn.style,
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
            btnStyle = this.state.icoPos == 'right' ? style.btn : {
                ...style.btn,
                ...style.icoLeftBtn
            },
            lineStyle = this.state.icoPos == 'right' ? {
                ...style.lineWrap
            } : {
                ...style.lineWrap,
                ...style.icoLeftLineWrap
            },
            lineStyleTop = this.state.show ? {...style.line, ...style.lineRotateTop} : {...style.line},
            lineStyleBottom = this.state.show ? {...style.line, ...style.line2, ...style.lineRotateBottom} : {...style.line, ...style.line2},
            btnClassName = this.state.show ? 'toClose' : 'toOpen';
        return (
            <div
                id = {this.state.id}
                style = {mainStyle}
            >
                <a href = "###"
                   className = {btnClassName}
                   onClick = {this.trigger.bind(this)}
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
}