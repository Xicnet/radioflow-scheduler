/**
 * Radio Flow Scheduler
 * ------------------
 */
var dashBoard;
var today = new Date();
var todayToISO = today.toISOString().split('T')[0];
var now = today.getTime();
var weekDaysToNumber = { "lunes": 1, "martes": 2, "miercoles": 3, "miércoles": 3, "jueves": 4, "viernes": 5, "sábado": 6, "sabado": 6, "domingo": 0 };
var dayNumberToWeekDay = { 1: "lunes", 2: "martes", 3: "miercoles", 3: "miércoles", 4: "jueves", 5: "viernes", 6: "sábado", 6: "sabado", 0: "domingo" };

var logsApiPath = jsonApiPath + 'logs/';
var programsApiPath = jsonApiPath + 'program_stat/';

var bgClasses = ['bg-green','bg-light-blue','bg-blue','bg-aqua','bg-yellow','bg-red','bg-teal','bg-olive','bg-lime','bg-orange','bg-fuchsia','bg-purple','bg-maroon','bg-navy','bg-black','bg-red-active','bg-yellow-active','bg-aqua-active','bg-blue-active','bg-light-blue-active','bg-green-active','bg-navy-active','bg-teal-active','bg-olive-active','bg-lime-active','bg-orange-active','bg-fuchsia-active','bg-purple-active','bg-maroon-active','bg-black-active'];
var hierarchyClasses = ['bg-green','bg-light-blue','bg-blue','bg-aqua','bg-yellow','bg-teal','bg-olive','bg-lime','bg-orange','bg-fuchsia','bg-purple','bg-maroon','bg-navy','bg-yellow-active','bg-aqua-active','bg-blue-active','bg-light-blue-active','bg-green-active','bg-navy-active','bg-teal-active','bg-olive-active','bg-lime-active','bg-orange-active','bg-fuchsia-active','bg-purple-active','bg-maroon-active'];
var randomColors = ['rgb(0, 166, 90)', 'rgb(60, 141, 188)', 'rgb(0, 115, 183)', 'rgb(0, 192, 239)', 'rgb(221, 75, 57)', 'rgb(57, 204, 204)', 'rgb(61, 153, 112)', 'rgb(1, 255, 112)', 'rgb(255, 133, 27)', 'rgb(240, 18, 190)', 'rgb(243, 156, 18)'];
var randomColors2 = ['#274240','#056499','#074547','#682636','#127987','#680665','#081408','#681971','#352294','#251046','#690803'];


/**
* Get a prestored setting
*
* @param String name Name of of the setting
* @returns String The value of the setting | null
*/
function get(name) {
    if (typeof (Storage) !== 'undefined') {
      return localStorage.getItem(name)
    } else {
      alert('Please use a modern browser to properly view this template!')
    }
}

/**
* Store a new settings in the browser
*
* @param String name Name of the setting
* @param String val Value of the setting
* @returns void
*/
function store(name, val) {
    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem(name, val)
    } else {
      alert('Please use a modern browser to properly view this template!')
    }
}

function DashBoard(widgets, requireLogs) {

    var self=this;

    this.widgets = widgets;
    this.deviceNames = {
        mobile: 'Celular',
        tablet: 'Tablet',
        desktop: 'Computadora'  
    },
    this.logs={},
    this.programlogs={},
    this.Widget = function(widget){

        widget.pos          = widget.pos          || 0,
        widget.active       = widget.active       || true,
        widget.initialized  = widget.initialized  || false,
        widget.logs         = widget.logs         || [],
        widget.programlogs  = widget.programlogs  || [];

        widget.showLoading=function(msg,callback){
            widget.$el.addClass('loading')
            callback = callback || function(){};
            callback()
            return widget;
        },
        widget.hideLoading=function(msg,callback){
            widget.$el.removeClass('loading')
            callback = callback || function(){};
            callback()
            return widget;
        },
        widget.beforeRender=function(){
            widget.title && widget.$boxTitle.text(widget.title);
            widget.showLoading();
            widget.reset();
        },
        widget.afterRender=function(){
            widget.hideLoading();
        },
        widget.reset=function(){
            widget.$el.removeClass('error empty')
            widget.$body.find('h3.alert.error').remove();
        },
        widget.showMsg=function(type){

            switch (type ) {
                case 'empty':

                    widget.$el.addClass('empty')
                    widget.$body.find('h3.alert.error.empty').remove()
                    widget.$body.prepend('<h3 class="alert error empty"><i class="alert-icon ion-alert-circled"/>No hay datos para el período</h3>')
                    
                    break;
                
                default:
                    //code
                    break;
            }
        },
        widget.joinLogs=function(logs,programlogs) {

            widget.joinedLogs = [];

            if (logs && logs.length){ 

                widget.logs = JSON.parse(JSON.stringify(logs));

                var thisDateRangePicker = widget.$el.find('.daterange'),
                    start,
                    end;

                if (thisDateRangePicker.length){
                    var dateRangeData = thisDateRangePicker.data('daterangepicker');
                    start = dateRangeData.startDate._d.toISOString().split('T')[0]
                    end = dateRangeData.endDate._d.toISOString().split('T')[0]
                    widget.start = start;
                    widget.end = end;
                }

                widget.showLoading()
                dashBoard.requestProgramsLogs(start,end,widget.joinLogs)
                return;
            };

            if (programlogs && programlogs.length) {

                widget.programlogs = programlogs

                // duration:     161
                // id:           64
                // log_entry:    3561
                // program_name: "Prueba"

                // console.log('logs',widget.logs);
                // console.log('programlogs',programlogs);

                var joinedLogs = [];

                $.each(widget.logs, function(i,item){ 

                    var startTime = new Date(item.datetime_start);
                    var endTime = (item.datetime_end && new Date(item.datetime_end)) || startTime;

                    item.startISO = startTime.toISOString().split('T')[0];
                    item.startDay = startTime.getDay();
                    item.startHour = startTime.getHours();
                    
                    item.endISO = endTime.toISOString().split('T')[0];
                    item.endDay = endTime.getDay();
                    item.endHour = endTime.getHours();

                    var programs = programlogs.filter(function(program){
                        return item.id == program.log_entry;
                    });

                    item.programs = programs.map(function(program,index) {
                        return program;
                    });

                })

                $.each(programlogs, function(i,program){ 

                    if (program.log_entry) {

                        var program_name = program.program_name;

                        var item = widget.logs.find(function(log){
                            return log.id == program.log_entry;
                        });

                        if (item && item.datetime_start) {
                            
                            program.log = item;
                            joinedLogs.push(program);
                            
                        }

                    }

                })

                widget.joinedLogs = joinedLogs;
                widget.render(null, programlogs)

            };
            

        }

    },
    this.getWidget=function(id){
        return self.widgets.find(widget=>widget.id==id);
    },
    this.getDeviceFromAgent=function(agent){

        var itemDevice = '';

        if ( agent && agent!="-" ) {

            //  Chromium: {
            //   'Mozilla/5.0 (Linux; Ubuntu 14.04 like Android 4.4) AppleWebKit/537.36 Chromium/35.0.1870.2 Mobile Safari/537.36': {
            //     osname: 'Linux', 
            //     mobile: true, 
            //     linux: true, 
            //     chromium: true, 
            //     version: '35.0', 
            //     blink: true, 
            //     a: true
            //   }
            //  }

            if ( window.userAgents ) {

                try{
                    var agData = Object.getOwnPropertyNames(userAgents).map(function(bName, index, array){
                        var aName = Object.getOwnPropertyNames(userAgents[bName]).find(function(uAgent, index, array){
                            return agent==uAgent
                        })
                        return aName && { browser: bName, agent: aName }
                    }).filter(function(val){return val})

                    itemDevice = agData.length && agData[0].browser && agData[0].agent && userAgents[agData[0].browser][agData[0].agent] ?
                        (
                            userAgents[agData[0].browser][agData[0].agent].mobile ? 'mobile' : 
                            (
                                userAgents[agData[0].browser][agData[0].agent].tablet ? 'tablet' : 'desktop'
                            )
                        )
                    : ''
                    
                }catch(err){
                    console.log(err);
                    itemDevice = ''
                }

            }

            if (!itemDevice) {
                
                if ( 
                    agent.toLowerCase().indexOf('windows')>=0 
                    ||
                    agent.toLowerCase().indexOf('ubuntu')>=0 
                    ||
                    agent.toLowerCase().indexOf('libvlc')>=0 
                    ) {
                    itemDevice = 'desktop'
                }else
                if ( 
                    agent.toLowerCase().indexOf('stagefright')>=0 
                    ||
                    agent.toLowerCase().indexOf('android')>=0 
                    ||
                    agent.toLowerCase().indexOf('samsung')>=0 
                    ||
                    agent.toLowerCase().indexOf('moto')>=0 
                    ||
                    agent.toLowerCase().indexOf('nexus')>=0 
                    ||
                    agent.toLowerCase().indexOf('iphone')>=0 
                    ) {
                    itemDevice = 'mobile'
                }

            }

        }

        return itemDevice;

    },
    this.animateVal=function(selector, val){

        var stepVal = val>0 && val<1 ? (val*100) : Number(val)/100;
        var increaser = 0;
        var step = 0;

        var animationIntval=setInterval( function(){ 
            step++;
            increaser+=Number(stepVal);
            var displayVal = val>0 && val<1 ? '0.'+Number(increaser/100).toFixed(0) : (val-parseInt(val)!=0 ? Number(increaser).toFixed(2) : Number(increaser).toFixed(0));

            if ( step>=100 ) {
                displayVal=val;
                clearInterval(animationIntval);
            }
            
            $(selector).text(displayVal);

        }, 10 );

    },
    this.requestProgramsLogs=function(startToISO, endToISO, callback) {
        this.requestLogs(startToISO, endToISO, callback, 'programs');
    },
    this.requestLogs=function(startToISO, endToISO, callback, api) {

        var programs = api === 'programs';
        var targetKey = programs ? 'programlogs' : 'logs';
        callback = callback || function(){};

        if  ( 
                startToISO
                && endToISO 
                && parseFloat(endToISO.replaceAll('-','')) < parseFloat(todayToISO.replaceAll('-','')) 
                && self[targetKey][startToISO+'_'+endToISO]
            ) {
                callback(self.logs[startToISO+'_'+endToISO]);
                return;
        }

        if (!startToISO) {

            var endDate = new Date();
            var startDate = new Date();

            endDate.setDate(endDate.getDate() - 1);
            startDate.setMonth(startDate.getMonth() - 3);

            endToISO = endDate.toISOString().split('T')[0];
            startToISO = startDate.toISOString().split('T')[0];

        }

        var queryStr = '?start='+startToISO + '&end='+endToISO + '&mount='+mount+'&format=json';
        var targetApiPath = programs ? programsApiPath+queryStr : logsApiPath+queryStr;

        // console.log('targetApiPath: '+targetApiPath);

        $.ajax({
            url: targetApiPath,
            type: 'GET',
            data: { format: 'json', mount: mount, start: startToISO, end: endToISO },
            dataType: 'json',
            success: function(logs) {
                // console.log(logs);
                console.log(logs.length);

                var programlogs = [];

                if (programs) {
                    programlogs = logs
                    self.programlogs[startToISO+'_'+endToISO] = logs;
                    logs = []
                }
                else
                    self.logs[startToISO+'_'+endToISO] = logs

                callback(logs, programlogs);
            },
            error: function(error){
                 console.log(error.statusText);
            }
      
        });
      
    },
    this.refresh=function(){
        setTimeout( function(){ 
            var e = new Event('resize');
            e.fake = true;
            window.dispatchEvent(e);
        }, 300 );
    },
    this.init=function(requireLogs){

        requireLogs=requireLogs!==false;

        $('[data-toggle="control-sidebar"]').controlSidebar()
        $('[data-toggle="push-menu"]').pushMenu()
        $('[data-toggle="tooltip"]').tooltip()

        // Make the dashboard widgets sortable Using jquery UI
        $('.connectedSortable').sortable({
            forcePlaceholderSize: true,
            placeholder: 'sort-highlight',
            connectWith: '.connectedSortable',
            handle: '.box-header, .nav-tabs',
            zIndex: 999999,
            stop: function(e,ui){
                console.log(e,ui);
                self.refresh()
            },
        });

        $('.connectedSortable .box-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move');

        
        var mainDateRange = $('#main-range');
        var startDate = new Date();
        var endDate = new Date();
        

        if (mainDateRange.length){

            var dateRangeData = mainDateRange.data('daterangepicker');

            startDate = dateRangeData.startDate._d;
            endDate = dateRangeData.endDate._d;

        }else{

            startDate.setMonth(startDate.getMonth() - 1);
            endDate.setDate(endDate.getDate() - 1);
            
        }

        startToISO = startDate.toISOString().split('T')[0];
        endToISO = endDate.toISOString().split('T')[0];

        this.widgets.map(function(widget){    
            return new self.Widget(widget);
        });

        if (requireLogs) {
            this.requestLogs(startToISO, endToISO, this.render);
        }else{
            this.render();
        }

    },
    this.beforeRender=function(callback){
        callback = callback || function(){};
        self.widgets.forEach(function(widget){
            widget.showLoading()
        });
        callback();
    },
    this.afterRender=function(){
        
    },
    this.render=function(logs){

        self.beforeRender();

        self.widgets.forEach(function(widget, i){
            setTimeout( function(widget){
                widget.render(logs)
            }, i*100, widget );
        })

    }

    this.init(requireLogs);

}

// agent: "LG-H340/V10d Player/LG Player 1.0 for Android 5.0.1 (stagefright alternative)",
// auth_pass: "",
// auth_user: "",
// country_code: "AR",
// datetime_end: "2018-02-14T00:05:49Z",
// datetime_start: "2018-02-14T00:05:18Z",
// duration: 31,
// id: 5386,
// ip: "186.141.133.81",
// mount: "radioapp.mp3",
// referer: "-",
// sent_bytes: 47483,
// server: "stream",
// status_code: 200,

