//#region IMPORTS
import "./link.js";
import "./face.js";
import "./beurs.js";
//#endregion IMPORTS

//#region TEMPLATE
let template = document.createElement("template");
template.innerHTML = /*html*/ `
<style>
    :host {
        overflow: hidden;
    }
    face-ʤ{
        //margin-left: 650px;
        height:100%
    }
    .text {
        grid-area: text;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40pt;
        font-family: "Lobster";
    }
    .content {
        display:flex;
        justify-content: center;
    }
    #face {
        margin-left:125px;
        //height:45vh;
        //padding-bottom: 6rem;
    }
    .F {
        margin: 0px 25px;
    }
    /*
        .eyes {
          grid-area: eyes;
        }
        face-ʤ{
            width:70vw;
        }
        .TL { grid-area: TL; }
        .TR { grid-area: TR; }
        .ML { grid-area: ML; }
        .MR { grid-area: MR; }
        .BL { grid-area: BL; }
        .BR { grid-area: BR; }
        .grid-container{
          display: grid;
          grid-template-areas:
          'TL  eyes eyes eyes eyes TR'
          'ML  eyes eyes eyes eyes MR'
          'BL  eyes eyes eyes eyes BR';
          gap: 10px;
          background-color:transparent;
          padding: 10px;
        }
        td {
          border:  15px  solid white;
          padding : 0px;
          margin:  0px;
          border-radius: 10px;
        }
        */
</style>

<!-- <div class="grid-container" id="main"> -->

<div id="main">
    <div id="face">
        <face-ʤ class="eyes"></face-ʤ>
    </div>
    <div class="content">
        <link-ʤ class="C" thumb="1" format="jpg"></link-ʤ>
        <link-ʤ class="C" thumb="2" format="jpg"></link-ʤ>
        <link-ʤ class="C" thumb="3" format="jpg"></link-ʤ>
        <link-ʤ class="C" thumb="4" format="jpg"></link-ʤ>
        <link-ʤ class="C" thumb="5" format="jpg"></link-ʤ>
        <link-ʤ class="C" thumb="6" format="jpg"></link-ʤ>
        <link-ʤ class="C" thumb="7" format="jpg"></link-ʤ>
    </div>
    <div class="content">
        <link-ʤ class="F" thumb="8" format="png"></link-ʤ>
        <link-ʤ class="F" thumb="9" format="png"></link-ʤ>
        <link-ʤ class="F" thumb="10" format="png"></link-ʤ>
        <link-ʤ class="F" thumb="11" format="png"></link-ʤ>
        <link-ʤ class="F" thumb="12" format="png"></link-ʤ>
        <!-- <link-ʤ class="F" thumb="13" format="png"></link-ʤ> -->
        <link-ʤ class="F" thumb="14" format="png"></link-ʤ>
        <link-ʤ class="F" thumb="15" format="png"></link-ʤ>
        <link-ʤ class="F" thumb="16" format="png"></link-ʤ>
        <link-ʤ class="F" thumb="17" format="png"></link-ʤ>
        <link-ʤ class="F" thumb="18" format="png"></link-ʤ>
    </div>
</div>
<beurs-ʤ class="NLlink" thumb="4" hidden></beurs-ʤ>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define(
  "unlocked-ʤ",
  class extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this.$links = this._shadowRoot.querySelectorAll("link-ʤ");
      this.$beurs = this._shadowRoot.querySelector("beurs-ʤ");
      this.$main = this._shadowRoot.querySelector("#main");
      this.socket = new WebSocket("ws://essadji.be:2105");
      this.addEventListener("move", (e) => {
        this.socket.send(
          JSON.stringify({
            payload: "move",
            target: e.detail.source,
            x: e.detail.valueX,
            y: e.detail.valueY,
          })
        );
      });
      // this.$audio = this._shadowRoot.querySelector('audio');
      // this.texts = {
      //     "EN": "Hello dear guests",
      //     "NL": "Hallo lieve gasten uit België",
      //     "HU": "Kedves magyar vendégeink Hungáriából",
      //     "LVA": "Esiet sveicināti, mīļie viesi no Latvijas",
      //     "DE": "Hallo liebe Gäste aus Österreich",
      //     "PT": "Olá queridos convidados de Portugal",
      //     "RO": "Bună ziua, dragi oaspeți din România"
      // };
      this.$welcome = this._shadowRoot.querySelector(".text");
      this.$eyes = this._shadowRoot.querySelector(".eyes");
    }
    // setMedia(_) {
    //     this.$audio.src = `../media/${_}.mp3`;
    //     this.$audio.play();
    //     this.$welcome.innerHTML = this.texts[_];
    // }
    connectedCallback() {
      this.$links.forEach((link) => {
        link.addEventListener("click", () => {
          let code = link.getAttribute("thumb");
          this.$beurs.style.display = "block";
          this.$main.style.display = "none";
          this.$beurs.setContent(this.repo["project" + code]);
          this.$beurs.addEventListener("click", () => {
            this.$beurs.style.display = "none";
            this.$main.style.display = "block";
          });

          // this.setMedia(code)
        });
      });

      this.socket.addEventListener("open", (event) => {
        // console.log("opening socket for controller ...")
        this.socket.send(
          JSON.stringify({
            payload: "Hello server, I will be your controller today.",
          })
        );
      });
      this.socket.addEventListener("message", (event) => {
        // console.log('Message from server ', event.data);
      });
      this.$eyes.addEventListener("click", () => {
        if (this.requestFullscreen)
          this.requestFullscreen().catch((err) => {
            alert(
              `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
            );
          });
      });
    }

    handler(e) {
      this.socket.send(JSON.stringify({ payload: e.target.id }));
    }

    set content(x) {
      this.$content.innerHTML = x;
    }

    repo = {
      project1: {
        title: "DementieHarp",
        html: "<p><strong>Wat is het concreet?</strong></p><p>De dementieharp speelt in op sensorische stimulatie. Ze laat patiënten voelen, zien en horen en prikkelt meerdere zintuigen tegelijkertijd. Als je de staven van de harp aanraakt, lichten deze op, weerklinken geluidsfragmenten en worden beelden op een monitor geprojecteerd. De geluiden en beelden kunnen gepersonaliseerd worden per bewoner.</p><p><strong>Voor wie is het?</strong></p><p>Huidige doelgroep: personen met dementie die in woonzorgcentra verblijven.<br /> Andere (toekomstige) doelgroepen: personen met dementie die nog thuis wonen, mantelzorg, kleuter- en lager onderwijs, kinderen met zorgproblematiek.</p><p><strong>Hoe wordt dit aangepakt?</strong></p><p>Het 'tafelmodel' (TRL 5)  is een samenwerking van Hogeschool UCLL, designbureau ‘It’s a Roel’,' en woonzorgcentrum Toermalien.<br />Het is een raamwerkconstructie met kunststof buizen, sensoren, dynamische LED-verlichting, scherm, centrale verwerkingseenheid (CPU) en luidsprekers. De grote broer van het tafelmodel (zie foto) is een volwaardig 'publiek meubel' waarvan het prototype in WZC Toermalien staat.</p>",
        image: "1.jpg",
        url: "https://www.youtube.com/watch?v=2i8Tj8vbMJk",
      },
      project2: {
        title: "CVA-loopband",
        html: "<p><strong>Wat is het concreet?</strong></p>Een hulpmiddel voor patiënten die revalideren van een cerebro-vasculair accident.<br >Revalidatie betekent soms terug leren stappen, ook in drukke verkeerssituaties. Daarbij kan Virtual Reality voor een veilige oefenomgeving zorgen. De beelden moeten dan wel perfect gesynchroniseerd worden met de tred van de patiënt op de loopband. Vijf studenten Toegepaste Informatica (bachelor) en Programmeren (graduaat) ontwikkelden initieel de nodige hardware en software om die synchronisatie precies genoeg te krijgen. Onze expertisecellen Digital Solutions en Smart Organisations werkten dit vervolgens uit tot een concept dat breed ingezet kan worden in de medische praktijk.</p><p><strong>Voor wie is het?</strong></p><p>Patiënten die revalideren na een verlamming oefenen in een gecontroleerde omgeving, onder toezicht van een kinesitherapeut. De overstap naar wandelen in een (echte) drukke straat vergt immers heel wat oefening. Via een VR-bril krijgen de patiënten een simulatie waarbij ze opdrachten moeten uitvoeren tijdens het wandelen of lopen, bijvoorbeeld een vogel zoeken in de lucht en deze zo ver en lang mogelijk visueel volgen. De appliocatie genereert vervolgens op basis van de bewegingen van de patiënt een rapport voor de therapeut dat de persoonlijke progressie van de patiënt weerspiegelt.</p></div>",
        image: "2.jpg",
        url: "https://youtu.be/baB5UfwRWHw",
      },
      project3: {
        title: "VR-trainingen",
        html: "<p><strong>Wat is het concreet? </strong></p><p>De VR-bril faciliteert een vorm van 'simulatieonderwijs' waarbij een realistisch scenario wordt nagebootst. De (toekomstige) verpleegkundige observeert het gesprek tussen een verpleegkundige en een patiënt. De patiënt uit op eigen wijze een noodkreet waar moet uit blijken dat 'het leven voor hem/haar niet meer hoeft'. De video stopt waarna de (toekomstige) verpleegkundige kan kiezen uit mogelijke reacties en bijbehorende vervolgscenario’s. Wanneer de verpleegkundige de meest aangewezen keuze maakt, wordt de achterliggende klinische uitleg weergegeven waarom dit de meest aangewezen keuze is en gaat het gesprek verder. Wanneer er gekozen wordt voor een antwoord dat klinisch niet ondersteund wordt, krijgt de verpleegkundige de reactie van de patiënt op deze suboptimale repliek te zien en krijgt de verpleegkundige de klinische uitleg waarom dit niet de aangewezen manier is. Het laat stdenten toe om te leren uit hun fouten, om na te denken hoe het anders kan en om de draad terug op te pakken zonder blijvende gevolgen van eerder gemaakte fouten. Het scenario bestrijkt een vijftiental minuten en de belangrijkste aspecten betreffende detectie, gespreksvoering, opstarten interventies, nazorg en follow-up worden ingeoefend.</p><p><strong>Voor wie is het?</strong></p><p>Studenten verpleegkunde, verpleegkundigen, mantelzorgers, vrijwilligers, ...</p><p>De tool kan op termijn nog verder uitgebreid worden naar andere domeinen en (zorg)problematieken.</p>",
        image: "3.jpg",
        url: "https://www.youtube.com/watch?v=IHjuqijaURg",
      },
      project4: {
        title: "Swarm-IoT",
        html: "<p><strong>Wat is het concreet?</strong></p><p>Een modulair monitoringsysteem dat in staat is ad hoc mensenmassa's in kaart te brengen en strategisch te sturen tijdens evenementen.</p><p><strong>Voor wie is het?</strong></p><p>Stad Leuven en hogeschool UCLL voerden tijdens de Eindejaarscorrida op vrijdag 30 december een proefproject uit, waarbij ze de drukte in kaart brachten met state-of-the-art technologie. Zelfstandige sensor-units werden ingezet om onderling informatie uit te wisselen over de aanwezige menigte. Met het geheel aan verzamelde en geaggregeerde (verwerkte) data, kunnen hulpdiensten en organisatoren vervolgens de (evolutie van die) menigte op de voet volgen. Daardoor kunnen ze op tijd ingrijpen wanneer het op bepaalde plekken te druk dreigt te worden. Eén van de belangrijkste aspecten binnen dit project is het respecteren van de privacy. Het systeem analyseert de beelden namelijk 'realtime' en op de sensor zelf, zodat er op geen enkel moment videomateriaal verstuurd wordt (en dus onderschept zou kunnen worden). Bijkomende aandachtspunten zijn onder meer het 'plug-and-play'-gehalte (de sensoren kunnen onvoorbereid ingezet worden en in gebruik genomen worden zonder bijkomende configuratie) en de mogelijkheid om dit systeem op termijn ook signalisatie autonoom te laten aansturen op basis van een achterliggend A.I.-algoritme</p>",
        image: "4.jpg",
        url: "https://www.youtube.com/watch?v=0hWW6FVcFAo",
      },
      project5: {
        title: "BCI InterOp",
        html: "<p><strong>Wat is het concreet?</strong></p><p>Exploratief onderzoek naar de inzetbaarheid van 'brain-computer-interfaces' in een brede waaier van contexten.</p><p><strong>Voor wie is het?</strong></p><p>Als mogelijke doelgroep wordt vooral gedacht aan mensen die omwille van een fysieke beperking moeilijk of niet 'mechanisch' kunnen interageren met hun omgeving. Een BCI-systeem zou hen namelijk (opnieuw) in staat stellen om de fysieke wereld te 'beroeren', zij het dan zuiver op basis van hersengolven.</p><p>Om het concept te testen werd een coöperatief spel ontwikkeld waar een proefpersoon een tweede speler bijstaat, louter op basis van hersengolven als gevolg van 'bewegingsintenties' of het mentaal visualiseren van die beweging.</p>De doestellingen op langere termijn zijn echter veel ambitieuzer: mensen die hersenschade geleden hebben opnieuw een mate van autonomie geven die anders niet meer mogelijk zou zijn. Er kan dan bijvoorbeeld gedacht worden aan de mentale aansturing van een exoskelet of andere ondersteunende/assisterende toestellen.<p></p>",
        image: "5.jpg",
        url: "https://www.youtube.com/watch?v=7Sh6GJsGrpw",
      },
      project6: {
        title: "Astmapping",
        html: "<p><strong>Wat is het concreet?</strong></p><p>Tijdens dit project worden drukknoppen ontwikkeld die gemonteerd worden op de inhalatoren (puffers) van astmapatiënten om met behulp van o.a. gps-signalen de frequentie van gebruik alsook de locatie bij gebruik van deze inhalatoren in kaart te brengen.</p><p><strong>Voor wie is het?</strong></p><p>Om de bekomen data uit dit Citizen Science project te verifiëren en te versterken, worden tevens een aantal vaste meetpunten snuffelpalen doorheen de stad Hasselt geplaatst die realtime metingen zullen uitvoeren van de aanwezigheid van een aantal belangrijke vervuilende componenten zoals ozon, stikstofdioxide(NO) en fijn stof(PPM). Op deze manier kunnen respiratoire hotspots binnen de stad gelokaliseerd worden.</p>",
        image: "6.jpg",
        url: "https://www.youtube.com/watch?v=Ys__Bt5pYv8",
      },
      project7: {
        title: "Zingende Bomen",
        html: "<p><strong>Wat is het concreet?</strong></p><p>Een samenwerking tussen UCLL's Digital Solutions, de Techniek- en WetenschapsAcademie (TWA) Leuven, het FabLab Leuven en de Jeugdbond voor Natuur en Milieu (JNM)</p><p><strong>Voor wie is het?</strong></p><p>We worden steeds vaker geconfronteerd met de kwetsbaarheid van ons ecosysteem, zoals de gevolgen van lang aanhoudende droogte. Jongeren krijgen dankzij dit project inzichten in de kwetsbaarheid van ons natuurlijk ecosysteem op een tastbare manier, en dit in hun vrije tijd. Met behulp van datavisualisatie en datasonificatie is het mogelijk om jongeren respectvol te leren omgaan met de natuur, en later in het beroepsleven naar oplossingen te zoeken voor het klimaatprobleem. </p><p>Enerzijds zullen jongeren eerst inzicht krijgen in het klimaatprobleem op kleine schaal, in een Vertical Farm. Hierna zullen de jongeren sensoren plaatsen in een bos waarbij ze deze metingen ook eigenhandig zelf kunnen opvolgen. Dit gebeurt in een echt ecosysteem, zodat jongeren bewust kunnen worden van de klimaatproblemen.</p>",
        image: "7.jpg",
        url: "https://youtu.be/Un2yBgIAxYs",
      },
      project8: {
        title: "FACTOR",
        html: "<p><strong>Remediëringsgame wiskunde</strong></p><p>Ondersteuning leerlingen en leerkrachten in het behalen van de eindtermen wiskunde.<br>Oefeningen op maat van de leerling.<br>Het niveau past zich automatisch aan.<br>Een interactief dashboard verschaft inzicht in de voortgang van de leerling.</p><p><strong>Voor wie is het?</strong></p><p>Eerste graad - Secundair Onderwijs</p>",
        image: "8.png",
      },
      project9: {
        title: "DigAge+",
        html: "<p><strong>Digital upskilling of the existing ageing work force</strong></p>Modules om digitale vaardigheden te onderwijzen<br>Competentiekader digitaal ondernemerschap bij 50-plussers<br>Open Leerplatform creëren voor digitaal ondernemerschap<br>Online community uitwerken voorconderwijzers</p><p><strong>Voor wie is het?</strong></p><p>50-plussers</p></div>",
        image: "9.png",
      },
      project10: {
        title: "E-SKILLS",
        html: "<p><strong>Effective access to e-services</strong></p><p>Zelfevaluatietool<br>Open online cursus<br>Gratis tool om volwassenen (en hun trainers) overzicht te geven in de benodigde kennis en vaardigheden<br>E-learning-modules om trainers te ondersteunen in het aanleren van digitale vaardigheden</p><p><strong>Voor wie is het?</strong></p><p>Volwassenen</p>",
        image: "10.png",
      },
      project11: {
        title: "GATE",
        html: "<p><strong>Tool voor leerstof-gamification</strong></p><p>Scorebord<br>Virtueel beloningssysteem<br>Avatar personaliseren<br>Levels en content ontgrendelen<br>Editor view (leerkracht/trainer)<br>Game view (leerling)<br>Google forms als scoringsmechanisme<br><br>Oneindig veel toepassingen!</p>",
        image: "11.png",
      },
      project12: {
        title: "ORIENT+",
        html: "<p><strong>TAAL!</strong></p><p>Uitbreiden woordenschat en verwerven woordenschatstrategieën, aan de hand van authentiek taalmateriaal uit kranten en tijdschriften.</p><p><strong>Voor wie is het?</strong></p><p>Leerlingen Secundair Onderwijs en studenten Hoger Onderwijs.<br><p></p>",
        image: "12.png",
      },
      project13: {
        title: "ONLINE SEKSUEEL GEWELD",
        html: "<p><strong>Wat is het concreet?</strong></p><p>Tijdens dit project worden drukknoppen ontwikkeld die gemonteerd worden op de inhalatoren (puffers) van astmapatiënten om met behulp van o.a. gps-signalen de frequentie van gebruik alsook de locatie bij gebruik van deze inhalatoren in kaart te brengen.</p><p><strong>Voor wie is het?</strong></p><p>Om de bekomen data uit dit Citizen Science project te verifiëren en te versterken, worden tevens een aantal vaste meetpunten snuffelpalen doorheen de stad Hasselt geplaatst die realtime metingen zullen uitvoeren van de aanwezigheid van een aantal belangrijke vervuilende componenten zoals ozon, stikstofdioxide(NO) en fijn stof(PPM). Op deze manier kunnen respiratoire hotspots binnen de stad gelokaliseerd worden.</p>",
        image: "13.png",
      },
      project14: {
        title: "SOLLERTIA",
        html: "<p><strong>Fostering transversal digital skills</strong></p><p>Curriculum voor transversale digitale vaardigheden in het hoger onderwijs<br>Methodologische gids voor docenten<br>Pedagogisch materiaal, audiovisuele content en specialisatielessen<br><br>Aangeboden op het Sollertia platform</p><p><strong>Voor wie is het?</strong></p><p>Hoger Onderwijs (niveau 3 - 5)</p>",
        image: "14.png",
      },
      project15: {
        title: "YOUTH FOR LOVE",
        html: "<p><strong>Preventie van (gendergerelateerd) geweld bij jongeren</strong></p><p>Serious gaming<br>Kant-en-klare toolkits<br>Info, lesmaterialen, online webinars en cursussen, voor zowel leerlingen als leerkrachten, op een handig en overzichtelijk platform</p><p><strong>Voor wie is het?</strong></p><p>Secundair Onderwijs</p>",
        image: "15.png",
      },
      project16: {
        title: "Sociaal-Circulaire Economie",
        html: "<p><strong>Wat is het concreet?</strong></p><p>In kaart brengen van bestaande strategieën<br>Circulariteitsdag<br>Educatieve methoden om sociaal-circulaire economie in het onderwijs te verankeren<br>Studentenattitude-onderzoek<br>SCE-netwerkplatform</p>",
        image: "16.png",
      },
      project17: {
        title: "IoT gamification",
        html: "<p><strong>Gamification techniques for vocational training</strong></p><p>'Internet of Things'-leermaterialen<br>AI-beoordelingsplatform<br>Gamification-based platform voor afstandsonderwijs</p>",
        image: "17.png",
      },
      project18: {
        title: "INCLUDE UP",
        html: "<p><strong>Inclusief digitaal ondernemerschap</strong></p><p>Modules om digitaal ondernemerschap te onderwijzen.<br>Competentiekader voor digitaal ondernemerschap ontwikkelen.<br>Open Leerplatform creëren voor digitaal ondernemerschap.<br>Online community uitwerken voor leerkrachten.</p>",
        image: "18.png",
      },
    };
  }
);
//#endregion CLASS
