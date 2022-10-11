<template>
    <section id="app-wrapper">

        <!-- main -->
        <section id="app-main">
            <div id="sidebar-container">
                <slot name="sidebar-header" />
                <slot name="sidebar-content" />
            </div>
            <div id="content-container">
                <slot name="content-header" />
                <slot name="content" />
            </div>
        </section>

    </section>
</template>

<style>
    #app-wrapper{
        height: auto;
    }
    #app-header{
        width:auto;
        display: flex;
        padding:var(--header-padding);
    }
    #app-main{
        display:flex;
        width:auto;
        min-height: 100vh;
        height:fit-content;
        background:var(--app-main-bg);
    }
    #sidebar-container{
        padding: 20px;
        width:var(--sidebar-width);
        background: var(--dark-navy);
    }
    #content-container{
        width:calc(100vw - var(--sidebar-width));
        height:auto;
    }
</style>