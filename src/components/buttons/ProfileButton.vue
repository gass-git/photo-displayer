<script setup>
  import {useRoute} from 'vue-router'
    import {computed} from 'vue'

    const route = useRoute()
    const currentPath = computed(() => route.path)

    function pathIsProfile(){
        if(currentPath.value === '/profile'){
            return true
        }
        else{
            return false
        }
    }
</script>

<template>
    <router-link to="/profile">
        <div v-if="pathIsProfile()" class="profile-link-wrapper">
            <span class="material-symbols-outlined fill-icon">
                face
            </span>
        </div>
        <div v-else class="profile-link-wrapper">
            <span class="material-symbols-outlined">
                face
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