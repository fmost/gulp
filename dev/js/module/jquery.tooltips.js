;(function($) {
    var max = Math.max,
        min = Math.min;
    $.bubble = $.pureToolTips = function(options) {
        var opts = $.extend({
            target      : null,     //目标元素，不能为空
            position    : 't',      //提示框相对目标元素位置 t=top,b=bottom,r=right,l=left
            align       : 'c',      //提示框与目标元素的对齐方式，自动调节箭头显示位置，指向目标元素中间位置，c=center, t=top, b=bottom, l=left, r=right [postion=t|b时，align=l|r有效][position=t|b时，align=t|d有效]
            arrow       : true,     //是否显示箭头
            content     : '',       //内容
            width       : 200,      //宽度
            height      : 'auto',   //高度
            autoClose   : true,     //是否自动关闭
            time        : 2000,     //自动关闭延时时长
            leaveClose  : false,    //提示框失去焦点后关闭
            close       : null, //关闭回调函数
            skin        : 1
        }, options || {}),
            $ao, $ai, w, h, $bubble = $('.bubble'),
            $target = $(opts.target),
            top = $target.offset().top,
            left = $target.offset().left,
            width = $target.outerWidth(),
            height = $target.outerHeight(),
            position = opts.position,
            align = opts.align,
            arrow = opts.arrow,
            //相对位置正好 and 箭头方向相反
            constant = {
                b: 'bubble-up',
                t: 'bubble-down',
                r: 'bubble-left',
                l: 'bubble-right'
            },
            arrowClass = constant[position] || constant.t;

        function init() {
            if (!opts.target) {
                return
            }
            if (!$bubble.length) {
                $bubble = $('<div class="bubble bubble-down"><div class="cont"></div><b class="arrow-out"></b><b class="arrow-in"></b></div>').appendTo(document.body)
            }
            $bubble.removeClass().addClass('bubble ' + (arrow ? arrowClass : '')).addClass('skin-' + opts.skin).find('.cont').html(opts.content).css({
                width: opts.width,
                height: opts.height
            });
            $ao = $bubble.find('.arrow-out').toggle(arrow);
            $ai = $bubble.find('.arrow-in').toggle(arrow);
            typeof opts.callback == 'function' && opts.callback();
            w = $bubble.outerWidth();
            h = $bubble.outerHeight();
            arrow && autoAdjust();          //设置箭头自动居中
            $bubble.css(setPos()).show();       //设置显示框位置和自动隐藏事件
            opts.leaveClose && leaveClose();//离开关闭
            opts.autoClose && !opts.leaveClose && autoClose(opts.timeout);  //默认自动关闭，优先离开关闭
            return $bubble
        }
        //计算提示框应该出现在目标元素位置
        function setPos() {
            var btw = arrow ? parseInt($ao.css('border-top-width'), 10) : 3,
                brw = arrow ? parseInt($ao.css('border-right-width'), 10) : 3,
                result = {};
            switch (align) {
            case 'c':
                break;
            case 't':
                result.top = top;
                break;
            case 'b':
                result.top = top + height - h;
                break;
            case 'l':
                result.left = left;
                break;
            case 'r':
                result.left = left + width - w;
                break
            }
            switch (position) {
            case 't':
                result.top = top - h - brw;
                break;
            case 'b':
                result.top = top + height + brw;
                break;
            case 'l':
                result.left = left - w - btw;
                break;
            case 'r':
                result.left = left + width + btw;
                break
            }
            result.top || (result.top = top + height / 2 - h / 2);
            result.left || (result.left = left + width / 2 - w / 2);
            return result
        }
        //设置箭头自动居中
        function autoAdjust() {
            var aop, aip, bw, auto = 'auto';
            switch (position) {
            case 't':
                bw = parseInt($ao.css('border-top-width'), 10);
                aop = {
                    bottom: -bw,
                    left: w / 2 - bw,
                    top: auto,
                    right: auto
                };
                alignLR();
                aip = {
                    top: auto,
                    left: aop.left + 1,
                    bottom: aop.bottom + 1,
                    right: auto
                };
                break;
            case 'b':
                bw = parseInt($ao.css('border-bottom-width'), 10);
                aop = {
                    top: -bw,
                    left: w / 2 - bw,
                    right: auto,
                    bottom: auto
                };
                alignLR();
                aip = {
                    top: aop.top + 1,
                    left: aop.left + 1,
                    bottom: auto,
                    right: auto
                };
                break;
            case 'l':
                bw = parseInt($ao.css('border-left-width'), 10);
                aop = {
                    top: h / 2 - bw,
                    right: -bw,
                    left: auto,
                    bottom: auto
                };
                alignTB();
                aip = {
                    top: aop.top + 1,
                    right: aop.right + 1,
                    left: auto,
                    bottom: auto
                };
                break;
            case 'r':
                bw = parseInt($ao.css('border-right-width'), 10);
                aop = {
                    top: h / 2 - bw,
                    left: -bw,
                    right: auto,
                    bottom: auto
                };
                alignTB();
                aip = {
                    top: aop.top + 1,
                    left: aop.left + 1,
                    right: auto,
                    bottom: auto
                };
                break
            }
            //上下侧，左右对齐
            function alignLR() {
                if (align === 'l' && width / 2 > bw && width / 2 < w - bw) {
                    aop.left = width / 2 - bw / 2
                } else if (align === 'r' && width / 2 > bw && width / 2 < w - bw) {
                    aop.left = w - width / 2 - bw / 2
                }
            }
            //左右侧，上下对齐
            function alignTB() {
                if (align === 't' && height / 2 > bw && height / 2 < h - bw) {
                    aop.top = height / 2 - bw
                } else if (align === 'b' && height / 2 > bw && height / 2 < h - bw) {
                    aop.top = h - height / 2 - bw
                }
            }
            $ao.css(aop);
            $ai.css(aip)
        }
        function autoClose() {
            window.ptt && clearTimeout(ptt);
            window.pta && clearTimeout(pta);
            window.pta = setTimeout(function() {
                $bubble.hide();
                $.isFunction(opts.close) && opts.close()
            }, opts.time)
        }
        function leaveClose() {
            $bubble.unbind('mouseleave').mouseleave(function(e) {
                $bubble.hide();
                $.isFunction(opts.close) && opts.close()
            }).unbind('mouseenter').mouseenter(function() {
                window.ptt && clearTimeout(ptt)
            })
        }
        return init()
    };
    $.fn.bubble = $.fn.pureToolTips = function(options) {
        var opts = $.extend({
            leaveClose: true
        }, options || {});
        return this.each(function() {
            $(this).mouseenter(function() {
                window.ptt && clearTimeout(ptt);
                window.pta && clearTimeout(pta);
                opts.target = this;
                $.bubble(opts)
            }).mouseleave(function() {
                window.ptt = setTimeout(function() {
                    $('.bubble').hide();
                    $.isFunction(opts.close) && opts.close()
                }, 500)
            })
        })
    }
})(jQuery);