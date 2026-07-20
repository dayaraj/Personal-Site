/* ============================================================
   EN / DE language toggle · drd.com.np
   Self contained: injects the toggle button, swaps content,
   remembers the choice, updates <html lang>.
   English is read from the DOM on first swap, so EN stays the
   single source of truth in the HTML.
   ============================================================ */
(function () {
    'use strict';

    /* ---------- 1. Simple text swaps, matched by exact text ---------- */
    var TEXT_MAP = {
        'Work': 'Projekte',
        'About': 'Über mich',
        'Resume': 'Lebenslauf',
        'Get in touch': 'Kontakt',
        'Contact': 'Kontakt',
        'Home': 'Start',
        'All Work': 'Alle Projekte',
        'All': 'Alle',
        'My Role': 'Meine Rolle',
        'Timeline': 'Zeitraum',
        'Outcome': 'Ergebnis',
        'Company': 'Unternehmen',
        'Platform': 'Plattform',
        'Type': 'Art',
        'Deliverables': 'Leistungen',
        'Prize Pool': 'Preisgeld',
        '1.5 Years': '1,5 Jahre',
        'Live · 3× subscription growth': 'Live · 3× Abo Wachstum',
        '1,500+ Active Members': '1.500+ aktive Mitglieder',
        'Full UX/UI Redesign': 'Komplettes UX/UI Redesign',
        'iOS & Android Mobile': 'iOS & Android App',
        'Web (Desktop & Mobile)': 'Web (Desktop & Mobil)',
        '4.2/5 Usability Score': '4,2/5 Usability Score',
        'Website, Dashboard & Marketing': 'Website, Dashboard & Marketing'
    };
    var TEXT_SCOPES = '.nav-links a, .footer-links a, .breadcrumb a, .breadcrumb span, .cs-breadcrumb a, .cs-breadcrumb span, .filter-tag, .cs-meta-label, .cs-meta-val';

    /* ---------- 2. Block swaps: [selector, index, German HTML] ---------- */
    var SHARED = [
        ['.footer-copy', 0, '© Entworfen und entwickelt von Daya']
    ];

    var INDEX = [
        ['.hero-eyebrow-text', 0, 'Product Designer · UI/UX · Saarbrücken, Deutschland'],
        ['.hero-headline', 0, 'Ich gestalte Systeme,<br>die Menschen <em>wirklich</em><br>gerne nutzen.'],
        ['.hero-body', 0, 'Ich verwandle <strong>komplexe Enterprise Produkte</strong> wie ERP Systeme, Dashboards und interne Plattformen in Werkzeuge, die sich nach den Menschen richten, die damit arbeiten, nicht nur nach dem Unternehmen, das sie gekauft hat.'],
        ['.hero-actions .btn-primary', 0, 'Ausgewählte Projekte'],
        ['.hero-actions .btn-ghost', 0, 'Kontakt aufnehmen →'],
        ['.hero-stat-label', 0, 'Jahre Designerfahrung'],
        ['.hero-stat-label', 1, 'Schwerpunkt'],
        ['.hero-stat-label', 2, 'Produkte gelauncht'],
        ['.hero-stat-num', 3, 'Offen'],
        ['.hero-stat-label', 3, 'für Stellen in Deutschland'],

        ['.section-label', 0, 'Ausgewählte Projekte'],
        ['.section-title', 0, 'Projekte, über die es sich<br>zu reden lohnt.'],
        ['.section-subtitle', 0, 'Echte Probleme. Echte Rahmenbedingungen. Echte Ergebnisse.'],
        ['.section-link', 0, 'Alle Projekte →'],

        ['.project-desc', 0, 'Neugestaltung eines dichten Buchhaltungs ERP samt Marketing Website. Durch neu gedachte Kernabläufe wurde aus einem langsamen, komplexen System ein intuitives Werkzeug, das die tägliche Arbeit beschleunigt.'],
        ['.project-quote', 0, '„Das neue System ergibt endlich Sinn. Mein Team hat mich ab dem ersten Tag nicht mehr um Hilfe bei der Rechnungsstellung gebeten." · Operations Manager, Providhy'],
        ['.metric-label', 0, 'Weniger Zeit pro Aufgabe'],
        ['.metric-label', 1, 'Rechnungserstellung'],
        ['.metric-label', 2, 'Berichte erstellt'],
        ['.view-case-link', 0, 'Case Study ansehen <span>→</span>'],
        ['.project-desc', 1, 'Aus einem angefragten UI Facelift wurde ein komplettes UX Redesign. Usability Tests zeigten, dass zentrale Tracking Funktionen in den Einstellungen vergraben waren. Ich habe die App als intuitiven täglichen Begleiter neu aufgebaut, ausgerichtet daran, wie Menschen wirklich essen.'],
        ['.project-desc', 2, 'Architektur einer zweiseitigen Fantasy Sport Plattform: eine ansprechende Oberfläche für Spieler und ein datenreiches Admin Dashboard für Live Ergebnisse, Ligen und Nutzerverwaltung.'],

        ['.section-label', 1, 'Über mich'],
        ['.section-title', 1, 'Ich bin Daya.'],
        ['.about-body p', 0, 'In den letzten fünf Jahren habe ich Produkte gestaltet, die Menschen nutzen müssen. Nicht weil sie wollen, sondern weil sie ihre Arbeit erledigen müssen.'],
        ['.about-body p', 1, 'ERP Systeme. Dashboards. Interne Tools. Software, bei der schlechtes Design nicht nur nervt, sondern ganze Teams ausbremst und echtes Geld kostet.'],
        ['.about-body p', 2, 'Meine Aufgabe: vereinfachen, ohne zu verflachen. Den echten Workflow unter Schichten alter Annahmen freilegen. Dinge so gestalten, dass sie dem Denken der Nutzer entsprechen.'],
        ['.about-body p', 3, 'Ich arbeite eng mit Entwicklern und Stakeholdern zusammen, teste früh und oft und widerspreche, wenn ein Feature Wunsch mehr Probleme schafft, als er löst.'],
        ['.about-voice', 0, 'Details sind mir wichtig, denn ein unklares Label oder ein unnötiger Klick, hundertfach am Tag wiederholt, summiert sich zu viel verlorener Zeit.'],
        ['.about-aside', 0, 'Außerhalb der Arbeit bin ich der Mensch, der Möbel umstellt, um den Flow zu verbessern, und schlecht gestaltete Speisekarten im Stillen bewertet.'],

        ['.about-stat-label', 0, 'Erfahrung'],
        ['.about-stat-val', 0, '5+ Jahre'],
        ['.about-stat-label', 1, 'Schwerpunkt'],
        ['.about-stat-label', 2, 'Ausbildung'],
        ['.about-stat-val', 2, 'Computer Engineering (B.E.)'],
        ['.about-stat-label', 3, 'Zertifizierung'],
        ['.about-stat-label', 4, 'Sprachen'],
        ['.about-stat-val', 4, 'Englisch · Nepali · Deutsch (A2, aktiv lernend)'],
        ['.about-stat-label', 5, 'Standort'],
        ['.about-stat-val', 5, 'Saarbrücken, Deutschland'],

        ['.skill-desc', 0, 'Verstehen, was gebaut werden soll und warum, bevor ein Design Tool geöffnet wird.'],
        ['.skill-desc', 1, 'Abläufe, die Sinn ergeben. Weniger kognitive Last pro Aktion.'],
        ['.skill-desc', 2, 'Interviews, Usability Tests, Synthese. Das echte Problem hinter dem genannten finden.'],
        ['.skill-name', 3, 'AI gestütztes Design <span class="skill-badge">Wachsend</span>'],
        ['.skill-desc', 3, 'Ich nutze KI Tools wie Claude, ChatGPT und Stitch, um Research Synthese, Designvarianten und Texte zu beschleunigen. Ziel: mehr Zeit für Entscheidungen, die wirklich einen Menschen brauchen.'],
        ['.skill-desc', 4, 'Komponentenbibliotheken, die skalieren, ohne Teams auszubremsen.'],
        ['.skill-desc', 5, 'HTML, CSS und JS. Genug, um schnell Prototypen zu bauen, diese Seite selbst umzusetzen und mit jedem Entwickler auf Augenhöhe zu sprechen.'],

        ['.section-label', 2, 'Referenzen und Qualifikationen'],
        ['.section-title', 2, 'Wie andere die Zusammenarbeit<br>mit mir beschreiben.'],
        ['.section-label', 3, 'Stimmen aus gemeinsamen Projekten'],
        ['.testimonial-text', 0, 'Mein Team hat das neue System ohne Onboarding verstanden. Wir haben ab dem ersten Tag korrekte Rechnungen erstellt. Das ist uns mit keiner Software zuvor gelungen.'],
        ['.testimonial-text', 1, 'Daya übergibt nicht einfach Dateien und verschwindet. Er bleibt bis zur Umsetzung dabei, erkennt Edge Cases, bevor sie zu Bugs werden, und erklärt die Gründe hinter jeder Entscheidung. Das macht die Entwicklungsphase deutlich schneller.'],
        ['.section-label', 4, 'Strukturierte Weiterbildung'],
        ['.cert-desc', 0, 'Siebenteilige Kursreihe zu User Research, Personas, Journey Mapping, Wireframing, Prototyping und Usability Testing, inklusive eines kompletten App Designs als Abschlussprojekt.'],
        ['.cert-desc', 1, 'Vierteilige Spezialisierung zu visuellen Grundlagen, Informationsarchitektur, responsivem Web und Mobile Design sowie interaktiven High Fidelity Prototypen.'],
        ['.cert-badge', 0, 'Zertifikat ansehen →'],
        ['.cert-badge', 1, 'Zertifikat ansehen →'],

        ['.cta-label', 0, 'Kontakt'],
        ['.cta-headline', 0, 'Arbeiten Sie an etwas<br><em>Komplexem?</em>'],
        ['.cta-sub', 0, 'Wenn Sie Enterprise Software, eine B2B Plattform oder etwas bauen, bei dem die Komplexität des Problems noch nicht von der Qualität des Designs eingeholt wurde, freue ich mich, davon zu hören.'],
        ['.cta-actions .btn-light', 0, 'Kontakt aufnehmen ↗']
    ];

    var ALL_WORK = [
        ['.page-title', 0, 'Alle Projekte.'],
        ['.page-subtitle', 0, 'Eine Sammlung ausgelieferter Produkte, System Redesigns und Probleme, die es wert sind, gelöst zu werden. Jedes Projekt steht für echte Rahmenbedingungen, echte Stakeholder und echte Ergebnisse.'],
        ['.project-desc', 0, 'Neugestaltung eines dichten Buchhaltungs ERP samt Marketing Website. Durch neu gedachte Kernabläufe wurde aus einem langsamen, komplexen System ein intuitives Werkzeug, das die tägliche Arbeit beschleunigt.'],
        ['.project-quote', 0, '„Das neue System ergibt endlich Sinn. Mein Team hat mich ab dem ersten Tag nicht mehr um Hilfe bei der Rechnungsstellung gebeten." · Operations Manager, Providhy'],
        ['.metric-label', 0, 'Weniger Zeit pro Aufgabe'],
        ['.metric-label', 1, 'Rechnungserstellung'],
        ['.metric-label', 2, 'Berichte erstellt'],
        ['.view-case-link', 0, 'Case Study ansehen <span>→</span>'],
        ['.project-desc', 1, 'Aus einem angefragten UI Facelift wurde ein komplettes UX Redesign. Usability Tests zeigten, dass zentrale Tracking Funktionen in den Einstellungen vergraben waren. Ich habe die App als intuitiven täglichen Begleiter neu aufgebaut.'],
        ['.project-desc', 2, 'Architektur einer zweiseitigen Fantasy Sport Plattform: eine ansprechende Oberfläche für Spieler und ein datenreiches Admin Dashboard für Live Ergebnisse, Ligen und Nutzerverwaltung.'],
        ['.cta-label', 0, 'Kontakt'],
        ['.cta-headline', 0, 'Arbeiten Sie an etwas<br><em>Komplexem?</em>'],
        ['.cta-sub', 0, 'Wenn Sie Enterprise Software, eine B2B Plattform oder etwas bauen, bei dem die Komplexität des Problems noch nicht von der Qualität des Designs eingeholt wurde, freue ich mich, davon zu hören.'],
        ['.cta-actions .btn-light', 0, 'Kontakt aufnehmen ↗']
    ];

    function pageEntries() {
        /* Case study pages ship their translations in their own
           i18n-de-*.js file, exposed as window.I18N_PAGE. */
        if (window.I18N_PAGE) return window.I18N_PAGE;
        var p = location.pathname;
        if (p.indexOf('all-work') !== -1) return ALL_WORK;
        return INDEX;
    }

    /* ---------- 3. Engine ---------- */
    function applyBlocks(entries, toDe) {
        entries.forEach(function (e) {
            var els = document.querySelectorAll(e[0]);
            var el = els[e[1]];
            if (!el) return;
            if (toDe) {
                if (el.dataset.i18nEn === undefined) el.dataset.i18nEn = el.innerHTML;
                el.innerHTML = e[2];
            } else if (el.dataset.i18nEn !== undefined) {
                el.innerHTML = el.dataset.i18nEn;
            }
        });
    }

    function applyText(toDe) {
        document.querySelectorAll(TEXT_SCOPES).forEach(function (el) {
            if (el.children.length) return;
            if (toDe) {
                var key = el.textContent.trim();
                if (TEXT_MAP[key] !== undefined) {
                    if (el.dataset.i18nEn === undefined) el.dataset.i18nEn = el.textContent;
                    el.textContent = TEXT_MAP[key];
                }
            } else if (el.dataset.i18nEn !== undefined) {
                el.textContent = el.dataset.i18nEn;
            }
        });
    }

    function setLang(lang, btn) {
        var toDe = lang === 'de';
        applyText(toDe);
        applyBlocks(SHARED.concat(pageEntries()), toDe);
        document.documentElement.setAttribute('lang', toDe ? 'de' : 'en');
        if (btn) {
            btn.textContent = toDe ? 'EN' : 'DE';
            btn.setAttribute('aria-label', toDe ? 'Switch to English' : 'Auf Deutsch umschalten');
        }
        try { localStorage.setItem('lang', lang); } catch (e) { }
    }

    /* ---------- 4. Toggle button ---------- */
    function init() {
        var style = document.createElement('style');
        style.textContent = '.lang-toggle{background:none;border:1px solid var(--border-2,#ccc);color:var(--text,#111);height:36px;min-width:40px;padding:0 .6rem;border-radius:18px;cursor:pointer;font:600 .72rem/1 inherit;font-family:inherit;letter-spacing:.08em;transition:all .3s ease;flex-shrink:0}.lang-toggle:hover{border-color:var(--accent,#C04A32);color:var(--accent,#C04A32)}';
        document.head.appendChild(style);

        var btn = document.createElement('button');
        btn.className = 'lang-toggle';
        btn.id = 'langToggle';
        btn.type = 'button';
        btn.textContent = 'DE';

        var theme = document.getElementById('themeToggle');
        if (theme && theme.parentNode) theme.parentNode.insertBefore(btn, theme);
        else {
            var nav = document.querySelector('.nav-right') || document.querySelector('nav');
            if (nav) nav.appendChild(btn);
        }

        var saved = 'en';
        try { saved = localStorage.getItem('lang') || 'en'; } catch (e) { }
        if (saved === 'de') setLang('de', btn);
        else btn.setAttribute('aria-label', 'Auf Deutsch umschalten');

        btn.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('lang') === 'de' ? 'de' : 'en';
            setLang(current === 'de' ? 'en' : 'de', btn);
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
