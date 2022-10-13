<script lang="ts">
  import clientConfig from '$lib/client/clientConfig';
  import Hamburger from '../hamburger.svelte';
  import { page } from '$app/stores';
  // import { navActive } from './navStore';

  let isOpen = false;

  let vwidth: number;

  // const navItems = [
  //   { name: 'Home', href: '/' },
  //   { name: 'Blog', href: '/blog' },
  //   { name: 'About', href: '/about' },
  //   { name: 'Contact', href: '/contact' }
  // ];
</script>

<!-- Svelte's method for getting window properties: https://svelte.dev/tutorial/svelte-window-bindings -->
<svelte:window bind:innerWidth={vwidth} />

<div class="navbar-wrapper">
  <div class="navbar">
    <a href="/" class="logo"><img src="/assets/wordmark.png" alt="logo" title="test" /></a>
    {#if isOpen || vwidth >= 768}
      <div class={isOpen === true ? 'navlink-container' : 'navlink-container hidden-nav'}>
        <ul>
          <!-- {#each navItems as item} -->
          <!-- {#if item.name === 'Contact'} -->
          <li class:active={$page.url.pathname === `/`}>
            <a
              href="/"
              on:click={() => {
                isOpen = false;
                // navActive.set(item.name);
                console.log($page.url.pathname);
              }}
            >
              Home
            </a>
          </li>
          <li class:active={$page.url.pathname === `/blog`}>
            <a
              href="/blog"
              on:click={() => {
                isOpen = false;
                // navActive.set(item.name);
                console.log($page.url.pathname);
              }}
            >
              Blog
            </a>
          </li>

          <li class:active={$page.url.pathname === `/about`}>
            <a
              href="/about"
              on:click={() => {
                isOpen = false;
                // navActive.set(item.name);
                console.log($page.url.pathname);
              }}
            >
              About
            </a>
          </li>

          {#if clientConfig.ffEnableEmailForms}
            <li class:active={$page.url.pathname === `/contact`}>
              <a
                href="/contact"
                on:click={() => {
                  isOpen = false;
                  // navActive.set(item.name);
                  console.log($page.url.pathname);
                }}
              >
                Contact
              </a>
            </li>
          {/if}
          <!-- {:else} -->

          <!-- {/if} -->
          <!-- {/each} -->
        </ul>
      </div>
    {/if}
    <Hamburger {isOpen} onClick={() => (isOpen = !isOpen)} />
  </div>
</div>

<style type="scss">
  @use 'src/styles/colors' as colors;
  @use 'src/styles/sizing' as sizing;

  .navbar-wrapper {
    background-color: colors.$dark;
    border-bottom: 1px solid colors.$medium;
  }

  .navbar {
    position: relative;
    gap: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 0 auto;
    padding: 0;
    max-width: 800px;

    // background: linear-gradient(250deg, colors.$dark 22%, colors.$dark-85 90%);

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 0;
      img {
        max-width: 8rem;
      }
    }

    ul {
      display: flex;
      align-items: center;
      list-style: none;
      gap: 1.25rem;
      margin: 0;
      padding: 0;

      li {
        display: flex;
        align-items: center;
        height: 3rem;
        border-bottom: 2px solid transparent;
        transition: all 300ms;

        &:hover {
          border-bottom: 2px solid colors.$light;
        }

        a {
          position: relative;
          text-decoration: none;
          color: colors.$highlight;
          transition: all 300ms;

          &:hover {
            color: colors.$light;
          }
        }
      }

      li.active {
        border-bottom: 2px solid colors.$highlight;
      }
    }
  }

  .hidden-nav {
    display: none;
  }

  @media screen and (max-width: 767px) {
    .navbar {
      padding: 0.75rem 0.75rem 0 0.75rem;
      height: 4rem;
    }

    .navlink-container {
      position: absolute;
      margin: 0;
      padding: 0;
      right: 0;
      top: 4rem;
      width: 75%;
      // border: yellow solid;
      background-color: colors.$dark;

      ul {
        flex-direction: column;
        gap: 0;
        align-items: center;
        padding: 1rem 1rem 0 1rem;

        li {
          width: 80%;
          padding: 1rem 0.5rem;
          border-top: 1px solid colors.$white;
        }

        li.active {
          border-right: 2px solid colors.$highlight;
          border-bottom: 2px solid transparent;
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    .hidden-nav {
      display: flex;
    }
  }
</style>
