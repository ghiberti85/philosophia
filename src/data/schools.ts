import type { School } from './types';

export const schools: School[] = [
  {
    slug: 'socratic-philosophy',
    name: { en: 'Socratic Philosophy', pt: 'Filosofia Socrática' },
    period: { en: '5th century BC', pt: 'Século V a.C.' },
    tagline: {
      en: 'The unexamined life is not worth living.',
      pt: 'Uma vida sem reflexão não merece ser vivida.',
    },
    description: {
      en: 'Socratic philosophy marks the turning point of Western thought from nature to humanity. Through relentless questioning in the public squares of Athens, Socrates pioneered a method of dialogue — elenchus — that exposes contradictions in our beliefs and pushes us toward clearer definitions of virtue, justice and the good life. He wrote nothing; his thought survives through the dialogues of his students, above all Plato.',
      pt: 'A filosofia socrática marca a virada do pensamento ocidental da natureza para o ser humano. Por meio de questionamentos incansáveis nas praças públicas de Atenas, Sócrates criou um método de diálogo — o elenchos — que expõe contradições em nossas crenças e nos conduz a definições mais claras de virtude, justiça e vida boa. Ele nada escreveu; seu pensamento sobrevive nos diálogos de seus discípulos, sobretudo Platão.',
    },
    coreIdeas: {
      en: [
        'Knowledge begins with admitting ignorance',
        'Virtue is a form of knowledge',
        'Dialogue and questioning as the path to truth',
        'Care of the soul above material wealth',
      ],
      pt: [
        'O conhecimento começa por admitir a própria ignorância',
        'A virtude é uma forma de conhecimento',
        'O diálogo e o questionamento como caminho para a verdade',
        'O cuidado da alma acima da riqueza material',
      ],
    },
    philosopherSlugs: ['socrates', 'antisthenes', 'aristippus'],
    accent: '#c2922f',
    scene: 'agora',
    cityImage: '/scenes/athens-v3.webp',
    keyWorks: [
      { title: 'Apology', author: { en: 'Plato', pt: 'Platão' }, year: 'c. 399 BC', note: { en: 'Socrates\' defense speech at trial', pt: 'O discurso de defesa de Sócrates no julgamento' } },
      { title: 'Meno', author: { en: 'Plato', pt: 'Platão' }, year: 'c. 385 BC', note: { en: 'On virtue and recollection', pt: 'Sobre a virtude e a reminiscência' } },
      { title: 'Symposium', author: { en: 'Plato', pt: 'Platão' }, year: 'c. 385 BC', note: { en: 'Dialogues on the nature of love', pt: 'Diálogos sobre a natureza do amor' } },
      { title: 'Memorabilia', author: { en: 'Xenophon', pt: 'Xenofonte' }, year: 'c. 371 BC', note: { en: 'Recollections of Socrates', pt: 'Recordações de Sócrates' } },
      { title: 'Phaedo', author: { en: 'Plato', pt: 'Platão' }, year: 'c. 380 BC', note: { en: 'Socrates\' final hours and the soul', pt: 'As últimas horas de Sócrates e a alma' } },
    ],
  },
  {
    slug: 'platonism',
    name: { en: 'Platonism', pt: 'Platonismo' },
    period: { en: '4th century BC', pt: 'Século IV a.C.' },
    tagline: {
      en: 'Beyond the shadows lies the world of Forms.',
      pt: 'Além das sombras está o mundo das Ideias.',
    },
    description: {
      en: 'Platonism holds that the sensible world is only a shadow of a higher reality: the eternal, immutable world of Forms. True knowledge is the recollection of these perfect Ideas — Beauty itself, Justice itself, the Good itself — which the soul grasped before birth. Founded at the Academy in Athens, the first institution of higher learning in the Western world, Platonism shaped theology, mathematics and political theory for over two millennia.',
      pt: 'O platonismo sustenta que o mundo sensível é apenas uma sombra de uma realidade superior: o mundo eterno e imutável das Ideias. O verdadeiro conhecimento é a reminiscência dessas Formas perfeitas — a Beleza em si, a Justiça em si, o Bem em si — que a alma contemplou antes de nascer. Fundado na Academia de Atenas, a primeira instituição de ensino superior do Ocidente, o platonismo moldou a teologia, a matemática e a teoria política por mais de dois milênios.',
    },
    coreIdeas: {
      en: [
        'The Theory of Forms: perfect, eternal archetypes of all things',
        'The Allegory of the Cave: education as liberation from illusion',
        'The tripartite soul: reason, spirit and appetite',
        'Philosopher-kings: the wise should govern',
      ],
      pt: [
        'A Teoria das Ideias: arquétipos perfeitos e eternos de todas as coisas',
        'A Alegoria da Caverna: a educação como libertação da ilusão',
        'A alma tripartida: razão, ânimo e apetite',
        'Os reis-filósofos: os sábios devem governar',
      ],
    },
    philosopherSlugs: ['plato', 'plotinus', 'hypatia'],
    accent: '#5b7fb9',
    scene: 'academy',
    keyWorks: [
      { title: 'The Republic', author: { en: 'Plato', pt: 'Platão' }, year: 'c. 380 BC', note: { en: 'Justice, the ideal state and the philosopher-king', pt: 'A justiça, o Estado ideal e o rei-filósofo' } },
      { title: 'Timaeus', author: { en: 'Plato', pt: 'Platão' }, year: 'c. 360 BC', note: { en: 'The origin and nature of the cosmos', pt: 'A origem e natureza do cosmos' } },
      { title: 'Phaedrus', author: { en: 'Plato', pt: 'Platão' }, year: 'c. 370 BC', note: { en: 'Love, beauty and the soul\'s wings', pt: 'O amor, a beleza e as asas da alma' } },
      { title: 'Enneads', author: { en: 'Plotinus', pt: 'Plotino' }, year: 'c. 270 AD', note: { en: 'The foundational text of Neoplatonism', pt: 'O texto fundador do neoplatonismo' } },
      { title: 'Theaetetus', author: { en: 'Plato', pt: 'Platão' }, year: 'c. 369 BC', note: { en: 'What is knowledge?', pt: 'O que é o conhecimento?' } },
    ],
  },
  {
    slug: 'aristotelianism',
    name: { en: 'Aristotelianism', pt: 'Aristotelismo' },
    period: { en: '4th century BC', pt: 'Século IV a.C.' },
    tagline: {
      en: 'Happiness is found in virtuous activity.',
      pt: 'A felicidade está na atividade virtuosa.',
    },
    description: {
      en: 'Where Plato looked to a transcendent world, Aristotle turned his gaze to this one. Aristotelianism is a philosophy of observation and classification: everything has a nature, a function and a purpose (telos). Human flourishing — eudaimonia — is achieved by exercising reason and cultivating virtue as a habit, always seeking the golden mean between excess and deficiency. From his school, the Lyceum, Aristotle laid the foundations of logic, biology, ethics, politics and poetics.',
      pt: 'Enquanto Platão olhava para um mundo transcendente, Aristóteles voltou o olhar para este. O aristotelismo é uma filosofia da observação e da classificação: tudo tem uma natureza, uma função e uma finalidade (telos). O florescimento humano — a eudaimonia — é alcançado pelo exercício da razão e pelo cultivo da virtude como hábito, buscando sempre o justo meio entre o excesso e a falta. De sua escola, o Liceu, Aristóteles lançou os fundamentos da lógica, da biologia, da ética, da política e da poética.',
    },
    coreIdeas: {
      en: [
        'Eudaimonia: flourishing through virtuous activity',
        'The golden mean: virtue lies between extremes',
        'Empirical observation as the basis of knowledge',
        'Formal logic and the theory of the syllogism',
      ],
      pt: [
        'Eudaimonia: o florescimento pela atividade virtuosa',
        'O justo meio: a virtude está entre os extremos',
        'A observação empírica como base do conhecimento',
        'A lógica formal e a teoria do silogismo',
      ],
    },
    philosopherSlugs: ['aristotle', 'theophrastus', 'averroes'],
    accent: '#7a9a59',
    scene: 'lyceum',
    keyWorks: [
      { title: 'Nicomachean Ethics', author: { en: 'Aristotle', pt: 'Aristóteles' }, year: 'c. 350 BC', note: { en: 'The definitive account of virtue and happiness', pt: 'O tratado definitivo sobre virtude e felicidade' } },
      { title: 'Politics', author: { en: 'Aristotle', pt: 'Aristóteles' }, year: 'c. 350 BC', note: { en: 'Man as a political animal; forms of government', pt: 'O homem como animal político; formas de governo' } },
      { title: 'Metaphysics', author: { en: 'Aristotle', pt: 'Aristóteles' }, year: 'c. 350 BC', note: { en: 'Being, substance, and the unmoved mover', pt: 'O ser, a substância e o motor imóvel' } },
      { title: 'Poetics', author: { en: 'Aristotle', pt: 'Aristóteles' }, year: 'c. 335 BC', note: { en: 'Tragedy, mimesis and catharsis', pt: 'A tragédia, a mimese e a catarse' } },
      { title: 'The Incoherence of the Incoherence', author: { en: 'Averroes', pt: 'Averróis' }, year: '1180', note: { en: 'Defence of Aristotelian philosophy', pt: 'Defesa da filosofia aristotélica' } },
    ],
  },
  {
    slug: 'stoicism',
    name: { en: 'Stoicism', pt: 'Estoicismo' },
    period: { en: '3rd century BC – 2nd century AD', pt: 'Século III a.C. – Século II d.C.' },
    tagline: {
      en: 'Master what is within your control.',
      pt: 'Domine aquilo que está sob seu controle.',
    },
    description: {
      en: 'Born on the painted porch (Stoa Poikile) of Athens and perfected in imperial Rome, Stoicism teaches serenity through the disciplined distinction between what depends on us — our judgments, desires and actions — and what does not. Virtue is the only true good; external events are indifferent. Practiced by slaves like Epictetus and emperors like Marcus Aurelius alike, it remains one of the most applied philosophies in the modern world.',
      pt: 'Nascido no pórtico pintado (Stoa Poikile) de Atenas e aperfeiçoado na Roma imperial, o estoicismo ensina a serenidade pela distinção disciplinada entre o que depende de nós — nossos julgamentos, desejos e ações — e o que não depende. A virtude é o único bem verdadeiro; os eventos externos são indiferentes. Praticado tanto por escravos, como Epicteto, quanto por imperadores, como Marco Aurélio, permanece uma das filosofias mais aplicadas no mundo moderno.',
    },
    coreIdeas: {
      en: [
        'The dichotomy of control: focus only on what depends on you',
        'Virtue as the sole good; externals are indifferent',
        'Living in agreement with nature and reason',
        'Negative visualization and memento mori as daily practices',
      ],
      pt: [
        'A dicotomia do controle: foque apenas no que depende de você',
        'A virtude como único bem; o resto é indiferente',
        'Viver de acordo com a natureza e a razão',
        'A visualização negativa e o memento mori como práticas diárias',
      ],
    },
    philosopherSlugs: ['zeno-of-citium', 'seneca', 'epictetus', 'marcus-aurelius'],
    accent: '#a35e3b',
    scene: 'stoa',
    keyWorks: [
      { title: 'Meditations', author: { en: 'Marcus Aurelius', pt: 'Marco Aurélio' }, year: 'c. 170 AD', note: { en: 'Private journal of a philosopher-emperor', pt: 'Diário pessoal de um imperador filósofo' } },
      { title: 'Letters to Lucilius', author: { en: 'Seneca', pt: 'Sêneca' }, year: 'c. 65 AD', note: { en: '124 letters on virtue, time and the good life', pt: '124 cartas sobre virtude, o tempo e a vida boa' } },
      { title: 'Discourses', author: { en: 'Epictetus', pt: 'Epicteto' }, year: 'c. 108 AD', note: { en: 'Teachings transcribed by Arrian', pt: 'Ensinamentos transcritos por Arriano' } },
      { title: 'Enchiridion', author: { en: 'Epictetus', pt: 'Epicteto' }, year: 'c. 108 AD', note: { en: 'Handbook of Stoic practice', pt: 'Manual de prática estoica' } },
      { title: 'On the Shortness of Life', author: { en: 'Seneca', pt: 'Sêneca' }, year: 'c. 49 AD', note: { en: 'On using time well', pt: 'Sobre o bom uso do tempo' } },
    ],
  },
  {
    slug: 'rationalism',
    name: { en: 'Rationalism', pt: 'Racionalismo' },
    period: { en: '17th century', pt: 'Século XVII' },
    tagline: {
      en: 'Reason is the chief source of knowledge.',
      pt: 'A razão é a principal fonte do conhecimento.',
    },
    description: {
      en: 'Modern rationalism begins with a radical act: doubting everything that can be doubted. From that methodical doubt, Descartes rebuilt knowledge on a single indubitable foundation — "I think, therefore I am" — and argued that certain truths are innate to reason itself, independent of the senses. Rationalism powered the scientific revolution, analytic geometry and the modern conception of mind, and set the stage for the great debate with empiricism.',
      pt: 'O racionalismo moderno começa com um ato radical: duvidar de tudo o que pode ser posto em dúvida. A partir dessa dúvida metódica, Descartes reconstruiu o conhecimento sobre um único fundamento indubitável — "Penso, logo existo" — e defendeu que certas verdades são inatas à própria razão, independentes dos sentidos. O racionalismo impulsionou a revolução científica, a geometria analítica e a concepção moderna de mente, preparando o grande debate com o empirismo.',
    },
    coreIdeas: {
      en: [
        'Methodical doubt as the starting point of knowledge',
        'The cogito: self-consciousness as the first certainty',
        'Innate ideas grasped by reason alone',
        'Mind–body dualism: thinking substance vs. extended substance',
      ],
      pt: [
        'A dúvida metódica como ponto de partida do conhecimento',
        'O cogito: a autoconsciência como primeira certeza',
        'Ideias inatas apreendidas apenas pela razão',
        'O dualismo mente–corpo: substância pensante vs. substância extensa',
      ],
    },
    philosopherSlugs: ['descartes', 'spinoza', 'leibniz'],
    accent: '#6b5b95',
    scene: 'observatory',
    keyWorks: [
      { title: 'Meditations on First Philosophy', author: { en: 'Descartes', pt: 'Descartes' }, year: '1641', note: { en: 'The cogito and the foundations of modern philosophy', pt: 'O cogito e os fundamentos da filosofia moderna' } },
      { title: 'Ethics', author: { en: 'Spinoza', pt: 'Espinosa' }, year: '1677', note: { en: 'God, mind and human freedom proved geometrically', pt: 'Deus, mente e liberdade humana provados geometricamente' } },
      { title: 'Discourse on the Method', author: { en: 'Descartes', pt: 'Descartes' }, year: '1637', note: { en: 'How to conduct reason and seek truth', pt: 'Como conduzir a razão e buscar a verdade' } },
      { title: 'Monadology', author: { en: 'Leibniz', pt: 'Leibniz' }, year: '1714', note: { en: 'The universe as infinite simple substances', pt: 'O universo como substâncias simples infinitas' } },
      { title: 'Theologico-Political Treatise', author: { en: 'Spinoza', pt: 'Espinosa' }, year: '1670', note: { en: 'Freedom of thought and the secular state', pt: 'Liberdade de pensamento e o Estado secular' } },
    ],
  },
  {
    slug: 'german-idealism',
    name: { en: 'Critical Philosophy & German Idealism', pt: 'Filosofia Crítica e Idealismo Alemão' },
    period: { en: '18th–19th centuries', pt: 'Séculos XVIII–XIX' },
    tagline: {
      en: 'The mind shapes the world it knows.',
      pt: 'A mente molda o mundo que conhece.',
    },
    description: {
      en: "Kant's critical philosophy performed a 'Copernican revolution' in thought: instead of asking how the mind conforms to objects, it asks how objects conform to the structures of the mind. Space, time and causality are not features of things in themselves but forms through which we experience them. From this foundation came a new ethics of duty — the categorical imperative — and the idealist systems of Fichte, Schelling and Hegel that dominated the 19th century.",
      pt: "A filosofia crítica de Kant realizou uma 'revolução copernicana' no pensamento: em vez de perguntar como a mente se conforma aos objetos, pergunta como os objetos se conformam às estruturas da mente. Espaço, tempo e causalidade não são características das coisas em si, mas formas pelas quais as experimentamos. Desse fundamento nasceram uma nova ética do dever — o imperativo categórico — e os sistemas idealistas de Fichte, Schelling e Hegel que dominaram o século XIX.",
    },
    coreIdeas: {
      en: [
        'The Copernican revolution: knowledge shaped by the knowing mind',
        'Phenomena vs. things-in-themselves',
        'The categorical imperative: act only on universalizable maxims',
        'Human dignity: persons as ends, never merely means',
      ],
      pt: [
        'A revolução copernicana: o conhecimento moldado pela mente que conhece',
        'Fenômenos vs. coisas em si',
        'O imperativo categórico: aja apenas por máximas universalizáveis',
        'A dignidade humana: pessoas como fins, nunca apenas meios',
      ],
    },
    philosopherSlugs: ['kant', 'fichte', 'hegel'],
    accent: '#3f7d75',
    scene: 'library',
    keyWorks: [
      { title: 'Critique of Pure Reason', author: { en: 'Kant', pt: 'Kant' }, year: '1781', note: { en: 'The limits and structure of human knowledge', pt: 'Os limites e a estrutura do conhecimento humano' } },
      { title: 'Groundwork for the Metaphysics of Morals', author: { en: 'Kant', pt: 'Kant' }, year: '1785', note: { en: 'The categorical imperative and human dignity', pt: 'O imperativo categórico e a dignidade humana' } },
      { title: 'Phenomenology of Spirit', author: { en: 'Hegel', pt: 'Hegel' }, year: '1807', note: { en: 'Consciousness unfolding toward absolute knowledge', pt: 'A consciência desdobrando-se rumo ao saber absoluto' } },
      { title: 'Science of Logic', author: { en: 'Hegel', pt: 'Hegel' }, year: '1812', note: { en: 'Being, essence and the dialectical method', pt: 'O ser, a essência e o método dialético' } },
      { title: 'Critique of Practical Reason', author: { en: 'Kant', pt: 'Kant' }, year: '1788', note: { en: 'Moral law and freedom of the will', pt: 'A lei moral e a liberdade da vontade' } },
    ],
  },
  {
    slug: 'existentialism',
    name: { en: 'Existentialism', pt: 'Existencialismo' },
    period: { en: '19th–20th centuries', pt: 'Séculos XIX–XX' },
    tagline: {
      en: 'Existence precedes essence.',
      pt: 'A existência precede a essência.',
    },
    description: {
      en: 'Existentialism places the concrete, choosing individual at the center of philosophy. There is no pre-given human essence: we are condemned to be free, and we define ourselves through our choices. Nietzsche announced the death of God and called for the creation of new values; Sartre and Beauvoir explored freedom, bad faith and responsibility in the cafés of post-war Paris. Beauvoir extended the analysis to the condition of women, founding modern feminist philosophy.',
      pt: 'O existencialismo coloca o indivíduo concreto, que escolhe, no centro da filosofia. Não há uma essência humana pré-definida: estamos condenados a ser livres e nos definimos por nossas escolhas. Nietzsche anunciou a morte de Deus e convocou à criação de novos valores; Sartre e Beauvoir exploraram a liberdade, a má-fé e a responsabilidade nos cafés da Paris do pós-guerra. Beauvoir estendeu a análise à condição da mulher, fundando a filosofia feminista moderna.',
    },
    coreIdeas: {
      en: [
        'Existence precedes essence: we create ourselves through choices',
        'Radical freedom and the weight of responsibility',
        'Authenticity vs. bad faith and the herd',
        'The revaluation of all values and the Übermensch',
      ],
      pt: [
        'A existência precede a essência: criamo-nos por nossas escolhas',
        'A liberdade radical e o peso da responsabilidade',
        'Autenticidade vs. má-fé e o rebanho',
        'A transvaloração de todos os valores e o Übermensch',
      ],
    },
    philosopherSlugs: ['kierkegaard', 'nietzsche', 'sartre', 'simone-de-beauvoir'],
    accent: '#9a4a5a',
    scene: 'cafe',
    keyWorks: [
      { title: 'Being and Nothingness', author: { en: 'Sartre', pt: 'Sartre' }, year: '1943', note: { en: 'Consciousness, freedom and bad faith', pt: 'A consciência, a liberdade e a má-fé' } },
      { title: 'The Second Sex', author: { en: 'Simone de Beauvoir', pt: 'Simone de Beauvoir' }, year: '1949', note: { en: 'The founding text of modern feminist philosophy', pt: 'O texto fundador da filosofia feminista moderna' } },
      { title: 'Thus Spoke Zarathustra', author: { en: 'Nietzsche', pt: 'Nietzsche' }, year: '1883', note: { en: 'The death of God and the Übermensch', pt: 'A morte de Deus e o Übermensch' } },
      { title: 'Either/Or', author: { en: 'Kierkegaard', pt: 'Kierkegaard' }, year: '1843', note: { en: 'The aesthetic and ethical stages of existence', pt: 'Os estágios estético e ético da existência' } },
      { title: 'Beyond Good and Evil', author: { en: 'Nietzsche', pt: 'Nietzsche' }, year: '1886', note: { en: 'Critique of morality and the will to power', pt: 'Crítica da moral e a vontade de potência' } },
    ],
  },
];

export function getSchool(slug: string): School | undefined {
  return schools.find((s) => s.slug === slug);
}
