<script lang="ts">
  import Map from "./components/map/Map.svelte";
  import Navigation from "./components/navigation/Navigation.svelte";
</script>

<Map />
<Navigation />

<style>
  :global(body) {
    
    height: 100vh;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    background-color: #006994;
    position: relative;
    font-family: 'calibri';
     }

  :global(table) {
    border-collapse: collapse;
    position: relative;
  }

  :global(table, th, td) {
    border: 1px solid #63666a;
    font-weight: normal;
    padding: 10px;
  }
</style>
