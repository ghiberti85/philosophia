import type { HistoricalEvent } from './types';

export const historicalEvents: HistoricalEvent[] = [
  // Socratic Philosophy (470–399 BC)
  {
    slug: 'peloponnesian-war',
    name: { en: 'Peloponnesian War', pt: 'Guerra do Peloponeso' },
    description: {
      en: 'Conflict between Athens and Sparta that shaped the era of Socratic philosophy and democratic thought.',
      pt: 'Conflito entre Atenas e Esparta que moldou a era da filosofia socrática e do pensamento democrático.',
    },
    year: '431–404 BC',
    category: 'war',
    schoolSlugs: ['socratic-philosophy', 'platonism'],
    significance: 5,
    iconName: 'war',
    context: {
      en: 'The Peloponnesian War marked the decline of Athenian political power and profoundly influenced Socrates and his contemporaries, raising questions about justice, virtue, and the state.',
      pt: 'A Guerra do Peloponeso marcou o declínio do poder político ateniense e influenciou profundamente Sócrates e seus contemporâneos, levantando questões sobre justiça, virtude e o Estado.',
    },
  },
  {
    slug: 'parthenon-construction',
    name: { en: 'Construction of the Parthenon', pt: 'Construção do Partenon' },
    description: {
      en: 'The iconic temple of Athena built on the Acropolis, symbolizing the height of Athenian democracy and cultural achievement.',
      pt: 'O templo icônico de Atena construído na Acrópole, simbolizando o auge da democracia ateniense e realizações culturais.',
    },
    year: '447–432 BC',
    category: 'construction',
    schoolSlugs: ['socratic-philosophy'],
    significance: 4,
    iconName: 'landmark',
    context: {
      en: 'Built under Pericles, the Parthenon represented the pinnacle of ancient Greek architecture and influenced philosophical discussions about beauty and ideal forms.',
      pt: 'Construído sob Péricles, o Partenon representava o pico da arquitetura grega antiga e influenciou discussões filosóficas sobre beleza e formas ideais.',
    },
  },
  {
    slug: 'athenian-democracy',
    name: { en: 'Peak of Athenian Democracy', pt: 'Auge da Democracia Ateniense' },
    description: {
      en: 'The height of direct democracy in Athens under Pericles, providing the context for Socratic dialogues about justice and governance.',
      pt: 'O auge da democracia direta em Atenas sob Péricles, fornecendo o contexto para diálogos socráticos sobre justiça e governo.',
    },
    year: '450–430 BC',
    category: 'art',
    schoolSlugs: ['socratic-philosophy'],
    significance: 5,
    context: {
      en: 'During this era, Socrates questioned established norms and engaged citizens in critical dialogue, laying the groundwork for Western philosophy.',
      pt: 'Durante esta época, Sócrates questionava as normas estabelecidas e se engajava em diálogo crítico com cidadãos, estabelecendo as bases para a filosofia ocidental.',
    },
  },
  {
    slug: 'sophist-movement',
    name: { en: 'Sophist Movement', pt: 'Movimento Sofista' },
    description: {
      en: 'Professional teachers offering rhetoric and relative truths, against whom Socrates argued for absolute virtue and knowledge.',
      pt: 'Professores profissionais oferecendo retórica e verdades relativas, contra os quais Sócrates argumentava por virtude e conhecimento absolutos.',
    },
    year: '450–400 BC',
    category: 'art',
    schoolSlugs: ['socratic-philosophy'],
    significance: 4,
  },

  // Platonism (428–348 BC)
  {
    slug: 'socrates-trial',
    name: { en: 'Trial and Death of Socrates', pt: 'Julgamento e Morte de Sócrates' },
    description: {
      en: 'Socrates was tried for impiety and corrupting the youth, executed in 399 BC, inspiring Plato\'s philosophical works.',
      pt: 'Sócrates foi julgado por impiedade e corrupção da juventude, executado em 399 BC, inspirando as obras filosóficas de Platão.',
    },
    year: '399 BC',
    category: 'disaster',
    schoolSlugs: ['platonism', 'socratic-philosophy'],
    significance: 5,
    context: {
      en: 'This event profoundly affected Plato and became central to his philosophical project: preserving Socrates\' legacy and exploring justice, virtue, and the state.',
      pt: 'Este evento afetou profundamente Platão e tornou-se central em seu projeto filosófico: preservar o legado de Sócrates e explorar justiça, virtude e o Estado.',
    },
  },
  {
    slug: 'platos-academy',
    name: { en: 'Plato\'s Academy Founded', pt: 'Academia de Platão Fundada' },
    description: {
      en: 'Plato established the Academy in Athens, one of the earliest institutions of higher learning in the Western world.',
      pt: 'Platão estabeleceu a Academia em Atenas, uma das primeiras instituições de ensino superior do mundo ocidental.',
    },
    year: '387 BC',
    category: 'art',
    schoolSlugs: ['platonism'],
    significance: 5,
    iconName: 'landmark',
    context: {
      en: 'The Academy became the intellectual center of Athens and remained active for nearly 900 years, advancing mathematical and philosophical inquiry.',
      pt: 'A Academia tornou-se o centro intelectual de Atenas e permaneceu ativa por quase 900 anos, avançando a investigação matemática e filosófica.',
    },
  },
  {
    slug: 'macedonian-rise',
    name: { en: 'Rise of Macedon', pt: 'Ascensão da Macedônia' },
    description: {
      en: 'Philip II of Macedon\'s military campaigns began consolidating power in Greece, changing the political landscape.',
      pt: 'As campanhas militares de Filipe II da Macedônia começaram a consolidar o poder na Grécia, mudando a paisagem política.',
    },
    year: '359–336 BC',
    category: 'war',
    schoolSlugs: ['platonism', 'aristotelianism'],
    significance: 4,
  },

  // Aristotelianism (384–322 BC)
  {
    slug: 'alexander-conquest',
    name: { en: 'Alexander\'s Conquests', pt: 'Conquistas de Alexandre' },
    description: {
      en: 'Alexander the Great, student of Aristotle, conquered the Persian Empire and spread Greek culture across Asia.',
      pt: 'Alexandre o Grande, aluno de Aristóteles, conquistou o Império Persa e espalhou a cultura grega pela Ásia.',
    },
    year: '334–323 BC',
    category: 'war',
    schoolSlugs: ['aristotelianism'],
    significance: 5,
    context: {
      en: 'Aristotle\'s empirical approach and logical methods influenced Alexander\'s military strategy and approach to knowledge.',
      pt: 'A abordagem empírica e os métodos lógicos de Aristóteles influenciaram a estratégia militar de Alexandre e sua abordagem ao conhecimento.',
    },
  },
  {
    slug: 'aristotles-lyceum',
    name: { en: 'Aristotle\'s Lyceum', pt: 'Liceu de Aristóteles' },
    description: {
      en: 'Aristotle established his own school, the Lyceum, emphasizing empirical observation and systematic inquiry.',
      pt: 'Aristóteles estabeleceu sua própria escola, o Liceu, enfatizando observação empírica e investigação sistemática.',
    },
    year: '335 BC',
    category: 'art',
    schoolSlugs: ['aristotelianism'],
    significance: 5,
    iconName: 'landmark',
  },
  {
    slug: 'hellenistic-era',
    name: { en: 'Beginning of the Hellenistic Era', pt: 'Início da Era Helenística' },
    description: {
      en: 'After Alexander\'s death, Greek culture blended with Eastern influences, creating new philosophical schools.',
      pt: 'Após a morte de Alexandre, a cultura grega se misturou com influências orientais, criando novas escolas filosóficas.',
    },
    year: '323 BC',
    category: 'art',
    schoolSlugs: ['aristotelianism', 'stoicism', 'epicureanism'],
    significance: 4,
  },

  // Stoicism (300 BC onwards)
  {
    slug: 'stoic-school-founded',
    name: { en: 'Stoic School Founded', pt: 'Escola Estóica Fundada' },
    description: {
      en: 'Zeno of Citium founded Stoicism in Athens, teaching virtue as the highest good and emphasizing rational acceptance of fate.',
      pt: 'Zenão de Cítio fundou o Estoicismo em Atenas, ensinando a virtude como o bem supremo e enfatizando a aceitação racional do destino.',
    },
    year: '300 BC',
    category: 'art',
    schoolSlugs: ['stoicism'],
    significance: 5,
    context: {
      en: 'Stoicism emerged as a response to the uncertainty of the Hellenistic world and became deeply influential in Roman civilization.',
      pt: 'O Estoicismo emergiu como uma resposta à incerteza do mundo helenístico e tornou-se profundamente influente na civilização romana.',
    },
  },
  {
    slug: 'epicurus-school',
    name: { en: 'Epicurus\'s School of Philosophy', pt: 'Escola de Filosofia de Epicuro' },
    description: {
      en: 'Epicurus founded his philosophical garden, emphasizing simple pleasures, friendship, and freedom from fear.',
      pt: 'Epicuro fundou seu jardim filosófico, enfatizando prazeres simples, amizade e liberdade do medo.',
    },
    year: '307 BC',
    category: 'art',
    schoolSlugs: ['epicureanism'],
    significance: 4,
  },
  {
    slug: 'first-punic-war',
    name: { en: 'First Punic War', pt: 'Primeira Guerra Púnica' },
    description: {
      en: 'Rome and Carthage competed for Mediterranean dominance, marking the rise of Rome as a superpower.',
      pt: 'Roma e Cartago competiram pela dominância mediterrânea, marcando a ascensão de Roma como superpotência.',
    },
    year: '264–241 BC',
    category: 'war',
    schoolSlugs: ['stoicism'],
    significance: 4,
  },
  {
    slug: 'roman-expansion',
    name: { en: 'Roman Expansion into Greece', pt: 'Expansão Romana na Grécia' },
    description: {
      en: 'Rome conquered Greece, bringing Stoicism and Greek philosophy to the Roman elite.',
      pt: 'Roma conquistou a Grécia, levando o Estoicismo e a filosofia grega para a elite romana.',
    },
    year: '200–146 BC',
    category: 'war',
    schoolSlugs: ['stoicism'],
    significance: 4,
  },
  {
    slug: 'library-alexandria',
    name: { en: 'Library of Alexandria', pt: 'Biblioteca de Alexandria' },
    description: {
      en: 'The world\'s greatest repository of ancient texts, preserving philosophical works and promoting intellectual exchange.',
      pt: 'O maior repositório de textos antigos do mundo, preservando obras filosóficas e promovendo intercâmbio intelectual.',
    },
    year: 'c. 280 BC',
    category: 'construction',
    schoolSlugs: ['stoicism', 'epicureanism', 'aristotelianism'],
    significance: 5,
    iconName: 'landmark',
  },
  {
    slug: 'marcus-aurelius-reign',
    name: { en: 'Marcus Aurelius Reign', pt: 'Reinado de Marco Aurélio' },
    description: {
      en: 'The philosopher-emperor\'s rule exemplified Stoic principles applied to leadership and governance.',
      pt: 'O reinado do imperador-filósofo exemplificou princípios estoicos aplicados à liderança e governo.',
    },
    year: '161–180 AD',
    category: 'art',
    schoolSlugs: ['stoicism'],
    significance: 5,
    context: {
      en: 'Marcus Aurelius wrote his Meditations, one of the most influential Stoic texts, reflecting on virtue, duty, and rational acceptance.',
      pt: 'Marco Aurélio escreveu suas Meditações, um dos textos estoicos mais influentes, refletindo sobre virtude, dever e aceitação racional.',
    },
  },

  // Rationalism (17th–18th centuries)
  {
    slug: 'scientific-revolution',
    name: { en: 'Scientific Revolution', pt: 'Revolução Científica' },
    description: {
      en: 'A period of rapid scientific advancement challenging medieval views and emphasizing observation and reason.',
      pt: 'Um período de rápido avanço científico desafiando visões medievais e enfatizando observação e razão.',
    },
    year: '1500–1700',
    category: 'discovery',
    schoolSlugs: ['rationalism'],
    significance: 5,
    context: {
      en: 'Rationalists like Descartes sought to ground knowledge in reason and mathematics, responding to the challenges posed by the Scientific Revolution.',
      pt: 'Racionalistas como Descartes buscavam fundamentar o conhecimento em razão e matemática, respondendo aos desafios da Revolução Científica.',
    },
  },
  {
    slug: 'descartes-publications',
    name: { en: 'Descartes\' Discourse on Method', pt: 'Discurso do Método de Descartes' },
    description: {
      en: 'René Descartes published his foundational work promoting methodical doubt and rationalist epistemology.',
      pt: 'René Descartes publicou sua obra fundamental promovendo a dúvida metódica e epistemologia racionalista.',
    },
    year: '1637',
    category: 'art',
    schoolSlugs: ['rationalism'],
    significance: 5,
    context: {
      en: 'The work introduced "Cogito ergo sum" and established reason as the foundation of all knowledge, defining rationalism for centuries.',
      pt: 'A obra introduziu "Penso, logo existo" e estabeleceu a razão como fundação de todo conhecimento, definindo o racionalismo por séculos.',
    },
  },
  {
    slug: 'english-civil-war',
    name: { en: 'English Civil War', pt: 'Guerra Civil Inglesa' },
    description: {
      en: 'Political upheaval that challenged absolute monarchy and influenced Enlightenment thinking about power and liberty.',
      pt: 'Turbulência política que desafiou a monarquia absoluta e influenciou o pensamento iluminista sobre poder e liberdade.',
    },
    year: '1642–1651',
    category: 'war',
    schoolSlugs: ['rationalism'],
    significance: 4,
  },
  {
    slug: 'newton-principia',
    name: { en: 'Newton\'s Principia', pt: 'Principia de Newton' },
    description: {
      en: 'Isaac Newton published his mathematical laws of motion and gravity, becoming the scientific foundation for rationalist thought.',
      pt: 'Isaac Newton publicou suas leis matemáticas do movimento e gravidade, tornando-se a fundação científica do pensamento racionalista.',
    },
    year: '1687',
    category: 'discovery',
    schoolSlugs: ['rationalism'],
    significance: 5,
    iconName: 'bolt',
    context: {
      en: 'Newton\'s work exemplified the power of mathematical reason to explain nature, confirming rationalist principles.',
      pt: 'O trabalho de Newton exemplificou o poder da razão matemática para explicar a natureza, confirmando princípios racionalistas.',
    },
  },
  {
    slug: 'leibniz-calculus',
    name: { en: 'Leibniz Develops Calculus', pt: 'Leibniz Desenvolve o Cálculo' },
    description: {
      en: 'Gottfried Leibniz independently invented calculus, advancing mathematical reasoning and rationalist methods.',
      pt: 'Gottfried Leibniz independentemente inventou o cálculo, avançando o raciocínio matemático e métodos racionalistas.',
    },
    year: '1675–1676',
    category: 'discovery',
    schoolSlugs: ['rationalism'],
    significance: 4,
    iconName: 'bolt',
  },

  // German Idealism (18th–19th centuries)
  {
    slug: 'enlightenment',
    name: { en: 'The Enlightenment', pt: 'O Iluminismo' },
    description: {
      en: 'A cultural movement emphasizing reason, science, and individual rights, setting the stage for German Idealism.',
      pt: 'Um movimento cultural enfatizando razão, ciência e direitos individuais, preparando o terreno para o Idealismo Alemão.',
    },
    year: '1650–1800',
    category: 'art',
    schoolSlugs: ['rationalism', 'german-idealism'],
    significance: 5,
    context: {
      en: 'German Idealists built upon Enlightenment principles while critiquing purely rationalist approaches, introducing dialectical thinking.',
      pt: 'Idealistas Alemães construíram sobre princípios iluministas enquanto criticavam abordagens puramente racionalistas, introduzindo pensamento dialético.',
    },
  },
  {
    slug: 'kant-critique',
    name: { en: 'Kant\'s Critique of Pure Reason', pt: 'Crítica da Razão Pura de Kant' },
    description: {
      en: 'Immanuel Kant published his groundbreaking work, revolutionizing epistemology and establishing transcendental idealism.',
      pt: 'Immanuel Kant publicou sua obra revolucionária, revolucionando a epistemologia e estabelecendo o idealismo transcendental.',
    },
    year: '1781',
    category: 'art',
    schoolSlugs: ['german-idealism', 'rationalism'],
    significance: 5,
    context: {
      en: 'Kant\'s philosophy bridged rationalism and empiricism, becoming the foundation for all subsequent German Idealism.',
      pt: 'A filosofia de Kant conectou racionalismo e empirismo, tornando-se a fundação para todo Idealismo Alemão subsequente.',
    },
  },
  {
    slug: 'french-revolution',
    name: { en: 'French Revolution', pt: 'Revolução Francesa' },
    description: {
      en: 'Political revolution emphasizing reason, liberty, and equality, influencing German Idealist political philosophy.',
      pt: 'Revolução política enfatizando razão, liberdade e igualdade, influenciando a filosofia política idealista alemã.',
    },
    year: '1789–1799',
    category: 'revolution',
    schoolSlugs: ['german-idealism'],
    significance: 5,
    iconName: 'war',
  },
  {
    slug: 'hegel-phenomenology',
    name: { en: 'Hegel\'s Phenomenology of Spirit', pt: 'Fenomenologia do Espírito de Hegel' },
    description: {
      en: 'G.W.F. Hegel published his major work, establishing dialectical idealism and the philosophy of history.',
      pt: 'G.W.F. Hegel publicou sua obra maior, estabelecendo o idealismo dialético e a filosofia da história.',
    },
    year: '1807',
    category: 'art',
    schoolSlugs: ['german-idealism'],
    significance: 5,
    context: {
      en: 'Hegel\'s work synthesized previous German idealist thought and provided the philosophical framework for 19th-century intellectual movements.',
      pt: 'A obra de Hegel sintetizou o pensamento idealista alemão anterior e forneceu o framework filosófico para movimentos intelectuais do século 19.',
    },
  },
  {
    slug: 'napoleonic-wars',
    name: { en: 'Napoleonic Wars', pt: 'Guerras Napoleônicas' },
    description: {
      en: 'Napoleon\'s military campaigns reshaped Europe, inspiring German nationalism and idealist responses to historical change.',
      pt: 'As campanhas militares de Napoleão remodelaram a Europa, inspirando nacionalismo alemão e respostas idealistas à mudança histórica.',
    },
    year: '1803–1815',
    category: 'war',
    schoolSlugs: ['german-idealism'],
    significance: 4,
  },
  {
    slug: 'industrial-revolution',
    name: { en: 'Industrial Revolution', pt: 'Revolução Industrial' },
    description: {
      en: 'The transformation from agrarian to industrial society, raising philosophical questions about labor, progress, and human freedom.',
      pt: 'A transformação de sociedade agrária para industrial, levantando questões filosóficas sobre trabalho, progresso e liberdade humana.',
    },
    year: '1760–1840',
    category: 'discovery',
    schoolSlugs: ['german-idealism'],
    significance: 5,
    context: {
      en: 'German Idealists grappled with the implications of industrialization and sought to understand historical progress through philosophy.',
      pt: 'Idealistas Alemães enfrentaram as implicações da industrialização e buscaram entender o progresso histórico através da filosofia.',
    },
  },

  // Existentialism (19th–20th centuries)
  {
    slug: 'kierkegaard-works',
    name: { en: 'Kierkegaard\'s Major Works', pt: 'Obras Maiores de Kierkegaard' },
    description: {
      en: 'Søren Kierkegaard published works emphasizing individual choice, anxiety, and faith, laying foundations for existentialism.',
      pt: 'Søren Kierkegaard publicou obras enfatizando escolha individual, ansiedade e fé, lançando fundações para o existencialismo.',
    },
    year: '1843–1855',
    category: 'art',
    schoolSlugs: ['existentialism'],
    significance: 5,
    context: {
      en: 'Kierkegaard\'s focus on subjective truth and individual existence prefigured existentialist themes a century later.',
      pt: 'O foco de Kierkegaard na verdade subjetiva e existência individual prefigurou temas existencialistas um século depois.',
    },
  },
  {
    slug: 'nietzsche-works',
    name: { en: 'Nietzsche\'s Philosophy', pt: 'Filosofia de Nietzsche' },
    description: {
      en: 'Friedrich Nietzsche challenged conventional morality and advocated for individual creation of values.',
      pt: 'Friedrich Nietzsche desafiou a moral convencional e defendeu a criação individual de valores.',
    },
    year: '1872–1888',
    category: 'art',
    schoolSlugs: ['existentialism'],
    significance: 5,
    context: {
      en: 'Nietzsche\'s emphasis on individual freedom and authentic existence profoundly influenced 20th-century existentialists.',
      pt: 'A ênfase de Nietzsche na liberdade individual e existência autêntica influenciou profundamente existencialistas do século 20.',
    },
  },
  {
    slug: 'world-war-one',
    name: { en: 'World War One', pt: 'Primeira Guerra Mundial' },
    description: {
      en: 'Global conflict causing unprecedented suffering and challenging optimistic philosophical views of progress.',
      pt: 'Conflito global causando sofrimento sem precedentes e desafiando visões filosóficas otimistas sobre o progresso.',
    },
    year: '1914–1918',
    category: 'war',
    schoolSlugs: ['existentialism'],
    significance: 5,
    iconName: 'war',
    context: {
      en: 'The devastation of WWI prompted existentialist thinkers to confront fundamental questions about meaning, freedom, and human nature.',
      pt: 'A devastação da Primeira Guerra Mundial levou pensadores existencialistas a confrontar questões fundamentais sobre significado, liberdade e natureza humana.',
    },
  },
  {
    slug: 'heidegger-being-time',
    name: { en: 'Heidegger\'s Being and Time', pt: 'Ser e Tempo de Heidegger' },
    description: {
      en: 'Martin Heidegger published his foundational work, transforming existential philosophy and phenomenology.',
      pt: 'Martin Heidegger publicou sua obra fundamental, transformando a filosofia existencial e fenomenologia.',
    },
    year: '1927',
    category: 'art',
    schoolSlugs: ['existentialism'],
    significance: 5,
    context: {
      en: 'Heidegger\'s analysis of Being and human existence became central to existentialist thought and influenced thinkers like Sartre.',
      pt: 'A análise de Heidegger sobre o Ser e a existência humana tornou-se central ao pensamento existencialista e influenciou pensadores como Sartre.',
    },
  },
  {
    slug: 'great-depression',
    name: { en: 'Great Depression', pt: 'Grande Depressão' },
    description: {
      en: 'Global economic crisis raising existential questions about meaning, security, and social responsibility.',
      pt: 'Crise econômica global levantando questões existenciais sobre significado, segurança e responsabilidade social.',
    },
    year: '1929–1939',
    category: 'disaster',
    schoolSlugs: ['existentialism'],
    significance: 4,
  },
  {
    slug: 'world-war-two',
    name: { en: 'World War Two', pt: 'Segunda Guerra Mundial' },
    description: {
      en: 'Global conflict of unparalleled scale and moral ambiguity, deepening existential questions about freedom and responsibility.',
      pt: 'Conflito global de escala sem precedentes e ambiguidade moral, aprofundando questões existenciais sobre liberdade e responsabilidade.',
    },
    year: '1939–1945',
    category: 'war',
    schoolSlugs: ['existentialism'],
    significance: 5,
    iconName: 'war',
    context: {
      en: 'WWII\'s horrors and moral complexities became central to existentialist reflection on human freedom, choice, and ethical responsibility.',
      pt: 'Os horrores da Segunda Guerra Mundial e suas complexidades morais tornaram-se centrais à reflexão existencialista sobre liberdade humana, escolha e responsabilidade ética.',
    },
  },
  {
    slug: 'sartre-existentialism',
    name: { en: 'Sartre\'s Existentialism is a Humanism', pt: 'O Existencialismo é um Humanismo de Sartre' },
    description: {
      en: 'Jean-Paul Sartre articulated existentialism as a philosophy of human freedom, responsibility, and authentic existence.',
      pt: 'Jean-Paul Sartre articulou o existencialismo como uma filosofia de liberdade humana, responsabilidade e existência autêntica.',
    },
    year: '1945',
    category: 'art',
    schoolSlugs: ['existentialism'],
    significance: 5,
    context: {
      en: 'Sartre\'s 1945 lecture defined existentialism for post-war intellectuals, emphasizing that "existence precedes essence" and humans create their own meaning.',
      pt: 'A palestra de Sartre em 1945 definiu o existencialismo para intelectuais pós-guerra, enfatizando que "a existência precede a essência" e os humanos criam seu próprio significado.',
    },
  },
  {
    slug: 'simone-beauvoir-second-sex',
    name: { en: 'Simone de Beauvoir\'s The Second Sex', pt: 'O Segundo Sexo de Simone de Beauvoir' },
    description: {
      en: 'Simone de Beauvoir published a groundbreaking work applying existentialism to gender, identity, and women\'s liberation.',
      pt: 'Simone de Beauvoir publicou uma obra inovadora aplicando existencialismo ao gênero, identidade e liberação das mulheres.',
    },
    year: '1949',
    category: 'art',
    schoolSlugs: ['existentialism'],
    significance: 5,
    context: {
      en: 'Beauvoir\'s work extended existentialist philosophy to address social oppression and became foundational for feminist philosophy.',
      pt: 'A obra de Beauvoir estendeu a filosofia existencialista para abordar opressão social e tornou-se fundamental para a filosofia feminista.',
    },
  },
  {
    slug: 'cold-war',
    name: { en: 'Cold War Begins', pt: 'Início da Guerra Fria' },
    description: {
      en: 'Global ideological tension between capitalism and communism, prompting existential questions about ideology and freedom.',
      pt: 'Tensão ideológica global entre capitalismo e comunismo, levantando questões existenciais sobre ideologia e liberdade.',
    },
    year: '1947–1991',
    category: 'war',
    schoolSlugs: ['existentialism'],
    significance: 4,
  },
  {
    slug: 'camus-absurd',
    name: { en: 'Camus and the Absurd', pt: 'Camus e o Absurdo' },
    description: {
      en: 'Albert Camus explored the absurdity of existence and the human search for meaning in an indifferent universe.',
      pt: 'Albert Camus explorou o absurdo da existência e a busca humana por significado em um universo indiferente.',
    },
    year: '1942–1956',
    category: 'art',
    schoolSlugs: ['existentialism'],
    significance: 4,
    context: {
      en: 'Camus\'s philosophy of absurdism complemented Sartre\'s existentialism, offering a different perspective on meaning and revolt.',
      pt: 'A filosofia do absurdo de Camus complementou o existencialismo de Sartre, oferecendo uma perspectiva diferente sobre significado e revolta.',
    },
  },
];

export function getEventsFor(schoolSlug: string): HistoricalEvent[] {
  return historicalEvents.filter((e) => e.schoolSlugs.includes(schoolSlug));
}
