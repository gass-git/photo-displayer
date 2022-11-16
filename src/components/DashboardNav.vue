<script setup lang="ts">
    import {defineProps} from 'vue'
    import router from '@/router/index'

    const props = defineProps({option: String})

    function handleClass(element:string){
        if(element === props.option) return 'selected'
        else return 'non-selected'
    }
</script>

<template>
    <section class="dashboard-nav-wrapper">
        <div @click="router.push('/dashboard')" :class="handleClass('profile')">profile</div>
        <div @click="router.push('/dashboard/settings')" :class="handleClass('settings')">settings</div>
    </section>
</template>

<style scoped>
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