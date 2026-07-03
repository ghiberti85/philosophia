import type { Philosopher } from './types';
import { philosophersExtra } from './philosophers-extra';

const corePhilosophers: Philosopher[] = [
  {
    slug: 'socrates',
    name: { en: 'Socrates', pt: 'Sócrates' },
    years: { en: '470–399 BC', pt: '470–399 a.C.' },
    birthplace: { en: 'Athens, Greece', pt: 'Atenas, Grécia' },
    schoolSlugs: ['socratic-philosophy'],
    influencedBy: [],
    epithet: {
      en: 'The Gadfly of Athens',
      pt: 'O Moscardo de Atenas',
    },
    biography: {
      en: [
        'Socrates was born in Athens around 470 BC, the son of a stonemason and a midwife. He served with distinction as a hoplite in the Peloponnesian War before dedicating his life to philosophy — which for him meant conversation. He owned almost nothing, walked barefoot through the agora, and questioned generals, poets and craftsmen about justice, courage and piety, invariably revealing that they could not define what they claimed to know.',
        'His habit of deflating the powerful earned him devoted students and dangerous enemies. In 399 BC, at the age of seventy, he was tried for "corrupting the youth" and "impiety". Offered escape by his friends, he refused, arguing that evading the law would betray the principles he had taught all his life. He drank the hemlock surrounded by his students, discussing the immortality of the soul until the end.',
      ],
      pt: [
        'Sócrates nasceu em Atenas por volta de 470 a.C., filho de um escultor de pedras e de uma parteira. Serviu com distinção como hoplita na Guerra do Peloponeso antes de dedicar a vida à filosofia — que, para ele, significava conversação. Quase nada possuía, andava descalço pela ágora e interrogava generais, poetas e artesãos sobre justiça, coragem e piedade, revelando invariavelmente que eles não sabiam definir aquilo que afirmavam conhecer.',
        'Seu hábito de desmascarar os poderosos rendeu-lhe discípulos devotados e inimigos perigosos. Em 399 a.C., aos setenta anos, foi julgado por "corromper a juventude" e por "impiedade". Quando os amigos lhe ofereceram a fuga, recusou, argumentando que burlar a lei trairia os princípios que ensinara a vida inteira. Bebeu a cicuta cercado por seus discípulos, discutindo a imortalidade da alma até o fim.',
      ],
    },
    contributions: {
      en: [
        'The Socratic method (elenchus): truth-seeking through systematic questioning',
        'Shifted philosophy from cosmology to ethics and the human soul',
        'Established the ideal of intellectual humility — knowing that one does not know',
        'Inspired the major Socratic schools: Platonism, Cynicism and Cyrenaicism',
      ],
      pt: [
        'O método socrático (elenchos): a busca da verdade pelo questionamento sistemático',
        'Deslocou a filosofia da cosmologia para a ética e a alma humana',
        'Estabeleceu o ideal da humildade intelectual — saber que não se sabe',
        'Inspirou as grandes escolas socráticas: platonismo, cinismo e cirenaísmo',
      ],
    },
    quotes: [
      {
        text: {
          en: 'The unexamined life is not worth living.',
          pt: 'Uma vida sem reflexão não merece ser vivida.',
        },
        source: { en: 'Apology, 38a', pt: 'Apologia, 38a' },
      },
      {
        text: {
          en: 'I know that I know nothing.',
          pt: 'Só sei que nada sei.',
        },
        source: { en: 'Attributed, via Plato', pt: 'Atribuída, via Platão' },
      },
      {
        text: {
          en: 'Wonder is the beginning of wisdom.',
          pt: 'A admiração é o princípio da sabedoria.',
        },
      },
    ],
    traits: {
      en: ['Relentlessly curious', 'Ironic', 'Austere', 'Courageous', 'Incorruptible'],
      pt: ['Incansavelmente curioso', 'Irônico', 'Austero', 'Corajoso', 'Incorruptível'],
    },
    facts: {
      en: [
        'He never wrote a single line of philosophy — everything we know comes from Plato, Xenophon and Aristophanes.',
        'The Oracle of Delphi declared that no one was wiser than Socrates, which he set out to disprove — and failed.',
        'He claimed to be guided by a daimonion, an inner divine voice that warned him against mistakes.',
        'At his trial he proposed, as his "punishment", free meals for life at public expense.',
      ],
      pt: [
        'Nunca escreveu uma única linha de filosofia — tudo o que sabemos vem de Platão, Xenofonte e Aristófanes.',
        'O Oráculo de Delfos declarou que ninguém era mais sábio que Sócrates, o que ele tentou refutar — e não conseguiu.',
        'Afirmava ser guiado por um daimonion, uma voz divina interior que o alertava contra erros.',
        'Em seu julgamento, propôs como "punição" receber refeições gratuitas e vitalícias às custas do Estado.',
      ],
    },
    bust: {
      marble: '#e8e2d4',
      pedestal: '#c2922f',
      headWidth: 0.85,
      beard: 0.9,
      hair: 0.35,
      look: {
        skin: '#e3a878',
        hair: '#ebe6da',
        cloth: '#ece2cc',
        clothAccent: '#c2922f',
        hairstyle: 'bald',
        beard: 'long',
        mustache: 'normal',
      },
    },
    figureImage: '/figures/socrates.webp',
  },
  {
    slug: 'plato',
    name: { en: 'Plato', pt: 'Platão' },
    years: { en: '428–348 BC', pt: '428–348 a.C.' },
    birthplace: { en: 'Athens, Greece', pt: 'Atenas, Grécia' },
    schoolSlugs: ['platonism'],
    influencedBy: ['socrates'],
    epithet: {
      en: 'Architect of the World of Forms',
      pt: 'Arquiteto do Mundo das Ideias',
    },
    biography: {
      en: [
        "Born into one of the noblest families of Athens, Plato seemed destined for politics until, at twenty, he met Socrates. The master's execution in 399 BC shattered his faith in Athenian democracy and turned him into philosophy's greatest writer. After years of travel through Egypt and Italy — where he absorbed Pythagorean mathematics — he founded the Academy around 387 BC, an institution that would operate for over 900 years.",
        'His dialogues, with Socrates as protagonist, range from the nature of justice (Republic) to love (Symposium), knowledge (Theaetetus) and the origin of the cosmos (Timaeus). He famously attempted to turn the tyrant of Syracuse into a philosopher-king — and was nearly sold into slavery for his trouble. He died at around eighty, reportedly at a wedding feast, leaving a body of work that Whitehead called the footnotes-source of all Western philosophy.',
      ],
      pt: [
        'Nascido em uma das famílias mais nobres de Atenas, Platão parecia destinado à política até que, aos vinte anos, conheceu Sócrates. A execução do mestre em 399 a.C. destruiu sua fé na democracia ateniense e o transformou no maior escritor da filosofia. Após anos de viagens pelo Egito e pela Itália — onde absorveu a matemática pitagórica —, fundou a Academia por volta de 387 a.C., instituição que funcionaria por mais de 900 anos.',
        'Seus diálogos, com Sócrates como protagonista, vão da natureza da justiça (República) ao amor (O Banquete), ao conhecimento (Teeteto) e à origem do cosmos (Timeu). Ficou famoso por tentar transformar o tirano de Siracusa em um rei-filósofo — e quase foi vendido como escravo por isso. Morreu por volta dos oitenta anos, segundo relatos durante uma festa de casamento, deixando uma obra que Whitehead descreveu como a fonte de todas as notas de rodapé da filosofia ocidental.',
      ],
    },
    contributions: {
      en: [
        'The Theory of Forms: eternal archetypes behind the changing world',
        'Founded the Academy, prototype of the Western university',
        'The Allegory of the Cave: a timeless model of education and enlightenment',
        'Political philosophy: the Republic and the ideal of the philosopher-king',
      ],
      pt: [
        'A Teoria das Ideias: arquétipos eternos por trás do mundo mutável',
        'Fundou a Academia, protótipo da universidade ocidental',
        'A Alegoria da Caverna: um modelo atemporal de educação e esclarecimento',
        'Filosofia política: a República e o ideal do rei-filósofo',
      ],
    },
    quotes: [
      {
        text: {
          en: 'The heaviest penalty for declining to rule is to be ruled by someone inferior to yourself.',
          pt: 'O castigo mais pesado para quem se recusa a governar é ser governado por alguém inferior.',
        },
        source: { en: 'Republic, Book I', pt: 'República, Livro I' },
      },
      {
        text: {
          en: 'Courage is knowing what not to fear.',
          pt: 'Coragem é saber o que não temer.',
        },
      },
      {
        text: {
          en: 'Opinion is the medium between knowledge and ignorance.',
          pt: 'A opinião é o meio-termo entre o conhecimento e a ignorância.',
        },
        source: { en: 'Republic, Book V', pt: 'República, Livro V' },
      },
    ],
    traits: {
      en: ['Visionary', 'Mathematical', 'Idealist', 'Literary genius', 'Politically ambitious'],
      pt: ['Visionário', 'Matemático', 'Idealista', 'Gênio literário', 'Politicamente ambicioso'],
    },
    facts: {
      en: [
        '"Plato" was a nickname meaning "broad" — possibly from his wrestler\'s shoulders; his real name was Aristocles.',
        'Above the Academy\'s entrance was written: "Let no one ignorant of geometry enter here."',
        'He competed in the Isthmian Games as a wrestler in his youth.',
        'His Atlantis story, told in the Timaeus and Critias, still fuels expeditions and conspiracy theories today.',
      ],
      pt: [
        '"Platão" era um apelido que significava "largo" — possivelmente pelos ombros de lutador; seu nome real era Aristocles.',
        'Na entrada da Academia estava escrito: "Não entre aqui quem não souber geometria."',
        'Na juventude, competiu como lutador nos Jogos Ístmicos.',
        'Sua história de Atlântida, contada no Timeu e no Crítias, alimenta expedições e teorias conspiratórias até hoje.',
      ],
    },
    bust: {
      marble: '#ece6da',
      pedestal: '#5b7fb9',
      headWidth: 1.0,
      beard: 0.75,
      hair: 0.6,
      look: {
        skin: '#eebd92',
        hair: '#b3aea2',
        cloth: '#5b7fb9',
        clothAccent: '#d9ad4f',
        hairstyle: 'short',
        beard: 'full',
        mustache: 'normal',
      },
    },
    figureImage: '/figures/plato.webp',
  },
  {
    slug: 'aristotle',
    name: { en: 'Aristotle', pt: 'Aristóteles' },
    years: { en: '384–322 BC', pt: '384–322 a.C.' },
    birthplace: { en: 'Stagira, Macedonia', pt: 'Estagira, Macedônia' },
    schoolSlugs: ['aristotelianism'],
    influencedBy: ['plato'],
    epithet: {
      en: 'The Philosopher',
      pt: 'O Filósofo',
    },
    biography: {
      en: [
        'Son of the physician to the king of Macedon, Aristotle arrived at Plato\'s Academy at seventeen and stayed for twenty years, becoming its most brilliant — and most independent — mind. After Plato\'s death he tutored a teenage prince who would become Alexander the Great, then returned to Athens to found his own school, the Lyceum, where he taught while strolling its covered walkways — hence "peripatetic" philosophy.',
        'His ambition was nothing less than to organize the whole of human knowledge: logic, physics, biology, psychology, ethics, politics, rhetoric and poetics. He dissected animals, catalogued constitutions and invented the syllogism. When Alexander died in 323 BC, anti-Macedonian Athens charged him with impiety; remembering Socrates, he fled "lest Athens sin twice against philosophy", dying a year later in Chalcis.',
      ],
      pt: [
        'Filho do médico do rei da Macedônia, Aristóteles chegou à Academia de Platão aos dezessete anos e lá permaneceu por vinte, tornando-se sua mente mais brilhante — e mais independente. Após a morte de Platão, foi tutor de um príncipe adolescente que se tornaria Alexandre, o Grande; depois retornou a Atenas para fundar sua própria escola, o Liceu, onde ensinava caminhando pelos pórticos cobertos — daí a filosofia "peripatética".',
        'Sua ambição era nada menos que organizar todo o conhecimento humano: lógica, física, biologia, psicologia, ética, política, retórica e poética. Dissecou animais, catalogou constituições e inventou o silogismo. Quando Alexandre morreu em 323 a.C., a Atenas antimacedônica o acusou de impiedade; lembrando-se de Sócrates, fugiu "para que Atenas não pecasse duas vezes contra a filosofia", morrendo um ano depois em Cálcis.',
      ],
    },
    contributions: {
      en: [
        'Invented formal logic and the theory of the syllogism',
        'Virtue ethics: eudaimonia and the doctrine of the golden mean',
        'Founded biology as a systematic science, classifying over 500 species',
        'The four causes and the concept of telos (purpose) in nature',
      ],
      pt: [
        'Inventou a lógica formal e a teoria do silogismo',
        'Ética das virtudes: a eudaimonia e a doutrina do justo meio',
        'Fundou a biologia como ciência sistemática, classificando mais de 500 espécies',
        'As quatro causas e o conceito de telos (finalidade) na natureza',
      ],
    },
    quotes: [
      {
        text: {
          en: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
          pt: 'Somos o que fazemos repetidamente. A excelência, portanto, não é um ato, mas um hábito.',
        },
        source: {
          en: 'After Nicomachean Ethics (Will Durant)',
          pt: 'A partir da Ética a Nicômaco (Will Durant)',
        },
      },
      {
        text: {
          en: 'It is the mark of an educated mind to be able to entertain a thought without accepting it.',
          pt: 'É a marca de uma mente educada poder considerar um pensamento sem aceitá-lo.',
        },
      },
      {
        text: {
          en: 'Man is by nature a political animal.',
          pt: 'O homem é, por natureza, um animal político.',
        },
        source: { en: 'Politics, Book I', pt: 'Política, Livro I' },
      },
    ],
    traits: {
      en: ['Encyclopedic', 'Methodical', 'Empirical', 'Pragmatic', 'Tireless observer'],
      pt: ['Enciclopédico', 'Metódico', 'Empírico', 'Pragmático', 'Observador incansável'],
    },
    facts: {
      en: [
        'He tutored Alexander the Great for about seven years; legend says Alexander sent him biological specimens from his campaigns.',
        'Roughly four fifths of his writings are lost — what survives are mostly lecture notes, never meant for publication.',
        'In the Middle Ages he was so authoritative that scholars called him simply "The Philosopher".',
        'He spent two years on Lesbos studying marine life; Darwin said his own heroes were "mere schoolboys to old Aristotle".',
      ],
      pt: [
        'Foi tutor de Alexandre, o Grande, por cerca de sete anos; diz a lenda que Alexandre lhe enviava espécimes biológicos de suas campanhas.',
        'Cerca de quatro quintos de seus escritos se perderam — o que sobreviveu são, em sua maioria, notas de aula, jamais destinadas à publicação.',
        'Na Idade Média sua autoridade era tamanha que os estudiosos o chamavam simplesmente de "O Filósofo".',
        'Passou dois anos em Lesbos estudando a vida marinha; Darwin disse que seus próprios heróis eram "meros colegiais diante do velho Aristóteles".',
      ],
    },
    bust: {
      marble: '#eae4d6',
      pedestal: '#7a9a59',
      headWidth: 0.92,
      beard: 0.55,
      hair: 0.5,
      look: {
        skin: '#e4b083',
        hair: '#6e5639',
        cloth: '#7a9a59',
        clothAccent: '#d9ad4f',
        hairstyle: 'short',
        beard: 'trimmed',
        mustache: 'normal',
      },
    },
    figureImage: '/figures/aristotle.webp',
  },
  {
    slug: 'seneca',
    name: { en: 'Seneca', pt: 'Sêneca' },
    years: { en: '4 BC – 65 AD', pt: '4 a.C. – 65 d.C.' },
    birthplace: { en: 'Córdoba, Hispania (Spain)', pt: 'Córdoba, Hispânia (Espanha)' },
    schoolSlugs: ['stoicism'],
    influencedBy: ['zeno-of-citium'],
    epithet: {
      en: 'The Stoic at the Court of Nero',
      pt: 'O Estoico na Corte de Nero',
    },
    biography: {
      en: [
        'Lucius Annaeus Seneca lived the central Stoic paradox: a philosopher of detachment who became one of the richest and most powerful men in Rome. Born in Hispania and educated in Rome, he survived chronic illness, the envy of three emperors and an eight-year exile in Corsica — ordered by Claudius — before being recalled to tutor the young Nero, whom he later served as chief adviser, effectively co-governing the empire during its best five years.',
        'As Nero descended into tyranny, Seneca withdrew and wrote his finest works: the Letters to Lucilius, On the Shortness of Life, On Anger. In 65 AD he was accused — probably unjustly — of conspiring against Nero and ordered to take his own life. He opened his veins with calm deliberation, dictating his final thoughts to his secretaries: a death staged, quite consciously, on the model of Socrates.',
      ],
      pt: [
        'Lúcio Aneu Sêneca viveu o paradoxo central do estoicismo: um filósofo do desapego que se tornou um dos homens mais ricos e poderosos de Roma. Nascido na Hispânia e educado em Roma, sobreviveu a doenças crônicas, à inveja de três imperadores e a um exílio de oito anos na Córsega — ordenado por Cláudio — antes de ser chamado de volta para ser tutor do jovem Nero, a quem depois serviu como principal conselheiro, governando de fato o império durante seus cinco melhores anos.',
        'Quando Nero mergulhou na tirania, Sêneca retirou-se e escreveu suas melhores obras: as Cartas a Lucílio, Sobre a Brevidade da Vida, Sobre a Ira. Em 65 d.C., foi acusado — provavelmente de forma injusta — de conspirar contra Nero e recebeu ordem de tirar a própria vida. Abriu as veias com calma deliberação, ditando seus últimos pensamentos aos secretários: uma morte encenada, conscientemente, segundo o modelo de Sócrates.',
      ],
    },
    contributions: {
      en: [
        'The Letters to Lucilius: a practical manual of Stoic life still read today',
        'Brought Stoicism from abstract theory to applied ethics and self-therapy',
        'Pioneering essays on anger, grief, clemency and the use of time',
        'Nine tragedies that deeply influenced Shakespeare and Renaissance drama',
      ],
      pt: [
        'As Cartas a Lucílio: um manual prático de vida estoica lido até hoje',
        'Levou o estoicismo da teoria abstrata à ética aplicada e à terapia de si',
        'Ensaios pioneiros sobre a ira, o luto, a clemência e o uso do tempo',
        'Nove tragédias que influenciaram profundamente Shakespeare e o teatro renascentista',
      ],
    },
    quotes: [
      {
        text: {
          en: 'It is not that we have a short time to live, but that we waste a lot of it.',
          pt: 'Não é que tenhamos pouco tempo para viver, mas sim que desperdiçamos muito dele.',
        },
        source: { en: 'On the Shortness of Life', pt: 'Sobre a Brevidade da Vida' },
      },
      {
        text: {
          en: 'We suffer more often in imagination than in reality.',
          pt: 'Sofremos mais na imaginação do que na realidade.',
        },
        source: { en: 'Letters to Lucilius, 13', pt: 'Cartas a Lucílio, 13' },
      },
      {
        text: {
          en: 'Luck is what happens when preparation meets opportunity.',
          pt: 'A sorte é o que acontece quando a preparação encontra a oportunidade.',
        },
        source: { en: 'Attributed', pt: 'Atribuída' },
      },
    ],
    traits: {
      en: ['Eloquent', 'Pragmatic', 'Contradictory', 'Resilient', 'Worldly sage'],
      pt: ['Eloquente', 'Pragmático', 'Contraditório', 'Resiliente', 'Sábio mundano'],
    },
    facts: {
      en: [
        'He was one of the richest men in Rome — critics asked how a Stoic could own five hundred identical ivory-legged tables.',
        'Caligula spared his life only because he was told the sickly Seneca would die soon anyway.',
        'His forced suicide was so slow — his aged body would not bleed — that he ultimately suffocated in a steam bath.',
        'Medieval Christians admired him so much they forged a correspondence between Seneca and Saint Paul.',
      ],
      pt: [
        'Era um dos homens mais ricos de Roma — críticos perguntavam como um estoico podia ter quinhentas mesas idênticas com pés de marfim.',
        'Calígula só poupou sua vida porque lhe disseram que o doente Sêneca morreria em breve de qualquer forma.',
        'Seu suicídio forçado foi tão lento — o corpo envelhecido não sangrava — que ele acabou sufocado em um banho de vapor.',
        'Os cristãos medievais o admiravam tanto que forjaram uma correspondência entre Sêneca e São Paulo.',
      ],
    },
    bust: {
      marble: '#e6dfd0',
      pedestal: '#a35e3b',
      headWidth: 0.95,
      beard: 0.3,
      hair: 0.25,
      look: {
        skin: '#ecbf96',
        hair: '#a89c8a',
        cloth: '#a35e3b',
        clothAccent: '#d9ad4f',
        hairstyle: 'bald',
        beard: 'trimmed',
        mustache: 'normal',
      },
    },
    figureImage: '/figures/seneca.webp',
  },
  {
    slug: 'marcus-aurelius',
    name: { en: 'Marcus Aurelius', pt: 'Marco Aurélio' },
    years: { en: '121–180 AD', pt: '121–180 d.C.' },
    birthplace: { en: 'Rome, Italy', pt: 'Roma, Itália' },
    schoolSlugs: ['stoicism'],
    influencedBy: ['epictetus', 'seneca'],
    epithet: {
      en: 'The Philosopher Emperor',
      pt: 'O Imperador Filósofo',
    },
    biography: {
      en: [
        "Marcus Aurelius is history's closest approximation of Plato's philosopher-king. Adopted into the imperial succession as a boy, he was trained by the finest tutors of the empire and embraced Stoicism at twelve, sleeping on the floor against his mother's wishes. He ruled Rome from 161 to 180 AD through a relentless series of catastrophes: floods, the Antonine plague, betrayal by his most trusted general, and endless wars on the Danube frontier.",
        'It was there, in military camps by candlelight, that he wrote a private notebook in Greek he called "To Himself" — known to us as the Meditations. Never intended for publication, it records an emperor reminding himself to be patient, just and undisturbed by fortune. He died on campaign near Vienna in 180 AD; the Meditations survived to become perhaps the most beloved book of practical philosophy ever written.',
      ],
      pt: [
        'Marco Aurélio é a aproximação mais fiel da história ao rei-filósofo de Platão. Adotado na linha sucessória imperial ainda menino, foi treinado pelos melhores tutores do império e abraçou o estoicismo aos doze anos, dormindo no chão contra a vontade da mãe. Governou Roma de 161 a 180 d.C. em meio a uma série implacável de catástrofes: inundações, a peste antonina, a traição de seu general mais confiável e guerras intermináveis na fronteira do Danúbio.',
        'Foi lá, em acampamentos militares à luz de velas, que escreveu em grego um caderno particular que chamava de "Para Si Mesmo" — conhecido por nós como Meditações. Jamais destinado à publicação, registra um imperador lembrando a si mesmo de ser paciente, justo e imperturbável diante da fortuna. Morreu em campanha perto de Viena, em 180 d.C.; as Meditações sobreviveram para se tornar talvez o livro de filosofia prática mais amado já escrito.',
      ],
    },
    contributions: {
      en: [
        'The Meditations: the definitive work of applied Stoicism',
        'Demonstrated that philosophy can guide supreme political power',
        'Developed the Stoic disciplines of perception, action and will',
        'A model of ethical leadership studied from antiquity to modern business schools',
      ],
      pt: [
        'As Meditações: a obra definitiva do estoicismo aplicado',
        'Demonstrou que a filosofia pode guiar o poder político supremo',
        'Desenvolveu as disciplinas estoicas da percepção, da ação e da vontade',
        'Um modelo de liderança ética estudado da antiguidade às escolas de negócios modernas',
      ],
    },
    quotes: [
      {
        text: {
          en: 'You have power over your mind — not outside events. Realize this, and you will find strength.',
          pt: 'Você tem poder sobre sua mente — não sobre os eventos externos. Perceba isso e encontrará força.',
        },
        source: { en: 'Meditations', pt: 'Meditações' },
      },
      {
        text: {
          en: 'The impediment to action advances action. What stands in the way becomes the way.',
          pt: 'O impedimento à ação impulsiona a ação. O que bloqueia o caminho torna-se o caminho.',
        },
        source: { en: 'Meditations, Book V', pt: 'Meditações, Livro V' },
      },
      {
        text: {
          en: 'Waste no more time arguing about what a good man should be. Be one.',
          pt: 'Não perca mais tempo discutindo o que deve ser um homem bom. Seja um.',
        },
        source: { en: 'Meditations, Book X', pt: 'Meditações, Livro X' },
      },
    ],
    traits: {
      en: ['Dutiful', 'Introspective', 'Melancholic', 'Just', 'Self-disciplined'],
      pt: ['Dedicado ao dever', 'Introspectivo', 'Melancólico', 'Justo', 'Autodisciplinado'],
    },
    facts: {
      en: [
        'The Meditations were a private diary — he would likely be horrified to know millions have read them.',
        'He sold imperial palace furnishings to fund the war effort rather than raise taxes during the plague.',
        'He was the last of the "Five Good Emperors"; his reign marked the end of the Pax Romana.',
        "Despite Stoic warnings about anger, he pardoned the rebel general Avidius Cassius's family and burned the conspirators' letters unread.",
      ],
      pt: [
        'As Meditações eram um diário privado — ele provavelmente ficaria horrorizado ao saber que milhões as leram.',
        'Vendeu mobília do palácio imperial para financiar o esforço de guerra em vez de aumentar impostos durante a peste.',
        'Foi o último dos "Cinco Bons Imperadores"; seu reinado marcou o fim da Pax Romana.',
        'Apesar dos alertas estoicos sobre a ira, perdoou a família do general rebelde Avídio Cássio e queimou as cartas dos conspiradores sem lê-las.',
      ],
    },
    bust: {
      marble: '#ece5d8',
      pedestal: '#a35e3b',
      headWidth: 0.9,
      beard: 0.7,
      hair: 0.75,
      look: {
        skin: '#e0ab7c',
        hair: '#54422e',
        cloth: '#6e3f7d',
        clothAccent: '#d9ad4f',
        hairstyle: 'curly',
        beard: 'curly',
        mustache: 'normal',
        laurel: true,
      },
    },
    figureImage: '/figures/marcus-aurelius.webp',
  },
  {
    slug: 'descartes',
    name: { en: 'René Descartes', pt: 'René Descartes' },
    years: { en: '1596–1650', pt: '1596–1650' },
    birthplace: { en: 'La Haye en Touraine, France', pt: 'La Haye en Touraine, França' },
    schoolSlugs: ['rationalism'],
    influencedBy: ['plato', 'aristotle'],
    epithet: {
      en: 'The Father of Modern Philosophy',
      pt: 'O Pai da Filosofia Moderna',
    },
    biography: {
      en: [
        'A sickly child educated by Jesuits, Descartes was granted the lifelong habit of meditating in bed until late morning — where, he claimed, he did his best thinking. As a young man he sought experience over books, enlisting in two armies. On the night of 10 November 1619, shut in a stove-heated room in Germany, he had three visions that revealed his mission: to rebuild all knowledge on indubitable foundations, unified by the method of mathematics.',
        "Settling in the tolerant Netherlands for twenty years, he published the Discourse on Method (1637) and Meditations on First Philosophy (1641), demolishing received opinion with methodical doubt and rebuilding from the famous cogito: I think, therefore I am. In 1649 Queen Christina of Sweden summoned him to tutor her in philosophy — at five o'clock in the morning, in a Scandinavian winter. The cold broke his lifelong routine and his health; he died of pneumonia within months.",
      ],
      pt: [
        'Criança doente educada por jesuítas, Descartes ganhou o hábito vitalício de meditar na cama até o fim da manhã — onde, afirmava, fazia suas melhores reflexões. Jovem, buscou a experiência em vez dos livros, alistando-se em dois exércitos. Na noite de 10 de novembro de 1619, fechado em um quarto aquecido por uma estufa na Alemanha, teve três sonhos que lhe revelaram sua missão: reconstruir todo o conhecimento sobre fundamentos indubitáveis, unificados pelo método da matemática.',
        'Estabelecido na tolerante Holanda por vinte anos, publicou o Discurso do Método (1637) e as Meditações sobre Filosofia Primeira (1641), demolindo as opiniões herdadas com a dúvida metódica e reconstruindo a partir do famoso cogito: penso, logo existo. Em 1649, a rainha Cristina da Suécia o convocou para lhe ensinar filosofia — às cinco da manhã, num inverno escandinavo. O frio quebrou sua rotina de uma vida inteira e sua saúde; morreu de pneumonia em poucos meses.',
      ],
    },
    contributions: {
      en: [
        'The cogito ("I think, therefore I am"): the founding certainty of modern philosophy',
        'Methodical doubt as a rigorous procedure for testing knowledge',
        'Invented analytic geometry — the Cartesian coordinate system',
        'Mind–body dualism, framing the modern problem of consciousness',
      ],
      pt: [
        'O cogito ("Penso, logo existo"): a certeza fundadora da filosofia moderna',
        'A dúvida metódica como procedimento rigoroso para testar o conhecimento',
        'Inventou a geometria analítica — o sistema de coordenadas cartesianas',
        'O dualismo mente–corpo, formulando o problema moderno da consciência',
      ],
    },
    quotes: [
      {
        text: {
          en: 'I think, therefore I am.',
          pt: 'Penso, logo existo.',
        },
        source: { en: 'Discourse on Method', pt: 'Discurso do Método' },
      },
      {
        text: {
          en: 'It is not enough to have a good mind; the main thing is to use it well.',
          pt: 'Não basta ter um bom espírito; o principal é aplicá-lo bem.',
        },
        source: { en: 'Discourse on Method', pt: 'Discurso do Método' },
      },
      {
        text: {
          en: 'Doubt is the origin of wisdom.',
          pt: 'A dúvida é a origem da sabedoria.',
        },
        source: { en: 'After the Meditations', pt: 'A partir das Meditações' },
      },
    ],
    traits: {
      en: ['Methodical', 'Solitary', 'Audacious', 'Mathematical', 'Cautious with authority'],
      pt: ['Metódico', 'Solitário', 'Audacioso', 'Matemático', 'Cauteloso com a autoridade'],
    },
    facts: {
      en: [
        'Legend says he conceived coordinate geometry watching a fly walk across his bedroom ceiling.',
        "After Galileo's condemnation, he suppressed his own treatise The World, fearing the Church.",
        'He moved house at least 24 times in 20 years in the Netherlands, guarding his solitude.',
        "His skull was separated from his body after death and is displayed at the Musée de l'Homme in Paris.",
      ],
      pt: [
        'Diz a lenda que ele concebeu a geometria de coordenadas observando uma mosca andar pelo teto do quarto.',
        'Após a condenação de Galileu, suprimiu seu próprio tratado O Mundo, temendo a Igreja.',
        'Mudou de casa pelo menos 24 vezes em 20 anos na Holanda, protegendo sua solidão.',
        "Seu crânio foi separado do corpo após a morte e está exposto no Musée de l'Homme, em Paris.",
      ],
    },
    bust: {
      marble: '#e9e3d7',
      pedestal: '#6b5b95',
      headWidth: 0.88,
      beard: 0.15,
      hair: 0.85,
      look: {
        skin: '#f0c8a4',
        hair: '#2e2a26',
        cloth: '#2f3542',
        clothAccent: '#f2efe6',
        hairstyle: 'long',
        beard: 'goatee',
        mustache: 'normal',
        collar: true,
      },
    },
    figureImage: '/figures/descartes.webp',
  },
  {
    slug: 'kant',
    name: { en: 'Immanuel Kant', pt: 'Immanuel Kant' },
    years: { en: '1724–1804', pt: '1724–1804' },
    birthplace: { en: 'Königsberg, Prussia', pt: 'Königsberg, Prússia' },
    schoolSlugs: ['german-idealism'],
    influencedBy: ['leibniz', 'descartes'],
    epithet: {
      en: 'The Clockwork Revolutionary',
      pt: 'O Revolucionário Pontual',
    },
    biography: {
      en: [
        'Kant never travelled more than a hundred miles from Königsberg, yet no thinker travelled further. The son of a saddle-maker, raised in austere Pietism, he worked as a private tutor and unsalaried lecturer for decades, publishing respected but conventional work. Then, woken from his "dogmatic slumber" by reading Hume, he fell silent for eleven years — and emerged in 1781 with the Critique of Pure Reason, perhaps the most influential book of modern philosophy.',
        'In the following two decades he completed his critical system: the Critique of Practical Reason on ethics, and the Critique of Judgment on beauty and purpose. His daily walk was so punctual that neighbours set their clocks by it — interrupted, the story goes, only the day he received Rousseau\'s Émile. He never married, dined daily with friends under strict conversational rules, and died at nearly eighty whispering "Es ist gut" — it is good.',
      ],
      pt: [
        'Kant nunca viajou mais de cento e poucos quilômetros de Königsberg, mas nenhum pensador foi mais longe. Filho de um seleiro, criado no austero pietismo, trabalhou como tutor particular e professor sem salário fixo por décadas, publicando obras respeitadas porém convencionais. Então, despertado de seu "sono dogmático" pela leitura de Hume, silenciou por onze anos — e emergiu em 1781 com a Crítica da Razão Pura, talvez o livro mais influente da filosofia moderna.',
        'Nas duas décadas seguintes completou seu sistema crítico: a Crítica da Razão Prática, sobre a ética, e a Crítica da Faculdade do Juízo, sobre o belo e a finalidade. Sua caminhada diária era tão pontual que os vizinhos acertavam os relógios por ela — interrompida, conta-se, apenas no dia em que recebeu o Émile de Rousseau. Nunca se casou, jantava diariamente com amigos sob regras estritas de conversação e morreu aos quase oitenta anos sussurrando "Es ist gut" — está bem.',
      ],
    },
    contributions: {
      en: [
        'The "Copernican revolution": the mind actively structures experience',
        'The categorical imperative: a universal, reason-based foundation for ethics',
        'The synthesis of rationalism and empiricism in transcendental idealism',
        '"Perpetual Peace": the philosophical blueprint for international federations like the UN',
      ],
      pt: [
        'A "revolução copernicana": a mente estrutura ativamente a experiência',
        'O imperativo categórico: um fundamento universal e racional para a ética',
        'A síntese entre racionalismo e empirismo no idealismo transcendental',
        '"A Paz Perpétua": o projeto filosófico de federações internacionais como a ONU',
      ],
    },
    quotes: [
      {
        text: {
          en: 'Act only according to that maxim whereby you can at the same time will that it should become a universal law.',
          pt: 'Aja apenas segundo uma máxima tal que possas ao mesmo tempo querer que ela se torne lei universal.',
        },
        source: {
          en: 'Groundwork of the Metaphysics of Morals',
          pt: 'Fundamentação da Metafísica dos Costumes',
        },
      },
      {
        text: {
          en: 'Two things fill the mind with ever new and increasing admiration: the starry heavens above me and the moral law within me.',
          pt: 'Duas coisas enchem o ânimo de admiração sempre nova e crescente: o céu estrelado sobre mim e a lei moral em mim.',
        },
        source: { en: 'Critique of Practical Reason', pt: 'Crítica da Razão Prática' },
      },
      {
        text: {
          en: "Enlightenment is man's emergence from his self-imposed immaturity. Sapere aude! Dare to know!",
          pt: 'Esclarecimento é a saída do homem de sua menoridade autoimposta. Sapere aude! Ousa saber!',
        },
        source: { en: 'What is Enlightenment?', pt: 'O que é o Esclarecimento?' },
      },
    ],
    traits: {
      en: ['Rigorous', 'Punctual', 'Systematic', 'Witty dinner host', 'Quietly radical'],
      pt: ['Rigoroso', 'Pontual', 'Sistemático', 'Anfitrião espirituoso', 'Discretamente radical'],
    },
    facts: {
      en: [
        'Königsberg residents reportedly set their watches by his 3:30 pm walk.',
        "He first proposed the nebular hypothesis of the solar system's formation — forty years before Laplace.",
        'The Critique of Pure Reason was published when he was 57, after an eleven-year silence.',
        'His tomb bears the line about "the starry heavens above me and the moral law within me".',
      ],
      pt: [
        'Os moradores de Königsberg, dizem, acertavam os relógios pela sua caminhada das 15h30.',
        'Foi o primeiro a propor a hipótese nebular da formação do sistema solar — quarenta anos antes de Laplace.',
        'A Crítica da Razão Pura foi publicada quando ele tinha 57 anos, após onze anos de silêncio.',
        'Seu túmulo traz a frase sobre "o céu estrelado sobre mim e a lei moral em mim".',
      ],
    },
    bust: {
      marble: '#ebe5d9',
      pedestal: '#3f7d75',
      headWidth: 0.82,
      beard: 0,
      hair: 0.55,
      look: {
        skin: '#f2cead',
        hair: '#eceae2',
        cloth: '#3f5d8c',
        clothAccent: '#f4f0e8',
        hairstyle: 'wig',
        beard: 'none',
        mustache: 'none',
        collar: true,
      },
    },
    figureImage: '/figures/kant.webp',
  },
  {
    slug: 'nietzsche',
    name: { en: 'Friedrich Nietzsche', pt: 'Friedrich Nietzsche' },
    years: { en: '1844–1900', pt: '1844–1900' },
    birthplace: { en: 'Röcken, Prussia (Germany)', pt: 'Röcken, Prússia (Alemanha)' },
    schoolSlugs: ['existentialism'],
    influencedBy: ['plato', 'spinoza'],
    epithet: {
      en: 'The Philosopher with a Hammer',
      pt: 'O Filósofo do Martelo',
    },
    biography: {
      en: [
        'The son of a Lutheran pastor, Nietzsche was such a prodigy of classical philology that Basel made him a full professor at 24, before he had finished his doctorate. Chronic migraines, near-blindness and violent stomach ailments forced him to resign at 34. For the next decade he lived as a stateless wanderer between the Swiss Alps and the Italian coast, writing in cheap boarding houses the books that would detonate under Western culture.',
        'Thus Spoke Zarathustra, Beyond Good and Evil, On the Genealogy of Morals: in them he diagnosed the "death of God", dissected morality as a weapon of the weak, and challenged humanity to create its own values and to love fate — amor fati. In January 1889 he collapsed in Turin, reportedly while embracing a flogged horse, and spent his final eleven years in mental darkness, cared for by his mother and sister, never knowing he had become the most famous philosopher in Europe.',
      ],
      pt: [
        'Filho de um pastor luterano, Nietzsche foi um prodígio tal da filologia clássica que Basileia o nomeou professor titular aos 24 anos, antes de concluir o doutorado. Enxaquecas crônicas, quase-cegueira e violentos males estomacais o forçaram a renunciar aos 34. Pela década seguinte viveu como um andarilho apátrida entre os Alpes suíços e a costa italiana, escrevendo em pensões baratas os livros que explodiriam sob a cultura ocidental.',
        'Assim Falou Zaratustra, Além do Bem e do Mal, Genealogia da Moral: neles diagnosticou a "morte de Deus", dissecou a moral como arma dos fracos e desafiou a humanidade a criar seus próprios valores e a amar o destino — amor fati. Em janeiro de 1889, desabou em Turim, segundo relatos ao abraçar um cavalo açoitado, e passou os últimos onze anos em escuridão mental, cuidado pela mãe e pela irmã, sem jamais saber que se tornara o filósofo mais famoso da Europa.',
      ],
    },
    contributions: {
      en: [
        'The diagnosis of nihilism and the "death of God" in modern culture',
        'The genealogical method: tracing moral values to their historical origins',
        'The Übermensch and the revaluation of all values',
        'Eternal recurrence and amor fati as tests of life-affirmation',
      ],
      pt: [
        'O diagnóstico do niilismo e da "morte de Deus" na cultura moderna',
        'O método genealógico: rastrear os valores morais até suas origens históricas',
        'O Übermensch e a transvaloração de todos os valores',
        'O eterno retorno e o amor fati como testes de afirmação da vida',
      ],
    },
    quotes: [
      {
        text: {
          en: 'He who has a why to live can bear almost any how.',
          pt: 'Quem tem um porquê para viver suporta quase qualquer como.',
        },
        source: { en: 'Twilight of the Idols', pt: 'Crepúsculo dos Ídolos' },
      },
      {
        text: {
          en: 'Without music, life would be a mistake.',
          pt: 'Sem música, a vida seria um erro.',
        },
        source: { en: 'Twilight of the Idols', pt: 'Crepúsculo dos Ídolos' },
      },
      {
        text: {
          en: 'And if you gaze long into an abyss, the abyss also gazes into you.',
          pt: 'E se você olhar longamente para um abismo, o abismo também olha para dentro de você.',
        },
        source: { en: 'Beyond Good and Evil, §146', pt: 'Além do Bem e do Mal, §146' },
      },
    ],
    traits: {
      en: ['Provocative', 'Poetic', 'Solitary', 'Fiercely independent', 'Aphoristic'],
      pt: ['Provocador', 'Poético', 'Solitário', 'Ferozmente independente', 'Aforístico'],
    },
    facts: {
      en: [
        'He composed music throughout his life — Wagner privately found it embarrassing.',
        'His sister Elisabeth edited his unpublished notes to please German nationalists, distorting his legacy for decades; he himself despised antisemitism.',
        "His books sold so poorly he paid to print Zarathustra's fourth part — only 40 copies.",
        'He renounced his Prussian citizenship in 1869 and remained officially stateless for the rest of his life.',
      ],
      pt: [
        'Compôs música a vida inteira — Wagner, em particular, achava suas peças constrangedoras.',
        'Sua irmã Elisabeth editou seus textos inéditos para agradar nacionalistas alemães, distorcendo seu legado por décadas; ele próprio desprezava o antissemitismo.',
        'Seus livros vendiam tão mal que ele pagou a impressão da quarta parte do Zaratustra — apenas 40 cópias.',
        'Renunciou à cidadania prussiana em 1869 e permaneceu oficialmente apátrida pelo resto da vida.',
      ],
    },
    bust: {
      marble: '#e7e0d2',
      pedestal: '#9a4a5a',
      headWidth: 0.86,
      beard: 0.5,
      hair: 0.8,
      look: {
        skin: '#eabd92',
        hair: '#46352a',
        cloth: '#3a3f4a',
        clothAccent: '#6b4f3a',
        hairstyle: 'swept',
        beard: 'none',
        mustache: 'grand',
      },
    },
    figureImage: '/figures/nietzsche.webp',
  },
  {
    slug: 'simone-de-beauvoir',
    name: { en: 'Simone de Beauvoir', pt: 'Simone de Beauvoir' },
    years: { en: '1908–1986', pt: '1908–1986' },
    birthplace: { en: 'Paris, France', pt: 'Paris, França' },
    schoolSlugs: ['existentialism'],
    influencedBy: ['hegel', 'kierkegaard', 'sartre'],
    epithet: {
      en: 'Mother of Modern Feminism',
      pt: 'Mãe do Feminismo Moderno',
    },
    biography: {
      en: [
        'Born into a bourgeois Parisian family that lost its fortune after World War I, Beauvoir studied her way out: at 21 she became the youngest person ever to pass the agrégation in philosophy, placing second only to Jean-Paul Sartre — and many examiners thought she was the better philosopher. The two formed a lifelong intellectual partnership, famously open and never domestic, anchored in the cafés of Saint-Germain-des-Prés.',
        'In 1949 she published The Second Sex, a 900-page existentialist analysis of women\'s condition built around one revolutionary insight: "One is not born, but rather becomes, a woman." The Vatican banned it; it sold twenty thousand copies in its first week and ignited second-wave feminism worldwide. She won the Goncourt Prize for The Mandarins, documented aging and death with unflinching honesty, and in 1971 publicly signed the Manifesto of the 343 demanding reproductive rights in France.',
      ],
      pt: [
        'Nascida em uma família burguesa parisiense que perdeu a fortuna após a Primeira Guerra, Beauvoir abriu caminho pelos estudos: aos 21 anos tornou-se a pessoa mais jovem a passar na agrégation de filosofia, ficando em segundo lugar, atrás apenas de Jean-Paul Sartre — e muitos examinadores a consideraram a melhor filósofa. Os dois formaram uma parceria intelectual vitalícia, famosamente aberta e nunca doméstica, ancorada nos cafés de Saint-Germain-des-Prés.',
        'Em 1949 publicou O Segundo Sexo, uma análise existencialista de 900 páginas sobre a condição da mulher, construída em torno de uma intuição revolucionária: "Ninguém nasce mulher: torna-se mulher." O Vaticano o proibiu; vendeu vinte mil cópias na primeira semana e acendeu a segunda onda feminista no mundo inteiro. Ganhou o Prêmio Goncourt com Os Mandarins, documentou o envelhecimento e a morte com honestidade implacável e, em 1971, assinou publicamente o Manifesto das 343 exigindo direitos reprodutivos na França.',
      ],
    },
    contributions: {
      en: [
        'The Second Sex: the founding text of modern feminist philosophy',
        '"One is not born a woman": gender as a social construction',
        'The Ethics of Ambiguity: an existentialist ethics of freedom',
        'Pioneering philosophical studies of aging (The Coming of Age)',
      ],
      pt: [
        'O Segundo Sexo: o texto fundador da filosofia feminista moderna',
        '"Ninguém nasce mulher": o gênero como construção social',
        'Por uma Moral da Ambiguidade: uma ética existencialista da liberdade',
        'Estudos filosóficos pioneiros sobre a velhice (A Velhice)',
      ],
    },
    quotes: [
      {
        text: {
          en: 'One is not born, but rather becomes, a woman.',
          pt: 'Ninguém nasce mulher: torna-se mulher.',
        },
        source: { en: 'The Second Sex', pt: 'O Segundo Sexo' },
      },
      {
        text: {
          en: 'I wish that every human life might be pure transparent freedom.',
          pt: 'Desejo que toda vida humana seja pura e transparente liberdade.',
        },
        source: { en: 'The Blood of Others', pt: 'O Sangue dos Outros' },
      },
      {
        text: {
          en: "Change your life today. Don't gamble on the future, act now, without delay.",
          pt: 'Mude sua vida hoje. Não aposte no futuro, aja agora, sem demora.',
        },
        source: { en: 'Attributed', pt: 'Atribuída' },
      },
    ],
    traits: {
      en: [
        'Fiercely independent',
        'Disciplined writer',
        'Politically engaged',
        'Unsentimental',
        'Voraciously curious',
      ],
      pt: [
        'Ferozmente independente',
        'Escritora disciplinada',
        'Politicamente engajada',
        'Antissentimental',
        'Vorazmente curiosa',
      ],
    },
    facts: {
      en: [
        'At 21 she was the youngest agrégée in philosophy in French history.',
        "The Second Sex was placed on the Vatican's Index of Forbidden Books.",
        'She and Sartre never married or lived together, calling theirs an "essential love" with "contingent" others.',
        'She kept a meticulous schedule, writing every day from 10 to 1 and 5 to 9 — in cafés, not at home.',
      ],
      pt: [
        'Aos 21 anos foi a agrégée em filosofia mais jovem da história da França.',
        'O Segundo Sexo entrou no Índice de Livros Proibidos do Vaticano.',
        'Ela e Sartre nunca se casaram nem moraram juntos, chamando o que tinham de "amor essencial" com outros "contingentes".',
        'Mantinha uma rotina meticulosa: escrevia todos os dias das 10h à 13h e das 17h às 21h — em cafés, não em casa.',
      ],
    },
    bust: {
      marble: '#efe9dd',
      pedestal: '#9a4a5a',
      headWidth: 0.78,
      beard: 0,
      hair: 0.95,
      look: {
        skin: '#f2c9a8',
        hair: '#4a3527',
        cloth: '#9a4a5a',
        clothAccent: '#d9ad4f',
        hairstyle: 'updo',
        beard: 'none',
        mustache: 'none',
        headband: true,
      },
    },
    figureImage: '/figures/simone-de-beauvoir.webp',
  },
];

/** All philosophers: the original nine plus the redesign extras. */
export const philosophers: Philosopher[] = [...corePhilosophers, ...philosophersExtra];

export function getPhilosopher(slug: string): Philosopher | undefined {
  return philosophers.find((p) => p.slug === slug);
}
