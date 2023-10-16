import settings from "./settings";

export function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

export function createStartUrl(){
    return isAndroid() ? settings.play_url : settings.web_app_url
}