<script lang="ts">
  import type { StaffMember, ToastNotification } from '../types';
  import { showNotification } from '../stores/showNotification';
  import Notification from './notification.svelte';
  import { getNotification } from '../notifications';
  import clientConfig from './client/clientConfig';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  console.log('Enable forms:', clientConfig.ffEnableEmailForms);

  // Default undefined to prevent errors on the contact page
  export let staffMember: StaffMember | undefined = undefined;
  export let onClick: Function | undefined = undefined;

  /** @typedef {{
    execute(hcaptchaWidgetID?: string , opts?: { async: boolean }): Promise<HCaptchaExecuteResponse> | null;
    render(id?: string, config?: { sitekey: string; size: string; theme: string }): string | null;
  } | null}*/

  let hcaptcha: HCaptcha;
  let hcaptchaWidgetID: string;

  onMount(() => {
    if (browser) {
      hcaptcha = window.hcaptcha;
      // window.handleSubmit = handleSubmit;
      if (hcaptcha.render) {
        hcaptchaWidgetID = hcaptcha.render('hcaptcha', {
          sitekey: clientConfig.hCaptchaSiteKey,
          size: 'invisible',
          theme: 'dark'
        });
      }
    }
  });

  onDestroy(() => {
    if (browser) {
      hcaptcha = { execute: async () => ({ response: '' }), render: () => {} };
    }
  });

  let name = '';
  let email = '';
  let message = '';
  let username: string;

  if (staffMember) {
    username = staffMember.username;
  } else {
    username = 'monarchwadia';
  }

  let notification: ToastNotification | undefined;

  // Validation
  let errors = {
    name: '',
    email: '',
    message: ''
  };

  let valid = true;

  const validateForm = (name: string, email: string, message: string) => {
    console.log('validation started');

    if (!name.trim()) {
      valid = false;
      showNotification.set(true);
      notification = getNotification('form-error');
      errors.name = 'Please enter your name';
      console.log('name error');
    } else {
      errors.name = '';
    }

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      valid = false;
      showNotification.set(true);
      notification = getNotification('form-error');
      errors.email = 'Please enter a valid email';
      console.log('email error');
    } else {
      errors.email = '';
    }

    if (message.length < 10) {
      valid = false;
      showNotification.set(true);
      notification = getNotification('form-error');
      errors.message = 'Message must be at least 10 characters long.';
      console.log('message error');
    } else {
      errors.message = '';
    }

    if (errors.name === '' && errors.email === '' && errors.message === '') {
      valid = true;
      showNotification.set(false);
    }

    if (valid) {
      // Move this notification to backend on successful email send
      console.log('Form validation successful');
    }
  };

  const clearFormFields = () => {
    name = '';
    email = '';
    message = '';
  };

  const handleSubmit = async () => {
    try {
      const { response: hCaptchaResponse } = (await hcaptcha.execute(hcaptchaWidgetID, {
        async: true
      })) as HCaptchaResponse;

      validateForm(name, email, message);

      if (valid) {
        // submitForm();
        console.log('beginning fetch');

        await fetch('api/verify', {
          method: 'POST',
          credentials: 'omit',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            message,
            username,
            response: hCaptchaResponse
          })
        });

        clearFormFields();

        if (onClick) {
          onClick();
        }
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      showNotification.set(true);
      notification = getNotification('error');
    }
  };

  let vwidth: number;
</script>

<!-- Svelte's method for getting window properties: https://svelte.dev/tutorial/svelte-window-bindings -->
<svelte:window bind:innerWidth={vwidth} />

<svelte:head>
  <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
</svelte:head>

<form id="contact-form" class="contact-form" method="POST" on:submit|preventDefault={handleSubmit}>
  {#if staffMember}
    <h1>Contact {staffMember.firstName}</h1>
  {:else}
    <h1>Get in touch with us</h1>
  {/if}
  {#if $showNotification}
    <div class="notification">
      <Notification {notification} />
    </div>
  {/if}
  <div class="form-group">
    <label for="name">Name</label>
    <input bind:value={name} type="text" class="text" id="name" placeholder="Name" novalidate />
    {#if errors.name}
      <div class="validation">{errors.name}</div>
    {/if}
  </div>
  <div class="form-group">
    <label for="email">Email</label>
    <input bind:value={email} type="text" class="text" id="email" placeholder="Email" novalidate />
    {#if errors.email}
      <div class="validation">{errors.email}</div>
    {/if}
  </div>
  <div class="form-group">
    <label for="message">Message</label>
    <textarea
      bind:value={message}
      name="message"
      id="message"
      rows="8"
      cols={vwidth > 767 ? 30 : null}
      placeholder="Type your message"
      novalidate
    />
    {#if errors.message}
      <div class="validation">{errors.message}</div>
    {/if}
  </div>
  <!-- <Captcha {handleSubmit} /> -->
  <!-- <button
    type="submit"
    class="h-captcha"
    data-sitekey={clientConfig.hCaptchaSiteKey}
    data-callback={handleSubmit}
  >
    Send
  </button> -->
  <div
    id="hcaptcha"
    class="h-captcha"
    data-sitekey={clientConfig.hCaptchaSiteKey}
    data-size="invisible"
    data-theme="dark"
  />

  <button type="submit"> Send </button>
</form>

<style type="scss">
  @use 'src/styles/colors' as colors;

  .contact-form {
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: 1rem;
    padding: 1rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    color: colors.$highlight;
    background-color: colors.$dark;
    font-weight: 700;
    text-decoration: none;
    border-radius: 4px;
    border: none;
    outline: none;
    transition: all 300ms;

    &:disabled {
      color: colors.$medium;
      background-color: colors.$grey;
    }

    &:not(:disabled):hover {
      color: colors.$dark;
      background-color: colors.$highlight;
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;

    label {
      font-size: 0.875rem;
    }

    input,
    textarea {
      color: colors.$white;
      background-color: colors.$dark-85;
      outline: none;
      border: none;
      padding: 0.5rem;
      transition: all 300ms;
      margin: 0.25rem 0;
      border-radius: 3px;

      &::placeholder {
        color: colors.$medium;
      }

      &:focus {
        background-color: colors.$dark;
        outline: 1px solid colors.$highlight-green;
        box-shadow: 0 0 4px 1px colors.$highlight-green, inset 0 0 4px 2px colors.$highlight-green;
      }
    }
  }

  .validation {
    color: colors.$highlight-red;
    font-size: 0.625rem;
  }

  @media screen and (max-width: 768px) {
    .contact-form {
      padding: 0.75rem;

      h1 {
        font-size: 1.25rem;
      }
    }
  }
</style>
