/**
 * Created by huangqiao on 2017/4/7.
 */
// install FireDATA sdk监控
!function(key, params){
    var w = window, d = document, _fd=w._fd=w._fd||[], methods = ["pageView","event","event2app","autoEvent2app","setUserInfo","setContentInfo","setParams"];
    var fac=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);_fd.push(e);return _fd}};
    for(var t=0;t<methods.length;t++){var e=methods[t];_fd[e]=fac(e)};_fd.setParams(params);
    var g = d.createElement('script'), s = d.getElementsByTagName('script')[0];g.type = 'text/javascript';g.async = true;g.defer = true;g.src = '//sdk.firedata.cc/js/'+key+'.js';s.parentNode.insertBefore(g, s);
    }('9WAI779FPB',{'platform':'wap'});

_fd.pageView();
