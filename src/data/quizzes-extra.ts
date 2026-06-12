import type { QuizQuestion } from './types';

/**
 * Question pools for the philosophers added in the dashboard redesign.
 * Convention: options[0] is always the correct answer (shuffled at runtime).
 */
export const extraQuestions: QuizQuestion[] = [
  // ── Antisthenes ───────────────────────────────────────────────────────
  {
    id: 'antisthenes-1',
    philosopherSlug: 'antisthenes',
    prompt: {
      en: 'Which philosophical school did Antisthenes found?',
      pt: 'Qual escola filosófica Antístenes fundou?',
    },
    options: {
      en: ['The Cynic school', 'The Stoic school', 'The Epicurean school', 'The Skeptic school'],
      pt: ['A escola cínica', 'A escola estoica', 'A escola epicurista', 'A escola cética'],
    },
    explanation: {
      en: 'Antisthenes founded the Cynic school, teaching that virtue alone suffices for happiness and that everything else is a distraction.',
      pt: 'Antístenes fundou a escola cínica, ensinando que a virtude basta para a felicidade e que todo o resto é distração.',
    },
  },
  {
    id: 'antisthenes-2',
    philosopherSlug: 'antisthenes',
    prompt: {
      en: 'Where did Antisthenes teach after the death of Socrates?',
      pt: 'Onde Antístenes passou a ensinar após a morte de Sócrates?',
    },
    options: {
      en: ['At the Cynosarges gymnasium', 'At the Academy', 'At the Lyceum', 'At the Painted Stoa'],
      pt: ['No ginásio de Cinosarges', 'Na Academia', 'No Liceu', 'No Pórtico Pintado'],
    },
    explanation: {
      en: 'He taught at Cynosarges, a gymnasium open to those of mixed birth like himself — likely the origin of the name "Cynics".',
      pt: 'Ele ensinava no Cinosarges, um ginásio aberto a pessoas de nascimento misto como ele — provável origem do nome "cínicos".',
    },
  },
  {
    id: 'antisthenes-3',
    philosopherSlug: 'antisthenes',
    prompt: {
      en: 'Which famous Cynic was shaped by Antisthenes’ teaching?',
      pt: 'Qual cínico famoso foi formado pelo ensinamento de Antístenes?',
    },
    options: {
      en: ['Diogenes of Sinope', 'Zeno of Citium', 'Epicurus', 'Pyrrho of Elis'],
      pt: ['Diógenes de Sinope', 'Zenão de Cítio', 'Epicuro', 'Pirro de Élis'],
    },
    explanation: {
      en: 'Through his pupil Diogenes of Sinope, Antisthenes’ austerity became one of antiquity’s most provocative movements.',
      pt: 'Por meio de seu discípulo Diógenes de Sinope, a austeridade de Antístenes tornou-se um dos movimentos mais provocadores da Antiguidade.',
    },
  },

  // ── Aristippus ────────────────────────────────────────────────────────
  {
    id: 'aristippus-1',
    philosopherSlug: 'aristippus',
    prompt: {
      en: 'Which school did Aristippus found, and what was its highest good?',
      pt: 'Qual escola Aristipo fundou e qual era o seu bem supremo?',
    },
    options: {
      en: ['The Cyrenaic school — immediate pleasure', 'The Cynic school — austerity', 'The Megarian school — logic', 'The Eleatic school — being'],
      pt: ['A escola cirenaica — o prazer imediato', 'A escola cínica — a austeridade', 'A escola megárica — a lógica', 'A escola eleática — o ser'],
    },
    explanation: {
      en: 'Aristippus founded the Cyrenaic school, which held that the pleasure of the present moment is the highest good.',
      pt: 'Aristipo fundou a escola cirenaica, que sustentava que o prazer do momento presente é o bem supremo.',
    },
  },
  {
    id: 'aristippus-2',
    philosopherSlug: 'aristippus',
    prompt: {
      en: 'What did Aristippus mean by "I possess, I am not possessed"?',
      pt: 'O que Aristipo queria dizer com "possuo, não sou possuído"?',
    },
    options: {
      en: ['He enjoyed pleasures while remaining their master, never their slave', 'He owned many slaves in Cyrene', 'He renounced all property', 'He believed the soul possesses the body'],
      pt: ['Ele desfrutava dos prazeres permanecendo seu senhor, nunca seu escravo', 'Ele possuía muitos escravos em Cirene', 'Ele renunciou a toda propriedade', 'Ele acreditava que a alma possui o corpo'],
    },
    explanation: {
      en: 'For Aristippus, the art of life is to enjoy what is present without being enslaved by it — mastery, not abstinence.',
      pt: 'Para Aristipo, a arte de viver é desfrutar do presente sem ser escravizado por ele — domínio, não abstinência.',
    },
  },
  {
    id: 'aristippus-3',
    philosopherSlug: 'aristippus',
    prompt: {
      en: 'From which city did Aristippus come?',
      pt: 'De que cidade vinha Aristipo?',
    },
    options: {
      en: ['Cyrene, in North Africa', 'Athens, in Greece', 'Miletus, in Ionia', 'Syracuse, in Sicily'],
      pt: ['Cirene, no norte da África', 'Atenas, na Grécia', 'Mileto, na Jônia', 'Siracusa, na Sicília'],
    },
    explanation: {
      en: 'Aristippus came from the wealthy Greek colony of Cyrene, which gave the Cyrenaic school its name.',
      pt: 'Aristipo vinha da rica colônia grega de Cirene, que deu nome à escola cirenaica.',
    },
  },

  // ── Plotinus ──────────────────────────────────────────────────────────
  {
    id: 'plotinus-1',
    philosopherSlug: 'plotinus',
    prompt: {
      en: 'What is the name of the ultimate principle in Plotinus’ philosophy?',
      pt: 'Qual é o nome do princípio supremo na filosofia de Plotino?',
    },
    options: {
      en: ['The One', 'The Demiurge', 'The Unmoved Mover', 'The Logos'],
      pt: ['O Uno', 'O Demiurgo', 'O Motor Imóvel', 'O Logos'],
    },
    explanation: {
      en: 'For Plotinus all reality emanates from the One — an ineffable source beyond being from which Intellect and Soul proceed.',
      pt: 'Para Plotino, toda a realidade emana do Uno — uma fonte inefável além do ser, da qual procedem o Intelecto e a Alma.',
    },
  },
  {
    id: 'plotinus-2',
    philosopherSlug: 'plotinus',
    prompt: {
      en: 'Which movement did Plotinus found?',
      pt: 'Qual movimento Plotino fundou?',
    },
    options: {
      en: ['Neoplatonism', 'Stoicism', 'Scholasticism', 'Epicureanism'],
      pt: ['O neoplatonismo', 'O estoicismo', 'A escolástica', 'O epicurismo'],
    },
    explanation: {
      en: 'Plotinus reinterpreted Plato into a grand mystical system, founding what we now call Neoplatonism.',
      pt: 'Plotino reinterpretou Platão em um grande sistema místico, fundando o que hoje chamamos de neoplatonismo.',
    },
  },
  {
    id: 'plotinus-3',
    philosopherSlug: 'plotinus',
    prompt: {
      en: 'What is the title of the collection of Plotinus’ writings, organized by his student Porphyry?',
      pt: 'Qual é o título da coleção de escritos de Plotino, organizada por seu discípulo Porfírio?',
    },
    options: {
      en: ['The Enneads', 'The Dialogues', 'The Meditations', 'The Organon'],
      pt: ['As Enéadas', 'Os Diálogos', 'As Meditações', 'O Órganon'],
    },
    explanation: {
      en: 'Porphyry arranged his master’s treatises into six groups of nine — the Enneads, from the Greek for "nine".',
      pt: 'Porfírio organizou os tratados do mestre em seis grupos de nove — as Enéadas, do grego para "nove".',
    },
  },

  // ── Hypatia ───────────────────────────────────────────────────────────
  {
    id: 'hypatia-1',
    philosopherSlug: 'hypatia',
    prompt: {
      en: 'In which city did Hypatia teach philosophy, mathematics and astronomy?',
      pt: 'Em que cidade Hipátia ensinava filosofia, matemática e astronomia?',
    },
    options: {
      en: ['Alexandria', 'Athens', 'Rome', 'Constantinople'],
      pt: ['Alexandria', 'Atenas', 'Roma', 'Constantinopla'],
    },
    explanation: {
      en: 'Hypatia led the Neoplatonic school of Alexandria, drawing students from across the Mediterranean.',
      pt: 'Hipátia liderava a escola neoplatônica de Alexandria, atraindo alunos de todo o Mediterrâneo.',
    },
  },
  {
    id: 'hypatia-2',
    philosopherSlug: 'hypatia',
    prompt: {
      en: 'Which scientific instruments is Hypatia credited with teaching her students to build?',
      pt: 'Quais instrumentos científicos Hipátia teria ensinado seus alunos a construir?',
    },
    options: {
      en: ['Astrolabes and hydrometers', 'Telescopes and microscopes', 'Compasses and sextants', 'Sundials and clepsydras only'],
      pt: ['Astrolábios e hidrômetros', 'Telescópios e microscópios', 'Bússolas e sextantes', 'Apenas relógios de sol e clepsidras'],
    },
    explanation: {
      en: 'Letters from her student Synesius ask her advice on constructing an astrolabe and a hydrometer.',
      pt: 'Cartas de seu aluno Sinésio pedem seu conselho sobre a construção de um astrolábio e de um hidrômetro.',
    },
  },
  {
    id: 'hypatia-3',
    philosopherSlug: 'hypatia',
    prompt: {
      en: 'How did Hypatia’s life end?',
      pt: 'Como terminou a vida de Hipátia?',
    },
    options: {
      en: ['She was murdered by a mob in 415 AD', 'She died peacefully in old age', 'She was exiled to Athens', 'She drowned in the Nile'],
      pt: ['Foi assassinada por uma turba em 415 d.C.', 'Morreu em paz na velhice', 'Foi exilada para Atenas', 'Afogou-se no Nilo'],
    },
    explanation: {
      en: 'Hypatia was killed by a Christian mob in 415 AD — her death became a symbol of the decline of classical learning.',
      pt: 'Hipátia foi morta por uma turba cristã em 415 d.C. — sua morte tornou-se símbolo do declínio do saber clássico.',
    },
  },

  // ── Theophrastus ──────────────────────────────────────────────────────
  {
    id: 'theophrastus-1',
    philosopherSlug: 'theophrastus',
    prompt: {
      en: 'Which school did Theophrastus lead after Aristotle?',
      pt: 'Qual escola Teofrasto liderou depois de Aristóteles?',
    },
    options: {
      en: ['The Lyceum', 'The Academy', 'The Garden', 'The Painted Stoa'],
      pt: ['O Liceu', 'A Academia', 'O Jardim', 'O Pórtico Pintado'],
    },
    explanation: {
      en: 'Theophrastus succeeded Aristotle as head of the Lyceum and led it for about 36 years.',
      pt: 'Teofrasto sucedeu Aristóteles na direção do Liceu e o liderou por cerca de 36 anos.',
    },
  },
  {
    id: 'theophrastus-2',
    philosopherSlug: 'theophrastus',
    prompt: {
      en: 'Why is Theophrastus called the "father of botany"?',
      pt: 'Por que Teofrasto é chamado de "pai da botânica"?',
    },
    options: {
      en: ['His works on plants classified hundreds of species systematically', 'He planted the first botanical garden in Rome', 'He discovered photosynthesis', 'He wrote poems about flowers'],
      pt: ['Suas obras sobre plantas classificaram centenas de espécies sistematicamente', 'Ele plantou o primeiro jardim botânico em Roma', 'Ele descobriu a fotossíntese', 'Ele escreveu poemas sobre flores'],
    },
    explanation: {
      en: 'His "Enquiry into Plants" and "On the Causes of Plants" founded botany as a systematic science.',
      pt: 'Suas obras "História das Plantas" e "Sobre as Causas das Plantas" fundaram a botânica como ciência sistemática.',
    },
  },
  {
    id: 'theophrastus-3',
    philosopherSlug: 'theophrastus',
    prompt: {
      en: 'What is Theophrastus’ book "Characters" about?',
      pt: 'Sobre o que é o livro "Os Caracteres" de Teofrasto?',
    },
    options: {
      en: ['Thirty witty sketches of human personality types', 'The letters of the Greek alphabet', 'The heroes of the Trojan War', 'The constitutions of Greek cities'],
      pt: ['Trinta retratos espirituosos de tipos humanos', 'As letras do alfabeto grego', 'Os heróis da Guerra de Troia', 'As constituições das cidades gregas'],
    },
    explanation: {
      en: '"Characters" sketches types like the Flatterer and the Boor — a founding work of the study of personality.',
      pt: '"Os Caracteres" retrata tipos como o Bajulador e o Grosseiro — obra fundadora do estudo da personalidade.',
    },
  },

  // ── Averroes ──────────────────────────────────────────────────────────
  {
    id: 'averroes-1',
    philosopherSlug: 'averroes',
    prompt: {
      en: 'What earned Averroes the medieval title "The Commentator"?',
      pt: 'O que rendeu a Averróis o título medieval de "O Comentador"?',
    },
    options: {
      en: ['His exhaustive commentaries on Aristotle', 'His commentary on the Quran', 'His commentaries on Roman law', 'His glosses on Plato’s Republic'],
      pt: ['Seus comentários exaustivos sobre Aristóteles', 'Seu comentário sobre o Alcorão', 'Seus comentários sobre o direito romano', 'Suas glosas sobre a República de Platão'],
    },
    explanation: {
      en: 'Averroes wrote short, middle and long commentaries on nearly all of Aristotle — for medieval Europe he was simply "the Commentator".',
      pt: 'Averróis escreveu comentários curtos, médios e longos sobre quase todo Aristóteles — para a Europa medieval era simplesmente "o Comentador".',
    },
  },
  {
    id: 'averroes-2',
    philosopherSlug: 'averroes',
    prompt: {
      en: 'In which city of al-Andalus was Averroes born?',
      pt: 'Em que cidade de al-Andalus nasceu Averróis?',
    },
    options: {
      en: ['Córdoba', 'Granada', 'Seville', 'Toledo'],
      pt: ['Córdoba', 'Granada', 'Sevilha', 'Toledo'],
    },
    explanation: {
      en: 'Averroes (Ibn Rushd) was born in Córdoba in 1126, into a distinguished family of jurists.',
      pt: 'Averróis (Ibn Rushd) nasceu em Córdoba em 1126, numa distinta família de juristas.',
    },
  },
  {
    id: 'averroes-3',
    philosopherSlug: 'averroes',
    prompt: {
      en: 'What did Averroes argue in "The Decisive Treatise"?',
      pt: 'O que Averróis defendeu no "Tratado Decisivo"?',
    },
    options: {
      en: ['That philosophy and religion both lead to truth and do not conflict', 'That philosophy should be banned', 'That religion is irrational', 'That only mystics reach the truth'],
      pt: ['Que filosofia e religião conduzem ambas à verdade e não se contradizem', 'Que a filosofia deveria ser proibida', 'Que a religião é irracional', 'Que apenas os místicos alcançam a verdade'],
    },
    explanation: {
      en: 'The Decisive Treatise defends the harmony of reason and revelation — philosophy is even a religious duty for those capable of it.',
      pt: 'O Tratado Decisivo defende a harmonia entre razão e revelação — a filosofia é até um dever religioso para os capazes dela.',
    },
  },

  // ── Zeno of Citium ────────────────────────────────────────────────────
  {
    id: 'zeno-of-citium-1',
    philosopherSlug: 'zeno-of-citium',
    prompt: {
      en: 'Where did Zeno of Citium teach, giving Stoicism its name?',
      pt: 'Onde Zenão de Cítio ensinava, dando nome ao estoicismo?',
    },
    options: {
      en: ['At the Painted Stoa (Stoa Poikile) in Athens', 'At the Lyceum gymnasium', 'In the gardens of Epicurus', 'At the Academy of Plato'],
      pt: ['No Pórtico Pintado (Stoa Poikile) de Atenas', 'No ginásio do Liceu', 'Nos jardins de Epicuro', 'Na Academia de Platão'],
    },
    explanation: {
      en: 'Zeno lectured at the Stoa Poikile, the painted porch of the Athenian agora — his followers became "those of the Stoa".',
      pt: 'Zenão lecionava na Stoa Poikile, o pórtico pintado da ágora ateniense — seus seguidores tornaram-se "os do Pórtico".',
    },
  },
  {
    id: 'zeno-of-citium-2',
    philosopherSlug: 'zeno-of-citium',
    prompt: {
      en: 'What event brought Zeno to philosophy, according to tradition?',
      pt: 'Que evento levou Zenão à filosofia, segundo a tradição?',
    },
    options: {
      en: ['A shipwreck that cost him his cargo of purple dye', 'A dream sent by Apollo', 'The death of his father', 'Exile from his native city'],
      pt: ['Um naufrágio em que perdeu sua carga de púrpura', 'Um sonho enviado por Apolo', 'A morte de seu pai', 'O exílio de sua cidade natal'],
    },
    explanation: {
      en: 'Shipwrecked near Athens, the merchant Zeno wandered into a bookshop, read about Socrates and asked where such men could be found.',
      pt: 'Náufrago perto de Atenas, o mercador Zenão entrou numa livraria, leu sobre Sócrates e perguntou onde se encontravam homens assim.',
    },
  },
  {
    id: 'zeno-of-citium-3',
    philosopherSlug: 'zeno-of-citium',
    prompt: {
      en: 'What was the goal of life according to Zeno?',
      pt: 'Qual era a finalidade da vida segundo Zenão?',
    },
    options: {
      en: ['Living in agreement with nature', 'Maximizing pleasure', 'Accumulating honors', 'Withdrawing from politics'],
      pt: ['Viver de acordo com a natureza', 'Maximizar o prazer', 'Acumular honrarias', 'Retirar-se da política'],
    },
    explanation: {
      en: 'Zeno defined the telos as "living in agreement with nature" — rational life in harmony with the cosmic order.',
      pt: 'Zenão definiu o telos como "viver de acordo com a natureza" — a vida racional em harmonia com a ordem cósmica.',
    },
  },

  // ── Epictetus ─────────────────────────────────────────────────────────
  {
    id: 'epictetus-1',
    philosopherSlug: 'epictetus',
    prompt: {
      en: 'What was Epictetus’ social condition before becoming a philosopher?',
      pt: 'Qual era a condição social de Epicteto antes de se tornar filósofo?',
    },
    options: {
      en: ['He was a slave in Rome', 'He was a Roman senator', 'He was a wealthy merchant', 'He was a soldier'],
      pt: ['Era um escravo em Roma', 'Era um senador romano', 'Era um rico mercador', 'Era um soldado'],
    },
    explanation: {
      en: 'Epictetus was born a slave and served in Nero’s court before gaining freedom and teaching philosophy.',
      pt: 'Epicteto nasceu escravo e serviu na corte de Nero antes de conquistar a liberdade e ensinar filosofia.',
    },
  },
  {
    id: 'epictetus-2',
    philosopherSlug: 'epictetus',
    prompt: {
      en: 'What is the central distinction of Epictetus’ teaching?',
      pt: 'Qual é a distinção central do ensinamento de Epicteto?',
    },
    options: {
      en: ['Between what is up to us and what is not', 'Between body and soul', 'Between theory and practice', 'Between pleasure and pain'],
      pt: ['Entre o que depende de nós e o que não depende', 'Entre corpo e alma', 'Entre teoria e prática', 'Entre prazer e dor'],
    },
    explanation: {
      en: 'The Enchiridion opens with it: some things are up to us (judgments, desires), others are not — confusing them breeds misery.',
      pt: 'O Encheirídion abre com ela: algumas coisas dependem de nós (juízos, desejos), outras não — confundi-las gera infelicidade.',
    },
  },
  {
    id: 'epictetus-3',
    philosopherSlug: 'epictetus',
    prompt: {
      en: 'Who recorded Epictetus’ lectures, since he wrote nothing himself?',
      pt: 'Quem registrou as aulas de Epicteto, já que ele mesmo nada escreveu?',
    },
    options: {
      en: ['His student Arrian', 'His friend Seneca', 'The emperor Hadrian', 'His master Musonius Rufus'],
      pt: ['Seu aluno Arriano', 'Seu amigo Sêneca', 'O imperador Adriano', 'Seu mestre Musônio Rufo'],
    },
    explanation: {
      en: 'Arrian transcribed the Discourses and distilled the Enchiridion ("Handbook") from his master’s lessons.',
      pt: 'Arriano transcreveu as Diatribes e destilou das lições do mestre o Encheirídion ("Manual").',
    },
  },

  // ── Spinoza ───────────────────────────────────────────────────────────
  {
    id: 'spinoza-1',
    philosopherSlug: 'spinoza',
    prompt: {
      en: 'What does "Deus sive Natura" (God, or Nature) mean in Spinoza’s philosophy?',
      pt: 'O que significa "Deus sive Natura" (Deus, ou seja, a Natureza) na filosofia de Spinoza?',
    },
    options: {
      en: ['God and Nature are one and the same substance', 'God created Nature and then withdrew', 'Nature is an illusion of God', 'God is a being outside the universe'],
      pt: ['Deus e a Natureza são uma única e mesma substância', 'Deus criou a Natureza e depois se retirou', 'A Natureza é uma ilusão de Deus', 'Deus é um ser fora do universo'],
    },
    explanation: {
      en: 'Spinoza identifies God with Nature: a single infinite substance of which everything is a mode — a view condemned as heresy in his time.',
      pt: 'Spinoza identifica Deus com a Natureza: uma única substância infinita da qual tudo é modo — visão condenada como heresia em seu tempo.',
    },
  },
  {
    id: 'spinoza-2',
    philosopherSlug: 'spinoza',
    prompt: {
      en: 'In what geometric style is Spinoza’s "Ethics" written?',
      pt: 'Em que estilo geométrico está escrita a "Ética" de Spinoza?',
    },
    options: {
      en: ['Definitions, axioms and demonstrated propositions, like Euclid', 'Platonic dialogues', 'Aphorisms and fragments', 'Letters to a disciple'],
      pt: ['Definições, axiomas e proposições demonstradas, como Euclides', 'Diálogos platônicos', 'Aforismos e fragmentos', 'Cartas a um discípulo'],
    },
    explanation: {
      en: 'The Ethics is "demonstrated in geometrical order" — each proposition derived from definitions and axioms like a theorem.',
      pt: 'A Ética é "demonstrada em ordem geométrica" — cada proposição derivada de definições e axiomas como um teorema.',
    },
  },
  {
    id: 'spinoza-3',
    philosopherSlug: 'spinoza',
    prompt: {
      en: 'How did Spinoza earn his living after being excommunicated from the Jewish community of Amsterdam?',
      pt: 'Como Spinoza ganhava a vida depois de excomungado da comunidade judaica de Amsterdã?',
    },
    options: {
      en: ['Grinding optical lenses', 'Teaching at a university', 'Trading in spices', 'Painting portraits'],
      pt: ['Polindo lentes ópticas', 'Lecionando numa universidade', 'Comerciando especiarias', 'Pintando retratos'],
    },
    explanation: {
      en: 'Spinoza lived modestly as a lens grinder, declining a professorship at Heidelberg to keep his freedom of thought.',
      pt: 'Spinoza viveu modestamente como polidor de lentes e recusou uma cátedra em Heidelberg para manter sua liberdade de pensamento.',
    },
  },

  // ── Leibniz ───────────────────────────────────────────────────────────
  {
    id: 'leibniz-1',
    philosopherSlug: 'leibniz',
    prompt: {
      en: 'What are "monads" in Leibniz’s metaphysics?',
      pt: 'O que são as "mônadas" na metafísica de Leibniz?',
    },
    options: {
      en: ['Simple, windowless substances that mirror the whole universe', 'Atoms of matter', 'Mathematical points in space', 'Angels that move the planets'],
      pt: ['Substâncias simples, sem janelas, que espelham o universo inteiro', 'Átomos de matéria', 'Pontos matemáticos no espaço', 'Anjos que movem os planetas'],
    },
    explanation: {
      en: 'Monads are the simple substances composing reality — each "windowless", unfolding its perceptions in pre-established harmony.',
      pt: 'As mônadas são as substâncias simples que compõem a realidade — cada uma "sem janelas", desdobrando suas percepções em harmonia preestabelecida.',
    },
  },
  {
    id: 'leibniz-2',
    philosopherSlug: 'leibniz',
    prompt: {
      en: 'Which mathematical tool did Leibniz invent independently of Newton?',
      pt: 'Que ferramenta matemática Leibniz inventou independentemente de Newton?',
    },
    options: {
      en: ['The infinitesimal calculus', 'Analytic geometry', 'Probability theory', 'Set theory'],
      pt: ['O cálculo infinitesimal', 'A geometria analítica', 'A teoria das probabilidades', 'A teoria dos conjuntos'],
    },
    explanation: {
      en: 'Leibniz developed calculus independently — and the notation we still use (∫, dx) is his.',
      pt: 'Leibniz desenvolveu o cálculo de forma independente — e a notação que ainda usamos (∫, dx) é dele.',
    },
  },
  {
    id: 'leibniz-3',
    philosopherSlug: 'leibniz',
    prompt: {
      en: 'What famous (and often mocked) thesis did Leibniz defend in his Theodicy?',
      pt: 'Que tese famosa (e muito satirizada) Leibniz defendeu em sua Teodiceia?',
    },
    options: {
      en: ['That we live in the best of all possible worlds', 'That evil does not exist', 'That God plays dice with the universe', 'That history repeats eternally'],
      pt: ['Que vivemos no melhor dos mundos possíveis', 'Que o mal não existe', 'Que Deus joga dados com o universo', 'Que a história se repete eternamente'],
    },
    explanation: {
      en: 'God, choosing among infinite possible worlds, created the best one — the thesis Voltaire satirized in Candide.',
      pt: 'Deus, escolhendo entre infinitos mundos possíveis, criou o melhor — tese satirizada por Voltaire no Cândido.',
    },
  },

  // ── Fichte ────────────────────────────────────────────────────────────
  {
    id: 'fichte-1',
    philosopherSlug: 'fichte',
    prompt: {
      en: 'What is the first principle of Fichte’s Wissenschaftslehre (Doctrine of Science)?',
      pt: 'Qual é o primeiro princípio da Doutrina da Ciência (Wissenschaftslehre) de Fichte?',
    },
    options: {
      en: ['The I posits itself', 'Matter precedes spirit', 'God is dead', 'Existence precedes essence'],
      pt: ['O Eu põe a si mesmo', 'A matéria precede o espírito', 'Deus está morto', 'A existência precede a essência'],
    },
    explanation: {
      en: 'Fichte grounds all knowledge in the self-positing activity of the I — consciousness producing itself and its world.',
      pt: 'Fichte fundamenta todo o conhecimento na atividade do Eu que põe a si mesmo — a consciência produzindo a si e ao seu mundo.',
    },
  },
  {
    id: 'fichte-2',
    philosopherSlug: 'fichte',
    prompt: {
      en: 'Whose critical philosophy did Fichte set out to complete?',
      pt: 'A filosofia crítica de quem Fichte se propôs a completar?',
    },
    options: {
      en: ['Kant’s', 'Hegel’s', 'Descartes’', 'Spinoza’s'],
      pt: ['A de Kant', 'A de Hegel', 'A de Descartes', 'A de Spinoza'],
    },
    explanation: {
      en: 'Fichte saw himself as Kant’s true heir, deriving the whole system from a single principle Kant had left implicit.',
      pt: 'Fichte via-se como o verdadeiro herdeiro de Kant, derivando todo o sistema de um único princípio que Kant deixara implícito.',
    },
  },
  {
    id: 'fichte-3',
    philosopherSlug: 'fichte',
    prompt: {
      en: 'Which series of speeches made Fichte a key figure of German national consciousness?',
      pt: 'Que série de discursos fez de Fichte uma figura-chave da consciência nacional alemã?',
    },
    options: {
      en: ['Addresses to the German Nation', 'Letters on Aesthetic Education', 'The Communist Manifesto', 'Discourse on Method'],
      pt: ['Os Discursos à Nação Alemã', 'As Cartas sobre a Educação Estética', 'O Manifesto Comunista', 'O Discurso do Método'],
    },
    explanation: {
      en: 'Delivered in French-occupied Berlin (1807–08), the Addresses called for moral and educational renewal of the nation.',
      pt: 'Proferidos na Berlim ocupada pelos franceses (1807–08), os Discursos conclamavam à renovação moral e educacional da nação.',
    },
  },

  // ── Hegel ─────────────────────────────────────────────────────────────
  {
    id: 'hegel-1',
    philosopherSlug: 'hegel',
    prompt: {
      en: 'What is the engine of historical development in Hegel’s philosophy?',
      pt: 'Qual é o motor do desenvolvimento histórico na filosofia de Hegel?',
    },
    options: {
      en: ['The dialectic — contradictions resolved into higher unities', 'Random chance', 'Divine miracles', 'Economic cycles alone'],
      pt: ['A dialética — contradições resolvidas em unidades superiores', 'O puro acaso', 'Milagres divinos', 'Apenas ciclos econômicos'],
    },
    explanation: {
      en: 'For Hegel, Spirit advances through contradiction and its overcoming (Aufhebung) — history is reason unfolding.',
      pt: 'Para Hegel, o Espírito avança pela contradição e sua superação (Aufhebung) — a história é a razão se desdobrando.',
    },
  },
  {
    id: 'hegel-2',
    philosopherSlug: 'hegel',
    prompt: {
      en: 'Which 1807 work did Hegel famously finish as Napoleon entered Jena?',
      pt: 'Que obra de 1807 Hegel terminou, segundo a tradição, enquanto Napoleão entrava em Jena?',
    },
    options: {
      en: ['The Phenomenology of Spirit', 'The Science of Logic', 'The Philosophy of Right', 'The Encyclopedia'],
      pt: ['A Fenomenologia do Espírito', 'A Ciência da Lógica', 'A Filosofia do Direito', 'A Enciclopédia'],
    },
    explanation: {
      en: 'Hegel completed the Phenomenology as the battle of Jena raged — and called Napoleon "the world-soul on horseback".',
      pt: 'Hegel concluiu a Fenomenologia durante a batalha de Jena — e chamou Napoleão de "a alma do mundo a cavalo".',
    },
  },
  {
    id: 'hegel-3',
    philosopherSlug: 'hegel',
    prompt: {
      en: 'What does Hegel’s master–slave dialectic describe?',
      pt: 'O que descreve a dialética do senhor e do escravo de Hegel?',
    },
    options: {
      en: ['The struggle for recognition between two self-consciousnesses', 'The economics of ancient slavery', 'The relation between God and humanity', 'The duties of feudal lords'],
      pt: ['A luta por reconhecimento entre duas autoconsciências', 'A economia da escravidão antiga', 'A relação entre Deus e a humanidade', 'Os deveres dos senhores feudais'],
    },
    explanation: {
      en: 'In the Phenomenology, self-consciousness wins itself only through recognition — and the slave, through work, surpasses the master.',
      pt: 'Na Fenomenologia, a autoconsciência só se conquista pelo reconhecimento — e o escravo, pelo trabalho, supera o senhor.',
    },
  },

  // ── Kierkegaard ───────────────────────────────────────────────────────
  {
    id: 'kierkegaard-1',
    philosopherSlug: 'kierkegaard',
    prompt: {
      en: 'Why is Kierkegaard called the "father of existentialism"?',
      pt: 'Por que Kierkegaard é chamado de "pai do existencialismo"?',
    },
    options: {
      en: ['He made the existing individual, with their anguish and choices, the center of philosophy', 'He coined the word "existentialism"', 'He founded a school in Paris', 'He was the first atheist philosopher'],
      pt: ['Ele fez do indivíduo existente, com sua angústia e escolhas, o centro da filosofia', 'Ele cunhou a palavra "existencialismo"', 'Ele fundou uma escola em Paris', 'Ele foi o primeiro filósofo ateu'],
    },
    explanation: {
      en: 'Against Hegel’s system, Kierkegaard insisted that truth is lived by a single individual who must choose — the seed of existentialism.',
      pt: 'Contra o sistema de Hegel, Kierkegaard insistiu que a verdade é vivida por um indivíduo singular que precisa escolher — a semente do existencialismo.',
    },
  },
  {
    id: 'kierkegaard-2',
    philosopherSlug: 'kierkegaard',
    prompt: {
      en: 'What does Kierkegaard examine through the story of Abraham in "Fear and Trembling"?',
      pt: 'O que Kierkegaard examina por meio da história de Abraão em "Temor e Tremor"?',
    },
    options: {
      en: ['The leap of faith beyond ethics and reason', 'The history of the Jewish people', 'The morality of sacrifice in war', 'The duties of fatherhood'],
      pt: ['O salto da fé para além da ética e da razão', 'A história do povo judeu', 'A moralidade do sacrifício na guerra', 'Os deveres da paternidade'],
    },
    explanation: {
      en: 'Abraham’s readiness to sacrifice Isaac dramatizes the "teleological suspension of the ethical" — faith as a leap reason cannot justify.',
      pt: 'A disposição de Abraão a sacrificar Isaac dramatiza a "suspensão teleológica da ética" — a fé como salto que a razão não justifica.',
    },
  },
  {
    id: 'kierkegaard-3',
    philosopherSlug: 'kierkegaard',
    prompt: {
      en: 'What are the three stages on life’s way according to Kierkegaard?',
      pt: 'Quais são os três estágios da existência segundo Kierkegaard?',
    },
    options: {
      en: ['Aesthetic, ethical and religious', 'Childhood, youth and maturity', 'Thesis, antithesis and synthesis', 'Body, soul and spirit'],
      pt: ['Estético, ético e religioso', 'Infância, juventude e maturidade', 'Tese, antítese e síntese', 'Corpo, alma e espírito'],
    },
    explanation: {
      en: 'The aesthete pursues pleasure, the ethicist duty, and the religious individual stands alone before God.',
      pt: 'O esteta busca o prazer, o ético o dever, e o indivíduo religioso está só diante de Deus.',
    },
  },

  // ── Sartre ────────────────────────────────────────────────────────────
  {
    id: 'sartre-1',
    philosopherSlug: 'sartre',
    prompt: {
      en: 'What does Sartre’s formula "existence precedes essence" mean?',
      pt: 'O que significa a fórmula de Sartre "a existência precede a essência"?',
    },
    options: {
      en: ['We first exist, then define ourselves through our choices', 'Our nature is fixed at birth', 'The soul exists before the body', 'Essences are eternal ideas'],
      pt: ['Primeiro existimos, depois nos definimos por nossas escolhas', 'Nossa natureza é fixada no nascimento', 'A alma existe antes do corpo', 'As essências são ideias eternas'],
    },
    explanation: {
      en: 'There is no pre-given human nature: we are "condemned to be free" and become what we make of ourselves.',
      pt: 'Não há natureza humana pré-dada: estamos "condenados a ser livres" e nos tornamos o que fazemos de nós mesmos.',
    },
  },
  {
    id: 'sartre-2',
    philosopherSlug: 'sartre',
    prompt: {
      en: 'What is "bad faith" (mauvaise foi) in Sartre’s philosophy?',
      pt: 'O que é a "má-fé" (mauvaise foi) na filosofia de Sartre?',
    },
    options: {
      en: ['Lying to oneself to flee the anguish of freedom', 'Breaking a legal contract', 'Religious hypocrisy only', 'Doubting the existence of others'],
      pt: ['Mentir para si mesmo para fugir da angústia da liberdade', 'Quebrar um contrato legal', 'Apenas a hipocrisia religiosa', 'Duvidar da existência dos outros'],
    },
    explanation: {
      en: 'In bad faith we pretend to be mere things ("I had no choice") to escape responsibility for our freedom.',
      pt: 'Na má-fé fingimos ser meras coisas ("eu não tinha escolha") para escapar da responsabilidade pela nossa liberdade.',
    },
  },
  {
    id: 'sartre-3',
    philosopherSlug: 'sartre',
    prompt: {
      en: 'Why did Sartre make history with the 1964 Nobel Prize in Literature?',
      pt: 'Por que Sartre fez história com o Prêmio Nobel de Literatura de 1964?',
    },
    options: {
      en: ['He refused it, not wanting to be "transformed into an institution"', 'He was the youngest winner ever', 'He donated the money to the Resistance', 'He shared it with Simone de Beauvoir'],
      pt: ['Ele o recusou, não querendo ser "transformado em instituição"', 'Foi o vencedor mais jovem da história', 'Doou o dinheiro à Resistência', 'Dividiu-o com Simone de Beauvoir'],
    },
    explanation: {
      en: 'Sartre declined the Nobel Prize — a writer, he said, must not let himself be turned into an institution.',
      pt: 'Sartre recusou o Nobel — um escritor, dizia, não deve deixar-se transformar em instituição.',
    },
  },

  // ── Second wave: three more questions per redesign philosopher ───────
  {
    id: 'antisthenes-4',
    philosopherSlug: 'antisthenes',
    prompt: {
      en: 'What did Antisthenes consider sufficient for happiness?',
      pt: 'O que Antístenes considerava suficiente para a felicidade?',
    },
    options: {
      en: ['Virtue alone', 'Wealth and health', 'Honor among citizens', 'Pleasure in moderation'],
      pt: ['Apenas a virtude', 'Riqueza e saúde', 'A honra entre os cidadãos', 'O prazer com moderação'],
    },
    explanation: {
      en: 'His core teaching, taken from Socrates and radicalized: virtue is sufficient for happiness; all else is distraction.',
      pt: 'Seu ensinamento central, herdado de Sócrates e radicalizado: a virtude basta para a felicidade; o resto é distração.',
    },
  },
  {
    id: 'antisthenes-5',
    philosopherSlug: 'antisthenes',
    prompt: {
      en: 'What was Antisthenes’ relationship to Socrates?',
      pt: 'Qual era a relação de Antístenes com Sócrates?',
    },
    options: {
      en: ['A devoted disciple who walked miles daily to hear him', 'A bitter rival in the agora', 'His accuser at the trial', 'His teacher of rhetoric'],
      pt: ['Um discípulo devotado que caminhava quilômetros por dia para ouvi-lo', 'Um rival amargo na ágora', 'Seu acusador no julgamento', 'Seu professor de retórica'],
    },
    explanation: {
      en: 'Antisthenes walked from the Piraeus to Athens every day to hear Socrates, and was present at his death.',
      pt: 'Antístenes caminhava do Pireu a Atenas todos os dias para ouvir Sócrates, e esteve presente em sua morte.',
    },
  },
  {
    id: 'antisthenes-6',
    philosopherSlug: 'antisthenes',
    prompt: {
      en: 'Before following Socrates, with which famous teacher did Antisthenes study rhetoric?',
      pt: 'Antes de seguir Sócrates, com qual famoso mestre Antístenes estudou retórica?',
    },
    options: {
      en: ['Gorgias', 'Protagoras', 'Isocrates', 'Prodicus'],
      pt: ['Górgias', 'Protágoras', 'Isócrates', 'Pródico'],
    },
    explanation: {
      en: 'Antisthenes first studied under the sophist Gorgias before abandoning rhetoric for the Socratic life.',
      pt: 'Antístenes estudou primeiro com o sofista Górgias antes de abandonar a retórica pela vida socrática.',
    },
  },
  {
    id: 'aristippus-4',
    philosopherSlug: 'aristippus',
    prompt: {
      en: 'How did Aristippus differ from other followers of Socrates?',
      pt: 'Em que Aristipo diferia dos outros seguidores de Sócrates?',
    },
    options: {
      en: ['He charged fees for teaching and lived in luxury at courts', 'He refused to teach anyone', 'He wrote nothing at all', 'He rejected ethics entirely'],
      pt: ['Cobrava por suas aulas e vivia no luxo das cortes', 'Recusava-se a ensinar', 'Nada escreveu', 'Rejeitava a ética por completo'],
    },
    explanation: {
      en: 'Scandalously for a Socratic, Aristippus took payment and enjoyed the court of Dionysius of Syracuse — while claiming to remain free.',
      pt: 'Escandalosamente para um socrático, Aristipo cobrava por ensinar e frequentava a corte de Dionísio de Siracusa — dizendo permanecer livre.',
    },
  },
  {
    id: 'aristippus-5',
    philosopherSlug: 'aristippus',
    prompt: {
      en: 'What kind of pleasure did the Cyrenaics value most?',
      pt: 'Que tipo de prazer os cirenaicos mais valorizavam?',
    },
    options: {
      en: ['The bodily pleasure of the present moment', 'The memory of past pleasures', 'The anticipation of future joys', 'Purely intellectual contemplation'],
      pt: ['O prazer corporal do momento presente', 'A lembrança de prazeres passados', 'A expectativa de alegrias futuras', 'A contemplação puramente intelectual'],
    },
    explanation: {
      en: 'Unlike Epicurus later, the Cyrenaics prized the immediate, positive pleasure of the moment over tranquil absence of pain.',
      pt: 'Ao contrário de Epicuro depois, os cirenaicos prezavam o prazer imediato e positivo do momento, não a tranquila ausência de dor.',
    },
  },
  {
    id: 'aristippus-6',
    philosopherSlug: 'aristippus',
    prompt: {
      en: 'Who continued Aristippus’ school and shared his name?',
      pt: 'Quem continuou a escola de Aristipo e levava seu nome?',
    },
    options: {
      en: ['His grandson, taught by his daughter Arete', 'His brother', 'His slave, freed in his will', 'His rival from Athens'],
      pt: ['Seu neto, educado por sua filha Arete', 'Seu irmão', 'Seu escravo, liberto em testamento', 'Seu rival de Atenas'],
    },
    explanation: {
      en: 'His daughter Arete led the school and taught her son Aristippus "the Mother-taught", who systematized the doctrine.',
      pt: 'Sua filha Arete liderou a escola e educou o filho, Aristipo "o Ensinado-pela-Mãe", que sistematizou a doutrina.',
    },
  },
  {
    id: 'plotinus-4',
    philosopherSlug: 'plotinus',
    prompt: {
      en: 'What are the three primary realities (hypostases) in Plotinus’ system?',
      pt: 'Quais são as três realidades primárias (hipóstases) no sistema de Plotino?',
    },
    options: {
      en: ['The One, Intellect and Soul', 'Father, Son and Spirit', 'Matter, form and privation', 'Earth, sea and sky'],
      pt: ['O Uno, o Intelecto e a Alma', 'Pai, Filho e Espírito', 'Matéria, forma e privação', 'Terra, mar e céu'],
    },
    explanation: {
      en: 'Reality unfolds from the One into Intellect (Nous) and then Soul, each level an image of the one above.',
      pt: 'A realidade se desdobra do Uno no Intelecto (Nous) e depois na Alma, cada nível imagem do superior.',
    },
  },
  {
    id: 'plotinus-5',
    philosopherSlug: 'plotinus',
    prompt: {
      en: 'In which city did Plotinus teach for most of his career?',
      pt: 'Em que cidade Plotino ensinou durante a maior parte da carreira?',
    },
    options: {
      en: ['Rome', 'Alexandria', 'Athens', 'Antioch'],
      pt: ['Roma', 'Alexandria', 'Atenas', 'Antioquia'],
    },
    explanation: {
      en: 'After studying in Alexandria under Ammonius Saccas, Plotinus settled in Rome around 244 AD and taught there until his death.',
      pt: 'Depois de estudar em Alexandria com Amônio Sacas, Plotino estabeleceu-se em Roma por volta de 244 d.C. e lá ensinou até a morte.',
    },
  },
  {
    id: 'plotinus-6',
    philosopherSlug: 'plotinus',
    prompt: {
      en: 'What experience did Plotinus describe as the goal of his philosophy?',
      pt: 'Que experiência Plotino descrevia como a meta de sua filosofia?',
    },
    options: {
      en: ['Mystical union of the soul with the One', 'Political power in Rome', 'Mastery of rhetoric', 'Bodily immortality'],
      pt: ['A união mística da alma com o Uno', 'O poder político em Roma', 'O domínio da retórica', 'A imortalidade do corpo'],
    },
    explanation: {
      en: 'Porphyry reports that Plotinus attained union with the One several times — "the flight of the alone to the Alone".',
      pt: 'Porfírio relata que Plotino alcançou a união com o Uno várias vezes — "a fuga do só para o Só".',
    },
  },
  {
    id: 'hypatia-4',
    philosopherSlug: 'hypatia',
    prompt: {
      en: 'Who was Hypatia’s father, who trained her in mathematics?',
      pt: 'Quem era o pai de Hipátia, que a formou em matemática?',
    },
    options: {
      en: ['Theon of Alexandria', 'Euclid of Alexandria', 'Ptolemy', 'Eratosthenes'],
      pt: ['Téon de Alexandria', 'Euclides de Alexandria', 'Ptolomeu', 'Eratóstenes'],
    },
    explanation: {
      en: 'Theon, last attested member of the Alexandrian Museum, raised Hypatia in geometry and astronomy — she soon surpassed him.',
      pt: 'Téon, último membro atestado do Museu de Alexandria, criou Hipátia na geometria e na astronomia — ela logo o superou.',
    },
  },
  {
    id: 'hypatia-5',
    philosopherSlug: 'hypatia',
    prompt: {
      en: 'Which philosophical tradition did Hypatia teach?',
      pt: 'Que tradição filosófica Hipátia ensinava?',
    },
    options: {
      en: ['Neoplatonism', 'Epicureanism', 'Cynicism', 'Scholasticism'],
      pt: ['O neoplatonismo', 'O epicurismo', 'O cinismo', 'A escolástica'],
    },
    explanation: {
      en: 'Hypatia taught the Neoplatonism of Plotinus — the ascent of the soul through mathematics and contemplation.',
      pt: 'Hipátia ensinava o neoplatonismo de Plotino — a ascensão da alma pela matemática e pela contemplação.',
    },
  },
  {
    id: 'hypatia-6',
    philosopherSlug: 'hypatia',
    prompt: {
      en: 'Which mathematical works did Hypatia edit and comment on?',
      pt: 'Que obras matemáticas Hipátia editou e comentou?',
    },
    options: {
      en: ['Diophantus’ Arithmetica and Apollonius’ Conics', 'Newton’s Principia', 'Al-Khwarizmi’s Algebra', 'Archimedes’ palimpsest'],
      pt: ['A Aritmética de Diofanto e as Cônicas de Apolônio', 'O Principia de Newton', 'A Álgebra de al-Khwarizmi', 'O palimpsesto de Arquimedes'],
    },
    explanation: {
      en: 'Ancient sources credit her with commentaries on Diophantus and Apollonius — editorial work that helped those texts survive.',
      pt: 'Fontes antigas lhe atribuem comentários sobre Diofanto e Apolônio — trabalho editorial que ajudou esses textos a sobreviver.',
    },
  },
  {
    id: 'theophrastus-4',
    philosopherSlug: 'theophrastus',
    prompt: {
      en: 'Who gave Theophrastus his name, meaning "divine speaker"?',
      pt: 'Quem deu a Teofrasto seu nome, que significa "orador divino"?',
    },
    options: {
      en: ['Aristotle', 'Plato', 'His father', 'Alexander the Great'],
      pt: ['Aristóteles', 'Platão', 'Seu pai', 'Alexandre, o Grande'],
    },
    explanation: {
      en: 'Born Tyrtamus, he was nicknamed Theophrastos by Aristotle for the grace of his conversation.',
      pt: 'Nascido Tírtamo, recebeu de Aristóteles o apelido Teofrasto pela graça de sua conversação.',
    },
  },
  {
    id: 'theophrastus-5',
    philosopherSlug: 'theophrastus',
    prompt: {
      en: 'Roughly how many students attended Theophrastus’ lectures at the Lyceum, by ancient report?',
      pt: 'Quantos alunos, segundo relatos antigos, frequentavam as aulas de Teofrasto no Liceu?',
    },
    options: {
      en: ['About two thousand', 'About twenty', 'About one hundred', 'Only seven chosen disciples'],
      pt: ['Cerca de dois mil', 'Cerca de vinte', 'Cerca de cem', 'Apenas sete discípulos escolhidos'],
    },
    explanation: {
      en: 'Diogenes Laertius says some two thousand students heard him — the Lyceum at its peak of popularity.',
      pt: 'Diógenes Laércio diz que cerca de dois mil alunos o ouviam — o Liceu no auge de sua popularidade.',
    },
  },
  {
    id: 'theophrastus-6',
    philosopherSlug: 'theophrastus',
    prompt: {
      en: 'What did Aristotle leave to Theophrastus in his will?',
      pt: 'O que Aristóteles deixou a Teofrasto em testamento?',
    },
    options: {
      en: ['His library and the guardianship of his school', 'His house in Athens only', 'Nothing — they had quarreled', 'His fortune in gold'],
      pt: ['Sua biblioteca e a direção de sua escola', 'Apenas sua casa em Atenas', 'Nada — haviam brigado', 'Sua fortuna em ouro'],
    },
    explanation: {
      en: 'Aristotle entrusted Theophrastus with his manuscripts and his school — the greatest library of the ancient world to that date.',
      pt: 'Aristóteles confiou a Teofrasto seus manuscritos e sua escola — a maior biblioteca do mundo antigo até então.',
    },
  },
  {
    id: 'averroes-4',
    philosopherSlug: 'averroes',
    prompt: {
      en: 'Besides philosophy, in which professions did Averroes serve?',
      pt: 'Além da filosofia, em que profissões Averróis atuou?',
    },
    options: {
      en: ['Judge (qadi) and court physician', 'General and admiral', 'Architect and engineer', 'Merchant and banker'],
      pt: ['Juiz (cádi) e médico da corte', 'General e almirante', 'Arquiteto e engenheiro', 'Mercador e banqueiro'],
    },
    explanation: {
      en: 'Averroes was chief judge of Córdoba and physician to the Almohad caliph — philosophy was his calling beyond both.',
      pt: 'Averróis foi juiz-chefe de Córdoba e médico do califa almóada — a filosofia era sua vocação além de ambos.',
    },
  },
  {
    id: 'averroes-5',
    philosopherSlug: 'averroes',
    prompt: {
      en: 'Which great theologian did Averroes answer in "The Incoherence of the Incoherence"?',
      pt: 'A que grande teólogo Averróis respondeu na "Incoerência da Incoerência"?',
    },
    options: {
      en: ['Al-Ghazali', 'Avicenna', 'Thomas Aquinas', 'Maimonides'],
      pt: ['Al-Ghazali', 'Avicena', 'Tomás de Aquino', 'Maimônides'],
    },
    explanation: {
      en: 'Al-Ghazali had attacked the philosophers in "The Incoherence of the Philosophers"; Averroes answered point by point.',
      pt: 'Al-Ghazali atacara os filósofos na "Incoerência dos Filósofos"; Averróis respondeu ponto por ponto.',
    },
  },
  {
    id: 'averroes-6',
    philosopherSlug: 'averroes',
    prompt: {
      en: 'Where does Dante place Averroes in the Divine Comedy?',
      pt: 'Onde Dante coloca Averróis na Divina Comédia?',
    },
    options: {
      en: ['Among the virtuous non-Christians in Limbo', 'In the circle of heretics', 'In Paradise', 'At the gates of Purgatory'],
      pt: ['Entre os virtuosos não cristãos no Limbo', 'No círculo dos hereges', 'No Paraíso', 'Às portas do Purgatório'],
    },
    explanation: {
      en: 'Dante honors "Averroìs, che ’l gran comento feo" among the great souls of Limbo, beside Aristotle himself.',
      pt: 'Dante honra "Averróis, que fez o grande comentário" entre as grandes almas do Limbo, ao lado do próprio Aristóteles.',
    },
  },
  {
    id: 'zeno-of-citium-4',
    philosopherSlug: 'zeno-of-citium',
    prompt: {
      en: 'Into which three parts did Zeno divide philosophy?',
      pt: 'Em que três partes Zenão dividia a filosofia?',
    },
    options: {
      en: ['Logic, physics and ethics', 'Metaphysics, aesthetics and politics', 'Grammar, rhetoric and dialectic', 'Theory, practice and poetry'],
      pt: ['Lógica, física e ética', 'Metafísica, estética e política', 'Gramática, retórica e dialética', 'Teoria, prática e poesia'],
    },
    explanation: {
      en: 'The Stoic curriculum he founded compares philosophy to an orchard: logic the wall, physics the trees, ethics the fruit.',
      pt: 'O currículo estoico que ele fundou compara a filosofia a um pomar: a lógica é o muro, a física as árvores, a ética o fruto.',
    },
  },
  {
    id: 'zeno-of-citium-5',
    philosopherSlug: 'zeno-of-citium',
    prompt: {
      en: 'From which city did Zeno come?',
      pt: 'De que cidade vinha Zenão?',
    },
    options: {
      en: ['Citium, in Cyprus', 'Athens, in Attica', 'Elea, in Italy', 'Tarsus, in Cilicia'],
      pt: ['Cítio, no Chipre', 'Atenas, na Ática', 'Eleia, na Itália', 'Tarso, na Cilícia'],
    },
    explanation: {
      en: 'Zeno was a Phoenician merchant from Citium in Cyprus — Athens later honored the foreigner with a golden crown.',
      pt: 'Zenão era um mercador fenício de Cítio, no Chipre — Atenas depois honrou o estrangeiro com uma coroa de ouro.',
    },
  },
  {
    id: 'zeno-of-citium-6',
    philosopherSlug: 'zeno-of-citium',
    prompt: {
      en: 'With which Cynic philosopher did Zeno first study in Athens?',
      pt: 'Com que filósofo cínico Zenão estudou primeiro em Atenas?',
    },
    options: {
      en: ['Crates of Thebes', 'Diogenes of Sinope', 'Antisthenes', 'Menippus'],
      pt: ['Crates de Tebas', 'Diógenes de Sinope', 'Antístenes', 'Menipo'],
    },
    explanation: {
      en: 'Zeno apprenticed under Crates the Cynic — Stoicism kept the Cynic core of virtue while softening its shamelessness.',
      pt: 'Zenão foi aprendiz de Crates, o cínico — o estoicismo manteve o núcleo cínico da virtude, suavizando seu despudor.',
    },
  },
  {
    id: 'epictetus-4',
    philosopherSlug: 'epictetus',
    prompt: {
      en: 'Where did Epictetus found his school after philosophers were expelled from Rome?',
      pt: 'Onde Epicteto fundou sua escola depois que os filósofos foram expulsos de Roma?',
    },
    options: {
      en: ['Nicopolis, in Greece', 'Alexandria, in Egypt', 'Carthage, in Africa', 'Massilia, in Gaul'],
      pt: ['Nicópolis, na Grécia', 'Alexandria, no Egito', 'Cartago, na África', 'Massília, na Gália'],
    },
    explanation: {
      en: 'When Domitian banished philosophers from Rome (c. 93 AD), Epictetus moved to Nicopolis, where students flocked to him.',
      pt: 'Quando Domiciano baniu os filósofos de Roma (c. 93 d.C.), Epicteto mudou-se para Nicópolis, aonde afluíam os alunos.',
    },
  },
  {
    id: 'epictetus-5',
    philosopherSlug: 'epictetus',
    prompt: {
      en: 'Which emperor’s Meditations are steeped in Epictetus’ teaching?',
      pt: 'As Meditações de que imperador são impregnadas do ensinamento de Epicteto?',
    },
    options: {
      en: ['Marcus Aurelius', 'Nero', 'Augustus', 'Constantine'],
      pt: ['Marco Aurélio', 'Nero', 'Augusto', 'Constantino'],
    },
    explanation: {
      en: 'Marcus Aurelius thanks his teacher Rusticus for lending him the Discourses — Epictetus echoes throughout the Meditations.',
      pt: 'Marco Aurélio agradece ao mestre Rústico por lhe emprestar as Diatribes — Epicteto ecoa por todas as Meditações.',
    },
  },
  {
    id: 'epictetus-6',
    philosopherSlug: 'epictetus',
    prompt: {
      en: 'What does the title of Epictetus’ "Enchiridion" mean?',
      pt: 'O que significa o título do "Encheirídion" de Epicteto?',
    },
    options: {
      en: ['"Handbook" — something kept ready at hand', '"Meditations" — nightly reflections', '"Dialogues" — conversations', '"Letters" — correspondence'],
      pt: ['"Manual" — algo que se mantém à mão', '"Meditações" — reflexões noturnas', '"Diálogos" — conversas', '"Cartas" — correspondência'],
    },
    explanation: {
      en: 'Enchiridion means "ready at hand" — a small dagger of a book, made to be carried and used daily.',
      pt: 'Encheirídion significa "à mão" — um livro-punhal, feito para ser carregado e usado todos os dias.',
    },
  },
  {
    id: 'spinoza-4',
    philosopherSlug: 'spinoza',
    prompt: {
      en: 'What happened to Spinoza in 1656 in Amsterdam?',
      pt: 'O que aconteceu a Spinoza em 1656 em Amsterdã?',
    },
    options: {
      en: ['He was excommunicated (herem) from the Jewish community', 'He was crowned poet laureate', 'He was imprisoned for debt', 'He converted to Catholicism'],
      pt: ['Foi excomungado (herem) da comunidade judaica', 'Foi coroado poeta laureado', 'Foi preso por dívidas', 'Converteu-se ao catolicismo'],
    },
    explanation: {
      en: 'At 23, Spinoza received the harshest herem his congregation ever issued — and never sought readmission.',
      pt: 'Aos 23 anos, Spinoza recebeu o herem mais duro que sua congregação já emitiu — e jamais buscou readmissão.',
    },
  },
  {
    id: 'spinoza-5',
    philosopherSlug: 'spinoza',
    prompt: {
      en: 'For Spinoza, what is human freedom?',
      pt: 'Para Spinoza, o que é a liberdade humana?',
    },
    options: {
      en: ['Understanding necessity — acting from the laws of one’s own nature', 'Uncaused free will', 'Obeying the state', 'Escaping the body'],
      pt: ['Compreender a necessidade — agir pelas leis da própria natureza', 'O livre-arbítrio sem causa', 'Obedecer ao Estado', 'Escapar do corpo'],
    },
    explanation: {
      en: 'Spinoza denies uncaused will: freedom is acting from adequate understanding of the necessity that runs through all things.',
      pt: 'Spinoza nega a vontade sem causa: liberdade é agir a partir da compreensão adequada da necessidade que atravessa todas as coisas.',
    },
  },
  {
    id: 'spinoza-6',
    philosopherSlug: 'spinoza',
    prompt: {
      en: 'Which treatise by Spinoza defended freedom of thought and speech in the republic?',
      pt: 'Que tratado de Spinoza defendeu a liberdade de pensamento e expressão na república?',
    },
    options: {
      en: ['The Theological-Political Treatise', 'The Social Contract', 'Leviathan', 'On Liberty'],
      pt: ['O Tratado Teológico-Político', 'O Contrato Social', 'O Leviatã', 'Sobre a Liberdade'],
    },
    explanation: {
      en: 'Published anonymously in 1670, it argued that the freedom to philosophize can be granted without harm to piety or the state.',
      pt: 'Publicado anonimamente em 1670, defendia que a liberdade de filosofar pode ser concedida sem dano à piedade ou ao Estado.',
    },
  },
  {
    id: 'leibniz-4',
    philosopherSlug: 'leibniz',
    prompt: {
      en: 'What is the "pre-established harmony" in Leibniz’s philosophy?',
      pt: 'O que é a "harmonia preestabelecida" na filosofia de Leibniz?',
    },
    options: {
      en: ['God synchronized all monads at creation, like perfect clocks', 'Planets move in harmonic ratios', 'Souls negotiate agreements after death', 'Music underlies all matter'],
      pt: ['Deus sincronizou todas as mônadas na criação, como relógios perfeitos', 'Os planetas se movem em razões harmônicas', 'As almas negociam acordos após a morte', 'A música subjaz a toda a matéria'],
    },
    explanation: {
      en: 'Monads do not interact; they agree because God coordinated their internal programs from the start, like two perfect clocks.',
      pt: 'As mônadas não interagem; concordam porque Deus coordenou seus programas internos desde o início, como dois relógios perfeitos.',
    },
  },
  {
    id: 'leibniz-5',
    philosopherSlug: 'leibniz',
    prompt: {
      en: 'Which binary invention of Leibniz underlies modern computing?',
      pt: 'Que invenção binária de Leibniz fundamenta a computação moderna?',
    },
    options: {
      en: ['Binary arithmetic (base 2)', 'The QWERTY keyboard', 'Boolean algebra', 'The punched card'],
      pt: ['A aritmética binária (base 2)', 'O teclado QWERTY', 'A álgebra booleana', 'O cartão perfurado'],
    },
    explanation: {
      en: 'Leibniz formalized base-2 arithmetic and even saw it prefigured in the hexagrams of the I Ching.',
      pt: 'Leibniz formalizou a aritmética de base 2 e até a viu prefigurada nos hexagramas do I Ching.',
    },
  },
  {
    id: 'leibniz-6',
    philosopherSlug: 'leibniz',
    prompt: {
      en: 'What principle states that nothing happens without a reason, according to Leibniz?',
      pt: 'Que princípio afirma que nada acontece sem uma razão, segundo Leibniz?',
    },
    options: {
      en: ['The principle of sufficient reason', 'The principle of non-contradiction', 'The uncertainty principle', 'The categorical imperative'],
      pt: ['O princípio de razão suficiente', 'O princípio de não contradição', 'O princípio da incerteza', 'O imperativo categórico'],
    },
    explanation: {
      en: 'Leibniz made the principle of sufficient reason a pillar of metaphysics: for every truth there is a reason why it is so.',
      pt: 'Leibniz fez do princípio de razão suficiente um pilar da metafísica: para toda verdade há uma razão pela qual é assim.',
    },
  },
  {
    id: 'fichte-4',
    philosopherSlug: 'fichte',
    prompt: {
      en: 'How did Fichte first gain Kant’s attention?',
      pt: 'Como Fichte chamou a atenção de Kant pela primeira vez?',
    },
    options: {
      en: ['With an essay on revelation published anonymously and mistaken for Kant’s', 'By attending his lectures for ten years', 'By challenging him to a public debate', 'By marrying into his family'],
      pt: ['Com um ensaio sobre a revelação publicado anonimamente e confundido com obra de Kant', 'Frequentando suas aulas por dez anos', 'Desafiando-o a um debate público', 'Casando-se com alguém de sua família'],
    },
    explanation: {
      en: 'His "Attempt at a Critique of All Revelation" appeared without a name; critics hailed it as Kant’s — Kant revealed the true author.',
      pt: 'Seu "Ensaio de uma Crítica de Toda Revelação" saiu sem nome; a crítica o saudou como obra de Kant — que revelou o verdadeiro autor.',
    },
  },
  {
    id: 'fichte-5',
    philosopherSlug: 'fichte',
    prompt: {
      en: 'Why did Fichte lose his chair at Jena in 1799?',
      pt: 'Por que Fichte perdeu sua cátedra em Jena em 1799?',
    },
    options: {
      en: ['The "atheism controversy" over an essay on divine governance', 'Financial scandal', 'Support for Napoleon', 'Refusing to teach in German'],
      pt: ['A "querela do ateísmo" por um ensaio sobre o governo divino', 'Escândalo financeiro', 'Apoio a Napoleão', 'Recusa a ensinar em alemão'],
    },
    explanation: {
      en: 'Accused of atheism for identifying God with the moral world order, Fichte defiantly offered to resign — and was taken at his word.',
      pt: 'Acusado de ateísmo por identificar Deus com a ordem moral do mundo, Fichte ofereceu a demissão em desafio — e foi levado a sério.',
    },
  },
  {
    id: 'fichte-6',
    philosopherSlug: 'fichte',
    prompt: {
      en: 'Of which new university did Fichte become the first elected rector?',
      pt: 'De que nova universidade Fichte tornou-se o primeiro reitor eleito?',
    },
    options: {
      en: ['The University of Berlin', 'The University of Jena', 'The University of Göttingen', 'The University of Heidelberg'],
      pt: ['A Universidade de Berlim', 'A Universidade de Jena', 'A Universidade de Göttingen', 'A Universidade de Heidelberg'],
    },
    explanation: {
      en: 'Fichte helped shape the new University of Berlin (1810) and served as its first elected rector.',
      pt: 'Fichte ajudou a conceber a nova Universidade de Berlim (1810) e foi seu primeiro reitor eleito.',
    },
  },
  {
    id: 'hegel-4',
    philosopherSlug: 'hegel',
    prompt: {
      en: 'Complete Hegel’s dictum: "The real is rational and..."',
      pt: 'Complete o dito de Hegel: "O real é racional e..."',
    },
    options: {
      en: ['"...the rational is real."', '"...the rational is divine."', '"...the ideal is eternal."', '"...the material is illusion."'],
      pt: ['"...o racional é real."', '"...o racional é divino."', '"...o ideal é eterno."', '"...o material é ilusão."'],
    },
    explanation: {
      en: 'From the Philosophy of Right: actuality and reason interpenetrate — history is intelligible through and through.',
      pt: 'Da Filosofia do Direito: efetividade e razão se interpenetram — a história é inteligível de ponta a ponta.',
    },
  },
  {
    id: 'hegel-5',
    philosopherSlug: 'hegel',
    prompt: {
      en: 'What does Hegel mean by "the owl of Minerva flies at dusk"?',
      pt: 'O que Hegel quer dizer com "a coruja de Minerva alça voo ao entardecer"?',
    },
    options: {
      en: ['Philosophy understands an age only when it is ending', 'Wisdom belongs to the night', 'Athens fell at sunset', 'Truth fears the daylight'],
      pt: ['A filosofia compreende uma época apenas quando ela termina', 'A sabedoria pertence à noite', 'Atenas caiu ao pôr do sol', 'A verdade teme a luz do dia'],
    },
    explanation: {
      en: 'Philosophy paints "its grey on grey" only when a form of life has grown old — comprehension comes after the fact.',
      pt: 'A filosofia pinta "seu cinza sobre cinza" apenas quando uma forma de vida envelheceu — a compreensão vem depois do fato.',
    },
  },
  {
    id: 'hegel-6',
    philosopherSlug: 'hegel',
    prompt: {
      en: 'At which university did Hegel hold his final, most influential professorship?',
      pt: 'Em que universidade Hegel ocupou sua última e mais influente cátedra?',
    },
    options: {
      en: ['Berlin', 'Jena', 'Heidelberg', 'Tübingen'],
      pt: ['Berlim', 'Jena', 'Heidelberg', 'Tubinga'],
    },
    explanation: {
      en: 'From 1818 until his death in 1831, Hegel taught in Berlin, where his system dominated German intellectual life.',
      pt: 'De 1818 até sua morte em 1831, Hegel ensinou em Berlim, onde seu sistema dominou a vida intelectual alemã.',
    },
  },
  {
    id: 'kierkegaard-4',
    philosopherSlug: 'kierkegaard',
    prompt: {
      en: 'Why did Kierkegaard publish under pseudonyms like Johannes de Silentio?',
      pt: 'Por que Kierkegaard publicava sob pseudônimos como Johannes de Silentio?',
    },
    options: {
      en: ['Each pseudonym embodies a standpoint the reader must confront, not a doctrine to accept', 'He feared government censorship', 'He was ashamed of his ideas', 'His publisher demanded it'],
      pt: ['Cada pseudônimo encarna um ponto de vista que o leitor deve confrontar, não uma doutrina a aceitar', 'Temia a censura do governo', 'Tinha vergonha de suas ideias', 'Seu editor exigia'],
    },
    explanation: {
      en: 'His "indirect communication" forces readers to think for themselves rather than receive opinions from an authority.',
      pt: 'Sua "comunicação indireta" força o leitor a pensar por si, em vez de receber opiniões de uma autoridade.',
    },
  },
  {
    id: 'kierkegaard-5',
    philosopherSlug: 'kierkegaard',
    prompt: {
      en: 'Whom did Kierkegaard famously renounce marrying, a wound that marked his work?',
      pt: 'Com quem Kierkegaard rompeu um noivado, ferida que marcou sua obra?',
    },
    options: {
      en: ['Regine Olsen', 'Karen Blixen', 'Clara Schumann', 'Camille Claudel'],
      pt: ['Regine Olsen', 'Karen Blixen', 'Clara Schumann', 'Camille Claudel'],
    },
    explanation: {
      en: 'He broke his engagement to Regine Olsen in 1841 — the sacrifice haunts Fear and Trembling and Repetition.',
      pt: 'Rompeu o noivado com Regine Olsen em 1841 — o sacrifício assombra Temor e Tremor e A Repetição.',
    },
  },
  {
    id: 'kierkegaard-6',
    philosopherSlug: 'kierkegaard',
    prompt: {
      en: 'Against which institution did Kierkegaard wage his final public campaign?',
      pt: 'Contra que instituição Kierkegaard travou sua última campanha pública?',
    },
    options: {
      en: ['The Danish state church', 'The University of Copenhagen', 'The Danish monarchy', 'The press'],
      pt: ['A Igreja oficial dinamarquesa', 'A Universidade de Copenhague', 'A monarquia dinamarquesa', 'A imprensa'],
    },
    explanation: {
      en: 'In "The Moment" he attacked official Christendom as the betrayal of Christianity — and collapsed in the street mid-campaign.',
      pt: 'Em "O Instante", atacou a cristandade oficial como traição do cristianismo — e desmaiou na rua em plena campanha.',
    },
  },
  {
    id: 'sartre-4',
    philosopherSlug: 'sartre',
    prompt: {
      en: 'What is the title of Sartre’s major philosophical work of 1943?',
      pt: 'Qual é o título da principal obra filosófica de Sartre, de 1943?',
    },
    options: {
      en: ['Being and Nothingness', 'Being and Time', 'The Myth of Sisyphus', 'The Phenomenology of Spirit'],
      pt: ['O Ser e o Nada', 'Ser e Tempo', 'O Mito de Sísifo', 'A Fenomenologia do Espírito'],
    },
    explanation: {
      en: 'Being and Nothingness, written partly in occupied Paris, founds his phenomenological ontology of freedom.',
      pt: 'O Ser e o Nada, escrito em parte na Paris ocupada, funda sua ontologia fenomenológica da liberdade.',
    },
  },
  {
    id: 'sartre-5',
    philosopherSlug: 'sartre',
    prompt: {
      en: 'Which line from the play "No Exit" became Sartre’s most quoted sentence?',
      pt: 'Que frase da peça "Entre Quatro Paredes" tornou-se a mais citada de Sartre?',
    },
    options: {
      en: ['"Hell is other people."', '"God is dead."', '"I think, therefore I am."', '"Man is a wolf to man."'],
      pt: ['"O inferno são os outros."', '"Deus está morto."', '"Penso, logo existo."', '"O homem é o lobo do homem."'],
    },
    explanation: {
      en: 'In Huis Clos three characters torture each other merely by their gazes — hell as the look of the Other.',
      pt: 'Em Huis Clos, três personagens torturam-se apenas com seus olhares — o inferno como o olhar do Outro.',
    },
  },
  {
    id: 'sartre-6',
    philosopherSlug: 'sartre',
    prompt: {
      en: 'With which philosopher did Sartre share a lifelong intellectual partnership?',
      pt: 'Com que filósofa Sartre manteve uma parceria intelectual por toda a vida?',
    },
    options: {
      en: ['Simone de Beauvoir', 'Hannah Arendt', 'Simone Weil', 'Iris Murdoch'],
      pt: ['Simone de Beauvoir', 'Hannah Arendt', 'Simone Weil', 'Iris Murdoch'],
    },
    explanation: {
      en: 'Sartre and Beauvoir read and edited each other’s work for fifty years — a partnership central to existentialism.',
      pt: 'Sartre e Beauvoir leram e editaram a obra um do outro por cinquenta anos — parceria central para o existencialismo.',
    },
  },
];
