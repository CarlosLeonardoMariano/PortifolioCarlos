const words = [
  "DESENVOLVEDOR FULL STACK",
  "ESPECIALIZADO EM BACK-END E SQL",
  "ADS - UNIVERSIDADE SÃO FRANCISCO",
  "NODE, EXPRESS, NESTJS, NEXTJS"
];

let frase = 0;
let letra = 0;

function escrever() {
  const elemento = document.getElementById("typewriter");

  if (letra < words[frase].length) {
    elemento.textContent += words[frase][letra];
    letra++;
    setTimeout(escrever, 80);
  } else {
    setTimeout(apagar, 1500);
  }
}

function apagar() {
  const elemento = document.getElementById("typewriter");

  if (letra > 0) {
    elemento.textContent = words[frase].substring(0, letra - 1);
    letra--;
    setTimeout(apagar, 40);
  } else {
    frase = (frase + 1) % words.length;
    setTimeout(escrever, 300);
  }
}

escrever();

/* Menu hamburguer */
function toggleMenu() {
  document.getElementById('ham').classList.toggle('open');
  document.getElementById('nav-mobile').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('ham').classList.remove('open');
  document.getElementById('nav-mobile').classList.remove('open');
}

/* Scroll reveal */
const revObs = new IntersectionObserver(entries =>
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
  { threshold: 0.08 }
);
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* Skill bars */
const pbObs = new IntersectionObserver(entries =>
  entries.forEach(e => { if (e.isIntersecting) e.target.style.width = e.target.dataset.w + '%'; }),
  { threshold: 0.4 }
);
document.querySelectorAll('.skill-fill').forEach(el => pbObs.observe(el));

/* Scroll: botão voltar ao topo + nav highlight */
window.addEventListener('scroll', () => {
  document.getElementById('back-top').classList.toggle('show', scrollY > 400);
  document.getElementById('nav').style.background =
    scrollY > 10 ? 'rgba(9, 9, 11, 0.95)' : 'rgba(9, 9, 11, 0.8)';

  let cur = '';
  document.querySelectorAll('[id]').forEach(s => {
    if (scrollY >= s.offsetTop - 80) cur = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--heading)' : '';
    a.style.fontWeight = a.getAttribute('href') === '#' + cur ? '700' : '500';
  });
});

/* Formulário de contato */
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('form-status');
  const btn = form.querySelector('.form-submit');

  btn.textContent = 'Enviando...';
  btn.disabled = true;

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      status.textContent = '✓ Mensagem enviada! Te respondo em breve.';
      status.style.color = 'var(--primary)';
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    status.textContent = '✗ Erro ao enviar. Tente pelo WhatsApp.';
    status.style.color = '#ef4444';
  }

  btn.textContent = 'Enviar mensagem';
  btn.disabled = false;
}



 