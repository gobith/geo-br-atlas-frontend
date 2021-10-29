<script lang="ts">
  import { settings , zoomIn , zoomOut} from "../../stores/world-state";

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const toggleProvinces = () => {
    settings.update((settingsObject) => {
      return {
        ...settingsObject,
        showProvinces: !settingsObject.showProvinces,
      };
    });
  };

</script>

<div class="navigation">
<button on:click={zoomIn}>+</button>
<button on:click={zoomOut}>-</button>
  <button on:click={toggleFullScreen}>#</button>
  <button on:click={toggleProvinces}>provinces</button>
</div>

<style>
  .navigation {
    position: absolute;
    top: 10px;
    left: 10px;
  }
</style>
