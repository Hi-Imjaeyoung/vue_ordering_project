<template>
    <div class="container">
        <div class="page-header  text-center" style="margin-top: 20px">
            <h1>Item Create</h1>
        </div>
        <form @submit.prevent="ItemCreate()">
            <div class="form-group">
                <label>Iteam Name</label>
                <input type="text" v-model="name" class="form-control" >
            </div>
            <div class="form-group">
                <label>Category</label>
                <input type="text" v-model="category" class="form-control" >
            </div>
            <div class="form-group">
                <label>Price</label>
                <input type="number" v-model="price" class="form-control">
            </div>
            <div class="form-group">
                <label>StockQuantity</label>
                <input type="number" v-model="stockQuantity" class="form-control">
            </div>
            <div class="form-group">
                <label>Image</label>
                <!-- @change와 @click의 비교 : 
                    change는 해당 tag의 값이 변할때 함수 실행
                    click은 요소가 클릭될때마다 힘수 실행 
                -->
                <input type="file" class="form-control" accept="image/*" @change="fileUpload">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary mt-3">Register</button>
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
            price : null,
            category : "",
            stockQuantity : null,
            itemImage : null,
        }
    },
    methods:{
        fileUpload(event){
            // event.target : 이벤트가 발생한 DOM 요소를 가리키는 객체
            this.itemImage = event.target.files[0];
        },
        async ItemCreate(){
            try {
                // multipart-formdata (file 이 존재)
                // multipartformdata 형식의 경우 new formdata를 통해 객체를 생성한다. 
                const registerData = new FormData();
                registerData.append("name",this.name);
                registerData.append("category",this.category);
                registerData.append("price",this.price);
                registerData.append("stockQuantity",this.stockQuantity);
                registerData.append("itemImage",this.itemImage);
                const token = localStorage.getItem('token');
                const headers = token ? {Authorization: `Bearer ${token}`,'Content-Type': 'multipart/form-data'}:{};  
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/item/create`,registerData,{headers});
                alert("item create success");
                window.location.href="/items";
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