export interface Resource {
    [propName: string]: Object
}

class I18n {

    private lang: string
    private res: Resource
    constructor(res: Resource, lang: string) {
        this.lang = lang
        this.res = res
    }

    getT() {
        const curLangRes = this.res[this.lang]
        return curLangRes
        // return (key: string) => {
        //     const arr = key.split(':')
        //     // @ts-ignore 
        //     return arr.length === 2 ? curLangRes[arr[0]][arr[1]] : curLangRes[arr[0]]
        // }
    }



    changeLang(lang: string) {

    }

}

export default I18n