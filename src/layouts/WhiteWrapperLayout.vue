<template>
    <div class="wrapper">
        <slot name="content" />
    </div>
</template>

<style scoped>
.wrapper{
    display:flex;
    align-items: center;
    margin:20px 0 0 0;
    padding:20px;
    color:grey;
    font-size:17px;
    background:white;
    width:auto;
    min-height:100px;
    border-radius:10px;
}
</style>