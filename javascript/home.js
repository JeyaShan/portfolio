const lines = [
    { el: 't1', text: "Hi, I'm Jeyashankar" },
    { el: 't2', text: ".NET & Angular Developer" },
    { el: 't3', text: "I build scalable web applications using .NET, Blazor, and Angular. Passionate about clean UI, performance, and modern architecture." }
  ];

  const caret = document.createElement('span');
  caret.className = 'caret';

  function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

  async function typeInto(element, text){
    element.textContent = '';
    element.appendChild(caret);
    for(let i=0;i<text.length;i++){
      element.insertBefore(document.createTextNode(text[i]), caret);
      await sleep(25 + Math.random()*45);
    }
    await sleep(300);
  }

  async function runTyping(){
    for(const item of lines){
      const el = document.getElementById(item.el);
      await typeInto(el, item.text);
    }
    // keep caret at the very end (after 'architecture.')
    const lastEl = document.getElementById('t3');
    lastEl.appendChild(caret);
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
      document.getElementById('main').style.display = 'flex';
      runTyping();
    }, 2000);
  });