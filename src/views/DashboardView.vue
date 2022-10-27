<script setup>
    import {computed, watchEffect, ref, onMounted} from 'vue'
    import {useRoute} from 'vue-router'
    import {useStore} from 'vuex'
    import router from '@/router/index.js'
    import NumberOfAlbums from '@/components/NumberOfAlbums.vue';
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import WhiteWrapperLayout from '@/layouts/WhiteWrapperLayout.vue'

    const 
        store = useStore(),
        route = useRoute(),
        option = ref(''),
        username = ref(''),
        website = ref(''),
        about = ref('');

    const 
        userData = computed(() => store.state.user.data),
        authIsReady = computed(() => store.getters['auth/userIsLogged']);

    watchEffect(() => {
        username.value = store.state.user.data.information.username
        website.value = store.state.user.data.information.website
        about.value = store.state.user.data.information.about

        switch(route.params.option){
            case 'settings': 
                option.value = 'settings'
                break
            case undefined: 
                option.value = 'profile'
                break
            default: 
                option.value = 'profile'
        }
    })

    function handleUpdate(){
        let newInfo = {
            username: username.value,
            website: website.value,
            about: about.value
        }
        store.dispatch('user/updateInformation', newInfo)
    }
</script>

<template>
    <ViewLayout v-if="authIsReady">
        <template v-slot:header-content>
            Dashboard
        </template>

        <template v-slot:main-content>
        
            <section v-if="option === 'profile'" class="dashboard-nav-wrapper">
                <div @click="router.push('/dashboard')" class="selected">profile</div>
                <div @click="router.push('/dashboard/settings')" class="non-selected">settings</div>
            </section>

            <section v-if="option === 'settings'" class="dashboard-nav-wrapper">
                <div @click="router.push('/dashboard')" class="non-selected">profile</div>
                <div @click="router.push('/dashboard/settings')" class="selected">settings</div>
            </section>

            <WhiteWrapperLayout v-if="option === 'profile'">
                <template v-slot:content>
                    <span class="username">
                        Hello <span class="color-blue">{{userData.information.username}}</span>
                    </span>
                    <span>
                        , welcome to your Dashboard !
                    </span>
                </template>
            </WhiteWrapperLayout>

            <NumberOfAlbums v-if="option === 'settings'"/>

            <WhiteWrapperLayout v-if="option === 'settings'">
                <template v-slot:content>
                    <section id="form-wrapper">
                        <label>username:</label> <input v-model="username"/>
                        <label>website:</label> <input v-model="website"/>
                        <label>about:</label> <input v-model="about"/>
                        
                        <button @click="handleUpdate">
                            Update
                        </button>
                    </section>            
                </template>
            </WhiteWrapperLayout>

        </template>
    </ViewLayout>
</template>

<style scoped>
.dashboard-nav-wrapper{
    display:flex;
}
.dashboard-nav-wrapper > div{
    display:grid;
    text-transform: capitalize;
    padding:15px 20px 15px 20px;
    min-width: 100px;
    place-items:center;
    border-radius:10px;
    font-size:18px;
    margin:0 10px 20px 0;
}
.non-selected:hover{
    background-color: rgb(189, 224, 255);
    cursor:pointer;
}
.selected{
    background:blue;
    color:white;
}
.username{
    text-transform: capitalize;
}
.color-blue{
    color:blue;
}
#form-wrapper{
    display:grid;
    grid-template-columns: auto;
    color:grey;
    font-size:17px;
    padding:20px;
    align-items: center;
    background:white;
    width:auto;
    height:auto;
    border-radius:10px;
}
#form-wrapper label{
    text-transform: capitalize;
    margin:0 0 7px 12px;
}
#form-wrapper input{
    width:300px;
    margin:0 0 20px 10px;
    font-size:17px;
    color:grey;
}
#form-wrapper button{
    cursor:pointer;
    margin:0 0 0 10px;
    padding:5px;
    max-width: 300px;
    font-size:17px;
    background:var(--dark-navy);
    border-radius:5px;
    border:none;
    color:white;
}
#form-wrapper button:hover{
    opacity: 0.8;
}
</style>