<script lang="ts">
  import type { Post as PostType, StaffMember as StaffType } from '../types';
  import StaffDisplay from './staffDisplay.svelte';

  export let post: PostType;
  export let staffMember: StaffType;
</script>

<div class="post">
  {@html post.html}
  <br />

  <StaffDisplay {staffMember} displayConfig="post" />

  <br />
  <a class="post-link" href={post.slug}>Link to this post</a>
</div>

<style lang="scss">
  @use 'src/styles/colors' as colors;
  @use 'src/styles/sizing' as sizing;

  .post {
    display: flex;
    flex-direction: column;
    margin: 1rem auto;
    padding: 2rem;
    background-color: colors.$white;
    box-shadow: 0 4px 6px 0 colors.$medium;

    a {
      color: colors.$highlight-red;
    }
  }

  .post-link {
    position: relative;
    font-weight: 600;
    text-decoration: none;
    transition: all 300ms;

    &:hover {
      color: colors.$dark;

      &::after {
        opacity: 1;
      }
    }

    &::after {
      position: absolute;
      bottom: -4px;
      left: 0;
      content: '';
      width: 100%;
      height: 2px;
      background-color: colors.$dark;
      opacity: 0;
      transition: all 300ms;
    }
  }

  @media screen and (max-width: 768px) {
    .post {
      // margin: 1rem auto;
      padding: 0.75rem;
    }
  }
</style>
