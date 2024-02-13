<template>
    <div class="container">
        <div class="page-header  text-center" style="margin-top: 20px">
            <h1>Member Create</h1>
        </div>
        <form @submit.prevent="memberCreate">
            <div class="form-group">
                <label>이름</label>
                <input type="text" v-model="name" class="form-control" >
            </div>
            <div class="form-group">
                <label>email</label>
                <input type="text" v-model="email" class="form-control">
            </div>
            <div class="form-group">
                <label>password</label>
                <input type="password" v-model="password" class="form-control">
            </div>
            <div class="form-group">
                <label>city</label>
                <input type="text" v-model="city" class="form-control">
            </div>
            <div class="form-group">
                <label>street</label>
                <input type="text" v-model="street" class="form-control">
            </div>
            <div class="form-group">
                <label>zipcode</label>
                <input type="text" v-model="zipcode" class="form-control">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary mt-3">가입완료</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            name : "",
            email : "",
            password : "",
            city:"",
            street:"",
            zipcode:""
        }
    },
    methods:{
        async memberCreate(){
            try {
                const createData = {name:this.name,email:this.email,password:this.password,city:this.city,street:this.street,zipcode:this.zipcode};
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/create`,createData);
                // window.location.href="/";
                this.$router.push({name : 'DoLogin'});
            } catch (error) {
                if(error.response.data.error_message){
                    const error_message = error.response.data.error_message;
                    alert(error_message);
                }else{
                    console.log(error);
                    alert("Create Faild");
                }    
            }   
        }
    }
}
</script>

<style lang="scss" scoped>

</style>