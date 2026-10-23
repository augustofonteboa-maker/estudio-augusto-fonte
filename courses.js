/* =========================================================
   CURSOS DO ESTÚDIO AUGUSTO FONTE
   ---------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar para
   adicionar um curso novo ou uma aula nova.
   A página inteira (cards, aulas, números do topo, preços,
   FAQ) é montada a partir daqui. Veja o README.md.
   ========================================================= */

window.SITE = {
  instagram: "https://www.instagram.com/_augustofonte/",
  site: "https://augustofonte.com",
  /* Link usado quando um curso ainda não tem "checkout" preenchido */
  fallbackCta: "https://www.instagram.com/_augustofonte/"
};

/* O CURSÃO: os cursos abertos são vendidos juntos, por um preço único */
window.BUNDLE = {
  title: "Criativo e motion: o curso completo",
  tagline: "Os dois cursos num só. Do anúncio estático ao motion pronto.",
  price: "R$ 297",
  priceNote: "pagamento único, os dois cursos juntos",
  checkout: "",                 // cole aqui o link de compra do cursão
  extra: ["Acesso aos dois cursos de uma vez", "Mais cursos chegando a este mesmo ambiente"]
};

window.COURSES = [
  /* ------------------------------------------------------ */
  {
    id: "criativos",
    status: "aberto",              // "aberto" | "em-breve"
    accent: "#af5eff",             // cor do curso (cards, abas, detalhes)
    title: "Como Eu Faço Criativos",
    co: "com Orayon",
    short: "Criativos",
    tagline: "Criativo bom não nasce no Figma. Nasce antes.",
    pitch:
      "O processo que uso todo dia para criar anúncios validados e postados: ler a copy, buscar referência, definir a identidade e só depois montar no Figma, gerar a imagem com IA na Orayon e dar movimento no Canva.",
    outcomes: [
      "Ler uma copy e saber o que cada parte pede do design",
      "Montar identidade e hierarquia sem depender de inspiração",
      "Gerar imagem com IA com direção, não no chute"
    ],
    price: "R$ 197",
    priceNote: "pagamento único",
    checkout: "",                  // cole aqui o link de compra
    pdfsLabel: "10 PDFs · 94 páginas",
    tools: ["Figma", "Orayon", "Canva"],
    media: { type: "images", src: ["assets/img/arte-aurea-v1-2.webp", "assets/img/arte-imobiliaria-v1-2.webp"] },
    facts: [
      "+300 anúncios criados em 10 meses",
      "+2.000 peças contando carrosséis",
      "Figma e Canva na versão grátis. O único gasto é crédito na Orayon."
    ],
    modules: [
      {
        title: "Começo",
        lessons: [
          {
            title: "Boas-vindas", dur: "06:20",
            sum: "Quem eu sou, como o curso funciona e as 10 aulas na ordem em que o criativo nasce.",
            points: ["Faço criativo desde que o Facebook barrava anúncio com mais de 20% de texto", "O caminho completo, do briefing à entrega", "Antes de seguir: horário fixo, contas no Figma, Orayon e Canva, e uma copy real para praticar"]
          },
          {
            title: "Apps que vou usar", dur: "03:47",
            sum: "Três ferramentas, um processo. O que sai de uma entra na próxima.",
            points: ["Figma monta e diagrama", "Orayon gera a imagem com IA", "Canva dá movimento ao criativo estático"]
          }
        ]
      },
      {
        title: "Pensar antes de criar",
        lessons: [
          {
            title: "Analisando a copy", dur: "07:57",
            sum: "Todo bom criativo começa com uma boa copy. Aqui você aprende a desmontá-la antes de abrir qualquer ferramenta.",
            points: ["Separe headline, sub e CTA", "Identifique tom e palavra-chave", "Saia com as primeiras ideias visuais"]
          },
          {
            title: "Buscando referências", dur: "09:36",
            sum: "Quem só olha para o próprio nicho fica igual a ele. Dois olhares, dois objetivos.",
            points: ["Dentro e fora do nicho", "Analise cor, tipografia, composição e imagem", "Pegue um elemento de cada referência, nunca a peça inteira"]
          },
          {
            title: "Micro identidade", dur: "14:06",
            sum: "Identidade é o que faz o criativo parecer de alguém. Montada do zero, com o conta-gotas nas próprias referências.",
            points: ["Os pilares da identidade", "Regra 60 · 30 · 10 para distribuir as cores", "Duas identidades montadas passo a passo"]
          }
        ]
      },
      {
        title: "Produção",
        lessons: [
          {
            title: "Formatos", dur: "05:38",
            sum: "O tamanho muda a leitura. Formato vem antes do layout.",
            points: ["Feed, carrossel e stories", "Área segura: headline e CTA longe das bordas", "Checklist para fazer antes de abrir o frame"]
          },
          {
            title: "Criativo no Figma", dur: "13:35",
            sum: "Diagrame o texto antes de pensar na imagem.",
            points: ["Hierarquia: tamanho, peso e espaço decidem o que é lido primeiro", "Modos de leitura: F, Z e centro", "O mesmo processo em nichos diferentes"]
          },
          {
            title: "Imagens na Orayon", dur: "26:24",
            sum: "A IA executa. A direção é sua. Da copy à imagem, com fórmula de prompt em português e inglês.",
            points: ["Escolha o modelo e anexe a referência", "Fórmula de um bom prompt e o Superprompt", "Compare resultados lado a lado e escolha com critério"]
          }
        ]
      },
      {
        title: "Finalização",
        lessons: [
          {
            title: "Vídeo no Canva", dur: "04:36",
            sum: "Criativo por cima, vídeo por baixo.",
            points: ["Exporte o criativo do Figma em PNG, sem fundo", "Suba no Canva e coloque o vídeo de fundo atrás", "Três cliques que resolvem as camadas"]
          },
          {
            title: "Boas práticas", dur: "03:46",
            sum: "Os detalhes fazem o criativo funcionar. Uma revisão final antes de entregar.",
            points: ["Base de tudo: contraste, repetição, alinhamento e proximidade", "Certo × errado, lado a lado", "Sete pontos de revisão"]
          }
        ]
      }
    ],
    flow: {
      title: "Na ordem em que o criativo nasce",
      steps: [
        { t: "Copy", d: "Separe headline, sub e CTA. Entenda o que a peça precisa dizer antes de desenhar." },
        { t: "Referência", d: "Olhe dentro e fora do nicho. Leve um elemento de cada, nunca a peça inteira." },
        { t: "Identidade", d: "Cores, tipografia e formas que fazem a peça parecer de alguém. Regra 60 · 30 · 10." },
        { t: "Formato", d: "Feed, carrossel ou stories. O tamanho muda a leitura e define a área segura." },
        { t: "Figma", d: "Diagrame o texto primeiro. Hierarquia, modo de leitura e só depois a imagem." },
        { t: "Orayon", d: "Gere a imagem com IA usando a fórmula de prompt. Varie e compare antes de escolher." },
        { t: "Canva", d: "Criativo em PNG na frente, vídeo atrás. Estático vira peça em movimento." }
      ]
    },
    faq: [
      ["Preciso saber design para acompanhar?", "Não. O curso começa pela leitura da copy e apresenta cada ferramenta do zero, mostrando só o que você vai usar. Quem já é designer ganha um processo organizado e mais rápido."],
      ["Vou precisar pagar Figma ou Canva?", "Não. As versões gratuitas dos dois dão conta de tudo que o curso ensina. O único gasto é crédito na Orayon, no valor que você quiser recarregar."],
      ["O curso ensina animação?", "A aula 9 mostra como colocar um vídeo por trás do criativo no Canva. Para animar de verdade, o curso de motion é o próximo passo."]
    ]
  },

  /* ------------------------------------------------------ */
  {
    id: "motion",
    status: "aberto",
    accent: "#ff6fae",
    title: "Motion Graphics com Claude",
    co: "",
    short: "Motion",
    tagline: "Motion bom nasce numa conversa.",
    pitch:
      "Você descreve, o Claude anima. Eu mostro o processo que uso no estúdio: identidade, pasta, briefing e o método único, até o MP4 pronto em 16:9 e 9:16, com trilha. Sem entender de edição.",
    outcomes: [
      "Briefar um motion em quatro perguntas e acertar de primeira",
      "Usar o Opus para criar a peça-mãe e o Sonnet para multiplicar",
      "Entregar logo animada, promo, vinheta e intro com trilha"
    ],
    price: "R$ 297",
    priceNote: "pagamento único",
    checkout: "",
    pdfsLabel: "19 PDFs · um por aula e um por módulo",
    tools: ["Claude", "Método único", "Magnific"],
    media: { type: "video", src: "assets/video/jardim-r1-4x5.mp4", poster: "assets/video/jardim-r1-4x5.jpg" },
    facts: [
      "Entrega em MP4, 16:9 e 9:16, com trilha",
      "Você só precisa do plano Pro do Claude e do app no computador",
      "Funciona em qualquer nicho: marca, referência, briefing e método"
    ],
    modules: [
      {
        title: "MD.1 · Boas-vindas",
        lessons: [
          {
            title: "O que já dá pra fazer", dur: "04:02",
            sum: "A vitrine: animações reais feitas só conversando com o Claude, e como juntar as suas numa pasta só.",
            points: ["Logo animada e vinheta", "Promo de produto ou serviço, post animado com números, intro e transição", "Criativo com locução gravada por você ou por IA"]
          },
          {
            title: "Quem sou eu", dur: "03:12",
            sum: "Designer primeiro, IA depois. A ferramenta muda todo mês; o olhar que decide o que é bom continua sendo seu.",
            points: ["7 anos de mercado, começando em agência", "Motion era caro e lento; agora é conversa", "Não é um programa: é o meu jeito de fazer motion"]
          },
          {
            title: "O método e o mecanismo único", dur: "01:54",
            sum: "Primeiro acerta, depois multiplica.",
            points: ["Opus 5.5 entende o projeto e acerta a peça-mãe", "Sonnet 5.5 produz as próximas, mais rápido e gastando menos limite", "O mecanismo único garante que tudo saia com a mesma cara"]
          },
          {
            title: "O que você precisa ter", dur: "01:31",
            sum: "Duas coisas: o plano Claude Pro e o app do Claude no computador.",
            points: ["Assine pelo site da Anthropic: costuma sair mais barato que pela loja de apps", "O app desktop é onde você conecta as pastas", "Confira o valor atual em claude.com/pricing"]
          }
        ]
      },
      {
        title: "MD.2 · Preparação",
        lessons: [
          {
            title: "Identidade visual", dur: "03:13",
            sum: "O Claude só é fiel ao que você entrega. A marca diz quem é; a referência diz como se move.",
            points: ["Logo em SVG, cores em HEX, manual e artes já feitas", "Pinterest: de 3 a 5 referências fortes", "Super mix de ID: a marca define cor e fonte, a referência empresta só o movimento"]
          },
          {
            title: "Montar a pasta no PC", dur: "02:30",
            sum: "Pasta organizada é briefing. Cinco minutos economizam uma hora de refação.",
            points: ["01-REFS e 02-ID como entrada", "03-SAIDA como pasta de saída", "Links soltos num links.txt"]
          }
        ]
      },
      {
        title: "MD.3 · Montar projeto no Claude",
        lessons: [
          {
            title: "Anexar pastas", dur: "02:48",
            sum: "No app desktop você conecta pastas do computador: uma como input, outra como output.",
            points: ["Crie o projeto e adicione as pastas", "Libere só as pastas do projeto, nunca o disco inteiro", "O que entra nunca se mistura com o que sai"]
          },
          {
            title: "Dar contexto", dur: "05:08",
            sum: "Quatro respostas transformam um pedido vago num briefing que o Claude acerta.",
            points: ["Para onde vai, qual a ideia, como quer e o que quer fazer", "Pode falar por áudio, o Claude entende", "Peça que ele faça perguntas: o contexto fica mais qualificado"]
          }
        ]
      },
      {
        title: "MD.4 · O método único",
        lessons: [
          {
            title: "O que é o mecanismo único", dur: "01:51",
            sum: "É o meu jeito de fazer motion, empacotado para o Claude seguir. Em vez de explicar tudo toda vez, ele já vem pronto.",
            points: ["Direção de arte: a marca do projeto ou 12 estilos prontos", "Timing e movimento: curvas e ritmo de estúdio", "Trilha sincronizada e entrega em MP4 16:9 e 9:16"]
          },
          {
            title: "Instalar o método", dur: "01:55",
            sum: "Fica no GitHub. Você baixa um arquivo .zip, envia nas configurações do Claude e liga a chavinha. Leva dois minutos.",
            points: ["Baixe o .zip e não descompacte", "Ligue execução de código e criação de arquivos", "Opcional: instalação pelo Claude Code, com dois comandos"]
          },
          {
            title: "Referências do método", dur: "02:05",
            sum: "Os três lugares onde busco referência de motion e que alimentam o padrão.",
            points: ["Motion Claude, Prompt Motion e WhatShips", "Assista com olho de designer: ritmo, entrada e saída do texto", "Referência boa não se copia, se traduz para a marca"]
          },
          {
            title: "Como chamar o método", dur: "02:49",
            sum: "Digite /motion-studio e escreva o pedido na mesma mensagem.",
            points: ["Comando e pedido na mesma mensagem", "Opus até validar, Sonnet para multiplicar", "Lista de produção: deixe rodando e volte com tudo pronto"]
          }
        ]
      },
      {
        title: "MD.5 · Mão na massa",
        lessons: [
          {
            title: "Gerar o roteiro", dur: "02:53",
            sum: "Antes de animar, roteiro. Só com animações ou com voz de narrador, gravada por você ou gerada por IA.",
            points: ["Dois caminhos de roteiro", "Voz: gravar, Magnific ou ElevenLabs", "Peça o roteiro antes do motion e aprove primeiro"]
          },
          {
            title: "Chamar o método e gerar", dur: "08:31",
            sum: "O grande momento: anexar o áudio, descrever o que quer e acompanhar o fluxo do Opus ao Sonnet até as peças finais.",
            points: ["Série de quatro motions, nos dois formatos", "Um motion aprovado vira uma linha de produção", "Projeto com identidade salva: o próximo pedido nasce pronto"]
          }
        ]
      }
    ],
    flow: {
      title: "Do pedido ao motion pronto",
      steps: [
        { t: "Marca", d: "Logo em SVG, cores em HEX e artes já feitas. Sem isso o Claude inventa." },
        { t: "Referência", d: "De 3 a 5 movimentos que você gosta. Eles emprestam o ritmo, nunca a identidade." },
        { t: "Pasta", d: "01-REFS e 02-ID de entrada, 03-SAIDA de saída. Pasta organizada é briefing." },
        { t: "Briefing", d: "Para onde, qual a ideia, como e o quê. Quatro respostas e o pedido deixa de ser vago." },
        { t: "Roteiro", d: "Só animação ou com narrador. Você aprova o roteiro antes de animar qualquer coisa." },
        { t: "Opus", d: "Cria a peça-mãe e ajusta até você validar o ritmo, a marca e o formato." },
        { t: "Sonnet", d: "Com a peça aprovada, produz as próximas no mesmo padrão: variações, formatos, séries." }
      ]
    },
    faq: [
      ["Preciso saber motion ou After Effects?", "Não. O curso não ensina um programa de animação. Você descreve, o Claude executa, e o olhar de designer entra na direção: briefing, referência e escolha do que vale."],
      ["O que eu preciso ter para acompanhar?", "O plano Claude Pro e o app do Claude no computador, Mac ou Windows. No navegador você não conecta as pastas do computador."],
      ["Por que Opus 5.5 e Sonnet 5.5?", "O Opus entende o projeto e acerta a primeira peça. Depois de validar, o Sonnet produz as próximas no mesmo padrão: é mais rápido e pesa menos no seu limite de uso."],
      ["Preciso gravar a minha voz?", "Não. O roteiro pode ser só com animações. Se quiser narração, você grava ou gera a voz por IA, com apps como Magnific e ElevenLabs."]
    ]
  },

  /* ------------------------------------------------------ */
  {
    id: "edicao",
    status: "em-breve",
    accent: "#5be3b5",
    title: "Editar vídeo com o Claude",
    short: "Edição",
    tagline: "Você grava no celular. O Claude edita.",
    pitch:
      "Próximo curso em planejamento: você grava o vídeo no celular, manda para o Claude e o método único edita tudo sozinho."
  }
  /* Para adicionar outro curso, copie um bloco acima, mude o "id" e preencha. */
];

/* Perguntas gerais (aparecem no fim da página) */
window.FAQ_GERAL = [
  ["Em que ordem devo fazer os cursos?", "Se você já cria criativos, comece pelo de motion e leve o que já tem. Se quer aprender o processo inteiro, comece por criativos: ele dá a base de copy, referência e identidade que o motion também usa."],
  ["Recebo material de apoio?", "Sim. Cada aula tem um PDF complementar, e o curso de motion tem também um PDF por módulo."],
  ["Vem mais curso por aí?", "Sim. Os próximos cursos entram aqui, neste mesmo ambiente, conforme eu gravar. O próximo em planejamento é editar vídeo com o Claude. Acompanhe pelo Instagram, @_augustofonte."],
  ["Ficou alguma dúvida?", "Me chama no Instagram, @_augustofonte."]
];
