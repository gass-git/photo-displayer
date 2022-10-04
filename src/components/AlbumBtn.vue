<script setup>
    import { useStore } from 'vuex'
    import { defineProps } from 'vue'

    const props = defineProps({ id: Number, album: String })
    const store = useStore()

    function handleClick(){
        store.dispatch('albums/changeId', props.id)
        store.dispatch('photos/fetchByAlbum', props.id)
    }
</script>

<template>
    <button v-on:click="handleClick">
        {{ props.album }}
    </button>
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