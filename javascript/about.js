let typingTimer = null;
export function loadAbout() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="about-wrapper">
      <button id="homeBtn" class="home-btn" style="display:none;">Home</button>
      <div class="terminal-window">
        
        <!-- Header -->
        <div class="terminal-header">
          <div class="dots">
            <span class="red"></span>
            <span class="yellow"></span>
            <span class="green"></span>
          </div>
          <div class="title">About Me</div>
        </div>

        <!-- Body -->
        <div class="terminal-body">
          <div id="aboutContent"></div>
            <div class="prompt-line" id="promptLine" style="display: none;">
               <span class="prompt">&gt;</span>
               <span class="cursor"></span>
            </div>
        </div>

      </div>
       
        
    </div>
  `;

 


  startAboutTyping();
  

function startAboutTyping() {
  const target = document.getElementById('aboutContent');
  const prompt = document.getElementById('promptLine');

  // 🛑 STOP previous execution
  if (typingTimer) {
    clearTimeout(typingTimer);
    typingTimer = null;
  }

  // reset UI
  target.innerHTML = '';
  prompt.style.display = 'none';

  const content = [
    { text: '> Jeyashankar.profile', type: 'command' },
    { text: '"Senior .NET Developer with 10+ years experience in full-stack development."', type: 'value' },

    { text: '> Jeyashankar.summary', type: 'command' },
    { text: '"Expert in building scalable applications using Angular, ASP.NET Core, Web API, and SQL Server."', type: 'value' },

    { text: '> Jeyashankar.skills.backend', type: 'command' },
    { text: '[".NET Core", "Web API", "Entity Framework", "ADO.NET"]', type: 'value' },

    { text: '> Jeyashankar.skills.frontend', type: 'command' },
    { text: '["Angular", "Blazor", "HTML", "CSS", "JavaScript", "jQuery"]', type: 'value' },

    { text: '> Jeyashankar.skills.database', type: 'command' },
    { text: '["SQL Server", "MySQL"]', type: 'value' },

    { text: '> Jeyashankar.tools', type: 'command' },
    { text: '["Git"]', type: 'value' },

    { text: '> Jeyashankar.education', type: 'command' },
    { text: '"Master of Computer Applications (MCA)"', type: 'value' },

    { text: '> Jeyashankar.contactInfo', type: 'command' },
    {
      type: 'links',
      links: [
        { label: 'Email', url: 'mailto:jeyashankar.s@gmail.com' }, 
        { label: 'LinkedIn', url: 'https://linkedin.com' },
        { label: 'GitHub', url: 'https://github.com' }
      ]
    },

    { text: '> Jeyashankar.CV', type: 'command' },
    {
      type: 'link',
      label: 'Download CV',
      url: '/assets/Jeyashankar_CV.pdf'
    }
  ];

  let line = 0;
  let char = 0;
  let currentLineEl = null;

  function type() {
    if (line >= content.length) {
      typingTimer = null;
      prompt.style.display = 'flex';
      console.log('The End')
      document.getElementById('promptLine').style.display = 'flex';

  const homeBtn = document.getElementById('homeBtn');
  homeBtn.style.display = 'block';

  setTimeout(() => {
    homeBtn.style.opacity = '1'; // smooth fade
  }, 50);

  // attach click
  homeBtn.addEventListener('click', () => {
    //window.location.hash = ''; // go home
    homeBlast(homeBtn);
  });
      return;
    }

    const current = content[line];

    //  VALUE
    if (current.type === 'value') {
      const div = document.createElement('div');
      div.className = 'value';
      div.textContent = current.text;
      target.appendChild(div);

      line++;
      typingTimer = setTimeout(type, 200);
      return;
    }

    //  LINKS
    if (current.type === 'links') {
      const div = document.createElement('div');
      div.className = 'value';

      let html = '[';
      current.links.forEach((l, i) => {
        html += `<a href="${l.url}" target="_blank">${l.label}</a>`;
        if (i < current.links.length - 1) html += ', ';
      });
      html += ']';

      div.innerHTML = html;
      target.appendChild(div);

      line++;
      typingTimer = setTimeout(type, 300);
      return;
    }

    // SINGLE LINK
    if (current.type === 'link') {
      const div = document.createElement('div');
      div.className = 'value';
      div.innerHTML = `" <a href="${current.url}" target="_blank">${current.label}</a> "`;

      target.appendChild(div);

      line++;
      typingTimer = setTimeout(type, 300);
      return;
    }

    //  COMMAND (typing)
    if (char === 0) {
      currentLineEl = document.createElement('div');
      currentLineEl.className = 'command';
      target.appendChild(currentLineEl);
    }

    currentLineEl.textContent += current.text.charAt(char);
    char++;

    if (char < current.text.length) {
      typingTimer = setTimeout(type, 20);
    } else {
      line++;
      char = 0;
      typingTimer = setTimeout(type, 200);
    }
  }

  type();
}

function homeBlast(btn) {
  
  const rect = btn.getBoundingClientRect();
  const text = btn.innerText;

  btn.style.visibility = 'hidden';

  // pick random letter index
  const targetIndex = Math.floor(Math.random() * text.length);

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.innerText = text[i];
    span.className = 'blast-letter';

    // 👉 starting position
    const startX = rect.left + i * 14;
    const startY = rect.top;

    span.style.left = startX + 'px';
    span.style.top = startY + 'px';

    // span.style.left = rect.left + i * 14 + 'px';
    // span.style.top = rect.top + 'px';

    // ✅ ADD IT HERE (inside loop)
    span.style.setProperty('--start-x', startX + 'px');
    span.style.setProperty('--start-y', startY + 'px');

    if (i === targetIndex) {
      // 🎯 this letter goes to center
      span.classList.add('to-center');
    } else {
      // 💥 random explosion
      const x = (Math.random() - 0.5) * 500 + 'px';
      const y = (Math.random() - 0.5) * 500 + 'px';

      span.style.setProperty('--x', x);
      span.style.setProperty('--y', y);
    }

    document.body.appendChild(span);

    // remove exploded letters
    if (i !== targetIndex) {
      setTimeout(() => span.remove(), 800);
    } else {
      // when center animation ends → load about
      span.addEventListener('animationend', () => {
        window.location.hash = '';
        handleRoute();
        span.remove();
      });
    }
  }
};


  
  
}