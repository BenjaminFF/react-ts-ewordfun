const shuffle = (array: Array<any>): Array<any> => {
    var m = array.length, t, i
    while (m) {
        i = Math.floor(Math.random() * m--)
        t = array[m]
        array[m] = array[i]
        array[i] = t
    }
    return array
}

//strLen为1~5
const mixStr = (str: string): string => {
    str = str.trim()
    while (true) {
        let mixTime = str.length, mixedChars = str.split("")
        while (mixTime) {
            let randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97),
                randomPos = Math.floor(Math.random() * str.length)
            mixedChars[randomPos] = randomChar
            mixTime--
        }
        if (mixedChars.join("") !== str) return mixedChars.join("")
    }
}

const splitStr = (str: string, maxSplitNum: number = 8): Array<string> => {
    str = str.trim()
    const strLen = str.length, minSubStrLen = strLen <= 6 ? 1 : (strLen < 13 ? 2 : 3)
    while (true) {
        let count = strLen, subStrArr: Array<string> = []
        while (count > 0) {
            let subStrLen = minSubStrLen + Math.floor(Math.random() * 3)
            if (count < subStrLen) subStrLen = count
            subStrArr.push(str.substring(strLen - count, strLen - count + subStrLen))
            count -= subStrLen
        }
        if (subStrArr.length < maxSplitNum) return subStrArr
    }
}

const randomStr = (strLen: number = 6): string => {
    const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let randomStr = ''
    while (randomStr.length < strLen) {
        randomStr += str[Math.floor(Math.random() * str.length)]
    }
    return randomStr
}

const getCookie = (cname: string): string => {
    const name = cname + "=", ca = decodeURIComponent(document.cookie).split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}

const isLearnByDate = (startTS: number): boolean => {
    const learnPlans = [0, 1, 2, 4, 7, 11, 15, 25, 30], startDate = new Date(startTS),
        intervalDays = Math.floor((Date.now() - startDate.getTime()) / (3600 * 24 * 1000))
    return learnPlans.filter((item) => item === intervalDays).length > 0
}

const isLearnToday = (latestlearntime: number): boolean => {
    return ((Date.now() - latestlearntime) / (3600 * 24 * 1000)) < 0.5
}

const isValidPlanDate = (dateStr: string): boolean => {
    const isValidFormat = /^(0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])[/-]\d{4}$/.test(dateStr)
    if (!isValidFormat) return false
    const date = new Date(dateStr), curDate = new Date(), month = date.getMonth(), curMonth = curDate.getMonth()
    const isThisYear = date.getFullYear() === curDate.getFullYear()
    if (!isThisYear) return false
    return true
}


export {
    shuffle,
    mixStr,
    splitStr,
    randomStr,
    getCookie,
    isLearnByDate,
    isLearnToday,
    isValidPlanDate
}