<script setup>
    import { defineProps, computed } from 'vue'
    import { useStore } from 'vuex'

    const store = useStore()
    const props = defineProps({ 
        albumId: Number, 
        albumTitle: String
    })

    // current selected album id
    const selectedAlbumId = computed(() => Number(store.state.albums.currentId))

    // is the album button selected ?
    const isSelected = computed(() => props.albumId === selectedAlbumId.value)

</script>

<template>
    <router-link v-bind:to="`/photos/${props.albumId}`">
        <div v-if="isSelected" class="blue-bg">
            {{ props.albumTitle }}
        </div>
        <div v-else>
            {{ props.albumTitle }}
        </div>
    </router-link>
</template>

<style scoped>
    a{
        text-decoration: none;
    }
    div{
        display:block;
        width:auto;
        padding:10px;
        margin-bottom:12px;
        cursor:pointer;
        font-size:16px;
        border-radius:5px;
        background: white;
        text-transform: capitalize;
        color:#525252;
    }
    div .blue-bg{
        box-shadow:inset 0px 0px 0px 2px #455f87;
        background:#cee2ff;
    }
    div:hover{
        box-shadow:inset 0px 0px 0px 2px #455f87;
        background:#b3cff8;
    }
</style>