const imax = {
    css: {
        jable: "div.asg-interstitial,div.asg-interstitial__mask,iframe,div[class*=\"exo\"], .exo-native-widget-outer-container,a[target*=\"_blank\"],a[href*=\"trwl1\"],div[data-width=\"300\"],div.text-center.mb-e-30,div[data-width*=\"300\"],div[style*=\"300px\"],section[class*=\"justify\"],iframe[width=\"728\"][height=\"90\"],#site-content > div.container > section.pb-3.pb-e-lg-40.text-center,.text-center > a[target=\"_blank\"] > img,a[href*=\"\?banner=\"],[class*=\"root--\"],.badge,a[href=\"http\:\/\/uus52\.com/\"] {display :none !important; pointer-events: none !important;}",
        missav: "img[src*='.gif'], iframe,#a[href*='//bit.ly/'],div[style*='z-index: 1001'],ul.space-y-2.mb-4.ml-4.list-disc.text-nord14,div.space-y-5.mb-5,div.under_player,div[style=\"width: 300px; height: 250px;\"] {display:none !important; pointer-events:none important;}",
        porn91: "img[class*=\"ad_img\"], iframe[src*=\"ads\"], img[href*='.gif'] {display:none ! important; pointer-events: none !important;}",
        pornhubx: "#header.hasAdAlert {grid-template-rows:60px 40px 0px !important} div.hd.clear, div > img[data-title][srcset], #js-networkBar,div#abAlert, .adsbytrafficjunky, #pb_template, .sponsor-text, #adsbox, .abAlertShown, .abAlertInner, #main-container > .abovePlayer, [rel*='noopener nofollow'],a[href^=\"http://ads.trafficjunky.net/\"], .topAdContainter,.adsbytrafficjunky,.ad-link,a[target='_blank'] {height:0px !important; display:none !important; pointer-events:none;}"
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
    console.log("URL : " + url);
    var i;
    for (i = 0; i < adsDomain.length; i++) {
        if (url.indexOf(adsDomain[i]) !== -1) {
            var values = adsDomain[i];
            console.log("Catch it : " + values)
        }
    }
    return values;
}

function adsDomain_switch(x) {
    switch (x) {
        case 'pornhub':
            pornhub_interstitialPass();
            css_adsRemove(imax.css.pornhubx, 50, "limbopro");
            tag_adsRemove("script", "ads_batch");
            pornhub_sidebar_ads();
            break;
        case 'missav':
            cloudflare_captchaBypass();
            css_adsRemove(imax.css.missav);
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

function css_adsRemove(newstyle, delaytime, id) {
    setTimeout(() => {
        var creatcss = document.createElement("style");
        creatcss.id = id;
        creatcss.innerHTML = newstyle;
        document.getElementsByTagName('head')[0].appendChild(creatcss)
        console.log("CSS样式新增完毕！");
    }, delaytime);
}

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
}

function jable_adsRemove() {
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

function missAv_adsRemove() {
    document.cookie = "_gat_UA-177787578-7; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}