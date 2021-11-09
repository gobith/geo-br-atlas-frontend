<script lang="ts">

  import RegentItem from "./RegentItem.svelte";
  import DomainItem from "./DomainItem.svelte";
  import ProvinceItem from "./ProvinceItem.svelte";

  export let object;

  const component = {
    Regent: RegentItem,
    Domain: DomainItem,
    Province: ProvinceItem,
  }[object.typeString()];


</script>

<div class="card" >
  <svelte:component this={component} object={object}/>
</div>

<style>
  .card {
    position: relative;
    margin-top: 2px;
    margin-bottom: 2px;
    margin-left: 8px;
    margin-right: 8px;
    padding: 10px;
    border: 1px solid #cd853f;
    /* border-radius: 4px; */
    /* box-shadow: 2px 2px 4px 	#CD853F; */
    /* min-height: 3em; */
    width: 250px;
    background-color: #eeebe3;
  }

  .card:hover {
    outline: 2px solid #cd853f;
  }

  .card::after {
    clear: both;
    display: block;
  }
</style>
