import type { QuizQuestion } from './types';

/**
 * Question pools for the ancient philosophers.
 * Convention: options[0] is always the correct answer (shuffled at runtime).
 */
export const ancientQuestions: QuizQuestion[] = [
  // ── Socrates ──────────────────────────────────────────────────────────
  {
    id: 'socrates-1',
    philosopherSlug: 'socrates',
    prompt: {
      en: 'What was the method Socrates used to expose contradictions in his interlocutors?',
      pt: 'Qual era o método que Sócrates usava para expor contradições em seus interlocutores?',
    },
    options: {
      en: ['The elenchus (systematic questioning)', 'The dialectic of master and slave', 'Methodical doubt', 'The syllogism'],
      pt: ['O elenchos (questionamento sistemático)', 'A dialética do senhor e do escravo', 'A dúvida metódica', 'O silogismo'],
    },
    explanation: {
      en: 'The elenchus is the Socratic method of question and answer that reveals contradictions in the interlocutor\'s beliefs.',
      pt: 'O elenchos é o método socrático de perguntas e respostas que revela contradições nas crenças do interlocutor.',
    },
  },
  {
    id: 'socrates-2',
    philosopherSlug: 'socrates',
    prompt: {
      en: 'How did Socrates die?',
      pt: 'Como Sócrates morreu?',
    },
    options: {
      en: ['He was condemned to drink hemlock', 'He was exiled and died of old age', 'He fell in the Peloponnesian War', 'He was assassinated by a student'],
      pt: ['Foi condenado a beber cicuta', 'Foi exilado e morreu de velhice', 'Caiu na Guerra do Peloponeso', 'Foi assassinado por um discípulo'],
    },
    explanation: {
      en: 'In 399 BC an Athenian jury sentenced him to death by hemlock for impiety and corrupting the youth.',
      pt: 'Em 399 a.C., um júri ateniense o condenou à morte por cicuta, acusado de impiedade e de corromper a juventude.',
    },
  },
  {
    id: 'socrates-3',
    philosopherSlug: 'socrates',
    prompt: {
      en: 'What did the Oracle of Delphi declare about Socrates?',
      pt: 'O que o Oráculo de Delfos declarou sobre Sócrates?',
    },
    options: {
      en: ['That no one was wiser than he', 'That he would die young', 'That he would rule Athens', 'That he should write his ideas down'],
      pt: ['Que ninguém era mais sábio do que ele', 'Que ele morreria jovem', 'Que ele governaria Atenas', 'Que ele deveria escrever suas ideias'],
    },
    explanation: {
      en: 'The oracle\'s statement puzzled Socrates, who concluded his wisdom lay in knowing that he knew nothing.',
      pt: 'A declaração intrigou Sócrates, que concluiu que sua sabedoria estava em saber que nada sabia.',
    },
  },
  {
    id: 'socrates-4',
    philosopherSlug: 'socrates',
    prompt: {
      en: 'How many books did Socrates write?',
      pt: 'Quantos livros Sócrates escreveu?',
    },
    options: {
      en: ['None — he never wrote anything', 'One: the Apology', 'Around ten dialogues', 'A single treatise on ethics'],
      pt: ['Nenhum — ele nunca escreveu nada', 'Um: a Apologia', 'Cerca de dez diálogos', 'Um único tratado sobre ética'],
    },
    explanation: {
      en: 'Socrates wrote nothing; his philosophy reaches us through Plato, Xenophon and other contemporaries.',
      pt: 'Sócrates nada escreveu; sua filosofia chega até nós por Platão, Xenofonte e outros contemporâneos.',
    },
  },
  {
    id: 'socrates-5',
    philosopherSlug: 'socrates',
    prompt: {
      en: 'What was the daimonion Socrates claimed to have?',
      pt: 'O que era o daimonion que Sócrates afirmava possuir?',
    },
    options: {
      en: ['An inner divine voice that warned him against errors', 'A pet owl given by Athena\'s priests', 'A book of oracular prophecies', 'A magical ring of invisibility'],
      pt: ['Uma voz divina interior que o alertava contra erros', 'Uma coruja de estimação dada pelos sacerdotes de Atena', 'Um livro de profecias oraculares', 'Um anel mágico de invisibilidade'],
    },
    explanation: {
      en: 'The daimonion was an inner voice or sign that, according to Socrates, dissuaded him from wrong actions.',
      pt: 'O daimonion era uma voz ou sinal interior que, segundo Sócrates, o dissuadia de ações erradas.',
    },
  },
  {
    id: 'socrates-6',
    philosopherSlug: 'socrates',
    prompt: {
      en: 'Which phrase is most associated with Socrates?',
      pt: 'Qual frase é mais associada a Sócrates?',
    },
    options: {
      en: ['"The unexamined life is not worth living"', '"Man is the measure of all things"', '"God is dead"', '"I think, therefore I am"'],
      pt: ['"Uma vida sem reflexão não merece ser vivida"', '"O homem é a medida de todas as coisas"', '"Deus está morto"', '"Penso, logo existo"'],
    },
    explanation: {
      en: 'He spoke it at his trial, as recorded in Plato\'s Apology (38a). The others belong to Protagoras, Nietzsche and Descartes.',
      pt: 'Ele a pronunciou em seu julgamento, como registra a Apologia de Platão (38a). As demais são de Protágoras, Nietzsche e Descartes.',
    },
  },

  // ── Plato ─────────────────────────────────────────────────────────────
  {
    id: 'plato-1',
    philosopherSlug: 'plato',
    prompt: {
      en: 'What institution did Plato found in Athens?',
      pt: 'Que instituição Platão fundou em Atenas?',
    },
    options: {
      en: ['The Academy', 'The Lyceum', 'The Stoa', 'The Garden'],
      pt: ['A Academia', 'O Liceu', 'A Stoa', 'O Jardim'],
    },
    explanation: {
      en: 'Founded around 387 BC, the Academy operated for over nine centuries; the Lyceum was Aristotle\'s, the Stoa Zeno\'s and the Garden Epicurus\'.',
      pt: 'Fundada por volta de 387 a.C., a Academia funcionou por mais de nove séculos; o Liceu era de Aristóteles, a Stoa de Zenão e o Jardim de Epicuro.',
    },
  },
  {
    id: 'plato-2',
    philosopherSlug: 'plato',
    prompt: {
      en: 'In the Allegory of the Cave, what do the shadows on the wall represent?',
      pt: 'Na Alegoria da Caverna, o que as sombras na parede representam?',
    },
    options: {
      en: ['The illusory world of the senses', 'The world of Forms', 'Mathematical truths', 'The memories of past lives'],
      pt: ['O mundo ilusório dos sentidos', 'O mundo das Ideias', 'As verdades matemáticas', 'As memórias de vidas passadas'],
    },
    explanation: {
      en: 'The shadows stand for sensory appearances mistaken for reality; the journey out of the cave is the ascent to the Forms.',
      pt: 'As sombras representam as aparências sensíveis tomadas por realidade; a saída da caverna é a ascensão às Ideias.',
    },
  },
  {
    id: 'plato-3',
    philosopherSlug: 'plato',
    prompt: {
      en: 'According to legend, what was written above the entrance of the Academy?',
      pt: 'Segundo a tradição, o que estava escrito na entrada da Academia?',
    },
    options: {
      en: ['"Let no one ignorant of geometry enter here"', '"Know thyself"', '"Nothing in excess"', '"Virtue is knowledge"'],
      pt: ['"Não entre aqui quem não souber geometria"', '"Conhece-te a ti mesmo"', '"Nada em excesso"', '"A virtude é conhecimento"'],
    },
    explanation: {
      en: 'The motto reflects the Pythagorean conviction that mathematics trains the soul for philosophy. "Know thyself" was inscribed at Delphi.',
      pt: 'O lema reflete a convicção pitagórica de que a matemática prepara a alma para a filosofia. "Conhece-te a ti mesmo" estava em Delfos.',
    },
  },
  {
    id: 'plato-4',
    philosopherSlug: 'plato',
    prompt: {
      en: 'What was Plato\'s real name, according to tradition?',
      pt: 'Qual era o nome verdadeiro de Platão, segundo a tradição?',
    },
    options: {
      en: ['Aristocles', 'Aristides', 'Alcibiades', 'Anaximander'],
      pt: ['Aristocles', 'Aristides', 'Alcibíades', 'Anaximandro'],
    },
    explanation: {
      en: '"Plato" ("broad") was reportedly a nickname from his wrestling days; his given name was Aristocles.',
      pt: '"Platão" ("largo") teria sido um apelido dos tempos de lutador; seu nome de batismo era Aristocles.',
    },
  },
  {
    id: 'plato-5',
    philosopherSlug: 'plato',
    prompt: {
      en: 'In the Republic, who should govern the ideal city?',
      pt: 'Na República, quem deve governar a cidade ideal?',
    },
    options: {
      en: ['Philosopher-kings', 'The assembly of all citizens', 'The wealthiest merchants', 'The strongest warriors'],
      pt: ['Os reis-filósofos', 'A assembleia de todos os cidadãos', 'Os mercadores mais ricos', 'Os guerreiros mais fortes'],
    },
    explanation: {
      en: 'Plato argues that only those who know the Form of the Good — the philosophers — are fit to rule.',
      pt: 'Platão argumenta que apenas os que conhecem a Ideia do Bem — os filósofos — estão aptos a governar.',
    },
  },
  {
    id: 'plato-6',
    philosopherSlug: 'plato',
    prompt: {
      en: 'Which legendary island civilization did Plato describe in the Timaeus and Critias?',
      pt: 'Que civilização insular lendária Platão descreveu no Timeu e no Crítias?',
    },
    options: {
      en: ['Atlantis', 'Lemuria', 'Thule', 'El Dorado'],
      pt: ['Atlântida', 'Lemúria', 'Thule', 'El Dorado'],
    },
    explanation: {
      en: 'Atlantis appears in these dialogues as a moral tale about hubris — and has fascinated treasure hunters ever since.',
      pt: 'Atlântida aparece nesses diálogos como uma fábula moral sobre a húbris — e fascina caçadores de mistérios desde então.',
    },
  },

  // ── Aristotle ─────────────────────────────────────────────────────────
  {
    id: 'aristotle-1',
    philosopherSlug: 'aristotle',
    prompt: {
      en: 'What does Aristotle call the supreme good of human life?',
      pt: 'Como Aristóteles chama o bem supremo da vida humana?',
    },
    options: {
      en: ['Eudaimonia (flourishing)', 'Ataraxia (tranquility)', 'Hedone (pleasure)', 'Apatheia (impassivity)'],
      pt: ['Eudaimonia (florescimento)', 'Ataraxia (tranquilidade)', 'Hedoné (prazer)', 'Apatheia (impassibilidade)'],
    },
    explanation: {
      en: 'Eudaimonia — flourishing through virtuous rational activity — is the goal of life in the Nicomachean Ethics.',
      pt: 'A eudaimonia — o florescimento pela atividade racional virtuosa — é o fim da vida na Ética a Nicômaco.',
    },
  },
  {
    id: 'aristotle-2',
    philosopherSlug: 'aristotle',
    prompt: {
      en: 'Which famous conqueror did Aristotle tutor?',
      pt: 'Qual famoso conquistador foi aluno de Aristóteles?',
    },
    options: {
      en: ['Alexander the Great', 'Julius Caesar', 'Pericles', 'Cyrus the Great'],
      pt: ['Alexandre, o Grande', 'Júlio César', 'Péricles', 'Ciro, o Grande'],
    },
    explanation: {
      en: 'Philip II of Macedon hired Aristotle around 343 BC to educate his son Alexander, then a teenager.',
      pt: 'Filipe II da Macedônia contratou Aristóteles por volta de 343 a.C. para educar seu filho Alexandre, então adolescente.',
    },
  },
  {
    id: 'aristotle-3',
    philosopherSlug: 'aristotle',
    prompt: {
      en: 'According to the doctrine of the golden mean, courage is the middle point between which extremes?',
      pt: 'Segundo a doutrina do justo meio, a coragem é o ponto médio entre quais extremos?',
    },
    options: {
      en: ['Cowardice and recklessness', 'Avarice and prodigality', 'Apathy and fury', 'Humility and pride'],
      pt: ['A covardia e a temeridade', 'A avareza e a prodigalidade', 'A apatia e a fúria', 'A humildade e o orgulho'],
    },
    explanation: {
      en: 'For Aristotle every moral virtue is a mean: courage lies between the deficiency (cowardice) and the excess (recklessness).',
      pt: 'Para Aristóteles, toda virtude moral é um meio-termo: a coragem está entre a falta (covardia) e o excesso (temeridade).',
    },
  },
  {
    id: 'aristotle-4',
    philosopherSlug: 'aristotle',
    prompt: {
      en: 'Why were Aristotle\'s followers called "peripatetics"?',
      pt: 'Por que os seguidores de Aristóteles eram chamados de "peripatéticos"?',
    },
    options: {
      en: ['Because he taught while walking the Lyceum\'s covered walkways', 'Because they travelled with Alexander\'s army', 'Because they met at the periphery of Athens', 'Because they refused to sit in the presence of slaves'],
      pt: ['Porque ele ensinava caminhando pelos pórticos cobertos do Liceu', 'Porque viajavam com o exército de Alexandre', 'Porque se reuniam na periferia de Atenas', 'Porque se recusavam a sentar na presença de escravos'],
    },
    explanation: {
      en: 'From the Greek peripatos (covered walk): Aristotle lectured while strolling with his students.',
      pt: 'Do grego peripatos (passeio coberto): Aristóteles dava aulas caminhando com seus alunos.',
    },
  },
  {
    id: 'aristotle-5',
    philosopherSlug: 'aristotle',
    prompt: {
      en: 'Which discipline did Aristotle effectively invent with his theory of the syllogism?',
      pt: 'Que disciplina Aristóteles praticamente inventou com sua teoria do silogismo?',
    },
    options: {
      en: ['Formal logic', 'Analytic geometry', 'Algebra', 'Rhetorical grammar'],
      pt: ['A lógica formal', 'A geometria analítica', 'A álgebra', 'A gramática retórica'],
    },
    explanation: {
      en: 'His Organon systematized valid inference for the first time; it dominated logic until the 19th century.',
      pt: 'Seu Órganon sistematizou a inferência válida pela primeira vez; dominou a lógica até o século XIX.',
    },
  },
  {
    id: 'aristotle-6',
    philosopherSlug: 'aristotle',
    prompt: {
      en: 'Why did Aristotle flee Athens in 323 BC?',
      pt: 'Por que Aristóteles fugiu de Atenas em 323 a.C.?',
    },
    options: {
      en: ['So that Athens would not "sin twice against philosophy"', 'To accompany Alexander to Persia', 'Because the Lyceum burned down', 'To found a school in Egypt'],
      pt: ['Para que Atenas não "pecasse duas vezes contra a filosofia"', 'Para acompanhar Alexandre à Pérsia', 'Porque o Liceu foi incendiado', 'Para fundar uma escola no Egito'],
    },
    explanation: {
      en: 'Charged with impiety after Alexander\'s death, he alluded to Socrates\' execution and withdrew to Chalcis.',
      pt: 'Acusado de impiedade após a morte de Alexandre, aludiu à execução de Sócrates e retirou-se para Cálcis.',
    },
  },

  // ── Seneca ────────────────────────────────────────────────────────────
  {
    id: 'seneca-1',
    philosopherSlug: 'seneca',
    prompt: {
      en: 'Which Roman emperor was Seneca\'s student and later ordered his death?',
      pt: 'Qual imperador romano foi aluno de Sêneca e mais tarde ordenou sua morte?',
    },
    options: {
      en: ['Nero', 'Caligula', 'Claudius', 'Augustus'],
      pt: ['Nero', 'Calígula', 'Cláudio', 'Augusto'],
    },
    explanation: {
      en: 'Seneca tutored and advised Nero for years; in 65 AD Nero ordered him to take his own life over an alleged conspiracy.',
      pt: 'Sêneca foi tutor e conselheiro de Nero por anos; em 65 d.C., Nero ordenou que ele tirasse a própria vida por uma suposta conspiração.',
    },
  },
  {
    id: 'seneca-2',
    philosopherSlug: 'seneca',
    prompt: {
      en: 'Which work of Seneca argues that life is long enough if we know how to use it?',
      pt: 'Qual obra de Sêneca argumenta que a vida é longa o bastante se soubermos usá-la?',
    },
    options: {
      en: ['On the Shortness of Life', 'The Meditations', 'Letters from a Stoic Garden', 'On the Nature of Things'],
      pt: ['Sobre a Brevidade da Vida', 'As Meditações', 'Cartas de um Jardim Estoico', 'Sobre a Natureza das Coisas'],
    },
    explanation: {
      en: 'De Brevitate Vitae contends that we receive plenty of time but squander it on trivialities.',
      pt: 'De Brevitate Vitae sustenta que recebemos tempo de sobra, mas o desperdiçamos com trivialidades.',
    },
  },
  {
    id: 'seneca-3',
    philosopherSlug: 'seneca',
    prompt: {
      en: 'Where was Seneca born?',
      pt: 'Onde Sêneca nasceu?',
    },
    options: {
      en: ['Córdoba, in Roman Hispania', 'Rome, Italy', 'Athens, Greece', 'Alexandria, Egypt'],
      pt: ['Em Córdoba, na Hispânia romana', 'Em Roma, na Itália', 'Em Atenas, na Grécia', 'Em Alexandria, no Egito'],
    },
    explanation: {
      en: 'He was born in Córdoba, in present-day Spain, to a wealthy equestrian family of Italian origin.',
      pt: 'Nasceu em Córdoba, na atual Espanha, em uma rica família equestre de origem italiana.',
    },
  },
  {
    id: 'seneca-4',
    philosopherSlug: 'seneca',
    prompt: {
      en: 'What paradox did Seneca\'s critics point out about his life?',
      pt: 'Que paradoxo os críticos de Sêneca apontavam em sua vida?',
    },
    options: {
      en: ['He preached detachment while being one of Rome\'s richest men', 'He praised marriage but never married', 'He condemned theatre yet wrote comedies', 'He defended democracy while serving a king'],
      pt: ['Pregava o desapego sendo um dos homens mais ricos de Roma', 'Elogiava o casamento, mas nunca se casou', 'Condenava o teatro, mas escrevia comédias', 'Defendia a democracia enquanto servia a um rei'],
    },
    explanation: {
      en: 'Seneca amassed an immense fortune at court; he answered that the sage may own wealth as long as wealth does not own him.',
      pt: 'Sêneca acumulou uma fortuna imensa na corte; respondia que o sábio pode ter riquezas, desde que elas não o tenham.',
    },
  },
  {
    id: 'seneca-5',
    philosopherSlug: 'seneca',
    prompt: {
      en: 'Complete Seneca\'s famous line: "We suffer more often in ____ than in reality."',
      pt: 'Complete a famosa frase de Sêneca: "Sofremos mais na ____ do que na realidade."',
    },
    options: {
      en: ['imagination', 'memory', 'youth', 'solitude'],
      pt: ['imaginação', 'memória', 'juventude', 'solidão'],
    },
    explanation: {
      en: 'From the Letters to Lucilius: most of our anguish comes from anticipating evils that never arrive.',
      pt: 'Das Cartas a Lucílio: a maior parte de nossa angústia vem de antecipar males que nunca chegam.',
    },
  },
  {
    id: 'seneca-6',
    philosopherSlug: 'seneca',
    prompt: {
      en: 'Besides philosophy, which literary genre made Seneca influential in the Renaissance?',
      pt: 'Além da filosofia, que gênero literário tornou Sêneca influente no Renascimento?',
    },
    options: {
      en: ['Tragedy', 'Epic poetry', 'Pastoral romance', 'Satirical epigram'],
      pt: ['A tragédia', 'A poesia épica', 'O romance pastoral', 'O epigrama satírico'],
    },
    explanation: {
      en: 'His nine blood-soaked tragedies (Medea, Thyestes…) deeply shaped Elizabethan drama, including Shakespeare.',
      pt: 'Suas nove tragédias sangrentas (Medeia, Tiestes…) moldaram profundamente o drama elisabetano, incluindo Shakespeare.',
    },
  },

  // ── Marcus Aurelius ───────────────────────────────────────────────────
  {
    id: 'marcus-1',
    philosopherSlug: 'marcus-aurelius',
    prompt: {
      en: 'What is the origin of the Meditations of Marcus Aurelius?',
      pt: 'Qual é a origem das Meditações de Marco Aurélio?',
    },
    options: {
      en: ['A private notebook never meant for publication', 'Speeches delivered to the Senate', 'Letters to his Stoic teacher', 'A manual written for his son Commodus'],
      pt: ['Um caderno privado que nunca foi destinado à publicação', 'Discursos proferidos no Senado', 'Cartas ao seu mestre estoico', 'Um manual escrito para seu filho Cômodo'],
    },
    explanation: {
      en: 'He wrote it in Greek, for himself, during military campaigns; its original title was "To Himself".',
      pt: 'Ele o escreveu em grego, para si mesmo, durante campanhas militares; o título original era "Para Si Mesmo".',
    },
  },
  {
    id: 'marcus-2',
    philosopherSlug: 'marcus-aurelius',
    prompt: {
      en: 'Marcus Aurelius was the last of which celebrated line of rulers?',
      pt: 'Marco Aurélio foi o último de qual célebre linhagem de governantes?',
    },
    options: {
      en: ['The Five Good Emperors', 'The Julio-Claudian dynasty', 'The Flavian dynasty', 'The Tetrarchs'],
      pt: ['Os Cinco Bons Imperadores', 'A dinastia júlio-claudiana', 'A dinastia flaviana', 'Os Tetrarcas'],
    },
    explanation: {
      en: 'Nerva, Trajan, Hadrian, Antoninus Pius and Marcus Aurelius — an era Gibbon called the happiest in human history.',
      pt: 'Nerva, Trajano, Adriano, Antonino Pio e Marco Aurélio — uma era que Gibbon chamou de a mais feliz da história humana.',
    },
  },
  {
    id: 'marcus-3',
    philosopherSlug: 'marcus-aurelius',
    prompt: {
      en: 'Which catastrophe devastated the empire during his reign?',
      pt: 'Qual catástrofe devastou o império durante seu reinado?',
    },
    options: {
      en: ['The Antonine Plague', 'The eruption of Vesuvius', 'The Great Fire of Rome', 'The sack of Rome by the Goths'],
      pt: ['A Peste Antonina', 'A erupção do Vesúvio', 'O Grande Incêndio de Roma', 'O saque de Roma pelos godos'],
    },
    explanation: {
      en: 'The Antonine Plague (165–180 AD), likely smallpox, killed millions — possibly including Marcus himself.',
      pt: 'A Peste Antonina (165–180 d.C.), provavelmente varíola, matou milhões — possivelmente o próprio Marco.',
    },
  },
  {
    id: 'marcus-4',
    philosopherSlug: 'marcus-aurelius',
    prompt: {
      en: '"What stands in the way becomes the way" expresses which Stoic attitude?',
      pt: '"O que bloqueia o caminho torna-se o caminho" expressa qual atitude estoica?',
    },
    options: {
      en: ['Turning obstacles into opportunities for virtue', 'Fleeing adversity to preserve peace of mind', 'Accumulating wealth against misfortune', 'Withdrawing from public life entirely'],
      pt: ['Transformar obstáculos em oportunidades de virtude', 'Fugir da adversidade para preservar a paz de espírito', 'Acumular riqueza contra o infortúnio', 'Retirar-se completamente da vida pública'],
    },
    explanation: {
      en: 'For the Stoics, every impediment is raw material for exercising patience, courage and justice.',
      pt: 'Para os estoicos, todo impedimento é matéria-prima para exercitar paciência, coragem e justiça.',
    },
  },
  {
    id: 'marcus-5',
    philosopherSlug: 'marcus-aurelius',
    prompt: {
      en: 'How did Marcus Aurelius fund the war effort during the plague years?',
      pt: 'Como Marco Aurélio financiou o esforço de guerra durante os anos de peste?',
    },
    options: {
      en: ['He auctioned imperial palace treasures instead of raising taxes', 'He confiscated senatorial estates', 'He debased the currency tenfold', 'He sold Roman citizenship to barbarians'],
      pt: ['Leiloou tesouros do palácio imperial em vez de aumentar impostos', 'Confiscou propriedades senatoriais', 'Desvalorizou a moeda dez vezes', 'Vendeu cidadania romana aos bárbaros'],
    },
    explanation: {
      en: 'He held a two-month public auction of palace furnishings — a gesture of Stoic frugality remembered for centuries.',
      pt: 'Promoveu um leilão público de dois meses com bens do palácio — um gesto de frugalidade estoica lembrado por séculos.',
    },
  },
  {
    id: 'marcus-6',
    philosopherSlug: 'marcus-aurelius',
    prompt: {
      en: 'In which language did Marcus Aurelius write the Meditations?',
      pt: 'Em que idioma Marco Aurélio escreveu as Meditações?',
    },
    options: {
      en: ['Greek', 'Latin', 'Aramaic', 'Etruscan'],
      pt: ['Grego', 'Latim', 'Aramaico', 'Etrusco'],
    },
    explanation: {
      en: 'Though a Roman emperor, he wrote in Koine Greek — the language of philosophy in his day.',
      pt: 'Embora imperador romano, escreveu em grego koiné — a língua da filosofia em sua época.',
    },
  },
];
