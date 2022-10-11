<template>
    <section id="wrapper">
        <div id="header">
            <slot name="header-content" />
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
        padding:0 0 0 12px;
        align-items: center;
        height: 80px;
        font-size:20px;
        text-transform: capitalize;
    }
</style>