<script lang="ts">
  import session from "./stores/session-store";


  import Map from "./components/map/Map.svelte";
  import Navigation from "./components/navigation/Navigation.svelte";
  import Searchlist from "./components/navigation/Searchlist.svelte";
</script>

{#if $session}
  
    <Map session={$session} />
    <Navigation />
    <!-- <Searchlist world={$world}/> -->
 
{/if}

<style>
  :global(body) {
    overflow: hidden;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #006994;
    position: relative;
    font-family: "calibri";
  }

</style>
