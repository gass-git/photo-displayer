<script setup lang="ts">
    import {computed, watchEffect, ref} from 'vue'
    import {useRoute} from 'vue-router'
    import {useStore} from 'vuex'
    import NumberOfAlbums from '@/components/NumberOfAlbums.vue';
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import UserInfo from '@/components/UserInfo.vue'
    import UserGreeting from '@/components/UserGreeting.vue'
    import DashboardNav from '@/components/DashboardNav.vue'
    import router from '@/router/index'

    const 
        [route, store, navOption] = [useRoute(), useStore(), ref('')],
        authIsReady = computed<boolean>(() => store.state.auth.isReady),
        userIsLogged = computed<boolean>(() => store.getters['auth/userIsLogged']);

    watchEffect(() => {
        if(userIsLogged.value)
            switcher(route.params.option)
        else
            router.go(-1)
    })

    function switcher(option:string | string[]):void{
        switch(option){
            case 'settings': 
                navOption.value = 'settings'
                break
            case undefined: 
                navOption.value = 'profile'
                break
            default: 
                navOption.value = 'profile'
        }
    }
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