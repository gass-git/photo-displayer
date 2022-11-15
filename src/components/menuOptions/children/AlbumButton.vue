<script setup lang="ts">
    import { defineProps, computed} from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const props = defineProps({ albumId: Number, albumTitle: String })
    
    const isSelected = computed(() => props.albumId === Number(route.params.albumId))
    const path = computed(() => '/photos/' + props.albumId)
</script>

<template>
    <router-link :to="path">
        <div v-if="isSelected" class="selected">
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
        margin:0 0 12px 0;
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