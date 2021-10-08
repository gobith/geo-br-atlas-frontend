<script lang="ts">
  const activateItem = (event) => {

    const anchors = document.getElementsByClassName("anchor");

    for (var i = 0; i < anchors.length; i++) {
      console.log(anchors[i]);
      anchors[i].classList.remove("active");
    }

    event.target.classList.add("active");
  };
</script>

<ul>
  <li on:click={activateItem}><a class="anchor active" href="#/map">Map</a></li>
  <li on:click={activateItem}>
    <a class="anchor" href="#/provinces">Provinces</a>
  </li>
  <li on:click={activateItem}>
    <a class="anchor" href="#/holdings">Holdings</a>
  </li>
  <li on:click={activateItem}>
    <a class="anchor" href="#/regents">Regents</a>
  </li>
</ul>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 40px;
    background-color: #333;
  }

  li {
    float: left;
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 10px 16px;
    text-decoration: none;
  }

  li a:hover {
    background-color: #111;
  }

  .active {
    background-color: #04aa6d;
  }
</style>
