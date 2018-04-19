/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/

$(function () {

    'use strict';

    moment.locale('es', {
        week: { dow: 1 } // Monday is the first day of the week
    });

    $.datepicker.setDefaults( $.datepicker.regional[ 'es' ] );

    $('#main-range, .daterange').each(function(){ 
         
        var thisInstance = $(this);

        thisInstance.daterangepicker({
            ranges   : {
              'Hoy'           : [moment(), moment()],
              'Ayer'          : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
              'Últimos 7 Días'  : [moment().subtract(6, 'days'), moment()],
              'Últimos 30 Días' : [moment().subtract(29, 'days'), moment()],
              'Últimos 90 Días' : [moment().subtract(90, 'days'), moment()],
              'Este Mes'      : [moment().startOf('month'), moment().endOf('month')],
              'Mes Anterior'    : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            locale : {
                format: 'DD/MM/YYYY',
                separator: ' a ',
                applyLabel: 'Ok',
                cancelLabel: 'Cancelar',
                weekLabel: 'Semana',
                customRangeLabel: 'Definir Rango',
                daysOfWeek: moment.weekdaysMin(),
                monthNames: moment.monthsShort(),
                firstDay: moment.localeData().firstDayOfWeek()
            },
            maxDate: moment(),
            startDate: moment().subtract(90, 'days'),
            endDate  : moment()

        }, function (start, end, text) {

            var startToISO = start.format('YYYY-MM-DD'),
                endToISO = end.format('YYYY-MM-DD');

            var isMainRange =  thisInstance.is('#main-range');

            if (isMainRange) {
                
                dashBoard.beforeRender(function(){    
                    dashBoard.requestLogs( startToISO, endToISO, dashBoard.render)                
                });

                for (var id in dashBoard.widgets) {

                    var targetDateRange = $('#'+id+' .daterange:not(#main-range)');

                    if (targetDateRange.length){
                        targetDateRange.data('daterangepicker').setStartDate(start)
                        targetDateRange.data('daterangepicker').setEndDate(end)
                    }

                }
                
            }else{

                var widgets = thisInstance.data().widgets;
                
                if (widgets) {

                    var widgetsToarr = (widgets && widgets.split(',')) || [];
                        
                    widgetsToarr.forEach(function(id, index, array){
                        if (dashBoard.widgets[id]) dashBoard.widgets[id].showLoading();
                    });

                    dashBoard.requestLogs( startToISO, endToISO, function(logs){
                        widgetsToarr.forEach(function(id, index, array){
                            if (dashBoard.widgets[id]) dashBoard.widgets[id].render(logs);
                        });
                    });

                }

            }

            // console.log('thisInstance',thisInstance);
            // console.log('thisInstance',thisInstance.data());
            // console.log('text',text);
            // console.log('start',start);
            // console.log('end',end);
            // console.log('startToISO',startToISO);
            // console.log('endToISO',endToISO);

            // window.alert('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            
        });

    })

    $('.dropdown-submenu a.dropdown-submenu-toggle').on("click", function(e){
      
      $(this).closest('li.dropdown-submenu')
        .siblings('.dropdown-submenu')
        .find('.dropdown-menu')
        .hide();

      if ($(this).next('ul').find('li').length) {
        $(this).next('ul').toggle();
      }

      e.stopPropagation();
      e.preventDefault();

    });

    // SLIMSCROLL FOR CHAT WIDGET
    $('#chat-box').slimScroll({
        height: '250px'
    });

    // $(".tagsinput").tagsinput({
    //  allowDuplicates: false,
    //  trimValue: true,
    //  tagClass: 'big'
    // });


    $(document).on('shown.bs.tab expanded.pushMenu collapsed.pushMenu',function(){  
        setTimeout( function(){ 
            var e = new Event('resize');
            e.fake = true;
            window.dispatchEvent(e);
        }, 300 );
    })

    $(window).on('resize',function(e){ 
        var sidebarCollapsed = $('body').hasClass('sidebar-collapse');
        setTimeout( function(){ 
            if ($('body').hasClass('chat-active') && $('body').hasClass('chat-workspace')) {
                $('body').addClass('sidebar-collapse')
                $('.content-wrapper').height($(window).height()-($('.main-footer').height()+$('.main-header').height()));
            }else{
                if (sidebarCollapsed && !e.originalEvent.fake) $('body').removeClass('sidebar-collapse');
                $('.content-wrapper').css('height','auto');
            }
        }, 100 );
    });

});

