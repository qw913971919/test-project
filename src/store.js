import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    car:JSON.parse(localStorage.getItem('car'))||[]//加载localstorage中的json
  },
  mutations: {//负责处理数据
    updateGoodsSelected(state,date){
      state.car.some(item=>{
        if(item.id==date.id){
          item.selected=date.value//先修改本地的car，然后将本地的car覆盖缓存的
        }//这个方法需要更新localstorage中的数据
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    addcar(state,data){
      var flag=false
      state.car.some(item => {
        console.log(state.car)
        if(item.id==data.id){
          item.count = item.count+parseInt(data.count)
          flag=true
          return true
        }
      })
      if(!flag){
        state.car.push(data)
      }
      localStorage.setItem('car',JSON.stringify(state.car))//向本地缓存中更新数据
    },
    updateGoodsInfo(state,date){
      state.car.some(item=>{
        if(item.id==date.id){
          item.count=parseInt(date.count)
          return true
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    remove(state,id){
      state.car.forEach((item,i)=>{
        if(item.id==id){
          state.car.splice(i,id)
          return true
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  actions: {

  },
  getters:{//负责返回变化数据,一旦外部需要数据返回，重新求值return一个返回值，外部直接调用，即可获取这个返回值
    coputer(state){
      var o={
        count:0,
        money:0,
      }
      state.car.forEach(item=>{
        if(item.selected==true){
          o.count+=parseInt(item.count)
          o.money+=parseInt(item.count)*parseInt(item.price)
        }
      })
      return o
    },
    notest:function(state){
      var c=0;
      state.car.forEach(item => {
        c=parseInt(c)+parseInt(item.count)
      });
      return c//需要一个return作为返回值
    },
    getGoodsCount(state){
      var o={}
      state.car.forEach(item=>{
        o[item.id]=item.count//遍历购物车中的数据，花括号在对象后的意思是，o这个对象中名为item.id的属性，它的值为item.count
      })
      return o
    },
    getBoolean(state){
      var o={}  //在循环外部定义一个空对象
      state.car.forEach(item=>{//循环所有数据
          o[item.id]=item.selected//将需要的属性以键值对的方式，添加到o中id：需要的属性
      })
      return o //这里的o大概是这样的格式{88:ture,89:ture}
    }
  }
})
