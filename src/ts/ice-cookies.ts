import { Options } from './interface/options'
import { setAttributes } from './utils'


const iceCookies = (options: Options): void => {

    /**The title of the cookie consent. */
    const ice_title = options.title ? options.title : 'iceCookies'
    /**The description of the cookie consent. */
    const ice_desc = options.description
    /**The `optional` cookie policy link of the cookie consent. */
    const ice_link = `<a href="${options.link ? options.link.href : 'javascript:void(0)'}" target="_blank">${options.link ? options.link.text : ''}</a>`
    /**The button text of the cookie consent. */
    const ice_btn = options.button.text
    /**The duration of the cookie consent cookie. */
    const ice_days = options.duration


    /**
     * The fade effect for the `icecookies-container` element.
     * @param flow - The z-plane direction of the fade effect.
     * @param disp - The `display` css property value.
     * @returns void
     */
    const iceCookiesFade = (flow: string, disp: string): void => {
        /** The targeted `html element`. */
        const e = document.getElementById('icecookies-container')
        if (e) {
            switch (flow) {
                case 'in':
                    // eslint-disable-next-line semi
                    e.style.opacity = (0).toString();
                    e.style.display = disp;
                    (function fade() {
                        /** The `opacity` css property value. */
                        let o: number = parseFloat(e.style.opacity)
                        if (!((o += 0.02) > 1)) {
                            // eslint-disable-next-line semi
                            e.style.opacity = o.toString();
                            requestAnimationFrame(fade)
                        }
                    })()
                    break
                case 'out':
                    e.style.opacity = (1).toString();
                    (function fade() {
                        /** The `opacity` css property value. */
                        let o: number = parseFloat(e.style.opacity)
                        if ((o -= 0.02) < 0) {
                            // eslint-disable-next-line semi
                            e.style.display = disp;
                        } else {
                            requestAnimationFrame(fade)
                        }
                    })()
                    break
                default:
                    break
            }
        }
    }

    /**
     * Sets a cookie in the browser.
     * @param name - The name of the cookie.
     * @param value - The value of the cookie.
     * @param days - The duration of the cookie.
     * @returns void
     */
    const iceCookiesSet = (name: string, value: string, days?: number): void => {
        const date: Date = new Date()
        const d: number = days ? days : 7 // default to seven days.
        date.setTime(date.getTime() + (d * 86400000))
        const exp: string = date.toUTCString() // when the cookie expires.
        document.cookie = `${name}=${value}; Expires=${exp}; Secure; Path=/`
    }

    /**
     * Gets a cookie from the browser.
     * @param name - The name of the cookie.
     * @returns string
     */
    const iceCookiesGet = (name: string): string => {
        const _cookie: string = document.cookie
        return _cookie.startsWith(name) ? name : ' '
    }

    /**
     * Dismisses a displayed cookie consent.
     * @returns void
     */
    const iceCookiesDismiss = (): void => {
        iceCookiesSet('iceCookies', 'Consent@tenshnova-iceCookies-plugin', ice_days)
        iceCookiesFade('out', 'none')
    }

    /**
     * Initializes the `iceCookies plugin`.
     * @returns void
     */
    const iceCookiesInit = (): void => {
        if (iceCookiesGet('iceCookies') == ' ') {
            const ice_cookie_cont = document.createElement('div')
            setAttributes(ice_cookie_cont, { 'class': 'icecookies-container', 'id': 'icecookies-container' })
            ice_cookie_cont.innerHTML = `
            <div class="icecookies-title">
                <a>${ice_title}</a>
            </div>
            <div class="icecookies-desc">
                <p>${ice_desc} ${ice_link}</p>
            </div>
            <div class="icecookies-btn pull-end">
                <a onclick="iceCookiesDismiss()">${ice_btn}</a>
            </div>
        `
            document.body.appendChild(ice_cookie_cont)
            iceCookiesFade('in', 'block')
        }
    }


    window.onload = function () {
        iceCookiesInit() // Initialize the iceCookies plugin on load.
    }
}