import Home from "./home/Home.svelte";
import Camera from "./camera/Camera.svelte";
import Shell from "./shell/Shell.svelte";
import UploadImg from "./upload-image/UploadImg.svelte";

export default {
  "/": Home,
  "/camera": Camera,
  "/shell": Shell,
  "/upload-image": UploadImg,
};
