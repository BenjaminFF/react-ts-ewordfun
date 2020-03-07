//@ts-nocheck
interface Resource {
    [propName: string]: Object
}

class I18n {

    lang: string | undefined
    private res: Resource | undefined

    init(res: Resource, lang: string) {
        this.lang = lang
        this.res = res
        return this
    }


    getT(key: string, vars): string {
        const curRes = this.res && this.lang ? this.res[this.lang] : null,
            arr = key.split(':')
        let curValue = key.length !== 0 && curRes ? (arr.length === 1 ? curRes[arr[0]] : curRes[arr[0]][[arr[1]]]) : key
        if (vars && typeof curValue === 'string') {
            Object.keys(vars).forEach(function (key) {
                curValue = curValue.replace(`%{${key}}`, vars[key])
            })
        }
        if (vars && Array.isArray(curValue)) {
            curValue = [...curValue]    //为了不改变原来的值
            Object.keys(vars).forEach(function (key) {
                for (let i = 0; i < curValue.length; i++) {
                    curValue[i] = curValue[i].replace(`%{${key}}`, vars[key])
                }
            })
        }
        return curValue || key

    }

    changeLang(lang: string) {
        this.lang = lang
    }

}

export default I18n