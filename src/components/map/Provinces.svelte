<script lang="ts">
  import Province from "./Province.svelte";
  export let session;
</script>

{#each session.provinces as province}
  {#if province.descriptionArea}
    <Province {province} {session} />
  {/if}
{/each}

<style>
</style>
