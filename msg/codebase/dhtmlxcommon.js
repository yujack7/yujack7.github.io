dhtmlx=function(c){for(var b in c){dhtmlx[b]=c[b]}return dhtmlx};dhtmlx.extend_api=function(a,d,c){var b=window[a];if(!b){return}window[a]=function(g){if(g&&typeof g=="object"&&!g.tagName){var f=b.apply(this,(d._init?d._init(g):arguments));for(var e in dhtmlx){if(d[e]){this[d[e]](dhtmlx[e])}}for(var e in g){if(d[e]){this[d[e]](g[e])}else{if(e.indexOf("on")==0){this.attachEvent(e,g[e])}}}}else{var f=b.apply(this,arguments)}if(d._patch){d._patch(this)}return f||this};window[a].prototype=b.prototype;if(c){dhtmlXHeir(window[a].prototype,c)}};dhtmlxAjax={get:function(a,c){var b=new dtmlXMLLoaderObject(true);b.async=(arguments.length<3);b.waitCall=c;b.loadXML(a);return b},post:function(a,c,d){var b=new dtmlXMLLoaderObject(true);b.async=(arguments.length<4);b.waitCall=d;b.loadXML(a,true,c);return b},getSync:function(a){return this.get(a,null,true)},postSync:function(a,b){return this.post(a,b,null,true)}};function dtmlXMLLoaderObject(c,d,b,a){this.xmlDoc="";if(typeof(b)!="undefined"){this.async=b}else{this.async=true}this.onloadAction=c||null;this.mainObject=d||null;this.waitCall=null;this.rSeed=a||false;return this}dtmlXMLLoaderObject.prototype.waitLoadFunction=function(b){var a=true;this.check=function(){if((b)&&(b.onloadAction!=null)){if((!b.xmlDoc.readyState)||(b.xmlDoc.readyState==4)){if(!a){return}a=false;if(typeof b.onloadAction=="function"){b.onloadAction(b.mainObject,null,null,null,b)}if(b.waitCall){b.waitCall.call(this,b);b.waitCall=null}}}};return this.check};dtmlXMLLoaderObject.prototype.getXMLTopNode=function(b,c){if(this.xmlDoc.responseXML){var a=this.xmlDoc.responseXML.getElementsByTagName(b);if(a.length==0&&b.indexOf(":")!=-1){var a=this.xmlDoc.responseXML.getElementsByTagName((b.split(":"))[1])}var d=a[0]}else{var d=this.xmlDoc.documentElement}if(d){this._retry=false;return d}if((_isIE)&&(!this._retry)){var e=this.xmlDoc.responseText;var c=this.xmlDoc;this._retry=true;this.xmlDoc=new ActiveXObject("Microsoft.XMLDOM");this.xmlDoc.async=false;this.xmlDoc.loadXML(e);return this.getXMLTopNode(b,c)}dhtmlxError.throwError("LoadXML","Incorrect XML",[(c||this.xmlDoc),this.mainObject]);return document.createElement("DIV")};dtmlXMLLoaderObject.prototype.loadXMLString=function(b){if(!_isIE){var a=new DOMParser();this.xmlDoc=a.parseFromString(b,"text/xml")}else{this.xmlDoc=new ActiveXObject("Microsoft.XMLDOM");this.xmlDoc.async=this.async;this.xmlDoc.onreadystatechange=function(){};this.xmlDoc.loadXML(b)}if(this.onloadAction){this.onloadAction(this.mainObject,null,null,null,this)}if(this.waitCall){this.waitCall();this.waitCall=null}};dtmlXMLLoaderObject.prototype.loadXML=function(c,b,a,d){if(this.rSeed){c+=((c.indexOf("?")!=-1)?"&":"?")+"a_dhx_rSeed="+(new Date()).valueOf()}this.filePath=c;if((!_isIE)&&(window.XMLHttpRequest)){this.xmlDoc=new XMLHttpRequest()}else{this.xmlDoc=new ActiveXObject("Microsoft.XMLHTTP")}if(this.async){this.xmlDoc.onreadystatechange=new this.waitLoadFunction(this)}this.xmlDoc.open(b?"POST":"GET",c,this.async);if(d){this.xmlDoc.setRequestHeader("User-Agent","dhtmlxRPC v0.1 ("+navigator.userAgent+")");this.xmlDoc.setRequestHeader("Content-type","text/xml")}else{if(b){this.xmlDoc.setRequestHeader("Content-type","application/x-www-form-urlencoded")}}this.xmlDoc.setRequestHeader("X-Requested-With","XMLHttpRequest");this.xmlDoc.send(null||a);if(!this.async){(new this.waitLoadFunction(this))()}};dtmlXMLLoaderObject.prototype.destructor=function(){this._filterXPath=null;this._getAllNamedChilds=null;this._retry=null;this.async=null;this.rSeed=null;this.filePath=null;this.onloadAction=null;this.mainObject=null;this.xmlDoc=null;this.doXPath=null;this.doXPathOpera=null;this.doXSLTransToObject=null;this.doXSLTransToString=null;this.loadXML=null;this.loadXMLString=null;this.doSerialization=null;this.xmlNodeToJSON=null;this.getXMLTopNode=null;this.setXSLParamValue=null;return null};dtmlXMLLoaderObject.prototype.xmlNodeToJSON=function(d){var c={};for(var b=0;b<d.attributes.length;b++){c[d.attributes[b].name]=d.attributes[b].value}c._tagvalue=d.firstChild?d.firstChild.nodeValue:"";for(var b=0;b<d.childNodes.length;b++){var a=d.childNodes[b].tagName;if(a){if(!c[a]){c[a]=[]}c[a].push(this.xmlNodeToJSON(d.childNodes[b]))}}return c};function callerFunction(a,b){this.handler=function(c){if(!c){c=window.event}a(c,b);return true};return this.handler}function getAbsoluteLeft(a){return getOffset(a).left}function getAbsoluteTop(a){return getOffset(a).top}function getOffsetSum(a){var c=0,b=0;while(a){c=c+parseInt(a.offsetTop);b=b+parseInt(a.offsetLeft);a=a.offsetParent}return{top:c,left:b}}function getOffsetRect(d){var g=d.getBoundingClientRect();var h=document.body;var b=document.documentElement;var a=window.pageYOffset||b.scrollTop||h.scrollTop;var f=window.pageXOffset||b.scrollLeft||h.scrollLeft;var e=b.clientTop||h.clientTop||0;var i=b.clientLeft||h.clientLeft||0;var j=g.top+a-e;var c=g.left+f-i;return{top:Math.round(j),left:Math.round(c)}}function getOffset(a){if(a.getBoundingClientRect){return getOffsetRect(a)}else{return getOffsetSum(a)}}function convertStringToBoolean(a){if(typeof(a)=="string"){a=a.toLowerCase()}switch(a){case"1":case"true":case"yes":case"y":case 1:case true:return true;break;default:return false}}function getUrlSymbol(a){if(a.indexOf("?")!=-1){return"&"}else{return"?"}}function dhtmlDragAndDropObject(){if(window.dhtmlDragAndDrop){return window.dhtmlDragAndDrop}this.lastLanding=0;this.dragNode=0;this.dragStartNode=0;this.dragStartObject=0;this.tempDOMU=null;this.tempDOMM=null;this.waitDrag=0;window.dhtmlDragAndDrop=this;return this}dhtmlDragAndDropObject.prototype.removeDraggableItem=function(a){a.onmousedown=null;a.dragStarter=null;a.dragLanding=null};dhtmlDragAndDropObject.prototype.addDraggableItem=function(a,b){a.onmousedown=this.preCreateDragCopy;a.dragStarter=b;this.addDragLanding(a,b)};dhtmlDragAndDropObject.prototype.addDragLanding=function(a,b){a.dragLanding=b};dhtmlDragAndDropObject.prototype.preCreateDragCopy=function(a){if((a||window.event)&&(a||event).button==2){return}if(window.dhtmlDragAndDrop.waitDrag){window.dhtmlDragAndDrop.waitDrag=0;document.body.onmouseup=window.dhtmlDragAndDrop.tempDOMU;document.body.onmousemove=window.dhtmlDragAndDrop.tempDOMM;return false}if(window.dhtmlDragAndDrop.dragNode){window.dhtmlDragAndDrop.stopDrag(a)}window.dhtmlDragAndDrop.waitDrag=1;window.dhtmlDragAndDrop.tempDOMU=document.body.onmouseup;window.dhtmlDragAndDrop.tempDOMM=document.body.onmousemove;window.dhtmlDragAndDrop.dragStartNode=this;window.dhtmlDragAndDrop.dragStartObject=this.dragStarter;document.body.onmouseup=window.dhtmlDragAndDrop.preCreateDragCopy;document.body.onmousemove=window.dhtmlDragAndDrop.callDrag;window.dhtmlDragAndDrop.downtime=new Date().valueOf();if((a)&&(a.preventDefault)){a.preventDefault();return false}return false};dhtmlDragAndDropObject.prototype.callDrag=function(c){if(!c){c=window.event}dragger=window.dhtmlDragAndDrop;if((new Date()).valueOf()-dragger.downtime<100){return}if(!dragger.dragNode){if(dragger.waitDrag){dragger.dragNode=dragger.dragStartObject._createDragNode(dragger.dragStartNode,c);if(!dragger.dragNode){return dragger.stopDrag()}dragger.dragNode.onselectstart=function(){return false};dragger.gldragNode=dragger.dragNode;document.body.appendChild(dragger.dragNode);document.body.onmouseup=dragger.stopDrag;dragger.waitDrag=0;dragger.dragNode.pWindow=window;dragger.initFrameRoute()}else{return dragger.stopDrag(c,true)}}if(dragger.dragNode.parentNode!=window.document.body&&dragger.gldragNode){var a=dragger.gldragNode;if(dragger.gldragNode.old){a=dragger.gldragNode.old}a.parentNode.removeChild(a);var b=dragger.dragNode.pWindow;if(a.pWindow&&a.pWindow.dhtmlDragAndDrop.lastLanding){a.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(a.pWindow.dhtmlDragAndDrop.lastLanding)}if(_isIE){var f=document.createElement("Div");f.innerHTML=dragger.dragNode.outerHTML;dragger.dragNode=f.childNodes[0]}else{dragger.dragNode=dragger.dragNode.cloneNode(true)}dragger.dragNode.pWindow=window;dragger.gldragNode.old=dragger.dragNode;document.body.appendChild(dragger.dragNode);b.dhtmlDragAndDrop.dragNode=dragger.dragNode}dragger.dragNode.style.left=c.clientX+15+(dragger.fx?dragger.fx*(-1):0)+(document.body.scrollLeft||document.documentElement.scrollLeft)+"px";dragger.dragNode.style.top=c.clientY+3+(dragger.fy?dragger.fy*(-1):0)+(document.body.scrollTop||document.documentElement.scrollTop)+"px";if(!c.srcElement){var d=c.target}else{d=c.srcElement}dragger.checkLanding(d,c)};dhtmlDragAndDropObject.prototype.calculateFramePosition=function(e){if(window.name){var c=parent.frames[window.name].frameElement.offsetParent;var d=0;var b=0;while(c){d+=c.offsetLeft;b+=c.offsetTop;c=c.offsetParent}if((parent.dhtmlDragAndDrop)){var a=parent.dhtmlDragAndDrop.calculateFramePosition(1);d+=a.split("_")[0]*1;b+=a.split("_")[1]*1}if(e){return d+"_"+b}else{this.fx=d}this.fy=b}return"0_0"};dhtmlDragAndDropObject.prototype.checkLanding=function(b,a){if((b)&&(b.dragLanding)){if(this.lastLanding){this.lastLanding.dragLanding._dragOut(this.lastLanding)}this.lastLanding=b;this.lastLanding=this.lastLanding.dragLanding._dragIn(this.lastLanding,this.dragStartNode,a.clientX,a.clientY,a);this.lastLanding_scr=(_isIE?a.srcElement:a.target)}else{if((b)&&(b.tagName!="BODY")){this.checkLanding(b.parentNode,a)}else{if(this.lastLanding){this.lastLanding.dragLanding._dragOut(this.lastLanding,a.clientX,a.clientY,a)}this.lastLanding=0;if(this._onNotFound){this._onNotFound()}}}};dhtmlDragAndDropObject.prototype.stopDrag=function(b,c){dragger=window.dhtmlDragAndDrop;if(!c){dragger.stopFrameRoute();var a=dragger.lastLanding;dragger.lastLanding=null;if(a){a.dragLanding._drag(dragger.dragStartNode,dragger.dragStartObject,a,(_isIE?event.srcElement:b.target))}}dragger.lastLanding=null;if((dragger.dragNode)&&(dragger.dragNode.parentNode==document.body)){dragger.dragNode.parentNode.removeChild(dragger.dragNode)}dragger.dragNode=0;dragger.gldragNode=0;dragger.fx=0;dragger.fy=0;dragger.dragStartNode=0;dragger.dragStartObject=0;document.body.onmouseup=dragger.tempDOMU;document.body.onmousemove=dragger.tempDOMM;dragger.tempDOMU=null;dragger.tempDOMM=null;dragger.waitDrag=0};dhtmlDragAndDropObject.prototype.stopFrameRoute=function(c){if(c){window.dhtmlDragAndDrop.stopDrag(1,1)}for(var a=0;a<window.frames.length;a++){try{if((window.frames[a]!=c)&&(window.frames[a].dhtmlDragAndDrop)){window.frames[a].dhtmlDragAndDrop.stopFrameRoute(window)}}catch(b){}}try{if((parent.dhtmlDragAndDrop)&&(parent!=window)&&(parent!=c)){parent.dhtmlDragAndDrop.stopFrameRoute(window)}}catch(b){}};dhtmlDragAndDropObject.prototype.initFrameRoute=function(c,d){if(c){window.dhtmlDragAndDrop.preCreateDragCopy();window.dhtmlDragAndDrop.dragStartNode=c.dhtmlDragAndDrop.dragStartNode;window.dhtmlDragAndDrop.dragStartObject=c.dhtmlDragAndDrop.dragStartObject;window.dhtmlDragAndDrop.dragNode=c.dhtmlDragAndDrop.dragNode;window.dhtmlDragAndDrop.gldragNode=c.dhtmlDragAndDrop.dragNode;window.document.body.onmouseup=window.dhtmlDragAndDrop.stopDrag;window.waitDrag=0;if(((!_isIE)&&(d))&&((!_isFF)||(_FFrv<1.8))){window.dhtmlDragAndDrop.calculateFramePosition()}}try{if((parent.dhtmlDragAndDrop)&&(parent!=window)&&(parent!=c)){parent.dhtmlDragAndDrop.initFrameRoute(window)}}catch(b){}for(var a=0;a<window.frames.length;a++){try{if((window.frames[a]!=c)&&(window.frames[a].dhtmlDragAndDrop)){window.frames[a].dhtmlDragAndDrop.initFrameRoute(window,((!c||d)?1:0))}}catch(b){}}};var _isFF=false;var _isIE=false;var _isOpera=false;var _isKHTML=false;var _isMacOS=false;var _isChrome=false;if(navigator.userAgent.indexOf("Macintosh")!=-1){_isMacOS=true}if(navigator.userAgent.toLowerCase().indexOf("chrome")>-1){_isChrome=true}if((navigator.userAgent.indexOf("Safari")!=-1)||(navigator.userAgent.indexOf("Konqueror")!=-1)){var _KHTMLrv=parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Safari")+7,5));if(_KHTMLrv>525){_isFF=true;var _FFrv=1.9}else{_isKHTML=true}}else{if(navigator.userAgent.indexOf("Opera")!=-1){_isOpera=true;_OperaRv=parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera")+6,3))}else{if(navigator.appName.indexOf("Microsoft")!=-1){_isIE=true;if(navigator.appVersion.indexOf("MSIE 8.0")!=-1&&document.compatMode!="BackCompat"){_isIE=8}if(navigator.appVersion.indexOf("MSIE 9.0")!=-1&&document.compatMode!="BackCompat"){_isIE=8}if(navigator.appVersion.indexOf("MSIE 9.0")!=-1&&document.compatMode!="BackCompat"){_isIE=8}}else{_isFF=true;var _FFrv=parseFloat(navigator.userAgent.split("rv:")[1])}}}dtmlXMLLoaderObject.prototype.doXPath=function(e,b,d,f){if(_isKHTML||(!_isIE&&!window.XPathResult)){return this.doXPathOpera(e,b)}if(_isIE){if(!b){if(!this.xmlDoc.nodeName){b=this.xmlDoc.responseXML}else{b=this.xmlDoc}}if(!b){dhtmlxError.throwError("LoadXML","Incorrect XML",[(b||this.xmlDoc),this.mainObject])}if(d!=null){b.setProperty("SelectionNamespaces","xmlns:xsl='"+d+"'")}if(f=="single"){return b.selectSingleNode(e)}else{return b.selectNodes(e)||new Array(0)}}else{var a=b;if(!b){if(!this.xmlDoc.nodeName){b=this.xmlDoc.responseXML}else{b=this.xmlDoc}}if(!b){dhtmlxError.throwError("LoadXML","Incorrect XML",[(b||this.xmlDoc),this.mainObject])}if(b.nodeName.indexOf("document")!=-1){a=b}else{a=b;b=b.ownerDocument}var g=XPathResult.ANY_TYPE;if(f=="single"){g=XPathResult.FIRST_ORDERED_NODE_TYPE}var h=new Array();var c=b.evaluate(e,a,function(j){return d},g,null);if(g==XPathResult.FIRST_ORDERED_NODE_TYPE){return c.singleNodeValue}var i=c.iterateNext();while(i){h[h.length]=i;i=c.iterateNext()}return h}};function _dhtmlxError(b,a,c){if(!this.catches){this.catches=new Array()}return this}_dhtmlxError.prototype.catchError=function(a,b){this.catches[a]=b};_dhtmlxError.prototype.throwError=function(b,a,c){if(this.catches[b]){return this.catches[b](b,a,c)}if(this.catches.ALL){return this.catches.ALL(b,a,c)}alert("Error type: "+arguments[0]+"\nDescription: "+arguments[1]);return null};window.dhtmlxError=new _dhtmlxError();dtmlXMLLoaderObject.prototype.doXPathOpera=function(a,c){var e=a.replace(/[\/]+/gi,"/").split("/");var d=null;var b=1;if(!e.length){return[]}if(e[0]=="."){d=[c]}else{if(e[0]==""){d=(this.xmlDoc.responseXML||this.xmlDoc).getElementsByTagName(e[b].replace(/\[[^\]]*\]/g,""));b++}else{return[]}}for(b;b<e.length;b++){d=this._getAllNamedChilds(d,e[b])}if(e[b-1].indexOf("[")!=-1){d=this._filterXPath(d,e[b-1])}return d};dtmlXMLLoaderObject.prototype._filterXPath=function(e,d){var g=new Array();var d=d.replace(/[^\[]*\[\@/g,"").replace(/[\[\]\@]*/g,"");for(var f=0;f<e.length;f++){if(e[f].getAttribute(d)){g[g.length]=e[f]}}return g};dtmlXMLLoaderObject.prototype._getAllNamedChilds=function(e,d){var h=new Array();if(_isKHTML){d=d.toUpperCase()}for(var g=0;g<e.length;g++){for(var f=0;f<e[g].childNodes.length;f++){if(_isKHTML){if(e[g].childNodes[f].tagName&&e[g].childNodes[f].tagName.toUpperCase()==d){h[h.length]=e[g].childNodes[f]}}else{if(e[g].childNodes[f].tagName==d){h[h.length]=e[g].childNodes[f]}}}}return h};function dhtmlXHeir(e,d){for(var f in d){if(typeof(d[f])=="function"){e[f]=d[f]}}return e}function dhtmlxEvent(b,c,a){if(b.addEventListener){b.addEventListener(c,a,false)}else{if(b.attachEvent){b.attachEvent("on"+c,a)}}}dtmlXMLLoaderObject.prototype.xslDoc=null;dtmlXMLLoaderObject.prototype.setXSLParamValue=function(c,d,b){if(!b){b=this.xslDoc}if(b.responseXML){b=b.responseXML}var a=this.doXPath("/xsl:stylesheet/xsl:variable[@name='"+c+"']",b,"http://www.w3.org/1999/XSL/Transform","single");if(a!=null){a.firstChild.nodeValue=d}};dtmlXMLLoaderObject.prototype.doXSLTransToObject=function(d,a){if(!d){d=this.xslDoc}if(d.responseXML){d=d.responseXML}if(!a){a=this.xmlDoc}if(a.responseXML){a=a.responseXML}if(!_isIE){if(!this.XSLProcessor){this.XSLProcessor=new XSLTProcessor();this.XSLProcessor.importStylesheet(d)}var b=this.XSLProcessor.transformToDocument(a)}else{var b=new ActiveXObject("Msxml2.DOMDocument.3.0");try{a.transformNodeToObject(d,b)}catch(c){b=a.transformNode(d)}}return b};dtmlXMLLoaderObject.prototype.doXSLTransToString=function(c,a){var b=this.doXSLTransToObject(c,a);if(typeof(b)=="string"){return b}return this.doSerialization(b)};dtmlXMLLoaderObject.prototype.doSerialization=function(b){if(!b){b=this.xmlDoc}if(b.responseXML){b=b.responseXML}if(!_isIE){var a=new XMLSerializer();return a.serializeToString(b)}else{return b.xml}};dhtmlxEventable=function(obj){obj.attachEvent=function(name,catcher,callObj){name="ev_"+name.toLowerCase();if(!this[name]){this[name]=new this.eventCatcher(callObj||this)}return(name+":"+this[name].addEvent(catcher))};obj.callEvent=function(name,arg0){name="ev_"+name.toLowerCase();if(this[name]){return this[name].apply(this,arg0)}return true};obj.checkEvent=function(name){return(!!this["ev_"+name.toLowerCase()])};obj.eventCatcher=function(obj){var dhx_catch=[];var z=function(){var res=true;for(var i=0;i<dhx_catch.length;i++){if(dhx_catch[i]!=null){var zr=dhx_catch[i].apply(obj,arguments);res=res&&zr}}return res};z.addEvent=function(ev){if(typeof(ev)!="function"){ev=eval(ev)}if(ev){return dhx_catch.push(ev)-1}return false};z.removeEvent=function(id){dhx_catch[id]=null};return z};obj.detachEvent=function(id){if(id!=false){var list=id.split(":");this[list[0]].removeEvent(list[1])}};obj.detachAllEvents=function(){for(var name in this){if(name.indexOf("ev_")==0){delete this[name]}}}};