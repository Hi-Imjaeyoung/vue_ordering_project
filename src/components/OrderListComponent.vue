<template>
    <div class="container">
        <div class="page-header text-center" style="margin-top: 20px">
            <h1>Orders</h1>
        </div>
        <table class="table">
            <thead>
                <th>#</th>
                <th>Email</th>
                <th>Status</th>
                <th v-if="isAdmin === 'true'">Action</th>
            </thead>
            <tbody>
                <template v-for="order in orderList" :key="order.id">
                <!-- 유일한 식별자인 key를 넣어줘야함 -->
                    <tr @click="toggleOrder(order.id)" style="cursor: pointer;">
                        <td>{{ order.id }}</td>
                        <td>{{ order.email }}</td>
                        <td>{{ order.orderStatus }}</td>
                        <td v-if="isAdmin === 'true'"><button v-if="order.orderStatus==='ORDERED'" @click.stop="activeCancle(order.id)">CANCLE</button></td>
                    </tr>
                    <tr v-if="visibleOrder.has(order.id)">
                        <td colspan="4">
                            <table style="margin-left:auto;margin-right:auto;">
                                <th> name </th>
                                <th> count </th>
                            <tr v-for="orderItem in order.orderItems" :key="orderItem.id">
                               <td>{{ orderItem.itemName }}</td>
                               <td>{{ orderItem.count }}</td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props:['isAdmin','apiUrl'],
    data(){
        return{
            orderList:[],
            visibleOrder: new Set(), 
        }
    },
    async created(){
        try{
            const token = localStorage.getItem('token');
            const headers = token ? {Authorization: `Bearer ${token}`}:{};
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}${this.apiUrl}`,{headers});
            this.orderList = response.data;
        }catch(error){
            console.log(error);
        }
    },
    methods: {
      toggleOrder(orderId){
        if(this.visibleOrder.has(orderId)){
            this.visibleOrder.delete(orderId);
        }else{
            this.visibleOrder.add(orderId);
        }
      },
      async activeCancle(orderId){
        if(confirm("정말 취소할거여?")){
            try{
                const token = localStorage.getItem('token');
                const headers = token ? {Authorization: `Bearer ${token}`}:{};
                await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/order/${orderId}/cancel`,{headers});
                const order = this.orderList.find(order => order.id === orderId);
                order.orderStatus = "CANCELED";
                // window.location.reload();
                // window.location.href="/orders";
            }catch(error){
                console.log(error.response);
                alert("주문취소에 실패했습니다");
            }
        }
      } 
    },
}
</script>