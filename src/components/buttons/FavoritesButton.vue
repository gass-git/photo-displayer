<script setup>
  import {useRoute} from 'vue-router'
    import {computed} from 'vue'

    const route = useRoute()
    const currentPath = computed(() => route.path)

    function pathIsFavorites(){
        if(currentPath.value === '/favorites'){
            return true
        }
        else{
            return false
        }
    }
</script>

<template>
    <router-link to="/favorites">
        <div v-if="pathIsFavorites()" class="profile-link-wrapper">
            <span class="material-symbols-outlined fill-icon">
                favorite
            </span>
        </div>
        <div v-else class="profile-link-wrapper">
            <span class="material-symbols-outlined">
                favorite
            </span>
        </div>
    </router-link>
</template>

<style scoped>
a{
    text-decoration: none;
}
.profile-link-wrapper{
    display:grid;
    place-items: center;
    aspect-ratio: 1;
    height:60px;
    border-left:1px solid #e0e0e0;
    border-bottom:1px solid #e0e0e0;
    cursor:pointer;
    color:var(--dark-navy);
}
.profile-link-wrapper:hover{
    background:#fafafe;
}
</style>