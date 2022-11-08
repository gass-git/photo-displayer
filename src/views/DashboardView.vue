<script setup>
    import {computed, watchEffect, ref} from 'vue'
    import {useRoute} from 'vue-router'
    import {useStore} from 'vuex'
    import NumberOfAlbums from '@/components/NumberOfAlbums.vue';
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import UserInfo from '@/components/UserInfo.vue'
    import UserGreeting from '@/components/UserGreeting.vue'
    import DashboardNav from '@/components/DashboardNav.vue'

    const 
        [route, store, navOption] = [useRoute(), useStore(), ref('')],
        authIsReady = computed(() => store.getters['auth/userIsLogged']);

    watchEffect(() => {
        switch(route.params.option){
            case 'settings': 
                navOption.value = 'settings'
                break
            case undefined: 
                navOption.value = 'profile'
                break
            default: 
                navOption.value = 'profile'
        }
    })
</script>

<template>
    <ViewLayout v-if="authIsReady">
        <template v-slot:header-content>
            Dashboard
        </template>

        <template v-slot:main-content>
            <DashboardNav :option="navOption" />

            <section v-if="navOption === 'profile'">
                <UserGreeting />
            </section>

            <section v-if="navOption === 'settings'">
                <NumberOfAlbums />
                <UserInfo />
            </section>
        </template>
    </ViewLayout>
</template>