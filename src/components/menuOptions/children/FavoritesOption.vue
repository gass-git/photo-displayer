<script setup>
    import {useStore} from 'vuex'
    import {computed} from 'vue'
    import {useRoute} from 'vue-router'

    const route = useRoute()
    const store = useStore()
    const favorites = computed(() => store.state.user.favoritePhotos.ids)
    const isSelected = computed(() => route.path == '/favorites')
</script>

<template>
    <section>
        <router-link :to="'/favorites'" >
            <div v-if="isSelected" class="selected">
                <span v-if="favorites.length > 0" class="material-symbols-outlined fill-icon">
                    favorite
                </span>
                <span v-else class="material-symbols-outlined">
                    favorite
                </span>
                favorites ( {{ favorites.length }} )
            </div>
            <div v-else class="not-selected">
                <span v-if="favorites.length > 0" class="material-symbols-outlined fill-icon">
                    favorite
                </span>
                <span v-else class="material-symbols-outlined">
                    favorite
                </span>
                favorites ( {{ favorites.length }} )
            </div>
        </router-link>
    </section>
</template>

<style scoped>
    section{
        border-bottom:1px solid rgb(255, 255, 255,0.3);
        margin-bottom:10px;
    }
    a{
        text-decoration: none;
    }
    span{
        margin-right:8px;
    }
    div{
        display:flex;
        align-items: center;
        width:auto;
        padding:10px;
        margin:0px 0 12px 0;
        cursor:pointer;
        font-size:16px;
        border-radius:5px;
        text-transform: capitalize;
        color:var(--light-gray);
    }
    .selected{
        box-shadow:inset 0px 0px 0px 1px #6e9ce0;
    }
    div:hover{
        box-shadow:inset 0px 0px 0px 1px #6e9ce0;
    }
</style>