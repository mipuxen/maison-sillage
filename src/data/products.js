// Single source of truth for the collection.
// Text people read is stored per language: { en, uz, ko }. Brand and model names stay the same.
// Photos live in public/shoes/<slug>/1.webp, 2.webp ... (1 = the image on the wall).
// Product photos and trademarks belong to their respective owners (see README, "Credits").

export const MAX_QTY = 9;

// EU sizes offered for every model.
export const SIZES = [
  '36', '36.5', '37.5', '38', '38.5', '39', '40', '40.5', '41', '42',
  '42.5', '43', '44', '44.5', '45', '45.5', '46', '47', '47.5',
];

const T = (en, uz, ko) => ({ en, uz, ko });

export const products = [
  {
    slug: 'nike-cortez', brand: 'Nike', name: 'Cortez', price: 110, images: 5,
    color: T('Tan / Navy', 'Jigarrang / Toʻq koʻk', '탠 / 네이비'),
    description: T(
      'A 1972 running icon in tan leather with a navy swoosh.',
      'Toʻq koʻk belgili jigarrang charmdagi 1972-yilgi yugurish ikonasi.',
      '네이비 스우시를 더한 탠 가죽의 1972년 러닝 아이콘.',
    ),
    materials: T(
      ['Upper: smooth leather', 'Sole: herringbone rubber, wedge midsole'],
      ['Ustki qism: silliq charm', 'Taglik: archasimon naqshli kauchuk, ponasimon oʻrta taglik'],
      ['갑피: 스무스 가죽', '솔: 헤링본 고무, 웨지 미드솔'],
    ),
  },
  {
    slug: 'nb-204l', brand: 'New Balance', name: '204L', price: 130, images: 6,
    color: T('Silver / White', 'Kumushrang / Oq', '실버 / 화이트'),
    description: T(
      'Metallic overlays on breathable mesh, in an early-2000s runner shape.',
      'Nafas oluvchi toʻr ustida metall rang qoplamalar, 2000-yillar boshi uslubida.',
      '통기성 메시 위 메탈릭 오버레이, 2000년대 초 러너 실루엣.',
    ),
    materials: T(
      ['Upper: mesh with synthetic overlays', 'Sole: EVA midsole, rubber outsole'],
      ['Ustki qism: sintetik qoplamali toʻr', 'Taglik: EVA oʻrta taglik, kauchuk tashqi taglik'],
      ['갑피: 합성 오버레이 메시', '솔: EVA 미드솔, 고무 아웃솔'],
    ),
  },
  {
    slug: 'nb-471', brand: 'New Balance', name: '471', price: 120, images: 4,
    color: T('Grey / Cream', 'Kulrang / Krem', '그레이 / 크림'),
    description: T(
      'Hairy suede and open knit on a gum sole.',
      'Tukli zamsh va ochiq toʻqima, kauchuk taglikda.',
      '헤어리 스웨이드와 오픈 니트, 검 솔.',
    ),
    materials: T(
      ['Upper: suede and knit mesh', 'Sole: gum rubber, wave tread'],
      ['Ustki qism: zamsh va toʻqima toʻr', 'Taglik: tabiiy kauchuk, toʻlqinsimon protektor'],
      ['갑피: 스웨이드, 니트 메시', '솔: 검 고무, 웨이브 트레드'],
    ),
  },
  {
    slug: 'nike-dunk-low', brand: 'Nike', name: 'Dunk Low', price: 120, images: 3,
    color: T('White / Black', 'Oq / Qora', '화이트 / 블랙'),
    description: T(
      'The two-tone basketball classic in smooth leather.',
      'Silliq charmdagi ikki rangli basketbol klassikasi.',
      '매끈한 가죽의 투톤 농구화 클래식.',
    ),
    materials: T(
      ['Upper: leather', 'Sole: rubber cupsole'],
      ['Ustki qism: charm', 'Taglik: kauchuk kosasimon taglik'],
      ['갑피: 가죽', '솔: 고무 컵솔'],
    ),
  },
  {
    slug: 'nike-p6000-bronze', brand: 'Nike', name: 'P-6000', price: 120, images: 5,
    color: T('Phantom / Bronze', 'Sutrang / Bronza', '팬텀 / 브론즈'),
    description: T(
      'Layered mesh with bronze accents on a stacked midsole.',
      'Qatlamli toʻr va bronza rang detallar, baland oʻrta taglik.',
      '레이어드 메시와 브론즈 포인트, 두툼한 미드솔.',
    ),
    materials: T(
      ['Upper: mesh with synthetic overlays', 'Sole: foam midsole, rubber outsole'],
      ['Ustki qism: sintetik qoplamali toʻr', 'Taglik: koʻpik oʻrta taglik, kauchuk tashqi taglik'],
      ['갑피: 합성 오버레이 메시', '솔: 폼 미드솔, 고무 아웃솔'],
    ),
  },
  {
    slug: 'lacoste-lerond-black', brand: 'Lacoste', name: 'Lerond Set', price: 100, images: 5,
    color: T('Black / Gold', 'Qora / Oltinrang', '블랙 / 골드'),
    description: T(
      'Tonal black leather with a gold crocodile.',
      'Oltin rang timsohli toʻliq qora charm.',
      '골드 크로커다일을 더한 올블랙 가죽.',
    ),
    materials: T(
      ['Upper: leather', 'Sole: rubber cupsole'],
      ['Ustki qism: charm', 'Taglik: kauchuk kosasimon taglik'],
      ['갑피: 가죽', '솔: 고무 컵솔'],
    ),
  },
  {
    slug: 'asics-gel-kahana-8', brand: 'ASICS', name: 'Gel-Kahana 8', price: 95, images: 1,
    color: T('White / Navy', 'Oq / Toʻq koʻk', '화이트 / 네이비'),
    description: T(
      'A trail-ready tread with GEL cushioning.',
      'GEL yumshatgichli, togʻ yoʻllariga mos protektor.',
      'GEL 쿠셔닝을 갖춘 트레일 트레드.',
    ),
    materials: T(
      ['Upper: mesh with synthetic overlays', 'Sole: GEL cushioning, trail rubber outsole'],
      ['Ustki qism: sintetik qoplamali toʻr', 'Taglik: GEL yumshatgich, protektorli kauchuk'],
      ['갑피: 합성 오버레이 메시', '솔: GEL 쿠셔닝, 트레일 고무 아웃솔'],
    ),
  },
  {
    slug: 'selection-oxford-noir', brand: 'Sélection', name: 'Oxford Noir', price: 240, images: 1,
    color: T('Black leather', 'Qora charm', '블랙 가죽'),
    description: T(
      'A cap-toe oxford in soft black leather.',
      'Yumshoq qora charmdan, uchi qoplamali oksford tufli.',
      '부드러운 블랙 가죽의 캡토 옥스퍼드.',
    ),
    materials: T(
      ['Upper: calf leather', 'Sole: leather, rubber heel'],
      ['Ustki qism: buzoq charmi', 'Taglik: charm, kauchuk poshna'],
      ['갑피: 송아지 가죽', '솔: 가죽, 고무 힐'],
    ),
  },
  {
    slug: 'descente-cochiro-25', brand: 'Descente', name: 'Cochiro 25', price: 95, images: 4,
    color: T('White / Black', 'Oq / Qora', '화이트 / 블랙'),
    description: T(
      'A triple-strap turf trainer on a studded rubber sole.',
      'Uch tasmali, tishli kauchuk taglikli sunʼiy maysa krossovkasi.',
      '트리플 스트랩과 스터드 고무 솔의 인조잔디화.',
    ),
    materials: T(
      ['Upper: synthetic leather and mesh', 'Sole: phylon midsole, rubber studs'],
      ['Ustki qism: sunʼiy charm va toʻr', 'Taglik: filon oʻrta taglik, kauchuk tishlar'],
      ['갑피: 합성 가죽, 메시', '솔: 파일론 미드솔, 고무 스터드'],
    ),
  },
  {
    slug: 'lacoste-lerond-white', brand: 'Lacoste', name: 'Lerond Set', price: 100, images: 5,
    color: T('White / Green', 'Oq / Yashil', '화이트 / 그린'),
    description: T(
      'A clean white court shoe with a green heel tab.',
      'Yashil tovon detalli toza oq kort krossovkasi.',
      '그린 힐 탭의 깔끔한 화이트 코트화.',
    ),
    materials: T(
      ['Upper: leather', 'Sole: rubber cupsole'],
      ['Ustki qism: charm', 'Taglik: kauchuk kosasimon taglik'],
      ['갑피: 가죽', '솔: 고무 컵솔'],
    ),
  },
  {
    slug: 'nike-p6000-white', brand: 'Nike', name: 'P-6000', price: 115, images: 1,
    color: T('White / Black', 'Oq / Qora', '화이트 / 블랙'),
    description: T(
      'A 2000s running silhouette in crisp white and black.',
      'Oq-qora ranglardagi 2000-yillar yugurish siluyeti.',
      '선명한 화이트와 블랙의 2000년대 러닝 실루엣.',
    ),
    materials: T(
      ['Upper: mesh with synthetic overlays', 'Sole: foam midsole, rubber outsole'],
      ['Ustki qism: sintetik qoplamali toʻr', 'Taglik: koʻpik oʻrta taglik, kauchuk tashqi taglik'],
      ['갑피: 합성 오버레이 메시', '솔: 폼 미드솔, 고무 아웃솔'],
    ),
  },
  {
    slug: 'asics-gel-1130', brand: 'ASICS', name: 'Gel-1130', price: 100, images: 1,
    color: T('Black / Silver', 'Qora / Kumushrang', '블랙 / 실버'),
    description: T(
      'Black mesh with silver stripes, in a late-2000s runner shape.',
      'Kumush chiziqli qora toʻr, 2000-yillar oxiri uslubida.',
      '실버 스트라이프의 블랙 메시, 2000년대 후반 러너 실루엣.',
    ),
    materials: T(
      ['Upper: mesh with synthetic overlays', 'Sole: GEL cushioning, rubber outsole'],
      ['Ustki qism: sintetik qoplamali toʻr', 'Taglik: GEL yumshatgich, kauchuk tashqi taglik'],
      ['갑피: 합성 오버레이 메시', '솔: GEL 쿠셔닝, 고무 아웃솔'],
    ),
  },
  {
    slug: 'selection-caramel', brand: 'Sélection', name: 'Caramel', price: 150, images: 1,
    color: T('Tan / White', 'Jigarrang / Oq', '탠 / 화이트'),
    description: T(
      'Textured tan leather on a white cupsole.',
      'Oq taglikdagi naqshli jigarrang charm.',
      '화이트 컵솔 위의 텍스처드 탠 가죽.',
    ),
    materials: T(
      ['Upper: textured leather', 'Sole: rubber cupsole'],
      ['Ustki qism: naqshli charm', 'Taglik: kauchuk kosasimon taglik'],
      ['갑피: 텍스처드 가죽', '솔: 고무 컵솔'],
    ),
  },
  {
    slug: 'everlast-core', brand: 'Everlast', name: 'Core', price: 80, images: 3,
    color: T('White', 'Oq', '화이트'),
    description: T(
      'A high-top boxing shoe with an ankle strap.',
      'Toʻpiq tasmali baland boks poyabzali.',
      '발목 스트랩을 갖춘 하이탑 복싱화.',
    ),
    materials: T(
      ['Upper: synthetic leather and mesh', 'Sole: thin grip rubber'],
      ['Ustki qism: sunʼiy charm va toʻr', 'Taglik: yupqa, sirpanmaydigan kauchuk'],
      ['갑피: 합성 가죽, 메시', '솔: 얇은 그립 고무'],
    ),
  },
  {
    slug: 'slazenger-resilient', brand: 'Slazenger', name: 'Resilient', price: 75, images: 1,
    color: T('Silver / Grey', 'Kumushrang / Kulrang', '실버 / 그레이'),
    description: T(
      'Chrome overlays on a cushioned chunky sole.',
      'Xrom rang qoplamalar va yumshoq qalin taglik.',
      '크롬 오버레이와 쿠셔닝 청키 솔.',
    ),
    materials: T(
      ['Upper: mesh and synthetic overlays', 'Sole: cushioned EVA'],
      ['Ustki qism: toʻr va sintetik qoplamalar', 'Taglik: yumshoq EVA'],
      ['갑피: 메시, 합성 오버레이', '솔: 쿠셔닝 EVA'],
    ),
  },
];

// Lookup by slug: bySlug['nike-cortez']. Guard unknown keys with Object.hasOwn(bySlug, key).
export const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));

const base = () => (import.meta.env && import.meta.env.BASE_URL) || './';

// Photo n of a product (1 = the wall image).
export const imageUrl = (product, n = 1) => `${base()}shoes/${product.slug}/${n}.webp`;

// Shown if a photo file is missing.
export const placeholderUrl = () => `${base()}shoes/placeholder.svg`;

// Full display name, e.g. "Nike Cortez".
export const fullName = (product) => `${product.brand} ${product.name}`;
