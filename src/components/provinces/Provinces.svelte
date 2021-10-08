<script lang="ts">
     import world, { provinceInfoForArea } from "../../stores/world-store";

</script>

<h1>Provinces</h1>

{#if $world}

{#each $world.provinces as province}

<p>{province.name}</p>

{/each}

{/if}

<style></style>