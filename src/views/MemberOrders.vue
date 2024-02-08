<template>
    <OrderListComponent
    :isAdmin="true"
    :apiUrl ="`http://localhost:8080/member/${id}/orders`"
    />
</template>

<script>
import OrderListComponent from '@/components/OrderListComponent.vue';
export default {
    props:['id'],
    components:{
        OrderListComponent
   }
}
</script>