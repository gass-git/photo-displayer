<script setup> 
    import {useStore} from 'vuex'
    import {computed} from 'vue'
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import WhiteWrapperLayout from '@/layouts/WhiteWrapperLayout.vue'

    const store = useStore()
    const userIsLogged = computed(() => store.getters['auth/userIsLogged'])
    const displayName = computed(() => store.state.auth.data.displayName)
    const userEmail = computed(() => store.state.auth.data.email)
</script>

<template>
    <ViewLayout>
        <template v-slot:header-content>
            Home
        </template>
        
        <template v-slot:main-content>
            
            <section v-if="userIsLogged">
                <WhiteWrapperLayout>
                    <template v-slot:content>
                        Hello <span v-if="displayName">{{displayName}}</span> 
                        , you are logged in with: 
                        <span class="user-email">
                            {{ userEmail }}
                        </span>
                    </template>
                </WhiteWrapperLayout>
            </section>
            
       </template>
    </ViewLayout>
</template>

<style scoped>
.blue-box{
    margin-left:10px;
    padding:3px 7px 3px 7px;
    background:blue;
    color:white;
    border-radius:5px;
    font-size:15px;
}
span{
    margin:0 0 0 5px ;
    color:blue;
}
</style>