// ==UserScript==
// @name        Adblock4limbo
// @namespace   https://github.com/limbopro/Adblock4limbo/blob/main/Adguard/Adblock4limbo.user.js
// @version     0.1.99
// @description Remove Ads
// @author      limbopro
// @license     BSD-3-Clause
// @match       https://missav.com/*
// @match       https://91porn.com/*
// @match       https://jable.tv/*
// @match       https://*.pornhub.com/*
// @run-at      document-end
// @grant       none
// ==/UserScript==

const imax = {
    css: {
        jable: "div.asg-interstitial,div.asg-interstitial__mask,iframe,div[class*=\"exo\"], .exo-native-widget-outer-container,a[target*=\"_blank\"],a[href*=\"trwl1\"],div[data-width=\"300\"],div.text-center.mb-e-30,div[data-width*=\"300\"],div[style*=\"300px\"],section[class*=\"justify\"],iframe[width=\"728\"][height=\"90\"],#site-content > div.container > section.pb-3.pb-e-lg-40.text-center,.text-center > a[target=\"_blank\"] > img,a[href*=\"\?banner=\"],[class*=\"root--\"],.badge,a[href=\"http\:\/\/uus52\.com/\"] {display :none !important; pointer-events: none !important;}", // Jable.tv
        missav: "a[href*='/vip'], img[src*='.gif'], iframe,#a[href*='//bit.ly/'],div[style*='z-index: 1001'],ul.space-y-2.mb-4.ml-4.list-disc.text-nord14,div.space-y-5.mb-5,div.under_player,div[style=\"width: 300px; height: 250px;\"] {display:none !important; pointer-events:none important;}", //  MissAV
        porn91: "img[class*=\"ad_img\"], iframe[src*=\"ads\"], img[href*='.gif'] {display:none ! important; pointer-events: none !important;}", // 91porn
        pornhubx: "#header.hasAdAlert {grid-template-rows:60px 40px 0px !important} div.hd.clear, div > img[data-title][srcset], #js-networkBar,div#abAlert, .adsbytrafficjunky, #pb_template, .sponsor-text, #adsbox, .abAlertShown, .abAlertInner, #main-container > .abovePlayer, [rel*='noopener nofollow'],a[href^=\"http://ads.trafficjunky.net/\"], .topAdContainter,.adsbytrafficjunky,.ad-link,a[target='_blank'] {height:0px !important; display:none !important; pointer-events:none;}" // pornhub
    }
}

function values() {
    var adsDomain = [
        "pornhub",
        "missav",
        "91porn",
        "jable"
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
            css_adsRemove(imax.css.pornhubx, 50, "limbopro");
            tag_adsRemove("script", "ads_batch");
            pornhub_sidebar_ads();
            break;
        case 'missav':
            window_open_defuser(); // 打断 window.open 施法
            cloudflare_captchaBypass();
            css_adsRemove(imax.css.missav);
            //missAv_adsRemove();
            break;
        case '91porn':
            cloudflare_captchaBypass();
            css_adsRemove(imax.css.porn91);
            _91porn_videoplay_ads();
            break;
        case 'jable':
            cloudflare_captchaBypass();
            css_adsRemove(imax.css.jable);
            jable_adsRemove();
            break;
     
        default:
            console.log("Catch Nothing!");
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

    var i, l;
    for (l = 0; l < adsDomain.length; l++) {
        var css_sel = "a[href*='" + adsDomain[l] + "']";
        var css_catch = [".video-img-box.mb-e-20,.col-6.col-sm-4.col-lg-3"];
        var nodelists = document.querySelectorAll(css_catch);
        for (i = 0; i < nodelists.length; i++) {
            if (nodelists[i].querySelectorAll(css_sel).length > 0) {
                nodelists[i].style.display = "none";
            }
        }
    }
}

// 设置 cookie // missAv Javascript
function missAv_adsRemove() {
    document.cookie = "_gat_UA-177787578-7; expires=Thu, 01 Jan 1970 00:00:00 GMT";
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