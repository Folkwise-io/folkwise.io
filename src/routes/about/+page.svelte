<script lang="ts">
  import type { StaffMember as StaffType } from '../../types';
  import type { PageData } from './$types';
  import StaffDisplay from '$lib/staffDisplay.svelte';

  export let data: PageData;

  const staffMembers: StaffType[] = data.staff;
</script>

<div class="about-container">
  <section>
    <h1 class="large-header">Folkwise</h1>
    <div class="section-content">
      <div>
        <h2>Who we are</h2>
        <p class="base-text">
          We're a small group of freelance software developers. We come from many different
          backgrounds, and we each have specialist expertise in different industries and fields.
        </p>
      </div>
      <div>
        <h2>How we can help you</h2>
        <p class="base-text">
          Ethical software products are good for your user and good for your business. We help you
          build software that your users can trust, and that naturally grow on platforms like Slack,
          Discord, Twitter, Facebook, and LinkedIn. We do this through a combination of full-stack
          software development, ethical UX design, and community building.
        </p>
      </div>
      <div>
        <h2>The technologies we use</h2>
        <p class="base-text">
          As custom software developers, we fit the tool to your project. We enjoy React, Svelte,
          Node, Python, Java, PostgreSQL, Firebase. We also enjoy using marketing tools like
          Mailchimp, Hubspot, Orbit, Outreach, and Unbounce.
        </p>
      </div>
    </div>
  </section>

  <section>
    <h1>What we value</h1>
    <div class="section-content">
      <div>
        <h2>Above All: To Care for Others</h2>
        <p class="base-text">
          First, the users of the product. Second, our respected clients. Third, the Folkwise team.
        </p>
      </div>
      <div>
        <h3>To Teach</h3>
        <p class="base-text">
          For all developers on the team, 10 hours per week are dedicated to teaching others. This
          can take the form of classes, articles, social media posts, group mentorship, or anything
          else.
        </p>
      </div>
      <div>
        <h3>To Be Uncontrived</h3>
        <p class="base-text">
          We use the easiest words that convey the meaning and the simplest tools that fit the
          project.
        </p>
      </div>
      <div>
        <h3>To Be Ourselves</h3>
        <p class="base-text">We put our names next to the work we do.</p>
      </div>
    </div>
  </section>
  <section>
    <h1>How We Work</h1>
    <div class="section-content">
      <p class="base-text">
        Being an asynchronous company, we have few scheduled meetings. Instead, we prioritize deep
        work and minimize distractions. Everyone codes, everyone is a decision maker, and everyone
        understands our values. We agree with our clients on our end-goals, and then we
        over-communicate as we drive towards them.
      </p>
    </div>
  </section>

  <section>
    <h1>Who we are</h1>
    <div class="team-container">
      {#each staffMembers as member}
        <StaffDisplay staffMember={member} displayConfig="about" />
      {/each}
    </div>
  </section>
</div>

<style type="scss">
  @use 'src/styles/colors' as colors;

  .about-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    min-height: 100%;
    max-width: 800px;
    margin: 2rem auto;
    background-color: colors.$light;

    section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .section-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 2rem 1rem;
      background-color: colors.$white;
      box-shadow: 0 4px 6px 0 colors.$medium;
    }
  }

  .team-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: left;
  }

  @media screen and (max-width: 768px) {
    .about-container {
      margin: 0.75rem auto;
      padding: 0.75rem 0;
      max-width: 100%;

      section {
        padding: 0.75rem;
      }
    }
  }
</style>
