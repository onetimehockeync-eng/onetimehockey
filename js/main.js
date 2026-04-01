/* One Time Hockey — main.js */
(function(){
  'use strict';

  /* Nav scroll shadow */
  var nav = document.querySelector('.nav');
  if(nav){
    var onScroll = function(){ nav.classList.toggle('scrolled', window.scrollY > 20); };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  /* Mobile menu */
  var burger  = document.querySelector('.burger');
  var overlay = document.querySelector('.nav-overlay');
  var closeBtn= document.querySelector('.nav-close');
  function openMenu(){ if(overlay){ overlay.classList.add('open'); document.body.style.overflow='hidden'; } }
  function closeMenu(){ if(overlay){ overlay.classList.remove('open'); document.body.style.overflow=''; } }
  if(burger)  burger.addEventListener('click', openMenu);
  if(closeBtn) closeBtn.addEventListener('click', closeMenu);
  if(overlay) overlay.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });

  /* Active nav link */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-overlay a').forEach(function(a){
    var href = (a.getAttribute('href')||'').replace(/^\.\//, '');
    if(href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item   = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(el){ el.classList.remove('open'); });
      if(!isOpen) item.classList.add('open');
    });
  });

  /* Contact form loading state */
  var form = document.querySelector('.contact-form');
  if(form){
    form.addEventListener('submit', function(){
      var btn = form.querySelector('button[type="submit"]');
      if(btn){ btn.textContent = 'Sending…'; btn.disabled = true; }
    });
  }

})();
