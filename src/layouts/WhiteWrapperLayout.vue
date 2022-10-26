<template>
    <div class="wrapper">
        <slot name="content" />
    </div>
</template>

<style scoped>
.wrapper{
    display:flex;
    margin:0 0 20px 0;
    align-items: center;
    padding:0 0 0 40px;
    color:grey;
    font-size:17px;
    background:white;
    width:auto;
    min-height:100px;
    border-radius:10px;
}
</style>