<script lang="ts">
  import { link } from "svelte-spa-router";
</script>

<h1>Home!</h1>
<h2>
  <a use:link href="/camera">Camera</a> <br />
  <a use:link href="/shell">Shell</a> <br />
  <a use:link href="/uploadImg">Upload IMG</a>
</h2>
