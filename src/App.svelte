<script lang="ts">
  import Map from "./components/map/Map.svelte";
  import Provinces from "./components/provinces/Provinces.svelte";
  import Holdings from "./components/holdings/Holdings.svelte";
  import Regents from "./components/regents/Regents.svelte";
  import NavBar from "./components/navigation/NavBar.svelte";
  import Navigation from "./components/navigation/Navigation.svelte";
  import Router from "svelte-spa-router";
  import { push } from "svelte-spa-router";

  const routes = {
    "/map": Map,
    "/provinces": Provinces,
    "/holdings": Holdings,
    "/regents": Regents,
  };

  push("/map");

</script>

<!-- <NavBar /> -->

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
