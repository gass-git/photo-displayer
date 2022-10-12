<script setup>
    import {useRoute} from 'vue-router'
    import {computed} from 'vue'

    const route = useRoute()
    const currentPath = computed(() => route.path)

    function pathIsHome(){
        if(currentPath.value === '/' || currentPath.value === '/home'){
            return true
        }else{
            return false
        }
    }
</script>

<template>
    <router-link to="/">
        <div v-if="pathIsHome()" class="home-link-wrapper">
            <span class="material-symbols-outlined fill-icon">
                home
            </span>
        </div>
        <div v-else class="home-link-wrapper">
            <span class="material-symbols-outlined">
                home
            </span>
        </div>
    </router-link>
</template>

<style scoped>
a{
    text-decoration: none;
}
.home-link-wrapper{
    display:grid;
    place-items: center;
    aspect-ratio: 1;
    height:60px;
    border-left:1px solid #e0e0e0;
    border-bottom:1px solid #e0e0e0;
    cursor:pointer;
    color:var(--dark-navy);
}
.home-link-wrapper:hover{
    background:#fafafe;
}
</style>