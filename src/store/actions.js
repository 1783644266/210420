import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS, RECEIVE_USERINFO, RESET_USERINFO,
    RECEIVE_GOODS, RECEIVE_RATING, RECEIVE_INFO,
    DECREASE_FoodCount, Increase_FoodCount, RECEIVE_SEARCHSHOPS
    } from './mutation-types'
import {reqAddress, reqCategorys, reqShops, reqUser,
    reqLogout, reqGoods, reqRating, reqInfo, reqSearchShop} from '../api'

export default{
  async  getAddress({commit, state}){
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        if(result.code === 0){
            const address = result.data
            commit(RECEIVE_ADDRESS,{address})
        }
    },
  async  getCategorys({commit, state}){
        const result = await reqCategorys()
        if(result.code === 0){
            const categorys = result.data
            commit(RECEIVE_CATEGORYS,{categorys})
        }
    },
  async  getShops({commit, state}){
        const {latitude, longitude} = state      
        const result = await reqShops(latitude, longitude)
        if(result.code === 0){
            const shops = result.data
            commit(RECEIVE_SHOPS,{shops})
        }
    },
    // 用户登陆
    recordUserInfo({commit}, userInfo){
        commit(RECEIVE_USERINFO,{userInfo})
    },
    // 查询用户之前是否有登陆(有效期：1天)
  async getUserInfo({commit}){
        const result = await reqUser()
        if(result.code == 0){
        const userInfo = result.data
            commit(RECEIVE_USERINFO,{userInfo})
        }
  },
  //退出登陆
  async logout({commit}){
    const result = await reqLogout()
    if(result.code == 0){
        commit(RESET_USERINFO)
    }
  },
  async getShopGoods({commit}, callback){
        let result = await reqGoods()
        if(result.code == 0){
            let goods = result.data
            commit(RECEIVE_GOODS,{goods})
            callback && callback()
        }
  },
  async getShopRating({commit},cb){
        let result = await reqRating()
        if(result.code == 0){
            let rating = result.data
            commit(RECEIVE_RATING,{rating})
            cb && cb()
        }
        
  },
  async getShopInfo({commit}){
        let result = await reqInfo()
        if(result.code == 0){
            let info = result.data
            commit(RECEIVE_INFO,{info})
        }
  },
  upDateFoodCount({commit},{isAdd, food}){
    if(isAdd){
        commit(Increase_FoodCount,{food})
    }
    else{
        commit(DECREASE_FoodCount,{food})
    }
  },
  clearCart({commit}){
    commit('CLEARCART')
  },
  async searchShops({commit, state}, keyword){
    const geohash = state.latitude + ',' + state.longitude
    let result = await reqSearchShop(geohash, keyword)
    if(result.code == 0){
        const searchShops = result.data
        commit(RECEIVE_SEARCHSHOPS, {searchShops})
    }
  }
}