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

var jsonApiSrc = 'http://icelog-dev.xicnet.com/stats/api/logs/';
var bgClasses = ['bg-green','bg-light-blue','bg-blue','bg-aqua','bg-yellow','bg-red','bg-teal','bg-olive','bg-lime','bg-orange','bg-fuchsia','bg-purple','bg-maroon','bg-navy','bg-black','bg-red-active','bg-yellow-active','bg-aqua-active','bg-blue-active','bg-light-blue-active','bg-green-active','bg-navy-active','bg-teal-active','bg-olive-active','bg-lime-active','bg-orange-active','bg-fuchsia-active','bg-purple-active','bg-maroon-active','bg-black-active'];
var randomColors = ['rgb(0, 166, 90)', 'rgb(60, 141, 188)', 'rgb(0, 115, 183)', 'rgb(0, 192, 239)', 'rgb(221, 75, 57)', 'rgb(57, 204, 204)', 'rgb(61, 153, 112)', 'rgb(1, 255, 112)', 'rgb(255, 133, 27)', 'rgb(240, 18, 190)', 'rgb(243, 156, 18)'];


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
    this.Widget = function(id){

        var widget = self.widgets[id];
        for (var key in widget) {
            this[key] = widget[key];
        }

        this.showLoading=function(msg,callback){
            this.$el.addClass('loading')
            callback = callback || function(){};
            callback()
            return this;
        },
        this.hideLoading=function(msg,callback){
            this.$el.removeClass('loading')
            callback = callback || function(){};
            callback()
            return this;
        },
        this.beforeRender=function(){
            this.showLoading();
            this.reset();
        },
        this.afterRender=function(){
            this.hideLoading();
        },
        this.reset=function(){
            this.$el.removeClass('error empty')
            this.$body.find('h3.alert.error').remove();
        },
        this.showMsg=function(type){

            switch (type ) {
                case 'empty':

                    this.$el.addClass('empty')
                    this.$body.find('h3.alert.error.empty').remove()
                    this.$body.prepend('<h3 class="alert error empty"><i class="alert-icon ion-alert-circled"/>No hay datos para el período</h3>')
                    
                    break;
                
                default:
                    //code
                    break;
            }
        };

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
    this.requestLogs=function(startToISO, endToISO, callback) {

        callback = callback || function(){};

        if ( startToISO && endToISO && parseFloat(endToISO.replaceAll('-','')) < parseFloat(todayToISO.replaceAll('-','')) && self.logs[startToISO+'_'+endToISO]) {
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

        var apiQueryStr = ( jsonApiSrc + '?start='+startToISO + '&end='+endToISO + '&mount=radioapp.mp3&format=json' );
        console.log('apiQueryStr: '+apiQueryStr);

        $.ajax({
            url: apiQueryStr,
            type: 'GET',
            // data: { format: 'json', mount: 'radioapp.mp3', start: startToISO, end: endToISO },
            success: function(data) {
                console.log(data);
                self.logs[startToISO+'_'+endToISO] = data;
                callback(data);
             
            },
            error: function(error){
                 console.log(error.statusText);
            }
      
        });
      
    },
    this.init=function(requireLogs){

        requireLogs=requireLogs!==false;

        $('[data-toggle="control-sidebar"]').controlSidebar()
        $('[data-toggle="push-menu"]').pushMenu()
        $('[data-toggle="tooltip"]').tooltip()

        // Make the dashboard widgets sortable Using jquery UI
        $('.connectedSortable').sortable({
          placeholder         : 'sort-highlight',
          connectWith         : '.connectedSortable',
          handle              : '.box-header, .nav-tabs',
          forcePlaceholderSize: true,
          zIndex              : 999999
        });

        $('.connectedSortable .box-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move');

        var endDate = new Date();
        var startDate = new Date();
        
        endDate.setDate(endDate.getDate() - 1);
        startDate.setMonth(startDate.getMonth() - 3);

        endToISO = endDate.toISOString().split('T')[0];
        startToISO = startDate.toISOString().split('T')[0];

        for (var id in this.widgets) {
            if ( this.widgets[id].$el.length) {
                this.widgets[id] = new self.Widget(id);
            }else{
                delete this.widgets[id];
            }
        }

        if (requireLogs) {
            this.requestLogs(startToISO, endToISO, this.render);
        }else{
            this.render();
        }

    },
    this.beforeRender=function(callback){
        callback = callback || function(){};
        for (var id in self.widgets) {
            self.widgets[id].showLoading()
        }
        callback();
    },
    this.afterRender=function(){
        
    },
    this.render=function(logs){

        self.beforeRender();

        var i=0;
        for (var id in self.widgets) {
            setTimeout( function(id){
                self.widgets[id].render(logs)
            }, i*100, id );
            i++;
        }

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

