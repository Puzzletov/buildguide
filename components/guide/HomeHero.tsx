export function HomeHero() {
  const steps = [
    {
      title: "Choose your outcome",
      body: "Start with what you need to build, not with tools.",
    },
    {
      title: "Set constraints",
      body: "Define budget, speed, and quality so recommendations fit your context.",
    },
    {
      title: "Execute one step at a time",
      body: "Follow setup, debugging, and launch flow without cognitive overload.",
    },
  ];

  return (
    <section className="home-hero">
      <article className="hero-copy-card">
        <div className="step-badge badge-blue">Build with clarity</div>
        <h1 className="screen-title">Build with AI, but ship with engineering discipline.</h1>
        <p className="screen-sub">
          BuildGuide gives you practical, staged guidance so you can choose tools correctly, configure them safely, and
          move from setup to production without missing critical steps.
        </p>
        <div className="hero-meta-strip">
          <div className="hero-meta-pill">Decision support</div>
          <div className="hero-meta-pill">Step-by-step setup</div>
          <div className="hero-meta-pill">Debug and launch flow</div>
        </div>
      </article>

      <article className="hero-flow-card" aria-label="How the guide works">
        <h2>How the guide works</h2>
        <div className="hero-flow-list">
          {steps.map((item, index) => (
            <div className="hero-flow-item" key={item.title}>
              <div className="hero-dot">{index + 1}</div>
              <div>
                <div className="hero-flow-title">{item.title}</div>
                <p>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
