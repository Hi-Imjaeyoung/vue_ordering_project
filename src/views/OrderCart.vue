<template>
    <div class="container">
        <div class="page-header text-center" style="margin-top: 20px">
            <h1>Cart List</h1>
        </div>
        <div class="d-flex justify-content-between">
            <button class="btn btn-secondary" @click="clearCart">장바구니 비우기</button>
            <button class="btn btn-success" @click="placeOrder">주문하기</button>
        </div>
        <table class="table">
            <thead>
                <th>Id</th>
                <th>Name</th>
                <th>Quantity</th>
            </thead>
            <tbody>
            <!-- itemId : item.id,name :item.name ,count : item.quantity -->
                <tr v-for="item in getCartItems" :key="item.itemId">
                    <td>{{ item.itemId }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.count }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { mapActions } from 'vuex';
import axios from 'axios';
export default {
    computed:{
        ...mapGetters(['getCartItems','getTotalQuantity'])
    },
    methods:{
        ...mapActions([`clearCart`]),
        clearCart(){
            this.$store.dispatch('clearCart')
        },
        async placeOrder(){
            const orderItems = this.getCartItems
                                .map(item=> {
                                    return {itemId : item.itemId, count : item.count}
                                });
            if(this.getTotalQuantity<1){
                alert("0개를 왜 주문합니까");
                return;
            }
            if(confirm(`${this.getTotalQuantity}개 주문 맞지요??`)){
                const token = localStorage.getItem('token');
                const headers = token ? {Authorization: `Bearer ${token}`}:{};  
                try{
                    await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`,orderItems,{headers});
                    alert("주문이 완료되었습니다.");
                    this.$store.dispatch('clearCart');
                }catch(error){
                    alert(error.response.data.error_message);
                    console.log(error);
                } 
            }else{
                console.log("Order Cancele")
                return; 
            }
            
        },
    }
}
</script>