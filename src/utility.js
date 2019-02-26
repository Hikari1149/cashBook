export const LIST_VIEW='list';
export const CHART_VIEW='chart';
export function PadLeft(x){
    return x<10? '0'+x: x;
}
export function GenRange(val,st,ed) {
    var arr=[];
    for(let i=val+st;i<=val+ed;i++){
        arr.push(PadLeft(i));
    }
    return arr;
}
export function GetDate(str) {
    const date= str? new Date(str) : new Date();
    return {
        year:date.getFullYear(),
        month:PadLeft(date.getMonth()+1)
    }
}
export const IsValidDate=(dateString)=>{
    const regEx=/^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx))    return false;//格式错误.
    const d=new Date(dateString);
    if(Number.isNaN(d.getTime())) return false;//日期错误.
    return d.toISOString().slice(0,10)===dateString;
  //  return true;
};
export const Colors={
    blue: '#347eff',
    deepBlue: '#61dafb',
    green: '#28a745',
    red: '#dc3545',
    gray: '#555',
    lightGray: '#efefef',
    white: '#fff',
};
export const flatterArray=(arr)=>{
    return arr.reduce((map,item)=> {
            map[item.id] = item;
            return map;
        }
    ,{});
};
export const ID = () => {
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
}
