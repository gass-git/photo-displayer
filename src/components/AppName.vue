<script setup lang="ts">
    import {defineProps} from 'vue'

    const props = defineProps({name: String})
</script>

<template>
    <div id="sidebar-header">
        {{props.name}}
    </div>
</template>

<style scoped>
    #sidebar-header{
        text-transform: capitalize;
        height:100px;
        padding:20px 0 0 10px;
        font-size:24px;
        color:var(--light-gray);
    }
</style>