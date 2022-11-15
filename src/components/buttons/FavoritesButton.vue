<script setup lang="ts">
    import {useRoute} from 'vue-router'
    import {computed} from 'vue'
    import NavButtonLayout from '@/layouts/NavButtonLayout.vue'

    const currentPath = computed(() => useRoute().path)

    function pathIsFavorites(){
        return currentPath.value === '/favorites' ? true : false
    }
</script>

<template>
    <router-link to="/favorites">
        <NavButtonLayout :fill="pathIsFavorites()" iconName="favorite" />
    </router-link>
</template>

<style scoped>
a{
    text-decoration: none;
}
</style>