// Shared service model: main offers stay prominent; specialist pages target Vienna SEO and ads.
export type ServiceIcon =
  | "roof"
  | "tool"
  | "water"
  | "gutter"
  | "renovate"
  | "flat"
  | "metal"
  | "inspect"
  | "storm"
  | "window"
  | "insulation";

export type Service = {
  slug: string;
  label: string;
  short: string;
  number: string;
  icon: ServiceIcon;
  /** Main services appear on the homepage; specialist pages live on the hub. */
  group: "main" | "specialist";
  /** Curated related slugs for internal linking without listing every service. */
  related: string[];
  title: string;
  description: string;
  heading: string;
  intro: string;
  overviewTitle: string;
  overview: string;
  items: { title: string; description: string }[];
  steps: { title: string; description: string }[];
  factors: string[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "dacheindeckung",
    label: "Dacheindeckung",
    short: "Ein neuer Anfang für Ihr Dach.",
    number: "01",
    icon: "roof",
    group: "main",
    related: ["dachsanierung", "dachdaemmung", "dachzubehoer", "spenglerarbeiten"],
    title: "Dacheindeckung in Wien",
    description:
      "Dacheindeckung in Wien: Neueindeckung und Austausch der Dachhaut. Informationen zu Material, Untergrund, Ablauf und Angebot bei Rundrdach.",
    heading: "Ein neues Dach.\nVon Grund auf durchdacht.",
    intro:
      "Eine Dacheindeckung beginnt mit dem Blick auf das gesamte Dach: Aufbau, Untergrund, Anschlüsse und die passende Dachhaut. Wir besprechen Ihr Vorhaben in Wien und klären, welche Ausführung zu Ihrem Gebäude passt.",
    overviewTitle: "Mehr als die sichtbare Oberfläche.",
    overview:
      "Die Deckung schützt das Gebäude vor Witterung. Damit sie ihre Aufgabe erfüllt, müssen Dachneigung, Unterkonstruktion und die Details an First, Traufe und Durchdringungen zusammenpassen. Bei der Planung werden bestehender Zustand und gewünschte Nutzung berücksichtigt.",
    items: [
      {
        title: "Neueindeckung",
        description:
          "Der Dachaufbau und die geeignete Eindeckung werden gemeinsam betrachtet. Material und Ausführung richten sich nach Gebäude und Dachform.",
      },
      {
        title: "Bestehende Dachhaut",
        description:
          "Vor einem Austausch wird geprüft, welche Bauteile erhalten werden können und wo weitere Maßnahmen erforderlich sind.",
      },
      {
        title: "Materialauswahl",
        description:
          "Ziegel, Dachsteine oder Metall sind mögliche Lösungen. Das konkrete Angebot wird nach technischer Prüfung und Verfügbarkeit festgelegt.",
      },
      {
        title: "Anschlüsse & Abschlüsse",
        description:
          "First, Traufe und Übergänge verdienen besondere Aufmerksamkeit. Ihre Ausführung wird auf die gewählte Deckung abgestimmt.",
      },
    ],
    steps: [
      { title: "Dach besichtigen", description: "Zustand, Geometrie und Zugänglichkeit aufnehmen." },
      { title: "Ausführung festlegen", description: "Aufbau, Material und die notwendigen Details besprechen." },
      { title: "Dach eindecken", description: "Vorbereitung und Montage nach vereinbartem Leistungsumfang." },
      { title: "Gemeinsam prüfen", description: "Ausführung besprechen und Hinweise zur Wartung übergeben." },
    ],
    factors: [
      "Dachfläche und Dachneigung",
      "Zustand von Untergrund und Aufbau",
      "Gewähltes Material und Anschlüsse",
      "Gerüst, Zugang und Abtransport",
    ],
    faqs: [
      {
        question: "Wann ist eine Neueindeckung sinnvoll?",
        answer:
          "Wenn die Dachhaut umfassend geschädigt ist oder eine größere Sanierung geplant wird, kann eine Neueindeckung sinnvoll sein. Ob eine Reparatur ausreicht, lässt sich erst nach einer Besichtigung beurteilen.",
      },
      {
        question: "Welches Material passt zu meinem Dach?",
        answer:
          "Dachneigung, Tragfähigkeit, Gestaltung und vorhandener Aufbau beeinflussen die Wahl. Die technisch geeigneten und tatsächlich angebotenen Materialien werden bei der Planung geklärt.",
      },
      {
        question: "Wie lange dauern die Arbeiten?",
        answer:
          "Die Dauer hängt von Fläche, Dachform, Umfang und Wetter ab. Ein realistischer Zeitplan wird nach Prüfung des Projekts abgestimmt.",
      },
      {
        question: "Was kostet eine Dacheindeckung in Wien?",
        answer:
          "Ein pauschaler Quadratmeterpreis bildet ein individuelles Dach häufig nicht ausreichend ab. Das Angebot berücksichtigt Material, Untergrund, Anschlüsse und Zugang.",
      },
      {
        question: "Muss das gesamte Dach erneuert werden?",
        answer:
          "Nicht immer. Der Zustand der einzelnen Schichten und die angestrebte Nutzung entscheiden darüber, was erhalten werden kann und was erneuert werden sollte.",
      },
    ],
  },
  {
    slug: "dachreparatur",
    label: "Dachreparatur",
    short: "Kleine Schäden ernst nehmen.",
    number: "02",
    icon: "tool",
    group: "main",
    related: ["sturmschaden-dach", "dachwartung", "dachabdichtung", "dachsanierung"],
    title: "Dachreparatur in Wien",
    description:
      "Dachreparatur in Wien: Schäden, undichte Anschlüsse und beschädigte Dachflächen prüfen lassen. Ablauf und Angebot bei Rundrdach kennenlernen.",
    heading: "Schäden erkennen.\nDas Dach gezielt reparieren.",
    intro:
      "Feuchte Stellen, verschobene Deckelemente oder beschädigte Anschlüsse können unterschiedliche Ursachen haben. Bei einer Dachreparatur in Wien steht deshalb zuerst die Prüfung des Schadens und seiner Ursache im Mittelpunkt.",
    overviewTitle: "Die Ursache zählt. Nicht nur die Stelle.",
    overview:
      "Wasser kann im Dachaufbau Wege zurücklegen. Die sichtbare Stelle im Innenraum zeigt daher nicht automatisch den Eintrittspunkt. Eine gezielte Prüfung hilft, den erforderlichen Eingriff einzugrenzen und Folgeschäden zu berücksichtigen.",
    items: [
      {
        title: "Beschädigte Deckung",
        description:
          "Defekte oder verschobene Deckelemente werden geprüft. Der Austausch muss zum vorhandenen System passen.",
      },
      {
        title: "Undichte Anschlüsse",
        description:
          "Übergänge an Kaminen, Einbauten und Dachrändern werden auf Schäden und geeignete Reparaturmöglichkeiten untersucht.",
      },
      {
        title: "Spuren von Feuchtigkeit",
        description:
          "Die mögliche Eintrittsstelle und der betroffene Aufbau werden gemeinsam betrachtet, bevor eine Maßnahme festgelegt wird.",
      },
      {
        title: "Reparatur oder Sanierung?",
        description:
          "Ist der Schaden begrenzt, kann eine lokale Reparatur ausreichen. Bei größeren Mängeln werden weitergehende Möglichkeiten erklärt.",
      },
    ],
    steps: [
      { title: "Schaden beschreiben", description: "Beobachtungen, Fotos und betroffene Bereiche zusammentragen." },
      { title: "Ursache prüfen", description: "Dachhaut, Anschlüsse und mögliche Wasserwege untersuchen." },
      { title: "Gezielt instand setzen", description: "Die abgestimmte Reparatur durchführen." },
      { title: "Zustand besprechen", description: "Ergebnis und möglichen weiteren Handlungsbedarf erklären." },
    ],
    factors: [
      "Art und Ausmaß des Schadens",
      "Material und Alter des Dachaufbaus",
      "Erreichbarkeit der Schadstelle",
      "Mögliche Schäden an angrenzenden Bauteilen",
    ],
    faqs: [
      {
        question: "Was soll ich bei einer undichten Stelle tun?",
        answer:
          "Schützen Sie betroffene Innenbereiche, soweit das sicher möglich ist, und dokumentieren Sie den Schaden. Betreten Sie das Dach nicht selbst. Eine Prüfung vor Ort ist für die weitere Einschätzung wichtig.",
      },
      {
        question: "Kann nur ein Teil des Dachs repariert werden?",
        answer:
          "Bei einem örtlich begrenzten Schaden ist eine Teilreparatur häufig eine mögliche Lösung. Die Eignung hängt vom Zustand des übrigen Dachs und der Materialkompatibilität ab.",
      },
      {
        question: "Ist eine feuchte Zimmerdecke immer ein Dachschaden?",
        answer:
          "Nein. Auch Leitungen, Kondensation oder andere Bauteile können eine Rolle spielen. Eine Ferndiagnose allein anhand einer Beschreibung ist nicht verlässlich.",
      },
      {
        question: "Gibt es einen Rund-um-die-Uhr-Notdienst?",
        answer:
          "Ein 24-Stunden-Notdienst wird derzeit nicht zugesagt. Erreichbarkeit und mögliche Termine müssen direkt abgestimmt werden.",
      },
      {
        question: "Wie wird die Reparatur kalkuliert?",
        answer:
          "Die Kalkulation berücksichtigt Schadensumfang, Material, Zugang und die erforderliche Vorbereitung. Das konkrete Angebot folgt der Bewertung des Vorhabens.",
      },
    ],
  },
  {
    slug: "dachabdichtung",
    label: "Dachabdichtung",
    short: "Wasser gehört nach draußen.",
    number: "03",
    icon: "water",
    group: "main",
    related: ["flachdachsanierung", "dachdaemmung", "dachreparatur", "spenglerarbeiten"],
    title: "Dachabdichtung in Wien",
    description:
      "Dachabdichtung in Wien für Flachdächer und Dachterrassen. Untergrund, Anschlüsse und Entwässerung verstehen und ein Angebot bei Rundrdach anfragen.",
    heading: "Dicht bis ins Detail.\nAuch auf flachen Dächern.",
    intro:
      "Bei Flachdächern und Dachterrassen muss die Abdichtung zum Aufbau und zur Nutzung passen. Rundrdach ist Ihr Ansprechpartner für die Planung einer Dachabdichtung in Wien – vom Untergrund bis zu den Übergängen.",
    overviewTitle: "Ein abgestimmtes System statt Einzelmaßnahmen.",
    overview:
      "Eine Abdichtung funktioniert im Zusammenspiel von Fläche, Anschlüssen und Entwässerung. Ob eine vorhandene Schicht weiter genutzt werden kann, muss geprüft werden. Wärmedämmung und Abdichtung haben unterschiedliche Aufgaben und werden getrennt bewertet.",
    items: [
      {
        title: "Flachdachflächen",
        description:
          "Vorhandener Aufbau, Gefälle und Zustand bilden die Grundlage für die Wahl eines geeigneten Abdichtungssystems.",
      },
      {
        title: "Dachterrassen",
        description:
          "Bei genutzten Flächen werden Beanspruchung, Schutzlagen und die Übergänge zu Türen und aufgehenden Bauteilen berücksichtigt.",
      },
      {
        title: "Ränder & Durchdringungen",
        description: "Anschlüsse, Dachränder und Einbauten werden als Teil der gesamten Abdichtung betrachtet.",
      },
      {
        title: "Entwässerung",
        description:
          "Abläufe und die vorgesehene Wasserführung werden bei der Planung einbezogen, damit die Fläche nicht isoliert betrachtet wird.",
      },
    ],
    steps: [
      { title: "Aufbau aufnehmen", description: "Nutzung, Schichten und Feuchtigkeit prüfen." },
      { title: "System abstimmen", description: "Material und Details für den vorhandenen Untergrund wählen." },
      { title: "Fläche vorbereiten", description: "Untergrund und Übergänge für die Ausführung vorbereiten." },
      { title: "Abdichtung prüfen", description: "Fertige Ausführung und Pflegehinweise besprechen." },
    ],
    factors: [
      "Zustand und Feuchtigkeit des Untergrunds",
      "Fläche, Gefälle und Entwässerung",
      "Anzahl der Anschlüsse und Einbauten",
      "Nutzung und erforderliche Schutzlagen",
    ],
    faqs: [
      {
        question: "Ist Abdichtung das Gleiche wie Dämmung?",
        answer:
          "Nein. Die Abdichtung schützt vor eindringendem Wasser. Die Wärmedämmung begrenzt Wärmeverluste. Beide müssen im Dachaufbau sinnvoll zusammenwirken.",
      },
      {
        question: "Welche Abdichtungsmaterialien werden verwendet?",
        answer:
          "Je nach Untergrund und Nutzung kommen unterschiedliche Systeme infrage. Die tatsächlich angebotene Ausführung wird nach einer Prüfung festgelegt; ein bestimmtes System wird nicht pauschal zugesagt.",
      },
      {
        question: "Kann die alte Abdichtung bleiben?",
        answer:
          "Das hängt von Zustand, Haftung, Feuchtigkeit und dem geplanten System ab. Eine vorhandene Schicht sollte nicht ohne Bewertung einfach überarbeitet werden.",
      },
      {
        question: "Was passiert mit stehenden Wasserflächen?",
        answer:
          "Gefälle und Entwässerung müssen geprüft werden. Eine neue Abdichtung allein behebt nicht automatisch alle Ursachen für stehendes Wasser.",
      },
      {
        question: "Wovon hängen die Kosten ab?",
        answer:
          "Fläche, Vorbereitung, Anschlüsse, Material und Schutzlagen bestimmen den Aufwand. Diese Punkte werden für ein projektbezogenes Angebot erfasst.",
      },
    ],
  },
  {
    slug: "dachzubehoer",
    label: "Dachzubehör",
    short: "Die Details machen das Ganze.",
    number: "04",
    icon: "gutter",
    group: "main",
    related: ["spenglerarbeiten", "dachwartung", "dacheindeckung", "dachfenster"],
    title: "Dachzubehör und Dachentwässerung in Wien",
    description:
      "Dachzubehör in Wien: Informationen zu Dachrinnen, Fallrohren, Anschlüssen und Schneeschutz. Passende Ergänzungen für Ihr Dach mit Rundrdach planen.",
    heading: "Ein Dach ist erst\nmit seinen Details komplett.",
    intro:
      "Dachrinnen, Abschlüsse und Schutzbauteile erfüllen konkrete Aufgaben. Bei Dachzubehör in Wien stehen deshalb der vorhandene Dachaufbau und die passende Ausführung im Vordergrund – nicht ein einzelnes Produkt von der Stange.",
    overviewTitle: "Passend zur Dachhaut. Und zum Gebäude.",
    overview:
      "Zubehör muss mit dem vorhandenen Material und der Dachgeometrie zusammenpassen. Auch Wasserführung, Befestigung und Übergänge sind wichtig. Die Lieferung und Montage geeigneter Bauteile werden im individuellen Leistungsumfang vereinbart.",
    items: [
      {
        title: "Dachrinnen & Fallrohre",
        description:
          "Die Dachentwässerung wird passend zur Fläche und den vorgesehenen Ableitungswegen betrachtet.",
      },
      {
        title: "First & Dachabschlüsse",
        description:
          "Abschlüsse und Übergänge werden auf die Dachdeckung abgestimmt, damit Material und Ausführung zusammenpassen.",
      },
      {
        title: "Anschlussbleche",
        description:
          "Bleche an Übergängen und Einbauten erfüllen eine wichtige Aufgabe bei der Wasserführung. Abmessung und Befestigung sind projektbezogen.",
      },
      {
        title: "Schneeschutz",
        description:
          "Ob und welche Schneeschutzlösung erforderlich ist, muss anhand von Dach, Nutzung und örtlichen Anforderungen geklärt werden.",
      },
    ],
    steps: [
      { title: "Bedarf klären", description: "Vorhandene Bauteile und gewünschte Ergänzungen aufnehmen." },
      { title: "Kompatibilität prüfen", description: "Material, Abmessung und Befestigung abstimmen." },
      { title: "Umfang vereinbaren", description: "Lieferung, Montage und notwendige Vorarbeiten festlegen." },
      { title: "Bauteile ergänzen", description: "Vereinbarte Ausführung und Wartungshinweise besprechen." },
    ],
    factors: [
      "Material und Abmessungen",
      "Länge und Anzahl der Bauteile",
      "Befestigung und vorhandener Untergrund",
      "Zugang und Umfang der Montage",
    ],
    faqs: [
      {
        question: "Kann Zubehör an einem bestehenden Dach ergänzt werden?",
        answer:
          "Das ist je nach Zustand und System möglich. Zunächst werden Material, Geometrie und Befestigung geprüft.",
      },
      {
        question: "Verkauft Rundrdach Zubehör online?",
        answer:
          "Diese Website ist kein Onlineshop. Lieferung und Montage werden im Rahmen einer projektbezogenen Anfrage abgestimmt.",
      },
      {
        question: "Wann sollten Dachrinnen geprüft werden?",
        answer:
          "Sichtbare Undichtigkeiten, beschädigte Halter oder ein unzureichender Wasserablauf sind Gründe für eine Prüfung. Reinigung und sichere Erreichbarkeit sollten dabei ebenfalls besprochen werden.",
      },
      {
        question: "Passt jedes Zubehör zu jedem Dach?",
        answer:
          "Nein. Material, Befestigung und Ausführung müssen auf die vorhandene Deckung und den Aufbau abgestimmt werden.",
      },
      {
        question: "Kann ich mehrere Arbeiten gemeinsam anfragen?",
        answer:
          "Ja. Beschreiben Sie in der Anfrage, ob Zubehör zusammen mit einer Reparatur, Neueindeckung oder Abdichtung geplant ist.",
      },
    ],
  },
  {
    slug: "dachsanierung",
    label: "Dachsanierung",
    short: "Wenn mehr als eine Reparatur nötig ist.",
    number: "05",
    icon: "renovate",
    group: "specialist",
    related: ["dacheindeckung", "dachreparatur", "dachdaemmung", "dachwartung"],
    title: "Dachsanierung in Wien",
    description:
      "Dachsanierung in Wien: umfassende Erneuerung von Dachhaut, Aufbau und Anschlüssen. Ablauf, Planung und Angebot bei Rundrdach.",
    heading: "Das Dach erneuern.\nMit Blick auf das Ganze.",
    intro:
      "Eine Dachsanierung in Wien geht über einzelne Schadstellen hinaus. Aufbau, Deckung und Anschlüsse werden gemeinsam betrachtet, damit die Maßnahme zum Gebäude und zum tatsächlichen Zustand passt.",
    overviewTitle: "Sanierung heißt: priorisieren und abstimmen.",
    overview:
      "Nicht jedes Dach braucht eine komplette Erneuerung. Manchmal genügt eine gezielte Teilmaßnahme, manchmal ist ein neuer Aufbau sinnvoll. Die Entscheidung hängt von Zustand, Feuchtigkeit, Tragfähigkeit und den gewünschten Eigenschaften ab – und wird erst nach einer Prüfung festgelegt.",
    items: [
      {
        title: "Zustandsaufnahme",
        description:
          "Dachhaut, Unterkonstruktion, Anschlüsse und sichtbare Feuchtespuren werden erfasst, bevor der Umfang festgelegt wird.",
      },
      {
        title: "Teil- oder Vollsanierung",
        description:
          "Je nach Schadensbild kann eine begrenzte Erneuerung ausreichen oder ein größerer Eingriff erforderlich sein.",
      },
      {
        title: "Aufbau & Schichten",
        description:
          "Unterspannbahn, Lattung, Dämmung und Deckung werden nicht isoliert betrachtet, sondern als zusammenhängendes System.",
      },
      {
        title: "Anschlüsse & Details",
        description:
          "First, Traufe, Durchdringungen und Übergänge werden in die Planung einbezogen, weil sie oft entscheidend für die Dauerhaftigkeit sind.",
      },
    ],
    steps: [
      { title: "Vorhaben klären", description: "Beobachtungen, Nutzungsziele und bekannte Schäden aufnehmen." },
      { title: "Dach bewerten", description: "Aufbau und Handlungsbedarf vor Ort oder anhand vorliegender Angaben prüfen." },
      { title: "Umfang abstimmen", description: "Erforderliche Arbeiten und sinnvolle Alternativen besprechen." },
      { title: "Sanierung umsetzen", description: "Vereinbarten Leistungsumfang ausführen und Ergebnis prüfen." },
    ],
    factors: [
      "Gesamtzustand von Dachhaut und Untergrund",
      "Fläche, Dachform und Zugänglichkeit",
      "Erforderliche Erneuerung von Schichten und Anschlüssen",
      "Gerüst, Entsorgung und begleitende Arbeiten",
    ],
    faqs: [
      {
        question: "Worin unterscheidet sich Sanierung von Reparatur?",
        answer:
          "Eine Reparatur behebt oft einen örtlich begrenzten Schaden. Eine Sanierung betrifft in der Regel größere Bereiche oder mehrere Schichten des Dachaufbaus. Die Grenze wird anhand des Zustands und der Ziele festgelegt.",
      },
      {
        question: "Muss das Dach vollständig erneuert werden?",
        answer:
          "Nicht unbedingt. Erhaltenswerte Bauteile können bleiben, wenn sie technisch und wirtschaftlich sinnvoll nutzbar sind. Das zeigt erst die Bewertung.",
      },
      {
        question: "Kann eine Sanierung mit Dämmung kombiniert werden?",
        answer:
          "Ja, sofern Aufbau, Statik und Abdichtung dazu passen. Wärmedämmung und Dachhaut werden als getrennte, aber zusammenwirkende Themen geplant.",
      },
      {
        question: "Wie lange dauert eine Dachsanierung in Wien?",
        answer:
          "Die Dauer hängt von Umfang, Wetter, Material und Zugang ab. Ein realistischer Zeitplan folgt nach Klärung des Leistungsumfangs.",
      },
      {
        question: "Was kostet eine Dachsanierung?",
        answer:
          "Pauschalpreise sind selten aussagekräftig. Material, Aufbau, Anschlüsse und Zugang bestimmen den Aufwand. Das Angebot wird projektbezogen erstellt.",
      },
    ],
  },
  {
    slug: "flachdachsanierung",
    label: "Flachdachsanierung",
    short: "Flache Dächer brauchen ein System.",
    number: "06",
    icon: "flat",
    group: "specialist",
    related: ["dachabdichtung", "dachdaemmung", "dachwartung", "dachsanierung"],
    title: "Flachdachsanierung in Wien",
    description:
      "Flachdachsanierung in Wien: Abdichtung, Gefälle, Anschlüsse und Aufbau prüfen und erneuern. Informationen und Angebot bei Rundrdach.",
    heading: "Flachdächer sanieren.\nFläche, Rand und Ablauf.",
    intro:
      "Bei einer Flachdachsanierung in Wien zählen Untergrund, Gefälle, Entwässerung und Anschlüsse ebenso wie die eigentliche Abdichtung. Wir klären, welche Erneuerung für Ihr Gebäude sinnvoll ist.",
    overviewTitle: "Ein Flachdach funktioniert nur als Ganzes.",
    overview:
      "Stehendes Wasser, undichte Ränder oder gealterte Abdichtungen können unterschiedliche Ursachen haben. Eine Sanierung betrachtet deshalb nicht nur die Fläche, sondern auch Abläufe, Aufkantungen und angrenzende Bauteile. Ob Überarbeitung oder Neuaufbau möglich ist, entscheidet der Zustand.",
    items: [
      {
        title: "Abdichtung erneuern",
        description:
          "Bestehende Schichten werden bewertet. Die gewählte Ausführung richtet sich nach Untergrund, Nutzung und technischer Eignung.",
      },
      {
        title: "Gefälle & Entwässerung",
        description:
          "Abläufe und Wasserführung werden geprüft, weil eine neue Abdichtung allein stehendes Wasser nicht immer behebt.",
      },
      {
        title: "Ränder & Aufkantungen",
        description:
          "Anschlüsse an Attika, Wänden und Einbauten sind häufig kritische Punkte und werden in die Maßnahme einbezogen.",
      },
      {
        title: "Genutzte Flächen",
        description:
          "Bei Dachterrassen oder begehbaren Bereichen spielen Schutzlagen und Beanspruchung eine zusätzliche Rolle.",
      },
    ],
    steps: [
      { title: "Fläche aufnehmen", description: "Aufbau, Feuchtigkeit, Abläufe und Nutzung erfassen." },
      { title: "Sanierungsvariante wählen", description: "Überarbeitung, Teilmaßnahme oder Neuaufbau abstimmen." },
      { title: "Untergrund vorbereiten", description: "Notwendige Vorarbeiten und Anschlüsse festlegen." },
      { title: "Abdichtung ausführen", description: "Vereinbartes System montieren und Ergebnis besprechen." },
    ],
    factors: [
      "Zustand und Feuchtigkeit des bestehenden Aufbaus",
      "Fläche, Gefälle und Anzahl der Abläufe",
      "Anschlüsse, Einbauten und Nutzung der Fläche",
      "Erforderliche Schutzlagen und Zugänglichkeit",
    ],
    faqs: [
      {
        question: "Wann ist eine Flachdachsanierung sinnvoll?",
        answer:
          "Wiederkehrende Undichtigkeiten, stark gealterte Abdichtung oder unzureichende Entwässerung können Anlass sein. Ob eine lokale Reparatur ausreicht, zeigt die Prüfung.",
      },
      {
        question: "Kann die alte Abdichtung überarbeitet werden?",
        answer:
          "Das hängt von Haftung, Feuchtigkeit und Systemverträglichkeit ab. Eine vorhandene Schicht sollte nicht ohne Bewertung einfach überdeckt werden.",
      },
      {
        question: "Gehört Dämmung zur Flachdachsanierung?",
        answer:
          "Nicht zwingend. Abdichtung und Wärmedämmung haben unterschiedliche Aufgaben. Ob beides gemeinsam geplant wird, hängt vom Aufbau und vom Ziel ab.",
      },
      {
        question: "Was ist mit Dachterrassen?",
        answer:
          "Genutzte Flächen erfordern oft zusätzliche Schutzlagen und sorgfältige Tür- und Wandanschlüsse. Der Umfang wird projektbezogen festgelegt.",
      },
      {
        question: "Wovon hängt der Preis ab?",
        answer:
          "Fläche, Vorbereitung, Anschlüsse, Material und Entwässerung bestimmen den Aufwand. Ein pauschaler Quadratmeterpreis ersetzt keine Bewertung.",
      },
    ],
  },
  {
    slug: "spenglerarbeiten",
    label: "Spenglerarbeiten",
    short: "Metall am Dach – präzise gefügt.",
    number: "07",
    icon: "metal",
    group: "specialist",
    related: ["dachzubehoer", "dacheindeckung", "dachreparatur", "dachfenster"],
    title: "Spenglerarbeiten in Wien",
    description:
      "Spenglerarbeiten in Wien: Dachrinnen, Anschlussbleche, Einfassungen und Metalldetails am Dach. Planung und Angebot bei Rundrdach.",
    heading: "Blech und Abschluss.\nWo Wasser geführt wird.",
    intro:
      "Spenglerarbeiten in Wien betreffen die metallenen Details am Dach: Rinnen, Fallrohre, Einfassungen und Anschlüsse. Sie müssen zur Dachhaut und zur Wasserführung passen – nicht nur optisch, sondern technisch.",
    overviewTitle: "Metallarbeiten sind Teil des Dachsystems.",
    overview:
      "Anschlussbleche, Kehlen und Einfassungen schützen Übergänge, an denen Deckungen und Aufbauten zusammentreffen. Material, Abmessung und Befestigung richten sich nach dem vorhandenen Dach und dem geplanten Leistungsumfang. Eine pauschale Produktwahl ohne Prüfung ist selten sinnvoll.",
    items: [
      {
        title: "Dachrinnen & Fallrohre",
        description:
          "Entwässerungsbauteile werden auf Länge, Gefälle und Ableitungsweg abgestimmt.",
      },
      {
        title: "Anschluss- und Einfassungsbleche",
        description:
          "Übergänge an Wänden, Kaminen und Einbauten werden so geplant, dass Wasser kontrolliert abgeführt wird.",
      },
      {
        title: "Kehlen & Abschlüsse",
        description:
          "Kritische Stellen in der Dachfläche erhalten passende Metalldetails, abgestimmt auf die Deckung.",
      },
      {
        title: "Reparatur bestehender Bauteile",
        description:
          "Beschädigte oder undichte Blechteile können je nach Zustand erneuert oder ergänzt werden.",
      },
    ],
    steps: [
      { title: "Details aufnehmen", description: "Vorhandene Blechteile, Material und Anschlusssituation prüfen." },
      { title: "Ausführung festlegen", description: "Abmessungen, Material und Montageumfang abstimmen." },
      { title: "Bauteile vorbereiten", description: "Passende Teile und notwendige Vorarbeiten planen." },
      { title: "Montage prüfen", description: "Ausgeführte Anschlüsse und Pflegehinweise besprechen." },
    ],
    factors: [
      "Material und Abmessungen der Bauteile",
      "Länge, Anzahl und Zugänglichkeit",
      "Anschluss an vorhandene Dachhaut",
      "Umfang von Lieferung und Montage",
    ],
    faqs: [
      {
        question: "Was zählt zu Spenglerarbeiten am Dach?",
        answer:
          "Typisch sind Dachrinnen, Fallrohre, Anschlussbleche, Einfassungen und ähnliche Metalldetails. Der genaue Umfang wird für Ihr Gebäude festgelegt.",
      },
      {
        question: "Passt jedes Blech zu jeder Deckung?",
        answer:
          "Nein. Material, Befestigung und Geometrie müssen zur vorhandenen Dachhaut und zum Aufbau passen.",
      },
      {
        question: "Können nur einzelne Bauteile erneuert werden?",
        answer:
          "Ja, wenn Zustand und System das zulassen. Manchmal ist ein größerer Austausch sinnvoller – das zeigt die Prüfung.",
      },
      {
        question: "Ist Spenglerarbeit dasselbe wie Dachzubehör?",
        answer:
          "Es gibt Überschneidungen. Spenglerarbeiten betonen die metallenen Anschlüsse und Einfassungen; Dachzubehör umfasst auch weitere Ergänzungen wie Schneeschutz.",
      },
      {
        question: "Wie wird der Aufwand kalkuliert?",
        answer:
          "Material, Länge, Form, Zugang und Anschlussaufwand bestimmen die Kalkulation. Ein Angebot folgt der Bewertung vor Ort oder anhand klarer Angaben.",
      },
    ],
  },
  {
    slug: "dachwartung",
    label: "Dachwartung",
    short: "Regelmäßig prüfen. Früh erkennen.",
    number: "08",
    icon: "inspect",
    group: "specialist",
    related: ["dachreparatur", "dachzubehoer", "flachdachsanierung", "sturmschaden-dach"],
    title: "Dachwartung und Dachinspektion in Wien",
    description:
      "Dachwartung und Dachinspektion in Wien: Zustand prüfen, Auffälligkeiten dokumentieren und sinnvolle nächste Schritte planen. Angebot bei Rundrdach.",
    heading: "Das Dach im Blick.\nBevor der Schaden wächst.",
    intro:
      "Dachwartung und Inspektion in Wien helfen, Auffälligkeiten früh zu erkennen – von loser Deckung bis zu verstopften Abläufen. Der genaue Umfang einer Prüfung wird mit Ihnen abgestimmt.",
    overviewTitle: "Kontrolle schafft Orientierung.",
    overview:
      "Eine Inspektion ersetzt keine Sanierung, kann aber den Zustand einordnen und Prioritäten sichtbar machen. Sichtbare Mängel, Entwässerung und Anschlüsse stehen dabei im Vordergrund. Was genau geprüft und dokumentiert wird, hängt vom Dach und von Ihrer Anfrage ab.",
    items: [
      {
        title: "Sichtprüfung der Dachhaut",
        description:
          "Lose, verschobene oder beschädigte Elemente werden erfasst, soweit die Zugänglichkeit das zulässt.",
      },
      {
        title: "Anschlüsse & Durchdringungen",
        description:
          "Übergänge an Kaminen, Fenstern und Rändern werden auf erkennbare Mängel hin betrachtet.",
      },
      {
        title: "Entwässerung prüfen",
        description:
          "Rinnen, Abläufe und Fallrohre werden auf Verstopfung oder Beschädigung kontrolliert, soweit vereinbart.",
      },
      {
        title: "Empfehlung zum nächsten Schritt",
        description:
          "Auffälligkeiten werden eingeordnet: Beobachtung, Reparatur oder weitergehende Maßnahme.",
      },
    ],
    steps: [
      { title: "Anliegen besprechen", description: "Dachtyp, bekannte Probleme und gewünschten Prüfumfang klären." },
      { title: "Zugang und Termin", description: "Sichere Erreichbarkeit und mögliche Termine abstimmen." },
      { title: "Inspektion durchführen", description: "Vereinbarte Punkte prüfen und dokumentieren." },
      { title: "Ergebnis erklären", description: "Feststellungen und sinnvolle nächste Schritte besprechen." },
    ],
    factors: [
      "Dachform, Höhe und Zugänglichkeit",
      "Umfang der gewünschten Prüfung",
      "Zustand und Alter des Aufbaus",
      "Erforderliche Dokumentation und Folgemaßnahmen",
    ],
    faqs: [
      {
        question: "Wie oft sollte ein Dach geprüft werden?",
        answer:
          "Das hängt von Alter, Bauweise und Belastung ab. Nach Stürmen oder bei wiederkehrenden Auffälligkeiten ist eine Prüfung besonders sinnvoll. Ein fester Intervall wird nicht pauschal zugesagt.",
      },
      {
        question: "Ist Wartung dasselbe wie Reinigung?",
        answer:
          "Nicht unbedingt. Eine Inspektion bewertet den Zustand. Reinigungsarbeiten an Rinnen oder Flächen können zusätzlich vereinbart werden, wenn sie zum Leistungsumfang gehören.",
      },
      {
        question: "Bekomme ich nach der Prüfung eine Empfehlung?",
        answer:
          "Ja. Auffälligkeiten und mögliche nächste Schritte werden besprochen. Ob Reparatur oder Sanierung nötig ist, hängt vom Befund ab.",
      },
      {
        question: "Kann ich das Dach selbst begehen?",
        answer:
          "Aus Sicherheitsgründen wird davon abgeraten. Eine fachliche Prüfung setzt geeignete Zugänglichkeit voraus.",
      },
      {
        question: "Was kostet eine Dachinspektion in Wien?",
        answer:
          "Der Aufwand richtet sich nach Dachgröße, Zugang und Prüfumfang. Ein Angebot wird nach Klärung dieser Punkte erstellt.",
      },
    ],
  },
  {
    slug: "sturmschaden-dach",
    label: "Sturmschaden",
    short: "Nach dem Sturm: Schaden prüfen.",
    number: "09",
    icon: "storm",
    group: "specialist",
    related: ["dachreparatur", "dachwartung", "dacheindeckung", "dachzubehoer"],
    title: "Sturmschaden am Dach in Wien",
    description:
      "Sturmschaden am Dach in Wien: verrutschte Deckung, undichte Stellen und Folgeschäden prüfen lassen. Ablauf und Angebot bei Rundrdach.",
    heading: "Nach dem Unwetter.\nErst sichern, dann bewerten.",
    intro:
      "Stürme können Dachziegel verschieben, Blechteile lösen oder Anschlüsse öffnen. Bei einem Sturmschaden am Dach in Wien steht zuerst die sichere Einschätzung des Schadens – nicht die Selbstdiagnose vom Boden aus.",
    overviewTitle: "Schaden dokumentieren. Ursache und Umfang klären.",
    overview:
      "Sichtbare Lücken in der Deckung sind oft nur ein Teil des Bildes. Auch Anschlüsse, Unterspannbahn und angrenzende Bauteile können betroffen sein. Eine gezielte Prüfung hilft, Sofortmaßnahmen und längerfristige Arbeiten zu unterscheiden. Ein 24-Stunden-Notdienst wird nicht zugesagt.",
    items: [
      {
        title: "Sichtbare Sturmschäden",
        description:
          "Verrutschte oder fehlende Deckelemente und gelöste Bauteile werden erfasst, soweit der Zugang sicher möglich ist.",
      },
      {
        title: "Undichte Stellen nach Unwetter",
        description:
          "Feuchtespuren im Innenraum und mögliche Eintrittspunkte werden gemeinsam betrachtet.",
      },
      {
        title: "Temporäre Sicherung",
        description:
          "Wo sinnvoll und vereinbart, können vorläufige Maßnahmen den Schaden begrenzen, bis die endgültige Reparatur erfolgt.",
      },
      {
        title: "Reparatur oder Erneuerung",
        description:
          "Je nach Ausmaß reicht eine lokale Instandsetzung oder es sind weitergehende Arbeiten nötig.",
      },
    ],
    steps: [
      { title: "Situation schildern", description: "Fotos, betroffene Bereiche und Zeitpunkt des Unwetters beschreiben." },
      { title: "Schaden prüfen", description: "Zugängliche Stellen und mögliche Folgeschäden bewerten." },
      { title: "Maßnahmen abstimmen", description: "Sofortbedarf und dauerhafte Reparatur voneinander trennen." },
      { title: "Instandsetzung umsetzen", description: "Vereinbarten Umfang ausführen und Zustand besprechen." },
    ],
    factors: [
      "Art und Ausmaß des Sturmschadens",
      "Erreichbarkeit und Sicherheit der Dachfläche",
      "Material und Zustand des bestehenden Aufbaus",
      "Notwendige Sicherung und Folgereparaturen",
    ],
    faqs: [
      {
        question: "Was soll ich nach einem Sturmschaden tun?",
        answer:
          "Schützen Sie Innenräume, soweit das sicher möglich ist, und dokumentieren Sie den Schaden mit Fotos. Betreten Sie das Dach nicht selbst. Kontaktieren Sie Fachleute für die Einschätzung.",
      },
      {
        question: "Gibt es einen Notdienst rund um die Uhr?",
        answer:
          "Ein 24-Stunden-Notdienst wird derzeit nicht zugesagt. Erreichbarkeit und mögliche Termine müssen direkt abgestimmt werden.",
      },
      {
        question: "Übernimmt die Versicherung die Kosten?",
        answer:
          "Das hängt von Ihrer Police und dem Schadenshergang ab. Wir können den technischen Zustand beschreiben; die Versicherungsentscheidung liegt nicht bei uns.",
      },
      {
        question: "Reicht oft eine Teilreparatur?",
        answer:
          "Bei örtlich begrenzten Schäden ist das häufig möglich. Ob sie dauerhaft trägt, hängt vom Restzustand des Dachs ab.",
      },
      {
        question: "Wie schnell kann geholfen werden?",
        answer:
          "Die verfügbaren Termine hängen von Auftragslage, Wetter und Zugang ab. Eine verbindliche Reaktionszeit wird nicht pauschal zugesagt.",
      },
    ],
  },
  {
    slug: "dachfenster",
    label: "Dachfenster",
    short: "Licht und Dichtheit unter dem Dach.",
    number: "10",
    icon: "window",
    group: "specialist",
    related: ["spenglerarbeiten", "dachreparatur", "dacheindeckung", "dachzubehoer"],
    title: "Dachfenster in Wien",
    description:
      "Dachfenster in Wien: Einbau, Austausch und Abdichtung von Dachflächenfenstern. Anschluss, Ablauf und Angebot bei Rundrdach planen.",
    heading: "Mehr Licht im Dach.\nMit sauberen Anschlüssen.",
    intro:
      "Dachfenster bringen Licht – und brauchen sorgfältige Anschlüsse an die Dachhaut. In Wien planen wir Einbau oder Austausch so, dass Fenster, Eindeckrahmen und Entwässerung zum vorhandenen Dach passen.",
    overviewTitle: "Das Fenster ist nur so gut wie sein Anschluss.",
    overview:
      "Undichtigkeiten an Dachflächenfenstern entstehen oft an Eindeckrahmen, Folienanschluss oder Entwässerungsrinne – nicht am Glas selbst. Deshalb werden Einbau, Austausch und Abdichtung im Zusammenhang mit der umgebenden Dachhaut betrachtet. Produktwahl und Montageumfang werden projektbezogen vereinbart.",
    items: [
      {
        title: "Einbau neuer Dachfenster",
        description:
          "Position, Größe und Anschluss an die Deckung werden vorab geklärt. Die konkrete Ausführung folgt der technischen Prüfung.",
      },
      {
        title: "Austausch bestehender Fenster",
        description:
          "Alter Rahmen, Öffnungsmaß und Zustand der Anschlüsse entscheiden, ob ein Austausch sinnvoll ist.",
      },
      {
        title: "Abdichtung & Eindeckrahmen",
        description:
          "Wasserführung um das Fenster herum wird als Teil der Dachhaut behandelt.",
      },
      {
        title: "Undichte Fensteranschlüsse",
        description:
          "Feuchtespuren im Bereich des Fensters werden geprüft, bevor eine Maßnahme festgelegt wird.",
      },
    ],
    steps: [
      { title: "Bedarf klären", description: "Einbau, Austausch oder Abdichtung und Dachtyp aufnehmen." },
      { title: "Anschluss prüfen", description: "Vorhandene Öffnung, Deckung und Entwässerung bewerten." },
      { title: "Ausführung abstimmen", description: "Produktumfang und Montage festlegen." },
      { title: "Fenster einbauen", description: "Vereinbarte Arbeit ausführen und Anschlüsse prüfen." },
    ],
    factors: [
      "Anzahl, Größe und Lage der Fenster",
      "Zustand von Öffnung und Dachhaut",
      "Erforderlicher Eindeckrahmen und Anschluss",
      "Zugang und Umfang der Montage",
    ],
    faqs: [
      {
        question: "Können Dachfenster in ein bestehendes Dach eingebaut werden?",
        answer:
          "Das ist häufig möglich, hängt aber von Sparrenlage, Dachneigung und Aufbau ab. Eine Prüfung vor Ort oder anhand klarer Pläne ist nötig.",
      },
      {
        question: "Warum ist ein Dachfenster undicht?",
        answer:
          "Oft liegt die Ursache am Anschluss oder an der Entwässerung rund um den Rahmen. Eine Ferndiagnose allein anhand einer Beschreibung ist nicht verlässlich.",
      },
      {
        question: "Muss die umliegende Deckung erneuert werden?",
        answer:
          "Nicht immer. Manchmal reicht die Arbeit am Fensteranschluss. Bei größerem Schaden an der Dachhaut können begleitende Arbeiten sinnvoll sein.",
      },
      {
        question: "Welche Fenster werden angeboten?",
        answer:
          "Die tatsächlich angebotenen Modelle und Ausführungen werden nach technischer Eignung und Verfügbarkeit festgelegt. Ein bestimmtes Produkt wird nicht pauschal zugesagt.",
      },
      {
        question: "Was beeinflusst die Kosten?",
        answer:
          "Fenstergröße, Anzahl, Zugang, Anschlussaufwand und eventuelle Dacharbeiten bestimmen den Preis. Das Angebot ist projektbezogen.",
      },
    ],
  },
  {
    slug: "dachdaemmung",
    label: "Dachdämmung",
    short: "Wärme halten. Aufbau verstehen.",
    number: "11",
    icon: "insulation",
    group: "specialist",
    related: ["dachsanierung", "dacheindeckung", "flachdachsanierung", "dachabdichtung"],
    title: "Dachdämmung in Wien",
    description:
      "Dachdämmung in Wien: Wärmeschutz im Dachaufbau planen. Zusammenspiel mit Abdichtung und Eindeckung verstehen und Angebot bei Rundrdach anfragen.",
    heading: "Dämmung mit System.\nNicht isoliert gedacht.",
    intro:
      "Dachdämmung in Wien betrifft den Wärmeschutz im Dachaufbau – und muss zu Statik, Feuchteschutz und vorhandener Dachhaut passen. Wir erklären die Möglichkeiten und klären, was für Ihr Gebäude geprüft werden muss.",
    overviewTitle: "Dämmung ist eine Schicht – kein Allheilmittel.",
    overview:
      "Wärmedämmung und Abdichtung haben unterschiedliche Aufgaben. Eine Dämmmaßnahme ohne Blick auf Feuchteschutz, Hinterlüftung oder bestehende Schichten kann Probleme erzeugen statt lösen. Deshalb wird der gesamte Aufbau betrachtet, bevor ein Umfang vereinbart wird.",
    items: [
      {
        title: "Dämmung bei Sanierung",
        description:
          "Im Zuge einer Dachsanierung oder Neueindeckung kann die Dämmebene mitgeplant werden, sofern Aufbau und Statik das zulassen.",
      },
      {
        title: "Aufsparren- und Zwischensparrendämmung",
        description:
          "Welche Variante geeignet ist, hängt von Dachkonstruktion, Raumhöhe und vorhandenem Aufbau ab – und wird nicht pauschal festgelegt.",
      },
      {
        title: "Zusammenspiel mit Abdichtung",
        description:
          "Besonders bei Flachdächern müssen Dämmung und Abdichtung als System gedacht werden.",
      },
      {
        title: "Feuchte & Dampfbremse",
        description:
          "Schichtenaufbau und Feuchteschutz werden mitbewertet, weil falsche Reihenfolgen Schäden begünstigen können.",
      },
    ],
    steps: [
      { title: "Aufbau klären", description: "Vorhandene Schichten, Nutzung und Ziele aufnehmen." },
      { title: "Varianten erklären", description: "Technisch sinnvolle Möglichkeiten und Grenzen besprechen." },
      { title: "Umfang festlegen", description: "Dämmung, begleitende Dacharbeiten und Details abstimmen." },
      { title: "Maßnahme umsetzen", description: "Vereinbarte Ausführung prüfen und dokumentieren." },
    ],
    factors: [
      "Vorhandener Dachaufbau und Statik",
      "Gewünschter Wärmeschutz und Nutzungsziel",
      "Erforderliche Begleitarbeiten an Dachhaut oder Abdichtung",
      "Zugang, Fläche und Entsorgung alter Schichten",
    ],
    faqs: [
      {
        question: "Ist Dachdämmung dasselbe wie Abdichtung?",
        answer:
          "Nein. Die Dämmung begrenzt Wärmeverluste. Die Abdichtung schützt vor eindringendem Wasser. Beide müssen im Aufbau sinnvoll zusammenwirken.",
      },
      {
        question: "Kann ich nur dämmen, ohne das Dach zu erneuern?",
        answer:
          "Das hängt vom Zustand der Dachhaut und vom möglichen Aufbau ab. Manchmal ist eine Kombination mit Sanierung oder Neueindeckung sinnvoller.",
      },
      {
        question: "Welche Dämmstoffe werden verwendet?",
        answer:
          "Die geeignete Lösung richtet sich nach Konstruktion, Brandschutzanforderungen und Verfügbarkeit. Ein bestimmtes Material wird nicht pauschal zugesagt.",
      },
      {
        question: "Brauche ich eine Baubewilligung?",
        answer:
          "Das hängt von Umfang und örtlichen Vorschriften ab. Bei Unsicherheit sollte die zuständige Stelle oder eine Fachberatung einbezogen werden. Wir treffen keine rechtsverbindliche Aussage ohne Prüfung.",
      },
      {
        question: "Wovon hängen die Kosten ab?",
        answer:
          "Fläche, Aufbauvariante, Begleitarbeiten und Zugang bestimmen den Aufwand. Ein Angebot folgt der technischen Klärung.",
      },
    ],
  },
];

/** Lookup by URL slug; used by the dynamic service route and contact validation. */
export const serviceBySlug = (slug: string) => services.find((service) => service.slug === slug);

/** Four homepage / primary navigation services. */
export const mainServices = services.filter((service) => service.group === "main");

/** Specialist SEO / ads landing pages. */
export const specialistServices = services.filter((service) => service.group === "specialist");

/** Resolve curated related services for a detail page, skipping missing slugs. */
export function relatedServices(service: Service): Service[] {
  return service.related.flatMap((slug) => {
    const entry = serviceBySlug(slug);
    return entry && entry.slug !== service.slug ? [entry] : [];
  });
}
