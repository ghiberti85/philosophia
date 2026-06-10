import type { QuizQuestion } from './types';

/**
 * Question pools for the modern philosophers.
 * Convention: options[0] is always the correct answer (shuffled at runtime).
 */
export const modernQuestions: QuizQuestion[] = [
  // ── Descartes ─────────────────────────────────────────────────────────
  {
    id: 'descartes-1',
    philosopherSlug: 'descartes',
    prompt: {
      en: 'What is the first indubitable certainty Descartes reaches through methodical doubt?',
      pt: 'Qual é a primeira certeza indubitável que Descartes alcança pela dúvida metódica?',
    },
    options: {
      en: ['"I think, therefore I am"', '"God exists"', '"The external world is real"', '"Mathematics is infallible"'],
      pt: ['"Penso, logo existo"', '"Deus existe"', '"O mundo externo é real"', '"A matemática é infalível"'],
    },
    explanation: {
      en: 'Even if everything else is illusion, the very act of doubting proves the existence of the doubting self.',
      pt: 'Mesmo que tudo o mais seja ilusão, o próprio ato de duvidar prova a existência do eu que duvida.',
    },
  },
  {
    id: 'descartes-2',
    philosopherSlug: 'descartes',
    prompt: {
      en: 'Which mathematical invention is credited to Descartes?',
      pt: 'Qual invenção matemática é creditada a Descartes?',
    },
    options: {
      en: ['Analytic geometry and the coordinate system', 'Differential calculus', 'Probability theory', 'Non-Euclidean geometry'],
      pt: ['A geometria analítica e o sistema de coordenadas', 'O cálculo diferencial', 'A teoria da probabilidade', 'A geometria não euclidiana'],
    },
    explanation: {
      en: 'The "Cartesian plane" unified algebra and geometry, paving the way for calculus and modern physics.',
      pt: 'O "plano cartesiano" unificou álgebra e geometria, abrindo caminho para o cálculo e a física moderna.',
    },
  },
  {
    id: 'descartes-3',
    philosopherSlug: 'descartes',
    prompt: {
      en: 'What is Cartesian dualism?',
      pt: 'O que é o dualismo cartesiano?',
    },
    options: {
      en: ['The distinction between thinking substance (mind) and extended substance (body)', 'The opposition between good and evil', 'The division of society into rulers and ruled', 'The split between faith and superstition'],
      pt: ['A distinção entre substância pensante (mente) e substância extensa (corpo)', 'A oposição entre o bem e o mal', 'A divisão da sociedade entre governantes e governados', 'A separação entre fé e superstição'],
    },
    explanation: {
      en: 'For Descartes, mind (res cogitans) and body (res extensa) are radically different substances — framing the mind-body problem to this day.',
      pt: 'Para Descartes, mente (res cogitans) e corpo (res extensa) são substâncias radicalmente distintas — formulando o problema mente-corpo até hoje.',
    },
  },
  {
    id: 'descartes-4',
    philosopherSlug: 'descartes',
    prompt: {
      en: 'What ultimately led to Descartes\' death in Stockholm?',
      pt: 'O que levou à morte de Descartes em Estocolmo?',
    },
    options: {
      en: ['Pneumonia, after tutoring Queen Christina at 5 a.m. in winter', 'A duel with a Swedish nobleman', 'Poisoning by Jesuit rivals', 'A shipwreck in the Baltic'],
      pt: ['Pneumonia, após dar aulas à rainha Cristina às 5h da manhã no inverno', 'Um duelo com um nobre sueco', 'Envenenamento por rivais jesuítas', 'Um naufrágio no Báltico'],
    },
    explanation: {
      en: 'The dawn lessons in the Scandinavian winter broke his lifelong habit of late mornings in bed; he died within months.',
      pt: 'As aulas de madrugada no inverno escandinavo quebraram seu hábito de uma vida de manhãs na cama; ele morreu em poucos meses.',
    },
  },
  {
    id: 'descartes-5',
    philosopherSlug: 'descartes',
    prompt: {
      en: 'Why did Descartes withhold his treatise "The World" from publication?',
      pt: 'Por que Descartes não publicou seu tratado "O Mundo"?',
    },
    options: {
      en: ['He feared the Church after Galileo\'s condemnation', 'The manuscript was destroyed in a fire', 'Queen Christina forbade it', 'He considered it mathematically flawed'],
      pt: ['Temia a Igreja após a condenação de Galileu', 'O manuscrito foi destruído em um incêndio', 'A rainha Cristina o proibiu', 'Ele o considerava matematicamente falho'],
    },
    explanation: {
      en: 'The book defended heliocentrism; when Galileo was condemned in 1633, Descartes prudently shelved it.',
      pt: 'O livro defendia o heliocentrismo; quando Galileu foi condenado em 1633, Descartes prudentemente o engavetou.',
    },
  },
  {
    id: 'descartes-6',
    philosopherSlug: 'descartes',
    prompt: {
      en: 'In which work does the famous phrase "I think, therefore I am" first appear?',
      pt: 'Em que obra aparece pela primeira vez a famosa frase "Penso, logo existo"?',
    },
    options: {
      en: ['Discourse on Method', 'Critique of Pure Reason', 'The Prince', 'Essays on Human Understanding'],
      pt: ['Discurso do Método', 'Crítica da Razão Pura', 'O Príncipe', 'Ensaios sobre o Entendimento Humano'],
    },
    explanation: {
      en: 'Published in French in 1637 ("Je pense, donc je suis"), later rendered in Latin as "Cogito, ergo sum".',
      pt: 'Publicada em francês em 1637 ("Je pense, donc je suis"), depois vertida para o latim como "Cogito, ergo sum".',
    },
  },

  // ── Kant ──────────────────────────────────────────────────────────────
  {
    id: 'kant-1',
    philosopherSlug: 'kant',
    prompt: {
      en: 'What does Kant\'s categorical imperative command?',
      pt: 'O que ordena o imperativo categórico de Kant?',
    },
    options: {
      en: ['Act only on maxims you could will to become universal laws', 'Maximize happiness for the greatest number', 'Obey the sovereign in all things', 'Follow nature and accept fate'],
      pt: ['Agir apenas por máximas que você poderia querer como leis universais', 'Maximizar a felicidade do maior número', 'Obedecer ao soberano em todas as coisas', 'Seguir a natureza e aceitar o destino'],
    },
    explanation: {
      en: 'The categorical imperative tests every maxim by universalization — morality grounded in reason, not consequences.',
      pt: 'O imperativo categórico testa cada máxima pela universalização — a moral fundada na razão, não nas consequências.',
    },
  },
  {
    id: 'kant-2',
    philosopherSlug: 'kant',
    prompt: {
      en: 'What did Kant call his "Copernican revolution" in philosophy?',
      pt: 'O que Kant chamou de sua "revolução copernicana" na filosofia?',
    },
    options: {
      en: ['The idea that objects conform to the structures of the knowing mind', 'The proof that the Earth orbits the Sun', 'The replacement of ethics by astronomy', 'The discovery that all knowledge comes from the senses'],
      pt: ['A ideia de que os objetos se conformam às estruturas da mente que conhece', 'A prova de que a Terra orbita o Sol', 'A substituição da ética pela astronomia', 'A descoberta de que todo conhecimento vem dos sentidos'],
    },
    explanation: {
      en: 'Instead of the mind mirroring the world, the world of experience is shaped by the mind\'s forms — space, time and the categories.',
      pt: 'Em vez de a mente espelhar o mundo, o mundo da experiência é moldado pelas formas da mente — espaço, tempo e categorias.',
    },
  },
  {
    id: 'kant-3',
    philosopherSlug: 'kant',
    prompt: {
      en: 'Which habit of Kant\'s reportedly let neighbours set their clocks?',
      pt: 'Qual hábito de Kant, dizem, permitia que os vizinhos acertassem os relógios?',
    },
    options: {
      en: ['His punctual daily afternoon walk', 'His morning trumpet practice', 'His nightly lamp-lighting', 'His weekly market visits'],
      pt: ['Sua pontual caminhada diária à tarde', 'Sua prática matinal de trompete', 'O acender de seu lampião à noite', 'Suas visitas semanais ao mercado'],
    },
    explanation: {
      en: 'The story goes that only Rousseau\'s Émile ever made him miss the walk.',
      pt: 'Conta-se que apenas o Émile de Rousseau o fez perder a caminhada.',
    },
  },
  {
    id: 'kant-4',
    philosopherSlug: 'kant',
    prompt: {
      en: 'Which philosopher "woke Kant from his dogmatic slumber"?',
      pt: 'Qual filósofo "despertou Kant de seu sono dogmático"?',
    },
    options: {
      en: ['David Hume', 'John Locke', 'Gottfried Leibniz', 'Baruch Spinoza'],
      pt: ['David Hume', 'John Locke', 'Gottfried Leibniz', 'Baruch Spinoza'],
    },
    explanation: {
      en: 'Hume\'s skepticism about causality forced Kant to rethink how knowledge is possible at all.',
      pt: 'O ceticismo de Hume sobre a causalidade forçou Kant a repensar como o conhecimento é possível.',
    },
  },
  {
    id: 'kant-5',
    philosopherSlug: 'kant',
    prompt: {
      en: 'According to Kant\'s "formula of humanity", how must we treat persons?',
      pt: 'Segundo a "fórmula da humanidade" de Kant, como devemos tratar as pessoas?',
    },
    options: {
      en: ['Always as ends in themselves, never merely as means', 'According to their social utility', 'As equals only if they are rational adults', 'With benevolence proportional to their merit'],
      pt: ['Sempre como fins em si mesmas, nunca apenas como meios', 'De acordo com sua utilidade social', 'Como iguais apenas se forem adultos racionais', 'Com benevolência proporcional ao seu mérito'],
    },
    explanation: {
      en: 'Human dignity is unconditional: rational beings have absolute worth and can never be treated as mere instruments.',
      pt: 'A dignidade humana é incondicional: seres racionais têm valor absoluto e jamais podem ser tratados como meros instrumentos.',
    },
  },
  {
    id: 'kant-6',
    philosopherSlug: 'kant',
    prompt: {
      en: 'Which two things, said Kant, fill the mind with ever-growing admiration?',
      pt: 'Quais duas coisas, disse Kant, enchem o ânimo de admiração sempre crescente?',
    },
    options: {
      en: ['The starry heavens above and the moral law within', 'The power of kings and the wisdom of priests', 'The beauty of art and the rigor of science', 'The depth of the sea and the height of the mountains'],
      pt: ['O céu estrelado acima e a lei moral interior', 'O poder dos reis e a sabedoria dos sacerdotes', 'A beleza da arte e o rigor da ciência', 'A profundidade do mar e a altura das montanhas'],
    },
    explanation: {
      en: 'The closing line of the Critique of Practical Reason — and the epitaph on his tomb in Königsberg.',
      pt: 'A frase final da Crítica da Razão Prática — e o epitáfio de seu túmulo em Königsberg.',
    },
  },

  // ── Nietzsche ─────────────────────────────────────────────────────────
  {
    id: 'nietzsche-1',
    philosopherSlug: 'nietzsche',
    prompt: {
      en: 'What did Nietzsche mean by "God is dead"?',
      pt: 'O que Nietzsche quis dizer com "Deus está morto"?',
    },
    options: {
      en: ['Traditional foundations of value have lost their power over modern culture', 'A literal theological claim that the deity perished', 'That churches should be demolished', 'That science had disproved every religion'],
      pt: ['Os fundamentos tradicionais dos valores perderam seu poder sobre a cultura moderna', 'Uma afirmação teológica literal de que a divindade pereceu', 'Que as igrejas deveriam ser demolidas', 'Que a ciência havia refutado todas as religiões'],
    },
    explanation: {
      en: 'The phrase diagnoses the collapse of absolute values — and the nihilism that follows unless we create new ones.',
      pt: 'A frase diagnostica o colapso dos valores absolutos — e o niilismo que se segue, a menos que criemos novos.',
    },
  },
  {
    id: 'nietzsche-2',
    philosopherSlug: 'nietzsche',
    prompt: {
      en: 'At what age did Nietzsche become a full professor at Basel?',
      pt: 'Com que idade Nietzsche se tornou professor titular na Basileia?',
    },
    options: {
      en: ['24', '36', '42', '19'],
      pt: ['24', '36', '42', '19'],
    },
    explanation: {
      en: 'An almost unheard-of appointment — he had not even finished his doctorate in classical philology.',
      pt: 'Uma nomeação quase inédita — ele nem havia concluído o doutorado em filologia clássica.',
    },
  },
  {
    id: 'nietzsche-3',
    philosopherSlug: 'nietzsche',
    prompt: {
      en: 'What is the "eternal recurrence" in Nietzsche\'s thought?',
      pt: 'O que é o "eterno retorno" no pensamento de Nietzsche?',
    },
    options: {
      en: ['A test: would you affirm your life if you had to relive it infinitely, identical in every detail?', 'The reincarnation of souls into higher beings', 'The cyclical rise and fall of empires', 'The repetition of historical errors by each generation'],
      pt: ['Um teste: você afirmaria sua vida se tivesse de revivê-la infinitamente, idêntica em cada detalhe?', 'A reencarnação das almas em seres superiores', 'A ascensão e queda cíclica dos impérios', 'A repetição dos erros históricos a cada geração'],
    },
    explanation: {
      en: 'The thought experiment of The Gay Science §341: only total love of fate (amor fati) can embrace it with joy.',
      pt: 'O experimento mental de A Gaia Ciência §341: só o amor total ao destino (amor fati) pode abraçá-lo com alegria.',
    },
  },
  {
    id: 'nietzsche-4',
    philosopherSlug: 'nietzsche',
    prompt: {
      en: 'Who distorted Nietzsche\'s unpublished writings after his collapse?',
      pt: 'Quem distorceu os escritos inéditos de Nietzsche após seu colapso?',
    },
    options: {
      en: ['His sister Elisabeth, to please German nationalists', 'His friend Richard Wagner', 'His publisher in Leipzig', 'His Basel students'],
      pt: ['Sua irmã Elisabeth, para agradar nacionalistas alemães', 'Seu amigo Richard Wagner', 'Seu editor em Leipzig', 'Seus alunos da Basileia'],
    },
    explanation: {
      en: 'Elisabeth Förster-Nietzsche edited "The Will to Power" tendentiously; Nietzsche himself despised antisemitism and nationalism.',
      pt: 'Elisabeth Förster-Nietzsche editou "A Vontade de Poder" de forma tendenciosa; o próprio Nietzsche desprezava o antissemitismo e o nacionalismo.',
    },
  },
  {
    id: 'nietzsche-5',
    philosopherSlug: 'nietzsche',
    prompt: {
      en: 'In which book does the prophet Zarathustra announce the Übermensch?',
      pt: 'Em que livro o profeta Zaratustra anuncia o Übermensch?',
    },
    options: {
      en: ['Thus Spoke Zarathustra', 'The Birth of Tragedy', 'Ecce Homo', 'Human, All Too Human'],
      pt: ['Assim Falou Zaratustra', 'O Nascimento da Tragédia', 'Ecce Homo', 'Humano, Demasiado Humano'],
    },
    explanation: {
      en: 'Written in bursts between 1883 and 1885, it presents the Übermensch as the meaning of the earth after the death of God.',
      pt: 'Escrito em surtos entre 1883 e 1885, apresenta o Übermensch como o sentido da terra após a morte de Deus.',
    },
  },
  {
    id: 'nietzsche-6',
    philosopherSlug: 'nietzsche',
    prompt: {
      en: 'According to Nietzsche, without what "would life be a mistake"?',
      pt: 'Segundo Nietzsche, sem o que "a vida seria um erro"?',
    },
    options: {
      en: ['Music', 'Wine', 'Philosophy', 'Solitude'],
      pt: ['A música', 'O vinho', 'A filosofia', 'A solidão'],
    },
    explanation: {
      en: 'From Twilight of the Idols — Nietzsche was himself a lifelong amateur composer.',
      pt: 'De Crepúsculo dos Ídolos — o próprio Nietzsche foi compositor amador a vida inteira.',
    },
  },

  // ── Simone de Beauvoir ────────────────────────────────────────────────
  {
    id: 'beauvoir-1',
    philosopherSlug: 'simone-de-beauvoir',
    prompt: {
      en: 'Complete Beauvoir\'s most famous sentence: "One is not born, but rather becomes, ____."',
      pt: 'Complete a frase mais famosa de Beauvoir: "Ninguém nasce mulher: ____."',
    },
    options: {
      en: ['a woman', 'a citizen', 'free', 'an existentialist'],
      pt: ['torna-se mulher', 'torna-se cidadã', 'torna-se livre', 'torna-se existencialista'],
    },
    explanation: {
      en: 'The thesis of The Second Sex: femininity is not a biological destiny but a social construction.',
      pt: 'A tese de O Segundo Sexo: a feminilidade não é um destino biológico, mas uma construção social.',
    },
  },
  {
    id: 'beauvoir-2',
    philosopherSlug: 'simone-de-beauvoir',
    prompt: {
      en: 'Which 1949 work by Beauvoir founded modern feminist philosophy?',
      pt: 'Qual obra de Beauvoir, de 1949, fundou a filosofia feminista moderna?',
    },
    options: {
      en: ['The Second Sex', 'The Mandarins', 'The Ethics of Ambiguity', 'Memoirs of a Dutiful Daughter'],
      pt: ['O Segundo Sexo', 'Os Mandarins', 'Por uma Moral da Ambiguidade', 'Memórias de uma Moça Bem-Comportada'],
    },
    explanation: {
      en: 'Its analysis of woman as the "Other" ignited second-wave feminism — and was banned by the Vatican.',
      pt: 'Sua análise da mulher como o "Outro" acendeu a segunda onda feminista — e foi proibida pelo Vaticano.',
    },
  },
  {
    id: 'beauvoir-3',
    philosopherSlug: 'simone-de-beauvoir',
    prompt: {
      en: 'What record did Beauvoir set at age 21?',
      pt: 'Que recorde Beauvoir estabeleceu aos 21 anos?',
    },
    options: {
      en: ['Youngest person to pass the agrégation in philosophy in France', 'First woman admitted to the Sorbonne', 'Youngest winner of the Goncourt Prize', 'First woman to teach at the Collège de France'],
      pt: ['Pessoa mais jovem a passar na agrégation de filosofia na França', 'Primeira mulher admitida na Sorbonne', 'Vencedora mais jovem do Prêmio Goncourt', 'Primeira mulher a lecionar no Collège de France'],
    },
    explanation: {
      en: 'She placed second in the 1929 exam, just behind Sartre — on his second attempt; it was her first.',
      pt: 'Ficou em segundo lugar no exame de 1929, logo atrás de Sartre — na segunda tentativa dele; era a primeira dela.',
    },
  },
  {
    id: 'beauvoir-4',
    philosopherSlug: 'simone-de-beauvoir',
    prompt: {
      en: 'Which lifelong intellectual partner shared an "essential love" with Beauvoir?',
      pt: 'Qual parceiro intelectual de toda a vida compartilhou um "amor essencial" com Beauvoir?',
    },
    options: {
      en: ['Jean-Paul Sartre', 'Albert Camus', 'Maurice Merleau-Ponty', 'Raymond Aron'],
      pt: ['Jean-Paul Sartre', 'Albert Camus', 'Maurice Merleau-Ponty', 'Raymond Aron'],
    },
    explanation: {
      en: 'Beauvoir and Sartre maintained an open, never-domestic partnership from 1929 until his death in 1980.',
      pt: 'Beauvoir e Sartre mantiveram uma parceria aberta, jamais doméstica, de 1929 até a morte dele, em 1980.',
    },
  },
  {
    id: 'beauvoir-5',
    philosopherSlug: 'simone-de-beauvoir',
    prompt: {
      en: 'Which novel won Beauvoir the Goncourt Prize in 1954?',
      pt: 'Qual romance deu a Beauvoir o Prêmio Goncourt em 1954?',
    },
    options: {
      en: ['The Mandarins', 'She Came to Stay', 'The Blood of Others', 'All Men Are Mortal'],
      pt: ['Os Mandarins', 'A Convidada', 'O Sangue dos Outros', 'Todos os Homens São Mortais'],
    },
    explanation: {
      en: 'A roman à clef about post-war Parisian intellectuals, widely read as portraying Sartre, Camus and herself.',
      pt: 'Um romance em chave sobre os intelectuais parisienses do pós-guerra, lido como retrato de Sartre, Camus e dela mesma.',
    },
  },
  {
    id: 'beauvoir-6',
    philosopherSlug: 'simone-de-beauvoir',
    prompt: {
      en: 'What was the Manifesto of the 343, which Beauvoir signed in 1971?',
      pt: 'O que foi o Manifesto das 343, assinado por Beauvoir em 1971?',
    },
    options: {
      en: ['A public demand for reproductive rights in France', 'A petition against the Vietnam War', 'A call to nationalize French universities', 'A protest against literary censorship'],
      pt: ['Uma exigência pública por direitos reprodutivos na França', 'Uma petição contra a Guerra do Vietnã', 'Um chamado à estatização das universidades francesas', 'Um protesto contra a censura literária'],
    },
    explanation: {
      en: 'Drafted by Beauvoir, it was signed by 343 women publicly declaring they had had illegal abortions, demanding legal change.',
      pt: 'Redigido por Beauvoir, foi assinado por 343 mulheres que declararam publicamente ter feito abortos ilegais, exigindo mudança na lei.',
    },
  },
];
