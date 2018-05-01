export const setCookie = (name, value, time) => {
    let hours = time?time:4;
    let exp = new Date();
    exp.setTime(exp.getTime() + hours*60*60*1000);
    document.cookie = name + "=" + escape (value) + ";expires=" + exp.toGMTString() + ";/path=/";
}

export const getCookie = (name="admin")=>{
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); 
    if (arr = document.cookie.match(reg)){
        return unescape(arr[2]);
    } else {
        return null;
    }
}