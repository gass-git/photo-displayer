<script setup lang="ts">
    import {useRoute} from 'vue-router'
    import {computed} from 'vue'
    import NavButtonLayout from '@/layouts/NavButtonLayout.vue'

    const 
        route = useRoute(),
        currentPath = computed<string>(() => route.path);

    function pathIsProfile():boolean{
        return currentPath.value.slice(0,10) === '/dashboard' ? true : false
    }
</script>

<template>
    <router-link to="/dashboard">
        <NavButtonLayout :fill="pathIsProfile()" iconName="face" />
    </router-link>
</template>

<style scoped>
a{
    text-decoration: none;
}
</style>