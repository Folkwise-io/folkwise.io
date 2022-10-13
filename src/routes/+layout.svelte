<script lang="ts">
  // import Navbar from '$lib/Header/Navbar.svelte';
  import Header from '$lib/Header/Header.svelte';
  import Footer from '$lib/footer.svelte';
  import GlobalStyles from '$lib/global-styles.svelte';
  import PostMetatags from '$lib/post.metatags.svelte';
  // import GoogleAnalytics from '$lib/google-analytics.svelte';

  import { fade } from 'svelte/transition';

  interface Data {
    currentRoute: string;
  }

  export let data: Data;
</script>

<GlobalStyles>
  <div class="wrapper">
    <Header />
    {#key data.currentRoute}
      <div class="content-wrapper" in:fade={{ duration: 150 }} out:fade={{ duration: 150 }}>
        <slot />
      </div>
    {/key}
    <Footer />
  </div>
</GlobalStyles>
<PostMetatags />
<!-- Disabling for now, ethical purposes -->

<!-- <GoogleAnalytics /> -->
<style lang="scss">
  @use 'src/styles/colors' as colors;

  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: colors.$light;
    background-size: cover;
    background-position: center;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    height: 100%;
    min-height: 100%;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    .content-wrapper {
      padding: 0;
    }
  }
</style>
