import nodeFetch from 'node-fetch'
import cheerio from 'cheerio'
import { CookieJar } from 'tough-cookie';
import { HttpCookieAgent, HttpsCookieAgent } from 'http-cookie-agent';
import fs from 'fs'
import { Telegraf } from 'telegraf';
import * as crypto from 'crypto'

const webcrypto = crypto.webcrypto

const jar = new CookieJar();


const httpAgent = new HttpCookieAgent({ jar });
const httpsAgent = new HttpsCookieAgent({ jar});

var $
var apiKey, atbtoken

var firstPageCheck = async () => {
    await nodeFetch("https://www.apple.com/hk/en/iphone-13/", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1"
        },
        "method": "GET",
        "mode": "cors",
        agent: httpsAgent
    })
    .then(async HomePageHTML => {
        return await HomePageHTML.text()
    })
    .then(async done1 => {
        // console.log(done1)
        $ = cheerio.load(done1)
        $('meta[name="ac-gn-store-key"]').each((idx,val) => {
            apiKey = val.attribs['content']
        })
        console.log(`The Key is : ${apiKey}`)
    })
    .catch(async err => {
        console.error(err)
    })
}

var checkApiStatus = async(apiKey) => {
    await nodeFetch(`https://www.apple.com/hk/shop/bag/status?apikey=${apiKey}`, {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "*/*",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13",
        "method": "GET",
        "mode": "cors",
        agent: httpsAgent
    })
    .then(async checkApiStatus => {
        return await checkApiStatus.json()
    })
    .then(async done1=>{
        console.log(done1)
    })
    .catch(async err => {
        console.error(err)
    })
}

var getIPhone13ProPrice = async () => {
    await nodeFetch("https://www.apple.com/hk/shop/mcm/product-price?parts=IPHONE13PRO_MAIN", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "*/*",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://www.apple.com/hk/en/iphone-13-pro/",
        "method": "POST",
        "mode": "cors",
        agent: httpsAgent
    })
    .then(async IPhonePriceHTML => {
        return await IPhonePriceHTML.json()
    })
    .then(async done1=>{
        // console.log(done1)
    })
    .catch(async err => {
        console.error(err)
    })
}

var getIPhoneProPage = async() => {
    await nodeFetch("https://www.apple.com/hk/en/iphone-13-pro/", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1"
        },
        "referrer": "https://www.apple.com/hk/en/iphone/",
        "method": "GET",
        "mode": "cors",
        agent: httpsAgent
    })
    .then(async IPhoneFrontPageHTML => {
        return await IPhoneFrontPageHTML.text()
    })
    .then(async done1 => {
        $ = cheerio.load(done1)
        $('meta[name="ac-gn-store-key"]').each((idx,val) => {
            apiKey = val.attribs['content']
            console.log(`The Key is : ${val.attribs['content']}`)
        })
    })
}

var getIPhoneProPage2 = async () => {
    await nodeFetch("https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1"
        },
        "referrer": "https://www.apple.com/hk/en/iphone-13-pro/",
        "method": "GET",
        "mode": "cors"
    })
    .then(async IPhoneProPage2 => {
        return await IPhoneProPage2.text()
    })
    .then(async done1 => {
        $ = cheerio.load(done1)
        $('meta[name="ac-gn-store-key"]').each((idx,val) => {
            apiKey = val.attribs['content']
        })
        console.log(`The Key is : ${apiKey}`)
    })
    .catch(async err => {
        console.error(err)
    })
}

var getStep1FlagShip = async () => {
    await nodeFetch("https://www.apple.com/hk/shop/favoritesx/fetch", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "*/*",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro",
        "method": "GET",
        "mode": "cors",
        agent: httpsAgent
    })
    .then(async FlagShipHTML => {
        return await FlagShipHTML.text()
    })
    .then(async done1 => {
        console.log(done1)
    })
    .catch(async err => {
        console.error(err)
    })
}

var getPageViewID = () => {
    return "".concat(webcrypto.getRandomValues?([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(t){return(t^webcrypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16)})):"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var a=16*Math.random()|0;return"".concat(("x"==t?a:3&a|8).toString(16),"-legacy")}))) 
}

var getAOSClientPerf = async() => {
    await nodeFetch("https://xp.apple.com/report/2/xp_aos_clientperf", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "*/*",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Content-Type": "application/json",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site"
        },
        "referrer": "https://www.apple.com/",
        "body": `{\"deliveryVersion\":\"1.0\",\"postTime\":${Math.floor(new Date().getTime())},\"events\":[{\"app\":\"com.apple.www.Store\",\"eventType\":\"pageview\",\"postTime\":${Math.floor(new Date().getTime())},\"host\":\"www.apple.com\",\"pageHostname\":\"www.apple.com\",\"pagePathname\":\"/hk/shop/buy-iphone/iphone-13-pro\",\"pageUrl\":\"https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?<query>\",\"pageViewId\":\"d5d64125-691f-472c-ad07-9bf12ef8f615\",\"sessionStartTS\":\"${new Date().toString()}\",\"triggeredBy\":\"load\",\"name\":\"https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro\",\"entryType\":\"navigation\",\"startTime\":0,\"duration\":1999,\"initiatorType\":\"navigation\",\"nextHopProtocol\":\"h2\",\"workerStart\":0,\"redirectStart\":0,\"redirectEnd\":357,\"fetchStart\":357,\"domainLookupStart\":357,\"domainLookupEnd\":357,\"connectStart\":357,\"connectEnd\":357,\"secureConnectionStart\":357,\"requestStart\":360,\"responseStart\":366,\"responseEnd\":374,\"transferSize\":41935,\"encodedBodySize\":41174,\"decodedBodySize\":292134,\"serverTiming\":[],\"unloadEventStart\":477,\"unloadEventEnd\":479,\"domInteractive\":934,\"domContentLoadedEventStart\":961,\"domContentLoadedEventEnd\":1083,\"domComplete\":1989,\"loadEventStart\":1997,\"loadEventEnd\":1999,\"type\":\"navigate\",\"redirectCount\":2,\"NavigationTimingLevel\":2,\"imageCountOnLoad\":44,\"support\":{\"subtleCrypto\":true},\"referer\":\"https://www.apple.com/hk/en/iphone-13-pro/?<query>\",\"asDc\":\"nc\",\"audit\":{\"telemetry\":{\"version\":[\"2.24.1\"]},\"echo\":{\"version\":[\"2.6.1\"]}},\"cookies\":[\"geo\",\"s_cc\",\"as_atb\",\"pxro\",\"s_vi\",\"as_sfa\",\"s_fid\",\"s_sq\",\"as_dc\"],\"crypto\":{\"exists\":true,\"passed\":true,\"algorithm\":\"RSA-OAEP\",\"encryptTime\":193,\"decryptTime\":8},\"pageId\":\"AOS: home/shop_iphone/family/iphone_13_pro/select\",\"pageShopPath\":\"/buy-iphone/iphone-13-pro\",\"pixelRatio\":1,\"pluginCount\":0,\"pxro\":\"1\",\"rsNames\":[\"rs-external\",\"rs-vendor\",\"rs-globalelements\",\"rs-iphone\"],\"screenHeight\":1050,\"screenWidth\":1680,\"scripts\":7,\"styles\":8,\"validPageUrl\":true,\"windowInnerHeight\":675,\"windowInnerWidth\":1680,\"windowOrientation\":0,\"windowOuterHeight\":1026,\"windowOuterWidth\":1696,\"environment\":\"\",\"sf\":\"hk\",\"segment\":\"Consumer\",\"locale\":\"en-hk\"},{\"app\":\"com.apple.www.Store\",\"eventType\":\"bundle_meta\",\"postTime\":${Math.floor(new Date().getTime())},\"host\":\"www.apple.com\",\"pageHostname\":\"www.apple.com\",\"pagePathname\":\"/hk/shop/buy-iphone/iphone-13-pro\",\"pageUrl\":\"https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?<query>\",\"pageViewId\":\"${getPageViewID()}\",\"sessionStartTS\":\"${Math.floor(new Date().getTime())}\",\"bundleSize\":2034}]}`,
        "method": "POST",
        "mode": "cors",
        agent: httpsAgent
    });
}

var firstFulfilment = async () => {
    await nodeFetch("https://www.apple.com/hk/shop/fulfillment-messages?little=false&mt=regular&parts.0=MLH63ZA/A", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "*/*",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro",
        "method": "GET",
        "mode": "cors",
        agent: httpsAgent
    })
    .then(async FirstFulfillmentHTML => {
        return await FirstFulfillmentHTML.json()
    })
    .then(async done1 => {
        // $ = cheerio.load(done1)
        console.log(done1)
    })
    .catch(async err => {
        console.error(err)
    })
}

var firstEntryPoint = async() => {
    await nodeFetch("https://www.apple.com/hk/shop/sba/entry?product=MLH63ZA%2FA&cppart=", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "*/*",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro",
        "method": "GET",
        "mode": "cors",
        agent: httpsAgent
    })
    .then(async FirstEntryPointHTML => {
        return await FirstEntryPointHTML.json()
    })
    .then(async done1 => {
        console.log(done1)
    })
    .catch(async err => {
        console.error(err)
    })
}

var updateSummary = async() => {
    await nodeFetch("https://www.apple.com/hk/shop/updateSummary?node=home%2Fshop_iphone%2Ffamily%2Fiphone_13_pro&step=select&product=MLH63ZA%2FA&bfil=undefined&carrierPolicyType=UNLOCKED&igt=true", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "*/*",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro",
        "method": "GET",
        "mode": "cors",
        agent: httpsAgent
    })
    .then(async updateSummaryHTML => {
        return await updateSummaryHTML.json()
    })
    .then(async done1 => {
        console.log(done1)
    })
    .catch(async err => {
        console.error(err)
    })
}

var updateSEO = async() => {
    await nodeFetch("https://www.apple.com/hk/shop/updateSEO?m=%7B%22product%22%3A%22MLH63ZA%2FA%22%2C%22cppart%22%3A%22UNLOCKED%2FWW%22%2C%22refererUrl%22%3A%22https%3A%2F%2Fwww.apple.com%2Fhk%2Fshop%2Fbuy-iphone%2Fiphone-13-pro%22%7D", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "application/json",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Content-Type": "application/json",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro",
        "method": "GET",
        "mode": "cors"
    })
    .then(async updateSEOHTML => {
        return await updateSEOHTML.json()
    })
    .then(async done1 => {
        console.log(done1)
    })
    .catch(async err => {
        console.error(err)
    })
}

var getATBToken = async() => {
    await nodeFetch("https://www.apple.com/hk/shop/beacon/atb", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "image/webp,*/*",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Sec-Fetch-Dest": "image",
            "Sec-Fetch-Mode": "no-cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro",
        "method": "GET",
        "mode": "cors",
        agent: httpsAgent
    })
    .then(async ATBTokenResponseHTML => {
        return await ATBTokenResponseHTML.headers
    })
    .then(async done1 =>{
        var startATB = done1.get('set-cookie').indexOf('as_atb')
        var endATB = done1.get('set-cookie').indexOf('Domain=www.apple.com')
        atbtoken = done1.get('set-cookie').substr(startATB,endATB - startATB).split('\|')[2].replaceAll('\;','').trim()
    })
    .catch(async err => {
        console.error(err)
    })
}

var addToCart = async () => {
    await nodeFetch(`https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-128gb-gold?product=MLH63ZA%2FA&purchaseOption=fullPrice&step=select&atbtoken=${atbtoken}&igt=true&add-to-cart=add-to-cart#`, {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1"
        },
        "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-128gb-gold",
        "method": "GET",
        "mode": "cors",
        agent: httpsAgent
    })
    .then(async addToCartHTML => {
        return await addToCartHTML.text()
    })
    .then(async done1 => {
        // console.log(done1)
        $ = cheerio.load(done1)
        $('meta[name="ac-gn-store-key"]').each((idx,val) => {
            apiKey = val.attribs['content']
        })
        console.log(`The Key is : ${apiKey}`)
    })
    .catch(async err => {
        console.error(err)
    })
}

var attachIPhone = async () => {
    await nodeFetch("https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLH63ZA/A&step=attach", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1"
        },
        "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro/6.7-inch-display-128gb-gold",
        "method": "GET",
        "mode": "cors",
        agent: httpsAgent
    })
    .then(async AttachIPhoneHTML => {
        return await AttachIPhoneHTML.text()
    })
    .then(async done1 => {
        $ = cheerio.load(done1)
        $('meta[name="ac-gn-store-key"]').each((idx,val) => {
            apiKey = val.attribs['content']
        })
        console.log(`The Key is : ${apiKey}`)
        fs.writeFileSync('./data/Attachment.html',done1)
    })
    .catch(async err => {
        console.error(err)
    })
}

var proceedIPhone = async() => {
    await nodeFetch("https://www.apple.com/hk/shop/buy-iphone/iphone-13?proceed=proceed&product=MLK23ZA%2FA&step=attach", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1"
        },
        "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13?product=MLK23ZA/A&step=attach",
        "method": "GET",
        "mode": "cors"
    })
    .then(async proceedIPhoneHTML => {
        return await proceedIPhoneHTML.text()
    })
    .then(async done1 => {
        // console.log(done)
        $ = cheerio.load(done1)
        $('meta[name="ac-gn-store-key"]').each((idx,val) => {
            apiKey = val.attribs['content']
        })
        console.log(`The Key is : ${apiKey}`)
    })
    .catch(async err => {
        console.error(err)
    })
}

var getBagStatus = async () => {
    await nodeFetch("https://www.apple.com/hk/shop/bag", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1"
        },
        "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLH63ZA/A&step=attach",
        "method": "GET",
        "mode": "cors",
        agent : httpsAgent
    })
    .then(async getBagStatusHTML => {
        return await getBagStatusHTML.text()
    })
    .then(async done1 => {
        console.log(done1)
        fs.writeFileSync('./data/Bag.html', done1)
    })
    .catch(async err => {
        console.error(err)
    })
}

var buyFlowAttachSummary = async () => {
    await nodeFetch("https://www.apple.com/hk/shop/buyFlowAttachSummary/MLHA3ZA/A?node=home%2Fshop_iphone%2Ffamily%2Fiphone_13_pro&step=attach&dimensionCapacity=256gb&buyflowParams=%5Bobject%20Object%5D&igt=true&complete=true&part=MLHA3ZA%2FA&dimensionScreensize=6_7inch&dimensionColor=gold&product=MLHA3ZA%2FA", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
            "Accept": "*/*",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLHA3ZA/A&step=attach",
        "method": "GET",
        "mode": "cors",
        agent: httpsAgent
    })
    .then(async buyFlowAttachSummaryHTML => {
        return await buyFlowAttachSummaryHTML.json()
    })
    .then(async done1 => {
        await nodeFetch("https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=MM2P3FE/A&parts.1=MM1L3FE/A&parts.2=MM313FE/A", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "*/*",
                "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLHA3ZA/A&step=attach",
            "method": "GET",
            "mode": "cors",
            agent: httpsAgent
        });
        await nodeFetch("https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=HPRP2ZM/A&parts.1=HPR42ZM/A&parts.2=MHXH3ZA/A", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "*/*",
                "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLHA3ZA/A&step=attach",
            "method": "GET",
            "mode": "cors",
            agent: httpsAgent
        });
        await nodeFetch("https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=MM0T3FE/A&parts.1=MHXF3ZA/A&parts.2=MJWY3ZA/A", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "*/*",
                "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLHA3ZA/A&step=attach",
            "method": "GET",
            "mode": "cors",
            agent: httpsAgent
        });
        await nodeFetch("https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=HPBJ2ZM/A&parts.1=HPGA2B/A&parts.2=MX532ZP/A", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "*/*",
                "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLHA3ZA/A&step=attach",
            "method": "GET",
            "mode": "cors",
            agent: httpsAgent
        });
        await nodeFetch("https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=MX542ZP/A&parts.1=MMFC3FE/A&parts.2=MLYY3FE/A", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "*/*",
                "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLHA3ZA/A&step=attach",
            "method": "GET",
            "mode": "cors",
            agent: httpsAgent
        });
        await nodeFetch("https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=MX4A2FE/A&parts.1=MMN93ZP/A&parts.2=MMN53ZP/A", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "*/*",
                "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLHA3ZA/A&step=attach",
            "method": "GET",
            "mode": "cors",
            agent : httpsAgent
        });
        await nodeFetch("https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=HNPU2ZM/A&parts.1=HNPX2ZM/A&parts.2=MWP22ZP/A", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "*/*",
                "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLHA3ZA/A&step=attach",
            "method": "GET",
            "mode": "cors",
            agent : httpsAgent
        });
        await nodeFetch("https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=MV7N2ZP/A&parts.1=MMTN2FE/A&parts.2=MRXJ2ZP/A", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "*/*",
                "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLHA3ZA/A&step=attach",
            "method": "GET",
            "mode": "cors",
            agent : httpsAgent
        });
        await nodeFetch("https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=MYMC2PA/A&parts.1=MHJF3ZP/A&parts.2=MMX62FE/A", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "*/*",
                "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLHA3ZA/A&step=attach",
            "method": "GET",
            "mode": "cors",
            agent : httpsAgent
        });
        await nodeFetch("https://www.apple.com/hk/shop/fulfillment-messages?little=true&mt=compact&parts.0=MY5H2ZP/A", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "*/*",
                "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLHA3ZA/A&step=attach",
            "method": "GET",
            "mode": "cors",
            agent: httpsAgent
        });
        await nodeFetch("https://www.apple.com/hk/shop/engrave/json?product=MX532ZP%2FA", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "*/*",
                "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLHA3ZA/A&step=attach",
            "method": "GET",
            "mode": "cors",
            agent : httpsAgent
        });
        await nodeFetch("https://www.apple.com/hk/shop/engrave/json?product=MX542ZP%2FA", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "*/*",
                "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLHA3ZA/A&step=attach",
            "method": "GET",
            "mode": "cors",
            agent: httpsAgent
        });
        await nodeFetch("https://www.apple.com/hk/shop/engrave/json?product=MWP22ZP%2FA", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "*/*",
                "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLHA3ZA/A&step=attach",
            "method": "GET",
            "mode": "cors",
            agent: httpsAgent
        });
        await nodeFetch("https://www.apple.com/hk/shop/engrave/json?product=MV7N2ZP%2FA", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "*/*",
                "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLHA3ZA/A&step=attach",
            "method": "GET",
            "mode": "cors",
            agent: httpsAgent
        });
        await nodeFetch("https://www.apple.com/hk/shop/engrave/json?product=MRXJ2ZP%2FA", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
                "Accept": "*/*",
                "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://www.apple.com/hk/shop/buy-iphone/iphone-13-pro?product=MLHA3ZA/A&step=attach",
            "method": "GET",
            "mode": "cors",
            agent: httpsAgent
        });
    })
    .catch(async err => {
        console.error()
    })
}

// getATBToken()

getATBToken()
    .then(async done =>{
        addToCart()
            .then(async done => {
                attachIPhone()
                    .then(async done => {
                        checkApiStatus(apiKey)
                            .then(async done =>{
                                getAOSClientPerf()
                            })
                    })
            })
    })

// getIPhoneProPage()
// getIPhoneProPage2()
// checkApiStatus(apiKey)
// getIPhone13ProPrice()
// checkApiStatus(apiKey)
