
var numCharCodes = {
	110: 'ponto',
 	190: 'ponto',
 	188: 'virgula',
 	13: 'enter',
 	9: 'tab',
 	46: 'delete',
 	8: 'backspace',
 	27: 'esc',
 	35: 'end',
 	36: 'home',
 	37: 'seta esq',
 	39: 'seta dir',
 	16: 'shift',
 	17: 'control',
 	18: 'alt',
 };

//-------------------------------------------------------------------------
//JQUERY EXTENSIONS
//-------------------------------------------------------------------------
jQuery(function($){

	$.fn.getCursorPosition = function() {
	     var el = $(this).get(0);
	     var pos = 0;
	     if('selectionStart' in el) {
	         pos = el.selectionStart;
	     } else if('selection' in document) {
	         el.focus();
	         var Sel = document.selection.createRange();
	         var SelLength = document.selection.createRange().text.length;
	         Sel.moveStart('character', -el.value.length);
	         pos = Sel.text.length - SelLength;
	     }
	     return pos;
	}
	
 	$.extend($.expr[":"], {
		"containsIN": function(elem, i, match, array) {

			var searchString = [];
			if ( elem.innerText != null && elem.innerText != "" ){
				searchString.push(elem.innerText);
			}; 
			if ( elem.value != null && elem.value != "" ){
				searchString.push(elem.value);
			};

			for (var i = 0; i < searchString.length; i++) {
				return ( searchString[i] || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
			};
		},
		"matchesIN": function(elem, i, match, array) {

			var searchString = [];
			if ( elem.innerText != null && elem.innerText != "" ){
				searchString.push(elem.innerText);
			}; 
			if ( elem.value != null && elem.value != "" ){
				searchString.push(elem.value);
			};

			for (var i = 0; i < searchString.length; i++) {
				return ( searchString[i] || "").indexOf((match[3] || "")) >= 0;
			};
		}
		
	});

	 $.fn.serializeAnything = function() {

	 	var toReturn	= [];
	 	var els 		= $(this).find(':input').get();

	 	$.each(els, function() {
	 		if (this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))) {
	 			var val = $(this).val();
	 			toReturn.push( encodeURIComponent(this.name) + "=" + encodeURIComponent( val ) );
	 		}
	 	});

	 	return toReturn.join("&").replace(/%20/g, "+");

	}

	jQuery.fn.mousehold = function(timeout, f) {
		if (timeout && typeof timeout == 'function') {
			f = timeout;
			timeout = 100;
		}
		if (f && typeof f == 'function') {
			var timer = 0;
			var fireStep = 0;
			return this.each(function() {
				jQuery(this).mousedown(function() {
					fireStep = 1;
					var ctr = 0;
					var t = this;
					timer = setInterval(function() {
						ctr++;
						f.call(t, ctr);
						fireStep = 2;
					}, timeout);
				})

				clearMousehold = function() {
					clearInterval(timer);
					if (fireStep == 1) f.call(this, 1);
					fireStep = 0;
				}
				
				jQuery(this).mouseout(clearMousehold);
				jQuery(this).mouseup(clearMousehold);
			})
		}
	}

	$.fn.extend({

		getAttr: function( toFormat, attr ) {

			var element = this;
			if ( typeof element != 'object' || typeof element == 'object' && !element.jquery ) return {};

			var attributes = [element.get(0).attributes];
			var attributesArr = [];
			var returnAttr;
			var a = 0;

			$.each(element.get(0).attributes, function(i, attrib){ 

				if ( isDefined(attr) ) {

					if ( hasStr(attr,':not') ) {

						var not = attr.split(':not(')[1].split(')')[0].replace(/^\s+|\s+$/gm,'');

				    	if ( !hasStr(not,attrib.name) ) {
							attributesArr[a] = [];
							attributesArr[a]['name'] = attrib.name;
							attributesArr[a]['value'] = attrib.value;
							a++;
				    	};				

					}else{

				    	if ( hasStr(attr,attrib.name) ) {
							attributesArr[a] = [];
							attributesArr[a]['name'] = attrib.name;
							attributesArr[a]['value'] = attrib.value;
							a++;
						};
					};

				}else{

					attributesArr[a] = [];
					attributesArr[a]['name'] = attrib.name;
					attributesArr[a]['value'] = attrib.value;
					a++;

				};

			});

			// update with html modifications
			for( a in attributesArr ){

				var attrName = attributesArr[a].name;
				var val = attributesArr[a].value;

				if ( element.attr(attrName) !== val ) {
					attributesArr[a]['value'] = element.attr(attrName);
				}

			}

			var toArray = isDefined(toFormat) && toFormat == 'toArray' || !isDefined(toFormat);
			var toJSON = isDefined(toFormat) && toFormat == 'toJSON';
			var toString = isDefined(toFormat) && toFormat == 'toString';

			// RETURN FORMAT
	    	if ( toJSON ) {

	    		var jObject={};
	    		    for(i in attributesArr)
	    		    {
	    		        jObject[attributesArr[i]['name']] = attributesArr[i]['value'];
	    		    }

	    		returnAttr = jObject;

	    	}else 
	    	if ( toString ) {

	    		attributesStr = '';
	    		for (var i = 0; i < attributesArr.length; i++) {
	    			attributesStr = attributesStr.sep(' ')+attributesArr[i]['name']+'="'+attributesArr[i]['value']+'"';
	    		};

	    		returnAttr = attributesStr;

	    	}else{

	    		returnAttr = attributesArr;

	    	};
	    	
			return returnAttr;
				
		},

		hasAttr: function( string ) {

			var element = this;
			var match = false;

			if( typeof element == 'object' && element.get(0) )

			$.each( element.get(0).attributes, 

				function(i, attrib){

					if ( attrib.name == string ) {
					    return match = true;
					};

				}

			);

			return match;

		},

		hasAttrVal: function( string, attr, match, matchAll ) {

			var element = this;
			var stringFied = stringfy(string).replace(' ','').split(',');
			var attributes = [];
			var attr, match, matchAll;

			if ( !isDefined( matchAll ) ){ matchAll = false; };
			if ( !isDefined( match ) ){ match = false; };

			var matchAttr = isDefined( attr );

			element.each(function(){

				element = $(this);

				$.each(

					element.get(0).attributes,

					function(i, attrib){

						var push = false;
						if ( !matchAttr && !match ) {
							push = true;

						}else{

							if ( matchAttr && !match ){								
								if ( attrib.name == attr ) {
									push = true;
								}else{
									push = false;
								};
							}

							if ( match && !matchAttr ) {								
								if ( attrib.value == string ) {
									push = true;
								}else{
									push = false;
								};
							}

							if ( matchAttr && match ) {								
								if ( attrib.name == attr && attrib.value == string ) {
									push = true;
								}else{
									push = false;
								};
							};

						}
						if ( push ) {
						    attributes.push( attrib.value );
						};
					});

			});

			var fullString = attributes.join('').replace(' ','');

			for (var i = 0; i < stringFied.length; i++) {
				if ( hasStr( fullString, stringFied[i] ) ) {
					stringFied[i] = true;
				}else{
					stringFied[i] = false;
				};
			};
			
			return matchAll ? !hasStr(stringFied.join(''), 'false' ) : hasStr(stringFied.join(''), 'true' );
				
		},

		hasAnyOf: function( string, options, matchAll ) {

			var element = this;
			var stringFied = string.replace(' ','').split(',');
			var attributes = [];

			if ( !isDefined( matchAll ) ){ matchAll = false; }

			element.each(function(){

				element = $(this);

				$.each(

					element.get(0).attributes, 

					function(i, attrib){

					    attributes.push( attrib.name );
					    attributes.push( attrib.value );

					}

				);


			});

			var matchAll, fullString = attributes.join('').replace(' ','');

			for (var i = 0; i < stringFied.length; i++) {
				if ( hasStr( fullString, stringFied[i] ) ) {
					stringFied[i] = true;
				}else{
					stringFied[i] = false;
				};
			};
			
			if ( matchAll ) {
				matchAll = !hasStr(stringFied.join(''), 'false' );
			}else{
				matchAll = hasStr(stringFied.join(''), 'true' );
			};

			return matchAll;
				
		},

		value: function(newValue,filter) {

			filterStr = isDefined(filter) && typeof filter == 'string' ? filter : '*';

			if ( !isDefined(newValue) ) {
				return this.filter(filterStr).attr('value') || '';
			}else{
				return this.filter(filterStr).attr('value',newValue);
			}

		},

		id: function(newID) {

			if ( !isDefined(newID) ) {

				return this.attr('id');

			}else{

				return this.attr('id',newID);
			};

		},

		getTarget: function( filter, attr ) {

			attr = isDefined(attr) && typeof attr == 'string' ? attr : 'data-target';

			var elemSelector = this.attr(attr);

			var returnElement = $();
				
			if ( !isDefined(elemSelector) ) return returnElement;

			elemSelector = elemSelector.split(',');

			for (var i = 0; i < elemSelector.length; i++) {
				
				if ( hasStr( elemSelector[i], 'closest:') ) {
					var targetStr = elemSelector[i].split('closest:')[1];
					returnElement = returnElement.add(this.closest(targetStr));
				}else 
				if ( hasStr( elemSelector[i], 'find:') ) {
					var targetStr = elemSelector[i].split('find:')[1];
					returnElement = returnElement.add(this.find(targetStr));
				}else 
				if ( hasStr( elemSelector[i], 'siblings:') ) {
					var targetStr = elemSelector[i].split('siblings:')[1];
					returnElement = returnElement.add(this.siblings(targetStr));
				}else 
				if ( hasStr( elemSelector[i], 'self') ) {
					returnElement = returnElement.add(this);
				}else{
					returnElement = returnElement.add($(elemSelector[i]));
				}
			};

			filterStr = isDefined(filter) ? filter : '*';

			if ( isDefined(options) && options == 'id' ) {
				return returnElement.filter(filterStr).id();
			}else{
				return returnElement.filter(filterStr);
			};

		},

		closestOrMe: function( selectors ) {

			var jQElement = this;
			selectors = selectors.split(',');
			var match = true;

			for (var i = 0; i < selectors.length; i++) {
				var thisSelector = selectors[i];
				if ( jQElement.closest(thisSelector).length > 0 ) {
					return jQElement.closest(thisSelector);
				}else{
					match = false;
				};
			};

			return !match ? jQElement : jQElement;
		},

		appendOnce: function(selector,html) {

			return this.has(selector).length ? this : this.append(html);

		},

		prependOnce: function(selector,html) {

			return this.has(selector).length ? this : this.prepend(html);

		},

		hasFocus: function(filter) {

			if ( this.length == 0 ) return false;

			filterStr = isDefined(filter) ? filter : '*';

			return ( this.filter(filterStr).is(':focus') || this.find(':focus').filter(filterStr).length );

		},

		outerHTML: function( string ){
		 
		 	if ( !isDefined(string) ) {

			    // IE, Chrome & Safari will comply with the non-standard outerHTML, all others (FF) will have a fall-back for cloning
			    return (!this.length) ? this : (this[0].outerHTML || (
			      function(el){
			          var div = document.createElement('div');
			          div.appendChild(el.cloneNode(true));
			          var contents = div.innerHTML;
			          div = null;
			          return contents;
			    })(this[0]));

		 	}else{

		 		var element = this;
		 		element.get(0).outerHTML = string;

		 	};
		 
		},

		removeAll: function( attr ) {

			if (!this.length) return this;

			var element = this;
			var attributes = [element.get(0).attributes];
			var not = [];
			// var not = attr.split(':not(')[1].split(')')[0].replace(/^\s+|\s+$/gm,'');

			if (hasStr(attr,':not(')) {
				not = attr.split(':not(')[1].split(')')[0].replaceAll(' ','').split(',');
			}

			$.each(element.get(0).attributes,

				function(i, attrib){
			    	attributes[i] = attrib.name;
			    	
				}

			);

			for (var i = 0; i < attributes.length; i++) {
		    	var thisAttr = attributes[i];
		    	if ( !arrayHasVal(not,thisAttr) ) {
		    		element.removeAttr(thisAttr);
		    	};				
			};

			return element;
				
		},

		clearStyle: function() {

			this.removeAttr('style')
			this.removeClass('removeStyle')
			return this;

		},

	}); // END JQUERY EXTENSIONS


	$.atbottom=function(element,settings){
	var fold=$('body').outerHeight()+$('body').scrollTop();return fold<=$(element).offset().top-settings.threshold;};
	$.attop=function(element,settings){
	var top=$('body').offset().top;return top>=$(element).offset().top-settings.threshold;};
	$.atright=function(element,settings){
	var fold=$('body').width()+$('body').scrollLeft();return fold<=$(element).offset().left-settings.threshold;};
	$.atleft=function(element,settings){
	var left=$('body').scrollLeft();return left>=$(element).offset().left+$(element).width()-settings.threshold;};
	$.incontainer=function(element,settings){
	return!$.attop(element,settings.top)&&!$.atbottom(element,settings.bottom)&&!$.atleft(element,settings.left)&&!$.atright(element,settings.right);};

	$.extend($.expr[':'],{
		"at-bottom":function(a,i,m){
			return $.atbottom(a,{ threshold:0});
		},
		"at-top":function(a,i,m){
			return $.attop(a,{ threshold:0});
		},
		"at-left":function(a,i,m){
			return $.atleft(a,{ threshold:0});
		},
		"at-right":function(a,i,m){
			return $.atright(a,{ threshold:0});
		},
		"in-container":function(a,i,m){
			return $.incontainer(a,{top:{ threshold:$(a).outerHeight() },bottom:{ threshold:0 },left:{ threshold:0 },right:{ threshold:0 } });
		}
	});

  	// --------------------------------------------------------------
  	// events
  	// --------------------------------------------------------------
  	
  	// Auto toggle siblings class
  	$(document).on('mousedown','.toggleSiblings[data-class]',function(){ 
		$(this).siblings().removeClass( $(this).attr('data-class') );
  		$(this).addClass($(this).attr('data-class'))
  	});
  	// Auto add class
  	$(document).on('mousedown','.addClass[data-add-class]',function(e){ 
  		e.preventDefault();
  		var target = $(this).attr('data-target') || this;
  		$(target).addClass($(this).attr('data-add-class'))
  	});
  	// Auto toggle class
  	$(document).on('mousedown','.toggleClass[data-class]',function(e){ 
  		e.preventDefault();
  		var target = $(this).attr('data-target') || this;
  		$(target).toggleClass($(this).attr('data-class'))
  	});
  	// Dispatch event
  	$(document).on('mousedown','[data-event]',function(e){ 
  		event = $(this).attr('data-event');
  		if (event) setTimeout( function(event){ 
			window.dispatchEvent(new Event(event));
		}, 500, event );
  	});
  	// --------------------------------------------------------------

});

