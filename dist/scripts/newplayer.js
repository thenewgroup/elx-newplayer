function AssessmentService(){function a(a,b,c){h.required=a,i.required=b,c=c}function b(){var a=h.required+i.required;return 0===a?1:Math.min((h.viewed.required+i.answered.required)/a,1)}function c(){return 0===j?!0:b()>=j}function d(a,b){h.viewed.total++,h.viewed.log.push(a),b&&h.viewed.required++}function e(a,b){i.answered.total++,i.answered.log.push(a),b&&i.answered.required++}function f(){return h}function g(){return i}var h={required:0,viewed:{required:0,total:0,log:[]}},i={required:0,answered:{required:0,total:0,log:[]}},j=.8,k={getScore:b,isPassing:c,setRequirements:a,pageViewed:d,questionCorrectlyAnswered:e,getPageStats:f,getQuestionStats:g};return k}function npMediaElementDirective(a){a.debug("\nmediaelementDirective::Init\n");var b=function(){this.restrict="A",this.link=function(b,c,d){jQuery(c).attr("poster",b.poster),jQuery(c).attr("src",b.mp4),jQuery(c).prepend(b.sources),d.$observe("src",function(){a.debug("mediaelementDirective::element",c),jQuery(c).mediaelementplayer()})}};return new b}function npMediaElementDirective(a){a.debug("\nnpHotspot mediaelementDirective::Init\n");var b=function(){this.restrict="A",this.link=function(){}};return new b}function npMenuDirective(a,b){function c(a,b,c){var d=this;d.changePageId=function(b){a.info("changePageId",b),c.setPageId(b)}}a.debug("\nnpMenuDirective::Init\n");var d=function(){this.restrict="EA",this.scope={menuitem:"="},this.template='<a ng-click="vm.changePageId(menuitem.id);" id="menu{{menuitem.id}}" ng-class="(menuitem.current===true) ? \'selected\' : \'\'">{{ menuitem.text }}</a><ul><li ng-repeat="child in menuitem.children"><span np-menu menuitem="child"></span></li></ul>',this.controllerAs="vm",this.controller=c,this.compile=function(c){var d=c.contents().remove();a.debug("npMenu::compile",d);var e;return function(c,f){e||(e=b(d)),e(c,function(b){a.debug("npMenu::compile:linked",b),f.append(b)})}}};return c.$inject=["$log","$compile","ManifestService"],new d}!function(){"use strict";angular.module("newplayer.service",[])}(),function(){"use strict";function a(a,b){a.debug("\nApiService: Init\n");var c=function(){this.getData=function(c){a.debug("APIService::getData: URL:",c);var d=b.get(c,{cache:!0}).then(function(b){return a.debug("APIService::Received data from server ",b),b.data});return d}};return new c}angular.module("newplayer.service").factory("APIService",a),a.$inject=["$log","$http"]}(),function(){"use strict";function a(a,b){a.debug("configService::Init");var c=function(){function b(b){a.debug("ConfigService::setManifestURL",b),g.manifestURL=b}function c(a){g.overrideURL=a}function d(d){if(a.debug("ConfigService::initialize:config:",d,g.getManifestId()),!d.manifestId)throw new Error("manifestId cannot be empty");if(g.setManifestId(d.manifestId),!d.manifestURL)throw new Error("manifestURL cannot be empty");b(d.manifestURL),d.overrideURL&&c(d.overrideURL),d.overrideManifest&&f(d.overrideManifest)}function e(a){g.configData=a}function f(b){a.debug("ConfigService::setOverrideData:",b),g.overrideData=b}var g=this;this.setManifestId=function(b){a.debug("ConfigService::setManifestId",b),g.manifestId=b},this.getManifestId=function(){return g.manifestId},this.getManifestURL=function(){return g.manifestURL},this.getOverrideURL=function(){return g.overrideURL},this.getConfig=function(){return g.configData},this.getConfigData=function(b){a.debug("ConfigService::getConfigData:",b);var c=g.getData(b);return c.then(function(b){a.debug("ConfigService::config data from server ",b),e(b[0]),d(b[0])}),c},this.setConfigData=function(b){a.debug("ConfigService::config data from server ",b),e(b),d(b)},this.getOverride=function(){return g.overrideData},this.getOverrideData=function(b){a.debug("ConfigService::getOverrideData:",b);var c=g.getData(b);return c.then(function(b){angular.extend(g.getOverride()||{},b[0]),a.debug("ConfigService::getOverrideData: merged:",g.getOverride())}),c}},d=new c;return angular.extend(d,b),a.debug("ConfigService::",d),d}angular.module("newplayer.service").factory("ConfigService",a),a.$inject=["$log","APIService","ManifestService"]}(),function(){"use strict";function a(a,b){a.debug("\nManifestService::Init\n");var c=function(){function c(){return m}function d(a){m=a}function e(){return n}function f(a){n=a}function g(){return o}function h(a){o=a}function i(){var a=g(),b=null;if(a)if(b=p.getComponent(a),b.components&&b.components.length>0)a.push(0),b=p.getComponent(a);else{var c=a.pop();if(a.push(++c),b=p.getComponent(a),!b)for(var d=!0;!b&&d;)a.length>1?(a.pop(),c=a.pop(),a.push(++c),b=p.getComponent(a)):(d=!1,a=null)}else a=[0],b=p.getComponent(a);return h(a),a?b:null}function j(a){if(angular.isArray(a))return a.slice(0);if("string"==typeof a){a=a.replace(/[\[\]]/g,"");for(var b=a.split(","),c=0;c<b.length;c++)b[c]=+b[c]||0;return b}return[0]}function k(a){return angular.forEach(arguments,function(b){b!==a&&angular.forEach(b,function(b,c){a[c]&&a[c].constructor&&a[c].constructor===Object?k(a[c],b):a[c]=b})}),a}function l(b){var c,d,f;if(b){if(!q&&(c=(b.data||{}).builderId,f=e(),f&&(d=f[c]),c&&d)){if(angular.isString(d)&&(d=d.replace(/\n/g," ")),a.debug("ManifestService::initializeComponent: override builderId:",c,d),"string"==typeof d)switch(d){case"delete":{var i=g(),j=i.pop(),l=p.getComponent(i);l.components.splice(j,1)}j>0&&(i.push(j-1),h(i));break;default:try{d=angular.fromJson(d)}catch(m){a.debug("ManifestService::initializeComponent: override: did not know what to do with builderId:",c,d,m)}}"object"==typeof d&&(a.debug("ManifestService::initializeComponent: override: extend:",b.data,d),k(b.data,d))}b.idx=g().slice(0),a.debug("ManifestService::initializeComponent: initialized:",b.idx,b)}}var m,n,o,p=this,q=!1;this.getComponent=function(b){var d;if(b){if(b=j(b),h(b),a.debug("ManifestService::getComponent: find component:",b),d=c()[b[0]],!d)return null;for(var e in b)if(e>0){var f=d.components;if(!f)return null;if(d=f[b[e]],!d)return null}a.debug("ManifestService::getComponent: found:",b,d)}else a.debug("ManifestService::getComponent: getNextComponent"),d=i(),l(d);return d},this.getFirst=function(b,c){c=c?j(c):[0],a.debug("ManifestService::getFirst",b,c);for(var d=p.getComponent(c);d&&d.type!==b;)if(d=i(),g()&&(g().length<c.length||g()[c.length-1]!==c[c.length-1]))return null;return d},this.getAll=function(b,c){a.debug("ManifestService::getAll:initialContext",c),c=c?j(c):[0];var d=[];a.debug("ManifestService::getAll",b,c);for(var e=p.getComponent(c);e;)if(a.debug("ManifestService::getAll:match?",e.type,b),e.type===b&&(d.push(e),a.debug("ManifestService::getAll:match!",d)),e=i(),a.debug("ManifestService::getAll:in context?",c,g()),g()&&(g().length<c.length||g()[c.length-1]!==c[c.length-1]))return d;return d},this.getLang=function(){return this.lang},this.setLang=function(a){this.lang=a},this.getPageId=function(){return this.pageId},this.setPageId=function(c){a.debug("ManifestService, setPageId",c),h(null),this.pageId=c,b.$broadcast("npPageIdChanged",c)},this.initialize=function(b,e){a.debug("ManifestService::initialize:",b,e),b&&d(b),e&&f(e[0]),q=!1,h(null);var g=p.getComponent();for(a.debug("ManifestService::initialize:initialParse",g);g;)g=p.getComponent();q=!0,a.debug("ManifestService::initialize:manifest data:",c())}};return new c}angular.module("newplayer.service").factory("ManifestService",a),a.$inject=["$log","$rootScope"]}(),function(){"use strict";function a(a){a.debug("\nComponentService::Init\n");var b=function(){};return new b}angular.module("newplayer.service").factory("ComponentService",a),a.$inject=["$log","ManifestService","$http"]}(),function(){"use strict";angular.module("npVideo",[])}(),AssessmentService.$inject=["$log"],function(){"use strict";angular.module("newplayer",["ui.bootstrap","oc.lazyLoad","ngSanitize","newplayer.service"]).factory("AssessmentService",AssessmentService).config(["$logProvider",function(a){a.debugEnabled(!1)}])}(),function(){"use strict";function a(a){a.debug("AppController::Init")}angular.module("newplayer").controller("AppController",a),a.$inject=["$log","AssessmentService"]}(),angular.module("npAnswer",[]),angular.module("npAnswer").controller("npAnswerController",["$log","$scope","$sce",function(a,b,c){var d=b.component.data||{};a.debug("npAnswer::data",d),this.id=d.id,this.label=c.trustAsHtml(d.label)}]).run(["$log","$rootScope",function(a){a.debug("npAnswer::component loaded!")}]),angular.module("npAudio",[]),npMediaElementDirective.$inject=["$log"],angular.module("npAudio").controller("npAudioController",["$log","$scope","$sce","$element",function(a,b,c,d){var e=b.component.data;a.debug("npAudio::data",e,d),this.id=e.id,this.baseURL=e.baseURL,e.poster&&(b.poster=e.poster);var f=e.types;if(angular.isArray(f)&&f.length>0){a.debug("npAudio::data:types",f);var g="";for(var h in f){var i=f[h];a.debug("npAudio::data:types:type",h,i),g+='<source type="audio/'+i+'" src="'+this.baseURL+"."+i+'" />',b[i]=this.baseURL+"."+i}b.sources=g}}]).directive("mediaelement",npMediaElementDirective).run(["$log","$rootScope",function(a){a.debug("npAudio::component loaded!")}]),angular.module("npButton",[]),angular.module("npButton").controller("npButtonController",["$log","$scope","$sce","$location","$element","ConfigService","ManifestService",function(a,b,c,d,e,f,g){var h=b.component.data||{};a.debug("npButton::data",h),this.content="";var i=h.content;angular.isString(i)&&(this.content=c.trustAsHtml(i)),this.link="",this.target=h.target,this.linkInternal=!0;var j=h.link;angular.isString(j)&&(0===j.indexOf("/")?(this.target||(this.target="_top"),this.linkInternal=!1):/^([a-zA-Z]{1,10}:)?\/\//.test(j)?(this.target||(this.target="_blank"),this.linkInternal=!1):j=0===j.indexOf("#")?j.substr(1):"/"+f.getManifestId()+"/"+j,a.debug("npButton::link",j),this.link=c.trustAsResourceUrl(j)),this.go=function(){this.linkInternal?g.setPageId(h.link):window.open(this.link,this.target)}}]).run(["$log","$rootScope",function(a){a.debug("npButton::component loaded!")}]),angular.module("npColumn",[]),angular.module("npColumn").controller("npColumnController",["$log","$scope","$sce",function(a,b){var c=function(a,b){for(var c=[],d=0;d<a.length;d+=b)c.push(a.slice(d,d+b));return c},d=b.component.data||{};a.debug("npColumn::data",d);var e=b.component.components.length,f=+d.cols;f||(f=e),b.rows=c(b.component.components,f),this.lastRow=Math.ceil(e/f),this.lastRowIndex=f*Math.floor(e/f),this.lastRowColumns=e%f===0?f:e%f,this.columns=f,this.columnSpan=Math.floor(12/f),this.columnSpanLast=Math.floor(12/this.lastRowColumns),this.columnWidth=100/f}]).run(["$log",function(a){a.debug("npColumn::component loaded!")}]),function(){"use strict";function a(a,b,c,d){a.debug("\nnpComponent::Init\n");var e=function(){function e(a,b,c){var e=d(a);e(b,function(a){c.append(a)})}function f(d,f,g){var h=b.getComponent(g.idx),i=h.idx||[0];a.debug("npComponent::parseComponent",h,i,g),h&&c.load(h).then(function(){if(a.debug("npComponent::parseComponent then",h,i),d.subCmp=!1,d.component=h,d.components=null,d.cmpIdx=i.toString(),f.attr("data-cmpType",h.type),f.addClass("np-cmp-sub"),h.data){var b=h.data.id;b||(b=h.type+":"+i.toString()),/^[^a-zA-Z]/.test(b)&&(b="np"+b),b=b.replace(/[^\w\-.:]/g,"_"),h.data.id||(h.data.id=b),f.attr("id","np_"+b);var g=h.data["class"];angular.isString(g)&&(g=g.replace(/[^\w\-.:]/g,"_"),f.addClass("np_"+g));var j=h.data.plugin;angular.isString(j)&&(j=j.replace(/[^\w\-.:]/g,"_"))}h.components&&h.components.length>0&&(a.debug("npComponent::parseComponent - HAS SUBS:",h),d.subCmp=!0,d.components=h.components),c.getTemplate(h).then(function(c){a.debug("npComponent::parseComponent: template",c);var i=document.createElement("div");i.innerHTML=c.data;var k,l,m;k=angular.element(i.querySelectorAll(".np-cmp-wrapper")),l=angular.element(i.querySelectorAll(".np-cmp-main")),m=angular.element(i.querySelectorAll(".np-cmp-sub")),k.length&&(k.attr("id",b),k.addClass(j),angular.forEach(h.data,function(a,b){angular.isString(b)&&0===b.indexOf("data-")&&k.attr(b,a)})),l.length&&(k.length||(l.attr("id",b),l.addClass(j),angular.forEach(h.data,function(a,b){angular.isString(b)&&0===b.indexOf("data-")&&l.attr(b,a)})),l.addClass(g)),e(i.innerHTML,d,f)})})}this.restrict="EA",this.scope=!0,this.controller=function(b,c,d){a.debug("npComponent::controller",c,d)},this.controller.$inject=["$scope","$element","$attrs"],this.controllerAs="vm",this.compile=function(){return function(b,c,d){a.debug("npComponent::compile!"),f(b,c,d)}}};return new e}angular.module("newplayer").directive("npComponent",a),a.$inject=["$log","ManifestService","ComponentService","$compile"]}(),angular.module("npContent",[]),angular.module("npContent").controller("npContentController",["$log","$scope","$rootScope","ManifestService",function(a,b,c,d){var e=b.component.data||{};a.debug("npContent::data",e),this.contentTitle=e.title;var f=d.getLang();if(!f){var g=d.getFirst("npContent");f=g.data.language,a.debug("npContent::set lang",f),d.setLang(f)}var h=e.language;h===f?(a.debug("npContent::lang match",h,f),b.currentLang=!0,b.currentContent=b,c.PageTitle=e.title):(a.debug("npContent::wrong lang",h,f),b.currentLang=!1)}]).run(["$log","$rootScope",function(a){a.debug("npContent component loaded!")}]),angular.module("npFeature",[]),angular.module("npFeature").controller("npFeatureController",["$log","$scope",function(a,b){var c=b.component.data||{};a.debug("npFeature::data",c)}]).run(["$log","$rootScope",function(a){a.debug("npFeature::component loaded!")}]),angular.module("npFooter",[]),angular.module("npFooter").controller("npFooterController",["$log","$scope",function(a,b){var c=b.component.data||{};a.debug("npFooter::data",c)}]).run(["$log","$rootScope",function(a){a.debug("npFooter::component loaded!")}]),angular.module("npHeader",[]),angular.module("npHeader").controller("npHeaderController",["$log","$scope","$sce",function(a,b){var c=b.component.data||{};a.debug("npHeader::data",c)}]).run(["$log","$rootScope",function(a){a.debug("npHeader::component loaded!")}]),angular.module("npHotspot",[]),npMediaElementDirective.$inject=["$log"],angular.module("npHotspot").controller("npHotspotController",["$log","$scope","$sce","$element",function(a,b){var c=b.component.data,d=b.feedback||{};a.debug("npHotspot::data",c,d);this.hotspotButtons=c.hotspotButtons,this.id=c.id,this.baseURL=c.baseURL,this.src=c.image,b.feedback=this.feedback=c.feedback,b.image=this.image=c.image,this.update=function(a){this.feedback=a.feedback;this.hotspotButtons.indexOf(a);b.$watch("npHotspot.feedback",function(){$(".npHotspot-feedback p").each(function(){var a=$(this).outerHeight(!0)+50;TweenMax.to($(".content-background"),1,{height:a,ease:Power4.easeOut}),TweenMax.to($(".npHotspot-feedback"),.1,{opacity:0,ease:Power4.easeOut}),TweenMax.to($(".npHotspot-feedback"),.5,{delay:.5,opacity:1,ease:Power4.easeOut})})})}}]).directive("mediaelement",npMediaElementDirective).run(["$log","$rootScope",function(a){a.debug("npHotspot::component loaded!")}]),angular.module("npHotspotButton",[]),angular.module("npHotspotButton").controller("npHotspotButtonController",["$log","$scope","$sce","$location","$element","ConfigService",function(a,b,c,d,e,f){var g=b.component.data||{};a.debug("npHotspotButton::data",g),console.log("npHotspotButton::data",g),this.src=g.image,b.image=this.image=g.image,console.log("button image ref: "+b.image),this.content="";var h=g.content;console.log("button content: "+h),angular.isString(h)&&(this.content=c.trustAsHtml(h)),this.link="",this.type=g.type,this.target=g.target,this.linkInternal=!0;var i=g.link;angular.isString(i)&&(0===i.indexOf("/")?(this.target||(this.target="_top"),this.linkInternal=!1):/^([a-zA-Z]{1,10}:)?\/\//.test(i)?(this.target||(this.target="_blank"),this.linkInternal=!1):i=0===i.indexOf("#")?i.substr(1):"/"+f.getManifestId()+"/"+i,a.debug("npHotspotButton::link",i),this.link=c.trustAsResourceUrl(i)),this.go=function(){this.linkInternal?d.url(this.link):window.open(this.link,this.target)}}]).run(["$log","$rootScope",function(a){a.debug("npHotspotButton::component loaded!")}]),angular.module("npHTML",[]),angular.module("npHTML").controller("npHTMLController",["$log","$scope","$sce",function(a,b,c){var d=b.component.data;a.debug("npHTML::data",d),this.content=c.trustAsHtml(d.content),a.debug("npHTML::content",b.content)}]).run(["$log","$rootScope",function(a){a.debug("npHTML::component loaded!")}]),angular.module("npImage",[]),angular.module("npImage").controller("npImageController",["$log","$scope","$sce",function(a,b){var c=b.component.data||{};a.debug("npImage::data",c),this.alt=c.alt,this.src=c.src,a.debug("npImage::src",this.src)}]).run(["$log","$rootScope",function(a){a.debug("npImage::component loaded!")}]),angular.module("npMenu",["newplayer.service"]),npMenuDirective.$inject=["$log","$compile","ManifestService"],angular.module("npMenu").controller("npMenuController",["$log","$scope","ManifestService","ConfigService","$sce",function(a,b,c){var d=b.component.data||{};a.debug("npMenu::data",d),this.items=(d||{}).items,angular.isArray(this.items)||(this.items=new Array("pages"));for(var e in this.items){var f=this.items[e];if("pages"===f){if(a.debug("inside content scope",b.currentContent),!b.currentContent.pages){var g=b.component.idx.slice(0);g.pop();var h=c.getAll("npPage",g),i=[];for(var j in h){var k=h[j];if(a.debug("npPage::index:",k),k.data&&k.data.inMenu){var l={id:k.data.id,text:k.data.menuTitle||k.data.title,children:[]};c.getPageId()===l.id&&a.debug("npPage::index:current:",k);var m=k.data.parentId;if(a.debug("npPage::index:parent?",m),m){a.debug("npPage::index:nest:",m,l);for(var n in i)a.debug("npPage::index:nest:isEqual?",m,i[n].id),i[n].id===m&&i[n].children.push(l)}else a.debug("npPage::index:top level:",l),i.push(l)}}a.debug("npPage::index results:",i),b.currentContent.pages=i}a.debug("npMenu::pages",b.pages);var o=[e,1].concat(b.pages);Array.prototype.splice.apply(this.items,o)}}a.debug("npMenu::items",this.items)}]).directive("npMenu",npMenuDirective).run(["$log","$rootScope",function(a){a.debug("npMenu::component loaded!")}]),angular.module("npPage",[]),angular.module("npPage").controller("npPageController",["$log","$scope","$rootScope","ManifestService",function(a,b,c,d){function e(d,e){h=e,a.debug("npPage::on current page?",h,f.id),f.id===h?(b.currentPage=!0,b.npPage=b,c.PageTitle?c.PageTitle+=": "+f.title:c.PageTitle=f.title):b.currentPage=!1}var f=b.component.data||{};a.debug("npPage::data",f,b.contentTitle),this.title=f.title;var g=b.component.idx.slice(0);g.pop();var h=d.getPageId();if(!h){var i=d.getFirst("npPage",g);h=i.data.id,d.setPageId(h),a.debug("npPage::set page",h)}e(null,h),c.$on("npPageIdChanged",e)}]).run(["$log","$rootScope",function(a){a.debug("npPage::component loaded!")}]),angular.module("npQuestion",[]),angular.module("npQuestion").controller("npQuestionController",["$log","$scope","ManifestService","$sce",function(a,b,c,d){var e=b.component.data;a.debug("npQuestion::data",e),this.id=e.id,this.content=d.trustAsHtml(e.content),this.type=e.type,this.feedback="";var f=e.feedback;this.changed=function(){a.debug("npQuestion::answer changed"),f.immediate&&(this.feedback="")},this.evaluate=function(){a.debug("npQuestion::evaluate:",this.answer);var d=!0;if(this.answer)switch(this.type){case"radio":var e=c.getComponent(this.answer);angular.isString(e.data.feedback)&&(this.feedback=e.data.feedback),d=e.data.correct;break;case"checkbox":var g,h=c.getAll("npAnswer",b.cmpIdx);for(g in h)h[g].data.correct?this.answer[h[g].idx]||(d=!1):this.answer[h[g].idx]&&(d=!1);break;case"text":var i,j,k=c.getFirst("npAnswer",b.cmpIdx),l=k.data.correct,m="i";angular.isString(l)?0===l.indexOf("/")&&(j=l.substring(1,l.lastIndexOf("/")),m=l.substring(l.lastIndexOf("/")+1)):angular.isArray(l)&&(j="^("+l.join("|")+")$"),i=new RegExp(j,m),i.test(this.answer)?angular.isObject(k.data.feedback)&&angular.isString(k.data.feedback.correct)&&(this.feedback=k.data.feedback.correct):(angular.isObject(k.data.feedback)&&angular.isString(k.data.feedback.incorrect)&&(this.feedback=k.data.feedback.incorrect),d=!1)}else d=!1;a.debug("npQuestion::evaluate:isCorrect",d),f.immediate&&""===this.feedback&&(this.feedback=d?f.correct:f.incorrect)}}]).run(["$log","$rootScope",function(a){a.debug("npQuestion::component loaded!")}]),angular.module("npQuiz",[]),angular.module("npQuiz").controller("npQuizController",["$log","$scope","ManifestService","$sce",function(a,b,c,d){var e=b.component.data;a.debug("npQuiz::data",e),this.id=e.id,this.content=d.trustAsHtml(e.content),this.type=e.type,this.feedback="";var f=e.feedback;this.changed=function(){a.debug("npQuiz::answer changed"),f.immediate&&(this.feedback="")},this.evaluate=function(){a.debug("npQuiz::evaluate:",this.answer);var d=!0;if(this.answer)switch(this.type){case"radio":var e=c.getComponent(this.answer);e.data.correct||(d=!1);break;case"checkbox":var g,h=c.getAll("npAnswer",b.cmpIdx);for(g in h)h[g].data.correct?this.answer[h[g].idx]||(d=!1):this.answer[h[g].idx]&&(d=!1);break;case"text":var i,j,k=c.getFirst("npAnswer",b.cmpIdx),l=k.data.correct,m="i";angular.isString(l)?0===l.indexOf("/")&&(j=l.substring(1,l.lastIndexOf("/")),m=l.substring(l.lastIndexOf("/")+1)):angular.isArray(l)&&(j="^("+l.join("|")+")$"),i=new RegExp(j,m),i.test(this.answer)||(d=!1)}else d=!1;a.debug("npQuiz::evaluate:isCorrect",d),f.immediate&&(this.feedback=d?f.correct:f.incorrect)}}]).run(["$log","$rootScope",function(a){a.debug("npQuiz::component loaded!")}]),function(){"use strict";function a(a){return a.info("DEBUG | \npVideo::Init\n"),{restrict:"EA",controller:b,controllerAs:"npVideo",bindToController:!0}}function b(a,b,c){var d=b.component.data.types;if(angular.isArray(d)&&d.length>0){var e=[];for(var f in d){var g=d[f];e.push({type:g,mime:"video/"+g,src:c.trustAsResourceUrl(b.component.data.baseURL+"."+g)})}b.npVideo={sources:e}}}console.info("DEBUG | npVideo IIFT"),a.$inject=["$log"],b.$inject=["$log","$scope","$sce"],angular.module("npVideo").directive("npVideo",a)}();