<script setup>
    import {ref, computed} from 'vue'
    import {useStore} from 'vuex'
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import router from '@/router/index.js'

    const 
        [store, email, password] = [useStore(), ref(''), ref('')],
        loginError = computed(() => store.state.auth.loginError);

    async function submit(){
        const credentials = {email: email.value, password: password.value}
        
        await store.dispatch('auth/loginUser', credentials)
        loginError.value === '' ? router.push('/dashboard') : null
    }
</script>

<template>
    <ViewLayout>
        <template v-slot:header-content>
            Login
        </template>

        <template v-slot:main-content>
            <form @submit.prevent="submit">
                <label>email:</label> <input v-model="email" />
                <label>password:</label> <input v-model="password" type="password"/>

                <div class="msg-container">
                    <span v-if="loginError === 'auth/user-not-found'" class="red">
                        User not found
                    </span>
                    <span v-if="loginError === 'auth/wrong-password'" class="red">
                        You entered a wrong password
                    </span>
                </div>

                <button>sign in</button>
            </form>
        </template>
    </ViewLayout>
</template>

<style scoped>
form{
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
label{
    text-transform: capitalize;
    margin:0 0 7px 12px;
}
input{
    width:300px;
    margin:0 0 20px 10px;
    font-size:17px;
    color:grey;
}
button{
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
button:hover{
    opacity: 0.8;
}
.msg-container{
    padding:10px 20px 30px 20px;
}
.red{
    color:red;
}
</style>