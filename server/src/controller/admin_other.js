
import {china} from '../json/city.json';

export const getCityDataFunc = async (req, res) => {
  res.send({code: 200, message: '获取城市数据成功', data: china});
};