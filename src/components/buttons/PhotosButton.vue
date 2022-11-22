<script setup lang="ts">
    import {useRoute} from 'vue-router'
    import {computed} from 'vue'
    import NavButtonLayout from '@/layouts/NavButtonLayout.vue'

    const 
        route = useRoute(),
        currentPath = computed(() => route.path);

    function pathIsPhotos():boolean{
        return currentPath.value.includes('/photo') ? true : false
    }
</script>

<template>
    <router-link to="/photos/1">
        <NavButtonLayout :fill="pathIsPhotos()" iconName="photo_library" />
    </router-link>
</template>

<style scoped>
a{
    text-decoration: none;
}
</style>