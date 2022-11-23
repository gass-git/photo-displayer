<script setup lang="ts">
    import {useStore} from 'vuex'

    const 
        store = useStore(),
        handleCloseAlert: () => void = () => store.commit('utils/setShow', false);
</script>

<template>
    <div id="alert">
        <div class="alert-text-wrapper">
            Welcome to photo displayer! 
            <router-link to="/create-account">create an account</router-link> 
            or   
            <router-link to="/login">login</router-link>
                    to start saving images 
            as favorites. Also! have access to other settings that will improve your experience!
        </div>
        <div class="alert-close-icon-wrapper">
            <span
                @click="handleCloseAlert"
                class="material-symbols-outlined"
            >
                close
            </span>
        </div>
    </div>
</template>

<style scoped>
a{
    text-decoration: none;
    color:blue;
}
a:hover{
    text-decoration: underline;
}
#alert{
    display: flex;
    word-spacing: 2px;;
    padding:0 0 0 35px;
    align-items: center;
    height: 90px;
    font-size:18px;
    background:#81acfa;
    color:white;
}
.alert-text-wrapper{
    width:auto;
    margin:0 30px 0 0;
    line-height: 25px;
}
.alert-close-icon-wrapper{
    margin:0 20px 0 0;
    display:grid;
    place-items: center;
    width:150px;
}
.alert-close-icon-wrapper span{
    background:rgb(255, 255, 255,0.2);
    display:grid;
    place-items: center;
    width:40px;
    height:40px;
    border-radius: 100%;
    color:rgb(255, 255, 255);
    cursor:pointer;
}
.alert-close-icon-wrapper span:hover{
    background:rgb(255, 255, 255,0.5);
    color:blue;
}
</style>