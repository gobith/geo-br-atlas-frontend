<script lang="ts">
  import VirtualList from "@sveltejs/svelte-virtual-list";

  import ListItem from "./ListItem.svelte";

  export let world;

</script>

<div>
  <VirtualList items={world.namedEntities} let:item>
    <ListItem object={item} />
  </VirtualList>
</div>

<style>
  div {
    position: absolute;
    top: 10px;
    left: 10px;
    
    /* width: 295px; */
    height: calc(100vh - 20px);
    /* background-color: rgba(24, 26, 24, 0.8); */
    /* margin: 10px; */
    /* border-radius: 4px; */
    border: 1px solid #cd853f; 

     /* box-shadow: 2px 2px 4px 	#CD853F; */
  }

  /* :global(svelte-virtual-list-viewport) {
    scrollbar-width: none;
  } */

  /* :global(::-webkit-scrollbar) {
    width: 0 !important;
  }  */
</style>
