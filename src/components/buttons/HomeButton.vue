<script setup>
    import {useRoute} from 'vue-router'
    import {computed} from 'vue'
    import NavButtonLayout from '@/layouts/NavButtonLayout.vue'

    const currentPath = computed(() => useRoute().path)

    function pathIsHome(){
        return (currentPath.value === '/') || (currentPath.value === '/home') ? true : false
    }
</script>

<template>
    <router-link to="/">
        <NavButtonLayout :fill="pathIsHome()" iconName="home" />
    </router-link>
</template>

<style scoped>
a{
    text-decoration: none;
}
</style>