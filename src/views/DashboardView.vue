<script setup>
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import WhiteWrapperLayout from '@/layouts/WhiteWrapperLayout.vue'
</script>

<template>
    <ViewLayout>
        <template v-slot:header-content>
            Dashboard
        </template>

        <template v-slot:main-content>
            <WhiteWrapperLayout>
                <template v-slot:content>
                    
                </template>
            </WhiteWrapperLayout>
        </template>
    </ViewLayout>
    
</template>

<style scoped>

</style>