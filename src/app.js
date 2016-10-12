/**
 * Created by zhaoxk on 2016/10/12.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlace from './react-place';
const RPCell = ReactPlace.RPCell,
    RPFix = ReactPlace.RPFix;
class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }

    onScrollTop() {
        console.log('到顶了')
    }

    onScrollBottom(n) {
        console.log('到底了', n)
    }

    onScrollUp(n) {
        console.log('上滚', n)
    }

    onScrollDown(n) {
        console.log('下滚', n)
    }

    /*onScroll(n){
     console.log('滚动中',n)
     }*/
    onLoading() {
        console.log('加载中...')
    }

    onLoaded() {
        console.log('加载完毕')
    }

    onRespond(a, b, c) {
        console.log('onRespond', a, b, c);
    }

    render() {
        const ds = {
                textAlign: 'center',
                lineHeight: '200px',
                height: '200px'
            },
            respond = {
                lg: {
                    width: .8
                }
            };
        return (
                <ReactPlace
                    margin = {5}
                    potion = {12}
                    respond = {respond}
                    onScrollTop = {this.onScrollTop.bind(this)}
                    onScrollBottom = {this.onScrollBottom.bind(this)}
                    onLoading = {this.onLoading.bind(this)}
                    onLoaded = {this.onLoaded.bind(this)}
                    onRespond = {this.onRespond.bind(this)}
                >
                    <RPCell
                        size = {6}
                    >
                        <div style = {ds}>size:6</div>
                    </RPCell>
                    <RPCell
                        size = {6}
                    >
                        <div style = {ds}>size:6</div>
                    </RPCell>
                    <RPCell
                        size = {8}
                    >
                        <div style = {ds}>size:8</div>
                    </RPCell>
                    <RPCell
                        size = {3}
                    >
                        <div style = {ds}>size:3</div>
                    </RPCell>
                    <RPCell
                        size = {10}
                    >
                        <div style = {ds}>size:10</div>
                    </RPCell>
                    <RPCell
                        size = {3}
                    >
                        <div style = {ds}>size:3</div>
                    </RPCell>
                    <RPCell
                        size = {3}
                    >
                        <div style = {ds}>size:3</div>
                    </RPCell>
                    <RPCell
                        size = {3}
                    >
                        <div style = {ds}>size:3</div>
                    </RPCell>
                    <RPFix
                        type = "Bottom"
                    >
                        <div style = {{
						lineHeight: '44px',
						height: '44px',
						textAlign: 'center'
					}}>底部
                        </div>
                    </RPFix>
                    <RPFix
                        type = "Left"
                        width = {180}
                        defaultVisible = {this.state.visible}
                        style = {{
						backgroundColor: '#ccc'
					}}
                        title = 'left'
                    >
                        <div
                            style = {ds}
                        >
                            这里是左侧边栏
                        </div>
                    </RPFix>
                    <RPFix
                        type = "Right"
                        width = {120}
                        style = {{
						backgroundColor: '#ccc'
					}}
                        title = '这里是右侧边栏'
                    >
                        <div
                            style = {ds}
                        >
                            这里是右侧边栏
                        </div>
                    </RPFix>
                    <RPFix
                        type = "Top"
                        style = {{
						backgroundColor: '#ddd'
					}}
                    >
                        <div style = {{
						lineHeight: '64px',
						height: '64px',
						textAlign: 'center',
						backgroundColor: '#ddd'
					}}>顶部
                        </div>
                    </RPFix>
                </ReactPlace>
        )
    }
}
const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<MainApp />, root);