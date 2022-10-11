<template>
    <router-link to="/">
        <div id="home-btn">
            <div id="text">
                Home
            </div>
        </div>    
    </router-link>
</template>

<style>
    #home-btn{
        padding:10px;
        display: flex;
        align-items: center;
        margin:0 0 15px 0;
    }
#home-btn #text{
    cursor: pointer;
    margin:0 0 0 15px;
    color:var(--light-gray);
}
#home-btn #text:hover{
    color:white;
}
a{
    cursor:default;
    text-decoration: none;
}
#home-svg{
    width:30px;
    color:#525252;
}
</style>