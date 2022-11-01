<script setup>
    import {ref, watchEffect, watch, computed} from 'vue'
    import {useStore} from 'vuex'
    import WhiteWrapperLayout from '@/layouts/WhiteWrapperLayout.vue'
    import AppToast from '@/components/AppToast.vue'

    const    
        store = useStore(),
        username = ref(''),
        website = ref(''),
        about = ref('');

    const 
        isAppFirstRender = computed(() => store.getters['utils/isAppFirstRender']),
        showToast = ref(false);

    watchEffect(() => {
        username.value = store.state.user.information.username
        website.value = store.state.user.information.website
        about.value = store.state.user.information.about
    })

    function handleUpdate(){
        const newInfo = {
                username: username.value,
                website: website.value,
                about: about.value
        }
        triggerToast()
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
    <WhiteWrapperLayout>
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

<style scoped>
.btn-toast-wrapper{
    display:flex;
    align-items: center;
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