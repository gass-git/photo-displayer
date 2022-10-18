<script setup>
    import {computed} from 'vue'
    import {useStore} from 'vuex'
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import WhiteWrapperLayout from '@/layouts/WhiteWrapperLayout.vue'

    const store = useStore()
    const currentDisplayName = computed(() => store.state.authModule.userData.displayName)
    const currentPhotoURL = computed(() =>  store.state.authModule.userData.photoURL)

    function updateDisplayName(e){
        store.commit('authModule/setDisplayName', e.target.value)
    }

    function updatePhotoURL(e){
        store.commit('authModule/setPhotoURL', e.target.value)
    }

    function handleSubmit(){
        store.dispatch('authModule/updateFirebaseUserProfile')
    }
</script>

<template>
    <ViewLayout>
        <template v-slot:header-content>
            Profile
        </template>

        <template v-slot:main-content>
            <WhiteWrapperLayout>
                <template v-slot:content>
                    <section id="form-wrapper">
                        <label>name:</label> <input :value="currentDisplayName" @input="updateDisplayName"/>
                        <label>photo url:</label> <input :value="currentPhotoURL" @input="updatePhotoURL"/>
                        <button @click="handleSubmit">
                            update
                        </button>
                    </section>
                </template>
            </WhiteWrapperLayout>
        </template>
    </ViewLayout>
    
</template>

<style scoped>
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