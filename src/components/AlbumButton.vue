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
        width:auto;
        padding:10px;
        margin-bottom:12px;
        cursor:pointer;
        font-size:16px;
        border-radius:5px;
        background: white;
        text-decoration: none;
        text-transform: capitalize;
        color:#525252;
    }
    a:hover{
        background:#5F9DF7;
        color:white;
    }
</style>