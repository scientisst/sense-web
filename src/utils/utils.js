export const isFirefox = (navigator.userAgent.toLowerCase().indexOf("firefox") != -1);
export const isAndroid = (navigator.userAgent.toLowerCase().indexOf("android") != -1);

export const resolvesDNS = !isFirefox && !isAndroid;