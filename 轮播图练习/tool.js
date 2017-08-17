
// 在这里写入，已经封装好的函数

// 在这里写入，已经封装好的函数

function getCss(ele, key) {
    //如果是变量则使用作用域的规则，如果是属性则使用属性的规则
    if( window.getComputedStyle ){
        var obj = getComputedStyle(ele, null);
        return obj[key];
    }else {
        return ele.currentStyle[key];
    }
}

function stop(ele) {
    //取消定时
    clearInterval(ele.timer);
    ele.timer = null;
}

function move(ele, attr, edge, callback) {

    // div: 目标对象
    // attr: 这次动画所关心的属性     字符串
    // edge: 动画停止的边界，达到什么样的目标
    // callback: 动画结束后该做什么
    // 示例：一个div 让他的宽度变化，当前的宽度是100，目标宽度是300，动画完成后打印‘动画完成了’
    // 动画的核心目标只有一个，那就是尽量去逼近目标状态
    // 如果在逼近的末尾，一不小心超过了目标值，那么就强制拽回来
    // var edge = 300; //结束的条件，目标状态

    var step = 10;
    if(ele.timer)
    {
        console.log('别闹，正在执行动画呢');
    }else {
        ele.timer = setInterval(function () {
            console.log('bbbbb');
            var current = getCss(ele, attr);
            current = parseInt(current);

            if(current < edge){
                //如果当前的状态小于目标状态，那么就努力的加
                current += step;
                ele.style[attr] = current + 'px';
                //如果因为变大导致了超越边界
                if(current >= edge){
                    //侦测当前是否结束
                    end(ele);
                }

            }else if(current > edge){
                //如果当前的状态大于目标状态，那么就努力的减
                current -= step;
                ele.style[attr] = current + 'px';
                //如果因为变小小导致了超越边界
                if(current <= edge){
                    //侦测当前是否结束
                    end(ele);
                }
            }else {
                //current == edge
                end(ele);
            }

            // div.style[attr] = current + 'px';



            //
            // if(current ??? edge){
            //     //侦测当前是否结束
            //     current = edge;   //强制拽回来
            //     div.style[attr] = current + 'px';
            //     stop();
            // }

            function end(ele) {
                current = edge;   //强制拽回来
                ele.style[attr] = current + 'px';
                stop(ele);
                if(callback && (typeof callback == 'function') ){
                    callback();
                }
            }
        }, 50);
    }

}










































//滚轮的方向：不管什么浏览器 只关心滚动的方向    向上：1  向下：-1
function getDirection(event)
{
    var result = 1;
    if(event.wheelDelta){
        if(event.wheelDelta > 0){
            result = 1;
        }else {
            result = -1;
        }
    }else {
        if(event.detail > 0){
            result = -1;
        }else {
            result = 1;
        }
    }

    return result;
}








































