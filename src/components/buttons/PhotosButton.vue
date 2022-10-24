<script setup>
    import {useRoute} from 'vue-router'
    import {computed} from 'vue'
    import NavButtonLayout from '@/layouts/NavButtonLayout.vue'

    const currentPath = computed(() => useRoute().path)

    function pathIsPhotos(){
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