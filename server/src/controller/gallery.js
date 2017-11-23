
import Gallery from '../model/image.js';

export const galleryFunc = async (req, res) => {
  try {
    let result = await Gallery.find({status: true});
    res.send({code: 200, message: '获取图库数据成功', data: {list: result}});
  } catch (err) {
    res.send({code: 300, message: '获取图库数据失败', data: err});
  }
};
export const galleryDeleteFunc = async (req, res) => {
  let id = req.body.id;
  try {
    let result = await Gallery.update({id: id}, {status: false}, {multi: false}, () => {});
    console.log('result', result);
    res.send({code: 200, message: '删除图片成功', data: {}});
  } catch (err) {
    res.send({code: 300, message: '删除图片失败', data: err});
  }
  
};

