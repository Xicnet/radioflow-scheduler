
var hasJquery = typeof jQuery == 'function';

// NUMBER
// --------------------------

if (hasJquery && window.localStorage) {

	var localJSON = {
	    create: function (key,obj) {
	        if (!obj && !localJSON.get(key)) {
	            window.localStorage.setItem( key, '{}' );
	        }else
	        if (obj && !obj[key]) {
	            obj[key] = {};
	        }
	    },
	    set: function (key, obj) {
	        window.localStorage.setItem( key, JSON.stringify(obj) );
	    },
	    get: function (key,returnFalse) {
	        returnFalse = returnFalse === true;
	        if (localStorage.getItem(key)) {
	            try {
	                return JSON.parse( localStorage.getItem(key) );
	            } catch (e) {
	                return returnFalse ? false : {};
	            }
	        }else{
	            return returnFalse ? false : {};            
	        }
	    },
	    find: function (key,subkey,searchValue,match) {
	        if (localStorage.getItem(key)) {
	            try {
	                obj = localJSON.get(key);

	                if(isDefined(searchValue)){
	                    if(jQuery.isArray(obj)){
	                        for (var k = 0; k < obj.length; k++) {
	                            if ( 
	                                obj[k][subkey] == searchValue 
	                                || 
	                                (match===false && typeof obj[k][subkey] == 'string' && hasStr(obj[k][subkey].toLowerCase(),searchValue.toLowerCase()))){
	                                return obj[k];
	                            }
	                        }
	                    }else
	                    if (!jQuery.isEmptyObject(obj)) {
	                        for (var k in obj) {
	                            if ( 
	                                obj[k][subkey] == searchValue 
	                                || 
	                                (match===false && typeof obj[k][subkey] == 'string' && hasStr(obj[k][subkey].toLowerCase(),searchValue.toLowerCase()))){
	                                return obj[k];
	                            }
	                        }
	                    }else{

	                    }
	                }else{
	                    return obj[subkey] ? obj[subkey] : {};                    
	                }

	                return {};

	            } catch (e) {
	                return {};
	            }
	        }else{
	            return {};            
	        }
	    },
	    push: function (key,subkey,val) {

	        obj = localJSON.get(key);
	        if (typeof obj != 'object') {
	            obj = {};
	        }
	        if ( !(subkey in obj) ) {
	            obj[subkey] = [];
	        }

	        obj[subkey].push(val);
	        localJSON.set(key,obj);

	    },
	    update: function (key,subkey,val) {

	      if (obj = localJSON.get(key,true)) {
	        obj[subkey] = val;
	        localJSON.set(key,obj);
	      }else{
	        obj = {};
	        obj[subkey] = val;
	        localJSON.set(key,obj);
	      }

	      return obj;
	    },
	    clone: function (obj) {
	      return obj && !jQuery.isEmptyObject(obj)?JSON.parse(JSON.stringify(obj)):{};
	    },
	    remove: function (key) {
	        window.localStorage.removeItem( key );
	    },
	    delete: function (key, subkey) {
	        try{
	            tempObj = localJSON.get(key)
	            delete tempObj[subkey];
	            localJSON.update(key,tempObj);
	        }catch(err){
	            localJSON.log(err);
	        }
	    },
	    concat: function (str,obj) {
	      if (typeof str == 'string' && !Array.isArray(obj) && typeof obj == 'object' && !jQuery.isEmptyObject(obj)) {
	        var arr = [];
	        for (var k in obj) arr.push(obj[k]);
	        return arr.join(str);
	      }else{
	        return '';
	      }
	    },
	    log: function(logMsg){
	        try{
	            if (device.platform.toLowerCase() === 'browser') {
	                // console.log(logMsg);
	            }else{
	                if (typeof logMsg == 'object') {
	                    // console.log(JSON.stringify(logMsg));
	                }else{
	                    // console.log(logMsg);
	                }
	            }
	        }catch(err){
	            // console.log(logMsg);
	        }
	    }

	};

}

if (hasJquery && !Number.prototype.toPercent) {

	Number.prototype.toPercent = function( dimension, parent ) {

		parentHeight = typeof parent == 'number' ? parent : isDefined(parent) ? parent.outerHeight() : jQuery(window).height();
		parentWidth = typeof parent == 'number' ? parent : isDefined(parent) ? parent.outerWidth() : jQuery(window).width();
		return dimension == 'height' ? parseInt(this)/parentHeight*100 : parseInt(this)/parentWidth*100;

	};

}

// STRING
// --------------------------

if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(str,replace) {
      var parentStr = this;
      if ( isDefined(str, true, true) && isDefined(replace, true, true) ) {
          if (str=='.') {
              return parentStr.replace(/\./g, replace);
          }else{
          	  regexStr = str;
          	  regexStr = regexStr.replace(/\[/g,'\\[').replace(/\]/g,'\\]');
          	  regexStr = regexStr.replace(/\(/g,'\\(').replace(/\)/g,'\\)');
              return parentStr.replace(new RegExp(regexStr, 'g'), replace);
          }
      }else{
          return parentStr.toString();
      };
    };
}

if (!String.prototype.sep) {
	String.prototype.sep = function(separator) {
	  return isDefined(this) && isDefined(separator) ? this+separator : this;
	};
}

if (!String.prototype.toDoubleDigit) {
	String.prototype.toDoubleDigit = function(placeHolder) {
		placeHolder = placeHolder || '0';
		try{
			return this.toString().length == 1 ? '0'+this.toString() :  this;
		}catch(err){
			console.log(err);
			return this;
		}
	};
}

if (!Number.prototype.toDoubleDigit) {
	Number.prototype.toDoubleDigit = function(placeHolder) {
		placeHolder = placeHolder || '0';
		try{
			return this.toString().length == 1 ? '0'+this.toString() :  this;
		}catch(err){
			console.log(err);
			return this;
		}
	};
}

if (!String.prototype.lTrim) {
	String.prototype.lTrim = function(char) {
		if (!(typeof this == 'string' || this instanceof String)) return this;
		if(isDefined(this) && isDefined(char,true,true)){
		    var string = this;
			while( this.charAt(0) == char ) {
			    string = string.substring(1);
			}
		  return string
		}else{
		  return this;
		};
	};
}

if (!String.prototype.capitalize) {
	String.prototype.capitalize = function() {
	    var str = this;
	    return typeof str == 'string' ? str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
	}
} 

if (!String.prototype.capitalizeAll) {
	String.prototype.capitalizeAll = function(lowerCases,upperCases,caseSensitive) {

		var newStr = this; 
		caseSensitive = caseSensitive == true;
		if (!(typeof this == 'string' || this instanceof String)) return this;

		if( this.split(' ').length > 1 ){
			if (typeof lowerCases == 'string' || lowerCases instanceof String) lowerCases = [lowerCases];
			if (!Array.isArray(lowerCases)) lowerCases = [];
			if (typeof upperCases == 'string' || upperCases instanceof String) upperCases = [upperCases];
			if (!Array.isArray(upperCases)) upperCases = [];

			if (!caseSensitive) {
				for (var i = 0; i < lowerCases.length; i++) {
					lowerCases[i] = lowerCases[i].toLowerCase();
				}
				for (var i = 0; i < upperCases.length; i++) {
					upperCases[i] = upperCases[i].toUpperCase();
				}
			}
			words = this.split(' ');
			for (var w = 0; w < words.length; w++) {

				thisWordtoLower = caseSensitive ? words[w] : words[w].toLowerCase();
				thisWordtoUpper = caseSensitive ? words[w] : words[w].toUpperCase();

				if ( arrayHasVal(lowerCases,thisWordtoLower)) {
		    		newStr = newStr.replace(words[w],words[w].toLowerCase())
				}else
				if ( arrayHasVal(upperCases,thisWordtoUpper)) {
		    		newStr = newStr.replace(words[w],words[w].toUpperCase())
				}else
				if ( words[w].replaceAll(' ','').length ) {
		    		capitalized = words[w].charAt(0).toUpperCase() + (words[w].substring(1)?words[w].substring(1).toLowerCase():'');
		    		newStr = newStr.replace(words[w],capitalized)
				}
			}
		  	return newStr;
		}else{
		  return this;
		};
	};
}



// ARRAY
// --------------------------

if (!Array.prototype.max) {
	Array.prototype.max = function() {
	  return Math.max.apply(null, this);
	};
}

if (!Array.prototype.min) {
	Array.prototype.min = function() {
	  return Math.min.apply(null, this);
	};
}

if (!Array.prototype.pushOnce) {

  	Array.prototype.pushOnce = function(values) {
    if (!Array.isArray(values)) values = [values];

    var thisArray = this;
  	for (var i = 0; i < values.length; i++) {
  		if ( !arrayHasVal( thisArray, values[i] ) ) { thisArray.push(values[i]) };
  	};
  	return thisArray;
	};
}

if (!Array.prototype.hasVal) {

  	Array.prototype.hasVal = function(values) {

  	var query = false;
    if (!Array.isArray(values)) values = [values];

    var parentArr = this;
  	for (var i = 0; i < parentArr.length; i++) {

  		var thisParentVal = parentArr[i];
  		for (var n = 0; n < values.length; n++) {
  			query = thisParentVal == values[n] ? true : query;
  		};

  	};
  	return query;
	};

}

if (!Array.prototype.unique) {
  	Array.prototype.unique = function() {
	    return this.filter(function(el, index, arr) {
	        return index == arr.indexOf(el);
	    });
	}
}

if (typeof array_unique == 'undefined'){
	function array_unique(array){
	    return array.filter(function(el, index, arr) {
	        return index == arr.indexOf(el);
	    });
	}
}

if (!Array.prototype.remove) {
  Array.prototype.remove = function(vals, all) {
    var i, newArray = [];
    if (vals == '') {
    	for(i = this.length; i--;){
    	  if (!isDefined(this[i],true)) newArray.push(this.splice(i, 1));
    	}
    }else{

	    if (!Array.isArray(vals)) vals = [vals];
	    for (var j=0;j<vals.length; j++) {
	      if (all) {
	        for(i = this.length; i--;){
	          if (this[i] === vals[j]) newArray.push(this.splice(i, 1));
	        }
	      }
	      else {
	        i = this.indexOf(vals[j]);
	        if(i>-1) newArray.push(this.splice(i, 1));
	      }
	    }
    };
    return newArray;
  };
}

if (!Array.prototype.nextObj) {
  Array.prototype.nextObj = function(currIndex,searchKey) {
    var nextObj = {};
    var found = false;
    for (var i = 0; i < this.length; i++) {

      if (currIndex<i && !found) {
      	nextObj = this[i];
      	found = true;
      }

      if (found && !isDefined(searchKey)) {
      	break;
      }else
      if (found && typeof this[i] == "object" && (searchKey in this[i]) ) {
      	nextObj = this[i];
      	break;
      }

    }
    return nextObj;
  }
} 

if (!Array.prototype.prevObj) {
  Array.prototype.prevObj = function(currIndex,searchKey) {
    var prevObj = {};
    var found = false;
    for (var i = this.length - 1; i >= 0; i--) {
      if (currIndex>i && !found) {
      	prevObj = this[i];
      	found = true;
      }

      if (found && !isDefined(searchKey)) {
      	break;
      }else
      if (found && typeof this[i] == "object" && (searchKey in this[i]) ) {
      	prevObj = this[i];
      	break;
      }

    }
    return prevObj;
  }
} 

// DATE
if (!Date.prototype.getWeekNumber) {
	Date.prototype.getWeekNumber = function(){
	  var d = new Date(+this);
	  d.setHours(0,0,0);
	  d.setDate(d.getDate()+4-(d.getDay()||7));
	  // d.setDate(d.getDate()+8-(d.getDay()||7));
	  return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
	};
 //  Date.prototype.getWeekNumber = function(){
 //    var d = new Date(this);
 //    d.setHours(0,0,0,0);
 //  	var firstDayOfSameYear = new Date(d.getFullYear(),0,1);
 //  	console.log('firstDayOfSameYear: '+firstDayOfSameYear);
 //  	// get total seconds between the times
 //  	var delta = Math.abs( d - firstDayOfSameYear )/1000; // "Math.max" in case is january 1st at 00:00:00
 //  	console.log('delta: '+delta);
 //  	// calculate (and subtract) whole days
 //  	var totalDays = Math.floor(delta / 86400)+1;
 //  	console.log('totalDays: '+totalDays);
 //  	// consider the day of the week the year has started 
 //  	var days = totalDays-(firstDayOfSameYear.getDay()==0?7:firstDayOfSameYear.getDay());
 //  	console.log('days: '+days);
 //  	days=Math.max(days,0);
 //  	console.log('days: '+days);
 //  	// calculate entire weeks  	
 //  	var weeks = totalDays > 7 ? Math.ceil(totalDays/7)+1 : 0 ;
 //  	console.log('weeks: '+weeks);
	// firstDayNbr = firstDayOfSameYear.getDay()==0?7:firstDayOfSameYear.getDay();
 //  	if (weeks==0){
 //  		weeks += ( d.getDate() - (7-firstDayNbr) > 1 ? 2 : 1 );
 //  	}else{
 //  		weeks += ( firstDayOfSameYear.getDate() - (7-firstDayNbr) > 1 ? 1 : 0 );
 //  	}
 //  	console.log('weeks: '+weeks);
 //  	// consider the day of the week the year has started 
 //    return weeks;
 //  };
};
					
if (!Date.prototype.localAdjust) {
  Date.prototype.localAdjust = function(resetHours){
  	resetHours = resetHours === true;
    var d = new Date(+this);
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset())
    if (resetHours) d.resetHours()
    return d;
  };
};

if (!Date.prototype.resetHours) {
  Date.prototype.resetHours = function(){
    this.setHours(0,0,0,0);
    return this;
  };
};

if (typeof getDateOfWeek == 'undefined'){
	function getDateOfWeek(w, y) {
	    var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week
	    return new Date(y, 0, d);
	}
}

if (typeof diffObjects == 'undefined'){
function diffObjects(obj1,obj2,keysToIgnore,ignoreEmptyValues){

	var diffKeys = [];
	var diffValues = [];

	ignoreEmptyValues = ignoreEmptyValues == true;
	if (!Array.isArray(keysToIgnore)) keysToIgnore = [];

	if (typeof obj1 == 'object' && typeof obj2 == 'object') {
		for (var key in obj1) {

			diffKeys.pushOnce(key);

			if (arrayHasVal(keysToIgnore,key)) continue;

			if (!(key in obj2)) {
				if (ignoreEmptyValues && !isDefined(obj1[key])) continue;
				diffValues.push({ key:key, val1:obj1[key], val2:undefined });
			}else
			if ( (key in obj2) && ( (typeof obj2[key]) != (typeof obj1[key]) ) ) {
				diffValues.push({ key:key, val1:obj1[key], val2:obj2[key] });
			}else
			if ( (key in obj2) && (obj2[key] != obj1[key]) ) {
				if (ignoreEmptyValues && !isDefined(obj2[key]) && !isDefined(obj1[key])) continue;
				diffValues.push({ key:key, val1:obj1[key], val2:obj2[key] });
			}        	 							

		}
		for (var key in obj2) {

			if (arrayHasVal(diffKeys, key)) continue;

			if (!(key in obj1)) {
				if (ignoreEmptyValues && !isDefined(obj2[key])) continue;
				diffValues.push({ key:key, val1:undefined, val2:obj2[key] });
			}else
			if ( (key in obj1) && ( (typeof obj1[key]) != (typeof obj2[key]) ) ) {
				diffValues.push({ key:key, val1:obj1[key], val2:obj2[key] });
			}else
			if ( (key in obj1) && (obj1[key] != obj2[key]) ) {
				if (ignoreEmptyValues && !isDefined(obj1[key]) && !isDefined(obj2[key])) continue;
				diffValues.push({ key:key, val1:obj1[key], val2:obj2[key] });
			}        	 							

		}
	}
	return diffValues;
	}
}

if (typeof jsonClone == 'undefined'){
	function jsonClone(obj){
		if (typeof obj != 'object') return {}
		return JSON.parse(JSON.stringify(obj));
	};
};

if (typeof isAdmin == 'undefined'){
	function isAdmin(){
		if(!hasJquery) return false;
		return jQuery('body').is('.admin') || hasStr(url,'admin=true');
	};
};

if (typeof isArchive == 'undefined'){
	function isArchive(){
		if(!hasJquery) return false;
	    return jQuery('body').is('.archive');
	}
}

if (typeof isXLScreen == 'undefined'){
	function isXLScreen(returnParam,width){

		if(!hasJquery) return false;

		width = isDefined(width) ? width : 1240;
		var wWidth = jQuery(window).width();

		var resIndex = 6;
		var resSufix = 'xx';

		return returnParam === 'sufix' ? resSufix : returnParam === 'index' ? resIndex : wWidth > width;

	};	
};	

if (typeof isPC == 'undefined'){
	function isPC(returnParam,width){

		if(!hasJquery) return false;

		width = isDefined(width) ? width : 1240;
		var wWidth = jQuery(window).width();

		var resIndex = 5;
		var resSufix = 'xl';

		return returnParam === 'sufix' ? resSufix : returnParam === 'index' ? resIndex : wWidth <= width;

	};	
};	

if (typeof isLGScreen == 'undefined'){
	function isLGScreen(returnParam,width){

		if(!hasJquery) return false;

		width = isDefined(width) ? width : 1240;
		var wWidth = jQuery(window).width();

		var resIndex = 4;
		var resSufix = 'lg';

		return returnParam === 'sufix' ? resSufix : returnParam === 'index' ? resIndex : wWidth <= width;

	};	
};	

if (typeof isTablet == 'undefined'){
	function isTablet(returnParam,width){

		if(!hasJquery) return false;

		width = isDefined(width) ? width : 768;
		var wWidth = jQuery(window).width();

		var resIndex = 3;
		var resSufix = 'md';

		return returnParam === 'sufix' ? resSufix : returnParam === 'index' ? resIndex : wWidth <= width;

	};	
};	

if (typeof isMobile == 'undefined'){
	function isMobile(returnParam,width){

		if(!hasJquery) return false;

		width = isDefined(width) ? width : 480;
		var wWidth = jQuery(window).width();

		var resIndex = 2;
		var resSufix = 'sm';

		return returnParam === 'sufix' ? resSufix : returnParam === 'index' ? resIndex : wWidth <= width;

	};	
};	

if (typeof isXSScreen == 'undefined'){
	function isXSScreen(returnParam,width){

		if(!hasJquery) return false;

		width = isDefined(width) ? width : 320;
		var wWidth = jQuery(window).width();

		var resIndex = 1;
		var resSufix = 'xs';

		return returnParam === 'sufix' ? resSufix : returnParam === 'index' ? resIndex : wWidth <= width;

	};	
};	

if (typeof rightClick == 'undefined'){
	function rightClick(e){
		e = e || event;
		return e.which == 3 || e.button == 2;
	};
};

if (typeof leftClick == 'undefined'){
	function leftClick(e){
		e = e || event;
		return e.which == 1 || e.button == 1;
	};
};

if (typeof hasFocus == 'undefined'){
	function hasFocus(filter){

		if(!hasJquery) return false;

		return jQuery(':focus').hasFocus(filter);

	};
};

if (typeof getFocused == 'undefined'){
	function getFocused(filter){

		if(!hasJquery) return {};

		return jQuery(':focus');

	};
};

if (typeof arrayHasVal == 'undefined'){
function arrayHasVal( array, value, match ) {

	if ( !Array.isArray(array) ) { return; }

	match = match !== false;

	if ( typeof value == 'object' ) {

		for (var key in value) {

			var targetVal = value[key];
			
			for (var i = 0; i < array.length; i++) {
				if ( typeof array[i] != 'object' ) continue;
				if ( ( match && array[i][key] == targetVal ) || (!match && hasStr( array[i][key], targetVal ) ) ) {
					return true;
				};
			};

		}

	}else{

		for (var i = 0; i < array.length; i++) {
			if ( (match && array[i] == value) || (!match && hasStr( array[i], value ) ) ) {
				return true;
			};
		};

	}

	return false;

	}
}

//------------------------------------------------------------------
// SORT MATCHING VALUES
//------------------------------------------------------------------
if (typeof sortMatch == 'undefined'){
function sortMatch(value,array,twinArray){

	if (!isDefined(value) || !isDefined(array) || !Array.isArray(array)) return array;

	if (!isDefined(twinArray) || !Array.isArray(twinArray)) {
		twinArray = array;
	};
	if (twinArray.length!==array.length) twinArray = array;

	value = value.toString().toLowerCase().replaceAll(' ','');

	array.sort(sortMatchFn);
	twinArray.sort(sortMatchFn);

	function sortMatchFn(vA, vB) {

		var valA = vA;
		var valB = vB;

		if (typeof vA=='object' && typeof vB=='object' && 'value' in vA) {
			valA = vA.value;
			valB = vB.value;
		}

		var matchesA = 0;
		var matchesB = 0;

		valA = valA.toString().toLowerCase().replaceAll(' ','');
		valB = valB.toString().toLowerCase().replaceAll(' ','');

		if (valA == value ) {
			matchesA+=100;
		}

		if (valA.indexOf(value)==0) {
			matchesA+=50;
		}else
		if (valA.indexOf(value)>0) {
			matchesA+=25;
		}

		if (valB == value ) {
			matchesB+=100;
		}

		if (valB.indexOf(value)==0) {
			matchesB+=50;
		}else
		if (valB.indexOf(value)>0) {
			matchesB+=25;
		}

		var lengthAMatch = valA.length - value.length;
		var lengthBMatch = valB.length - value.length;

		if(lengthAMatch<lengthBMatch){
			matchesA+=10;
		}else
		if(lengthBMatch<lengthAMatch){
			matchesB+=10;
		};

		for (var s = 0; s < value.length; s++) {
			if( valA.length<=s && value[s] == valA[s] )
			matchesA+=5;
			if( valB.length<=s && value[s] == valB[s] )
			matchesB+=5;
		}

		if(valA.indexOf(value)<valB.indexOf(value)){
			matchesA+=5;				
		}else
		if(valB.indexOf(value)<valA.indexOf(value)){
			matchesB+=5;
		};

		for (var s = 0; s < valA.length; s++) {
			if( hasStr(value,valA[s]) )
			matchesA++;
		}
		for (var s = 0; s < valB.length; s++) {
			if( hasStr(value,valB[s]) )
			matchesB++;
		}

	    return (matchesA < matchesB) ? 1 : (matchesA > matchesB) ? -1 : 0;

	};
	
	}
}

if (typeof sortObjArrayByText == 'undefined'){
	function sortObjArrayByText(array,key,order){
		
		if (Array.isArray(array)) 
			
		array.sort(function(a, b) {

			var textA, textB;

			try{

				if ( order=='desc' ) {
				    textA = b[key];
				    textB = a[key];
				}else{
				    textA = a[key];
				    textB = b[key];
				}

			    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				
			}catch(err){
				console.log(err);
				return 0;
			}

		});
		
		return array;
	};
};

if (typeof sortObjArrayByNum == 'undefined'){
	function sortObjArrayByNum(array,key,order){

		if (Array.isArray(array)) 

		array.sort(function(a, b){ 
				
			var numA = Number(a[key]);
			var numB = Number(b[key]);

			try{

				if ( order=='desc' ) {
					return numB-numA;
				}else{
					return numA-numB;
				}

			}catch(err){
				console.log(err);
				return 0;
			}

		});
		
		return array;
	};
};

if (typeof sortObjArrayAsc == 'undefined'){
	function sortObjArrayAsc(array,key){

	    if ( !Array.isArray(array) ) { return array; }

	    array.sort(function(a, b) {
	        var textA = a[key];
	        var textB = b[key];
	        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	    });
	};
};

if (typeof nextObjItem == 'undefined'){
	function nextObjItem(obj,currKey) {

	    var nextKey = '';
	    var nextVal = '';
	    var isPrev = false;

	    for (var key in obj ){
	      if (isPrev) nextKey = key;
	      if (isPrev) nextVal = obj[key];
	      if (isPrev) break;
	      if (key==currKey) isPrev = true;
	    }

	    return { key:nextKey, val:nextVal };
	} 
} 
if (typeof prevObjItem == 'undefined'){
	function prevObjItem(obj,currKey) {

	    var prevKey = '';
	    var prevVal = '';
	    var isPrev = false;

	    for (var key in obj ){
	      if (key==currKey) break;
	      prevKey = key;
	      prevVal = obj[key];
	    }

	    return { key:prevKey, val:prevVal };
	} 
} 

if (typeof sTrim == 'undefined'){
function sTrim(string, charToRemove, returnFalse) {

	string = stringfy(string);
	var iniLength = string.length;
	returnFalse = returnFalse === true;		

	if (!Array.isArray(charToRemove)) charToRemove = [charToRemove];
	
	for (var i = charToRemove.length - 1; i >= 0; i--) {

		if (Array.isArray(charToRemove[i]) ) {

			if ( charToRemove[i].length == 2 ) {

				if ( 
					( string.match(new RegExp(charToRemove[i][0], 'g')) && !string.match(new RegExp(charToRemove[i][1], 'g')) )
					||
					( string.match(new RegExp(charToRemove[i][1], 'g')) && !string.match(new RegExp(charToRemove[i][0], 'g')) )
				) {

			    	if (returnFalse) return false;

				}else
				if( string.match(new RegExp(charToRemove[i][0], 'g')) && string.match(new RegExp(charToRemove[i][1], 'g')) ){

					if ( string.match(new RegExp(charToRemove[i][0], 'g')).length !== string.match(new RegExp(charToRemove[i][1], 'g')).length ) {

				    	if (returnFalse) return false;

					}else
					if (!returnFalse){

						while( string.charAt(0).match(new RegExp(charToRemove[i][0])) && string.charAt(string.length-1).match(new RegExp(charToRemove[i][1])) ){
						    string = string.substring(1);
						    string = string.substring(0,string.length-1);
						}
						
					}

				}
			}

			charToRemove.splice(i, 1);

		}
	}

	if ( string = lTrim( string, charToRemove, returnFalse ) ) {
    	 string = rTrim( string, charToRemove, returnFalse );
	};

    return string;

	}
}

if (typeof lTrim == 'undefined'){
function lTrim(string, charToRemove, returnFalse) {

	string = stringfy(string);
	var iniLength = string.length;
	returnFalse = returnFalse === true;

	if (charToRemove == 'NaN') {

	    while( Array.isArray(string.charAt(0).match(/[^0-9\.]+/g)) ) {
	    	string = string.substring(1);
	    }			
		
	}else{
	
		if (!Array.isArray(charToRemove)) charToRemove = [charToRemove];
		
	    while( arrayHasVal(charToRemove,string.charAt(0)) ) {
	        string = string.substring(1);
	    }

	}

    // console.log('lTrim:---->>>>>>>>' + string);
    // console.log('----------------------------');
    
    if (returnFalse && string.length!==iniLength) {
		return false;
    }else{
	    return string;
    }
	}
}

if (typeof rTrim == 'undefined'){
function rTrim(string, charToRemove, returnFalse) {

	string = stringfy(string);
	var iniLength = string.length;
	returnFalse = returnFalse === true;

	if (charToRemove == 'NaN') {

		while( Array.isArray(string.charAt(string.length-1).match(/[^0-9\.]+/g)) ) {
			string = string.substring(0,string.length-1);
		}			
		
	}else{
	
		if (!Array.isArray(charToRemove)) charToRemove = [charToRemove];
			
	    while( arrayHasVal(charToRemove,string.charAt(string.length-1)) ) {
	        string = string.substring(0,string.length-1);
	    }

	}

    // console.log('rTrim:---->>>>>>>>' + string);
    // console.log('----------------------------');
    
    if (returnFalse && string.length!==iniLength) {
		return false;
    }else{
	    return string;
    }
	}
}

if (typeof hasStr == 'undefined'){
function hasStr( string, subString, matchAll ){

	if ( !isDefined(subString) || !isDefined(string) ) return false;

	matchAll = matchAll === true; 
	string = stringfy(string);

	if ( !Array.isArray(subString) ) {
		subString = subString.split('::');
	}

	var strCheck = '';
	
	for (var i = 0; i < subString.length; i++) {
		
		var thisSubString = stringfy(subString[i]);

		if ( isDefined(thisSubString) && string.indexOf( thisSubString ) >= 0 ) {
			if ( !matchAll ) return true;
			strCheck+='true';
		}else{
			if ( matchAll ) return false;
			strCheck+='false';
		}

	};

	return ( strCheck.indexOf('true') >= 0 );

	}
}

if (typeof isDefined == 'undefined'){
function isDefined( variable, acceptnull, acceptempty ){

	if ( variable === false || variable === true ) return true;

	acceptnull = acceptnull == true;
	acceptempty = acceptempty == true;
	
	if ( acceptnull && variable === 0 ) return true;
	if ( acceptempty && variable == '' ) return true;
	if ( acceptnull && acceptempty ) return variable !== undefined;

	if ( acceptempty !== false && Array.isArray(variable) ) return true;
	if ( Array.isArray(variable) && variable.length == 0 ) return false;

	return ( variable !== null && variable !== undefined && variable != '' );
		
	}
}

if (typeof isInt == 'undefined'){
	function isInt( val ){

		if (!isDefined(val,true) || isNaN(val) ) return false;

	    return val === parseInt(val, 10);

	}
}

if (typeof stringfy == 'undefined'){
function stringfy( target, separator, returnEmptyifNotValid ){

	if ( target == null || target == undefined ){ 
		target = ""; 
	}else if ( Array.isArray(target) ) {
	 	if (!isDefined(separator)) separator = ' ';
		target = target.join(separator);
	}else
	 if ( typeof target == 'object' ) {
	 	target = JSON.stringify(target);
	}else{
		try{
			target = target.toString();
		}catch(err){
			console.log(err);
			if (returnEmptyifNotValid===true) target = '';
		}
	};

	return target;

	}
}

if (typeof isValidDate == 'undefined'){
	function isValidDate( date ) {

		if ( !isDefined(date) ) return false;

		if ( Object.prototype.toString.call(date) !== "[object Date]" ) return false;
		
		return !isNaN(date.getTime());

	}
}


if (typeof currencyFormat == 'undefined'){
	function currencyFormat(number,userLocale){

		if (!isDefined(userLocale)) userLocale = document.getElementsByTagName('body')[0].getAttribute('lang') || navigator.language || navigator.userLanguage;

		// var options = {style: 'currency', currencyDisplay: 'symbol', currency: currency[userLocale], minimumFractionDigits: 2, maximumFractionDigits: 2};
		var options = {minimumFractionDigits: 2, maximumFractionDigits: 2};
		var formatter = new Intl.NumberFormat(userLocale, options);

		return formatter.format(number);

	};
};

if (typeof numberFormat == 'undefined'){
	function numberFormat(number,userLocale){

		if (!isDefined(userLocale)) userLocale = document.getElementsByTagName('body')[0].getAttribute('lang') || navigator.language || navigator.userLanguage;

		var formatter = new Intl.NumberFormat(userLocale);

		return formatter.format(number);

	};
};

if (typeof visibleHeight == 'undefined'){
	function visibleHeight($el) {

		if(!hasJquery) return 0;

	    var elHeight  = $el.outerHeight(),
	        winHeight = jQuery(window).height(),
	        elRect    = $el[0].getBoundingClientRect(), 
	        top 	  = elRect.top, 
	        bottom	  = elRect.bottom;

	    return Math.max(0, top > 0 ? Math.min(elHeight, winHeight-top) : (bottom<winHeight?bottom:winHeight) );
	}
}


if (typeof specialChars == 'undefined'){
	function specialChars(){

		if(!hasJquery) return;

		jQuery('.title-wraper, tr.sort [data-sort]').each(function(){
			jQuery(this).html(jQuery(this).html().replaceAll('Ã©','é'));
			jQuery(this).html(jQuery(this).html().replaceAll('Ã­','í'));
			jQuery(this).html(jQuery(this).html().replaceAll('Ã¡','á'));
			jQuery(this).html(jQuery(this).html().replaceAll('Ã³','ó'));
			jQuery(this).updateOnSave('table title');
		})

		jQuery('[data-colnames]').each(function(){
			jQuery(this).attr('data-colnames', jQuery(this).attr('data-colnames').replaceAll('Ã©','é') );
			jQuery(this).attr('data-colnames', jQuery(this).attr('data-colnames').replaceAll('Ã­','í') );
			jQuery(this).attr('data-colnames', jQuery(this).attr('data-colnames').replaceAll('Ã¡','á') );
			jQuery(this).attr('data-colnames', jQuery(this).attr('data-colnames').replaceAll('Ã³','ó') );
			jQuery(this).updateOnSave('table title');
		})

		jQuery('[value*="Ã©"]').each(function(){ 
			jQuery(this).attr('value', jQuery(this).attr('value').replaceAll('Ã©','é')); 
			jQuery(this).val(jQuery(this).val().replaceAll('Ã©','é')); 
			jQuery(this).html(jQuery(this).html().replaceAll('Ã©','é'));
			jQuery(this).updateOnSave('cell val');
		})

		jQuery('[value*="Ã­"]').each(function(){ 
			jQuery(this).attr('value', jQuery(this).attr('value').replaceAll('Ã­','í')); 
			jQuery(this).val(jQuery(this).val().replaceAll('Ã­','í')); 
			jQuery(this).html(jQuery(this).html().replaceAll('Ã­','í'));
			jQuery(this).updateOnSave('cell val');
		})

		jQuery('[value*="Ã¡"]').each(function(){ 
			jQuery(this).attr('value', jQuery(this).attr('value').replaceAll('Ã¡','á')); 
			jQuery(this).val(jQuery(this).val().replaceAll('Ã¡','á')); 
			jQuery(this).html(jQuery(this).html().replaceAll('Ã¡','á'));
			jQuery(this).updateOnSave('cell val');
		})

		jQuery('[value*="Ã³"]').each(function(){ 
			jQuery(this).attr('value', jQuery(this).attr('value').replaceAll('Ã³','ó')); 
			jQuery(this).val(jQuery(this).val().replaceAll('Ã³','ó')); 
			jQuery(this).html(jQuery(this).html().replaceAll('Ã³','ó'));
			jQuery(this).updateOnSave('cell val');
		})

	};
};
