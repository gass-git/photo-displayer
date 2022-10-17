<script setup> 
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import {ref, computed} from 'vue'
    import {useStore} from 'vuex'

    const store = useStore()
    const [email, password, repeatedPassword] = [ref(''), ref(''), ref('')]

    const message = computed(() => {
        if(
            password.value === repeatedPassword.value 
            && 
            password.value !== ''
            && 
            password.value.length >= 6
        ){
            return 'All inputs are correct'
        }
        else if(
            password.value === repeatedPassword.value 
            && 
            password.value !== ''
        ){
            return 'The password should be at least 6 characters long'     
        }
        else return ''
    })

    const conditionsAreMet = computed(() => {
        if(
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

    function handleSubmit(){
        if(
            password.value === repeatedPassword.value 
            && 
            password.value !== ''
            && 
            password.value.length >= 6
        ){
            let credentials = {email: email.value, password: password.value}
            store.dispatch('authModule/registerUser', credentials)
        }
    }

</script>

<template>
    <ViewLayout>
        <template v-slot:header-content>
            Create Account
        </template>

        <template v-slot:main-content>
            <section id="form-wrapper">
                <label>email:</label> <input v-model="email" />
                <label>password:</label> <input v-model="password" type="password"/>
                <label>repeat password:</label> <input v-model="repeatedPassword"  type="password" />
                
                <div class="msg-container">
                    <span v-if="conditionsAreMet" class="green">
                        {{message}}
                    </span>
                    <span v-else class="red">
                        {{message}}
                    </span>
                </div>

                <button @click="handleSubmit">
                    Create Account
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
.msg-container{
    padding:10px 20px 30px 20px;
}
.msg-container .red{
    color:red;
}
.msg-container .green{
    color:green;
}
</style>