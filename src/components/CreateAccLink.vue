<script setup>
    import WhiteWrapperLayout from '@/layouts/WhiteWrapperLayout.vue'
</script>

<template>
    <WhiteWrapperLayout>
        <template v-slot:content>
            <div>
                If you don't have an account, 
                <router-link to="/create-account">you can create one here</router-link>.
            </div>
        </template>
    </WhiteWrapperLayout>
</template>

<style scoped>
</style>