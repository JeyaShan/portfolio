export function loadAbout() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <section class="about-section">
      <div class="about-box">
        <h1>About Me</h1>
        <p>> Loading developer profile...</p>
        <p>> Name: Jeyashankar</p>
        <p>> Role: Senior Software Developer</p>
        <p>> Stack: .NET | Angular | Blazor</p>
      </div>
    </section>
  `;
}