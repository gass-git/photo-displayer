<script setup lang="ts">
    import WhiteWrapperLayout from '@/layouts/WhiteWrapperLayout.vue'
    import {computed} from 'vue'
    import {useStore} from 'vuex'

    const 
        store = useStore(),
        userData = computed(() => store.state.user);
</script>

<template>
    <WhiteWrapperLayout>
        <template v-slot:content>
            <span class="username">
                Hello <span class="color-blue">{{userData.information.username}}</span>
            </span>
            <span>
                , welcome to your Dashboard !
            </span>
        </template>
    </WhiteWrapperLayout>
</template>

<style scoped>
.username{
    text-transform: capitalize;
}
.color-blue{
    color:blue;
}
</style>