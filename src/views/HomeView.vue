<script setup> 
    import {useStore} from 'vuex'
    import {computed} from 'vue'
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import NumberOfAlbums from '@/components/NumberOfAlbums.vue'
    import LoginLink from '@/components/LoginLink.vue'
    import CreateAccLink from '@/components/CreateAccLink.vue'
    import WhiteWrapperLayout from '@/layouts/WhiteWrapperLayout.vue'

    const store = useStore()
    const userIsLogged = computed(() => store.getters['authModule/userIsLogged'])
    const userEmail = computed(() => store.state.authModule.userData.email)
</script>

<template>
    <ViewLayout>
        <template v-slot:header-content>
            Home
        </template>
        
        <template v-slot:main-content>
            
            <WhiteWrapperLayout v-if="userIsLogged">
                <template v-slot:content>
                    Hi! you are logged in with: 
                    <span class="user-email">
                        {{ userEmail }}
                    </span>
                </template>
            </WhiteWrapperLayout>
            
            <NumberOfAlbums />

            <div v-if="!userIsLogged">
                <LoginLink />
                <CreateAccLink />
            </div>

        </template>
    </ViewLayout>
</template>

<style scoped>
.user-email{
    margin-left:8px;
    color:blue;
}
</style>