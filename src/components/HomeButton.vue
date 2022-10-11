<template>
    <router-link to="/">
        <div id="home-link-wrapper">
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
#home-link-wrapper{
    display:grid;
    place-items: center;
    aspect-ratio: 1;
    height:60px;
    border-left:1px solid #e0e0e0;
    border-bottom:1px solid #e0e0e0;
    cursor:pointer;
    color:rgb(86, 86, 86);
}
#home-link-wrapper:hover{
    background:#fafafe;
}
</style>