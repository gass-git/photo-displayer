<script setup>
    import {ref, watchEffect, defineProps} from 'vue'
    import {useRoute} from 'vue-router'
    import router from '@/router/index.js'

    const props = defineProps({option: String})
</script>

<template>
    <section v-if="props.option === 'profile'" class="dashboard-nav-wrapper">
        <div @click="router.push('/dashboard')" class="selected">profile</div>
        <div @click="router.push('/dashboard/settings')" class="non-selected">settings</div>
    </section>

    <section v-if="props.option === 'settings'" class="dashboard-nav-wrapper">
        <div @click="router.push('/dashboard')" class="non-selected">profile</div>
        <div @click="router.push('/dashboard/settings')" class="selected">settings</div>
    </section>
</template>

<style>
.dashboard-nav-wrapper{
    display:flex;
}
.dashboard-nav-wrapper > div{
    display:grid;
    text-transform: capitalize;
    padding:15px 20px 15px 20px;
    min-width: 100px;
    place-items:center;
    border-radius:10px;
    font-size:18px;
    margin:0 10px 20px 0;
}
.non-selected:hover{
    background-color: rgb(189, 224, 255);
    cursor:pointer;
}
.selected{
    background:blue;
    color:white;
}
</style>