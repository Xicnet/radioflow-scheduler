
    var widgets = {
        "auto-compare": {
            pos: 0,
            id: "auto-compare",
            parent: "dashboard-left",
            title: "Conexiones",
            type: "nav-tabs",
            active: true,
            initialized: false,
            $el: $('#auto-compare'),
            $body: $('#auto-compare .box-body'),
            logs: [],
            render: function(logs){

                this.beforeRender();

                var connectionsByDate = {};
                var comparativeConnToArr = [];
                var connectionsToArr = [];

                var tags = [];
                var countries = [];
                var devices = ['Desktop','Mobile','Tablet'];

                if ($.fn.tagsinput) {

                    if ( !this.initialized ) {

                        $("#auto-compare .tagsinput")
                        .on('itemRemoved', function(event) {
                          // event.item: contains the item
                          dashBoard.widgets["auto-compare"].render(logs);
                        })
                        .tagsinput({
                            allowDuplicates: false,
                            itemText: function(item) {
                                return item.text;
                            },
                            itemValue: function(item) {
                                return item.value;
                            },
                            tagClass: function(item) {
                                return arrayHasVal(devices,item.text) ? 'label label-success' : 'label label-primary';
                            },
                        });


                    }else{

                        tags = $("#auto-compare .tagsinput").tagsinput('items');
                    }
                
                    if (!tags.length) {
                        $("#auto-compare .tagsinput-wrapper").hide();
                    }else{
                        $("#auto-compare .tagsinput-wrapper").show();
                    }

                }else{

                    $("#auto-compare .tagsinput-wrapper").remove();

                }

                if ( !$.isArray(logs) || !logs.length ) {
                    this.hideLoading().showMsg('empty')
                    return;
                }

                $.each(logs, function(i,item){ 

                    if (item.country_code) {
                        countries.pushOnce(item.country_code);
                        if ( tags.length && arrayHasVal(tags,{type: 'cc'}) && !arrayHasVal(tags,{text: item.country_code}) ) {
                            return;
                        }                           
                    };

                    if (item.agent) {
                        var itemDevice = dashBoard.getDeviceFromAgent(item.agent);
                        devices.pushOnce(itemDevice);
                        if ( tags.length && arrayHasVal(tags,{type: 'device'}) && !arrayHasVal(tags,{text: itemDevice}) ) {
                            return;
                        }
                    };

                    if (item.datetime_start) {

                        var iso = item.datetime_start.split('T')[0];
                        if (!connectionsByDate[iso]) connectionsByDate[iso] = 0;
                        connectionsByDate[iso]++;

                    };

                });

                var isoArr = Object.keys(connectionsByDate);
                var area1 = [];
                var area2 = [];
                var line = [];

                for (var t = 1; t <= isoArr.length; t++) {

                    var iso = isoArr[t];
                    // var dmy = new Date(iso).toLocaleDateString();

                    // Comparative
                    if (t<=isoArr.length/2) {
                        area1.push({iso: iso, count: connectionsByDate[iso]});
                    }else{
                        area2.push({iso: iso, count: connectionsByDate[iso]});
                    }
                    
                    // Line
                    line.push({iso: iso, count: connectionsByDate[iso]});

                }

                // Comparative
                for (var l = 0; (l < area1.length && l < area2.length); l++) {
                    if ( area2[l].iso && area1[l].count && area2[l].count ) 
                    comparativeConnToArr.push({ y: area2[l].iso, item1: area1[l].count, item2: area2[l].count })
                }

                // Line
                for (var l = 0; l < line.length; l++) {
                    if (line[l].iso && line[l].count) 
                    connectionsToArr.push({ y: line[l].iso, item1: line[l].count })
                }

                //  comparativeConnToArr = [
                //    { y: '2011 Q1', item1: 2666, item2: 2666 },
                //    { y: '2011 Q2', item1: 2778, item2: 2294 },
                //    { y: '2011 Q3', item1: 4912, item2: 1969 },
                //    { y: '2011 Q4', item1: 3767, item2: 3597 }
                //  ];

                if (!this.initialized) {

                    // Sales chart
                    this.area = new Morris.Area({
                      element   : 'auto-compare-chart',
                      resize    : true,
                      data      : comparativeConnToArr,
                      xkey      : 'y',
                      ykeys     : ['item1', 'item2'],
                      labels    : ['Anterior', 'Actual'],
                      lineColors: ['#a0d0e0', '#3c8dbc'],
                      hideHover : 'auto'
                    });

                    // Line Chart
                    this.line = new Morris.Line({
                      element          : 'connections-chart',
                      resize           : true,
                      data             : connectionsToArr,
                      xkey             : 'y',
                      ykeys            : ['item1'],
                      labels           : ['Conexiones'],
                      lineColors       : ['#3c8dbc'],
                      lineWidth        : 2,
                      hideHover        : 'auto',
                      // gridTextColor    : '#ccc',
                      gridStrokeWidth  : 0.4,
                      pointSize        : 4,
                      pointStrokeColors: ['#3c8dbc'],
                      // gridLineColor    : '#efefef',
                      // gridTextFamily   : 'Open Sans',
                      gridTextSize     : 12
                    });

                    var self = this;
                    // Fix for charts under tabs
                    $('#auto-compare ul.nav-tabs a').on('shown.bs.tab', function () {
                        self.line.redraw();
                        self.area.redraw();
                    });

                }else{

                    if (this.area) this.area.setData(comparativeConnToArr);
                    if (this.line) this.line.setData(connectionsToArr);

                }

                if ($.fn.tagsinput) {

                    if (countries.length) {
                        countries.sort();
                        $('#auto-compare ul[data-filter="cc"]').html('<li><a href="-filter">'+countries.join('</a></li><li><a href="-filter">')+'</a></li>')    
                    }

                    if (devices.length) {
                        $('#auto-compare ul[data-filter="device"]').html('<li><a href="-filter">'+devices.join('</a></li><li><a href="-filter">')+'</a></li>')
                    }

                    $('#auto-compare ul[data-filter] a[href="-filter"]')
                    .each(function(i){ 
                         
                        var thisTag = {
                            value: i,
                            text: $(this).text(),
                            type: $(this).closest('ul[data-filter]').attr('data-filter'),
                        };

                        if ( arrayHasVal(tags,{text: thisTag.text}) ) {
                            $(this).addClass('added');
                        }else{
                            $(this).removeClass('added');
                        }

                        $(this).on('click',function(e){

                            e.stopPropagation(); e.preventDefault();

                            $(this).toggleClass('added');

                            if ( !arrayHasVal(tags,{text: thisTag.text}) ) {
                                $("#auto-compare .tagsinput").tagsinput('add', thisTag);
                            }else{
                                $("#auto-compare .tagsinput").tagsinput('remove', thisTag);                             
                            }

                            dashBoard.widgets["auto-compare"].render(logs);

                        });

                    });

                }

                this.initialized = true;

                this.afterRender();

            }
        },
        "geo-audiencia": {
            pos: 1,
            id: "geo-audiencia",
            parent: "dashboard-left",
            title: "GEO Audiencia",
            type: "box-solid",
            active: true,
            initialized: false,
            $el: $('#geo-audiencia'),
            $body: $('#geo-audiencia .box-body'),
            logs: [],
            render: function(logs){

                this.beforeRender();

                if ( !$.isArray(logs) || !logs.length ) {
                    this.hideLoading().showMsg('empty')
                    return;
                }

                var visitorsData = {};
                var countriesRanking = [];
                var countriesRankingByDate = {};
                var IPs = [];

                $.each(logs, function(i,item){ 

                     if (item.country_code) {

                        var CC = item.country_code;
                        if (!visitorsData[CC]) visitorsData[CC] = 0;
                        visitorsData[CC]++;

                        var iso = item.datetime_start.split('T')[0];
                        if (!countriesRankingByDate[iso]) countriesRankingByDate[iso] = [];

                        // Ranking general de países
                        var added = false;
                        for (var i = 0; i < countriesRanking.length; i++) {
                            if ( countriesRanking[i].cc == CC) {
                                countriesRanking[i].count++;
                                added = true;
                            }
                        }
                        if ( !added ) {
                            countriesRanking.push({cc: CC, count: 1 });
                        }

                        // Ranking de países por fecha
                        var added = false;
                        for (var i = 0; i < countriesRankingByDate[iso].length; i++) {
                            if ( countriesRankingByDate[iso][i].cc == CC) {
                                countriesRankingByDate[iso][i].count++;
                                added = true;
                            }
                        }
                        if ( !added ) {
                            countriesRankingByDate[iso].push({cc: CC, count: 1 });
                        }

                    };

                    if (item.ip) IPs.pushOnce(item.ip);

                });

                // jvectormap data
                // var visitorsData = {
                //   US: 398, // USA
                //   SA: 400, // Saudi Arabia
                //   CA: 1000, // Canada
                //   DE: 500, // Germany
                //   FR: 760, // France
                //   CN: 300, // China
                //   AU: 700, // Australia
                //   BR: 600, // Brazil
                //   IN: 800, // India
                //   GB: 320, // Great Britain
                //   RU: 3000 // Russia
                // };

                // World map by jvectormap
                $('#world-map').html('').vectorMap({
                  map              : 'world_mill_en',
                  backgroundColor  : 'transparent',
                  regionStyle      : {
                    initial: {
                      fill            : '#e4e4e4',
                      'fill-opacity'  : 1,
                      stroke          : 'none',
                      'stroke-width'  : 0,
                      'stroke-opacity': 1
                    }
                  },
                  series           : {
                    regions: [
                      {
                        values           : visitorsData,
                        scale            : ['#92c1dc', '#ebf4f9'],
                        normalizeFunction: 'polynomial'
                      }
                    ]
                  },
                  onRegionLabelShow: function (e, el, code) {
                    if (typeof visitorsData[code] != 'undefined')
                      el.html(el.html() + ': ' + visitorsData[code] + ' conexiones');
                  }
                });


                // Array sort para seleccionar los tres países con más conexiones
                sortObjArrayByNum(countriesRanking,'count','desc'); 

                var countryValues = {};
                for (var c = 0; (c < 3 && c < countriesRanking.length); c++) {

                    var CC = countriesRanking[c].cc;
                    // Agregar los conexiones por fechasde los  tres países con más conexiones
                    for (var iso in countriesRankingByDate) {

                        sortObjArrayByNum(countriesRankingByDate[iso],'count','desc'); 

                        for (var i = 0; i < countriesRankingByDate[iso].length; i++) {
                            
                            if ( CC == countriesRankingByDate[iso][i].cc ) {

                                if (!countryValues[CC]) countryValues[CC] = [];
                                countryValues[CC].push(countriesRankingByDate[iso][i].count);

                            }

                        }
                    }

                }

                // Sparkline charts
                var index = 1;
                for (var CC in countryValues) {

                    var ccValues = countryValues[CC];

                    $('#sparkline-'+index).sparkline(ccValues, {
                      type     : 'line',
                      lineColor: '#92c1dc',
                      fillColor: '#ebf4f9',
                      height   : '50',
                      width    : '80'
                    });

                    $('#sparkline-label-'+index).text(CC);
                    
                    index++;
                }


                if ( IPs.length ) {

                    var buildTable=function(target,regionsData){

                        var citiesArr = Object.keys(regionsData);

                        citiesArr.sort(function(cityA, cityB){ 
                                
                            try{
                                return regionsData[cityB].count - regionsData[cityA].count;
                            }catch(err){
                                console.log(err);
                                return 0;
                            }

                        });


                        var tableDataToHtml = '';
                        var posCounter = 0;
                        var totalCount = 0;

                        for (var c = 0; c < citiesArr.length; c++) {

                            var cityData = regionsData[citiesArr[c]].data;
                            var cityCount = regionsData[citiesArr[c]].count;

                            posCounter = c==0 ? 1 : (cityCount < regionsData[citiesArr[c-1]].count ? (posCounter+1) : posCounter);

                            var colorCounter = posCounter > bgClasses.length ? 0 : posCounter-1;
                            var cityColor = bgClasses[colorCounter];

                            tableDataToHtml += '\
                                <tr>\
                                    <td style="width: 10px;">'+(posCounter)+'.</td>\
                                    <td>'+citiesArr[c]+'</td>\
                                    <td>'+cityData.region_name+'</td>\
                                    <td>'+cityData.country_name+'</td>\
                                    <td style="width: 40px;"><span class="badge '+cityColor+'">'+Number(cityCount*100/logs.length).toFixed(3)+'%</span></td>\
                                </tr>\
                            ';

                            totalCount+=cityCount;
                        }

                        var tbody = $(target).find('tbody');
                        tbody.html(tableDataToHtml)

                        setTimeout( function(){ 
                            $(target).closest('.table-wrapper').find('.thead > li').each(function(i){ 
                                $(this).width(tbody.find('tr:first-child td').eq(i).width());
                            });
                        }, 100 );
                     
                    };

                    // console.log(IPs);
                    var regionsData = {};
                    var pendingIpRequests = logs.length;
                    var geoIpData = localJSON.get('geoIpData');

                    for (var i = 0; i < logs.length; i++) {
                        
                        var thisIp = logs[i].ip;

                        if ( geoIpData[thisIp] ) {

                            var data = geoIpData[thisIp];
                            if (typeof data == 'object'  && data.city) {
                                if (!regionsData[data.city]) regionsData[data.city] = {count:0, data:data};
                                regionsData[data.city].count++;
                            }

                            pendingIpRequests--;
                            if (pendingIpRequests==0) buildTable('#geo-tabla',regionsData);

                            continue;
                        }

                        setTimeout( function(asyncIp){ 

                            // city             "Buenos Aires"
                            // country_code     "AR"
                            // country_name     "Argentina"
                            // ip               "190.192.64.102"
                            // latitude         -34.6033
                            // longitude        -58.3816
                            // metro_code       0
                            // region_code      "C"
                            // region_name      "Buenos Aires F.D."
                            // time_zone        "America/Argentina/Buenos_Aires"
                            // zip_code         "34034"

                            var geoip = 'https://freegeoip.net/json/'+asyncIp;

                            $.ajax({
                                url: geoip,
                                type: 'GET',
                                success: function(data) {
                                    // console.log(data);

                                    if (typeof data == 'object'  && data.city) {
                                        if (!regionsData[data.city]) regionsData[data.city] = {count:0, data:data};
                                        regionsData[data.city].count++;
                                    }

                                    pendingIpRequests--;
                                    if (pendingIpRequests==0) buildTable('#geo-tabla',regionsData);

                                    localJSON.update('geoIpData',asyncIp,data);

                                },
                               error: function(error){
                                    console.log(error.statusText);

                                    pendingIpRequests--;
                                    if (pendingIpRequests==0) buildTable('geo-tabla',regionsData);

                               }                            
                            });

                        }, 500, thisIp );
                        
                    }

                };

                // console.log('countriesRanking');
                // console.log(countriesRanking);
                // console.log('countriesRankingByDate');
                // console.log(countriesRankingByDate);
                // console.log('countryValues');
                // console.log(countryValues);

                this.initialized = true;

                this.afterRender();

            }
        },
        "programacion": {
            pos: 2,
            id: "programacion",
            parent: "dashboard-right",
            title: "Programación",
            type: "box-primary",
            active: true,
            initialized: false,
            $el: $('#programacion'),
            $body: $('#programacion .box-body'),
            logs: [],
            render: function(logs){

                this.beforeRender();

                if ( !$.isArray(logs) || !logs.length ) {
                    this.hideLoading().showMsg('empty')
                    return;
                }

                var visitorsData = {};

                for (var day = 0; day < 7; day++) {
                    visitorsData[day.toString()] = {};
                    for (var hour = 0; hour < 24; hour++) {
                        visitorsData[day.toString()][hour.toString()] = 0;
                    }   
                }

                $.each(logs, function(i,item){ 

                    if (item.datetime_start) {

                        var startTime = new Date(item.datetime_start);
                        var endTime = (item.datetime_end && new Date(item.datetime_end)) || startTime;
                        var startHour = startTime.getHours();
                        var endHour = endTime.getHours();
                        var startDay = startTime.getDay();
                        var endDay = endTime.getDay();

                        visitorsData[startDay.toString()][startHour.toString()]++;
                        // for (var d = startDay; d <= endDay; d++) {
                            // for (var s = startHour; s <= endHour; s++) {
                            //     visitorsData[startDay.toString()][s.toString()]++;
                            // }
                        // }

                    }

                });

                // console.log('visitorsData');
                // console.log(visitorsData);

                var buildTable=function(target,visitorsData){

                    var tableDataToHtml = '';
                    var totalCount = 0;

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
                                var hourCount = (visitorsData[day] && visitorsData[day][hour]) || 0;
                                var badgeColor = hourCount > 0 ? 'bg-olive' : 'bg-red';

                                tableDataToHtml += '\
                                    <tr>\
                                        <td class="text-center" style="width: 120px;">'+fullHour+' - '+fullHourEnd+'</td>\
                                        <td>'+name+(moderator?' ('+moderator+')':'')+'</td>\
                                        <td class="text-center" style="width: 80px;"><span class="badge '+badgeColor+'">'+hourCount+'</span></td>\
                                    </tr>\
                                ';
                                
                            }

                            tableDataToHtml += '</table>';

                        }

                    }else{

                        for (var day in visitorsData) {
                            
                            var c = 0;
                            
                            tableDataToHtml += '<table class="table table-striped table-bordered" data-page="'+(day)+'">';

                            for (var hour in visitorsData[day]) {

                                var hourCount = visitorsData[day][hour];
                                var badgeColor = hourCount > 0 ? 'bg-olive' : 'bg-red';
                                var fullHour = hour.toString()+':00';
                                var fullHourEnd = (hour+1).toString()+':00';

                                tableDataToHtml += '\
                                    <tr>\
                                        <td class="text-center" style="width: 120px;">'+fullHour+' - '+fullHourEnd+'</td>\
                                        <td>'+'Programa '+hour+'</td>\
                                        <td class="text-center" style="width: 80px;"><span class="badge '+badgeColor+'">'+hourCount+'</span></td>\
                                    </tr>\
                                ';

                            c++;
                            }

                            tableDataToHtml += '</table>';

                        }

                    }

                    $(target).html(tableDataToHtml);
                    $(target).find('table[data-page="1"]').show();
                 
                    setTimeout( function(){ 
                        $(target).closest('.table-wrapper').find('.thead > li').each(function(i){ 
                            var width = $('#programacion-table-wrapper').find('table:visible tr:first-child td').eq(i).width();
                            $(this).width(width);
                        });
                    }, 100 );
                    
                };

                buildTable('#programacion-table-wrapper .table-scroller',visitorsData);

                if (!this.initialized) {

                    $('#programacion .pagination a[data-table]').on('click',function(){ 

                        var targetTable = $(this).attr('data-table');
                        $('#programacion table[data-page]').hide()
                        $('#programacion table[data-page="'+targetTable+'"]').stop().fadeIn();

                    });

                }
                
                this.initialized = true;

                this.afterRender();

            }
        },
        "programs-stats": {
            pos: 3,
            id: "programs-stats",
            parent: "dashboard-left",
            title: "Programas",
            type: "box-primary",
            active: true,
            initialized: false,
            $el: $('#programs-stats'),
            $body: $('#programs-stats .box-body'),
            logs: [],
            render: function(logs){

                this.beforeRender();

                if ( !$.isArray(logs) || !logs.length ) {
                    this.hideLoading().showMsg('empty')
                    return;
                }
                
                if ( !window.weeklyPrograms || $.isEmptyObject(weeklyPrograms)) {
                    this.hideLoading().showMsg('empty')
                }

                var programsData = [];
                var programsLine = [];
                var programsBar = [];

                var programsByID = {};
                var programsByISO = {};
                var programsCount = {};
                
                var programNames = [];
                var programIDs = [];
                var programsColors = [];
                var programsColorsObj = {};

                if ( window.weeklyPrograms && !$.isEmptyObject(weeklyPrograms)) {

                    for (var weekDay in weeklyPrograms) {

                        var dayItems = weeklyPrograms[weekDay];
                        var weekday = weekDay.toLowerCase();
                        var day = weekDaysToNumber[weekday];
                        var posCounter = 0;

                        programsData[day] = {};

                        for (var d = 0; d < dayItems.length; d++) {

                            var id = dayItems[d].id;
                            var weekday = dayItems[d].weekday;
                            var start = dayItems[d].start;
                            var end = dayItems[d].end;
                            var name = dayItems[d].name;
                            var moderator = dayItems[d].moderator;

                            var hour = parseInt(start);
                            var color = programsColorsObj[id] || randomColors[posCounter];

                            programNames.pushOnce(name);
                            programIDs.pushOnce(id);

                            !programsColorsObj[id] && programsColors.push(color);
                            
                            posCounter += programsColorsObj[id] ? 0 : 1;
                            if (posCounter >= randomColors.length) posCounter = 0;

                            programsColorsObj[id] = color;

                            !programsData[day][hour] && (programsData[day][hour] = {})

                            programsByID[id] = {id,weekday,start,end,name,moderator,hour,color,count: 0};

                            programsData[day][hour][id] = programsByID[id];

                        }

                    }

                }

                $.each(logs, function(i,item){ 

                    if (item.datetime_start) {

                        var startTime = new Date(item.datetime_start);
                        var endTime = (item.datetime_end && new Date(item.datetime_end)) || startTime;
                        var startISO = startTime.toISOString().split('T')[0];
                        var startHour = startTime.getHours();
                        var endHour = endTime.getHours();
                        var startDay = startTime.getDay();
                        var endDay = endTime.getDay();

                        !programsByISO[startISO] && (programsByISO[startISO]={})

                        if(programsData[startDay] && programsData[startDay][startHour]){

                            for (var id in programsData[startDay][startHour]) {

                                // Line
                                !programsByISO[startISO][id] && (programsByISO[startISO][id]=0)
                                programsByISO[startISO][id]++;

                                // Bar
                                !programsCount[id] && (programsCount[id]=0)
                                programsCount[id]++;

                            };

                        }
                            
                    }

                });

                // console.log('programsData', programsData);
                // console.log('programsByISO', programsByISO);

                // line
                for (var startISO in programsByISO) {

                    var lineItem = { day: startISO };

                    if (!$.isEmptyObject(programsByISO[startISO])) {
                        for (var id in programsByISO[startISO]) {
                            lineItem[id] = programsByISO[startISO][id];
                        }
                    }

                    programsLine.push(lineItem);

                }

                // bar
                for (var id in programsCount) {

                    var name = programsByID[id].name;;
                    var count = programsCount[id];
                    var barItem = { count, name };
                    programsBar.push(barItem);

                }
                    
                
                programsLine.forEach(function(lineItem, index, array){    
                    programIDs.forEach(function(id){
                        if (!lineItem[id]) programsLine[index][id] = 0;
                    });    
                });

                // console.log('programsLine',programsLine);
                // console.log('programIDs',programIDs);
                // console.log('programNames',programNames);
                // console.log('programsColors',programsColors);
                // console.log('programsCount',programsCount);

                if (!this.initialized) {

                    // Line Chart
                    this.line = new Morris.Line({
                      element          : 'programs-stats-chart',
                      resize           : true,
                      data             : programsLine,
                      xkey             : 'day',
                      ykeys            : programIDs,
                      labels           : programNames,
                      lineColors       : programsColors,
                      lineWidth        : 1,
                      hideHover        : 'auto',
                      // gridTextColor    : '#ccc',
                      gridStrokeWidth  : 0.4,
                      pointSize        : 2,
                      pointStrokeColors: ['#3c8dbc'],
                      // gridLineColor    : '#efefef',
                      // gridTextFamily   : 'Open Sans',
                      gridTextSize     : 12
                    });

                    // data: [
                    //   {device: 'iPhone', geekbench: 136},
                    //   {device: 'iPhone 3G', geekbench: 137},
                    //   {device: 'iPhone 3GS', geekbench: 275},
                    //   {device: 'iPhone 4', geekbench: 380},
                    //   {device: 'iPhone 4S', geekbench: 655},
                    //   {device: 'iPhone 5', geekbench: 1571}
                    // ],
                    this.bar = new Morris.Bar({
                      element: 'programs-bar-chart',
                      data: programsBar,
                      xkey: 'name',
                      ykeys: ['count'],
                      labels: ['Conexiones'],
                      barColors: ['#a0d0e0', '#3c8dbc'],
                      barRatio: 0.4,
                      xLabelAngle: 0,
                      hideHover: 'auto'
                    });

                    var self = this;
                    // Fix for charts under tabs
                    $('#programs-stats ul.nav-tabs a').on('shown.bs.tab', function () {
                        self.line.redraw();
                        self.bar.redraw();
                    });

                }else{

                    if (this.line) this.line.setData(programsLine);
                    if (this.bar) this.bar.setData(programsBar);

                }
                
                this.initialized = true;

                this.afterRender();

            }
        },
        "calendario": {
            pos: 1,
            id: "calendario",
            parent: "dashboard-right",
            title: "Calendario",
            type: "box-solid",
            active: true,
            initialized: false,
            $el: $('#calendario'),
            $body: $('#calendario .box-body'),
            logs: [],
            render: function(logs){

                this.beforeRender();

                // The Calender
                $('#dashboard-calendar').datepicker({
                    language: 'es',
                });

                // jQuery UI sortable for the todo list
                $('#calendario .todo-list').sortable({
                  placeholder         : 'sort-highlight',
                  handle              : '.handle',
                  forcePlaceholderSize: true,
                  zIndex              : 999999
                });

                /* The todo list plugin */
                $('#calendario .todo-list').todoList({
                  onCheck  : function () {
                    window.console.log($(this), 'The element has been checked');
                  },
                  onUnCheck: function () {
                    window.console.log($(this), 'The element has been unchecked');
                  }
                });

                this.initialized = true;

                this.afterRender();

            }
        },
        "devices": {
            pos: 0,
            id: "devices",
            parent: "dashboard-right",
            title: "Dispositivos",
            type: "box-solid",
            active: true,
            initialized: false,
            $el: $('#devices'),
            $body: $('#devices .box-body'),
            logs: [],
            render: function(logs){

                this.beforeRender();

                if ( !$.isArray(logs) || !logs.length ) {
                    this.hideLoading().showMsg('empty')
                    return;
                }

                var devicesRanking = [];
                var browsersRanking = [];
                var osRanking = [];

                var popularBrowsers = ['Opera','Firefox','Chrome','Safari','Edge','Internet Explorer'];

                $.each(logs, function(i,item){ 

                    var agent = item.agent;
                    var deviceSlug = dashBoard.getDeviceFromAgent(agent);
                    var deviceNames = dashBoard.deviceNames;
                    var af = new AgentFinder(agent);                        

                    // if (i<100) {
                    // console.log('agent',agent);
                    // console.log('af',af);
                    // console.log('/////////////////////');
                    // console.log(' ');
                    // console.log(' ');
                    // console.log(' ');
                    // }

                    var itemDevice = af && af.device || ((deviceSlug in deviceNames) ? deviceNames[deviceSlug] : '');

                    if (itemDevice) {

                        var added = false;
                        for (var d = 0; d < devicesRanking.length; d++) {
                            if ( devicesRanking[d].label == itemDevice) {
                                devicesRanking[d].value++;
                                added = true;
                            }
                        }
                        if ( !added ) {
                            devicesRanking.push({label: itemDevice, value: 1 });
                        }

                    }

                    var itemBrowser = af && af.browser;

                    if (itemBrowser && arrayHasVal(popularBrowsers,itemBrowser)) {

                        var added = false;
                        for (var d = 0; d < browsersRanking.length; d++) {
                            if ( browsersRanking[d].label == itemBrowser) {
                                browsersRanking[d].value++;
                                added = true;
                            }
                        }
                        if ( !added ) {
                            browsersRanking.push({label: itemBrowser, value: 1 });
                        }

                    }

                    var itemOS = af && af.os;

                    if (itemOS) {

                        var added = false;
                        for (var d = 0; d < osRanking.length; d++) {
                            if ( osRanking[d].label == itemOS) {
                                osRanking[d].value++;
                                added = true;
                            }
                        }
                        if ( !added ) {
                            osRanking.push({label: itemOS, value: 1 });
                        }

                    }


                });

                if (!this.initialized && devicesRanking.length ) {

                    // Donut Chart
                    this.devicesDonut = new Morris.Donut({
                      element  : 'devices-chart',
                      resize   : true,
                      colors   : devicesRanking.map(function(item,i){return randomColors.sort(function(){return randomColors.length/2-Math.random()})[i]}),
                      data     : devicesRanking,
                      hideHover: 'auto'
                    });


                }else{

                    if (this.devicesDonut) this.devicesDonut.setData(devicesRanking);

                }
        
                if (!this.initialized && browsersRanking.length ) {

                    // Donut Chart
                    this.browsersDonut = new Morris.Donut({
                      element  : 'browsers-chart',
                      resize   : true,
                      colors   : browsersRanking.map(function(item,i){return randomColors.sort(function(){return randomColors.length/2-Math.random()})[i]}),
                      data     : browsersRanking,
                      hideHover: 'auto'
                    });


                }else{

                    if (this.browsersDonut) this.browsersDonut.setData(browsersRanking);

                }
        
                if (!this.initialized && osRanking.length ) {

                    // Donut Chart
                    this.osDonut = new Morris.Donut({
                      element  : 'os-chart',
                      resize   : true,
                      colors   : osRanking.map(function(item,i){return randomColors.sort(function(){return randomColors.length/2-Math.random()})[i]}),
                      data     : osRanking,
                      hideHover: 'auto'
                    });


                }else{

                    if (this.osDonut) this.osDonut.setData(osRanking);

                }
        
                this.initialized = true;

                this.afterRender();

            }
        },
        "sent-bytes": {
            pos: 1,
            id: "sent-bytes",
            parent: "dashboard-right",
            title: "Bytes Enviados",
            type: "box-primary",
            active: true,
            initialized: false,
            $el: $('#sent-bytes'),
            $body: $('#sent-bytes .box-body'),
            logs: [],
            render: function(logs){

                this.beforeRender();

                if ( !$.isArray(logs) || !logs.length ) {
                    this.hideLoading().showMsg('empty')
                    return;
                }

                var bytesSentByDate = {};
                var bytesSentByCC = {};
                var totalBytesSent = 0;
                var bytesByCountry = [];

                var tags = [];
                var countries = [];
                var devices = ['Desktop','Mobile','Tablet'];

                if ($.fn.tagsinput) {

                    if ( !this.initialized ) {

                        $("#sent-bytes .tagsinput")
                        .on('itemRemoved', function(event) {
                          // event.item: contains the item
                          dashBoard.widgets["sent-bytes"].render(logs);
                        })
                        .tagsinput({
                            allowDuplicates: false,
                            itemText: function(item) {
                                return item.text;
                            },
                            itemValue: function(item) {
                                return item.value;
                            },
                            tagClass: function(item) {
                                return arrayHasVal(devices,item.text) ? 'label label-success' : 'label label-primary';
                            },
                        });


                    }else{

                        tags = $("#sent-bytes .tagsinput").tagsinput('items');
                    }
                
                    if (!tags.length) {
                        $("#sent-bytes .tagsinput-wrapper").hide();
                    }else{
                        $("#sent-bytes .tagsinput-wrapper").show();
                    }

                }else{

                    $("#sent-bytes .tagsinput-wrapper").remove();

                }

                $.each(logs, function(i,item){ 

                    if (item.country_code) {
                        countries.pushOnce(item.country_code);
                        if ( tags.length && arrayHasVal(tags,{type: 'cc'}) && !arrayHasVal(tags,{text: item.country_code}) ) {
                            return;
                        }                           
                    };

                    if (item.agent) {
                        var itemDevice = dashBoard.getDeviceFromAgent(item.agent);
                        devices.pushOnce(itemDevice);
                        if ( tags.length && arrayHasVal(tags,{type: 'device'}) && !arrayHasVal(tags,{text: itemDevice}) ) {
                            return;
                        }
                    };


                    if (item.sent_bytes) {

                        var sb = item.sent_bytes;
                        var Ymd = parseInt(item.datetime_start.split('T')[0].replaceAll('-',''));
                        var iso = item.datetime_start.split('T')[0];

                        if (!bytesSentByDate[iso]) bytesSentByDate[iso] = 0;

                        totalBytesSent+=sb;
                        bytesSentByDate[iso]+=sb;
                        
                        if (item.country_code) {

                           var CC = item.country_code;
                           if (!bytesSentByCC[CC]) bytesSentByCC[CC] = 0;
                           bytesSentByCC[CC]+=sb;

                        };

                    }

                })

                // [
                //     { y: '2011 Q1', item1: 2666 },
                //     { y: '2011 Q2', item1: 2778 },
                //     { y: '2011 Q3', item1: 4912 },
                //     { y: '2013 Q4', item1: 8432 }
                // ]

                var bytesToArr = [];
                for (var iso in bytesSentByDate) {
                    var toMB = parseInt(bytesSentByDate[iso]/1048576);
                    bytesToArr.push({ y: iso, item1: toMB })
                }
                
                if (!this.initialized && bytesToArr.length ) {

                    // Line Chart
                    this.line = new Morris.Line({
                      element          : 'sent-bytes-line-chart',
                      resize           : true,
                      data             : bytesToArr,
                      xkey             : 'y',
                      ykeys            : ['item1'],
                      labels           : ['MB'],
                      lineColors       : ['#efefef'],
                      lineWidth        : 2,
                      hideHover        : 'auto',
                      gridTextColor    : '#fff',
                      gridStrokeWidth  : 0.4,
                      pointSize        : 4,
                      pointStrokeColors: ['#efefef'],
                      gridLineColor    : '#efefef',
                      gridTextFamily   : 'Open Sans',
                      gridTextSize     : 10
                    });

                }else{

                    if (this.line) this.line.setData(bytesToArr);

                }


                for (var CC in bytesSentByCC) {
                    var count = bytesSentByCC[CC];
                    bytesByCountry.push({cc:CC, count:count})
                }

                // Array sort para seleccionar los tres países con más conexiones
                sortObjArrayByNum(bytesByCountry,'count','desc'); 

                for (var i = 0; (i < 3 && i < bytesByCountry.length); i++) {                        
                    /* jQueryKnob */
                    var perc = parseInt((bytesByCountry[i].count*100)/totalBytesSent);
                    $('#sent-bytes .knob').eq(i).val(perc).knob();
                    $('#sent-bytes .knob-label').eq(i).text(bytesByCountry[i].cc);

                    // console.log('totalBytesSent: '+totalBytesSent);
                    // console.log('perc: '+perc);
                    // console.log('count: '+bytesByCountry[i].count);
                    // console.log($('#sent-bytes .knob').eq(i).val());

                }

                // console.log('bytesSentByDate');
                // console.log(bytesSentByDate);
                // console.log('bytesByCountry');
                // console.log(bytesByCountry);

                if ($.fn.tagsinput) {

                    if (countries.length) {
                        countries.sort();
                        $('#sent-bytes ul[data-filter="cc"]').html('<li><a href="-filter">'+countries.join('</a></li><li><a href="-filter">')+'</a></li>')  
                    }

                    if (devices.length) {
                        $('#sent-bytes ul[data-filter="device"]').html('<li><a href="-filter">'+devices.join('</a></li><li><a href="-filter">')+'</a></li>')
                    }

                    $('#sent-bytes ul[data-filter] a[href="-filter"]')
                    .each(function(i){ 
                         
                        var thisTag = {
                            value: i,
                            text: $(this).text(),
                            type: $(this).closest('ul[data-filter]').attr('data-filter'),
                        };

                        if ( arrayHasVal(tags,{text: thisTag.text}) ) {
                            $(this).addClass('added');
                        }else{
                            $(this).removeClass('added');
                        }

                        $(this).on('click',function(e){

                            e.stopPropagation(); e.preventDefault();

                            $(this).toggleClass('added');

                            if ( !arrayHasVal(tags,{text: thisTag.text}) ) {
                                $("#sent-bytes .tagsinput").tagsinput('add', thisTag);
                            }else{
                                $("#sent-bytes .tagsinput").tagsinput('remove', thisTag);                               
                            }

                            dashBoard.widgets["sent-bytes"].render(logs);

                        });

                    });

                }

                this.initialized = true;

                this.afterRender();

            }
        },
        "small-box-aqua": {
            pos: 0,
            id: "small-box-aqua",
            parent: "",
            title: "Conexiones en Total",
            type: "small-box",
            active: true,
            initialized: false,
            $el: $('#small-box-aqua'),
            $body: $('#small-box-aqua .inner'),
            logs: [],
            render: function(logs){

                this.beforeRender();

                if ( !$.isArray(logs) || !logs.length ) {
                    this.hideLoading().showMsg('empty')
                    return;
                }

                dashBoard.animateVal('#small-box-aqua h3 > span', logs.filter(function(item){ return item && item.agent!='-' }).length);

                this.initialized = true;

                this.afterRender();

            }
        },
        "small-box-green": {
            pos: 1,
            id: "small-box-green",
            parent: "",
            title: "Usuarios Únicos",
            type: "small-box",
            active: true,
            initialized: false,
            $el: $('#small-box-green'),
            $body: $('#small-box-green .inner'),
            logs: [],
            render: function(logs){

                this.beforeRender();

                if ( !$.isArray(logs) || !logs.length ) {
                    this.hideLoading().showMsg('empty')
                    return;
                }

                // Totals
                var IPs = [];
                $.each(logs, function(i,item){ 
                     if (item.ip) IPs.pushOnce(item.ip);
                });
                dashBoard.animateVal('#small-box-green h3 > span', IPs.length);

                this.initialized = true;

                this.afterRender();

            }
        },
        "small-box-yellow": {
            pos: 2,
            id: "small-box-yellow",
            parent: "",
            title: "Bytes Enviados",
            type: "small-box",
            active: true,
            initialized: false,
            $el: $('#small-box-yellow'),
            $body: $('#small-box-yellow .inner'),
            logs: [],
            render: function(logs){

                this.beforeRender();

                if ( !$.isArray(logs) || !logs.length ) {
                    this.hideLoading().showMsg('empty')
                    return;
                }

                // Totals
                var sentBytes = 0;
                $.each(logs, function(i,item){ 
                     if (item.sent_bytes) sentBytes+=item.sent_bytes;
                });

                var sentMB = parseInt(sentBytes/1048576);
                dashBoard.animateVal('#small-box-yellow h3 > span', sentMB);

                this.initialized = true;

                this.afterRender();

            }
        },
        "small-box-red": {
            pos: 3,
            id: "small-box-red",
            parent: "",
            title: "Conexiones Perdidas",
            type: "small-box",
            active: true,
            initialized: false,
            $el: $('#small-box-red'),
            $body: $('#small-box-red .inner'),
            logs: [],
            render: function(logs){

                this.beforeRender();

                if ( !$.isArray(logs) || !logs.length ) {
                    this.hideLoading().showMsg('empty')
                    return;
                }

                // Totals
                var connectionProbs = 0;

                $.each(logs, function(i,item){ 
                    if (item.status_code != 200) connectionProbs++;
                });

                var perc = Number((connectionProbs*100)/logs.length).toFixed(2);
                dashBoard.animateVal('#small-box-red h3 > span', perc);

                this.initialized = true;

                this.afterRender();

            }
        },
        "small-box-blue": {
            pos: 4,
            id: "small-box-blue",
            parent: "",
            title: "Duración Promedio",
            type: "small-box",
            active: true,
            initialized: false,
            $el: $('#small-box-blue'),
            $body: $('#small-box-blue .inner'),
            logs: [],
            render: function(logs){

                this.beforeRender();

                if ( !$.isArray(logs) || !logs.length ) {
                    this.hideLoading().showMsg('empty')
                    return;
                }

                // Totals
                var totalDuration = 0;
                var durationCount = 0;

                $.each(logs, function(i,item){ 
                    if ( item.duration>5000 ){
                        totalDuration += item.duration;
                        durationCount++;
                    }
                });

                var promedio = Number(((totalDuration/durationCount)/60)/60).toFixed(0);
                dashBoard.animateVal('#small-box-blue h3 > span', promedio);

                this.initialized = true;

                this.afterRender();

            }
        },

    };

$(function () {
    /**
     * Start dashBoard
     *
     */

    $(document).ready(function(){ 
        dashBoard = new DashBoard(widgets);
    }); 

})
