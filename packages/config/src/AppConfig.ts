const _host = typeof window !== 'undefined' ? window.location.hostname : ''
const _protocol = typeof window !== 'undefined' ? window.location.protocol : ''

const SiteConfig = {
    trackingID: 'G-XXXXXXXXXXXX',
    SSR: true, //Server-side rendering
    documentationVisible: false,
    useLocalDocumentation: false,
    signupEnabled: false,
    defaultWorkspacePage: 'dashboard',
    assistant: true,
    projectName: 'Vento',
    ui: {
        defaultTint: 'green', // 'gray', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'red'
        tintSwitcher: true,
        themeSwitcher: true,
        forcedTheme: undefined, // 'light', 'dark'
    }
}
export { SiteConfig }