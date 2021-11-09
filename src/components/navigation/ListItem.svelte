<script lang="ts">
	export let name;
	
const clicked = () => {
	console.log("clicked" , name)
}

</script>

<div class='card' on:click="{clicked}">
	<h2>{name}</h2>
	
</div>

<style>
	.card {
		position: relative;
		margin: 0.5em;
		padding: 10px;
		border: 1px solid #eee;
		border-radius: 4px;
		box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
		min-height: 5em;
        width: 200px;
		
	}

	.card::after {
		clear: both;
		display: block;
	}

	h2 {
		margin: 0 0 0.5em 0;
		font-size: 16px;
		color: "blue";
        background-color: "white";
	}

</style>