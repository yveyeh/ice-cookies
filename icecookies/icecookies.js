// --- Config --- //
var iceCookiesTitle = "iceCookies" // Title
var iceCookiesDesc = "We use cookies to ensure you get the best user experience on our website. By continuing to use this site, you agree to the use of these cookies." // Description
var iceCookiesLink = '<a href="https://www.unicsgroup.com/privacy-policy" target="_blank">Know more</a>' // Policy link
var iceCookiesBtn = "Agree" // Button text

/**
 * The fade effect for the `icecookies-container` element.
 * @param {string} flow - The z-plane direction of the fade effect.
 * @param {string} id - The `id` of the targeted element.
 * @param {string} disp - The `display` css property value.
 * @returns void
 */
var iceCookiesFade = (flow, id, disp = 'block') => {
    /** The targeted `html element`. */
    let e = document.getElementById(id)
    switch (flow) {
        case 'in':
            e.style.opacity = 0;
            e.style.display = disp;
            (function fade() {
                /** The `opacity` css property value. */
                let o = parseFloat(e.style.opacity)
                if (!((o += 0.02) > 1)) {
                    e.style.opacity = o;
                    requestAnimationFrame(fade)
                }
            })()
            break;
        case 'out':
            e.style.opacity = 1;
            (function fade() {
                if ((e.style.opacity -= 0.02) < 0) {
                    e.style.display = disp;
                } else {
                    requestAnimationFrame(fade)
                }
            })()
            break;
        default:
            break;
    }
}

/**
 * Sets a cookie in the browser.
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {number} days - The duration of the cookie.
 * @returns void
 */
var iceCookiesSet = (name, value, days = 7) => {
    /** Specifies the cookie expiration. */
    let exp = ""
    let date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    exp = date.toUTCString()
    document.cookie = `${name}=${value}; Expires=${exp}; Secure; Path=/`
}

/**
 * Gets a cookie from the browser.
 * @param {string} name - The name of the cookie.
 * @returns string
 */
var iceCookiesGet = (name) => {
    let _cookie = document.cookie
    return _cookie.startsWith(name) ? name : ' '
}

// function iceCookiesErase(name) {
//     document.cookie = name + '=; Max-Age=-99999999;'
// }

/**
 * Initializes the `iceCookies plugin`.
 * @returns void
 */
var iceCookiesInit = () => {
    if (iceCookiesGet('iceCookies') == ' ') {
        let ice_cookie_cont = document.createElement('div')
        setAttributes(ice_cookie_cont, {'class': 'icecookies-container', 'id': 'icecookies-container'})
        ice_cookie_cont.innerHTML = `
            <div class="icecookies-title">
                <a>${iceCookiesTitle}</a>
            </div>
            <div class="icecookies-desc">
                <p>${iceCookiesDesc} ${iceCookiesLink}</p>
            </div>
            <div class="icecookies-btn pull-end">
                <a onclick="iceCookiesDismiss()">${iceCookiesBtn}</a>
            </div>
        `
        document.body.appendChild(ice_cookie_cont)
        iceCookiesFade('in', 'icecookies-container')
    }
}

/**
 * Dismisses a displayed cookie consent.
 * @returns void
 */
var iceCookiesDismiss = () => {
    iceCookiesSet('iceCookies', 'Consent@tenshnova-iceCookies-plugin', 7)
    iceCookiesFade('out', 'icecookies-container', 'none')
}

/**
 * Sets multiples attributes of an element at once.
 * @param {HTMLElement} e - The element on which attributes are set.
 * @param {*} attrs - The attributes object with 
 * @returns void
 */
var setAttributes = (e, attrs) => {
    for(let key in attrs) {
        e.setAttribute(key, attrs[key])
    }
}

window.onload = function () {
    iceCookiesInit() // Initialize the iceCookies plugin on load.
}