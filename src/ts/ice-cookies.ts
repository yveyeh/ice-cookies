import { Options } from './interface/options'
import { setAttributes } from './util'


const iceCookies = (options: Options): void => {

    /**The title of the cookie consent. */
    const ic_title: string = options.title ? options.title : 'iceCookies'
    /**The description of the cookie consent. */
    const ic_desc: string = options.description
    /**The `optional` cookie policy link of the cookie consent. */
    const ic_link = `<a href="${options.link ? options.link.href : 'javascript:void(0)'}" target="_blank">${options.link ? options.link.text : ''}</a>`
    /**The button text of the cookie consent. */
    const ic_btn: string = options.button.text
    /**The duration of the cookie consent cookie. */
    const ic_days: number | undefined = options.duration


    /**
     * The fade effect for the `ic-box` element.
     * @param flow - The z-plane direction of the fade effect.
     * @param disp - The `display` css property value.
     * @returns void
     */
    const iceCookiesFade = (flow: string, disp: string): void => {
        /** The targeted `html element`. */
        const e = document.getElementById('ic-box')
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
        iceCookiesSet('iceCookies', 'Consent@tenshnova-ice-cookies-plugin', ic_days)
        iceCookiesFade('out', 'none')
    }

    /**
     * Initializes the `iceCookies plugin`.
     * @returns void
     */
    const iceCookiesInit = (): void => {
        if (iceCookiesGet('iceCookies') == ' ') {
            const ic_box = document.createElement('div')
            setAttributes(ic_box, { 'class': 'ic-box', 'id': 'ic-box' })
            ic_box.innerHTML = `
            <div class="ic-title">
                <a>${ic_title}</a>
            </div>
            <div class="ic-desc">
                <p>${ic_desc} ${ic_link}</p>
            </div>
            <div class="ic-btn pull-end">
                <a onclick="iceCookiesDismiss()">${ic_btn}</a>
            </div>`
            document.body.appendChild(ic_box)
            iceCookiesFade('in', 'block')
        }
    }


    window.onload = function () {
        iceCookiesInit() // Initialize the iceCookies plugin on load.
    }
}