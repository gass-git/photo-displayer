<script setup> 
    import {onMounted} from 'vue'
    import {useStore} from 'vuex'

    const store = useStore()

    onMounted(() => {
        console.log('HomeView component has been mounted')
        
        if(store.state.albums.fetched === false){
            console.log(store.state.albums.data)

            setTimeout(() => {
                console.log('lets fetch now!')
            }, 1000)

            setTimeout(() => {
                    store.dispatch('albums/fetch')
                },3000)

            setTimeout(() => {
                console.log(store.state.albums.data)
            },4500)
        }
        else{
            console.log('albums data has already been fetched')
        }
    })
</script>

<template>
    <section>
        <h1>Photo Displayer</h1>
        <router-link to="/photos/1"> 	
            <div id="go-to-photos-btn">
                Go to photos
            </div>
        </router-link>
    </section>
</template>

<style scoped>
    h1{
        font-size:40px;
    }
    section{
        display: grid;
        place-items: center;
    }
    #go-to-photos-btn{
        box-shadow:inset 0px 0px 0px 1px #6e9ce0;
        width:auto;
        padding:10px 15px 10px 15px;
        cursor:pointer;
        border-radius:5px;
        text-transform: capitalize;
        color:#525252;
        font-size:20px;
    }
    #go-to-photos-btn:hover{
        box-shadow:inset 0px 0px 0px 1px #6e9ce0;
        background:#c4dbfd;
    }
    a{
       text-decoration: none;
    }
</style>