<script setup>
    import {defineProps} from 'vue'

    const props = defineProps({name: String})
</script>

<template>
    <div id="sidebar-subtitle">
        {{props.name}}
    </div>
</template>

<style scoped>
    #sidebar-subtitle{
        display:grid;
        place-items:center;
        border-top:1px solid grey;
        border-bottom:1px solid grey;
        padding:10px 5px 10px 5px;
        margin-bottom:20px;
    }
</style>