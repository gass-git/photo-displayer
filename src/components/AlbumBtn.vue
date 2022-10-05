<script setup>
    //import { useStore } from 'vuex'
    import { defineProps } from 'vue'

    const props = defineProps({ albumId: Number, albumTitle: String })
    //const store = useStore()

    /*
    function handleClick(){
        store.dispatch('albums/updateId', {newId: props.albumId})
    }
    */
</script>

<template>
    <router-link v-bind:to="`/photos/${props.albumId}`">
        {{ props.albumTitle }}
    </router-link>
</template>

<style scoped>
    a{
        display:block;
        width:calc(100% - 20px);
        padding:10px;
        cursor:pointer;
        margin:10px;
        font-size:16px;
        border:1px solid black;
        border-radius:5px;
        text-decoration: none;
    }
    a:hover{
        background:rgb(246, 246, 246);
    }
</style>