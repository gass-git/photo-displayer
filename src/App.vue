<script setup>
    import { onMounted, computed } from '@vue/runtime-core'
    import AppLayout from './AppLayout.vue'
    import {useStore} from 'vuex'
    import AlbumBtn from './components/AlbumBtn.vue'

    const store = useStore()
    const photosData = computed(() => store.state.photos.data) 

    onMounted(() => {
        store.dispatch('photos/fetch')    
    })
</script>

<template>
    <AppLayout>
        <template v-slot:header>
            
        </template>    
        <template v-slot:sidebar>
            <div v-for="photo in photosData" v-bind:key="photo.id">
                <AlbumBtn 
                    v-bind:id="photo.id"
                    v-bind:album="photo.title" 
                 />
            </div>
        </template>
        <template v-slot:content>
            {{ store.getters['photos/selected'] }}
        </template>
    </AppLayout>
</template>

<style>
*{
  box-sizing: border-box;
}
body{
  margin:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
