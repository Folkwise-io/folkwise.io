<script lang="ts">
  import Post from '$lib/post.svelte';
  import type { Post as PostType, StaffMember as StaffType } from 'src/types';

  interface Data {
    post: PostType;
    staffMember: StaffType;
  }

  export let data: Data;
</script>

<section>
  <div class="single-post-container">
    <a href="/blog" class="read-more">← Back to Blog</a>
    {#await data.post}
      <div>Loading...</div>
    {:then}
      <Post post={data.post} staffMember={data.staffMember} />
    {:catch}
      <div>An unexpected error occurred.</div>
    {/await}
  </div>
</section>

<style lang="scss">
  @use 'src/styles/colors' as colors;

  .single-post-container {
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
    padding-top: 2rem;
  }

  .read-more {
    position: relative;
    width: fit-content;
    margin: 2rem 0 1rem 0;
    font-size: 24px;
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

  @media screen and (max-width: 767px) {
    section {
      padding: 0.75rem;
    }
  }
</style>
