/**
 * ALAN RODRIGO ADVOCACIA - JAVASCRIPT DINÂMICO DE ALTA CONVERSÃO
 * Gerenciador de Seletor de Perfil, Triagem Trabalhista e Redirecionamento de WhatsApp
 */

(function () {
  'use strict';

  // Configurações Oficiais do Escritório
  const CONFIG = {
    whatsappNumber: '5531988415959', // (31) 98841-5959
    lawyerName: 'Dr. Alan Rodrigo',
    officeName: 'Alan Rodrigo Advocacia'
  };

  // Cenários do Seletor no Hero
  const SCENARIOS = {
    clt: {
      tag: 'Direitos Rescisórios & CLT',
      desc: 'Análise minuciosa de holerites, aviso prévio, horas extras, justa causa indevida e FGTS para garantir que você receba até o último centavo do que é seu por direito.',
      btnText: 'Falar no WhatsApp sobre Minha Demissão / Direitos',
      whatsappMsg: 'Olá, Dr. Alan Rodrigo. Fui demitido (ou estou com verbas atrasadas) e gostaria de uma orientação jurídica sobre os meus direitos trabalhistas.'
    },
    indireta: {
      tag: 'Rescisão Indireta (Art. 483 CLT)',
      desc: 'Se a empresa atrasa salários, não deposita FGTS, não paga horas extras ou comete assédio moral, você pode "demitir o patrão" e sair com todos os direitos de demissão sem justa causa.',
      btnText: 'Quero Sair da Empresa com Meus Direitos',
      whatsappMsg: 'Olá, Dr. Alan Rodrigo. Gostaria de entender como funciona a rescisão indireta para sair da empresa sem perder meu FGTS, multa e seguro-desemprego.'
    },
    acidente: {
      tag: 'Acidente de Trabalho & Saúde Ocupacional',
      desc: 'Suporte humanizado para trabalhadores com Burnout, problemas graves de coluna, lesões por esforço repetitivo (LER/DORT) ou acidentes físicos. Buscamos estabilidade de 12 meses e indenizações.',
      btnText: 'Falar sobre Acidente ou Doença Ocupacional',
      whatsappMsg: 'Olá, Dr. Alan Rodrigo. Sofri um acidente de trabalho (ou adquiri uma doença ocupacional) e gostaria de orientação sobre estabilidade e indenização.'
    }
  };

  // 1. Inicialização do Seletor no Hero
  function initHeroSelector() {
    const buttons = document.querySelectorAll('.selector-btn');
    const profileTag = document.getElementById('profileTag');
    const profileDesc = document.getElementById('profileDesc');
    const heroDynamicCta = document.getElementById('heroDynamicCta');
    const heroDynamicCtaText = document.getElementById('heroDynamicCtaText');

    if (!buttons.length || !profileTag || !profileDesc || !heroDynamicCta) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', function () {
        buttons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const scenarioKey = this.getAttribute('data-scenario');
        const data = SCENARIOS[scenarioKey] || SCENARIOS.clt;

        profileTag.textContent = data.tag;
        profileDesc.textContent = data.desc;
        if (heroDynamicCtaText) {
          heroDynamicCtaText.textContent = data.btnText;
        }

        const encodedMsg = encodeURIComponent(data.whatsappMsg);
        heroDynamicCta.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMsg}`;
      });
    });
  }

  // 2. Formulário de Triagem Trabalhista em 3 Passos
  function initTriageForm() {
    const triagePills = document.querySelectorAll('.triage-pill');
    const triageMotivo = document.getElementById('triageMotivo');
    const triageTempo = document.getElementById('triageTempo');
    const btnSubmit = document.getElementById('btnSubmitTriage');

    let selectedVinculo = 'CLT / Carteira Assinada';

    // Seleção de Pílula
    triagePills.forEach(pill => {
      pill.addEventListener('click', function () {
        triagePills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        selectedVinculo = this.getAttribute('data-val') || this.innerText.trim();
      });
    });

    // Envio para o WhatsApp
    if (btnSubmit) {
      btnSubmit.addEventListener('click', function () {
        const motivo = triageMotivo ? triageMotivo.value : 'Análise geral de direitos';
        const tempo = triageTempo ? triageTempo.value : 'Não informado';

        const mensagemWhatsApp = 
`Olá, Dr. Alan Rodrigo! Realizei a triagem trabalhista no seu site:

• Situação de Contratação: ${selectedVinculo}
• Desafio Principal: ${motivo}
• Tempo de Empresa: ${tempo}

Gostaria de uma orientação jurídica preliminar para o meu caso.`;

        const encoded = encodeURIComponent(mensagemWhatsApp);
        const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;
        
        window.open(url, '_blank');
      });
    }
  }

  // 3. Acordeon do FAQ
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      if (!question || !answer) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Fecha todos os outros
        faqItems.forEach(other => {
          other.classList.remove('active');
          const otherQuestion = other.querySelector('.faq-question');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        });

        // Abre o clicado se não estava aberto
        if (!isOpen) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
        }
      });
    });
  }

  // 4. Menu Mobile
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (!menuBtn || !mainNav) return;

    menuBtn.addEventListener('click', function () {
      mainNav.classList.toggle('show');
    });

    // Fecha ao clicar em um link
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('show');
      });
    });
  }

  // 5. Scroll Spy para Navegação Ativa
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], main[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // Inicializa tudo quando o DOM estiver pronto
  document.addEventListener('DOMContentLoaded', () => {
    initHeroSelector();
    initTriageForm();
    initFaqAccordion();
    initMobileMenu();
    initScrollSpy();
  });

})();
