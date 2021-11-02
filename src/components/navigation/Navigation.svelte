<script lang="ts">
  import { settings, zoomIn, zoomOut , scale , zoom} from "../../stores/world-state";

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

  const toggleProvinceInfo = () => {
    settings.update((settingsObject) => {
      return {
        ...settingsObject,
        showProvinceInfo: !settingsObject.showProvinceInfo,
      };
    });
  };

  const toggleShadowBlur = () => {
    settings.update((settingsObject) => {
      return {
        ...settingsObject,
        shadowBlur: !settingsObject.shadowBlur,
      };
    });
  };
</script>

<div class="navigation">
  <button on:click={zoomIn}>+</button>
  <button on:click={zoomOut}>-</button>
  <button on:click={toggleFullScreen}>#</button>
  <button on:click={toggleProvinces}>provinces</button>
  <button on:click={toggleProvinceInfo}>info</button>
  <button on:click={toggleShadowBlur}>Shadow Blur</button>
  <div>{$zoom} - {$scale}</div>
</div>

<style>
  .navigation {
    position: absolute;
    top: 10px;
    left: 10px;
  }
</style>
