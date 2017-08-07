export function get(url){
    //创建fetch对象
    var result = fetch(url,{
        method:"get"
    })
    return result;
}