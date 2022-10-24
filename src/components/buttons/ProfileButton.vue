<script setup>
    import {useRoute} from 'vue-router'
    import {computed} from 'vue'
    import NavButtonLayout from '@/layouts/NavButtonLayout.vue';

    const currentPath = computed(() => useRoute().path)

    function pathIsProfile(){
        return currentPath.value === '/profile' ? true : false
    }
</script>

<template>
    <router-link to="/profile">
        <NavButtonLayout :fill="pathIsProfile()" iconName="face" />
    </router-link>
</template>

<style scoped>
a{
    text-decoration: none;
}
</style>