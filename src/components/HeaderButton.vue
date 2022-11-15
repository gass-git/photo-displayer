<script setup lang="ts">
    import {defineProps} from 'vue'

    const props = defineProps({text: String, path: String, border:Boolean})
</script>

<template>
    <section id="btn-wrapper">
        <router-link :to="props.path">
            <button v-if="props.border" class="btn-border">
                {{props.text}}
            </button>
            <button v-else class="btn-no-border">
                {{props.text}}
            </button>
        </router-link>
    </section>
</template>

<style scoped>
#btn-wrapper{
    width:auto;
    display:grid;
    margin:0 15px 0 0;
    place-items: center;
    height:60px;
}
.btn-border{
    color:rgb(81, 81, 252);
    width:fit-content;
    padding:8px 10px 8px 10px;
    font-size:18px;
    background:white;
    border-radius:7px;
    border: 1px solid rgb(102, 102, 255);
}
.btn-no-border{
    color:rgb(108, 108, 108);
    width:fit-content;
    padding:10px 10px 10px 10px;
    font-size:18px;
    background:white;
    border-radius:10px;
    border: none;
}
.btn-border:hover{
    cursor:pointer;
    background:blue;
    color:white;
}
.btn-no-border:hover{
    cursor:pointer;
    color:blue;
    background:rgb(233, 237, 250);
}
</style>