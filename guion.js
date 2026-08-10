/* ═══════════════════════════════════════════════════════════════
   BODA RICARDO & LUISA — COMPORTAMIENTO
   Carrusel, cuenta regresiva, música y envío del RSVP.
   La configuración que se toca de vez en cuando está al principio
   de cada bloque: CAR_MS (velocidad del carrusel), SPOTIFY (canción),
   GFORM y CAMPOS (destino de las confirmaciones).
   ═══════════════════════════════════════════════════════════════ */

(function(){
  'use strict';

  /* ═══════════════════════ MÚSICA ═══════════════════════
     «Asilo» — Jorge Drexler & Mon Laferte, vía el reproductor de Spotify.
     Para cambiar de canción, sustituye el ID de abajo por el de la nueva
     (está en su URL de Spotify, justo después de /track/).              */

  var SPOTIFY = '5r0yIwEKbqZL96FRmOLYkG';

  var ctrl    = document.getElementById('musica');
  var panel   = document.getElementById('panel-musica');
  var pmMarco = document.getElementById('pm-marco');
  var spot = null;          /* controlador de Spotify, cuando esté listo */
  var pendiente = false;    /* alguien pulsó antes de que estuviera listo */

  /* Spotify llama a esta función cuando su script termina de cargar. */
  window.onSpotifyIframeApiReady = function(IFrameAPI){
    IFrameAPI.createController(
      pmMarco,
      { uri: 'spotify:track:' + SPOTIFY, width:'100%', height:152 },
      function(EmbedController){
        spot = EmbedController;
        ctrl.classList.remove('cargando');

        /* Spotify nos avisa de cada cambio: así el botón siempre refleja
           lo que de verdad está pasando, aunque el visitante le dé al play
           dentro del propio reproductor. */
        spot.addListener('playback_update', function(e){
          var suena = e && e.data && e.data.isPaused === false;
          ctrl.classList.toggle('sonando', suena);
          ctrl.setAttribute('aria-pressed', suena ? 'true' : 'false');
          ctrl.setAttribute('data-tip', suena ? 'Pausar' : 'Nuestra canción');
          ctrl.setAttribute('aria-label', suena ? 'Pausar la canción' : 'Reproducir nuestra canción');
        });

        if(pendiente){ pendiente = false; abrirPanel(); spot.play(); }
      }
    );
  };

  function abrirPanel(){
    if(panel.hidden){
      panel.hidden = false;
      requestAnimationFrame(function(){ panel.classList.add('abierto'); });
    }
  }
  function cerrarPanel(){
    panel.classList.remove('abierto');
    if(spot) spot.pause();
    setTimeout(function(){ if(!panel.classList.contains('abierto')) panel.hidden = true; }, 380);
  }

  /* Un clic en la clave de sol: suena. Otro clic: pausa. */
  ctrl.addEventListener('click', function(e){
    e.stopPropagation();
    if(!spot){                       /* aún cargando: lo dejamos encargado */
      pendiente = true;
      ctrl.classList.add('cargando');
      return;
    }
    abrirPanel();
    spot.togglePlay();
  });

  document.getElementById('pm-cerrar').addEventListener('click', cerrarPanel);
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && !panel.hidden) cerrarPanel();
  });

  /* ═══════════════════ CARRUSEL DE LA PORTADA ═══════════════════ */
  var CAR_MS = 3200;   /* milisegundos entre foto y foto (3200 = 3,2 s) */

  var marco = document.getElementById('marco');
  var fotos = marco ? [].slice.call(marco.querySelectorAll('figure')) : [];

  if(fotos.length > 1){
    var dots  = document.getElementById('car-dots');
    var carru = document.getElementById('carrusel');
    var i = 0, reloj = null;

    fotos.forEach(function(f, n){
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role','tab');
      b.setAttribute('aria-label','Foto ' + (n+1) + ' de ' + fotos.length);
      b.addEventListener('click', function(){ ir(n); reiniciar(); });
      dots.appendChild(b);
    });
    var puntos = [].slice.call(dots.children);

    function ir(n){
      i = (n + fotos.length) % fotos.length;
      fotos.forEach(function(f, k){ f.classList.toggle('act', k === i); });
      puntos.forEach(function(p, k){ p.setAttribute('aria-current', k === i ? 'true' : 'false'); });
    }
    function siguiente(){ ir(i + 1); }
    function arrancar(){ if(!reloj) reloj = setInterval(siguiente, CAR_MS); }
    function parar(){ clearInterval(reloj); reloj = null; }
    function reiniciar(){ parar(); arrancar(); }

    document.getElementById('car-prev').addEventListener('click', function(){ ir(i-1); reiniciar(); });
    document.getElementById('car-next').addEventListener('click', function(){ ir(i+1); reiniciar(); });

    /* Las fotos pasan solas SIEMPRE, sin que nadie tenga que tocar nada.
       Solo se detiene mientras alguien navega con el teclado (para no
       moverle la foto bajo el foco) y cuando la pestaña está oculta.
       No se pausa al pasar el ratón: así siempre se ve en movimiento. */
    carru.addEventListener('focusin',  parar);
    carru.addEventListener('focusout', arrancar);

    /* deslizar con el dedo en el móvil */
    var x0 = null;
    marco.addEventListener('touchstart', function(e){ x0 = e.touches[0].clientX; parar(); }, {passive:true});
    marco.addEventListener('touchend', function(e){
      if(x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if(Math.abs(dx) > 45) ir(dx < 0 ? i+1 : i-1);
      x0 = null; arrancar();
    }, {passive:true});

    /* flechas del teclado cuando el carrusel tiene el foco */
    carru.addEventListener('keydown', function(e){
      if(e.key === 'ArrowLeft'){ ir(i-1); reiniciar(); }
      if(e.key === 'ArrowRight'){ ir(i+1); reiniciar(); }
    });

    /* no gasta recursos en una pestaña oculta */
    document.addEventListener('visibilitychange', function(){
      if(document.hidden) parar(); else arrancar();
    });

    ir(0);
    arrancar();
  }

  /* ── Nav ── */
  var nav=document.getElementById('nav'),burger=document.getElementById('burger'),links=document.getElementById('links');
  function onScroll(){ nav.classList.toggle('solid', window.scrollY>28); }
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});

  burger.addEventListener('click',function(){
    var open=links.classList.toggle('show');
    burger.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',open);
  });
  links.addEventListener('click',function(e){
    if(e.target.tagName==='A'){links.classList.remove('show');burger.classList.remove('open');burger.setAttribute('aria-expanded','false');}
  });

  /* ── Cuenta regresiva ── */
  /* Cambia esta fecha/hora si la ceremonia se mueve. Formato ISO con zona UTC-5. */
  var target=new Date('2027-04-02T16:00:00-05:00').getTime();
  var el={d:document.getElementById('c-d'),h:document.getElementById('c-h'),m:document.getElementById('c-m'),s:document.getElementById('c-s')};
  function pad(n){return n<10?'0'+n:''+n;}
  function tick(){
    var diff=target-Date.now();
    if(diff<=0){
      document.getElementById('count').innerHTML='<div style="min-width:auto"><b style="font-style:italic">¡Hoy es el día!</b></div>';
      clearInterval(timer); return;
    }
    var s=Math.floor(diff/1000);
    el.d.textContent=Math.floor(s/86400);
    el.h.textContent=pad(Math.floor(s%86400/3600));
    el.m.textContent=pad(Math.floor(s%3600/60));
    el.s.textContent=pad(s%60);
  }
  tick(); var timer=setInterval(tick,1000);

  /* ── Reveal al hacer scroll ── */
  var items=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}
      });
    },{threshold:.12,rootMargin:'0px 0px -60px 0px'});
    items.forEach(function(i){io.observe(i);});
  }else{
    items.forEach(function(i){i.classList.add('in');});
  }

  /* ── FAQ: abrir una a la vez ── */
  var faqs=document.querySelectorAll('.faq details');
  faqs.forEach(function(d){
    d.addEventListener('toggle',function(){
      if(d.open) faqs.forEach(function(o){ if(o!==d) o.open=false; });
    });
  });

  /* ═══════════════════ ENVÍO DEL RSVP ═══════════════════
     Las respuestas van a un Google Form oculto y aparecen en su hoja de
     cálculo. Hay que rellenar estas dos cosas UNA sola vez:

     1) GFORM  → la URL de envío de tu formulario. Se obtiene cogiendo el
        enlace de tu Google Form y cambiando el final:
           .../viewform      ✗
           .../formResponse  ✓

     2) CAMPOS → el identificador de cada pregunta. Para obtenerlos:
        abre tu Google Form → menú de los tres puntos → "Obtener enlace
        con relleno previo" → escribe cualquier cosa en cada pregunta →
        "Obtener enlace". El enlace copiado contiene pares del tipo
        entry.1234567=loQueEscribiste. Ese número es el identificador.

     CONSEJO: crea TODAS las preguntas del Google Form como "Respuesta
     corta" (o "Párrafo" para la última), incluso las que aquí son menús
     desplegables. Si en Google las pones como opción múltiple, rechaza
     cualquier texto que no coincida palabra por palabra y perderías
     respuestas sin enterarte.                                          */

  var GFORM = 'https://docs.google.com/forms/d/e/1FAIpQLSeYCoLkLaXqyQebYiHb3t4sX258TVIJRtztlNuXqxD0Klxdlg/formResponse';

  /* Cada campo de la web con su pregunta en el Google Form: */
  var CAMPOS = {
    nombre:   'entry.1840880673',   /* Nombre y Apellido                     */
    email:    'entry.367322812',    /* Correo electronico                    */
    asiste:   'entry.1638771570',   /* Nos acompañas?                        */
    personas: 'entry.1168910758',   /* Numero de personas                    */
    pais:     'entry.358605638',    /* Desde donde viajas?                   */
    dieta:    'entry.290537219',    /* Alergias o restricciones alimentarias?*/
    nota:     'entry.1391673311'    /* Algo mas que debamos saber?           */
  };

  var form = document.getElementById('rsvp-form');
  var msg  = document.getElementById('rsvp-msg');
  var val  = function(id){ var el = document.getElementById(id); return el ? el.value.trim() : ''; };

  function aviso(texto, tono){
    msg.innerHTML = texto;
    msg.style.display = 'block';
    msg.style.borderColor = tono === 'ok' ? '#E3B08A' : '#E8A08A';
    msg.style.color       = tono === 'ok' ? '#E3B08A' : '#E8A08A';
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();

    /* si un robot rellenó el campo trampa, fingimos normalidad y no enviamos */
    if(val('f-web')){ aviso('¡Gracias! Hemos recibido tu confirmación.','ok'); return; }

    var datos = {
      nombre:val('f-nombre'), email:val('f-email'),   asiste:val('f-asiste'),
      personas:val('f-personas'), pais:val('f-pais'),
      dieta:val('f-dieta'),       nota:val('f-nota')
    };

    if(!datos.nombre || !datos.email || !datos.asiste){
      aviso('Por favor completa tu nombre, tu correo y si nos acompañas.');
      return;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.email)){
      aviso('Revisa el correo electrónico, parece que tiene una errata.');
      return;
    }

    if(!GFORM || !CAMPOS.nombre){
      aviso('<strong>Aún no está conectado.</strong> Falta configurar GFORM y CAMPOS ' +
            'en el JavaScript de este archivo. Nadie recibiría esta respuesta todavía.');
      return;
    }

    var boton = form.querySelector('button[type="submit"]');
    boton.disabled = true;
    boton.textContent = 'Enviando…';

    var fd = new FormData();
    Object.keys(CAMPOS).forEach(function(k){
      if(CAMPOS[k]) fd.append(CAMPOS[k], datos[k]);
    });

    /* Google no permite leer su respuesta desde otro dominio (CORS), así que
       enviamos "a ciegas": si la petición sale, damos la confirmación. */
    fetch(GFORM, { method:'POST', mode:'no-cors', body:fd })
      .then(function(){
        form.style.display = 'none';
        aviso('<strong>¡Gracias, ' + datos.nombre.split(' ')[0] + '!</strong><br>' +
              'Hemos recibido tu confirmación. Nos vemos el 2 de abril en Subachoque.','ok');
        msg.scrollIntoView({behavior:'smooth', block:'center'});
      })
      .catch(function(){
        boton.disabled = false;
        boton.textContent = 'Enviar confirmación';
        aviso('No hemos podido enviar la confirmación. Revisa tu conexión e inténtalo de nuevo, ' +
              'o escríbenos por WhatsApp y lo apuntamos a mano.');
      });
  });
})();
