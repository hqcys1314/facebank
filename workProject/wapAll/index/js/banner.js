
/*banner�ֲ�ͼ*/
(function(factory) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], factory);
    } else {
        factory(jQuery);
    }
})(function($) {
    var Plugin;
    Plugin = function() {
        function Plugin(elem, options) {
            this.elem = elem;
            this.$elem = $(elem);
            this.options = options;
            this.metadata = this.$elem.data("plugin-options");
        }
        return Plugin;
    }();
    Plugin.prototype = {
        defaults:{
            width:750,
            height:290,
            autoSize:true,
            touchNav:true,
            mouseNav:true,
            prevnextNav:true,
            prevnextAutoHide:true,
            pagerNav:true,
            startSlide:1,
            autoPlay:true,
            delay:0,
            interval:3e3,
            repeat:true,
            playReverse:false,
            hoverPause:true,
            captionAutoHide:false,
            animationCssTransitions:true,
            animationDuration:500,
            animationTimingFunction:"linear",
            prevButtonClass:"slide-prev",
            nextButtonClass:"slide-next",
            activeSlideClass:"es-active",
            slideCaptionClass:"es-caption",
            pagerClass:"es-pager"
        },
        init:function() {
            var base, maxHeight, $prev, $next, $buttons, $innerBase, caption, $wrapper, $children, $container;
            base = this;
            base.config = $.extend({}, base.defaults, base.options, base.metadata);
            base.actionClick = {
                action:false,
                x:0,
                y:0
            };
            base.currClick = {
                x:0,
                y:0
            };
            base.data = $.data(base);
            $.data(base, "currentSlide", base.config.playReverse && base.config.startSlide == 1 ? base.$elem.children().length - 1 :base.config.startSlide - 1);
            $.data(base, "nextSlide", base.data.currentSlide);
            $.data(base, "totalslides", base.$elem.children().length);
            $.data(base, "browserEnginePrefix", base._getBrowserEnginePrefix());
            $.data(base, "isPlaying", false);
            $.data(base, "isAnimating", false);
            $.data(base, "playPaused", false);
            $.data(base, "justTouched", false);
            $.data(base, "isMoving", false);
            $.data(base, "width", base.config.width);
            base.$elem.addClass("slider");
            base.$elem.css({
                position:"relative"
            });
            base.$elem.wrapInner("<div class='slide-wrapper'>", base.$elem).children();
            base.$elem.wrapInner("<div class='slide-container'>", $(".slide-wrapper", base.$elem)).children();
            base.$elem.wrapInner("<div class='slide-dragcontainer'>", $(".slide-container", base.$elem)).children();
            $(".slide-container", base.$elem).css({
                position:"relative"
            });
            $container = $(".slide-dragcontainer", base.$elem);
            $wrapper = $(".slide-wrapper", base.$elem);
            $children = $wrapper.children();
            if (base.config.prevnextNav) {
                $wrapper.after("<div class='" + base.config.nextButtonClass + "'>");
                $wrapper.after("<div class='" + base.config.prevButtonClass + "'>");
                $next = $("." + base.config.nextButtonClass, base.$elem);
                $prev = $("." + base.config.prevButtonClass, base.$elem);
                $buttons = $next.add($prev);
                if (base.config.prevnextAutoHide) {
                    $buttons.hide();
                    base.$elem.hover(function() {
                        $buttons.fadeIn("fast");
                    }, function() {
                        $buttons.fadeOut("fast");
                    });
                }
                $prev.on("click", function(e) {
                    base.previous();
                });
                $next.on("click", function(e) {
                    base.next();
                });
                $prev.on("touchstart", function(e) {
                    e.stopPropagation();
                });
                $next.on("touchstart", function(e) {
                    e.stopPropagation();
                });
            }
            if (base.config.pagerNav) {
                base.$elem.append("<ul class='" + base.config.pagerClass + "'>");
                $children.each(function() {
                    $("<li />").appendTo($("." + base.config.pagerClass, base.$elem)).attr("rel", $(this).index()).on("click", function() {
                        $.data(base, "nextSlide", parseInt($(this).attr("rel")));
                        base._prepareslides(true);
                        base._slide(true);
                        base._manualInterference();
                    });
                });
            }
            $children.each(function() {
                $innerBase = $(this);
                caption = $innerBase.data("plugin-slide-caption");
                if (caption === undefined) return;
                if (this.tagName == "IMG") {
                    $innerBase.wrap("<div>");
                    $innerBase.after("<div class='" + base.config.slideCaptionClass + "'>");
                    $innerBase.next().append(caption);
                } else {
                    $innerBase.append("<div class='" + base.config.slideCaptionClass + "'>");
                    $innerBase.children().last().append(caption);
                }
                if (base.config.captionAutoHide) {
                    $("." + base.config.slideCaptionClass, base.$elem).hide();
                    base.$elem.hover(function() {
                        $("." + base.config.slideCaptionClass, base.$elem).fadeIn("fast");
                    }, function() {
                        $("." + base.config.slideCaptionClass, base.$elem).fadeOut("fast");
                    });
                }
            });
            $wrapper.children().addClass("slide").css({
                position:"absolute",
                top:0,
                left:0,
                width:base.data.width,
                height:base.config.height,
                zIndex:0,
                display:"none",
                webkitBackfaceVisibility:"hidden"
            });
            maxHeight = $children.height();
            $wrapper.css({
                position:"relative",
                left:0,
                height:maxHeight
            });
            $(".slide-container", base.$elem).css({
                width:base.data.width,
                overflow:"hidden",
                height:maxHeight
            });
            if (base.config.touchNav) {
                $container.on("touchstart", function(e) {
                    var eventData = e.originalEvent.touches[0];
                    e.preventDefault();
                    base._onMoveStart(eventData.pageX, eventData.pageY);
                    base.actionClick.x = base.currClick.x = eventData.pageX;
                    base.actionClick.y = base.currClick.y = eventData.pageY;
                    base.actionClick.action = true;
                    return e.stopPropagation();
                });
                $container.on("touchmove", function(e) {
                    var eventData = e.originalEvent.touches[0];
                    e.preventDefault();
                    base.actionClick.action = false;
                    base._onMove(eventData.pageX, eventData.pageY);
                    base.currClick.x = eventData.pageX;
                    base.currClick.y = eventData.pageY;
                    return e.stopPropagation();
                });
                $container.on("touchend", function(e) {
                    if (base.actionClick.action == true && base.actionClick.x == base.currClick.x && base.actionClick.y == base.currClick.y) {
                        var href = $container.find("." + base.config.activeSlideClass + " a, a." + base.config.activeSlideClass).attr("href");
                        if (href != undefined && href != "") {
                            window.location = href;
                        }
                    }
                    e.preventDefault();
                    base._onMoveEnd();
                    return e.stopPropagation();
                });
            }
            if (base.config.mouseNav) {
                $container.css("cursor", "pointer");
                $container.on("dragstart", function(e) {
                    return false;
                });
                $container.on("mousedown", function(e) {
                    base._onMoveStart(e.clientX, e.clientY);
                    base.actionClick.x = e.clientX;
                    base.actionClick.y = e.clientY;
                    base.actionClick.action = false;
                    $(window).attr("unselectable", "on").on("selectstart", false).css("user-select", "none").css("UserSelect", "none").css("MozUserSelect", "none");
                    return e.stopPropagation();
                });
                $(window).on("mousemove", function(e) {
                    base._onMove(e.clientX, e.clientY);
                    return e.stopPropagation();
                });
                $(window).on("mouseup", function(e) {
                    base._onMoveEnd();
                    if (base.actionClick.x == e.clientX && base.actionClick.y == e.clientY) {
                        base.actionClick.action = true;
                    }
                    $(window).removeAttr("unselectable").unbind("selectstart").css("user-select", null).css("UserSelect", null).css("MozUserSelect", null);
                    return e.stopPropagation();
                });
                $container.on("mouseup", function(e) {
                    if (base.actionClick.x == e.clientX && base.actionClick.y == e.clientY) {
                        base.actionClick.action = true;
                    }
                });
                $container.on("click", function(e) {
                    if (base.actionClick.action != true) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                });
            }
            if (base.config.autoSize) {
                setTimeout(function() {
                    base._resize();
                }, 50);
                $(window).resize(function() {
                    return setTimeout(function() {
                        base._resize();
                    }, 50);
                });
            }
            base._prepareslides();
            base.gotoSlide(base.data.currentSlide);
            if (base.config.autoPlay) {
                setTimeout(function() {
                    base.start();
                }, base.config.delay);
            }
            return this;
        },
        previous:function() {
            var base, nextSlide;
            base = this;
            $.data(base, "slideDirection", "previous");
            nextSlide = (base.data.nextSlide - 1) % base.data.totalslides;
            if (!base.config.repeat && base.data.nextSlide - 1 < 0) {
                if (base.config.playReverse) {
                    $.data(base, "playPaused", true);
                    base.stop();
                }
                return;
            } else if (base.data.playPaused && base.data.nextSlide - 1 > 0) {
                $.data(base, "playPaused", false);
                base.start();
            }
            $.data(base, "nextSlide", nextSlide);
            return this._slide();
        },
        next:function() {
            var base, nextSlide;
            base = this;
            $.data(base, "slideDirection", "next");
            nextSlide = (base.data.nextSlide + 1) % base.data.totalslides;
            if (!base.config.repeat && base.data.nextSlide + 1 > base.data.totalslides - 1) {
                if (!base.config.playReverse) {
                    $.data(base, "playPaused", true);
                    base.stop();
                }
                return;
            } else if (base.data.playPaused && base.data.nextSlide + 1 < base.data.totalslides - 1) {
                $.data(base, "playPaused", false);
                base.start();
            }
            $.data(base, "nextSlide", nextSlide);
            return this._slide();
        },
        start:function() {
            var base, $preContainer, timer;
            base = this;
            $preContainer = $(".slide-container", base.$elem);
            if (base.data.isPlaying && base.data.playTimer) clearInterval(base.data.playTimer);
            timer = setInterval(function() {
                if (base.config.playReverse) base.previous(); else base.next();
            }, base.config.interval);
            $.data(base, "playTimer", timer);
            if (base.config.hoverPause) {
                $preContainer.unbind();
                $preContainer.hover(function() {
                    $.data(base, "playPaused", true);
                    return base.stop();
                }, function() {
                    $.data(base, "playPaused", false);
                    return base.start();
                });
            }
            $.data(base, "isPlaying", true);
        },
        stop:function() {
            var base, $preContainer;
            base = this;
            $preContainer = $(".slide-container", base.$elem);
            clearInterval(base.data.playTimer);
            $.data(base, "playTimer", null);
            if (base.config.hoverPause && !base.data.playPaused) $preContainer.unbind();
            $.data(base, "isPlaying", false);
        },
        gotoSlide:function(slideIndex) {
            var base, nextSlideIndex, $container, $slides, $slide, leftPos;
            base = this;
            $.data(base, "nextSlide", slideIndex % base.data.totalslides);
            nextSlideIndex = slideIndex % base.data.totalslides;
            $.data(base, "currentSlide", nextSlideIndex);
            $container = $(".slide-wrapper", base.$elem);
            $slides = $container.children();
            $slide = $container.children().eq(nextSlideIndex);
            leftPos = $slide.position().left;
            base._setActive($slides, $slide);
            if (base.config.animationCssTransitions && base.data.browserEnginePrefix) {
                base._transition(-leftPos, 0);
            } else {
                $container.css("left", -leftPos);
            }
            base._alignSlides(leftPos);
        },
        _manualInterference:function() {
            var base = this;
            if (base.data.isPlaying) {
                base.stop();
                base.start();
            }
        },
        _prepareslides:function(onlyAhead) {
            var base, $container, $slides, width, half, i;
            base = this;
            $container = $(".slide-wrapper", base.$elem);
            $slides = $container.children();
            width = base.data.width;
            half = Math.floor(base.data.totalslides / 2);
            i = 0;
            $slides.each(function() {
                $(this).css({
                    display:"block",
                    left:width * i,
                    zIndex:10
                });
                i++;
                if (!onlyAhead && base.config.repeat && i > half) i = base.data.totalslides % 2 ? -half :-(half - 1);
            });
        },
        _onMoveStart:function(x, y) {
            var base = this;
            if (!base.data.isMoving) $.data(base, "touchTime", Number(new Date()));
            $.data(base, "touchedX", x);
            $.data(base, "touchedY", y);
            $.data(base, "isMoving", true);
            if (base.data.isPlaying) {
                $.data(base, "playPaused", true);
                base.stop();
            }
        },
        _onMove:function(x, y) {
            var base, $container, $slide, leftPos, prefix, translateX, limit;
            base = this;
            if (!base.data.isMoving) return;
            $container = $(".slide-wrapper", base.$elem);
            $.data(base, "scrolling", Math.abs(x - base.data.touchedX) < Math.abs(y - base.data.touchedY));
            if (!base.data.scrolling && !base.data.isAnimating) {
                $slide = $container.children().eq(base.data.nextSlide);
                leftPos = $slide.position().left;
                prefix = base.data.browserEnginePrefix.css;
                translateX = x - base.data.touchedX;
                limit = base.data.width * .1;
                if (!base.config.repeat) {
                    if (base.data.currentSlide <= 0 && -translateX < -limit) translateX = limit; else if (base.data.currentSlide >= base.data.totalslides - 1 && -translateX > limit) translateX = -limit;
                }
                base._transition(-leftPos + translateX, 0);
            }
        },
        _onMoveEnd:function() {
            var base, $container, $slide, leftPos, half, tenth, svipe;
            base = this;
            if (!base.data.isMoving) return;
            $container = $(".slide-wrapper", base.$elem);
            $.data(base, "justTouched", true);
            $slide = $container.children().eq(base.data.nextSlide);
            leftPos = $slide.position().left;
            half = base.data.width * .5;
            tenth = base.data.width * .1;
            svipe = Number(new Date()) - base.data.touchTime < 250;
            if (!base.config.repeat && ($container.position().left < -leftPos && base.data.currentSlide >= base.data.totalslides - 1 || $container.position().left > -leftPos && base.data.currentSlide <= 0)) {
                base._transition(-leftPos, .15);
            } else if ($container.position().left > -leftPos + half || $container.position().left > -leftPos + tenth && svipe) {
                this.previous();
            } else if ($container.position().left < -(leftPos + half) || $container.position().left < -(leftPos + tenth) && svipe) {
                this.next();
            } else {
                base._transition(-leftPos, .15);
            }
            base._alignSlides(leftPos);
            $.data(base, "isMoving", false);
            $.data(base, "justTouched", false);
            if (base.data.playPaused) base.start();
        },
        _alignSlides:function(goalPosition) {
            var base, $container, $slides, $slide, half, width, bufferLength, bufferShortage, i, lowest, highest;
            base = this;
            if (!base.config.repeat) return;
            $container = $(".slide-wrapper", base.$elem);
            $slides = $container.children();
            if (goalPosition === undefined) {
                $slide = $container.children().eq(base.data.nextSlide);
                goalPosition = $slide.position().left;
            }
            goalPosition = Math.round(goalPosition, 0);
            half = Math.ceil(base.data.totalslides / 2);
            width = base.data.width;
            bufferLength = 0;
            $slides.each(function() {
                var l = Math.round($(this).position().left);
                if (l > Math.round(goalPosition - width)) bufferLength++;
            });
            bufferShortage = half - bufferLength;
            if (bufferShortage < 0) bufferShortage = base.data.totalslides % 2 == 0 ? bufferShortage + 1 :bufferShortage;
            for (i = 0; i < Math.abs(bufferShortage); i++) {
                lowest = [].reduce.call($slides, function(sml, cur) {
                    return $(sml).offset().left < $(cur).offset().left ? sml :cur;
                });
                highest = [].reduce.call($slides, function(sml, cur) {
                    return $(sml).offset().left > $(cur).offset().left ? sml :cur;
                });
                if (bufferShortage > 0) $(lowest).css("left", Math.round($(highest).position().left + width)); else $(highest).css("left", Math.round($(lowest).position().left - width));
            }
        },
        _slide:function(postalign) {
            var base, nextSlideIndex, $container, $slides, $slide, leftPos;
            base = this;
            nextSlideIndex = base.data.nextSlide;
            $container = $(".slide-wrapper", base.$elem);
            $slides = $container.children();
            $slide = $container.children().eq(nextSlideIndex);
            leftPos = Math.round($slide.position().left);
            base._setActive($slides, $slide);
            if (!postalign) base._alignSlides(leftPos);
            $.data(base, "isAnimating", true);
            if (base.config.animationCssTransitions && base.data.browserEnginePrefix) {
                base._transition(-leftPos, base.data.justTouched ? .5 :1);
                $container.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
                    $.data(base, "currentSlide", nextSlideIndex);
                    $container.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd");
                    if (postalign) base._alignSlides(leftPos);
                });
            } else {
                $container.stop().animate({
                    left:-leftPos
                }, base.config.animationDuration, function() {
                    $.data(base, "currentSlide", nextSlideIndex);
                    $.data(base, "isAnimating", false);
                    $.data(base, "justTouched", false);
                });
            }
        },
        _transition:function(leftPos, durationModifier) {
            var base, $container, prefix, transform, duration, timing;
            base = this;
            $container = $(".slide-wrapper", base.$elem);
            if (durationModifier === undefined || durationModifier < 0) {
                durationModifier = 1;
            }
            prefix = base.data.browserEnginePrefix.css;
            transform = prefix + "Transform";
            duration = prefix + "TransitionDuration";
            timing = prefix + "TransitionTimingFunction";
            $container[0].style[duration] = base.config.animationDuration * durationModifier + "ms";
            $container[0].style[timing] = base.config.animationTimingFunction;
            $container[0].style[transform] = "translateX(" + leftPos + "px)";
            $container.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
                $.data(base, "isAnimating", false);
                $.data(base, "justTouched", false);
                $container.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd");
            });
        },
        _setActive:function($slides, $slide) {
            var base = this, activeSlideClass, pager;
            activeSlideClass = base.config.activeSlideClass;
            $slides.removeClass(activeSlideClass);
            $slide.addClass(activeSlideClass);
            if (base.config.pagerNav) {
                pager = $("." + base.config.pagerClass, base.$elem);
                pager.children().removeClass("act");
                pager.find("[rel=" + $slide.index() + "]").addClass("act");
            }
        },
        _resize:function() {
            var base, newwidth, ratio, newheight, maxHeight;
            base = this;
            if (base.data.isPlaying) {
                $.data(base, "playPaused", true);
                base.stop();
            }
            newwidth = base.$elem.width();
            ratio = base.config.height / base.config.width;
            newheight = newwidth * ratio;
            $.data(base, "width", newwidth);
            $(".slide", base.$elem).css({
                width:newwidth,
                height:newheight
            });
            maxHeight = $(".slide-wrapper", base.$elem).children().height();
            $(".slide-wrapper", base.$elem).css({
                height:maxHeight
            });
            $(".slide-container", base.$elem).css({
                width:newwidth,
                height:maxHeight
            });
            if (base.data.playPaused) {
                $.data(base, "playPaused", false);
                base.start();
            }
            base._prepareslides();
            base.gotoSlide(base.data.currentSlide);
        },
        _getBrowserEnginePrefix:function() {
            var transition, vendor, i;
            transition = "Transition";
            vendor = [ "Moz", "Webkit", "Khtml", "O", "ms" ];
            i = 0;
            while (i < vendor.length) {
                if (typeof document.body.style[vendor[i] + transition] === "string") {
                    return {
                        css:vendor[i]
                    };
                }
                i++;
            }
            return false;
        }
    };
    Plugin.defaults = Plugin.prototype.defaults;
    $.fn.excoloSliderBanner = function(options) {
        return this.each(function() {
            new Plugin(this, options).init();
        });
    };
});