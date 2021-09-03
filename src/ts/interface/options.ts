export interface Options {
    title?: string
    description: string
    readonly link?: {
        href: string
        text: string
    }
    readonly button: {
        text: string
    }
    duration?: number
}