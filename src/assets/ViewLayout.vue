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
        border:1px solid black;
    }
    #header{
        height: auto;
    }
</style>