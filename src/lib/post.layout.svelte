<script>
  // @ts-nocheck
  // we're using @ts-nocheck because mdsvex does not handle TS files yet, as per https://github.com/pngwn/MDsveX/issues/116

  // This file is specified in svelte.config.js
  export let title; // string
  export let date; // date
</script>

<div class="post-content-container">
  <h1>{title}</h1>
  <em class="date">
    {new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}
  </em>
  <slot />
</div>

<style lang="scss">
  .post-content-container {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    margin: 0 auto;
  }

  @media screen and (max-width: 767px) {
    .post-content-container {
      h1 {
        font-size: 1.25rem;
      }

      em {
        font-size: 0.85rem;
      }
    }
  }
  /* For some reason, SCSS doesn't work in this file. */
</style>
