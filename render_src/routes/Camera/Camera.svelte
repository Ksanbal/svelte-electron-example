<script lang="ts">
  import { link } from "svelte-spa-router";
  // import { writeFile } from "fs";

  let videoSource: HTMLMediaElement | null = null;
  let loading = true;
  let imgSource: HTMLImageElement | null = null;

  navigator.mediaDevices
    .getUserMedia({
      video: true,
    })
    .then((stream: MediaStream) => {
      loading = false;
      videoSource.srcObject = stream;
    });

  function captureImg() {
    const video: HTMLVideoElement = document.getElementById(
      "video"
    ) as HTMLVideoElement;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // draw the video at the frame
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/jpeg");

    // 이미지 미리보기
    imgSource.src = dataURL;
    console.log(dataURL);
  }

  function saveImg() {
    // writeFile("test.jpg", imgSource.src, (error) => {
    //   console.log(error);
    // });
  }
</script>

<h1>Camera!</h1>

<a use:link href="/">Home</a>

<div>
  {#if loading}
    <h1>Loading..</h1>
  {/if}
  <!-- svelte-ignore a11y-media-has-caption -->
  <video autoplay id="video" bind:this={videoSource} />
</div>

<div>
  <img id="image" alt="Capture IMG" bind:this={imgSource} />
</div>

<button on:click={captureImg}>Capture Image!</button>
<button on:click={saveImg}>Save Image!</button>
