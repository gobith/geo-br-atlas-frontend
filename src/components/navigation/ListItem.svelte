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
    padding: 14px;
    border-bottom: 1px solid rgba(151, 103, 56 , 1);
    width: 260px;
    background-color: #eeebe3;
  }

  .card:hover {
   background-color: rgba(151, 103, 56 , 1);
  }

  .card::after {
    clear: both;
    display: block;
  }
</style>
