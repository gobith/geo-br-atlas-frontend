<script lang="ts">
  import Map from "./components/map/Map.svelte";
  import Provinces from "./components/provinces/Provinces.svelte";
  import Holdings from "./components/holdings/Holdings.svelte";
  import Regents from "./components/regents/Regents.svelte";
  import NavBar from "./components/navigation/NavBar.svelte";
  import Router from "svelte-spa-router";

  const routes = {
    "/": Map,
    "/provinces": Provinces,
    "/holdings": Holdings,
    "/regents": Regents,
  };
</script>

<NavBar />
<Router {routes} />

<style>
  :global(body) {
    width: 100vw;
    height: 100vh;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }
</style>
