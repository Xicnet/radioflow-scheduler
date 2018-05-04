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

                dashBoard.widgets.forEach(function(widget, index, array){    
                    
                    var targetDateRange = widget.$el.find('.daterange:not(#main-range)');

                    if (targetDateRange.length){
                        targetDateRange.data('daterangepicker').setStartDate(start)
                        targetDateRange.data('daterangepicker').setEndDate(end)
                    }

                })
                
            }else{

                var widgetList = thisInstance.data().widgets;
                
                if ( widgetList ) {

                    widgetList.split(',').forEach(function(id){
                        var widget = dashBoard.getWidget(id)
                        console.log('widget',widget);
                        widget && (
                            widget.showLoading(),
                            dashBoard.requestLogs( startToISO, endToISO, function(logs, programlogs){    
                                widget.render(logs, programlogs)
                            })
                        )
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

    $('.django-fix-label input').on("change", function(e){
        if ($(this).prop('checked')) {
            $(this).closest('.btn').addClass('btn-primary').removeClass('btn-default')
        }else{
            $(this).closest('.btn').removeClass('btn-primary').addClass('btn-default')
        }
    })

    $('.django-fix-label input').each(function(){ 
        if ($(this).prop('checked')) {
            $(this).closest('.btn').addClass('btn-primary').removeClass('btn-default')
        }else{
            $(this).closest('.btn').removeClass('btn-primary').addClass('btn-default')
        }
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

    $('.modal-confirm').on('show.bs.modal', function (event) {

        var button = $(event.relatedTarget) // Button that triggered the modal
        var modal = $(this)

        var title = button.data().title;
        var message = button.data().message;
        var redirect = button.data().redirect;

        modal.find('.modal-title').text(title)
        modal.find('.modal-body').text(message)

        if (redirect) {
            modal.find('.btn-confirm').on('click',function(){    
                document.location.href = redirect;
            });            
        }

    });

    $(document).on('change','input[type="file"]',function(){    
        $(this).closest('form')
            .find('.program-image-field').removeClass('program-image-field')
                .find('.program-image').remove()
    })

});

