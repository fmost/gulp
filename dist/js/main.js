// placeholder
;$(function(){   
    //判断浏览器是否支持placeholder属性
    supportPlaceholder='placeholder'in document.createElement('input'), 
    placeholder=function(input){ 
      var text = input.attr('placeholder'),
      defaultValue = input.defaultValue; 
      if(!defaultValue){ 
        input.val(text).addClass("phcolor");
      } 
      input.focus(function(){   
        if(input.val() == text){     
          $(this).val("");
        }
      });  
      input.blur(function(){   
        if(input.val() == ""){         
          $(this).val(text).addClass("phcolor");
        }
      }); 
      //输入的字符不为灰色
      input.keydown(function(){  
        $(this).removeClass("phcolor");
      });
    }; 
    //当浏览器不支持placeholder属性时，调用placeholder函数
    if(!supportPlaceholder){
      $('input').each(function(){   
        text = $(this).attr("placeholder");   
        if($(this).attr("type") == "text" || $(this).attr("type") == "password"){   
          placeholder($(this));
        }
      });
    } 
});
//ui select 选择组件
var select = function() {
    $(document).on({
        mouseenter: function() {
            $(this).addClass('ui-select--expand').css("z-index", "6"),
            $(this).parents('.item').css('z-index','6'),
            $(this).find('.option-grp').show()
            //$(this).parents('dl.item').css("z-index", "6") // 修复层级遮挡
        },
        mouseleave: function() {
            $(this).removeClass('ui-select--expand').css("z-index", "5"),
            $(this).parents('.item').css('z-index','1')
            $(this).find('.option-grp').hide();
        }
    }, '.ui-select'),
    $(document).on('click', '.option', function() {
        var s = $(this).parents('.ui-select');
        s.find('.selected-txt').html($.trim($(this).html())),
            s.find('.option-grp').hide()
    })
}
select();
//下拉
;(function($){
    $.fn.dropDown = function(dropwrap,cls) {        
        dropwrap.mouseenter(function(){
            $(this).addClass(cls);
        }).mouseleave(function(){
            $(this).removeClass(cls);
        })
    }
})(jQuery);
// page

// 我的帖子页面我的勋章模块
var dropShadow = $(".drop-down-shadow"),
    dropShadowMenu = $(".drop-down-shadow-menu");
dropShadow.dropDown(dropShadow,'drop-down-shadow-hover');
;(function($) {
    var max = Math.max,
        min = Math.min;
    $.bubble = $.pureToolTips = function(options) {
        var opts = $.extend({
            target      : null,     //鐩爣鍏冪礌锛屼笉鑳戒负绌�
            position    : 't',      //鎻愮ず妗嗙浉瀵圭洰鏍囧厓绱犱綅缃� t=top,b=bottom,r=right,l=left
            align       : 'c',      //鎻愮ず妗嗕笌鐩爣鍏冪礌鐨勫榻愭柟寮忥紝鑷姩璋冭妭绠ご鏄剧ず浣嶇疆锛屾寚鍚戠洰鏍囧厓绱犱腑闂翠綅缃紝c=center, t=top, b=bottom, l=left, r=right [postion=t|b鏃讹紝align=l|r鏈夋晥][position=t|b鏃讹紝align=t|d鏈夋晥]
            arrow       : true,     //鏄惁鏄剧ず绠ご
            content     : '',       //鍐呭
            width       : 200,      //瀹藉害
            height      : 'auto',   //楂樺害
            autoClose   : true,     //鏄惁鑷姩鍏抽棴
            time        : 2000,     //鑷姩鍏抽棴寤舵椂鏃堕暱
            leaveClose  : false,    //鎻愮ず妗嗗け鍘荤劍鐐瑰悗鍏抽棴
            close       : null, //鍏抽棴鍥炶皟鍑芥暟
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
            //鐩稿浣嶇疆姝ｅソ and 绠ご鏂瑰悜鐩稿弽
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
            arrow && autoAdjust();          //璁剧疆绠ご鑷姩灞呬腑
            $bubble.css(setPos()).show();       //璁剧疆鏄剧ず妗嗕綅缃拰鑷姩闅愯棌浜嬩欢
            opts.leaveClose && leaveClose();//绂诲紑鍏抽棴
            opts.autoClose && !opts.leaveClose && autoClose(opts.timeout);  //榛樿鑷姩鍏抽棴锛屼紭鍏堢寮�鍏抽棴
            return $bubble
        }
        //璁＄畻鎻愮ず妗嗗簲璇ュ嚭鐜板湪鐩爣鍏冪礌浣嶇疆
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
        //璁剧疆绠ご鑷姩灞呬腑
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
            //涓婁笅渚э紝宸﹀彸瀵归綈
            function alignLR() {
                if (align === 'l' && width / 2 > bw && width / 2 < w - bw) {
                    aop.left = width / 2 - bw / 2
                } else if (align === 'r' && width / 2 > bw && width / 2 < w - bw) {
                    aop.left = w - width / 2 - bw / 2
                }
            }
            //宸﹀彸渚э紝涓婁笅瀵归綈
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
// 滚动
 $.fn.rollGallery = function (options) {
    var defaults = {
        direction: "top",
        speed: 3000,
        childrenSel: "li"
    };
    var opts = $.extend({}, defaults, options);
    return this.each(function () {
        var _this = $(this);
        var step = 0;
        var animateArgu = new Object();
        _this.intervalRGallery = null;
        step = _this.children(opts.childrenSel).eq(0).outerHeight(true);
        if(_this.outerHeight(true) == step){
            clearInterval(_this.intervalRGallery);
        }
        else{
            _this.mouseover(function () {
                clearInterval(_this.intervalRGallery);
            });
            _this.mouseout(function () {
                _this.intervalRGallery = setInterval(function () {
                    animateArgu[opts.direction] = -step;
                    _this.animate(animateArgu, 'slow', function () {
                        _this.children(opts.childrenSel).slice(0, 1).appendTo(_this);
                        _this.css(opts.direction, "0px");
                    });
                }, opts.speed);
            });
            _this.mouseout();                
        }            
    });
};
// placeholder
;$(function(){
    //判断浏览器是否支持placeholder属性
    supportPlaceholder='placeholder'in document.createElement('input'), 
    placeholder=function(input){ 
      var text = input.attr('placeholder'),
      defaultValue = input.defaultValue; 
      if(!defaultValue){ 
        input.val(text).addClass("phcolor");
      } 
      input.focus(function(){   
        if(input.val() == text){     
          $(this).val("");
        }
      });  
      input.blur(function(){   
        if(input.val() == ""){         
          $(this).val(text).addClass("phcolor");
        }
      }); 
      //输入的字符不为灰色
      input.keydown(function(){  
        $(this).removeClass("phcolor");
      });
    }; 
    //当浏览器不支持placeholder属性时，调用placeholder函数
    if(!supportPlaceholder){
      $('input').each(function(){   
        text = $(this).attr("placeholder");   
        if($(this).attr("type") == "text" || $(this).attr("type") == "password"){   
          placeholder($(this));
        }
      });
    } 
});
//ui select 选择组件
var select = function() {
    $(document).on({
        mouseenter: function() {
            $(this).addClass('ui-select--expand').css("z-index", "6"),
            $(this).parents('.item').css('z-index','6'),
            $(this).find('.option-grp').show()
            //$(this).parents('dl.item').css("z-index", "6") // 修复层级遮挡
        },
        mouseleave: function() {
            $(this).removeClass('ui-select--expand').css("z-index", "5"),
            $(this).parents('.item').css('z-index','1')
            $(this).find('.option-grp').hide();
        }
    }, '.ui-select'),
    $(document).on('click', '.option', function() {
        var s = $(this).parents('.ui-select');
        s.find('.selected-txt').html($.trim($(this).html())),
            s.find('.option-grp').hide()
    })
}
select();
 ;(function($){
    //获取url中的参数
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    };
    //tab
    $.fn.tabPlug = function (options) {
        var opts = $.extend({
        }, $.fn.tabPlug.defaults, options);
        return this.each(function (i) {
            var _this = $(this);
            var $menus = _this.children(opts.menuChildSel);
            var $container = $(opts.cntSelect).eq(i);
            var $timer;
            if (!$container)
            return;
            $menus.on(opts.eventName,function () {
                clearTimeout($timer);
                var index = $menus.index($(this));
                var _this = $(this);
                if(!_this.hasClass(opts.filterGoTo)){
                    $timer = setTimeout(function(){
                        _this.addClass(opts.onStyle).siblings().removeClass(opts.onStyle);
                        if (!($container.children(opts.cntChildSel).eq(index).is(':animated'))) {
                                $container.children(opts.cntChildSel).eq(index).siblings().css('display', 'none').end().stop(true, true).fadeIn(opts.aniSpeed);
                        }
                    }, 130);
                }
            });
            if(opts.actTo && $.getUrlParam('actEle')){
                var actEle = $.getUrlParam('actEle').split(',');
                var actTo = $.getUrlParam('actTo').split(',');
                for (var i=0;i<actEle.length;i++) {
                    $('#'+actEle[i]).find(opts.menuChildSel).eq(actTo[i]).addClass(opts.onStyle).siblings().removeClass(opts.onStyle);
                    $('#'+actEle[i]).find(opts.cntChildSel).eq(actTo[i]).siblings().css('display', 'none').end().stop(true, true).fadeIn(opts.aniSpeed);
                }
            }
        });

    };
    $.fn.tabPlug.defaults = {
        cntSelect: '',
        aniSpeed: 'fast',
        onStyle: 'selected',
        menuChildSel: '*',
        cntChildSel: '*',
        eventName: null,
        actTo: false, //通过url锁定tab
        filterGoTo:null //允许跳转链接class
    };
})(jQuery);