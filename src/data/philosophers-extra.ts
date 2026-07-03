import type { Philosopher } from './types';

/**
 * Philosophers added in the dashboard redesign so every school presents
 * two to four thinkers. Content ported verbatim from the design handoff
 * (data-extra-ancient.js / data-extra-modern.js); bust configs are simple
 * procedural-marble settings since these don't have toon looks yet.
 */
export const philosophersExtra: Philosopher[] = [
  {
    slug: 'antisthenes',
    name: { en: 'Antisthenes', pt: 'Antístenes' },
    years: {
      en: 'c. 446–366 BC',
      pt: 'c. 446–366 a.C.',
    },
    birthplace: {
      en: 'Athens, Greece',
      pt: 'Atenas, Grécia',
    },
    schoolSlugs: ['socratic-philosophy'],
    influencedBy: ['socrates'],
    epithet: {
      en: 'The First Cynic',
      pt: 'O Primeiro Cínico',
    },
    biography: {
      en: [
        'Antisthenes was among the most devoted companions of Socrates, walking several miles each day to hear him speak. From his master he took a single lesson and pushed it to its limit: virtue alone suffices for happiness, and everything else — wealth, status, comfort — is a distraction. After Socrates’ death he taught at the Cynosarges gymnasium, open to those of mixed birth like himself, where his followers earned the name "Cynics".',
        'He wore the threadbare cloak that became the Cynic uniform, declaring that he would rather go mad than feel pleasure. His austerity was not gloom but discipline: a training of the soul to need nothing. Through his pupil Diogenes of Sinope, his teaching became one of antiquity’s most provocative movements and a direct ancestor of Stoicism.',
      ],
      pt: [
        'Antístenes foi um dos companheiros mais devotados de Sócrates: caminhava vários quilômetros por dia para ouvi-lo. Do mestre extraiu uma única lição e levou-a ao limite: a virtude basta para a felicidade, e todo o resto — riqueza, status, conforto — é distração. Após a morte de Sócrates, passou a ensinar no ginásio de Cinosarges, aberto a quem, como ele, era de nascimento misto; ali seus seguidores ganharam o nome de "cínicos".',
        'Vestia o manto puído que se tornou o uniforme cínico e declarava que preferia enlouquecer a sentir prazer. Sua austeridade não era tristeza, mas disciplina: um treino da alma para nada precisar. Por meio de seu discípulo Diógenes de Sinope, seu ensinamento tornou-se um dos movimentos mais provocadores da Antiguidade e ancestral direto do estoicismo.',
      ],
    },
    contributions: {
      en: [
        'Founded the Cynic school — virtue as the only good, self-sufficiency as the way of life',
        'Transmitted the Socratic ethic of austerity to Diogenes and, through him, to Stoicism',
        'Pioneered the critique of convention, wealth and social pretension',
        'Wrote prolifically on logic, dialogue and ethics — ten volumes, now almost all lost',
      ],
      pt: [
        'Fundou a escola cínica — a virtude como único bem, a autossuficiência como modo de vida',
        'Transmitiu a ética socrática da austeridade a Diógenes e, por ele, ao estoicismo',
        'Pioneiro na crítica à convenção, à riqueza e à pretensão social',
        'Escreveu prolificamente sobre lógica, diálogo e ética — dez volumes, hoje quase todos perdidos',
      ],
    },
    quotes: [
      {
        text: {
          en: 'It is a royal privilege to do good and be ill spoken of.',
          pt: 'É privilégio de reis fazer o bem e ser mal falado.',
        },
        source: {
          en: 'Via Diogenes Laertius',
          pt: 'Via Diógenes Laércio',
        },
      },
      {
        text: {
          en: 'The most useful piece of learning is to unlearn what is untrue.',
          pt: 'O aprendizado mais útil é desaprender o que não é verdadeiro.',
        },
        source: {
          en: 'Via Diogenes Laertius',
          pt: 'Via Diógenes Laércio',
        },
      },
      {
        text: {
          en: 'Pay attention to your enemies, for they are the first to discover your mistakes.',
          pt: 'Preste atenção aos seus inimigos, pois são os primeiros a descobrir os seus erros.',
        },
        source: {
          en: 'Via Diogenes Laertius',
          pt: 'Via Diógenes Laércio',
        },
      },
    ],
    traits: {
      en: ['Austere', 'Combative', 'Self-sufficient', 'Loyal', 'Uncompromising'],
      pt: ['Austero', 'Combativo', 'Autossuficiente', 'Leal', 'Intransigente'],
    },
    facts: {
      en: [
        'He fought at the Battle of Tanagra before turning to philosophy — Socrates praised his courage.',
        'The name "Cynic" likely comes from Cynosarges ("place of the white dog"), the gymnasium where he taught.',
        'When told that many people praised him, he replied: "Why, what have I done wrong?"',
      ],
      pt: [
        'Lutou na Batalha de Tanagra antes de se voltar à filosofia — Sócrates elogiava sua coragem.',
        'O nome "cínico" provavelmente vem de Cinosarges ("lugar do cão branco"), o ginásio onde ensinava.',
        'Ao saber que muitos o elogiavam, respondeu: "Ora, o que fiz de errado?"',
      ],
    },
    bust: {
      marble: '#e6ddcb',
      pedestal: '#c2922f',
      headWidth: 0.9,
      beard: 0.8,
      hair: 0.45,
    },
    figureImage: '/figures/antisthenes.webp',
  },
  {
    slug: 'aristippus',
    name: { en: 'Aristippus', pt: 'Aristipo' },
    years: {
      en: 'c. 435–356 BC',
      pt: 'c. 435–356 a.C.',
    },
    birthplace: {
      en: 'Cyrene, North Africa',
      pt: 'Cirene, Norte da África',
    },
    schoolSlugs: ['socratic-philosophy'],
    influencedBy: ['socrates'],
    epithet: {
      en: 'The Philosopher of Pleasure',
      pt: 'O Filósofo do Prazer',
    },
    biography: {
      en: [
        'Aristippus travelled from the wealthy Greek colony of Cyrene to Athens, drawn by the fame of Socrates — and drew from the same master the opposite lesson to Antisthenes. If Socrates taught self-mastery, Aristippus concluded that the master of pleasure is the one who enjoys it without being enslaved by it. He founded the Cyrenaic school, the first to declare pleasure the goal of life.',
        'He moved with ease through courts and banquets, charging fees for his teaching (a scandal among Socratics) and serving the tyrant Dionysius of Syracuse with unshakable wit. Yet his hedonism was disciplined: present pleasure, taken lightly, never mourned when absent. His school’s frank materialism made it the great rival of Epicureanism — and its honest ancestor.',
      ],
      pt: [
        'Aristipo viajou da rica colônia grega de Cirene a Atenas, atraído pela fama de Sócrates — e tirou do mesmo mestre a lição oposta à de Antístenes. Se Sócrates ensinava o autodomínio, Aristipo concluiu que senhor do prazer é quem o desfruta sem se escravizar por ele. Fundou a escola cirenaica, a primeira a declarar o prazer como finalidade da vida.',
        'Circulava com desenvoltura por cortes e banquetes, cobrava por seus ensinamentos (um escândalo entre os socráticos) e servia ao tirano Dionísio de Siracusa com humor inabalável. Seu hedonismo, porém, era disciplinado: o prazer presente, tomado com leveza, jamais lamentado quando ausente. O franco materialismo de sua escola fez dela a grande rival do epicurismo — e sua ancestral honesta.',
      ],
    },
    contributions: {
      en: [
        'Founded the Cyrenaic school — the first systematic hedonism in Western thought',
        'Distinguished enjoying pleasure from being possessed by it',
        'An early ethics of the present moment, prefiguring Epicurus',
        'Made adaptability a philosophical virtue — at ease in palace or shipwreck',
      ],
      pt: [
        'Fundou a escola cirenaica — o primeiro hedonismo sistemático do pensamento ocidental',
        'Distinguiu desfrutar do prazer de ser possuído por ele',
        'Uma ética do momento presente avant la lettre, prefigurando Epicuro',
        'Fez da adaptabilidade uma virtude filosófica — à vontade no palácio ou no naufrágio',
      ],
    },
    quotes: [
      {
        text: {
          en: 'I possess; I am not possessed.',
          pt: 'Eu possuo; não sou possuído.',
        },
        source: {
          en: 'Via Diogenes Laertius',
          pt: 'Via Diógenes Laércio',
        },
      },
      {
        text: {
          en: 'It is not abstinence from pleasures that is best, but mastery over them without ever being worsted.',
          pt: 'O melhor não é abster-se dos prazeres, mas dominá-los sem jamais ser vencido.',
        },
        source: {
          en: 'Via Diogenes Laertius',
          pt: 'Via Diógenes Laércio',
        },
      },
      {
        text: {
          en: 'The wise man adapts himself to circumstances, as water moulds itself to the pitcher.',
          pt: 'O sábio adapta-se às circunstâncias, como a água toma a forma do jarro.',
        },
        source: {
          en: 'Attributed',
          pt: 'Atribuída',
        },
      },
    ],
    traits: {
      en: ['Witty', 'Adaptable', 'Worldly', 'Serene', 'Audacious'],
      pt: ['Espirituoso', 'Adaptável', 'Mundano', 'Sereno', 'Audacioso'],
    },
    facts: {
      en: [
        'He was the first of Socrates’ followers to charge money for teaching philosophy.',
        'Shipwrecked on Rhodes, he saw geometric figures drawn in the sand and rejoiced: "I see traces of men."',
        'His daughter Arete and his grandson Aristippus the Younger carried on the school — one of the first philosophical dynasties.',
      ],
      pt: [
        'Foi o primeiro dos seguidores de Sócrates a cobrar dinheiro para ensinar filosofia.',
        'Náufrago em Rodes, viu figuras geométricas desenhadas na areia e alegrou-se: "Vejo vestígios de homens."',
        'Sua filha Arete e seu neto Aristipo, o Jovem, continuaram a escola — uma das primeiras dinastias filosóficas.',
      ],
    },
    bust: {
      marble: '#ece4d2',
      pedestal: '#c2922f',
      headWidth: 0.92,
      beard: 0.55,
      hair: 0.6,
    },
    figureImage: '/figures/aristippus.webp',
  },
  {
    slug: 'plotinus',
    name: { en: 'Plotinus', pt: 'Plotino' },
    years: {
      en: '204–270 AD',
      pt: '204–270 d.C.',
    },
    birthplace: {
      en: 'Lycopolis, Roman Egypt',
      pt: 'Licópolis, Egito Romano',
    },
    schoolSlugs: ['platonism'],
    influencedBy: ['plato'],
    epithet: {
      en: 'The Father of Neoplatonism',
      pt: 'O Pai do Neoplatonismo',
    },
    biography: {
      en: [
        'Six centuries after Plato, Plotinus reread the dialogues as a map of mystical ascent. Born in Roman Egypt, he studied in Alexandria for eleven years before settling in Rome, where senators and the emperor Gallienus attended his seminars. Reality, he taught, flows from a single ineffable source — the One — through Intellect and Soul down to matter, and the philosopher’s task is the return journey.',
        'He lived what he taught: indifferent to his body, vegetarian, refusing portraits ("a shadow of a shadow"). His student Porphyry collected his lectures into the Enneads, six sets of nine treatises that became the bridge between Greek philosophy and the mystical traditions of Christianity, Islam and Judaism. Augustine reached God by way of Plotinus.',
      ],
      pt: [
        'Seis séculos depois de Platão, Plotino releu os diálogos como um mapa de ascensão mística. Nascido no Egito romano, estudou onze anos em Alexandria antes de se estabelecer em Roma, onde senadores e o imperador Galiano frequentavam seus seminários. A realidade, ensinava, emana de uma fonte única e inefável — o Uno — passando pelo Intelecto e pela Alma até a matéria; a tarefa do filósofo é a viagem de volta.',
        'Vivia o que ensinava: indiferente ao corpo, vegetariano, recusando retratos ("uma sombra da sombra"). Seu discípulo Porfírio reuniu suas lições nas Enéadas, seis conjuntos de nove tratados que se tornaram a ponte entre a filosofia grega e as tradições místicas do cristianismo, do islã e do judaísmo. Agostinho chegou a Deus pela via de Plotino.',
      ],
    },
    contributions: {
      en: [
        'Systematized Platonism into the great metaphysics of emanation: the One, Intellect, Soul',
        'The Enneads — foundation text of Neoplatonism, compiled by Porphyry',
        'A philosophy of contemplation: beauty as the soul’s ladder back to its source',
        'Shaped Augustine, Christian mysticism, Sufism and Renaissance thought',
      ],
      pt: [
        'Sistematizou o platonismo na grande metafísica da emanação: o Uno, o Intelecto, a Alma',
        'As Enéadas — texto fundador do neoplatonismo, compilado por Porfírio',
        'Uma filosofia da contemplação: a beleza como escada da alma de volta à sua origem',
        'Influenciou Agostinho, a mística cristã, o sufismo e o pensamento renascentista',
      ],
    },
    quotes: [
      {
        text: {
          en: 'Never stop sculpting your own statue.',
          pt: 'Nunca deixe de esculpir a sua própria estátua.',
        },
        source: {
          en: 'Enneads, I.6.9',
          pt: 'Enéadas, I.6.9',
        },
      },
      {
        text: {
          en: 'Withdraw into yourself and look.',
          pt: 'Recolhe-te em ti mesmo e olha.',
        },
        source: {
          en: 'Enneads, I.6.9',
          pt: 'Enéadas, I.6.9',
        },
      },
      {
        text: {
          en: 'The soul that beholds beauty becomes beautiful.',
          pt: 'A alma que contempla a beleza torna-se bela.',
        },
        source: {
          en: 'Enneads, I.6',
          pt: 'Enéadas, I.6',
        },
      },
    ],
    traits: {
      en: ['Mystical', 'Ascetic', 'Gentle', 'Systematic', 'Otherworldly'],
      pt: ['Místico', 'Asceta', 'Gentil', 'Sistemático', 'Desapegado do mundo'],
    },
    facts: {
      en: [
        'He joined a military expedition to Persia at 39, hoping to study Persian and Indian philosophy first-hand.',
        'Porphyry reports that Plotinus reached mystical union with the One four times in the years they worked together.',
        'He was so ashamed of having a body that he refused to tell anyone his birthday or sit for a portrait.',
      ],
      pt: [
        'Aos 39 anos, juntou-se a uma expedição militar à Pérsia na esperança de estudar em primeira mão a filosofia persa e indiana.',
        'Porfírio relata que Plotino alcançou a união mística com o Uno quatro vezes nos anos em que trabalharam juntos.',
        'Tinha tanta vergonha de ter um corpo que se recusava a revelar seu aniversário ou posar para um retrato.',
      ],
    },
    bust: {
      marble: '#e8e2d4',
      pedestal: '#5b7fb9',
      headWidth: 0.9,
      beard: 0.7,
      hair: 0.35,
    },
    figureImage: '/figures/plotinus.webp',
  },
  {
    slug: 'hypatia',
    name: { en: 'Hypatia', pt: 'Hipátia' },
    years: {
      en: 'c. 360–415 AD',
      pt: 'c. 360–415 d.C.',
    },
    birthplace: {
      en: 'Alexandria, Roman Egypt',
      pt: 'Alexandria, Egito Romano',
    },
    schoolSlugs: ['platonism'],
    influencedBy: ['plotinus'],
    epithet: {
      en: 'The Lighthouse of Alexandria’s Mind',
      pt: 'O Farol do Pensamento de Alexandria',
    },
    biography: {
      en: [
        'Daughter of the mathematician Theon, Hypatia became the head of Alexandria’s Neoplatonic school and the most celebrated intellectual of her city — a woman lecturing on Plato, Aristotle, astronomy and geometry to audiences of pagans and Christians alike. Students travelled across the Mediterranean to hear her; one of them, Synesius, later a bishop, addressed his letters "to the Philosopher".',
        'She edited and preserved the mathematical canon — Ptolemy’s Almagest, Diophantus’ Arithmetica, the conics of Apollonius. In 415, amid the political struggle between the prefect Orestes and the bishop Cyril, she was murdered by a Christian mob. Her death became a lasting symbol: of the vulnerability of reason to fanaticism, and of the price women have paid for public thought.',
      ],
      pt: [
        'Filha do matemático Téon, Hipátia tornou-se a diretora da escola neoplatônica de Alexandria e a intelectual mais celebrada de sua cidade — uma mulher ensinando Platão, Aristóteles, astronomia e geometria a plateias de pagãos e cristãos. Estudantes cruzavam o Mediterrâneo para ouvi-la; um deles, Sinésio, mais tarde bispo, endereçava suas cartas "à Filósofa".',
        'Editou e preservou o cânone matemático — o Almagesto de Ptolomeu, a Aritmética de Diofanto, as cônicas de Apolônio. Em 415, em meio à disputa política entre o prefeito Orestes e o bispo Cirilo, foi assassinada por uma turba cristã. Sua morte tornou-se um símbolo duradouro: da vulnerabilidade da razão diante do fanatismo, e do preço que as mulheres pagaram pelo pensamento público.',
      ],
    },
    contributions: {
      en: [
        'Led the Neoplatonic school of Alexandria — the first woman to head a major philosophical school',
        'Preserved and edited the works of Ptolemy, Diophantus and Apollonius',
        'Advanced the design of scientific instruments such as the astrolabe',
        'A model of philosophical independence amid religious and political conflict',
      ],
      pt: [
        'Dirigiu a escola neoplatônica de Alexandria — a primeira mulher à frente de uma grande escola filosófica',
        'Preservou e editou as obras de Ptolomeu, Diofanto e Apolônio',
        'Aperfeiçoou instrumentos científicos como o astrolábio',
        'Um modelo de independência filosófica em meio ao conflito religioso e político',
      ],
    },
    quotes: [
      {
        text: {
          en: 'Reserve your right to think, for even to think wrongly is better than not to think at all.',
          pt: 'Defenda o seu direito de pensar, pois até pensar errado é melhor do que não pensar.',
        },
        source: {
          en: 'Attributed',
          pt: 'Atribuída',
        },
      },
      {
        text: {
          en: 'To teach superstitions as truths is a most terrible thing.',
          pt: 'Ensinar superstições como verdades é a coisa mais terrível.',
        },
        source: {
          en: 'Attributed',
          pt: 'Atribuída',
        },
      },
    ],
    traits: {
      en: ['Brilliant', 'Independent', 'Eloquent', 'Courageous', 'Tolerant'],
      pt: ['Brilhante', 'Independente', 'Eloquente', 'Corajosa', 'Tolerante'],
    },
    facts: {
      en: [
        'She taught wearing the tribon, the philosopher’s cloak — male academic dress — through the streets of Alexandria.',
        'Synesius’ surviving letters ask her for advice on building an astrolabe and a hydroscope.',
        'Voltaire, Gibbon and countless novels and films retold her story; the asteroid 238 Hypatia carries her name.',
      ],
      pt: [
        'Ensinava vestindo o tríbon, o manto dos filósofos — traje acadêmico masculino — pelas ruas de Alexandria.',
        'As cartas preservadas de Sinésio pedem a ela conselhos para construir um astrolábio e um hidroscópio.',
        'Voltaire, Gibbon e inúmeros romances e filmes recontaram sua história; o asteroide 238 Hypatia leva seu nome.',
      ],
    },
    bust: {
      marble: '#efe8da',
      pedestal: '#5b7fb9',
      headWidth: 0.86,
      beard: 0,
      hair: 0.85,
    },
    figureImage: '/figures/hypatia.webp',
  },
  {
    slug: 'theophrastus',
    name: { en: 'Theophrastus', pt: 'Teofrasto' },
    years: {
      en: 'c. 371–287 BC',
      pt: 'c. 371–287 a.C.',
    },
    birthplace: {
      en: 'Eresos, Lesbos',
      pt: 'Eresos, Lesbos',
    },
    schoolSlugs: ['aristotelianism'],
    influencedBy: ['aristotle'],
    epithet: {
      en: 'The Father of Botany',
      pt: 'O Pai da Botânica',
    },
    biography: {
      en: [
        'Aristotle’s closest collaborator and chosen successor, Theophrastus led the Lyceum for thirty-six years — longer than its founder — and at its height taught some two thousand students. Aristotle, admiring his graceful speech, gave him his name: "the divine speaker". He inherited not only the school but Aristotle’s library and manuscripts, the greatest collection of knowledge then assembled.',
        'Where Aristotle mapped animals, Theophrastus mapped plants: his Enquiry into Plants and Causes of Plants classified over five hundred species and stood as botany’s foundation for eighteen centuries. His other masterpiece looks at human flora: the Characters, thirty sharp portraits of Athenian types — the Flatterer, the Boor, the Gossip — the ancestor of every comedy of manners.',
      ],
      pt: [
        'Colaborador mais próximo de Aristóteles e seu sucessor escolhido, Teofrasto dirigiu o Liceu por trinta e seis anos — mais que o fundador — e, no auge, ensinou cerca de dois mil alunos. Aristóteles, admirando sua fala elegante, deu-lhe o nome: "o orador divino". Herdou não apenas a escola, mas a biblioteca e os manuscritos de Aristóteles, a maior coleção de conhecimento até então reunida.',
        'Onde Aristóteles mapeou os animais, Teofrasto mapeou as plantas: sua História das Plantas e As Causas das Plantas classificaram mais de quinhentas espécies e foram o fundamento da botânica por dezoito séculos. Sua outra obra-prima observa a flora humana: os Caracteres, trinta retratos afiados de tipos atenienses — o Bajulador, o Grosseiro, o Fofoqueiro — ancestral de toda comédia de costumes.',
      ],
    },
    contributions: {
      en: [
        'Founded botany as a science — systematic classification of over 500 plant species',
        'The Characters: the first systematic study of personality types',
        'Led and expanded the Lyceum, securing the Aristotelian corpus for posterity',
        'Pioneering work on minerals, weather signs, and the history of philosophy itself',
      ],
      pt: [
        'Fundou a botânica como ciência — classificação sistemática de mais de 500 espécies de plantas',
        'Os Caracteres: o primeiro estudo sistemático de tipos de personalidade',
        'Dirigiu e expandiu o Liceu, garantindo o corpus aristotélico para a posteridade',
        'Trabalhos pioneiros sobre minerais, sinais do tempo e a própria história da filosofia',
      ],
    },
    quotes: [
      {
        text: {
          en: 'Time is the most valuable thing a man can spend.',
          pt: 'O tempo é a coisa mais valiosa que um homem pode gastar.',
        },
        source: {
          en: 'Via Diogenes Laertius',
          pt: 'Via Diógenes Laércio',
        },
      },
      {
        text: {
          en: 'We die just when we are beginning to live.',
          pt: 'Morremos justamente quando começamos a viver.',
        },
        source: {
          en: 'Deathbed words, via Diogenes Laertius',
          pt: 'Palavras no leito de morte, via Diógenes Laércio',
        },
      },
      {
        text: {
          en: 'One may define flattery as a base companionship which is most advantageous to the flatterer.',
          pt: 'Pode-se definir a bajulação como um convívio baixo, vantajoso sobretudo para o bajulador.',
        },
        source: {
          en: 'Characters',
          pt: 'Caracteres',
        },
      },
    ],
    traits: {
      en: ['Observant', 'Industrious', 'Witty', 'Methodical', 'Devoted'],
      pt: ['Observador', 'Trabalhador', 'Espirituoso', 'Metódico', 'Dedicado'],
    },
    facts: {
      en: [
        'His real name was Tyrtamus — "Theophrastus" was Aristotle’s nickname for his divine eloquence.',
        'When Demetrius of Phalerum fell, the Lyceum garden was saved for him by a special decree of the Athenian assembly.',
        'His weather treatise lists 80 signs of rain — sailors and farmers used them for two millennia.',
      ],
      pt: [
        'Seu nome verdadeiro era Tírtamo — "Teofrasto" foi o apelido dado por Aristóteles à sua eloquência divina.',
        'Quando Demétrio de Faleros caiu, o jardim do Liceu foi salvo para ele por decreto especial da assembleia ateniense.',
        'Seu tratado sobre o tempo lista 80 sinais de chuva — marinheiros e agricultores os usaram por dois milênios.',
      ],
    },
    bust: {
      marble: '#eae4d6',
      pedestal: '#7a9a59',
      headWidth: 0.9,
      beard: 0.6,
      hair: 0.5,
    },
    figureImage: '/figures/theophrastus.webp',
  },
  {
    slug: 'averroes',
    name: { en: 'Averroes', pt: 'Averróis' },
    years: {
      en: '1126–1198',
      pt: '1126–1198',
    },
    birthplace: {
      en: 'Córdoba, Al-Andalus',
      pt: 'Córdoba, Al-Andalus',
    },
    schoolSlugs: ['aristotelianism'],
    influencedBy: ['aristotle'],
    epithet: {
      en: 'The Commentator',
      pt: 'O Comentador',
    },
    biography: {
      en: [
        'Ibn Rushd — Latinized as Averroes — was a judge, physician and philosopher in Almohad Córdoba and Marrakesh. Commissioned by the caliph to explain Aristotle, he produced commentaries of three depths on nearly the whole corpus, so authoritative that medieval Europe called him simply "the Commentator", as Aristotle was "the Philosopher".',
        'In the Decisive Treatise he argued that philosophy is not merely permitted but commanded by Islamic law, since truth cannot contradict truth. Late in life his books were burned and he was briefly exiled — yet his thought crossed into Hebrew and Latin, ignited the Averroist movement at the University of Paris, and forced Aquinas and all of Scholasticism to answer him. The European recovery of Aristotle runs through Córdoba.',
      ],
      pt: [
        'Ibn Rushd — latinizado como Averróis — foi juiz, médico e filósofo na Córdoba e na Marrakesh almôadas. Encarregado pelo califa de explicar Aristóteles, produziu comentários em três níveis de profundidade sobre quase todo o corpus, tão autorizados que a Europa medieval o chamava simplesmente de "o Comentador", como Aristóteles era "o Filósofo".',
        'No Tratado Decisivo, argumentou que a filosofia não é apenas permitida, mas ordenada pela lei islâmica, pois a verdade não pode contradizer a verdade. No fim da vida seus livros foram queimados e ele foi brevemente exilado — mas seu pensamento atravessou para o hebraico e o latim, acendeu o movimento averroísta na Universidade de Paris e obrigou Tomás de Aquino e toda a Escolástica a respondê-lo. A redescoberta europeia de Aristóteles passa por Córdoba.',
      ],
    },
    contributions: {
      en: [
        'Monumental commentaries on Aristotle that restored him to Europe',
        'The Decisive Treatise: the classic defence of the harmony of reason and faith',
        'Major works in medicine (the Colliget), law and astronomy',
        'Inspired Latin Averroism — a key current in the rise of the medieval university',
      ],
      pt: [
        'Comentários monumentais sobre Aristóteles que o devolveram à Europa',
        'O Tratado Decisivo: a defesa clássica da harmonia entre razão e fé',
        'Obras importantes de medicina (o Colliget), direito e astronomia',
        'Inspirou o averroísmo latino — corrente decisiva no surgimento da universidade medieval',
      ],
    },
    quotes: [
      {
        text: {
          en: 'Truth does not contradict truth.',
          pt: 'A verdade não contradiz a verdade.',
        },
        source: {
          en: 'Decisive Treatise',
          pt: 'Tratado Decisivo',
        },
      },
      {
        text: {
          en: 'Ignorance leads to fear, fear leads to hatred, and hatred leads to violence.',
          pt: 'A ignorância leva ao medo, o medo leva ao ódio, e o ódio leva à violência.',
        },
        source: {
          en: 'Attributed',
          pt: 'Atribuída',
        },
      },
      {
        text: {
          en: 'Knowledge is the conformity of the object and the intellect.',
          pt: 'O conhecimento é a conformidade entre o objeto e o intelecto.',
        },
        source: {
          en: 'Attributed',
          pt: 'Atribuída',
        },
      },
    ],
    traits: {
      en: ['Rationalist', 'Erudite', 'Conciliatory', 'Tenacious', 'Universal'],
      pt: ['Racionalista', 'Erudito', 'Conciliador', 'Tenaz', 'Universal'],
    },
    facts: {
      en: [
        'Dante placed him in Limbo among the virtuous non-Christians, beside Aristotle and Plato.',
        'He served as chief judge (qadi) of Córdoba and as personal physician to two caliphs.',
        'Raphael painted him into The School of Athens — the only medieval Muslim in the fresco.',
      ],
      pt: [
        'Dante o colocou no Limbo entre os virtuosos não cristãos, ao lado de Aristóteles e Platão.',
        'Serviu como juiz supremo (cádi) de Córdoba e médico pessoal de dois califas.',
        'Rafael o pintou na Escola de Atenas — o único muçulmano medieval do afresco.',
      ],
    },
    bust: {
      marble: '#e9e0cc',
      pedestal: '#7a9a59',
      headWidth: 0.92,
      beard: 0.7,
      hair: 0.3,
    },
    figureImage: '/figures/averroes.webp',
  },
  {
    slug: 'zeno-of-citium',
    name: { en: 'Zeno of Citium', pt: 'Zenão de Cítio' },
    years: {
      en: 'c. 334–262 BC',
      pt: 'c. 334–262 a.C.',
    },
    birthplace: {
      en: 'Citium, Cyprus',
      pt: 'Cítio, Chipre',
    },
    schoolSlugs: ['stoicism'],
    influencedBy: ['antisthenes'],
    epithet: {
      en: 'The Founder of the Stoa',
      pt: 'O Fundador da Stoa',
    },
    biography: {
      en: [
        'A Phoenician merchant from Cyprus, Zeno was shipwrecked near Athens around the age of thirty, losing a cargo of purple dye. Wandering into a bookshop, he heard a reading about Socrates and asked where men like that could be found; the bookseller pointed at the passing Cynic Crates — "follow him". Out of that ruin came a school: he later joked that he made a prosperous voyage when he suffered shipwreck.',
        'He taught at the Stoa Poikile, the Painted Porch in the agora, and his followers became "Stoics" — porch people. His system joined Cynic ethics to a full logic and physics: live according to nature, for virtue alone is good. Athens so honoured this resident alien that it voted him a golden crown and, on his death, a public tomb built at state expense.',
      ],
      pt: [
        'Mercador fenício de Chipre, Zenão naufragou perto de Atenas por volta dos trinta anos, perdendo uma carga de púrpura. Entrando numa livraria, ouviu uma leitura sobre Sócrates e perguntou onde se encontravam homens assim; o livreiro apontou para o cínico Crates, que passava — "siga aquele ali". Daquela ruína nasceu uma escola: mais tarde brincava que fizera uma viagem próspera quando sofreu o naufrágio.',
        'Ensinava na Stoa Poikile, o Pórtico Pintado da ágora, e seus seguidores tornaram-se "estoicos" — a gente do pórtico. Seu sistema uniu a ética cínica a uma lógica e uma física completas: viver conforme a natureza, pois só a virtude é um bem. Atenas honrou tanto esse estrangeiro residente que lhe votou uma coroa de ouro e, à sua morte, um túmulo público às custas do Estado.',
      ],
    },
    contributions: {
      en: [
        'Founded Stoicism and its threefold system: logic, physics, ethics',
        'The doctrine of living in agreement with nature',
        'First articulation of cosmopolitanism — all humans as citizens of one world-city',
        'Created the school that would guide Seneca, Epictetus and Marcus Aurelius',
      ],
      pt: [
        'Fundou o estoicismo e seu sistema tripartite: lógica, física, ética',
        'A doutrina de viver em acordo com a natureza',
        'Primeira formulação do cosmopolitismo — todos os humanos como cidadãos de uma única cidade-mundo',
        'Criou a escola que guiaria Sêneca, Epicteto e Marco Aurélio',
      ],
    },
    quotes: [
      {
        text: {
          en: 'Man conquers the world by conquering himself.',
          pt: 'O homem conquista o mundo conquistando a si mesmo.',
        },
        source: {
          en: 'Attributed',
          pt: 'Atribuída',
        },
      },
      {
        text: {
          en: 'We have two ears and one mouth, so we should listen more than we say.',
          pt: 'Temos dois ouvidos e uma boca, para ouvir mais do que falar.',
        },
        source: {
          en: 'Via Diogenes Laertius',
          pt: 'Via Diógenes Laércio',
        },
      },
      {
        text: {
          en: 'Happiness is a good flow of life.',
          pt: 'A felicidade é um bom fluxo de vida.',
        },
        source: {
          en: 'Via Stobaeus',
          pt: 'Via Estobeu',
        },
      },
    ],
    traits: {
      en: ['Frugal', 'Persevering', 'Modest', 'Systematic', 'Cosmopolitan'],
      pt: ['Frugal', 'Perseverante', 'Modesto', 'Sistemático', 'Cosmopolita'],
    },
    facts: {
      en: [
        'He studied for about a decade under the Cynic Crates, the Megarians and the Academy before opening his own school.',
        'King Antigonus II of Macedon attended his lectures and invited him to court; Zeno, too old, sent students instead.',
        'The Athenians deposited the keys of the city walls with him — a unique mark of trust in a foreigner.',
      ],
      pt: [
        'Estudou cerca de uma década com o cínico Crates, os megáricos e a Academia antes de abrir a própria escola.',
        'O rei Antígono II da Macedônia assistia às suas aulas e o convidou à corte; Zenão, já idoso, enviou discípulos.',
        'Os atenienses depositaram com ele as chaves das muralhas da cidade — marca única de confiança num estrangeiro.',
      ],
    },
    bust: {
      marble: '#e7e0d0',
      pedestal: '#a35e3b',
      headWidth: 0.88,
      beard: 0.85,
      hair: 0.5,
    },
    figureImage: '/figures/zeno.webp',
  },
  {
    slug: 'epictetus',
    name: { en: 'Epictetus', pt: 'Epicteto' },
    years: {
      en: 'c. 50–135 AD',
      pt: 'c. 50–135 d.C.',
    },
    birthplace: {
      en: 'Hierapolis, Phrygia',
      pt: 'Hierápolis, Frígia',
    },
    schoolSlugs: ['stoicism'],
    influencedBy: ['zeno-of-citium'],
    epithet: {
      en: 'The Slave Who Taught Emperors',
      pt: 'O Escravo que Ensinou Imperadores',
    },
    biography: {
      en: [
        'Born a slave in Asia Minor — his very name means "acquired" — Epictetus served in Nero’s court under the master Epaphroditus, studied Stoicism while still enslaved, and walked with a lame leg for the rest of his life. Freed after Nero’s death, he taught in Rome until the emperor Domitian banished all philosophers, then founded his school in Nicopolis, Greece, where students came from across the empire.',
        'He wrote nothing. His pupil Arrian transcribed the Discourses and distilled the Enchiridion — the "Handbook" — whose first sentence carries the whole doctrine: some things are up to us, and some are not. No philosopher drew the line between the two more sharply, or lived it more completely. A copy of the Meditations shows how deeply the emperor Marcus Aurelius read the former slave.',
      ],
      pt: [
        'Nascido escravo na Ásia Menor — seu próprio nome significa "adquirido" — Epicteto serviu na corte de Nero sob o senhor Epafrodito, estudou estoicismo ainda escravizado e carregou uma perna manca pelo resto da vida. Liberto após a morte de Nero, ensinou em Roma até o imperador Domiciano banir todos os filósofos; fundou então sua escola em Nicópolis, na Grécia, para onde vinham estudantes de todo o império.',
        'Não escreveu nada. Seu aluno Arriano transcreveu as Diatribes e destilou o Encheirídion — o "Manual" — cuja primeira frase carrega a doutrina inteira: algumas coisas dependem de nós, outras não. Nenhum filósofo traçou essa linha com mais nitidez, nem a viveu com mais inteireza. As Meditações mostram o quanto o imperador Marco Aurélio leu o ex-escravo.',
      ],
    },
    contributions: {
      en: [
        'The dichotomy of control in its sharpest form — the heart of practical Stoicism',
        'The Enchiridion: the most influential manual of applied ethics ever written',
        'Moral education as training (askesis): philosophy as daily practice, not theory',
        'Direct influence on Marcus Aurelius and on modern cognitive therapy (CBT)',
      ],
      pt: [
        'A dicotomia do controle em sua forma mais nítida — o coração do estoicismo prático',
        'O Encheirídion: o manual de ética aplicada mais influente já escrito',
        'A educação moral como treino (áskesis): filosofia como prática diária, não teoria',
        'Influência direta sobre Marco Aurélio e sobre a terapia cognitiva moderna (TCC)',
      ],
    },
    quotes: [
      {
        text: {
          en: 'Men are disturbed not by things, but by the views they take of them.',
          pt: 'Os homens não se perturbam pelas coisas, mas pelas opiniões que têm delas.',
        },
        source: {
          en: 'Enchiridion, 5',
          pt: 'Encheirídion, 5',
        },
      },
      {
        text: {
          en: 'Wealth consists not in having great possessions, but in having few wants.',
          pt: 'A riqueza não consiste em ter grandes posses, mas em ter poucas necessidades.',
        },
        source: {
          en: 'Attributed',
          pt: 'Atribuída',
        },
      },
      {
        text: {
          en: 'First say to yourself what you would be; and then do what you have to do.',
          pt: 'Primeiro diga a si mesmo o que você quer ser; depois faça o que precisa ser feito.',
        },
        source: {
          en: 'Discourses, III.23',
          pt: 'Diatribes, III.23',
        },
      },
    ],
    traits: {
      en: ['Resilient', 'Direct', 'Humble', 'Disciplined', 'Sharp-tongued'],
      pt: ['Resiliente', 'Direto', 'Humilde', 'Disciplinado', 'De língua afiada'],
    },
    facts: {
      en: [
        'Tradition says his master twisted his leg; Epictetus calmly warned "it will break" — and then: "Did I not tell you?"',
        'He lived with so little that his iron lamp was stolen; a admirer later paid 3,000 drachmas for the replacement clay one.',
        'In old age he adopted a child who would otherwise have been abandoned, raising it with a housekeeper.',
      ],
      pt: [
        'A tradição conta que seu senhor lhe torcia a perna; Epicteto avisou calmamente "vai quebrar" — e depois: "Eu não disse?"',
        'Vivia com tão pouco que roubaram sua lamparina de ferro; um admirador pagaria 3.000 dracmas pela substituta de barro.',
        'Na velhice, adotou uma criança que seria abandonada e a criou com a ajuda de uma governanta.',
      ],
    },
    bust: {
      marble: '#e5ded0',
      pedestal: '#a35e3b',
      headWidth: 0.9,
      beard: 0.7,
      hair: 0.25,
    },
    figureImage: '/figures/epictetus.webp',
  },
  {
    slug: 'spinoza',
    name: { en: 'Baruch Spinoza', pt: 'Baruch Spinoza' },
    years: {
      en: '1632–1677',
      pt: '1632–1677',
    },
    birthplace: {
      en: 'Amsterdam, Netherlands',
      pt: 'Amsterdã, Países Baixos',
    },
    schoolSlugs: ['rationalism'],
    influencedBy: ['descartes', 'seneca'],
    epithet: {
      en: 'The God-Intoxicated Philosopher',
      pt: 'O Filósofo Embriagado de Deus',
    },
    biography: {
      en: [
        'Son of Portuguese-Jewish refugees in Amsterdam, Spinoza was expelled from his community at twenty-three with the harshest writ of cherem ever issued there — for ideas he had barely begun to publish. He declined professorships and a royal pension, choosing to grind optical lenses for a living while writing, with geometric rigor, the most radical system of the century.',
        'His Ethics, published only after his death, demonstrates "in the geometric manner" that God and Nature are one substance, that mind and body are two aspects of the same thing, and that freedom is understanding necessity. Denounced for two centuries as an atheist, he was rediscovered as something stranger: a man so possessed by the idea of God that he saw nothing else — and one of the gentlest lives in the history of philosophy.',
      ],
      pt: [
        'Filho de refugiados judeus portugueses em Amsterdã, Spinoza foi expulso de sua comunidade aos vinte e três anos com o mais duro decreto de cherem já emitido ali — por ideias que mal havia começado a publicar. Recusou cátedras e uma pensão real, preferindo polir lentes ópticas para viver enquanto escrevia, com rigor geométrico, o sistema mais radical do século.',
        'Sua Ética, publicada apenas após a morte, demonstra "à maneira geométrica" que Deus e a Natureza são uma única substância, que mente e corpo são dois aspectos da mesma coisa, e que a liberdade é compreender a necessidade. Denunciado por dois séculos como ateu, foi redescoberto como algo mais estranho: um homem tão possuído pela ideia de Deus que não via outra coisa — e uma das vidas mais serenas da história da filosofia.',
      ],
    },
    contributions: {
      en: [
        'Deus sive Natura — the identification of God with Nature, one infinite substance',
        'The Ethics: a complete metaphysics, psychology and ethics in geometric form',
        'Founder of modern biblical criticism in the Theological-Political Treatise',
        'A pioneering defence of freedom of thought and democratic government',
      ],
      pt: [
        'Deus sive Natura — a identificação de Deus com a Natureza, uma única substância infinita',
        'A Ética: metafísica, psicologia e ética completas em forma geométrica',
        'Fundador da crítica bíblica moderna no Tratado Teológico-Político',
        'Defesa pioneira da liberdade de pensamento e do governo democrático',
      ],
    },
    quotes: [
      {
        text: {
          en: 'Not to laugh, not to lament, not to curse, but to understand.',
          pt: 'Não rir, não lamentar, não maldizer, mas compreender.',
        },
        source: {
          en: 'Political Treatise, I.4',
          pt: 'Tratado Político, I.4',
        },
      },
      {
        text: {
          en: 'All things excellent are as difficult as they are rare.',
          pt: 'Tudo o que é excelente é tão difícil quanto raro.',
        },
        source: {
          en: 'Ethics, V — final line',
          pt: 'Ética, V — linha final',
        },
      },
      {
        text: {
          en: 'The free man thinks of death least of all things; his wisdom is a meditation on life.',
          pt: 'O homem livre em nada pensa menos que na morte; sua sabedoria é uma meditação sobre a vida.',
        },
        source: {
          en: 'Ethics, IV.67',
          pt: 'Ética, IV.67',
        },
      },
    ],
    traits: {
      en: ['Serene', 'Independent', 'Rigorous', 'Frugal', 'Fearless'],
      pt: ['Sereno', 'Independente', 'Rigoroso', 'Frugal', 'Destemido'],
    },
    facts: {
      en: [
        'He turned down the chair of philosophy at Heidelberg to keep his freedom to think.',
        'Einstein, asked if he believed in God, answered: "I believe in Spinoza’s God."',
        'The glass dust from his lens-grinding likely aggravated the lung disease that killed him at 44.',
      ],
      pt: [
        'Recusou a cátedra de filosofia em Heidelberg para preservar sua liberdade de pensar.',
        'Einstein, perguntado se acreditava em Deus, respondeu: "Acredito no Deus de Spinoza."',
        'O pó de vidro do polimento de lentes provavelmente agravou a doença pulmonar que o matou aos 44 anos.',
      ],
    },
    bust: {
      marble: '#ece6d8',
      pedestal: '#3a5c6e',
      headWidth: 0.88,
      beard: 0,
      hair: 0.75,
    },
    figureImage: '/figures/spinoza.webp',
  },
  {
    slug: 'leibniz',
    name: { en: 'Gottfried Wilhelm Leibniz', pt: 'Gottfried Wilhelm Leibniz' },
    years: {
      en: '1646–1716',
      pt: '1646–1716',
    },
    birthplace: {
      en: 'Leipzig, Germany',
      pt: 'Leipzig, Alemanha',
    },
    schoolSlugs: ['rationalism'],
    influencedBy: ['descartes', 'spinoza'],
    epithet: {
      en: 'The Last Universal Genius',
      pt: 'O Último Gênio Universal',
    },
    biography: {
      en: [
        'Leibniz read everything, answered everyone, and improved whatever he touched: he invented calculus independently of Newton, built the first machine that could multiply, devised binary arithmetic, reformed law codes, planned academies, engineered mines, and wrote philosophy at night in a carriage between courts. He left some 200,000 manuscript pages — still not fully published.',
        'His metaphysics is as audacious as his mathematics: the universe consists of monads, simple soul-like substances each mirroring the whole from its own point of view, harmonized by God from creation. Since God is perfect, the world He chose must be the best of all possible worlds — a thesis Voltaire mocked in Candide, but whose underlying principle, that nothing is without a reason, became an engine of modern science.',
      ],
      pt: [
        'Leibniz lia tudo, respondia a todos e melhorava o que tocava: inventou o cálculo independentemente de Newton, construiu a primeira máquina capaz de multiplicar, criou a aritmética binária, reformou códigos jurídicos, planejou academias, projetou minas e escrevia filosofia à noite, numa carruagem entre cortes. Deixou cerca de 200.000 páginas manuscritas — até hoje não publicadas por completo.',
        'Sua metafísica é tão audaciosa quanto sua matemática: o universo consiste de mônadas, substâncias simples como almas, cada uma espelhando o todo de seu próprio ponto de vista, harmonizadas por Deus desde a criação. Sendo Deus perfeito, o mundo que escolheu deve ser o melhor dos mundos possíveis — tese que Voltaire satirizou no Cândido, mas cujo princípio de fundo, nada é sem razão, tornou-se um motor da ciência moderna.',
      ],
    },
    contributions: {
      en: [
        'Co-inventor of calculus — his notation (dx, ∫) is the one we still use',
        'Binary arithmetic: the 0s and 1s at the foundation of every computer',
        'Monadology and the principle of sufficient reason',
        'Pioneer of formal logic, two centuries before Boole and Frege',
      ],
      pt: [
        'Coinventor do cálculo — sua notação (dx, ∫) é a que usamos até hoje',
        'A aritmética binária: os 0s e 1s na base de todo computador',
        'A Monadologia e o princípio da razão suficiente',
        'Pioneiro da lógica formal, dois séculos antes de Boole e Frege',
      ],
    },
    quotes: [
      {
        text: {
          en: 'Nothing is without a reason.',
          pt: 'Nada é sem uma razão.',
        },
        source: {
          en: 'Principle of sufficient reason',
          pt: 'Princípio da razão suficiente',
        },
      },
      {
        text: {
          en: 'Music is the pleasure the human mind experiences from counting without being aware that it is counting.',
          pt: 'A música é o prazer que a mente humana experimenta ao contar sem perceber que está contando.',
        },
        source: {
          en: 'Letter to Christian Goldbach, 1712',
          pt: 'Carta a Christian Goldbach, 1712',
        },
      },
      {
        text: {
          en: 'The present is pregnant with the future.',
          pt: 'O presente está grávido do futuro.',
        },
        source: {
          en: 'Monadology',
          pt: 'Monadologia',
        },
      },
    ],
    traits: {
      en: ['Omnivorous', 'Optimistic', 'Diplomatic', 'Tireless', 'Inventive'],
      pt: ['Onívoro intelectual', 'Otimista', 'Diplomático', 'Incansável', 'Inventivo'],
    },
    facts: {
      en: [
        'He earned his doctorate in law at 20 — after Leipzig refused it for his youth, Altdorf granted it and offered him a professorship, which he declined.',
        'His calculating machine, the Stepped Reckoner, was the first that could do all four arithmetic operations.',
        'The bitter priority dispute with Newton over calculus split European mathematics for a century.',
      ],
      pt: [
        'Doutorou-se em direito aos 20 anos — depois que Leipzig recusou pela pouca idade, Altdorf concedeu o título e lhe ofereceu uma cátedra, que ele recusou.',
        'Sua máquina de calcular, a Stepped Reckoner, foi a primeira capaz das quatro operações aritméticas.',
        'A amarga disputa de prioridade com Newton sobre o cálculo dividiu a matemática europeia por um século.',
      ],
    },
    bust: {
      marble: '#efe9db',
      pedestal: '#3a5c6e',
      headWidth: 0.9,
      beard: 0,
      hair: 0.95,
    },
    figureImage: '/figures/leibniz.webp',
  },
  {
    slug: 'fichte',
    name: { en: 'Johann Gottlieb Fichte', pt: 'Johann Gottlieb Fichte' },
    years: {
      en: '1762–1814',
      pt: '1762–1814',
    },
    birthplace: {
      en: 'Rammenau, Saxony',
      pt: 'Rammenau, Saxônia',
    },
    schoolSlugs: ['german-idealism'],
    influencedBy: ['kant'],
    epithet: {
      en: 'The Philosopher of the I',
      pt: 'O Filósofo do Eu',
    },
    biography: {
      en: [
        'A goose-herd’s son whose memory so impressed a visiting baron that he paid for the boy’s education, Fichte rose to fame through a misunderstanding: his first book, published anonymously, was taken everywhere for a new work by Kant — who then revealed the author’s name. Within two years he held the chair of philosophy at Jena, the centre of the post-Kantian world.',
        'His Wissenschaftslehre ("Doctrine of Science") radicalized Kant: the I is not a thing but an act — it posits itself, and posits the world as the field of its own striving. Philosophy thus becomes a doctrine of freedom. Dismissed from Jena in the "atheism controversy", he moved to Berlin, delivered the Addresses to the German Nation under French occupation, and became the first elected rector of the new University of Berlin.',
      ],
      pt: [
        'Filho de um tecelão e pastor de gansos, cuja memória impressionou tanto um barão visitante que este pagou seus estudos, Fichte alcançou a fama por um mal-entendido: seu primeiro livro, publicado anonimamente, foi tomado em toda parte por uma nova obra de Kant — que então revelou o nome do autor. Em dois anos, ocupava a cátedra de filosofia de Jena, o centro do mundo pós-kantiano.',
        'Sua Wissenschaftslehre ("Doutrina da Ciência") radicalizou Kant: o Eu não é uma coisa, mas um ato — ele se põe a si mesmo, e põe o mundo como campo de seu próprio esforço. A filosofia torna-se, assim, uma doutrina da liberdade. Demitido de Jena na "querela do ateísmo", mudou-se para Berlim, proferiu os Discursos à Nação Alemã sob ocupação francesa e tornou-se o primeiro reitor eleito da nova Universidade de Berlim.',
      ],
    },
    contributions: {
      en: [
        'The Wissenschaftslehre: the I as self-positing act, founding German Idealism proper',
        'Made freedom and moral striving the first principle of philosophy',
        'The Addresses to the German Nation — a landmark of philosophy of education',
        'Bridge from Kant to Schelling and Hegel',
      ],
      pt: [
        'A Wissenschaftslehre: o Eu como ato que se põe a si mesmo, fundando o idealismo alemão propriamente dito',
        'Fez da liberdade e do esforço moral o primeiro princípio da filosofia',
        'Os Discursos à Nação Alemã — um marco da filosofia da educação',
        'Ponte entre Kant e Schelling e Hegel',
      ],
    },
    quotes: [
      {
        text: {
          en: 'What sort of philosophy one chooses depends on what sort of person one is.',
          pt: 'O tipo de filosofia que se escolhe depende do tipo de pessoa que se é.',
        },
        source: {
          en: 'First Introduction to the Wissenschaftslehre',
          pt: 'Primeira Introdução à Doutrina da Ciência',
        },
      },
      {
        text: {
          en: 'You could not remove a single grain of sand from its place without thereby changing something throughout all parts of the immeasurable whole.',
          pt: 'Não se poderia tirar um único grão de areia do seu lugar sem com isso mudar algo em todas as partes do todo imensurável.',
        },
        source: {
          en: 'The Vocation of Man',
          pt: 'A Vocação do Homem',
        },
      },
      {
        text: {
          en: 'I am not hungry because food is before me; food is before me because I am hungry — the practical I comes first.',
          pt: 'Não tenho fome porque há comida diante de mim; há comida diante de mim porque tenho fome — o Eu prático vem primeiro.',
        },
        source: {
          en: 'Paraphrase of the Wissenschaftslehre',
          pt: 'Paráfrase da Doutrina da Ciência',
        },
      },
    ],
    traits: {
      en: ['Fervent', 'Idealistic', 'Combative', 'Eloquent', 'Demanding'],
      pt: ['Fervoroso', 'Idealista', 'Combativo', 'Eloquente', 'Exigente'],
    },
    facts: {
      en: [
        'As a boy he could recite the Sunday sermon verbatim — the feat that won him his education.',
        'Kant publicly disclosed Fichte’s authorship of the Attempt at a Critique of All Revelation, making him famous overnight.',
        'He died of typhus caught from his wife, who had contracted it nursing wounded soldiers of the Napoleonic Wars.',
      ],
      pt: [
        'Quando menino, recitava o sermão de domingo palavra por palavra — a façanha que lhe valeu os estudos.',
        'Kant revelou publicamente a autoria de Fichte do Ensaio de uma Crítica de Toda Revelação, tornando-o famoso da noite para o dia.',
        'Morreu de tifo contraído da esposa, que se infectara cuidando de soldados feridos das Guerras Napoleônicas.',
      ],
    },
    bust: {
      marble: '#eae3d3',
      pedestal: '#5c3a6e',
      headWidth: 0.9,
      beard: 0,
      hair: 0.5,
    },
    figureImage: '/figures/fichte.webp',
  },
  {
    slug: 'hegel',
    name: { en: 'G. W. F. Hegel', pt: 'G. W. F. Hegel' },
    years: {
      en: '1770–1831',
      pt: '1770–1831',
    },
    birthplace: {
      en: 'Stuttgart, Germany',
      pt: 'Stuttgart, Alemanha',
    },
    schoolSlugs: ['german-idealism'],
    influencedBy: ['kant', 'fichte', 'spinoza'],
    epithet: {
      en: 'The Philosopher of the Dialectic',
      pt: 'O Filósofo da Dialética',
    },
    biography: {
      en: [
        'Hegel finished the Phenomenology of Spirit in Jena in 1806, reportedly as cannon fire from the Battle of Jena echoed nearby — he had just seen Napoleon ride through the city, "the world-soul on horseback". The book recasts the history of consciousness as a single dramatic ascent: each shape of thought contradicts itself and is driven beyond itself, until spirit recognizes the world as its own work.',
        'After years as a newspaper editor and schoolmaster, he rose to the chair in Berlin, where his lectures on history, art, religion and right drew students from across Europe. His system — logic, nature, spirit — claims that the real is rational: history, with all its slaughter, is freedom becoming conscious of itself. Marx turned the dialectic upside down; either way, the nineteenth and twentieth centuries argued in his vocabulary.',
      ],
      pt: [
        'Hegel terminou a Fenomenologia do Espírito em Jena, em 1806, dizem que ao eco dos canhões da Batalha de Jena — acabara de ver Napoleão cavalgar pela cidade, "a alma do mundo a cavalo". O livro reconta a história da consciência como uma única ascensão dramática: cada figura do pensamento contradiz a si mesma e é impelida além de si, até que o espírito reconheça o mundo como obra sua.',
        'Depois de anos como editor de jornal e diretor de escola, chegou à cátedra de Berlim, onde suas preleções sobre história, arte, religião e direito atraíam estudantes de toda a Europa. Seu sistema — lógica, natureza, espírito — sustenta que o real é racional: a história, com todas as suas carnificinas, é a liberdade tomando consciência de si. Marx virou a dialética de cabeça para baixo; de um jeito ou de outro, os séculos XIX e XX discutiram no vocabulário dele.',
      ],
    },
    contributions: {
      en: [
        'The dialectic: contradiction as the engine of thought and history',
        'The Phenomenology of Spirit — consciousness narrated as a developmental epic',
        'Philosophy of history: freedom progressively realizing itself',
        'Master–slave dialectic: the struggle for recognition, seed of Marx and existentialism',
      ],
      pt: [
        'A dialética: a contradição como motor do pensamento e da história',
        'A Fenomenologia do Espírito — a consciência narrada como epopeia de formação',
        'Filosofia da história: a liberdade realizando-se progressivamente',
        'A dialética do senhor e do escravo: a luta por reconhecimento, semente de Marx e do existencialismo',
      ],
    },
    quotes: [
      {
        text: {
          en: 'Nothing great in the world has ever been accomplished without passion.',
          pt: 'Nada de grande no mundo foi realizado sem paixão.',
        },
        source: {
          en: 'Lectures on the Philosophy of History',
          pt: 'Lições sobre a Filosofia da História',
        },
      },
      {
        text: {
          en: 'The owl of Minerva spreads its wings only with the falling of the dusk.',
          pt: 'A coruja de Minerva só alça voo ao cair do crepúsculo.',
        },
        source: {
          en: 'Philosophy of Right, preface',
          pt: 'Filosofia do Direito, prefácio',
        },
      },
      {
        text: {
          en: 'What is rational is actual, and what is actual is rational.',
          pt: 'O que é racional é efetivo, e o que é efetivo é racional.',
        },
        source: {
          en: 'Philosophy of Right, preface',
          pt: 'Filosofia do Direito, prefácio',
        },
      },
    ],
    traits: {
      en: ['Systematic', 'Historical-minded', 'Obscure', 'Ambitious', 'Encyclopedic'],
      pt: ['Sistemático', 'Histórico', 'Obscuro', 'Ambicioso', 'Enciclopédico'],
    },
    facts: {
      en: [
        'He, Schelling and the poet Hölderlin were roommates at the Tübingen seminary — legend says they planted a "liberty tree" for the French Revolution.',
        'His Berlin lectures were so halting — coughing, searching through notes — that the struggle itself mesmerized students.',
        'He died in the cholera epidemic of 1831; his last lecture had been delivered days before.',
      ],
      pt: [
        'Ele, Schelling e o poeta Hölderlin foram colegas de quarto no seminário de Tübingen — diz a lenda que plantaram uma "árvore da liberdade" pela Revolução Francesa.',
        'Suas preleções em Berlim eram tão hesitantes — tossindo, remexendo anotações — que a própria luta hipnotizava os alunos.',
        'Morreu na epidemia de cólera de 1831; dera sua última aula dias antes.',
      ],
    },
    bust: {
      marble: '#e8e1d1',
      pedestal: '#5c3a6e',
      headWidth: 0.92,
      beard: 0,
      hair: 0.4,
    },
    figureImage: '/figures/hegel.webp',
  },
  {
    slug: 'kierkegaard',
    name: { en: 'Søren Kierkegaard', pt: 'Søren Kierkegaard' },
    years: {
      en: '1813–1855',
      pt: '1813–1855',
    },
    birthplace: {
      en: 'Copenhagen, Denmark',
      pt: 'Copenhague, Dinamarca',
    },
    schoolSlugs: ['existentialism'],
    influencedBy: ['socrates', 'hegel'],
    epithet: {
      en: 'The Father of Existentialism',
      pt: 'O Pai do Existencialismo',
    },
    biography: {
      en: [
        'Heir to a melancholy fortune and a father’s secret guilt, Kierkegaard spent his inheritance publishing, at his own expense and under a carnival of pseudonyms, one of the strangest bodies of work in philosophy: Either/Or, Fear and Trembling, The Concept of Anxiety, The Sickness unto Death. Against Hegel’s system he set a single question: what does it mean to exist — this I, here, now, before God?',
        'He broke his engagement to Regine Olsen, the wound around which much of the work turns, and spent his last years in open war with the Danish state church, collapsing in the street amid the polemic. His categories — anxiety, despair, the leap, the stages of life’s way — slept for half a century until Heidegger, Jaspers and Sartre made them the grammar of existentialism.',
      ],
      pt: [
        'Herdeiro de uma fortuna melancólica e da culpa secreta do pai, Kierkegaard gastou a herança publicando, por conta própria e sob um carnaval de pseudônimos, uma das obras mais estranhas da filosofia: Ou-Ou, Temor e Tremor, O Conceito de Angústia, A Doença para a Morte. Contra o sistema de Hegel ergueu uma única pergunta: o que significa existir — este eu, aqui, agora, diante de Deus?',
        'Rompeu o noivado com Regine Olsen, ferida em torno da qual gira boa parte da obra, e passou os últimos anos em guerra aberta com a igreja oficial dinamarquesa, desmaiando na rua em meio à polêmica. Suas categorias — angústia, desespero, o salto, os estágios do caminho da vida — dormiram meio século até que Heidegger, Jaspers e Sartre fizessem delas a gramática do existencialismo.',
      ],
    },
    contributions: {
      en: [
        'Founded existential philosophy: truth as subjectivity, existence before system',
        'The analysis of anxiety and despair as structures of the self',
        'The three stages of existence: aesthetic, ethical, religious',
        'The "leap of faith" and the critique of mass culture and official religion',
      ],
      pt: [
        'Fundou a filosofia existencial: a verdade como subjetividade, a existência antes do sistema',
        'A análise da angústia e do desespero como estruturas do eu',
        'Os três estágios da existência: estético, ético, religioso',
        'O "salto da fé" e a crítica à cultura de massa e à religião oficial',
      ],
    },
    quotes: [
      {
        text: {
          en: 'Life can only be understood backwards; but it must be lived forwards.',
          pt: 'A vida só pode ser compreendida olhando para trás; mas só pode ser vivida olhando para a frente.',
        },
        source: {
          en: 'Journals, 1843',
          pt: 'Diários, 1843',
        },
      },
      {
        text: {
          en: 'Anxiety is the dizziness of freedom.',
          pt: 'A angústia é a vertigem da liberdade.',
        },
        source: {
          en: 'The Concept of Anxiety',
          pt: 'O Conceito de Angústia',
        },
      },
      {
        text: {
          en: 'The greatest hazard of all, losing one’s self, can occur very quietly in the world, as if it were nothing at all.',
          pt: 'O maior de todos os perigos, perder o próprio eu, pode ocorrer no mundo em grande silêncio, como se não fosse nada.',
        },
        source: {
          en: 'The Sickness unto Death',
          pt: 'A Doença para a Morte',
        },
      },
    ],
    traits: {
      en: ['Melancholic', 'Ironic', 'Devout', 'Polemical', 'Inward'],
      pt: ['Melancólico', 'Irônico', 'Devoto', 'Polêmico', 'Interior'],
    },
    facts: {
      en: [
        'He published under pseudonyms like Johannes de Silentio and Anti-Climacus — and reviewed his own books under other names.',
        'His daily walks through Copenhagen were so famous that the satirical paper The Corsair caricatured his trouser legs.',
        'On his deathbed he refused communion from official priests, consistent with his attack on "Christendom" to the end.',
      ],
      pt: [
        'Publicava sob pseudônimos como Johannes de Silentio e Anti-Climacus — e resenhava os próprios livros sob outros nomes.',
        'Suas caminhadas diárias por Copenhague eram tão famosas que o jornal satírico O Corsário caricaturou as pernas de suas calças.',
        'No leito de morte, recusou a comunhão de padres oficiais, coerente até o fim com seu ataque à "cristandade".',
      ],
    },
    bust: {
      marble: '#ece5d5',
      pedestal: '#6e3a4a',
      headWidth: 0.86,
      beard: 0,
      hair: 0.6,
    },
    figureImage: '/figures/kierkegaard.webp',
  },
  {
    slug: 'sartre',
    name: { en: 'Jean-Paul Sartre', pt: 'Jean-Paul Sartre' },
    years: {
      en: '1905–1980',
      pt: '1905–1980',
    },
    birthplace: {
      en: 'Paris, France',
      pt: 'Paris, França',
    },
    schoolSlugs: ['existentialism'],
    influencedBy: ['hegel', 'kierkegaard', 'nietzsche', 'simone-de-beauvoir'],
    epithet: {
      en: 'The Philosopher of Freedom',
      pt: 'O Filósofo da Liberdade',
    },
    biography: {
      en: [
        'Philosopher, novelist, playwright and editor, Sartre made existentialism a public event. Being and Nothingness, written partly as a prisoner of war and published under the Occupation, argues that consciousness is nothing — no essence, no script — and therefore condemned to be free: we are what we make of ourselves, and bad faith is the lie of pretending otherwise.',
        'After the war he stood at the centre of French intellectual life: founder of Les Temps Modernes, partner of Simone de Beauvoir in a lifelong open relationship, militant on behalf of decolonization and the left. His plays put the doctrine on stage — "hell is other people" — and in 1964 he refused the Nobel Prize in Literature, unwilling to be "transformed into an institution".',
      ],
      pt: [
        'Filósofo, romancista, dramaturgo e editor, Sartre fez do existencialismo um acontecimento público. O Ser e o Nada, escrito em parte como prisioneiro de guerra e publicado sob a Ocupação, sustenta que a consciência é nada — sem essência, sem roteiro — e por isso condenada a ser livre: somos o que fazemos de nós mesmos, e a má-fé é a mentira de fingir o contrário.',
        'Depois da guerra, esteve no centro da vida intelectual francesa: fundador da Les Temps Modernes, parceiro de Simone de Beauvoir numa relação aberta de uma vida inteira, militante da descolonização e da esquerda. Suas peças puseram a doutrina no palco — "o inferno são os outros" — e em 1964 recusou o Prêmio Nobel de Literatura, sem disposição para ser "transformado em instituição".',
      ],
    },
    contributions: {
      en: [
        'Being and Nothingness: consciousness as freedom, bad faith as self-deception',
        '"Existence precedes essence" — the slogan that defined a movement',
        'Existential psychoanalysis and the analysis of the gaze of the Other',
        'The model of the engaged intellectual: literature as action',
      ],
      pt: [
        'O Ser e o Nada: a consciência como liberdade, a má-fé como autoengano',
        '"A existência precede a essência" — o lema que definiu um movimento',
        'A psicanálise existencial e a análise do olhar do Outro',
        'O modelo do intelectual engajado: a literatura como ação',
      ],
    },
    quotes: [
      {
        text: {
          en: 'Man is condemned to be free.',
          pt: 'O homem está condenado a ser livre.',
        },
        source: {
          en: 'Existentialism Is a Humanism',
          pt: 'O Existencialismo é um Humanismo',
        },
      },
      {
        text: {
          en: 'Hell is other people.',
          pt: 'O inferno são os outros.',
        },
        source: {
          en: 'No Exit',
          pt: 'Entre Quatro Paredes',
        },
      },
      {
        text: {
          en: 'We are our choices.',
          pt: 'Nós somos as nossas escolhas.',
        },
        source: {
          en: 'Attributed',
          pt: 'Atribuída',
        },
      },
    ],
    traits: {
      en: ['Engaged', 'Prolific', 'Provocative', 'Generous', 'Restless'],
      pt: ['Engajado', 'Prolífico', 'Provocador', 'Generoso', 'Inquieto'],
    },
    facts: {
      en: [
        'He is the only person to have voluntarily refused the Nobel Prize in Literature.',
        'As a POW in 1940 he staged a play for fellow prisoners — and lectured them on Heidegger.',
        'Some 50,000 people followed his funeral procession through Paris in 1980.',
      ],
      pt: [
        'É a única pessoa a ter recusado voluntariamente o Prêmio Nobel de Literatura.',
        'Prisioneiro de guerra em 1940, encenou uma peça para os companheiros — e deu palestras sobre Heidegger.',
        'Cerca de 50.000 pessoas acompanharam seu cortejo fúnebre por Paris em 1980.',
      ],
    },
    bust: {
      marble: '#e9e2d2',
      pedestal: '#6e3a4a',
      headWidth: 0.9,
      beard: 0,
      hair: 0.3,
    },
    figureImage: '/figures/sartre.webp',
  },
];
