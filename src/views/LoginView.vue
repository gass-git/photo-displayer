<script setup>
    import {ref} from 'vue'
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import {useStore} from 'vuex'

    const store = useStore()
    const email = ref('')
    const password = ref('')

    function handleSubmit(){
        store.dispatch('authModule/loginUser', {email: email.value, password: password.value})
    }
</script>

<template>
    <ViewLayout>
        <template v-slot:header-content>
            Login
        </template>

        <template v-slot:main-content>
            <section id="form-wrapper">
                <label>email:</label> <input v-model="email" />
                <label>password:</label> <input v-model="password" type="password"/>
                
                <button @click="handleSubmit">
                    sign in
                </button>

            </section>
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