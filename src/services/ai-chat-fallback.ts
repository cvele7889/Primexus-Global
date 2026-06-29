type FallbackReply = {
  match: (text: string) => boolean
  reply: Record<string, string>
}

const replies: FallbackReply[] = [
  {
    match: (t) => /uslug|service|dienst|услуг|podršk|support|call.?center|poziv|outsourc|telemarket|bpo|cx/i.test(t),
    reply: {
      sr: 'Primexus Global pruža kompletan spektar BPO usluga: korisnička i tehnička podrška, pozivni centar, AI rešenja, back office, outsourcing, telemarketing, IT podršku i obuku zaposlenih. Radimo 24/7 na više jezika. Da li vas zanima neka usluga posebno?',
      en: 'Primexus Global offers a full range of BPO services: customer and technical support, call center, AI solutions, back office, outsourcing, telemarketing, IT support and employee training. We operate 24/7 in multiple languages. Is there a specific service you would like to know more about?',
      de: 'Primexus Global bietet ein vollständiges BPO-Portfolio: Kundensupport, technischer Support, Call Center, KI-Lösungen, Back Office, Outsourcing, Telemarketing, IT-Support und Mitarbeiterschulung. Wir sind 24/7 in mehreren Sprachen verfügbar. Interessiert Sie ein bestimmter Service?',
      ru: 'Primexus Global предоставляет полный спектр BPO-услуг: поддержка клиентов и техническая поддержка, колл-центр, AI-решения, back office, аутсourcing, телемarketing, IT-поддержка и обучение сотрудников. Работаем 24/7 на нескольких языках. Какая услуга вас интересует?',
    },
  },
  {
    match: (t) => /karijer|posao|posic|job|career|stellen|arbeit|вакан|работ/i.test(t),
    reply: {
      sr: 'Imamo otvorene pozicije u korisničkoj podršci, menadžmentu, IT-u, prodaji i administraciji — uključujući remote opcije. Posetite sekciju Karijera na sajtu ili nam pišite na info@primexusglobal.com sa vašim CV-jem.',
      en: 'We have open roles in customer support, management, IT, sales and administration — including remote options. Visit the Careers section on the site or email info@primexusglobal.com with your CV.',
      de: 'Wir haben offene Stellen im Kundensupport, Management, IT, Vertrieb und Administration — auch remote. Besuchen Sie den Karriere-Bereich oder schreiben Sie an info@primexusglobal.com mit Ihrem Lebenslauf.',
      ru: 'У нас есть открытые вакансии в поддержке клиентов, менеджменте, IT, продажах и администрации — включая удалённую работу. Перейдите в раздел «Карьера» или напишите на info@primexusglobal.com с резюме.',
    },
  },
  {
    match: (t) => /kontakt|contact|email|mail|telefon|phone|piš|write|schreib|связ|контакт/i.test(t),
    reply: {
      sr: 'Možete nas kontaktirati putem forme na sajtu (sekcija Kontakt) ili direktno na info@primexusglobal.com. Sedište: Hadži Ruvimova br.4, Ljig, Srbija.',
      en: 'You can reach us via the contact form on the site (Contact section) or directly at info@primexusglobal.com. Headquarters: Hadži Ruvimova br.4, Ljig, Serbia.',
      de: 'Sie erreichen uns über das Kontaktformular (Kontakt) oder direkt unter info@primexusglobal.com. Hauptsitz: Hadži Ruvimova br.4, Ljig, Serbien.',
      ru: 'Связаться с нами можно через форму на сайте (раздел «Контакты») или напрямую: info@primexusglobal.com. Штаб-квартира: Hadži Ruvimova br.4, Ljig, Сербия.',
    },
  },
  {
    match: (t) => /lokac|location|evrop|europ|azij|asia|region|zemlj|country|standort|регион/i.test(t),
    reply: {
      sr: 'Primexus pokriva klijente širom Evrope i Azije — sa sedištem u Ljigu, Srbija. Podržavamo regione od Zapadnog Balkana i DACH-a do Bliskog istoka i Jugoistočne Azije.',
      en: 'Primexus serves clients across Europe and Asia — headquartered in Ljig, Serbia. We cover regions from the Western Balkans and DACH to the Middle East and Southeast Asia.',
      de: 'Primexus betreut Kunden in ganz Europa und Asien — Hauptsitz in Ljig, Serbien. Abdeckung von Westbalkan und DACH bis Naher Osten und Südostasien.',
      ru: 'Primexus обслуживает клиентов по всей Европе и Азии — штаб-квартира в Ljig, Сербия. Покрываем регионы от Западных Балкан и DACH до Ближнего Востока и Юго-Восточной Азии.',
    },
  },
  {
    match: (t) => /jezik|language|sprach|sprache|язык|engl|german|nemač|rus/i.test(t),
    reply: {
      sr: 'Podržavamo srpski, engleski, nemački, ruski, francuski, italijanski, španski, holandski i druge jezike — za korisničku i tehničku podršku 24/7.',
      en: 'We support Serbian, English, German, Russian, French, Italian, Spanish, Dutch and other languages — for 24/7 customer and technical support.',
      de: 'Wir unterstützen Serbisch, Englisch, Deutsch, Russisch, Französisch, Italienisch, Spanisch, Niederländisch und weitere Sprachen — für 24/7 Kundensupport.',
      ru: 'Мы поддерживаем сербский, английский, немецкий, русский, французский, итальянский, испанский, голландский и другие языки — для поддержки клиентов 24/7.',
    },
  },
  {
    match: (t) => /ai|veštač|inteligen|automat|chatbot|bot|assistant|asistent|ki.?lös|ассистент/i.test(t),
    reply: {
      sr: 'Primexus nudi AI rešenja: chatbotove, pametnu automatizaciju i virtuelne asistente za bržu korisničku podršku. Ja sam Primexus AI — primer te tehnologije na ovom sajtu.',
      en: 'Primexus offers AI solutions: chatbots, smart automation and virtual assistants for faster customer support. I am Primexus AI — an example of that technology on this site.',
      de: 'Primexus bietet KI-Lösungen: Chatbots, intelligente Automatisierung und virtuelle Assistenten für effizienteren Support. Ich bin Primexus AI — ein Beispiel dieser Technologie.',
      ru: 'Primexus предлагает AI-решения: чат-боты, умную автоматизацию и виртуальных ассистентов для более быстрой поддержки. Я — Primexus AI, пример такой технологии на этом сайте.',
    },
  },
  {
    match: (t) => /zdravo|hello|hi|hey|pozdrav|hallo|guten|привет|добр/i.test(t),
    reply: {
      sr: 'Zdravo! Ja sam Primexus AI, virtuelni asistent Primexus Global. Mogu da odgovorim na pitanja o uslugama, lokacijama, karijeri i kontaktu. Kako mogu da pomognem?',
      en: 'Hello! I am Primexus AI, the virtual assistant for Primexus Global. I can answer questions about services, locations, careers and contact options. How can I help?',
      de: 'Hallo! Ich bin Primexus AI, der virtuelle Assistent von Primexus Global. Ich beantworte Fragen zu Services, Standorten, Karriere und Kontakt. Wie kann ich helfen?',
      ru: 'Здравствуйте! Я Primexus AI, виртуальный ассистент Primexus Global. Могу ответить на вопросы об услугах, локациях, карьере и контактах. Чем могу помочь?',
    },
  },
  {
    match: (t) => /ko\s+ste|who are|wer seid|wer sind|кто вы|o kompan|about|o nama|über uns|о комп/i.test(t),
    reply: {
      sr: 'Primexus Global D.O.O. je srpska BPO kompanija sa sedištem u Ljigu, specijalizovana za korisničko iskustvo, pozivne centre i poslovnu podršku za klijente u Evropi i Aziji.',
      en: 'Primexus Global D.O.O. is a Serbian BPO company based in Ljig, specialized in customer experience, call centers and business support for clients across Europe and Asia.',
      de: 'Primexus Global D.O.O. ist ein serbisches BPO-Unternehmen mit Sitz in Ljig, spezialisiert auf Customer Experience, Call Center und Business Support in Europa und Asien.',
      ru: 'Primexus Global D.O.O. — сербская BPO-компания из Ljig, специализирующаяся на клиентском опыте, колл-центрах и бизнес-поддержке для клиентов в Европе и Азии.',
    },
  },
]

const defaultReply: Record<string, string> = {
  sr: 'Hvala na pitanju. Mogu da pomognem oko usluga, lokacija, karijere i kontakta. Za detaljnu ponudu ili specifičan upit, pišite na info@primexusglobal.com ili koristite kontakt formu na sajtu.',
  en: 'Thank you for your question. I can help with services, locations, careers and contact details. For a detailed quote or specific inquiry, email info@primexusglobal.com or use the contact form on the site.',
  de: 'Danke für Ihre Frage. Ich helfe bei Services, Standorten, Karriere und Kontakt. Für ein detailliertes Angebot schreiben Sie an info@primexusglobal.com oder nutzen Sie das Kontaktformular.',
  ru: 'Спасибо за вопрос. Я помогу с услугами, локациями, карьерой и контактами. Для детального предложения напишите на info@primexusglobal.com или используйте форму на сайте.',
}

export function getFallbackReply(message: string, language: string): string {
  const lang = ['sr', 'en', 'de', 'ru'].includes(language) ? language : 'en'
  const normalized = message.trim().toLowerCase()

  for (const item of replies) {
    if (item.match(normalized)) {
      return item.reply[lang] ?? item.reply.en
    }
  }

  return defaultReply[lang] ?? defaultReply.en
}
