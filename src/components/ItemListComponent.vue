<!-- 스크롤 축소했을 때, 스크롤이 사라지는 이슈 -->
<!-- v-modle 데이터가 바인딩 되는 이유 -->
<!-- 스크롤 내리는 경우가 자동으로 요청될 경우 -->
<template>
    <div class="container">
    <div class="page-header text-center" style="margin-top: 20px"><h1>{{pageTitle}}</h1></div>
    <div class="d-flex justify-content-between" style="margin-top: 20px;">
        <form @submit.prevent="search()">
            <select v-model="searchType" style="display: inline-block; width: auto;margin-right: 5px;">
                <option value="default">select</option>
                <option value="name">name</option>
                <option value="category">category</option>
            </select>
            <input v-model="searchValue" type="text"/>
            <button type="submit">Find!</button>
        </form>
        <div v-if="!isAdmin">
            <button @click="addCart" class="btn btn-secondary">Add Cart!</button>
            <button @click="placeOrder" class="btn btn-success">Order!</button>
        </div>
        <div v-if="isAdmin">
            <a href="/item/create">
                <button class="btn btn-success" >Register item</button>
            </a>
        </div>
    </div>
    <table class="table">
        <thead>
        <tr>
            <th v-if="!isAdmin"></th>
            <th>image</th>
            <th>name</th>
            <th>price</th>
            <th>stock quantity</th>
            <th v-if="!isAdmin">quantity</th>
            <th v-if="isAdmin">Action</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="item in itemList" :key="item.id">
                <!-- 체크박스를 선택하면 VALUE 가 TRUE가 담김 -->
                <td v-if="!isAdmin" ><input type="checkbox" v-model="selectedItems[item.id]"/></td>
                <td><img :src="getImage(item.id)" style="height: 100px; width: auto;"></td>
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.stockQuantity }}</td>
                <td v-if="!isAdmin"><input type="number" v-model="item.quantity" style="width: 60px;"/></td>
                <td v-if="isAdmin"><button @click="deleteItem(item.id)" class="btn btn-secondary">remove</button></td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
export default {
    props :['isAdmin', 'pageTitle'],
    data(){
        return{
            itemList : [],
            pageSize : 10,
            currentPage : 0,
            searchType : 'name',
            searchValue : '',
            isLastPage : false,
            isLoading : false,
            selectedItems :{},
        }
    },
    created(){
        this.fetchItems();
    },
    // mounted: window dom(화면이 그려지고 나서 실행) 객체가 생성된 이후에 실행되는 hook 함수
    mounted(){
        // scroll 동작이 발생할 때마다, scrollPagination 함수가 호출된다는 의미
        window.addEventListener('scroll',this.scrollPagination)
    },
    methods:{
        ...mapActions(['addToCart']),
        addCart(){
            if(confirm("add to cart?")){
                console.log(this.itemList);
                console.log(this.selectedItems);
                const orderItems = Object.keys(this.selectedItems)
                                    .filter(key=>this.selectedItems[key]==true)
                                    .map(key=> {
                                        const item =  this.itemList.find(item => item.id == key)
                                        return {itemId : item.id,name :item.name ,count : item.quantity}
                                    });
                if(orderItems.length <1){
                    alert("뭘 담겠다는 거죠?")
                    return;
                }
                // mutataion 직접 호출 방식
                // orderItems.forEach(item => this.$store.commit('addToCart',item)); 
                // actions 호출 방식
                orderItems.forEach(item => this.$store.dispatch('addToCart',item)); 
                this.selectedItems = [];
            }
        },
        // 데이터 들어오는 구조
        // {
        //  1 : true,
        //  2 : false
        // }
        // Object.keys : 위 데이터 구조에서 1,2 와 같은 key값만 추출하는 데이터 구조
        async placeOrder(){
            const orderItems = Object.keys(this.selectedItems)
                                .filter(key=>this.selectedItems[key]==true)
                                .map(key=> {
                                    const item =  this.itemList.find(item => item.id == key)
                                    return {itemId : item.id, count : item.quantity}
                                });
            if(orderItems.length <1){
                alert("뭘 주문 하시겠다는 거죠?")
                return;
            }
            const token = localStorage.getItem('token');
            const headers = token ? {Authorization: `Bearer ${token}`}:{};  
            try{
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`,orderItems,{headers});
                alert("주문이 완료되었습니다.");
                window.location.reload();
            }catch(error){
                alert(error.response.data.error_message);
                console.log(error);
            }
            
        },
        scrollPagination(){
            // innerHeight : 브라우저 창의 내부높이(뷰포트)를 픽셀단위로 변환
            // scrollY : 스크롤을 통해 Y축을 이동한 거리이다. 
            // offsetHeight : 전체 브라우저 창의 높이
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight-200;
            if(nearBottom && !this.isLastPage && !this.isLoading){
                this.currentPage++;
                this.isLoading = true;
                this.fetchItems();
            }
        },
        async fetchItems(){
            this.isLoading = true;
            try{
                const params = {
                    page : this.currentPage,
                    size : this.pageSize,
                }
                if(this.searchType==='name'){
                    params.name = this.searchValue;
                }
                if(this.searchValue === 'categroy'){
                    params.category == this.searchValue;
                }
                console.log(params);
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/items`,{params});
                // ...은 주로 배열을 합치는 용도로 풀어서 사용
                const addItemList = response.data.map(item => ({...item, quantity:1}));
                if(addItemList.length < this.pageSize){
                    this.isLastPage = true;
                }
                this.itemList = [...this.itemList,...addItemList];
                
            }catch(error){
                console.log(error);
            }
            this.isLoading = false;
        },
        getImage(id){
            return `${process.env.VUE_APP_API_BASE_URL}/item/${id}/image`;
        },
        search(){
            this.itemList = [];
            this.selectedItems = [];
            this.currentPage = 0;
            this.isLastPage =false;
            this.fetchItems();
        },
        async deleteItem(id){
            if(confirm("remove?")){
                const token = localStorage.getItem('token');
                const headers = token ? {Authorization: `Bearer ${token}`}:{}; 
                try{
                    await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/item/${id}/delete`,{headers});
                    alert("remove success");
                    window.location.reload();
                }catch(error){
                    alert(error.response.data.error_message);
                    alert("remove fail");
                }
            }
        }
    }
}
</script>
