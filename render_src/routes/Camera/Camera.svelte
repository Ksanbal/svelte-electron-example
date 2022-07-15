<script lang="ts">
  import { link } from "svelte-spa-router";

  let videoSource: HTMLMediaElement | null = null;
  let loading = true;

  navigator.mediaDevices
    .getUserMedia({
      video: true,
    })
    .then((stream: MediaStream) => {
      loading = false;
      videoSource.srcObject = stream;
    });
</script>

<h1>Camera!</h1>

<a use:link href="/">Home</a>

<div>
  {#if loading}
    <h1>Loading...</h1>
  {/if}
  <!-- svelte-ignore a11y-media-has-caption -->
  <video autoplay bind:this={videoSource} />
</div>
