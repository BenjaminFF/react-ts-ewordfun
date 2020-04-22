interface Pos {
    [propName: string]: number
}

export interface EasingFunc {
    (t: number, b: number, c: number, d: number): number
}

class Tween {

    private startPos: Pos | undefined
    private curPos: Pos | undefined
    private endPos!: Pos
    private duration: number = 1000
    private onUpdateCallback!: (curPos: Pos) => void
    private onStopCallback!: (curPos: Pos) => void
    private easingFunc!: EasingFunc
    private requestID!: number
    private startTime: number | undefined
    private delayTime: number | undefined

    constructor(pos?: Pos) {
        if (pos) {
            this.startPos = { ...pos }
            this.curPos = { ...pos }
        }
    }

    from(pos: Pos) {
        this.startPos = { ...pos }
        this.curPos = { ...pos }
        return this
    }

    to(endPos: Pos, duration?: number) {
        this.endPos = { ...endPos }
        this.duration = duration || 1000
        return this
    }

    easing(easingFunc: EasingFunc) {
        this.easingFunc = easingFunc
        return this
    }

    delay(delayTime: number) {
        this.delayTime = delayTime
        return this
    }

    start() {
        if (this.startPos) {
            setTimeout(() => {
                this.requestID = requestAnimationFrame(this.update.bind(this))
            }, this.delayTime)
            return this
        }
    }

    update(curTime: number) {
        if (this.startPos === undefined || this.curPos === undefined) {
            return
        }

        if (this.startTime === undefined) {
            this.startTime = curTime
        }



        if (curTime - this.startTime > this.duration) {
            this.curPos = { ...this.endPos }
            if (this.onUpdateCallback) this.onUpdateCallback(this.curPos)      //执行最后一帧
            if (this.onStopCallback) this.onStopCallback(this.curPos)
            cancelAnimationFrame(this.requestID)
            this.startTime = undefined
            return
        }

        for (let prop in this.endPos) {
            const t = curTime - this.startTime, b = this.startPos[prop], c = this.endPos[prop] - this.startPos[prop], d = this.duration || 1000
            this.curPos[prop] = this.easingFunc(t, b, c, d)
        }

        if (this.onUpdateCallback) this.onUpdateCallback(this.curPos)

        requestAnimationFrame(this.update.bind(this))
    }

    pause() {

    }

    stop() {

    }

    onUpdate(callback: (curPos: Pos) => void) {
        this.onUpdateCallback = callback
        return this
    }

    onStop(callback: (curPos: Pos) => void) {
        this.onStopCallback = callback
        return this
    }
}


const Easing = {
    Linear(t: number, b: number, c: number, d: number): number {
        return c * t / d + b
    },
    Quad: {
        easeIn(t: number, b: number, c: number, d: number): number {
            return c * (t /= d) * t + b
        },
        easeOut(t: number, b: number, c: number, d: number): number {
            return -c * (t /= d) * (t - 2) + b
        },
        easeInOut(t: number, b: number, c: number, d: number): number {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b
            return -c / 2 * ((--t) * (t - 2) - 1) + b
        }
    },
    Cubic: {
        easeIn(t: number, b: number, c: number, d: number): number {
            return c * (t /= d) * t * t + b
        },
        easeOut(t: number, b: number, c: number, d: number): number {
            return c * ((t = t / d - 1) * t * t + 1) + b
        },
        easeInOut(t: number, b: number, c: number, d: number): number {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b
            return c / 2 * ((t -= 2) * t * t + 2) + b
        }
    },
}

const TWEEN = {
    Tween,
    Easing
}

export default TWEEN