<script lang="ts">
  import ContactForm from '../../lib/contact-form.svelte';
</script>

<section class="contact-section">
  <div class="contact-container">
    <ContactForm />
  </div>
</section>

<style type="scss">
  @use 'src/styles/colors' as colors;

  .contact-section {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: 1rem auto;
  }

  .contact-container {
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: 1rem;
    // padding: 1rem;
    background-color: colors.$white;
    box-shadow: 0 4px 6px 0 colors.$medium;
  }

  @media screen and (max-width: 768px) {
    section {
      padding: 0.75rem;
    }
  }
</style>
