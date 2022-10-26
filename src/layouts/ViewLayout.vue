<script setup>
    import {computed} from 'vue'
    import {useStore} from 'vuex'
    import HomeButton from '@/components/buttons/HomeButton.vue'
    import PhotosButton from '@/components/buttons/PhotosButton.vue'
    import DashboardButton from '@/components/buttons/DashboardButton.vue';
    import FavoriteButton from '@/components/buttons/FavoritesButton.vue'
    import HeaderButton from '@/components/HeaderButton.vue'

    const store = useStore()
    const userIsLogged = computed(() => store.getters['auth/userIsLogged'])

    function handleLogout(){
        store.dispatch('auth/logoutUser')
    }
</script>

<template>
    <section v-if="store.state.auth.isReady" id="wrapper">
        <div id="header">
            <slot name="header-content" />
            <div id="right-icons-wrapper">

                <HeaderButton 
                    v-if="userIsLogged === false"
                    text="Log in" 
                    path="/login" 
                    :border="false"
                />
                <HeaderButton 
                    v-if="userIsLogged === false"
                    text="Create account" 
                    path="/create-account" 
                    :border="true" 
                />

                <HeaderButton 
                    v-if="userIsLogged"
                    @click="handleLogout"
                    text="Log out" 
                    path="/login" 
                    :border="true"
                />
                
                <DashboardButton v-if="userIsLogged"/>

                <FavoriteButton v-if="userIsLogged" />
                <PhotosButton />
                <HomeButton />
            </div>     
        </div>
        <div id="main">
            <slot name="main-content" />
        </div>
    </section>
</template>

<style scoped>
#wrapper{
    width: 100%;
    height: auto;
}
#header{
    display: flex;
    padding:0 0 0 35px;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    font-size:20px;
    text-transform: capitalize;
    background:white;
    border-bottom:1px solid #e0e0e0;
}
#main{
    padding:20px 20px 0 25px;
}
#right-icons-wrapper{
    display:flex;
    width:auto;
    height:auto;
}
</style>