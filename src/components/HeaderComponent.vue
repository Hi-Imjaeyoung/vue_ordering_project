<template>
     <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
        <div class="navbar-collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul class="navbar-nav mr-auto" v-if="userRoll==='ADMIN'">
                <li class="nav-item" >
                    <a class="nav-link" href="/members">회원관리</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/items/manage">상품관리</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/orders">주문관리</a>
                </li>
            </ul>
        </div>
        <div class="mx-auto order-0">
            <a class="navbar-brand mx-auto" href="/">
                <h2>\._./</h2>
            </a>
        </div>
        <div class="navbar-collapse w-100 order-3 dual-collapse2">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item" >
                    <a class="nav-link" href="/items">ItemList</a>
                </li>
                <li class="nav-item" v-if="isLogin">
                    <!-- getter 함수명을 명시 -->
                    <a class="nav-link" href="/ordercart">MyCart ({{ getTotalQuantity }})</a>
                </li>
                <li class="nav-item" v-if="isLogin">
                    <a class="nav-link" href="/mypage">MyPage</a>
                </li>
                <li class="nav-item" v-if="!isLogin">
                    <a class="nav-link" href="/member/create">Member Create</a>
                </li>
                <li class="nav-item" v-if="!isLogin">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li class="nav-item" v-if="isLogin">
                    <a class="nav-link" href="#" @click="doLogout">Logout</a>
                </li>
            </ul>
        </div>
    </nav>

</template>

<script>
// store에 getters 함수를 사용하기 위한 import
import {mapGetters} from 'vuex'
export default {
    
    computed:{
        ...mapGetters(['getTotalQuantity'])
        // ...연산자를 통해 getter를 통해 반환되는 객체의 속성들을 현재 객체 내에 풀어서(spread) 넣기 위함 
        // 아래 함수를 가죠오는 것
        //  아래함수를 현재 컴포넌트로 가져오는것
        // getTotalQuantity: function(){
        //     return this.$store.getTotalQuantity;
        // }
    },
   data(){
        return{
            isLogin: false,
            userRoll: null
        }
   },
//    created는 함수는 리로딩될 때 한번만 실행.
   created() {
        if(localStorage.getItem("token")){
            this.isLogin = true;
            this.userRoll = localStorage.getItem("role");
        }
   },
   methods: {
        doLogout(){
            // 쿠키 싹 삭제
            localStorage.clear();
            // localStorage.removeItem("token");
            // localStorage.removeItem("role");
            window.location.reload();
        }
   }, 
}
</script>
