import axios from 'axios'

let base = ''
let host = 'http://localhost:8080/cmn'

export function getToken(name) {
    let token = null;
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
    console.log(name)
    if (arr = document.cookie.match(reg)) {
        token = unescape(arr[2]);
    }
    return token;
}

function ajax(url, params, type = "GET", user, timeout = 1000) {
    return new Promise((resolve, reject) => {
        let data = {
            method: type,
            url: url,
            headers: { 'Authorization': 'Bearer ' + getToken(user) },
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



export const adminLogin = (params) => ajax(host + "/admin/login", params, "POST", "admin");

export const adminInfo = (params) => ajax(host+'/admin/info', params, "GET" , "admin");
export const teacherList = (params) => ajax(host+'/admin/teacher/list', params, "GET" , "admin");
export const teacherAdd = (params) => ajax(host+"/admin/teacher/add", params, "POST" , "admin");
export const teacherDel = (params) => ajax(host + '/admin/teacher/delete', params, "POST" , "admin");
export const teacherInfo = (params) => ajax(host + '/admin/teacher/info', params, "GET", "admin");
export const teacherUpdate = (params) => ajax(host + "/admin/teacher/update", params, "POST", "admin");
export const teacherAll = (params) => ajax(host + '/admin/teacher/all', params, "GET", "admin")

export const classAdd = (params) => ajax(host + '/admin/class/add', params, "POST", "admin")
export const classList = (params) => ajax(host + '/admin/class/list', params, "GET", "admin");
export const classDel = (params) => ajax(host + '/admin/class/delete', params, "POST", "admin")
export const classUpdate = (params) => ajax(host + '/admin/class/update', params, "POST", "admin")
export const classInfo = (params) => ajax(host + '/admin/class/info', params, "GET", "admin");
export const classAll = (params) => ajax(host + '/admin/class/all', params, "GET", "admin")

export const studentAdd = (params) => ajax(host + '/admin/student/add', params, "POST", "admin")
export const studentList = (params) => ajax(host + '/admin/student/list', params, "GET", "admin")
export const studentDel = (params) => ajax(host + '/admin/student/delete', params, "POST", "admin")
export const studentUpdate = (params) => ajax(host + '/admin/student/update', params, "POST", "admin")
export const studentInfo = (params) => ajax(host + '/admin/student/info', params, "GET", "admin")

export const teacherLogin = (params) => ajax(host + '/teacher/login', params, "POST","teacher");
export const userTInfo = (params) => ajax(host + '/teacher/info', params, "GET","teacher");
export const testAdd = (params) => ajax(host + '/teacher/test/add', params, "POST", "teacher")
export const fileUpdate = (params) => ajax(host + "/fileupdate", params, "POST", "teacher")
export const testList = (params) => ajax(host + '/teacher/test/list', params, "GET", "teacher")
export const testDel = (params) => ajax(host + '/teacher/test/delete', params, "POST", "teacher")
export const testInfo = (params) => ajax(host + '/teacher/test/info', params, "GET", "teacher")
export const filesList = (params) => ajax(host + '/getfiles', params, "GET", "teacher")
export const commentTList = (params) => ajax(host+'/teacher/comment/list',params, "GET", "teacher")
export const commentTAdd = (params) => ajax(host + '/teacher/comment/add', params, "POST", "teacher")

export const studentLogin = (params) => ajax(host + '/student/login', params, "POST","student");
export const userSInfo = (params) => ajax(host + '/student/info', params, "GET","student");
export const testSList = (params) => ajax(host + '/student/test/list', params, "GET", "student")
export const testSInfo = (params) => ajax(host + '/student/test/info', params, "GET", "student")
export const commentSList = (params) => ajax(host+'/student/comment/list',params, "GET", "student")
export const commentSAdd = (params) => ajax(host + '/student/comment/add', params, "POST","student");