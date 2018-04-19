
/**
 * Radio Flow Scheduler
 * ------------------
 */

     var widgets = {
        "quick-add": {
            pos: 2,
            id: "quick-add",
            parent: "dashboard-left",
            title: "Agregar Programa",
            type: "box-info",
            active: true,
            initialized: false,
            $el: $('#quick-add'),
            $body: $('#quick-add .box-body'),
            logs: [],
            render: function(logs){

                this.beforeRender()

                 if (!this.initialized) {

                    // bootstrap WYSIHTML5 - text editor
                    $('#quick-add .textarea').wysihtml5();

                    $('#quick-add .datetimepicker').datetimepicker({
                        format: 'HH:mm'
                    });

                }

                this.initialized = true;

                this.afterRender();

            }

        },
        "programacion-grilla": {
            pos: 2,
            id: "programacion-grilla",
            parent: "dashboard-right",
            title: "Programación",
            type: "box-primary",
            active: true,
            initialized: false,
            $el: $('#programacion-grilla'),
            $body: $('#programacion-grilla .box-body'),
            logs: [],
            render: function(logs){

                this.beforeRender();

                var buildTable=function(target){

                    var tableDataToHtml = '';
                    var totalCount = 0;

                    console.log('weeklyPrograms',weeklyPrograms);

                    if ( window.weeklyPrograms && !$.isEmptyObject(weeklyPrograms)) {

                        for (var weekDay in weeklyPrograms) {

                            var dayItems = weeklyPrograms[weekDay];
                            var weekday = weekDay.toLowerCase();
                            var day = weekDaysToNumber[weekday];
                            
                            tableDataToHtml += '<table class="table table-striped table-bordered" data-page="'+(day)+'">';

                            for (var d = 0; d < dayItems.length; d++) {

                                var weekday = dayItems[d].weekday;
                                var start = dayItems[d].start;
                                var end = dayItems[d].end;
                                var name = dayItems[d].name;
                                var moderator = dayItems[d].moderator;

                                var hour = parseInt(start);
                                var fullHour = start;
                                var fullHourEnd = end;

                                tableDataToHtml += '\
                                    <tr>\
                                        <td class="text-center" style="width: 120px;">'+fullHour+' - '+fullHourEnd+'</td>\
                                        <td>'+name+'</td>\
                                        <td>'+moderator+'</td>\
                                    </tr>\
                                ';
                                
                            }

                            tableDataToHtml += '</table>';

                        }

                    }

                    $(target).html(tableDataToHtml);
                    $(target).find('table[data-page="1"]').show();
                 
                    setTimeout( function(){ 
                        $(target).closest('.table-wrapper').find('.thead > li').each(function(i){ 
                            var width = $('#programacion-grilla-table-wrapper').find('table:visible tr:first-child td').eq(i).width();
                            $(this).width(width);
                        });
                    }, 100 );
                    
                };

                buildTable('#programacion-grilla-table-wrapper .table-scroller');

                if (!this.initialized) {

                    $('#programacion-grilla .pagination a[data-table]').on('click',function(){ 

                        var targetTable = $(this).attr('data-table');
                        $('#programacion-grilla table[data-page]').hide()
                        $('#programacion-grilla table[data-page="'+targetTable+'"]').stop().fadeIn();

                    });

                }
                
                this.initialized = true;

                this.afterRender();

            }
        }
    }

    
$(function () {
    /**
     * Start dashBoard
     *
     */

    $(document).ready(function(){ 
        dashBoard = new DashBoard(widgets, false);
    }); 

})
