/**
 * Created by hp on 2017/7/6.
 */
/*
window.onload = function () {
    var ul = document.querySelector('ul.content');
    var imgCount = ul.children.length;
    var imgWidth = 700;
    var time = 1200;
    var intervalTime = 30;

    setInterval(function () {
        move();
    },3000)

    function move() {
        var offset = -imgWidth;
        var step = offset/(time/intervalTime);
        var currentLeft = parseInt(getCss(ul,'left'));
        var targetLeft = currentLeft + offset;

        var timer = setInterval(function () {
            currentLeft +=step;

            if (currentLeft === targetLeft){
                clearInterval(timer);
            }
            if (currentLeft === (imgCount-1)*offset){
                currentLeft = 0;
            }

            ul.style.left = currentLeft + 'px';
        },intervalTime)
    }

}*/

$(function () {
    var $frame = $('div.frame');
    var $ul = $('ul.content');
    var $points = $('#pointsDiv span');
    var POINTS = $points.length;
    var IMG_WIDTH = 700;
    var $prev = $('#prev');
    var $next = $('#next');
    var time = 600;
    var intervalTime = 3;
    var index = 0;
    var moving = false;

    $next.click(function () {
        nextPage(true);
    })
    $prev.click(function () {
        nextPage(false);
    })

    $points.click(function () {
        var clickIndex = $(this).index();
        if (clickIndex != index){
            nextPage(clickIndex);
        }
    })

    var autoIntervalId = setInterval(function () {
        nextPage(true)
    },3000)

    $frame.hover(function () {
        clearInterval(autoIntervalId);
    },function () {
        autoIntervalId = setInterval(function () {
            nextPage(true)
        },3000)
    })

    function nextPage(next) {
        if (moving){
            return;
        }
        var offsetLeft = 0;
        if (typeof next === 'boolean') {
            offsetLeft = next ? -IMG_WIDTH : IMG_WIDTH;
        }else {
            offsetLeft = -(next-index)*IMG_WIDTH;
        }
        var currentLeft = $ul.position().left;
        var targetLeft = currentLeft + offsetLeft;
        var step = offsetLeft/(time/intervalTime);

        moving = true;
        var intervalId = setInterval(function () {
            currentLeft +=step;

            if (currentLeft === targetLeft){
                clearInterval(intervalId);
                moving = false;
            }
            if (currentLeft === -(POINTS+1)*IMG_WIDTH){
                currentLeft = -IMG_WIDTH;
            }else if (currentLeft === 0){
                currentLeft = -POINTS*IMG_WIDTH;
            }

            $ul.css('left',currentLeft);
        },intervalTime)

        updatePoints(next);
    }

    function updatePoints(next) {
        var targetIndex =0;
        if (typeof next === 'boolean') {
            targetIndex = index + (next ? 1 : -1);
        }else {
            targetIndex = next;
        }

        if (targetIndex > POINTS-1){
            targetIndex = 0;
        }else if (targetIndex < 0){
            targetIndex = POINTS -1;
        }

        $points.eq(targetIndex).addClass('on');
        $points.eq(index).removeClass('on');
        index = targetIndex;
    }




})
