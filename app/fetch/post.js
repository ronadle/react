function obj2params(obj) {
    var result = '';
    var item;
    for (item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }

    if (result) {
        result = result.slice(1);
    }

    return result;
}


export function post(url,probj){
    var result = fetch(url,{
        method:"post",
        headers: {
           'Accept': 'application/json, text/plain, */*',
           'Content-Type': 'application/x-www-form-urlencoded'
        },
        //自己拼接字符串
        body:obj2params(probj)
    });
    return result;
}