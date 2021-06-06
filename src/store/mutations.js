import Vue from 'vue'
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS, RECEIVE_USERINFO, RESET_USERINFO,
    RECEIVE_GOODS, RECEIVE_RATING, RECEIVE_INFO,
    DECREASE_FoodCount, Increase_FoodCount, RECEIVE_SEARCHSHOPS
    } from './mutation-types'

export default {
    [RECEIVE_ADDRESS](state, { address }) {
        state.address = address
    },
    [RECEIVE_CATEGORYS](state, { categorys }) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },
    [RECEIVE_USERINFO](state, { userInfo }) {
        state.userInfo = userInfo
    },
    [RESET_USERINFO](state) {
        state.userInfo = {}
    },
    [RECEIVE_GOODS](state, {goods}) {
        state.goods = goods
    },
    [RECEIVE_RATING](state, {rating}) {
        state.rating = rating
    },
    [RECEIVE_INFO](state, {info}) {
        state.info = info
    },
    [Increase_FoodCount](state, {food}){
        if(food.count) {
            food.count++
        }
        else {
            Vue.set(food, 'count', 1); //第一次创建count属性时，添加到cardFoods中
            state.cardFoods.push(food)
        }
    },
    [DECREASE_FoodCount](state, {food}){
        if(food.count){
            food.count--
            if(food.count === 0){
                state.cardFoods.splice(state.cardFoods.indexOf(food), 1)
            }
        }
    },
    CLEARCART(state){
        state.cardFoods.forEach(e => Vue.delete(e, 'count'))
        state.cardFoods = []
    },
    [RECEIVE_SEARCHSHOPS](state,{searchShops}){
        state.searchShops = searchShops
    }
}