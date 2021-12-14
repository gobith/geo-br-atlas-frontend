<script lang="ts">
  export let province;
  console.log(province.domainHoldings());
</script>

<div class="container">
  <h1>{province.name}</h1>
  <span>level: {province.level}</span>
  <span>source: {province.sourceRating}</span>
  <span>Domain: {province.owner.name}</span>
  <span>Regent: {province.regent().name}</span>

  <table>
    <tr>
      <th>Domain</th>
      <th>Law</th>
      <th>Temple</th>
      <th>Guild</th>
      <th>Source</th>
    </tr>

    {#each province.domainHoldings() as domainHolding}
      <tr>
        <td>{domainHolding.owner.name}</td>
        <td>{domainHolding.law}</td>
        <td>{domainHolding.temple}</td>
        <td>{domainHolding.guild}</td>
        <td>{domainHolding.source}</td>
      </tr>
    {/each}
  </table>
</div>

<style>
  .container {
    display: grid;
    margin: 10px;
  }

  table,
  th,
  td {
    border: 1px solid white;
    padding: 4px;
  }

  table {
    border-collapse: collapse;
  }
</style>
