<script setup> 
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import NumberOfAlbums from '@/components/NumberOfAlbums.vue'
</script>

<template>
    <ViewLayout>
        <template v-slot:header-content>
            Home
        </template>
        
        <template v-slot:main-content>
            <NumberOfAlbums />
        </template>
    </ViewLayout>
</template>