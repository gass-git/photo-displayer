<script setup>
    import {computed, watch, ref} from 'vue'
    import {useStore} from 'vuex'
    import AppToast from '@/components/AppToast.vue'

    const options = [20, 30, 50]
    const store = useStore()
    const showToast = ref(false)

    const albumsToShow = computed({
        get: () => store.state.albums.max,
        set: (n) => store.dispatch('albums/updateCurrentMax', n)
    })

    watch(() => store.getters['albums/max'], () => {
        triggerToast()
    })

    function triggerToast(){
        showToast.value = true
        
        setTimeout(() => {
            showToast.value = false
        },2500)
    }

</script>

<template>
    <section id="options-wrapper">
        
        <label>Number of albums to show</label>
        <select v-model="albumsToShow">
            <option v-for="number in options" :key="number" :selected="albumsToShow === store.state.albums.max">
                {{number}}
            </option>
        </select>

        <div v-if="showToast">
            <AppToast message="value updated!"/>
        </div>
    
    </section>
</template>

<style scoped>
#options-wrapper{
    color:grey;
    font-size:17px;
    padding:20px;
    display:flex;
    align-items: center;
    background:white;
    width:auto;
    height:100px;
    border-radius:10px;
}
#options-wrapper select{
    width:100px;
    margin-left:10px;
    font-size:17px;
    color:grey;
}
</style>