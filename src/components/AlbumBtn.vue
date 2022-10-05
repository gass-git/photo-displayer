<script setup>
    import { useStore } from 'vuex'
    import { defineProps } from 'vue'

    const props = defineProps({ albumId: Number, albumTitle: String })
    const store = useStore()

    function handleClick(){
        store.dispatch('albums/updateId', {newId: props.albumId})
        store.dispatch('photos/fetchByAlbum', {albumId: props.albumId})
    }
</script>

<template>
    <button @click="handleClick">{{ props.albumTitle }}</button>
</template>

<style scoped>
    button{
        margin:13px 15px 0px 15px;
        width:calc(100% - 30px);
        height:40px;
        cursor:pointer;
        font-size:14px;
    }
</style>