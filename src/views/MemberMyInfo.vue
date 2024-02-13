<template>
    <div class="container">
    <div class="page-header text-center" style="margin-top: 20px"><h1>My Info</h1></div>
    <table class="table">
            <tr>
                <td>name</td><td>{{ member.name }}</td>
            </tr>
            <tr>
                <td>email</td><td>{{ member.email }}</td>
            </tr>
            <tr>
                <td>city</td><td>{{ member.city }}</td>
            </tr>
            <tr>
                <td>street</td><td>{{ member.street }}</td>
            </tr>
            <tr>
                <td>zipcode</td><td>{{ member.zipcode }}</td>
            </tr>
    </table>
    </div>
    <OrderListComponent
    :isAdmin="false"
    :apiUrl ="`/member/myoders`"
    />
</template>

<script>
import axios from 'axios';
import OrderListComponent from '@/components/OrderListComponent.vue';
export default {
   components:{
        OrderListComponent
   },
   data(){
        return{
            member:{},
        }
    },
    created(){
        this.fetchMember();
    },
    methods:{
        async fetchMember(){
            try{
            const token = localStorage.getItem('token');
            const headers = token ? {Authorization: `Bearer ${token}`}:{};
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/myInfo`,{headers});
            this.member = response.data;
            console.log(this.member);
            }catch(error){
                console.log(error);
            }
        }
    }
}
</script>