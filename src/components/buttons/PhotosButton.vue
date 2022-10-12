<script setup>
    import {useRoute} from 'vue-router'
    import {computed} from 'vue'

    const route = useRoute()
    const currentPath = computed(() => route.path)

    function pathIsPhotos(){
        if(currentPath.value.includes('/photo')){
            return true
        }else{
            return false
        }
    }
</script>

<template>
    <router-link to="/photos/1">
        <div v-if="pathIsPhotos()" class="photos-link-wrapper">
            <span class="material-symbols-outlined fill-icon">
                photo_library
            </span>
        </div>
        <div v-else class="photos-link-wrapper">
            <span class="material-symbols-outlined">
                photo_library
            </span>
        </div>
    </router-link>
</template>

<style scoped>
a{
    text-decoration: none;
}
.photos-link-wrapper{
    display:grid;
    place-items: center;
    aspect-ratio: 1;
    height:60px;
    border-left:1px solid #e0e0e0;
    border-bottom:1px solid #e0e0e0;
    cursor:pointer;
    color:var(--dark-navy);
}
.photos-link-wrapper:hover{
    background:#fafafe;
}
</style>