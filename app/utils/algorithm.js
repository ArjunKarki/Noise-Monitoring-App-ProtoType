
export const GroupedSort = (d) => {
    let d1 = [0, 1, 2]
    let d2 = [3, 4, 5]
    let dif = 10000000
    return algorithm(d, d1, d2, dif, [0, 1, 2])
} 

const someSame = (a, b, c) => a===b || a===c || b===c;
const algorithm = (d, d1, d2, dif, p) => { 
    const i1 = p[0] !== undefined ? p[0] : 0
    const i2 = p[1] !== undefined ? p[1] : 1
    const i3 = p[2] !== undefined ? p[2] : 2

    if (!someSame(i1, i2, i3)) {
        const dd1 = [i1, i2, i3]
        const dd2 = []

        for (let i = 0; i < d.length; i++) {
            if (i !== i1 && i !== i2 && i !== i3) {
                dd2.push(i)
            }
        }
        const diff = Math.abs(
            (d[dd1[0]] + d[dd1[1]] + d[dd1[2]]) -
            (d[dd2[0]] + d[dd2[1]] + d[dd2[2]])
        )
        if (diff < dif) {
            d1 = [...dd1]
            d2 = [...dd2]
            dif = diff
        }
    }
    if (i3 < 5) {
        p[2] = i3 + 1
        return algorithm(d, d1, d2, dif, p)
    } 
    else if (i2 < 5) {
        p[2]=0
        p[1] = i2 + 1
        return algorithm(d, d1, d2, dif, p)
    }
    else if (i1 < 2) {
        p[0] = i1 + 1
        p[1]=0
        p[2]=0
        return algorithm(d, d1, d2, dif, p)
    } else { 
        d1.sort((l, r)=>d[r]-d[l])
        d2.sort((l, r)=>d[r]-d[l])
        return d[d2[0]] > d[d1[0]] ?  d2.concat(d1) : d1.concat(d2)
    }
}