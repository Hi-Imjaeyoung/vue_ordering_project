<template>
    <div class="container">
        <div class="page-header  text-center" style="margin-top: 20px">
            <h1>로그인</h1>
        </div>
        <!-- submit은 기본적으로 form 제출시 브라우저가 새로고침하므로 해당동작을 막기위해 prevent를 사용 -->
        <form @submit.prevent="doLogin">
            <div class="form-group">
                <label for="email">email</label>
                <input type="text"  v-model="email" class="form-control">
            </div>
            <div class="form-group">
                <label for="password">password :</label>
                <input type="password" v-model="password" class="form-control">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary mt-3">로그인</button>
            </div>
         </form>

    </div>
</template>

<script>
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export default {
    data(){
        return{
            email : "",
            password : "",
            url:"",
        }
    },
    methods:{
        async doLogin(){
            // 두가지 예외 가능성
            // 1. 200번대 상태값이 들어오면서 token이 비어있는 경우
            // 2. 200번대 상태값이 아닌경우 (비정상)
            try {
                const loginData = {email:this.email,password:this.password};
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/doLogin`,loginData);
                const token = response.data.result.token;
                if(token){
                    const decoded = jwtDecode(token);
                    localStorage.setItem("role",decoded.role)
                    localStorage.setItem("token",token);
                    // router함수를 통한 화면 전환은 reload를 실행 시키지 않으므로 created함수 호출이 되지 않음.
                    // this.$router.push("/");
                    window.location.href="/";
                }else{
                    console.log("200 ok but not exist token");
                    alert("login Faild");
                }
            } catch (error) {
                if(error.response.data.error_message){
                    const error_message = error.response?.data.error_message;
                    alert(error_message);
                }else{
                    console.log(error);
                    alert("login Faild");
                }
                
                
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>