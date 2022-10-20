<script setup>
    import ViewLayout from '@/layouts/ViewLayout.vue'
</script>

<template>
    <ViewLayout>
        <template v-slot:header-content>
            favorites
        </template>
        <template v-slot:main-content>
            favorite images go here    
        </template>
    </ViewLayout>
</template>

<style scoped>
</style>