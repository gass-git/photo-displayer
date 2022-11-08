<script setup> 
    import {ref, computed} from 'vue'
    import {useStore} from 'vuex'
    import router from '@/router/index.js'
    import ViewLayout from '@/layouts/ViewLayout.vue'

    const 
        store = useStore(),
        [email, password, repeatedPassword] = [ref(''), ref(''), ref('')],
        alert = ref({show: false, text: ''}),
        registrationError = computed(() => store.state.auth.registrationError)

    const emailValid = computed(() => {
        // eslint-disable-next-line
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)
    })

    const conditionsAreMet = computed(() => {
        if(
            emailValid.value
            &&
            password.value === repeatedPassword.value 
            && 
            password.value !== ''
            && 
            password.value.length >= 6
        ){
            return true
        } 
        else{
            return false
        }
    })

    async function submit(){ 
        if(conditionsAreMet.value){
            const credentials = {email: email.value, password: password.value}
            
            await store.dispatch('auth/registerUser', credentials)
            registrationError.value ? null : router.push('/dashboard')
        }
        else if(email.value === ''){
            alert.value.show = true
            alert.value.text = 'Please enter an email address'
        }
        else if(emailValid.value === false){
            alert.value.show = true
            alert.value.text = 'The email address is not valid'
        }
        else if(
            password.value !== repeatedPassword.value 
            && 
            password.value !== ''
            && 
            password.value.length >= 6
        ){
            alert.value.show = true
            alert.value.text = 'The repeated password is not correct'
        }
        else if(
            password.value === repeatedPassword.value 
            && 
            password.value !== ''
        ){
            alert.value.show = true
            alert.value.text = 'The password should be at least 6 characters long'     
        }
        else{
            alert.value.show = false
        }
    }
</script>

<template>
    <ViewLayout>
        <template v-slot:header-content>
            Create Account
        </template>

        <template v-slot:main-content>
            <form @submit.prevent="submit">
                <label>email:</label> <input v-model="email" />
                <label>password:</label> <input v-model="password" type="password"/>
                <label>repeat password:</label> <input v-model="repeatedPassword"  type="password" />
                
                <div class="msg-container">
                    <span v-if="alert.show" class="red">{{alert.text}}</span>
                    <span v-else-if="registrationError === 'auth/email-already-in-use'" class="red">
                        The email is already in use
                    </span>
                </div>

                <button>Create Account</button>
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
#form-wrapper button:hover{
    opacity: 0.8;
}
.msg-container{
    padding:10px 20px 30px 20px;
}
.red{
    color:red;
}
</style>