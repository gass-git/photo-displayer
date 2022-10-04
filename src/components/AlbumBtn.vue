<script setup>
    import { useStore } from 'vuex'
    import { defineProps } from 'vue'

    const props = defineProps({ id: Number, album: String })
    const store = useStore()
</script>

<template>
    <button v-on:click="store.dispatch('photos/changeId', props.id)">
        {{ props.album }}
    </button>
</template>

<style scoped>
    button{
        margin:5px;
        width:calc(100% - 10px);
        height:40px;
        cursor:pointer;
        font-size:14px;
    }
</style>