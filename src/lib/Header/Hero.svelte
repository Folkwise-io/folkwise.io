<script lang="ts">
  import clientConfig from '$lib/client/clientConfig';
</script>

<section class="hero">
  <div class="hero-container">
    <div class="hero-text-container">
      <h1 class="hero-title">We build vibrant communities around ethical software.</h1>
      <p class="bold-text sub-title">
        We write software that respects users' rights, design audience journeys that empower your
        users, and grow communities full of fans.
      </p>
    </div>
    {#if clientConfig.ffEnableEmailForms}
      <div class="hero-cta-container">
        <a class="hero-cta" href="/contact">Let's grow.</a>
      </div>
    {/if}
  </div>
</section>

<style type="scss">
  @use 'src/styles/colors' as colors;
  @use 'src/styles/sizing' as sizing;

  .hero {
    // background-image: url('/assets/kikko-light-optimized.svg');
    // background-size: 100%;
    // background-position: left 2rem top -2rem;
    // background-repeat: no-repeat;
    // background: linear-gradient(300deg, colors.$dark-85 30%, colors.$dark 90%);
    padding: 2rem 0;
    background: radial-gradient(ellipse at right, colors.$dark-85 30%, colors.$dark 90%);
  }

  .hero-container {
    display: flex;
    max-width: 800px;
    margin: 0 auto;
  }

  .hero-text-container {
    display: flex;
    flex-direction: column;
    max-width: 50%;
    gap: 1rem;
    padding: 2rem 0;
    background-color: rbga(0 0 0 0.5);
    p {
      margin: 0;
    }
  }

  .hero-title {
    color: colors.$light;

    font-size: 2.25rem;
    line-height: 2.25rem;
  }

  .sub-title {
    color: colors.$light;
  }

  .hero-cta-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  .hero-cta {
    padding: 0.75rem 2rem;
    color: colors.$highlight;
    background-color: colors.$dark;
    font-weight: 700;
    text-decoration: none;
    border-radius: 6px;
    // box-shadow: 0 0 4px -2px colors.$white;
    transition: all 300ms;

    &:hover {
      color: colors.$dark;
      background-color: colors.$highlight;
    }
  }

  .hero-cta-container {
    padding: 2rem;
  }

  @media screen and (max-width: 768px) {
    .hero {
      display: flex;
      flex-direction: column;
      // margin-inline: -0.75rem;
      background-image: linear-gradient(to bottom, colors.$white, colors.$white, colors.$light);
      background-size: 100%;
    }

    .hero-container {
      display: flex;
      flex-direction: column;
      padding: 1rem 2rem;
    }

    .hero-text-container {
      max-width: 100%;
      padding: 0.75rem;
    }

    .hero-title,
    .sub-title {
      color: colors.$dark;
    }

    .hero-title {
      font-size: 1.875rem;
      line-height: 1.875rem;
    }

    .hero-cta-container {
      padding: 2rem 1rem 0 1rem;
    }
  }
</style>
