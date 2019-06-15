export default function paramsToGqlInput (params: {[s: string]: string[] | string | number}): string {
  return Object.keys(params).map(e => {
    const x = params[e]
    if (!x || typeof (x) === 'string') {
      return `${e}: "${x || ''}"`
    } else if (Array.isArray(x)) {
      return `${e}: [${x.join(',')}]`
    } else {
      return `${e}: ${x}`
    }
  }).join(', ')
}
