<script setup>
    import {computed, watchEffect, ref, watch} from 'vue'
    import {useRoute} from 'vue-router'
    import {useStore} from 'vuex'
    import router from '@/router/index.js'
    import NumberOfAlbums from '@/components/NumberOfAlbums.vue';
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import WhiteWrapperLayout from '@/layouts/WhiteWrapperLayout.vue'
    import AppToast from '@/components/AppToast.vue'

    const 
        store = useStore(),
        route = useRoute(),
        option = ref(''),
        showToast = ref(false);

    const    
        username = ref(''),
        website = ref(''),
        about = ref('');

    const 
        userData = computed(() => store.state.user.data),
        authIsReady = computed(() => store.getters['auth/userIsLogged']),
        isAppFirstRender = computed(() => store.getters['utils/isAppFirstRender']);


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

    watch(() => store.getters['user/information'], () => {
        isAppFirstRender.value ? null : triggerToast()
    })

    function handleUpdate(){
        let newInfo = {
            username: username.value,
            website: website.value,
            about: about.value
        }
        store.dispatch('user/updateInformation', newInfo)
    }

    function triggerToast(){
        showToast.value = true

        setTimeout(() => {
            showToast.value = false
        },2500)
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
                        <label>about:</label> <textarea rows="4" cols="50" v-model="about"/>
                        
                        <div class="btn-toast-wrapper">
                            <button @click="handleUpdate">
                                Update
                            </button>
                            <AppToast v-if="showToast" message="Information updated!" />
                        </div>
                        

                    </section>            
                </template>
            </WhiteWrapperLayout>

        </template>
    </ViewLayout>
</template>

<style scoped>
.btn-toast-wrapper{
    display:flex;
    align-items: center;
}
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
    padding:20px 0 20px 0;
    align-items: center;
    background:white;
    width:auto;
    height:auto;
    border-radius:10px;
}
#form-wrapper label{
    text-transform: capitalize;
    margin:0 0 7px 0;
}
#form-wrapper input{
    width:300px;
    padding:5px 10px 5px 10px;
    margin:0 0 20px 0;
    font-size:17px;
    color:grey;
}
#form-wrapper textarea{
    width:300px;
    padding:5px 10px 5px 10px;
    margin:0 0 20px 0;
    font-size:17px;
    color:grey;
}
#form-wrapper button{
    display:grid;
    place-items:center;
    padding:15px 20px 15px 20px;
    cursor:pointer;
    width: 100px;
    font-size:17px;
    border-radius:10px;
    border:1px solid blue;
    color:blue;
    font-size:18px;
}
#form-wrapper button:hover{
    opacity: 0.6;
}
#form-wrapper button:active{
    background:blue;
    color:white;
}
</style>