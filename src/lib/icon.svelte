<!-- Source for icon imports: https://github.com/FortAwesome/Font-Awesome -->

<!-- Svelte docs for :global() selector: https://svelte.dev/docs#component-format-style -->

<!-- add class="icon" to the path element of an SVG you want to use in this component -->

<div class="icon-container">
  <slot />
</div>

<style type="scss">
  @use 'src/styles/colors' as colors;

  .icon-container {
    display: flex;
    width: 1.25rem;
    cursor: pointer;
    padding: 0;
    margin: 0;

    :global(.icon) {
      fill: colors.$dark;
      transition: all 300ms;
    }

    &:hover {
      :global(.icon) {
        fill: colors.$highlight-red;
      }
    }
  }
</style>
