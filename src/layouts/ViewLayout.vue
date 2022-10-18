<script setup>
    import HomeButton from '@/components/buttons/HomeButton.vue'
    import PhotosButton from '@/components/buttons/PhotosButton.vue'
    import {useStore} from 'vuex'
    import router from '@/router/index.js'
    import ProfileButton from '@/components/buttons/ProfileButton.vue';

    const store = useStore()

    function handleLogout(){
        store.dispatch('authModule/logoutUser')
        router.push('/login')
    }
</script>

<template>
    <section v-if="store.state.authModule.authIsReady" id="wrapper">
        <div id="header">
            <slot name="header-content" />
            <div id="right-icons-wrapper">
                <div v-if="store.state.authModule.userData !== null">
                    <button @click="handleLogout">logout</button>                    
                </div>
                <ProfileButton />
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