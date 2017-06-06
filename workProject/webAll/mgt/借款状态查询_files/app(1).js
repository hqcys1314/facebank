+function(Handlebars, app) { "use strict";
  if ( !Handlebars ) {
    return;
  }

  Handlebars.registerHelper( 'rownum', function( index, page ) {
    return page.number * page.size + index + 1;
  });
  Handlebars.registerHelper( 'eq', function( value1, value2 ) {
    return value1 == value2;
  });
  Handlebars.registerHelper( 'number', function( value ) {
    return value === null ? 0: value;
  });
  Handlebars.registerHelper( 'number_add', function( number1, number2 ) {
    return number1 + number2;
  });
  Handlebars.registerHelper( 'number_add4', function( number1, number2, number3, number4 ) {
	    return number1 + number2 + number3 + number4;
  });
  Handlebars.registerHelper( 'number_multiply', function( number1, number2 ) {
    return number1 * number2;
  });
  Handlebars.registerHelper( 'format_currency', function( value ) {
    return app.currencySymbol + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  });
  Handlebars.registerHelper( 'format_date', function( value ) {
    return value!=null ? value.substr(0, value.indexOf('T')) : '';
  });
  
  Handlebars.registerHelper( 'unit_option', function( value ) {
	  var res = '月';
	  switch(value)
	  {
	  case 1:
		res = '天'
	    break;
	  case 2:
		  res = '周'
			  break;
	  case 3:
		  res = '月'
			  break;
	  case 4:
		res = '年'
	    break;
	  }
	  return res;
  });
    Handlebars.registerHelper( 'loan_status', function( value ) {
	  var res = '等待借款检查';
	  switch(value)
	  {
	  case 174:
		res = '检查未通过'
	    break;
	  case 180:
		  res = '等待借款检查'
			  break;
	  case 200:
		  res = '等待初审'
			  break;
	  case 210:
		res = '等待初审'
	    break;
	  case 220:
		res = '初审未通过'
	    break;
	  case 230:
		res = '初审未通过'
	    break;
	  case 240:
		res = '等待复审'
	    break;
	  case 250:
		res = '等待复审'
	    break;  
	  case 260:
		res = '复审未通过'
	    break;
	  case 270:
		res = '复审未通过'
	    break; 
	  case 280:
		res = '待开标'
	    break;
	  case 285:
		res = '待确认'
	    break;
	  case 300:
		res = '招标中'
	    break;
	  case 301:
		res = '未开始'
	    break;
	  case 302:
		res = '已结束'
	    break;
	  case 400:
		res = '满标'
	    break;
	  case 500:
		res = '还款中'
	    break;
	  case 550:
		res = '还款中'
	    break;
	  case 600:
		res = '已完成'
	    break;
	  case 610:
		res = '已完成'
	    break;
	  case 700:
		res = '已流标'
	    break;
	  case 1:
		res = '客户同意'
	    break;
	  case 2:
		res = '客户否决'
	    break;
	  }  
	  return res;
  });
}(window.Handlebars, window.app);

+function($, app) { "use strict";
  if ( !app ) {
    return;
  }
  
  app.addPages = function( page ) {
    var pages = [], start, end;
    start = Math.max(0, page.number - app.displayPages / 2);
    end = Math.min(Math.max(page.number + app.displayPages / 2 - 1, app.displayPages - 1), page.totalPages - 1);
    for( var i = start; i <= end; i++ ) {
      pages.push(i);
    }
    page.pages = pages;
  }
}(window.jQuery, window.app);

+function($, app) { "use strict";

  $.fn.appGrid = function(options) {

    options = $.extend({}, $.fn.appGrid.defaults, options);

    return this.each(function() {
      render($(this), options);
    });
  };

  $.fn.appGrid.defaults = {
    beforeSubmitPagination: function( form, pageNumber ) {
      if( !app.beforeSubmitPagination ) {
        return;
      }
      app.beforeSubmitPagination( form, pageNumber );
    }
  };

  function render(elem, options) {
    //
    // 选中
    //
    elem.find('input[type="checkbox"]').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });
    elem.find('input[data-action="chk-all"]').on('ifUnchecked', function(event) {
        elem.find('input[type="checkbox"]').iCheck('uncheck');
    });
    elem.find('input[data-action="chk-all"]').on('ifChecked', function(event) {
        elem.find('input[type="checkbox"]').iCheck('check');
    });

    //
    // 翻页
    //
    var listform = elem.find('form[name="listform"]');
    elem.find('.pagination [data-page-number]').click(function() {
      var pageNumber = $(this).data('pageNumber');
      listform.find('[name="pageNumber"]').val( pageNumber );
      options.beforeSubmitPagination( listform, pageNumber );
      listform.submit();
      return false;
    });
  }

}(window.jQuery, window.app);
