const regExp = {
  mobileCN: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
  username: /^[a-zA-Z]\w{2,15}$/,
  password: /^[\da-zA-z]{8,16}$/
}

/** 匹配国内手机号 (前三位特殊格式, 后八位0~9, 长度11位) */
export const isMobileCN = (value: string) => regExp.mobileCN.test(value)
/** 匹配用户名 (首位字母, 允许数字、字母和下划线, 不区分大小写, 长度3~16位) */
export const isUsername = (value: string) => regExp.username.test(value)
/** 匹配密码 (只能为数字和字母的组合, 不区分大小写, 长度8~16位) */
export const isPassword = (value: string) => regExp.password.test(value)
