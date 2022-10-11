<template>
    <section id="wrapper">
        <div id="header">
            <slot name="header-content" />
            <router-link to="/">
                <div id="home-link-wrapper">
                    <span class="material-symbols-outlined">
                        home
                    </span>
                </div>
            </router-link>
        </div>
        <div id="main">
            <slot name="main-content" />
        </div>
    </section>
</template>

<style scoped>
    #wrapper{
        width: 100%;
        height: auto;
    }
    #header{
        display: flex;
        justify-content: space-between;
        padding:0 0 0 35px;
        align-items: center;
        height: 60px;
        font-size:20px;
        text-transform: capitalize;
        background:white;
        border-bottom:1px solid #e0e0e0;
    }
    #main{
        padding:20px 0 0 25px;
    }
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