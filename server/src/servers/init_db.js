import Id from '../model/id.js'

export default () => {
  // 初始化时 创建id表
  let obj = await Id.findOne({type: 'userId'})
  if (obj) await Id.update({_id: obj._id}, {value: obj.value + 1}, {multi: false}, () => {})
  else await Id.create({type: 'userId'})

  // 初始化 创建post表
  let obj = await Id.findOne({type: 'postId'})
  if (obj) await Id.update({_id: obj._id}, {value: obj.value + 1}, {multi: false}, () => {})
  else await Id.create({type: 'postId'})

  // 初始化 创建message表
  let obj = await Id.findOne({type: 'messageId'})
  if (obj) Id.update({_id: obj._id}, {value: obj.value + 1}, {multi: false}, () => {})
  else Id.create({type: 'messageId'})

  // 初始化 创建image表
  let obj = await Id.findOne({type: 'imagesId'})
  if (obj) await Id.update({_id: obj._id}, {value: obj.value + 1}, {multi: false}, () => {})
  else await Id.create({type: 'imagesId'})
}
