<template>
    <section>
        <h1>This is home</h1>
        <router-link id="link" v-bind:to="{name: 'photos'}"> 	
            👉 Go to photos
        </router-link>
    </section>
</template>

<style scoped>
    h1{
        font-size:40px;
    }
    section{
        display: grid;
        place-items: center;
    }
    #link{
       text-decoration: none;
       font-size:18px;
    }
    #link:hover{
        text-decoration: underline;
    }
</style>