<script setup>
    import WhiteWrapperLayout from '@/layouts/WhiteWrapperLayout.vue'
</script>

<template>
    <WhiteWrapperLayout>
        <template v-slot:content>
            <div>
                <p>
                You are not logged in.
                </p>
                <p>
                <router-link to="/login">
                    Click here if you already have an account and want to login 
                </router-link>
                </p>
            </div>
        </template>
    </WhiteWrapperLayout>
</template>

<style scoped>
</style>