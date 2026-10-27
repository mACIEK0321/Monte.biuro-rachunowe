const services = [
  {
    path: '/ksiegowosc-jdg-krakow/', key: 'service_jdg',
    slugs: ['jak-zalozyc-dzialalnosc-gospodarcza', 'co-mozna-kupic-przed-zalozeniem-firmy', 'wybor-formy-opodatkowania', 'dzialalnosc-nierejestrowana'],
    before: 'Prowadzisz jednoosobową działalność? Zobacz, co obejmuje nasza ',
    label: 'księgowość dla JDG', after: ' w pakietach od 299 zł netto miesięcznie.',
  },
  {
    path: '/pelna-ksiegowosc-krakow/', key: 'service_pelna',
    slugs: ['jak-dokapitalizowac-spolke-z-oo', 'fundacja-rodzinna-czym-jest-i-jak-dziala', 'limity-platnosci-gotowkowych-b2b', 'obowiazkowy-ksef-kogo-dotyczy'],
    before: 'Prowadzisz spółkę z o.o.? Sprawdź, co obejmuje nasza ',
    label: 'pełna księgowość dla firm', after: ' i jak przejmujemy księgi od poprzedniego biura.',
  },
];
// Verified existing CTA blocks. If an editor removes one, append at the end instead.
const beforeCta = {
  'jak-zalozyc-dzialalnosc-gospodarcza': '88f01420d838',
  'co-mozna-kupic-przed-zalozeniem-firmy': '0ddfa52cdd01',
  'dzialalnosc-nierejestrowana': '8e6d1267ec81',
  'limity-platnosci-gotowkowych-b2b': '6de50bbff1ad',
};

function addServiceLink(body, slug, language) {
  if (language !== 'pl' || !Array.isArray(body)) return body;
  const service = services.find(entry => entry.slugs.includes(slug));
  if (!service) return body;
  const blockKey = `monte_${service.key}_link`;
  const sentence = service.before + service.label + service.after;
  if (body.some(block => block._key === blockKey ||
    (block.children?.map(span => span.text || '').join('') === sentence &&
    block.markDefs?.some(mark => mark.href === service.path)))) return body;
  const block = {
    _type: 'block', _key: blockKey, style: 'normal',
    markDefs: [{_type: 'link', _key: 'service_link', href: service.path}],
    children: [
      {_type: 'span', _key: 'intro', text: service.before, marks: []},
      {_type: 'span', _key: 'link', text: service.label, marks: ['service_link']},
      {_type: 'span', _key: 'outro', text: service.after, marks: []},
    ],
  };
  const ctaIndex = body.findIndex(item => item._key === beforeCta[slug]);
  const index = ctaIndex < 0 ? body.length : ctaIndex;
  return [...body.slice(0,index), block, ...body.slice(index)];
}
module.exports = {services, addServiceLink};
