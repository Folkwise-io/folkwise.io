<script lang="ts">
  let source: string;
</script>

<div class="podcast-container">
  <div class="player-container">
    <img
      class="podcast-thumb"
      src="/assets/Folkwise_podcast_cover.png"
      alt="people around a gold sphere"
      srcset=""
    />
    <audio controls>
      <source
        src="https://stream.redcircle.com/episodes/fb115370-d6ce-4647-9762-6203cb7ab7d5/stream.mp3"
      />
    </audio>
  </div>
  <div class="info-container">
    <div class="episode-info">
      <h2>Episode 2</h2>
      <p>
        With his insight into the world of transmedia, our guest Jeff Gomez shares his own story
        about starting an enterprise that helps other businesses establish their narrative. We also
        touch on friction in storytelling, along with the current state of social media.
      </p>
    </div>
    <div class="guests-container">
      <div class="guest">
        <p class="bold-text">Host</p>
        <img src="/assets/david-optimized.jpg" alt="host david" />
        <p>David Marshall</p>
      </div>
      <div class="guest">
        <p class="bold-text">Guest</p>
        <img src="/assets/guest-photos/jeffgomez.png" alt="jeff gomez" />
        <p>Jeff Gomez</p>
      </div>
    </div>
  </div>
</div>

<style type="scss">
  @use 'src/styles/colors' as colors;

  .podcast-container {
    display: flex;
    gap: 1rem;
    padding: 2rem 3rem;

    margin: 0 auto;
    border-radius: 25px;
    background-image: linear-gradient(
        to right,
        colors.$dark,
        colors.$dark-85,
        colors.$dark,
        colors.$dark
      ),
      url('/assets/kikko-light-optimized.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 175%, 120%;

    :global(h2),
    :global(p) {
      color: colors.$white;
    }
  }

  .info-container {
    display: flex;
    flex-direction: column;
    max-width: 60%;
    justify-content: space-between;
  }

  .podcast-thumb {
    width: 100%;
    box-shadow: 0 2px 8px 1px colors.$dark-85;
  }

  audio {
    width: 100%;
    margin-top: 1rem;
  }

  .guests-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.75rem;
  }

  .guest {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
    text-align: center;

    img {
      width: 70%;
      border-radius: 50%;
    }

    p {
      font-size: 0.75rem;
    }
  }

  @media screen and (max-width: 767px) {
    .podcast-container {
      flex-direction: column;
      padding: 1rem;
      border-radius: 0;
      background-color: transparent;
      background-image: none;
    }

    .info-container {
      max-width: 100%;
      gap: 1rem;
    }

    .guests-container {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
