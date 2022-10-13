<script>
  import clientConfig from '$lib/client/clientConfig';
</script>

<footer class="footer">
  <div class="footer-content-container">
    <h3 class="footer-heading">Folkwise</h3>
    <div class="company-container">
      <ul>
        <li><a class="footer-link" href="/">Home</a></li>
        <li><a class="footer-link" href="/about">About</a></li>
        <li><a class="footer-link" href="/blog">Blog</a></li>
        {#if clientConfig.ffEnableEmailForms}
          <li><a class="footer-link" href="/contact">Contact</a></li>
        {/if}
      </ul>
      <p class="copyright">© Copyright 2022 Zero Projects Inc.</p>
    </div>
    <!-- <div class="other-container">
      <ul>
        <li>
          <a
            class="footer-link"
            href="https://www.termsfeed.com/live/c9f4b307-4183-40e6-a29b-6c4dc5183b4b"
            >Terms & Conditions</a
          >
        </li>
        <li>
          <a
            class="footer-link"
            href="https://www.termsfeed.com/live/41d7490d-b01f-4b82-ac49-01af97aefddd">Privacy</a
          >
        </li>
      </ul>
    </div> -->
  </div>
</footer>

<style type="scss">
  @use 'src/styles/colors' as colors;

  .footer {
    padding: 2rem 1rem;
    background-color: colors.$dark;
    background-image: colors.$dark;
    background-repeat: no-repeat;
    background-size: 60%, 100%;
    background-position: 108% 7%, 0 0;
  }

  .footer-content-container {
    display: flex;
    flex-direction: column;
    // display: grid;
    // grid-template-columns: 20% 25%;
    // grid-template-areas:
    //   'heading heading'
    //   'company other';
    max-width: 800px;
    margin: 0 auto;

    .footer-heading {
      grid-area: heading;
    }

    .company-container {
      grid-area: company;
    }

    .company-container {
      ul {
        display: flex;
        gap: 0.25rem;
        flex-direction: column;
        padding: 0;
      }
    }

    h3 {
      color: colors.$light;
    }

    .footer-link {
      position: relative;
      color: colors.$highlight;
      text-decoration: none;
      list-style: none;

      &:hover {
        color: colors.$light;

        &::after {
          opacity: 1;
        }
      }

      &::after {
        position: absolute;
        bottom: -1px;
        left: 0;
        content: '';
        width: 100%;
        height: 2px;
        background-color: colors.$light;
        opacity: 0;
        transition: all 300ms;
      }
    }
  }

  .copyright {
    max-width: 800px;
    margin: 0 auto;
    color: colors.$white;
    font-size: 0.875rem;
    text-align: left;
  }

  @media screen and (max-width: 768px) {
    .footer {
      background-color: colors.$dark;
    }
  }
</style>
