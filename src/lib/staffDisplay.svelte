<script lang="ts">
  import Icon from './icon.svelte';
  import LinkedinSquare from './icons/linkedin-square.svelte';
  import TwitterSquare from './icons/twitter-square.svelte';
  import Email2 from './icons/email2.svelte';
  import type { StaffMember } from 'src/types';
  import Modal from './modal.svelte';
  import ContactForm from './contact-form.svelte';
  import clientConfig from '$lib/client/clientConfig';

  export let staffMember: StaffMember;

  export let displayConfig: string;

  // const displayConfig = {
  //   post: 'post',
  //   about: 'about'
  // };

  type IconOption = {
    hasProperty?: string | boolean;
    component: any;
  };

  let iconOptions: IconOption[] = [
    {
      hasProperty: staffMember.linkedInURL,
      component: LinkedinSquare
    },
    {
      hasProperty: staffMember.twitterURL,
      component: TwitterSquare
    }
  ];

  if (clientConfig.ffEnableEmailForms) {
    iconOptions.push({
      hasProperty: staffMember.hasEmail,
      component: Email2
    });
  }

  const keyPress = (event: KeyboardEvent) => {
    if (event.key == 'Escape') {
      isOpen = false;
    }
  };

  let onClick = () => {
    isOpen = !isOpen;

    if (isOpen === true) {
      window.addEventListener('keydown', keyPress);
      document.body.style.overflow = 'hidden';
    } else if (isOpen === false) {
      window.removeEventListener('keydown', keyPress);
      document.body.style.overflow = '';
    }
  };

  let isOpen = false;
</script>

{#if displayConfig === 'post'}
  <br />
{/if}

<div class={displayConfig === 'about' ? 'about-staff-container' : 'staff-member-container'}>
  <div class="img-container">
    <img src={staffMember.imgURL} alt={staffMember.firstName} class="staff-member-image" />
  </div>
  <div class="bio-container">
    <h3>{staffMember.firstName} {staffMember.lastName}</h3>
    {#if displayConfig === 'about'}
      <p class="bold-text">{staffMember.role}</p>
    {/if}
    <p>{staffMember.miniBio}</p>
  </div>

  <div class="cta-container">
    {#if staffMember.isAcceptingProjects === true}
      <p class="bold-text accepting">{staffMember.firstName} is accepting new projects!</p>
    {:else}
      <p class="bold-text not-accepting">
        {staffMember.firstName} isn't currently accepting new projects.
      </p>
    {/if}
    <div class="social-container">
      <p class="bold-text">Contact {staffMember.firstName}:</p>

      {#each iconOptions as option}
        {#if option.hasProperty && typeof option.hasProperty != 'boolean'}
          <a href={option.hasProperty} target="_blank" rel="noopener noreferrer">
            <Icon>
              <svelte:component this={option.component} />
            </Icon>
          </a>
        {:else if option.hasProperty === true}
          <button on:click={onClick}>
            <Icon>
              <svelte:component this={option.component} />
            </Icon>
          </button>
        {/if}
      {/each}
    </div>
    {#if isOpen}
      <Modal {isOpen} {onClick}>
        <ContactForm {staffMember} {onClick} />
      </Modal>
    {/if}
  </div>
</div>

<style type="scss">
  @use 'src/styles/colors' as colors;

  .staff-member-container {
    display: grid;
    grid-template-columns: 13% 80%;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'img bio'
      'cta cta';
    gap: 1rem;
    align-items: flex-start;
    width: 100%;

    .staff-member-image {
      grid-area: img;
      width: 100%;
      box-shadow: 0 0 3px 1px colors.$medium;
    }
  }

  .about-staff-container {
    display: grid;
    grid-template-columns: 40% 55%;
    grid-template-rows: 70% 30%;
    grid-template-areas:
      'img bio'
      'img cta';
    gap: 1rem;
    padding: 1.5rem;
    background-color: colors.$white;
    color: colors.$white;
    box-shadow: 0 4px 6px 0 colors.$medium;
    transition: all 300ms;

    .bio-container {
      grid-area: bio;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      h3 {
        font-size: 1.375rem;
      }

      p {
        font-size: 1rem;
      }

      .bold-text {
        margin-bottom: 0.5rem;
      }
    }
  }

  .img-container {
    grid-area: img;
  }

  .bio-container {
    grid-area: bio;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h3 {
      font-size: 1rem;
    }

    p {
      font-size: 0.875rem;
    }
  }

  .cta-container {
    grid-area: cta;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p {
      font-size: 1rem;
    }
  }

  .social-container {
    display: flex;
    gap: 1rem;
    align-items: center;

    button {
      padding: 0;
      background-color: transparent;
      border: none;
      outline: none;
    }
  }

  .staff-member-image {
    grid-area: img;
    width: 100%;
    box-shadow: 0 0 3px 1px colors.$medium;
  }

  .accepting {
    color: colors.$highlight-green;
  }

  .not-accepting {
    color: colors.$grey;
  }

  @media screen and (max-width: 767px) {
    .staff-member-container {
      display: flex;
      flex-direction: column;
    }

    .about-staff-container {
      display: flex;
      flex-direction: column;

      .bio-container {
        h3 {
          text-align: center;
        }

        p:nth-child(2) {
          text-align: center;
        }
      }
    }
  }

  @media screen and (max-width: 440px) {
    .staff-member-container {
      .staff-member-image {
        max-width: 40%;
        border-radius: 50%;
      }
    }

    .bio-container {
      grid-template-columns: 1fr;
    }
  }
</style>
