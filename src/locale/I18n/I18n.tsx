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


    getT(key: string): string {
        const curRes = this.res && this.lang ? this.res[this.lang] : null,
            arr = key.split(':')
        const curValue = key.length !== 0 && curRes ? (arr.length === 1 ? curRes[arr[0]] : curRes[arr[0]][[arr[1]]]) : key
        return curValue || key

    }

    changeLang(lang: string) {
        this.lang = lang
    }

}

export default I18n