<template>
    <router-link to="/">
        <div id="home-btn">
            <img id="home-svg" src="@/assets/home.svg" />
            <div id="text">
                Home
            </div>
        </div>    
    </router-link>
</template>

<style scoped>
    #home-btn{
    padding:10px;
    display: flex;
    align-items: center;
    background:white;
    margin:0 0 15px 0;
    border-radius:5px;
}
#home-btn #text{
    margin:0 0 0 15px;
    color:#525252;
}
#home-btn:hover{
    box-shadow:inset 0px 0px 0px 1px #6e9ce0;
        background:#c4dbfd;
}
a{
    text-decoration: none;
}
#home-svg{
    width:30px;
    color:#525252;
}
</style>