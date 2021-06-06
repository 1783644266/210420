export default{
    totalCount(state){
        return state.cardFoods.reduce((a, b) => a+= b.count ,0)
    },
    totalPrice(state){
        return state.cardFoods.reduce((a, b) => a+= b.count*b.price ,0)
    },
    notGood(state){
        return state.rating.reduce((p, a) => p+=a.rateType,0)
    }
}