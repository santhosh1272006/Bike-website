        // Menu (nav bar)      
  
function toggleMenu(){
    document.getElementById("mobileMenu").classList.toggle("show");
}

function toggleMenu(){

    const menu = document.getElementById("mobileMenu");

    menu.classList.toggle("active");

}
    
/*--------------------------------------------------------------------------------------------*/


    //(All box id)

function goToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

/*--------------------------------------------------------------------------------------------*/

    //box 3 (view more button)

function goToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}


/*--------------------------------------------------------------------------------------------*/


// About page box3
          
function toggleMore(){
    const info = document.getElementById('moreInfo');
    const btn = document.getElementById('viewBtn');
    const label = document.getElementById('viewLabel');
    const arrow = document.getElementById('arrowIcon');
 
    info.classList.toggle('open');
    btn.classList.toggle('open');
 
    const isOpen = info.classList.contains('open');
    label.textContent = isOpen ? 'VIEW LESS' : 'VIEW MORE';
    arrow.innerHTML = isOpen ? '&#9650;' : '&#9660;'; // ▲ up, ▼ down
}

       
/*---------------------------------------------------------------------------------------------------------*/

    // Box5 (passion on two wheels)

const slider = document.querySelector(".slider");
const pages = document.querySelectorAll(".page");
const dots = document.querySelectorAll(".dot");

let currentPage = 0;

function showPage(index) {

    if (index < 0) {
        index = pages.length - 1;
    }

    if (index >= pages.length) {
        index = 0;
    }

    currentPage = index;

    slider.style.transform =
        `translateX(-${currentPage * 100}%)`;

    pages.forEach(page => {
        page.classList.remove("active");
    });

    pages[currentPage].classList.add("active");

    dots.forEach(dot => {

        dot.classList.remove("active");

    });

    dots[currentPage].classList.add("active");

}

pages.forEach((page, index) => {

    const leftArrow =
        page.querySelector(".fa-arrow-left");

    const rightArrow =
        page.querySelector(".fa-arrow-right");

    leftArrow.addEventListener("click", () => {
        showPage(currentPage - 1);
    });

    rightArrow.addEventListener("click", () => {
        showPage(currentPage + 1);
    });

});

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        showPage(currentPage + 1);
    }

    if (event.key === "ArrowLeft") {
        showPage(currentPage - 1);
    }

});


/*-------------------------------------------------------------------------------------------------------------*/
       // service box 6

document.addEventListener('DOMContentLoaded', () => {

  const services = [
    {
      heading: "BIKE MAINTENANCE & REPAIRS",
      badge: "POPULAR",
      items: [
        "Regular servicing and tune-ups",
        "Engine and brake check",
        "Tyre replacement and wheel alignment",
        "Chain and gear adjustment"
      ],
      img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500"
    },
    {
      heading: "BIKE MAINTENANCE & REPAIRS",
      badge: "FAST",
      items: [
        "Regular servicing and tune-ups",
        "Engine and brake check",
        "Tyre replacement and wheel alignment",
        "Chain and gear adjustment"
      ],
      img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500"
    },
    {
      heading: "BIKE MAINTENANCE & REPAIRS",
      badge: "PREMIUM",
      items: [
        "Regular servicing and tune-ups",
        "Engine and brake check",
        "Tyre replacement and wheel alignment",
        "Chain and gear adjustment"
      ],
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIv9I79KcpaGGWztctT27Odey89XCTVRs2vngDSH0Nrg&s=10"
    }
  ];

  const badgeInfo = {
    POPULAR: "Our most booked service — chosen by most riders for routine upkeep.",
    FAST: "Quick turnaround service, usually done within a few hours.",
    PREMIUM: "Full detailed service with extra checks and premium parts."
  };

  const grid = document.getElementById('svcGrid');
  const titleEl = document.getElementById('svcTitle');
  const spotlight = document.getElementById('spotlight');
  const filtersWrap = document.getElementById('svcFilters');
  const infoEl = document.getElementById('svcInfo');

  // Guard: if any required element is missing, log a clear message and stop
  // instead of throwing "Cannot read properties of null".
  const required = { svcGrid: grid, svcTitle: titleEl, spotlight, svcFilters: filtersWrap, svcInfo: infoEl };
  const missing = Object.entries(required).filter(([, el]) => !el).map(([id]) => id);
  if (missing.length) {
    console.error('services.js: missing element(s) in HTML with id(s):', missing.join(', '));
    return;
  }

  /* ---------- Build letter-by-letter title ---------- */
  const titleText = titleEl.textContent.trim();
  titleEl.textContent = '';
  [...titleText].forEach((ch, i) => {
    const span = document.createElement('span');
    span.textContent = ch;
    span.style.animationDelay = `${i * 0.06}s`;
    titleEl.appendChild(span);
  });

  /* ---------- Build cards ---------- */
  services.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'svc-card';
    card.dataset.index = i;
    card.dataset.badge = s.badge;
    card.style.transitionDelay = `${i * 0.1}s`;

    const listHTML = s.items.map(item => `<li>${item}</li>`).join('');

    card.innerHTML = `
      <span class="svc-badge">${s.badge}</span>
      <h2 class="svc-heading">${s.heading}</h2>
      <ul class="svc-list">${listHTML}</ul>
      <div class="svc-img-wrap">
        <img class="svc-img" src="${s.img}" alt="${s.heading}">
      </div>
    `;

    grid.appendChild(card);
  });

  const cards = Array.from(document.querySelectorAll('.svc-card'));

  /* ---------- Build filter buttons (All + one per badge) ---------- */
  const badgeNames = ['ALL', ...new Set(services.map(s => s.badge))];

  badgeNames.forEach((name, i) => {
    const btn = document.createElement('button');
    btn.className = 'svc-filter-btn';
    btn.textContent = name;
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => {
      filtersWrap.querySelectorAll('.svc-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (name === 'ALL') {
        cards.forEach(card => card.classList.remove('dimmed'));
        infoEl.classList.remove('show');
      } else {
        cards.forEach(card => {
          const matches = card.dataset.badge === name;
          card.classList.toggle('dimmed', !matches);
        });
        infoEl.textContent = badgeInfo[name] || '';
        infoEl.classList.add('show');
      }
    });
    filtersWrap.appendChild(btn);
  });

  /* ---------- Scroll reveal ---------- */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
  } else {
    // Fallback: just reveal everything if IntersectionObserver isn't supported
    cards.forEach(card => card.classList.add('in-view'));
  }

  /* ---------- 3D tilt following mouse ---------- */
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;

      const rotateY = ((x - midX) / midX) * 10;
      const rotateX = ((midY - y) / midY) * 10;

      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });

    card.addEventListener('click', (e) => {
      const rect = card.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);

      const heading = card.querySelector('.svc-heading').textContent;
      console.log(`Selected service: ${heading}`);
    });
  });

  /* ---------- Cursor spotlight glow across whole page ---------- */
  window.addEventListener('mousemove', (e) => {
    spotlight.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
  });

});




/*--------------------------------------------------------------------------------------*/





  /*=----------------------------------------------------------------------------------------------------------------*/


        // Testimonal box 13

const tstData = [
  { name:"AKASH", img:"https://i.pravatar.cc/150?img=53",
    quote:"I was skeptical at first, but the results spoke for themselves within the first month. The team was responsive at every step and never made me feel like just another customer."},
  { name:"PRIYA", img:"https://i.pravatar.cc/150?img=47",
    quote:"What stood out to me was how simple everything felt, even though I know a lot of work was happening behind the scenes. Support replied within hours, not days, whenever I had a question."},
  { name:"ARJUN", img:"https://i.pravatar.cc/150?img=12",
    quote:"I've tried a few alternatives before this, and none of them came close. It just works, consistently, without the constant tweaking I was used to. Worth every rupee." },
  { name:"MEERA", img:"https://i.pravatar.cc/150?img=32",
    quote:"Honestly didn't expect to see a difference this quickly. The whole experience felt personal instead of transactional, which is rare these days. I'm a customer for life at this point." }
];

const tstTrack = document.getElementById('track');
const tstDotsWrap = document.getElementById('dots');

tstData.forEach((t, i) => {
  const tstCard = document.createElement('div');
  tstCard.className = 'tst-card';
  tstCard.dataset.index = i;
  tstCard.innerHTML = `
    <img class="tst-avatar" src="${t.img}" alt="${t.name}">
    <h2 class="tst-name">${t.name}</h2>
    <p class="tst-quote"><span class="tst-quote-mark">&ldquo;</span>${t.quote}&rdquo;</p>
    
    <div class="tst-stars">
      <span style="color:gold">&#9733;</span><span style="color:gold">&#9733;</span><span style="color:gold">&#9733;</span><span style="color:gold">&#9733;</span><span style="color:gold">&#9733;</span>
    </div>
  `;
  tstTrack.appendChild(tstCard);

  const tstDot = document.createElement('button');
  tstDot.dataset.index = i;
  if(i === 0) tstDot.classList.add('active');
  tstDotsWrap.appendChild(tstDot);
});

const tstCards = Array.from(document.querySelectorAll('.tst-card'));
const tstDots = Array.from(document.querySelectorAll('.tst-dots button'));

// Scroll-driven "active card" detection
function tstUpdateActiveCard(){
  const center = tstTrack.scrollLeft + tstTrack.clientWidth / 2;
  let closest = 0;
  let closestDist = Infinity;

  tstCards.forEach((card, i) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const dist = Math.abs(cardCenter - center);
    if(dist < closestDist){
      closestDist = dist;
      closest = i;
    }
  });

  tstCards.forEach((card, i) => card.classList.toggle('active', i === closest));
  tstDots.forEach((dot, i) => dot.classList.toggle('active', i === closest));
}

// Throttle scroll handler with requestAnimationFrame
let tstTicking = false;
tstTrack.addEventListener('scroll', () => {
  if(!tstTicking){
    requestAnimationFrame(() => { tstUpdateActiveCard(); tstTicking = false; });
    tstTicking = true;
  }
});

// Click a card to snap to it
tstCards.forEach(card => {
  card.addEventListener('click', () => {
    card.scrollIntoView({ behavior:'smooth', inline:'center', block:'nearest' });
  });
});

// Click a dot to jump to that card
tstDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    tstCards[i].scrollIntoView({ behavior:'smooth', inline:'center', block:'nearest' });
  });
});

// Arrow buttons move by one card
function tstScrollByCard(dir){
  const activeIndex = tstCards.findIndex(c => c.classList.contains('active'));
  const target = Math.min(tstCards.length - 1, Math.max(0, activeIndex + dir));
  tstCards[target].scrollIntoView({ behavior:'smooth', inline:'center', block:'nearest' });
}
document.getElementById('prevBtn').addEventListener('click', () => tstScrollByCard(-1));
document.getElementById('nextBtn').addEventListener('click', () => tstScrollByCard(1));

// Let vertical mouse wheel scroll the track horizontally when hovering it
tstTrack.addEventListener('wheel', (e) => {
  if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
    e.preventDefault();
    tstTrack.scrollLeft += e.deltaY;
  }
}, { passive:false });

// Initial state
tstUpdateActiveCard();