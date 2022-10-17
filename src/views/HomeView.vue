<script setup> 
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import NumberOfAlbums from '@/components/NumberOfAlbums.vue'
import LoginLink from '@/components/LoginLink.vue';
import CreateAccLink from '@/components/CreateAccLink.vue';
</script>

<template>
    <ViewLayout>
        <template v-slot:header-content>
            Home
        </template>
        
        <template v-slot:main-content>
            <NumberOfAlbums />
            <LoginLink />
            <CreateAccLink />
        </template>
    </ViewLayout>
</template>