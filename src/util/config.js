const NODE_ENV = process.env.NODE_ENV
let localPrefix

switch (NODE_ENV) {
  case 'dev':
    localPrefix = 'mjwx_'
    break
  case 'pro':
    localPrefix = 'mjwx_'
    break
  case 'taian':
    localPrefix = 'mjtaianwx_'
    break
  default:
    break
}

export {
  localPrefix
}
