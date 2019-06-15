declare module "object-dig" {
  function dig(name: {[s: string]: any}, ...keys: string[]): {[s: string]: string}
  export = dig
}
