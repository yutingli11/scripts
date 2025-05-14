// ==UserScript==
// @name        Adblock4limbo
// @namespace   https://github.com/limbopro/Adblock4limbo/blob/main/Adguard/Adblock4limbo.user.js
// @version     0.1.99
// @description Remove Ads
// @author      limbopro
// @license     BSD-3-Clause
// @match       https://missav.ai/*
// @match       https://jable.tv/*
// @match       https://*.pornhub.com/*
// @match       https://91porn.com/*
// @match       https://www.91porn.com/*
// @run-at      document-end
// @grant       none
// ==/UserScript==

const imax = {
    css: {
        jable: "body {overflow-x:hidden;} div.site-content {overflow-x:hidden!important;} div.text-center > a[target=_blank], li[class*='nav-item'] >  a[target=_blank], div.asg-interstitial, div.asg-interstitial__mask, iframe, div[class*=\"exo\"], .exo-native-widget-outer-container, a[href*=\"trwl1\"], div[data-width=\"300\"], div.text-center.mb-e-30, div[data-width*=\"300\"], div[style*=\"300px\"], section[class*=\"justify\"], iframe[width=\"728\"][height=\"90\"], #site-content > div.container > section.pb-3.pb-e-lg-40.text-center, a[href*=\"\?banner=\"],[class*=\"root--\"],.badge,a[href=\"http\:\/\/uus52\.com/\"] {display :none !important; pointer-events: none !important;}", // Jable.tv
        missav: "a[href^='https://theporndude.com'],a[href*='mycomic'],a[href*=myavlive],[href*='bit.ly'],[href*='bit.ly'][target=_blank], a[href*='/vip'],img[src*='.gif'], iframe,#a[href*='//bit.ly/'],div[style*='z-index: 1001'],ul.space-y-2.mb-4.ml-4.list-disc.text-nord14,div.space-y-5.mb-5,div.under_player,div[style=\"width: 300px; height: 250px;\"] {display:none !important; pointer-events:none important;} body{overflow-x:hidden;}", //  MissAV
        pornhubx: ".topAdContainter, a[href*='ads'], div.adContainer.clearfix.noBottom, .adContainer.clearfix.middleVideoAdContainer, div.adContainer.clearfix.noBottom, a[href*='fuck'][target='_blank'], [data-href][target='_blank'],iframe, a.ad#link, #header.hasAdAlert {grid-template-rows:60px 40px 0px !important} div.hd.clear, div > img[data-title][srcset], #js-networkBar,div#abAlert, .adsbytrafficjunky, #pb_template, .sponsor-text, #adsbox, .abAlertShown, .abAlertInner, #main-container > .abovePlayer, [rel*='noopener nofollow'],a[href^=\"http://ads.trafficjunky.net/\"], .topAdContainter,.adsbytrafficjunky,.ad-link  {height:0px !important; display:none !important; pointer-events:none;}", // pornhub
        porn91: ".copysuccess {background:green !important;color:white !important;} br, .ad_img,.preroll-blocker, img[href*='.gif'] {display:none !important; pointer-events: none !important;}", // 91porn
    }
}

function values() {
    var adsDomain = [
        "missav",
        "jable",
        "pornhub",
        "91porn"
    ]

    var url = document.location.href;
    console.log("URL : " + url); // 看看当前 URL
    var i;
    for (i = 0; i < adsDomain.length; i++) {
        if (url.indexOf(adsDomain[i]) !== -1) {
            var values = adsDomain[i]; // 释放参数值
            console.log("Catch it : " + values) // 看看控制台输出了个啥
        }
    }
    return values;
}

function adsDomain_switch(x) { // 匹配参数值 执行相应函数
    switch (x) {
        case 'pornhub':
             pornhub_interstitialPass();
            //tag_adsRemove("script", "ads_batch");
            const custom_style_values_pb = "right: 0px !important; padding: 0 !important; position: relative !important;"
            css_adsRemove(imax.css.pornhubx, 500, "pornhubX");

            setTimeout(() => {
                let ads_selector = [".topAdContainter", "a[href*='ads']", "a[href*='fuck']", "a[href*='ad']", "div.adContainer.clearfix.noBottom", ".adContainer.clearfix.middleVideoAdContainer"];
                let ads = setInterval(() => {
                    ads_selector.forEach((x) => { selector_one_by_one(x) })
                    console.log("清理还在继续..." + x)
                    if (document.querySelectorAll(ads_selector).length == 0) {
                        clearInterval(ads)
                        console.log("清理计时器，ads移除完毕...")
                    }
                }, 1000)
            }, 100)

            let cssText = "font-size: smaller !important; background: #2563eb !important; left: 0px; top: 110px; margin-right: 5px; margin-top: 5px;" + "padding: 6px 6px 6px 6px; display: inline-block; color: white;z-index: 114154 !important; border-right: 6px solid #38a3fd; border-left: #292f33 !important; border-top: #292f33 !important; border-bottom: #292f33 !important; background: #2563eb; border-radius: 0px 0px 0px 0px; font-weight: 800 !important; text-align: right !important;"
            setTimeout(() => {
                ele_dynamicAppend("div.ratingInfo, div.categoryRow.ratingDetails.sectionPadding", "href", "如何下载视频？", cssText, "https://limbopro.com/archives/M3U8-Downloader.html", "download_pornhub", 2, "a")
                if (document.getElementById("download_pornhub")) {
                    document.getElementById("download_pornhub").style = "display: inline !important;";
                    document.getElementById("download_pornhub").target = "_blank !important;";
                }
            }, 3000)


            pornhub_sidebar_ads();
            break;
        case 'missav':
            window.onload = function () {
                if (document.location.href.search('search') !== -1) {
                    let regex = /.*\/search\//;
                    let code = window.location.pathname.replace(regex, '').replace('/', '').toLowerCase()
                    setTimeout(() => {
                        tmd('h1', code, '试试其他搜索：');
                    }, 2000)
                    console.log("生成搜索链接🔗");
                }


                setTimeout(() => {
                    if (document.querySelector('.plyr__poster') !== null) { // 播放页插入其他站点播放链接
                        let code = document.querySelectorAll('span.font-medium')[0].textContent;

                        tmd('span.font-medium', code, '在其他站点播放：');

                        console.log("生成在其他站点播放链接🔗");
                    }
                }, 2000)

            }()

            css_adsRemove(imax.css.missav, 100, 'missavx');
            window_open_defuser(); // 打断 window.open 施法
            var ua_missav = navigator.userAgent.toLowerCase();
            var mobile_missav = "mobile";
            //cloudflare_captchaBypass();

            setTimeout(() => {
                let cssText = "font-size: smaller !important; background: #2563eb !important; left: 0px; top: 110px; margin-right: 5px; margin-top: 5px;" + "padding: 6px 6px 6px 6px; display: inline-block; color: white;z-index: 114154 !important; border-right: 6px solid #38a3fd; border-left: #292f33 !important; border-top: #292f33 !important; border-bottom: #292f33 !important; background: #2563eb; border-radius: 0px 0px 0px 0px; font-weight: 800 !important; text-align: right !important;"
                if (ua_missav.indexOf(mobile_missav) === -1) {

                    if (document.querySelector('div.mt-4') !== null && document.querySelector('div.mt-4').querySelector('h1') !== null) {
                        ele_dynamicAppend("div.mt-4", "onclick", "离开页面视频继续播放", cssText, "", "missavX", 2, "button");
                        ele_dynamicAppend("div.mt-4", "onclick", "暂停", cssText, "", "missavP", 3, "button");
                        ele_dynamicAppend("div.mt-4", "href", "如何下载视频?", cssText, "https://limbopro.com/archives/M3U8-Downloader.html", "how", 4, "a");
                    }

                    if (document.getElementById("how") !== null) {
                        document.getElementById("how").target = "_blank";
                    }

                    // 添加监听器
                    if (document.getElementById("missavX")) {
                        addListenerById("missavX", () => { video_loopPlay('loop') }, 1000);
                    }

                    if (document.getElementById("missavP")) {
                        addListenerById("missavP", () => { video_loopPlay('pause') }, 1000);
                    }

                } else if (ua_missav.indexOf(mobile_missav) > -1) {
                    ele_dynamicAppend("div.mt-4", "onclick", "免广告播放", cssText, "video_Play()", "missavX", 0, "button");
                    ele_dynamicAppend("div.mt-4", "onclick", "进入全屏", cssText, "fullscreen()", "missavFullScreen", 2, "button");
                    ele_dynamicAppend("div.mt-4", "onclick", "暂停", cssText, "video_pause()", "missavPause", 1, "button");
                    ele_dynamicAppend("div.mt-4", "href", "如何下载视频", cssText, "https://limbopro.com/archives/M3U8-Downloader.html", "how", 4, "a");
                    // 添加监听器

                    if (document.getElementById("how") !== null) {
                        document.getElementById("how").target = "_blank";
                    }

                    addListenerById("missavX", () => { video_Play() }, 1000);
                    addListenerById("missavFullScreen", () => { fullscreen() }, 1000);
                    addListenerById("missavPause", () => { video_pause() }, 1000);
                }
            }, 3000)

            document.querySelectorAll('div.grid').forEach(
                (x) => {
                    if (x.querySelector('img[src*="mio.jpg"]')) { // 移除 missav 播放页广告
                        x.style = 'display:none !important;'
                    }
                }
            )

            break;
        case '91porn':
            //cloudflare_captchaBypass();
            css_adsRemove(imax.css.porn91);

            let url91 = document.location.href;
            if (url91.indexOf('view_') !== -1) {
                let play = setInterval(() => {
                    if (document.querySelector('div.preroll-skip-button') !== null) {
                        document.querySelector('div.preroll-skip-button').click();
                    } else {
                        clearInterval(play);
                    }
                }, 1000)
            }

            setTimeout(() => {
                _91porn_dl()
            }, 2500)

            //css_adsRemove(imax.css.porna91);
            //_91porn_videoplay_ads();

            // 播放页空白
            /*
            document.querySelectorAll("br").forEach((x) => {
                if (x.clientHeight = 0) {
                    x.remove()
                }
            })
            */
            break;
        case 'jable':
            console.log("IT'S JABLE");

            window.onload = function () {

                if (document.location.href.search('search') !== -1) {
                    let regex = /.*\/search\//;
                    let code = window.location.pathname.replace(regex, '').replace('/', '').toLowerCase()
                    setTimeout(() => {
                        tmd('#list_videos_videos_list_search_result > nav', code, '试试其他搜索：');
                    }, 2000)
                    console.log("生成搜索链接🔗");
                }

                if (document.querySelector('.plyr__poster') !== null) { // 在其他站点播放
                    let regex = /.*\/videos\//;
                    let code = window.location.pathname.replace(regex, '').replace('/', '').toLowerCase();
                    setTimeout(() => {
                        tmd('h4', code, '在其他站点播放：');
                        console.log("生成在其他站点播放链接🔗");
                    }, 2000)
                }

            }()

            // 子域名跳转至主域名 jable.tv
            if (/\b(.*\.)(jable\.tv.*)\b/i.test(window.location.href.toLowerCase())) {
                console.log(window.location.href.toLowerCase())
                let url_jable_rewrite = window.location.href.toLowerCase().replace(/https:\/\/\w{2,3}\./i, "https://")
                console.log(url_jable_rewrite)
                window.location.replace(url_jable_rewrite)
            }

            // 去除首页广告
            if (document.querySelectorAll('div.col-6.col-sm-4.col-lg-3').length > 0) {
                document.querySelectorAll('div.col-6.col-sm-4.col-lg-3').forEach((x) => { // xxx
                    if (x.querySelectorAll("[target='_blank']").length > 0) {
                        x.style = "display: none !important; z-index:-114154; display:block; width:0vw; height:0";
                    }
                })
            }

            //cloudflare_captchaBypass();
            css_adsRemove(imax.css.jable);
            jable_adsRemove();
            const url_jable = document.location.href;
            const reg_videos = /^https:\/\/jable\.tv\/videos/gi;
            if (url_jable.search(reg_videos) !== -1) {

                setTimeout(() => {
                    let cssText = "margin-left: 5px; margin-top: 5px; position: static; font-size: smaller !important; background: #2563eb !important; margin-right: 5px; padding: 6px 6px 6px 6px; display: inline-block; color: white; border-right: 6px solid #38a3fd; border-left: #292f33 !important; border-top: #292f33 !important; border-bottom: #292f33 !important; background: #2563eb; border-radius: 0px 0px 0px 0px; font-weight: 800 !important; text-align: right !important;"
                    let cssText2 = "width:72px; margin-left: 5px; margin-top: 5px; position: static; font-size: smaller !important; background: #2563eb !important; margin-right: 5px; padding: 6px 6px 6px 6px; display: inline-block; color: white; border-right: 6px solid #38a3fd; border-left: #292f33 !important; border-top: #292f33 !important; border-bottom: #292f33 !important; background: #2563eb; border-radius: 0px 0px 0px 0px; font-weight: 800 !important; text-align: right !important;"
                    ele_dynamicAppend("div.header-left > h6", "onclick", "code", cssText2, "", "avCodeCopy", 13, "input");
                    ele_dynamicAppend("div.header-left > h6", "onclick", "复制番号", cssText, "", "copyavCode", 14, "button");
                    ele_dynamicAppend("div.header-left > h6", "onclick", "", cssText, "", "copy", 15, "input");
                    ele_dynamicAppend("div.header-left > h6", "onclick", "复制M3U8文件地址", cssText, "", "jablex", 16, "button")
                    ele_dynamicAppend("div.header-left > h6", "onclick", "如何下载视频？", cssText, "window.open(\"https://limbopro.com/archives/M3U8-Downloader.html\", \"_blank\")", "how", 17, "button");
                    var regex = /[a-zA-Z]{3,5}\-\d{3,5}/i
                    var avCode = document.querySelectorAll('h4')[0].innerText.match(regex)[0]
                    //let avCode = window.location.pathname.replace('/videos/', '').replace('/', '')
                    let input = document.querySelector('#avCodeCopy')
                    input.value = avCode
                    // 添加监听器
                    addListenerById("jablex", () => { copyText("copy", "jablex", "复制M3U8文件地址") }, 0);
                    addListenerById("copyavCode", () => { avCodeCopy() }, 0);
                }, 3000)

                function avCodeCopy() {
                    // 复制工作开始
                    let civ = document.querySelector('#avCodeCopy')
                    civ.select()
                    document.execCommand('copy')
                    // 复制工作结束

                    document.querySelector('#copyavCode').innerHTML = '复制成功!'
                    document.querySelector('#copyavCode').setAttribute('class', 'jable_css')
                    setTimeout(() => {
                        document.querySelector('#copyavCode').innerHTML = '复制番号'
                        document.querySelector('#copyavCode').className = ''
                    }, 1500)
                    //}, 0)
                }

                setTimeout(() => { repeat_regex.forEach(m3u8_tempt) }, 4000);
            }
            break;
     
        default:
            if (/\b(netflav|missav|jable)\b/i.test(window.location.href.toLowerCase())) {
                if (document.querySelector('video')) {
                    abort_on_property_read('__Y');
                    window_open_defuser(); // 打断 window.open 施法
                }
            }

            console.log("Catch Nothing! DEFAULT!");
    }
}

adsDomain_switch(values())

// Cloudflare recaptcha 绕过
function cloudflare_captchaBypass() {
    var title = document.title;
    if (title.search("Cloudflare") >= 0 || title.search("Attention") >= 0) {
        window.location.reload();
        console.log("captchaBypass done;")
    };
}

function ele_dynamicAppend(selector, attribute, txt, style, func, id, array, tag) {
    let new_ele = document.createElement(tag);
    new_ele.innerHTML = txt;
    new_ele.setAttribute(attribute, func);
    new_ele.setAttribute("id", id);
    new_ele.setAttribute("style", style);
    var here = document.querySelectorAll(selector);
    if (here.length > 0) {
        here[0].insertBefore(new_ele, here[0].childNodes[array])
        //here[0].appendChild(new_ele);
        console.log("按钮已添加")
    }
}

function pornhub_interstitialPass() {
    const ele_skip = "[onclick*='clearModalCookie']"
    const exist = document.querySelectorAll(ele_skip);
    if (document.querySelectorAll(ele_skip).length > 0) {
        const href = exist[1].href;
        window.location = href;
    }
}

// 动态创建引用内部资源 内嵌式样式 内嵌式脚本
function css_adsRemove(newstyle, delaytime, id) {
    setTimeout(() => {
        var creatcss = document.createElement("style");
        creatcss.id = id;
        creatcss.innerHTML = newstyle;
        document.getElementsByTagName('head')[0].appendChild(creatcss)
        console.log("CSS样式新增完毕！");
    }, delaytime);
}

// 移除 某个 tag标签
function tag_adsRemove(tagname, keyword) {
    var i;
    var tag = document.getElementsByTagName(tagname);
    for (i = 0; i < tag.length; i++) {
        if (tag[i].src.indexOf(keyword) !== -1) {
            tag[i].remove()
        }
        if (tag[i].innerHTML.indexOf(keyword) !== -1) {
            tag[i].remove()
        }
    }
}

function pornhub_sidebar_ads() {
    setTimeout(() => {
        var ele_parent = ["div"];
        var ele_children = ["img[data-title][title][srcset]"];
        var ele_attributes = ["class"];
        var i;

        const css_Selctors = document.querySelectorAll(ele_parent);

        for (i = 0; i < css_Selctors.length; i++) {
            if (css_Selctors[i].querySelectorAll(ele_children).length !== 0) {
                if (css_Selctors[i].getAttribute(ele_attributes)) {
                    if (css_Selctors[i].attributes.length == 1) {
                        if (css_Selctors[i].children.length == 2) {
                            console.log(css_Selctors[i])
                            css_Selctors[i].style.display = "none";
                        }
                    }
                }
            }
        }
    }, 500);
}

function _91porn_videoplay_ads() {
    //setTimeout(() => {
    var ele_parent = ["div"];
    var ele_children = ["a[target=\"_blank\"]  > img[src*=\".gif\"]"];
    var i;

    const css_Selctors = document.querySelectorAll(ele_parent);

    for (i = 0; i < css_Selctors.length; i++) {
        if (css_Selctors[i].querySelectorAll(ele_children).length !== 0) {
            if (css_Selctors[i].attributes.length == 0) {
                if (css_Selctors[i].children.length == 9) {
                    console.log(css_Selctors[i])
                    css_Selctors[i].style.display = "none";
                }
            }
        }
    }
    //}, 500);
}

// 设置 cookie 并移除特定元素
function jable_adsRemove() { // Cookie 设定及注入
    document.cookie = "ts_popunder=1";
    document.cookie = "kt_tcookie=1";
    document.cookie = "asgsc262182=2";
    var adsDomain = [
        'r.trwl1.com',
        'r.www.com'
    ];


    const div = document.querySelectorAll("div.col-6.col-sm-4.col-lg-3, div.col-6.col-sm-4.col-xl-3, div.col-6.col-sm-4.col-lg-12")
    for (x = 0; x < div.length; x++) {
        if (div[x].querySelectorAll("script, a[href*=trackwilltrk]").length >= 1) {
            div[x].style = "display: none !important; pointer-events: none !important;"
        }
    }
}

// 设置 cookie // missAv Javascript
function missAv_adsRemove() {
    document.cookie = "_gat_UA-177787578-7; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

/* 循环播放 missAV */

var timer = null;
var timerlist = [];

function video_loopPlay(x) {
    if (x === 'loop') {
        intval = window.setInterval(missAv_playbutton, 1000)
    } else if (x === 'pause') {
        if (intval) {
            timerlist.forEach((item, index) => { // 清理监听事件移除
                clearInterval(item);
            })
            video_pause();
        }
    }
}

function missAv_playbutton() {
    timerlist.push(intval);
    var ele_catch = document.querySelectorAll("video[preload='none'],video#player");
    if (ele_catch.length > 0) {
        ele_catch[0].play();
        //ele_catch[1].play();
        //console.log("视频已开启循环播放；")
    }
}

/* 播放 */
function video_Play() {
    //setInterval(function () {
    var ele = ["video[preload='none'],video#player"];
    var ele_catch = document.querySelectorAll(ele);
    if (ele_catch.length > 0) {
        ele_catch[0].play();
        ele_catch[1].play();
        console.log("视频已开始播放；")
    }
    //}, 1000)
}

/* 全屏 */
function fullscreen() {
    const fullScreen = document.querySelector('button[data-plyr=\'fullscreen\']');
    fullScreen.click()
    //fullScreen.requestFullscreen();
    //const fullScreen = document.querySelector('div.plyr__video-wrapper');
    //fullScreen.requestFullscreen();
}

/* 暂停 */
function video_pause() {
    //setInterval(function () {
    var ele = ["video[preload='none'],video#player"];
    var ele_catch = document.querySelectorAll(ele);
    if (ele_catch.length > 0) {
        ele_catch[0].pause();
        ele_catch[1].pause();
        console.log("视频已暂停；")
    }
    //}, 1000)
}

/* 添加监听器 bySelector*/
function addListener(selector, funx) {
    setTimeout(() => {
        var ele = document.querySelectorAll(selector);
        for (let index = 0; index < ele.length; index++) {
            ele[index].addEventListener("click", funx, false)
        }
    }, 1000)
}

/* 添加监听器 byID */
function addListenerById(id, funx, time) {
    setTimeout(() => {
        if (document.getElementById(id) !== null) {
            var eleById = document.getElementById(id);
            eleById.addEventListener("click", funx, false)
        }
    }, time)
}

function window_open_defuser() {
    'use strict';
    let arg1 = '{{1}}';
    if (arg1 === '{{1}}') { arg1 = ''; }
    let arg2 = '{{2}}';
    if (arg2 === '{{2}}') { arg2 = ''; }
    let arg3 = '{{3}}';
    if (arg3 === '{{3}}') { arg3 = ''; }
    const log = /\blog\b/.test(arg3)
        ? console.log.bind(console)
        : () => { };
    const newSyntax = /^[01]?$/.test(arg1) === false;
    let pattern = '';
    let targetResult = true;
    let autoRemoveAfter = -1;
    if (newSyntax) {
        pattern = arg1;
        if (pattern.startsWith('!')) {
            targetResult = false;
            pattern = pattern.slice(1);
        }
        autoRemoveAfter = parseInt(arg2);
        if (isNaN(autoRemoveAfter)) {
            autoRemoveAfter = -1;
        }
    } else {
        pattern = arg2;
        if (arg1 === '0') {
            targetResult = false;
        }
    }
    if (pattern === '') {
        pattern = '.?';
    } else if (/^\/.+\/$/.test(pattern)) {
        pattern = pattern.slice(1, -1);
    } else {
        pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    const rePattern = new RegExp(pattern);
    const createDecoy = function (tag, urlProp, url) {
        const decoy = document.createElement(tag);
        decoy[urlProp] = url;
        decoy.style.setProperty('height', '1px', 'important');
        decoy.style.setProperty('position', 'fixed', 'important');
        decoy.style.setProperty('top', '-1px', 'important');
        decoy.style.setProperty('width', '1px', 'important');
        document.body.appendChild(decoy);
        setTimeout(() => decoy.remove(), autoRemoveAfter * 1000);
        return decoy;
    };
    window.open = new Proxy(window.open, {
        apply: function (target, thisArg, args) {
            log('window.open:', ...args);
            const url = args[0];
            if (rePattern.test(url) !== targetResult) {
                return target.apply(thisArg, args);
            }
            if (autoRemoveAfter < 0) { return null; }
            const decoy = /\bobj\b/.test(arg3)
                ? createDecoy('object', 'data', url)
                : createDecoy('iframe', 'src', url);
            let popup = decoy.contentWindow;
            if (typeof popup === 'object' && popup !== null) {
                Object.defineProperty(popup, 'closed', { value: false });
            } else {
                const noopFunc = (function () { }).bind(self);
                popup = new Proxy(self, {
                    get: function (target, prop) {
                        if (prop === 'closed') { return false; }
                        const r = Reflect.get(...arguments);
                        if (typeof r === 'function') { return noopFunc; }
                        return target[prop];
                    },
                    set: function () {
                        return Reflect.set(...arguments);
                    },
                });
            }
            if (/\blog\b/.test(arg3)) {
                popup = new Proxy(popup, {
                    get: function (target, prop) {
                        log('window.open / get', prop, '===', target[prop]);
                        return Reflect.get(...arguments);
                    },
                    set: function (target, prop, value) {
                        log('window.open / set', prop, '=', value);
                        return Reflect.set(...arguments);
                    },
                });
            }
            return popup;
        }
    });
};

function _91porn_dl() { // 下载视频

    if (window.location.href.match('view_video')) {

        var css = document.createElement('style')
        css.innerHTML = '.copysuccess {background:green !important;color:white !important;}'
        css.id = 'porn91'
        document.body.appendChild(css)

        if (document.getElementById('mp4Download') == null) {
            var mp4URL = document.querySelectorAll('source')[0].src
            var mp4Download = document.createElement('a')
            mp4Download.download = document.title.toString()
            mp4Download.target = '_blank'
            mp4Download.id = 'mp4Download'
            mp4Download.href = mp4URL

            if ((/\b(android|iphone|ipad|ipod)\b/i.test(navigator.userAgent.toLowerCase()))) {
                mp4Download.textContent = '无广播放'
            } else {
                mp4Download.textContent = '下载视频'
            }

            var button_download = document.createElement('button')
            button_download.style = 'padding:12px; position:fixed;right:0px;top:216px;border:0px; background:yellowgreen;color:white;font-weight:bolder;width:60px;'
            button_download.textContent = '复制视频下载地址'
            button_download.id = 'copyURL'

            var button_alert = document.createElement('button')
            button_alert.style = 'padding:12px; position:fixed;right:0px;top:322px;border:0px; background:yellowgreen;color:white;font-weight:bolder;width:60px;'
            button_alert.textContent = '如何下载视频?'
            button_alert.id = 'alertDownload'

            button_alert.addEventListener('click', (() => {
                alert(' 1.复制视频下载地址；2.iOS用户推荐使用名叫 "Documents" 的 app 下载视频，打开 Documents app -> 浏览器 - 粘贴视频下载地址；Android 暂无建议；')
            }))

            button_download.addEventListener('click', (() => {
                if (document.querySelectorAll('source')[0].src.match('\.mp4') !== null) {
                    const textarea = document.createElement('textarea') // 创建 textarea 元素 并将选中内容填充进去
                    textarea.id = 'fuck91porn'
                    document.querySelector('#copyURL').appendChild(textarea)
                    textarea.value = mp4URL
                    textarea.select();
                    document.execCommand('copy', true); // 执行复制
                    document.querySelector('#copyURL').classList.add('copysuccess')  // 复制成功提醒
                    document.querySelector('#copyURL').textContent = '复制成功'

                    setTimeout(() => { // ↩️按钮恢复原状
                        document.querySelector('#copyURL').classList.remove('copysuccess')
                        document.querySelector('#copyURL').textContent = '复制视频下载地址'
                    }, 2500)

                    if (document.getElementById('fuck91porn')) { // 删除刚刚创建的 textarea 元素
                        document.getElementById('ffuck91porn').remove()
                    }
                } else {
                    alert('未找到视频下载地址！')
                }
            }))

            mp4Download.style = 'padding:12px; position:fixed;right:0px;top:150px;background:yellowgreen;color:white;font-weight:bolder;width:60px;'
            document.querySelectorAll('#useraction')[0].parentNode.insertBefore(button_alert, document.querySelectorAll('#useraction')[0])
            document.querySelectorAll('#useraction')[0].parentNode.insertBefore(button_download, document.querySelectorAll('#useraction')[0])
            document.querySelectorAll('#useraction')[0].parentNode.insertBefore(mp4Download, document.querySelectorAll('#useraction')[0])
        }
    }
}

/// abort-on-property-read.js
/// alias aopr.js
/// https://github.com/gorhill/uBlock/blob/a94df7f3b27080ae2dcb3b914ace39c0c294d2f6/assets/resources/scriptlets.js#L96
function abort_on_property_read() {
    const magic = String.fromCharCode(Date.now() % 26 + 97) +
        Math.floor(Math.random() * 982451653 + 982451653).toString(36);
    const abort = function () {
        throw new ReferenceError(magic);
    };
    const makeProxy = function (owner, chain) {
        const pos = chain.indexOf('.');
        if (pos === -1) {
            const desc = Object.getOwnPropertyDescriptor(owner, chain);
            if (!desc || desc.get !== abort) {
                Object.defineProperty(owner, chain, {
                    get: abort,
                    set: function () { }
                });
            }
            return;
        }
        const prop = chain.slice(0, pos);
        let v = owner[prop];
        chain = chain.slice(pos + 1);
        if (v) {
            makeProxy(v, chain);
            return;
        }
        const desc = Object.getOwnPropertyDescriptor(owner, prop);
        if (desc && desc.set !== undefined) { return; }
        Object.defineProperty(owner, prop, {
            get: function () { return v; },
            set: function (a) {
                v = a;
                if (a instanceof Object) {
                    makeProxy(a, chain);
                }
            }
        });
    };
    const owner = window;
    let chain = '{{1}}';
    makeProxy(owner, chain);
    const oe = window.onerror;
    window.onerror = function (msg, src, line, col, error) {
        if (typeof msg === 'string' && msg.indexOf(magic) !== -1) {
            return true;
        }
        if (oe instanceof Function) {
            return oe(msg, src, line, col, error);
        }
    }.bind();
};

// 在番号详情页追加在线预览链接
function tmd(parentsSelector, code, textContent) {

    function otherSearch() {
        // 试试其他搜索：

        let parentElement = document.querySelectorAll(parentsSelector)[0]

        let p1 = document.createElement('p')
        p1.id = 'p1'
        p1.style = 'margin:10px 0px 0px 0px; border-left:6px solid #38a3fd; font-size:14px; border-radius:  4px !important;box-shadow: rgb(151, 151, 151) 0px 0px 0px 0px inset; /*inset 0px 0px 15px 3px #979797;*/ background:#10141f; color:chocolate; padding:0px 0px 0px 0px;word-break:break-all;border-radius:0px 0px 0px 0px'

        let p2 = document.createElement('p')
        p2.style = 'padding-left:6px;font-weight:inherit; padding:6px; word-break:break-all;font-size:inherit;border-radius:0px'
        p2.id = 'p2'


        p1.appendChild(p2)
        parentElement.insertBefore(p1, parentElement.childNodes[2])

        let span = document.createElement('span')
        span.style = 'font-weight:bolder;font-size:medium;color:bisque;'
        span.textContent = textContent
        p2.appendChild(span)

        function aAdd2Parent(siteName, url, codeSlect) {
            let a = document.createElement('a')
            let lable = document.createElement('label')
            lable.style = 'font-weight:inherit;display:inline-block;max-width:100%;margin-right:10px;'
            a.href = url + codeSlect
            a.textContent = siteName
            a.target = '_blank'
            a.style = 'color:inherit;/*text-decoration:revert !important;*/ font-weight:inherit'
            lable.appendChild(a)
            p2.appendChild(lable)
        }

        aAdd2Parent('MissAV[720P]', 'https://missav.com/search', '/' + code)
        aAdd2Parent('Jable[HD]', 'https://jable.tv/search', '/' + code + '/')
        aAdd2Parent('Supjav[ultraHD]', 'https://supjav.com/?s=', code)
        aAdd2Parent('番号搜索[聚合]', 'https://limbopro.com/btsearch.html#gsc.tab=0&gsc.q=', code + "&gsc.sort=")
        aAdd2Parent('谷歌搜索🔍', 'https://www.google.com/search?q=', code)
        aAdd2Parent('Javbus📖', 'https://www.javbus.com/search/', code + '&type=&parent=ce')
        console.log('已生成在线预览链接🔗')
    }
    otherSearch()
}