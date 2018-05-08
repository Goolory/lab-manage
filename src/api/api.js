import axios from 'axios'

let base = ''
let host = 'http://localhost:8080/cmn'

export function getToken(name='admin') {
    let token = null;
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配

    if (arr = document.cookie.match(reg)) {
        token = unescape(arr[2]);
    }
    return token;
}

function ajax(url, params, type = "GET", timeout = 1000) {
    return new Promise((resolve, reject) => {
        let data = {
            method: type,
            url: url,
            headers: { 'Authorization': 'Bearer ' + getToken() },
            timeout: timeout
        };
        switch (type) {
            case "GET":
                data.params = params;
                break;
            case "POST":
                data.data = params;
                break;
        }
        axios(data).then((resp) => {
            resolve(resp.data);
        }).catch((err) => {
            // if (err.response.status === 500) {
            //     console.log("服务器内部错误")
            // } else {
            //     console.log("网络异常")
            // }
            reject(err);
            console.log(err)
        })
    
        
    })
    
}

export const adminLogin = (params) => ajax(host + "/admin/login", params, "POST");
export const adminInfo = (params) => ajax(host+'/admin/info', params, "GET");
export const teacherList = (params) => ajax(host+'/admin/teacher/list', params, "GET");
export const teacherAdd = (params) => ajax(host+"/admin/teacher/add", params, "POST");
export const teacherDel = (params) => ajax(host + '/admin/teacher/delete', params, "POST");