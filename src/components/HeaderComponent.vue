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
                    <a class="nav-link" href="/ordercart">MyCart</a>
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
export default {
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
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.reload();
        }
   }, 
}
</script>
