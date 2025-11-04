const tours = [
  {
    id: 'rosa-khutor',
    title: 'Красная Поляна и курорт Роза Хутор',
    subtitle: 'Горный парк «Роза Пик», олимпийское наследие и SPA-долина',
    description:
      'Комбинированная экскурсия по главным локациям Красной Поляны: канатная дорога на высоту 2320 м, прогулка по набережной Мзымты, дегустация башенского сыра и посещение авторского чана с термальной водой.',
    duration: '8 часов',
    type: 'Групповая / индивидуальная',
    price: 7800,
    pickup: ['Адлер (центр)', 'ЖД вокзал Адлер', 'Олимпийский парк', 'Имеретинская бухта'],
    includes: 'Трансфер, услуги гида, подъём на канатной дороге «Олимпия», дегустация фермерских продуктов',
    photos: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1544552866-d3ed42536c67?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1603667765511-9fae9ef32edc?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1526481280695-3c4697b59be5?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1560264418-c4445382edbc?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1579732434579-7cd6f9c5c77f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1577826027493-0f557f59b9d4?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80'
    ]
  },
  {
    id: 'skypark',
    title: 'Скайпарк AJ Hackett и Ахштырское ущелье',
    subtitle: 'Самый длинный подвесной мост России, виды на море и прыжки bungee',
    description:
      'Интенсив для любителей экстрима: прогулка по подвесному мосту Skybridge, смотровые площадки Ахштырского ущелья, zip-line через каньон и визит в этно-ферму с домашним обедом.',
    duration: '6 часов',
    type: 'Мини-группа до 12 человек',
    price: 6900,
    pickup: ['Адлер (центр)', 'Курортный городок', 'Сириус', 'Веселое'],
    includes: 'Трансфер, билет на мост Skybridge, сопровождение инструкторов, страхование',
    photos: [
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1493815793585-d94ccbc86df0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1523419409543-0c1df022bdd1?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1443980995706-8d107e98e707?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1458442310124-dde6edb43d10?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1525187494000-bf1dc51cc40c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1468323867382-6c64aa1b17ab?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1525972156385-d1f9c923518e?auto=format&fit=crop&w=1600&q=80'
    ]
  },
  {
    id: 'ritsa',
    title: 'Абхазия: озеро Рица и Голубое озеро',
    subtitle: 'Высокогорные панорамы, водопады Мужские слезы и дегустации в Псырцхе',
    description:
      'Погружение в природу Абхазии: Гегский и Голубой водопады, озеро Рица, дача Сталина, монастырский комплекс в Новом Афоне и национальный обед с адыгейским сыром и апсуой.',
    duration: '12 часов',
    type: 'Групповая / индивидуальная',
    price: 8600,
    pickup: ['Адлер (центр)', 'Блиново', 'Имеретинский курорт', 'Красная Поляна'],
    includes: 'Трансфер с прохождением границы, сопровождение гида, страховка, дегустации вин и меда',
    photos: [
      'https://images.unsplash.com/photo-1612510259272-abe5a6435375?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1530587191325-3db32a5a4f40?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1604335399105-24afcbee4fd5?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1523882012223-27db6a373d9b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1600&q=80'
    ]
  },
  {
    id: 'new-afon',
    title: 'Новый Афон и пещеры Анакопии',
    subtitle: 'Византийские храмы, гроты и уединённые пляжи Черноморского побережья',
    description:
      'Исторический маршрут с посещением Новоафонского монастыря, Симоно-Кананитского храма, смотровой площадки на Иверской горе и карстовых пещер Анакопии с лазурными озёрами.',
    duration: '11 часов',
    type: 'Комфорт-класс, до 18 человек',
    price: 8200,
    pickup: ['Адлер (центр)', 'Сириус', 'Имеретинская бухта', 'Хоста'],
    includes: 'Трансфер, экскурсионное обслуживание, входные билеты в пещеры, дегустация абхазских чаёв',
    photos: [
      'https://images.unsplash.com/photo-1614167945645-9b7353b236ed?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1560448205-17d3a46c84c9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517321458682-84aa0f6c5a1d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1470074558764-4e65b2446d6d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1604335399105-24afcbee4fd5?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1529926455182-6c4a1a220a67?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80'
    ]
  },
  {
    id: 'agursky-waterfalls',
    title: 'Агурские водопады и гора Ахун на закате',
    subtitle: 'Треккинг по каньону Агуры и панорамы с башни Ахун',
    description:
      'Вечернее путешествие по Агурскому ущелью с купанием у водопадов, пикник с локальными снэками и встреча заката на обзорной площадке горы Ахун с видом на Большой Сочи.',
    duration: '5 часов',
    type: 'Авторский маршрут, до 15 человек',
    price: 5400,
    pickup: ['Адлер (центр)', 'Хоста', 'Сочи (центр)', 'Мацеста'],
    includes: 'Гид-натуралист, треккинг-палки, пикниковый набор, подъём на башню Ахун',
    photos: [
      'https://images.unsplash.com/photo-1459664018906-085c36f472af?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1494523381954-4c1b270e7af5?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1457213453082-fecc5bbe99fc?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500534312892-43a2ee1b1ec0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1600&q=80'
    ]
  }
];

const tourList = document.querySelector('#tour-list');
const cardTemplate = document.querySelector('#tour-card-template');
const bookingTemplate = document.querySelector('#booking-form-template');
const modal = document.querySelector('#booking-modal');
const modalContent = document.querySelector('#modal-content');
const modalClose = document.querySelector('.modal__close');

function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(value);
}

function createTourCard(tour) {
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  card.dataset.tourId = tour.id;

  const titleEl = card.querySelector('.tour-card__title');
  const subtitleEl = card.querySelector('.tour-card__subtitle');
  const descriptionEl = card.querySelector('.tour-card__description');
  const metaEl = card.querySelector('.tour-card__meta');
  const pricingEl = card.querySelector('.tour-card__pricing');
  const bookBtn = card.querySelector('.tour-card__book');

  titleEl.textContent = tour.title;
  subtitleEl.textContent = tour.subtitle;
  descriptionEl.textContent = tour.description;

  metaEl.innerHTML = '';
  const metaItems = [
    `Длительность: ${tour.duration}`,
    `Тип: ${tour.type}`,
    `Выезд: ${tour.pickup.join(', ')}`,
    `Включено: ${tour.includes}`
  ];

  metaItems.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    metaEl.appendChild(li);
  });

  const price = document.createElement('span');
  price.className = 'tour-card__price';
  price.textContent = formatPrice(tour.price) + ' за человека';

  const discount = document.createElement('span');
  discount.className = 'tour-card__discount';
  discount.textContent = `При оплате онлайн: ${formatPrice(tour.price * 0.95)}`;

  pricingEl.append(price, discount);

  const track = card.querySelector('.carousel__track');
  tour.photos.forEach((photoUrl, index) => {
    const img = document.createElement('img');
    img.src = photoUrl;
    img.alt = `${tour.title} — фото ${index + 1}`;
    track.appendChild(img);
  });

  const prevBtn = card.querySelector('.carousel__btn--prev');
  const nextBtn = card.querySelector('.carousel__btn--next');
  let currentIndex = 0;

  function updateCarousel() {
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + tour.photos.length) % tour.photos.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % tour.photos.length;
    updateCarousel();
  });

  bookBtn.addEventListener('click', () => openBookingModal(tour));

  return card;
}

function openBookingModal(tour) {
  modalContent.innerHTML = '';
  const form = bookingTemplate.content.firstElementChild.cloneNode(true);
  form.querySelector('.booking-form__tour').textContent = `Экскурсия: ${tour.title}`;
  form.dataset.price = tour.price;

  const pickupSelect = form.querySelector('select[name="pickup"]');
  tour.pickup.forEach((location) => {
    const option = document.createElement('option');
    option.value = location;
    option.textContent = location;
    pickupSelect.appendChild(option);
  });

  const transportSelect = form.querySelector('select[name="transport"]');
  const seatSelect = form.querySelector('select[name="seat"]');
  const participantsInput = form.querySelector('input[name="participants"]');
  const paymentRadios = form.querySelectorAll('input[name="payment"]');
  const totalEl = form.querySelector('.booking-form__total');

  function updateSeats() {
    const selectedOption = transportSelect.selectedOptions[0];
    const capacity = Number(selectedOption.dataset.capacity || 1);
    seatSelect.innerHTML = '';
    for (let i = 1; i <= capacity; i += 1) {
      const option = document.createElement('option');
      option.value = `Место ${i}`;
      option.textContent = `Место ${i}`;
      seatSelect.appendChild(option);
    }
  }

  function updateTotal() {
    const basePrice = Number(form.dataset.price);
    const participants = Number(participantsInput.value) || 0;
    const isOnline = form.querySelector('input[name="payment"]:checked').value === 'online';
    const total = basePrice * participants * (isOnline ? 0.95 : 1);
    const totalText = isOnline
      ? `К оплате со скидкой 5%: ${formatPrice(total)}`
      : `К оплате: ${formatPrice(total)}`;
    totalEl.textContent = totalText;
  }

  updateSeats();
  updateTotal();

  transportSelect.addEventListener('change', () => {
    updateSeats();
    updateTotal();
  });

  participantsInput.addEventListener('input', updateTotal);
  paymentRadios.forEach((radio) => radio.addEventListener('change', updateTotal));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const message = [
      'Спасибо! Ваша заявка принята.',
      `Экскурсия: ${tour.title}`,
      `Дата: ${data.date}`,
      `Количество участников: ${data.participants}`,
      `Транспорт: ${transportSelect.selectedOptions[0].textContent}`,
      `Место: ${data.seat}`,
      `Место выезда: ${data.pickup}`,
      `Оплата: ${data.payment === 'online' ? 'Онлайн со скидкой 5%' : 'На месте'}`,
      'Менеджер свяжется с вами в течение 15 минут для подтверждения.'
    ].join('\n');
    alert(message);
    closeModal();
  });

  modalContent.appendChild(form);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  modalContent.innerHTML = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) {
    closeModal();
  }
});

function init() {
  tours.forEach((tour) => {
    const card = createTourCard(tour);
    tourList.appendChild(card);
  });
}

init();
