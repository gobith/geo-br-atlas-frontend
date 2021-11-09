<script lang="ts">
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import App from "../../App.svelte";
  import Holdings from "../holdings/Holdings.svelte";
  import Background from "../map/Background.svelte";
  import Descriptions from "../map/Descriptions.svelte";
  import woodPattern from "../map/wood-pattern";
  import ListItem from "./ListItem.svelte";

  export let world;

  const things = [
    // these can be any values you like
    { name: "one", number: 1 },
    { name: "two", number: 2 },
    { name: "three", number: 3 },
    { name: "one", number: 1 },
    { name: "two", number: 2 },
    { name: "three", number: 3 },
    { name: "one", number: 1 },
    { name: "two", number: 2 },
    { name: "three", number: 3 },
    { name: "one", number: 1 },
    { name: "two", number: 2 },
    { name: "three", number: 3 },
    { name: "one", number: 1 },
    { name: "two", number: 2 },
    { name: "three", number: 3 },
    // ...
    { name: "six thousand and ninety-two", number: 6092 },
  ];

  console.log(world.provinces);
</script>

<div>
  <VirtualList items={world.provinces} let:item>
    <ListItem {...item} />
  </VirtualList>
</div>

<style>
  div {
    position: absolute;
    top: 80px;
    left: 10px;
    min-height: 200px;
    width: 250px;
    height: calc(100vh - 90px);
  }
</style>
