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
    const displayName = computed(() => store.state.authModule.userData.displayName)
    const userEmail = computed(() => store.state.authModule.userData.email)
    const favoritePhotosID = computed(() => store.state.photos.favorites)
</script>

<template>
    <ViewLayout>
        <template v-slot:header-content>
            Home
        </template>
        
        <template v-slot:main-content>
            
            <section v-if="userIsLogged">
                <WhiteWrapperLayout>
                    <template v-slot:content>
                        Hello <span v-if="displayName">{{displayName}}</span> 
                        , you are logged in with: 
                        <span class="user-email">
                            {{ userEmail }}
                        </span>
                    </template>
                </WhiteWrapperLayout>

                <WhiteWrapperLayout>
                    <template v-slot:content>
                        Your favorite photos (ids)
                        <div class="blue-box" v-for="id in favoritePhotosID" :key="id">
                            {{id}}
                        </div>
                    </template>
                </WhiteWrapperLayout>

            </section>
            
            
            <NumberOfAlbums />

            <div v-if="!userIsLogged">
                <LoginLink />
                <CreateAccLink />
            </div>

        </template>
    </ViewLayout>
</template>

<style scoped>
.blue-box{
    margin-left:10px;
    padding:3px 7px 3px 7px;
    background:blue;
    color:white;
    border-radius:5px;
    font-size:15px;
}
span{
    margin:0 0 0 5px ;
    color:blue;
}
</style>