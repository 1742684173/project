
const chinese_pattern = "";

/**
 * 校验是否是数字类型
 */
export const numberFlag = (val) => {
	var regPos = /^\d+(\.\d+)?$/; //非负浮点数
	var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
	if(regPos.test(val) || regNeg.test(val)){
		return true;
	}else{
		return false;
	}
}

/**
 * 字符长度
 */
export const strLen = (str) => {
	return (str+"").length;
}

/**
 * 判断字符是否为空
 */
export const isEmptyStr = (str) => {
	if(!str || str === undefined || str === ""){
		return true;
	}
	
	return false;
}

/**
 * 判断字符是否不为空
 */
export const isNotEmptyStr = (str) => {
	return !isEmptyStr(str);
}

/**
 * 判断字符是否为中文
 */
export const  isChinese = (str) => {
	return /^[\u4E00-\u9FA5]{2,4}$/.test(str);
}

/**
 * 拼音较验
 */
export const  isPinYin = (str) => {
	return /(^[a-zA-Z]+$)/.test(str);
}

/**
 * 身份证较验
 */
export const  isID = (str) => {
	return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(str);
}

/**
 * 手机号码较验
 */
export const  isTel = (str) => {
	return /(^1[3456789][0-9]{9}$)/.test(str);
}

/**
 * 邮箱校验
 */
export const  isEmail = (value) =>{  
　　var ext = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
　　return ext.test(value);
}

/**
 * 将list<对象>转对象  对象的key是list里边对象的键是FieldId的值
 */
export const listToObj = (list) =>{
	var obj = {};
	for (var index in list) {
	    obj[list[index].FieldId] = list[index];
	}
　　return obj;
}

/**
 * param 初始化值：initValue 列表：list
 * return index：初始化值的值在列表中的索引
 */
export const initListIndex = (initValue, list) =>{
	for (var index in list) {
	    if (list[index].key === initValue) {
			return index;
		}
	}
　　return -1;
}
/**
 * param 初始化值卡片：initValue 列表：list
 * return index：初始化值的值在列表中的索引
 */
export const initCardListIndex = (initValue, list) =>{
	for (var index in list) {
	    if (list[index].CreditNo === initValue) {
			return index;
		}
	}
　　return -1;
}
/**
 * 将时间转换为字符串
 */
export const dateToStr = (data) =>{
	let year = data.getFullYear();
	let month = data.getMonth() + 1;
	console.log("month: " + JSON.stringify(month));
	let day = data.getDate();
	console.log("day: " + JSON.stringify(day));
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}
	console.log(year+"/"+month+"/"+day);
　　return year+"/"+month+"/"+day;
}

// 时间戳转时间
export const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
 
export const padLeftZero = (str) => {
  return ('00' + str).substr(str.length)
}
// 手机号脱敏
export const encryptPhone = (str) => {
    if (null != str && str != undefined) {
		var pat = /(\d{3})\d*(\d{4})/;
		return str.replace(pat, '$1****$2');
    } else {
		return "";
    }
}
// 身份证号脱敏
export const encryptIdNo = (str) => {
    if (null != str && str != undefined) {
		var pat = /(\w{4})\w*(\w{4})/;
		return str.replace(pat, '$1**********$2');
    } else {
		return "";
    }
}
// 信用卡号脱敏
export const encryptCreditNo = (str) => {
    if (null != str && str != undefined) {
		var pat = /(\d{4})\d*(\d{4})/;
		return str.replace(pat, '$1********$2');
    } else {
		return "";
    }
}
// 姓名脱敏
export const encryptName = (str) => {
    if (null != str && str != undefined) {
		if (str.length <= 3) {
			return "*" + str.substring(1, str.length);
		} else if (str.length > 3 && str.length <= 6) {
			return "**" + str.substring(2, str.length);
		} else if (str.length > 6) {
			return str.substring(0, 2) + "****" + str.substring(6, str.length)
		}
    } else {
		return "";
    }
}

