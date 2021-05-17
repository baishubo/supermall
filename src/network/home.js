import {request,hj0819} from './request'

export function getHomeMultidata(){
  return request({
    url: '/home/multidata.json',
    method: 'get'
  })  
}
export function getHomeGoods(page,sortType){
  return hj0819({
    url: '/api/Home/getHomeShowGoods',
    method: 'get',
    params:{
      page,
      sortType
    }
  })  
}
