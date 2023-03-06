<script>
    export let state = 0;

    const imgs = ['1.png', '2.png', '3.png', '4.png'];

    let path;
    $: path = imgs[state];

    const handleMouseEnter = () => {
        if (state == 0) {
            path = imgs[1];
        }
    }
    const handleMouseLeave = () => {
        if (state == 0) {
            path = imgs[0];
        }
    }
</script>

<img src="{path}" alt="" on:mouseenter="{handleMouseEnter}" on:mouseleave="{handleMouseLeave}">

<style>
    img { margin: 10px; }
    img:hover { cursor: pointer; }
</style>