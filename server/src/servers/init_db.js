import Id from '../model/id.js'

export default async () => {
  // 初始化时 创建id表
  let obj_user = await Id.findOne({type: 'userId'})
  if (obj_user) await Id.update({_id: obj_user._id}, {value: obj_user.value + 1}, {multi: false}, () => {})
  else await Id.create({type: 'userId'})

  // 初始化 创建post表
  let obj_post = await Id.findOne({type: 'postId'})
  if (obj_post) await Id.update({_id: obj_post._id}, {value: obj_post.value + 1}, {multi: false}, () => {})
  else await Id.create({type: 'postId'})

  // 初始化 创建message表
  let obj_message = await Id.findOne({type: 'messageId'})
  if (obj_message) Id.update({_id: obj_message._id}, {value: obj_message.value + 1}, {multi: false}, () => {})
  else Id.create({type: 'messageId'})

  // 初始化 创建image表
  let obj_image = await Id.findOne({type: 'imagesId'})
  if (obj_image) await Id.update({_id: obj_image._id}, {value: obj_image.value + 1}, {multi: false}, () => {})
  else await Id.create({type: 'imagesId'})
}
