const menu = document.getElementById('menu');
const nav = document.getElementById('navbar');

menu.addEventListener('click', () => {
  nav.classList.toggle('ativo')
})

document.querySelectorAll('#navbar a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('ativo');
  })
})

//maquina de escrever
const palavras = ["Estilo", "Precisão", "Atitude"];
const texto = document.getElementById('texto-dinamico');
let palavraIndex = 0;
let letraIndex = 0;
let apagando = false;

function digitar(){
  const palavra = palavras[palavraIndex];
  if(apagando){
    letraIndex--;
    texto.textContent = palavra.substring(0, letraIndex);
     if(letraIndex === 0){
      apagando = false;
      palavraIndex = (palavraIndex + 1) % palavras.length;
      setTimeout(digitar, 500);
      return;
     }
  } else {
    letraIndex++;
    texto.textContent = palavra.substring(0, letraIndex);
    if (letraIndex === palavra.length){
      apagando = true;
      setTimeout(digitar, 500);
      return;
    }
  }

  setTimeout(digitar, apagando ? 60 : 100);
}
digitar();


/*mudança no background do header ao dar scroll*/
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');

  if(window.scrollY > 50){
    header.classList.add('scroll');
  } else{
    header.classList.remove('scroll');
  };
});


//animação contagem de anos de experiência
const anos = document.getElementById('anos-experiencia');

let contador = 0;
const tempo = 100;
const total = 8;
let jaAnimou = false;

const animarAno = () => {
  const intervalo = setInterval(() => {
    contador++;
    anos.textContent = `+${contador}`;

    if(contador === total){
      clearInterval(intervalo);
      anos.classList.add('zoom-bounce');
      setTimeout(() => {
        anos.classList.remove('zoom-bounce');  
      }, 800);
    };
  }, tempo);
};

window.addEventListener('scroll', () => {
  const top = anos.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if(top < windowHeight && !jaAnimou){
    jaAnimou = true;
    animarAno();
  }
});


//funcional do modal
const modal = document.getElementById('modal-certificado');
const modalImg = document.getElementById('img-certificado');
const fechar = document.querySelector('.fechar');
const header = document.querySelector('header');

document.querySelectorAll(".certificado").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    header.style.display = "none";
    modalImg.src =  img.dataset.img;
  });
});

//botão de fechar
fechar.addEventListener('click', () => {
  modal.style.display = 'none';
  header.style.display = "block"
});

window.addEventListener('click', (e) => {
  if(e.target === modal){
    modal.style.display = "none";
    header.style.display = "block"
  };
});


//funcionamento do slide na section serviços
const slider = document.querySelector('.slider');
const card = document.querySelectorAll('.card-servico');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');

let currentIndex = 0;
const totalCards = card.length;
const cardWidth = card[0].offsetWidth + 16;

function moverSlide(){
  const offset = -(currentIndex * cardWidth);
  slider.style.transform = `translateX(${offset}px)`;
}

//avançar slide
btnNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalCards;
  moverSlide();
});

//voltar slide
btnPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalCards) % totalCards;
  moverSlide();
});

//garantir funcionamento
window.addEventListener('resize', () => {
  moverSlide();
});

/*agendamento com encaminhamento automático para o WhatsApp*/ 

document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('form-agendamentos');
  if(form){
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const nome = encodeURIComponent(this.nome.value.trim());
      const data = encodeURIComponent(this.data.value.trim());
      const horario = encodeURIComponent(this.horario.value.trim());
      const corte = encodeURIComponent(this.corte.value.trim());

      //validação de data
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const dataSelecionada = new Date(data);

      if (dataSelecionada < hoje){
        alert('Por favor, escolha uma data valída!');
        return;
      }

      const mensagem = `Olá! Quero agendar um corte na Barbearia Realeza.%0A%0A Nome: ${nome}%0A Data: ${data}%0A Horário: ${horario}%0A Corte: ${corte}`;

      const numero = "5511999999999";
      const url = `https://wa.me/${numero}?text=${mensagem}`;

      window.open(url, "_blank");
    });
  } else{
    console.error('Formulário com ID não encontrado.')
  }
});