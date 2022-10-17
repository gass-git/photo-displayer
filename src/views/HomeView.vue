<script setup> 
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import NumberOfAlbums from '@/components/NumberOfAlbums.vue'
    import LoginLink from '@/components/LoginLink.vue'
    import CreateAccLink from '@/components/CreateAccLink.vue'
    import {useStore} from 'vuex'
    import WhiteWrapperLayout from '@/layouts/WhiteWrapperLayout.vue'

    const store = useStore()
</script>

<template>
    <ViewLayout>
        <template v-slot:header-content>
            Home
        </template>
        
        <template v-slot:main-content>
            <WhiteWrapperLayout>
            <template v-slot:content>
                Hi! you are logged in with: 
                <span class="user-email">
                    {{ store.state.authModule.userData.email }}
                </span>
            </template>
            </WhiteWrapperLayout>
            
            <NumberOfAlbums />
            <LoginLink />
            <CreateAccLink />
        </template>
    </ViewLayout>
</template>

<style scoped>
.user-email{
    margin-left:8px;
    color:blue;
}
</style>