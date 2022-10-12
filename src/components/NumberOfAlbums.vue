<script setup>
    import {computed} from 'vue'
    import {useStore} from 'vuex'

    const options = [20, 30, 50]
    const store = useStore()

    const albumsToShow = computed({
        get: () => store.state.albums.max,
        set: (n) => store.dispatch('albums/updateCurrentMax', n)
    })
</script>

<template>
    <section id="options-wrapper">
        <label>Number of albums to show</label>
        <select v-model="albumsToShow">
            <option v-for="number in options" :key="number" :selected="albumsToShow === store.state.albums.max">
                {{number}}
            </option>
        </select>
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