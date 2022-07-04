declare module '*.ico';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.eot';
declare module '*.wof';
declare module '*.woff';
declare module '*.woff2';

declare module '*/nation.json' {
    type Nation = {
        name: string
        "alpha-2": string
        "alpha-3": string
        "country-code": string
        "iso_3166-2": string
        region: string
        "sub-region": string
        "intermediate-region": string
        "region-code": string
        "sub-region-code": string
        "intermediate-region-code": string
    }
    const value: Nation[]
    export default value
}