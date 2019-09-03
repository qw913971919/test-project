<template>
		<div class="mui-content">
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner in" v-for="(item,i) in datalist" :key="item.id">
						<mt-switch v-model="$store.getters.getBoolean[item.id]" @change="selectedChanged(item.id,$store.getters.getBoolean[item.id])"></mt-switch>
                        <img :src="item.thumb_path" style="height:60px;width:60px;" />
                        <div class="content">
                            <h3>{{item.title}}</h3>
                            <div class="info">
                                <span class="price">￥{{item.sell_price}}</span>
                                <carinput :initcount="$store.getters.getGoodsCount[item.id]" :idg="item.id"></carinput>
                                <a href="javascript:;" @click="remove(i,item.id)">删除</a>
                            </div>
                        </div>
					</div>
				</div>
			</div>
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner shopping">
					    <div>
                            <p>统计不含运费</p>
                            <p>已勾选商品<span>{{$store.getters.coputer.count}}</span>件，总价<span>￥{{$store.getters.coputer.money}}</span></p>
                        </div>
                        <mt-button size="small" type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
		</div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'//当js中单独使用mui时，需在那个模块下导入mui的js
export default {
    data(){
        return {
            number:0,
            arr:[],
            datalist:[]
        }
    },
    components:{
        carinput:()=>import('./carinput.vue')
    },
    methods:{
        selectedChanged(id,value){  
            this.$store.commit('updateGoodsSelected',{id:id,value:value})
            console.log({id:id,value:value})
        },
        remove(i,b){
            this.datalist.splice(i,1)//从索引为i的地方开始删除，删除一个
            this.$store.commit('remove',b)
        },
        getvalue(){
            
        },
        countChanged(){//使用@change监听文本框的变化，通过官网提供的方式获取到现在的值
   
        },
        getlist(){
            this.$store.state.car.forEach(item => {
                this.arr.push(item.id)
            })
            this.$ajax.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/'+this.arr.join(',')).then(res=>{
                if(res.data.status===0){
                    this.datalist=res.data.message
                    console.log(this.datalist)
                }
                
            })
        }
    },
    mounted(){
        mui(".mui-numbox").numbox()

    },
    created(){
        this.getlist()
    }
}
</script>
<style lang="scss" scoped>
.shopping{
    display: flex;
    align-items:center;
    justify-content:space-between;
}
span{
    color: red;
    font-weight: 900;
}
.mui-content{
    padding-top:1px;
    background-color:white
}
.in{
    display: flex;
    align-items:center;
    img{
      
    }
    .content{
        h3{
            font-size: 13px;
        }
        .info{
            display: flex;
            align-items:center;
            a{
                font-size:10px;
            }
            .price{
                display: block;
                color:red;
                min-width: 50px;
                font-weight: bold;
            }
            .mui-numbox{
                margin:0px 5px;
            }
        }
    }
}
</style>