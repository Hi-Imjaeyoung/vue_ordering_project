<template>
    <ItemListComponent
    :isAdmin="true"
    pageTitle = "ItemManage"
    />
</template>

<script>
import ItemListComponent from '@/components/ItemListComponent.vue';
export default {
    props:['isAdmin','pageTitle'],
    components:{
        ItemListComponent
   }
}
</script>