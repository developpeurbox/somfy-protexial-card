/* ========================================================
   Somfy Protexial Cards
   One HACS resource, two Lovelace cards:
   - custom:somfy-protexial-card
   - custom:somfy-protexial-elements-card
   ======================================================== */

/* ========================================================
   Somfy Protexial / Protexiom Card
   ======================================================== */

const CARD_VERSION = "v2.1.2";

const ALARM_FEATURES = {
  ARM_HOME: 1,
  ARM_AWAY: 2,
  ARM_NIGHT: 4,
};

const SENSORS_DEF = [
  { key: "capteur1", defaultEntity: "binary_sensor.somfy_protexial_batterie", aliases: ["batterie", "battery"], defaultText: "battery", type: "binary", okState: "off" },
  { key: "capteur2", defaultEntity: "binary_sensor.somfy_protexial_centrale", aliases: ["centrale", "control_panel"], defaultText: "controlPanel", type: "binary", okState: "off" },
  { key: "capteur3", defaultEntity: "binary_sensor.somfy_protexial_portes_ou_fenetres", aliases: ["portes_ou_fenetres", "doors_windows", "door_window"], defaultText: "doorsWindows", type: "binary", okState: "off" },
  { key: "capteur4", defaultEntity: "binary_sensor.somfy_protexial_mouvement", aliases: ["mouvement", "motion"], defaultText: "motion", type: "binary", okState: "off" },
  { key: "capteur5", defaultEntity: "binary_sensor.somfy_protexial_camera", aliases: ["camera"], defaultText: "camera", type: "binary", okState: "on" },
  { key: "capteur6", defaultEntity: "binary_sensor.somfy_protexial_comm_centrale_capteurs", aliases: ["comm_centrale_capteurs", "communication_capteurs", "sensors_communication"], defaultText: "sensors", type: "binary", okState: "on" },
  { key: "capteur7", defaultEntity: "binary_sensor.somfy_protexial_communication_gsm", aliases: ["communication_gsm", "gsm_communication"], defaultText: "gsm", type: "binary", okState: "on" },
  { key: "capteur8", defaultEntity: "sensor.somfy_protexial_operateur_gsm", aliases: ["operateur_gsm", "operator_gsm"], defaultText: "operator", type: "info" },
  { key: "capteur9", defaultEntity: "sensor.somfy_protexial_signal_gsm_5", aliases: ["signal_gsm_5", "signal_gsm", "gsm_signal"], defaultText: "gsmSignal", type: "info" },
];

const RESET_DEF = [
  { key: "battery", configKey: "reset_battery_entity", defaultEntity: "button.somfy_protexial_reinitialiser_defaut_piles", aliases: ["reinitialiser_defaut_piles", "reset_battery"], icon: "mdi:battery-sync", text: "resetBattery" },
  { key: "alarm", configKey: "reset_alarm_entity", defaultEntity: "button.somfy_protexial_reinitialiser_defaut_alarme", aliases: ["reinitialiser_defaut_alarme", "reset_alarm"], icon: "mdi:shield-refresh", text: "resetAlarm" },
  { key: "link", configKey: "reset_link_entity", defaultEntity: "button.somfy_protexial_reinitialiser_defaut_liaison_radio", aliases: ["reinitialiser_defaut_liaison_radio", "reset_radio"], icon: "mdi:access-point", text: "resetLink" },
];

const TRANSLATIONS = {
  fr: {
    cardSettings: "Paramètres de la carte", alarmEntity: "Entité alarme", cardTitle: "Titre de la carte",
    entity: "Entité", displayedName: "Nom affiché", alarm: "Alarme", sensorsTitle: "État",
    resetsTitle: "Réinitialisations", noSensors: "Aucun capteur sélectionné", disarm: "Désarmer",
    away: "Absent", home: "Présent", night: "Nuit", confirmReset: "Confirmer la réinitialisation",
    resetBattery: "Défauts piles", resetAlarm: "Défauts alarme", resetLink: "Liaison radio",
    battery: "Batterie", controlPanel: "Centrale", doorsWindows: "Portes/Fenêtres", motion: "Mouvement",
    camera: "Caméra", sensors: "Capteurs", gsm: "GSM", operator: "Opérateur", gsmSignal: "Signal GSM (/5)",
    defaultTitle: "Somfy Protexial — Contrôle", unavailable: "Indisponible", unknown: "Inconnu",
    lessThanMinute: "depuis moins d’une minute", sinceMinutes: "depuis {n} min", sinceHours: "depuis {n}",
    resetBatteryEntity: "Bouton de réinitialisation des piles", resetAlarmEntity: "Bouton de réinitialisation de l’alarme",
    resetLinkEntity: "Bouton de réinitialisation de la liaison radio", automaticDetection: "Détection automatique des entités",
    showFaults: "Afficher les défauts", showLastSync: "Afficher la dernière synchronisation",
    showRefresh: "Afficher le bouton d’actualisation", compactMode: "Mode compact", lastSyncEntity: "Entité dernière synchronisation",
    refreshEntity: "Bouton d’actualisation", faultsTitle: "Défauts", noFaults: "Aucun défaut détecté",
    lastSync: "Dernière synchronisation", refresh: "Actualiser", refreshing: "Actualisation…", connected: "Centrale connectée",
    disconnected: "Centrale indisponible", codeTitle: "Code / PIN", codePlaceholder: "Saisir le code", cancel: "Annuler",
    validate: "Valider", confirm: "Confirmer", actionError: "Impossible d’exécuter l’action", clickDetails: "Cliquez pour les détails",
    settingsDisplay: "Affichage avancé", keypadClear: "Effacer", keypadBackspace: "Retour"
  },
  en: {
    cardSettings: "Card settings", alarmEntity: "Alarm entity", cardTitle: "Card title", entity: "Entity",
    displayedName: "Displayed name", alarm: "Alarm", sensorsTitle: "Status", resetsTitle: "Resets",
    noSensors: "No sensor selected", disarm: "Disarm", away: "Away", home: "Home", night: "Night",
    confirmReset: "Confirm reset", resetBattery: "Battery faults", resetAlarm: "Alarm faults", resetLink: "Radio link",
    battery: "Battery", controlPanel: "Control panel", doorsWindows: "Doors/Windows", motion: "Motion",
    camera: "Camera", sensors: "Sensors", gsm: "GSM", operator: "Operator", gsmSignal: "GSM signal (/5)",
    defaultTitle: "Somfy Protexial — Control", unavailable: "Unavailable", unknown: "Unknown",
    lessThanMinute: "for less than a minute", sinceMinutes: "for {n} min", sinceHours: "for {n}",
    resetBatteryEntity: "Battery reset button", resetAlarmEntity: "Alarm reset button", resetLinkEntity: "Radio-link reset button",
    automaticDetection: "Automatic entity detection", showFaults: "Show faults",
    showLastSync: "Show last synchronization", showRefresh: "Show refresh button", compactMode: "Compact mode",
    lastSyncEntity: "Last synchronization entity", refreshEntity: "Refresh button", faultsTitle: "Faults",
    noFaults: "No fault detected", lastSync: "Last synchronization", refresh: "Refresh", refreshing: "Refreshing…",
    connected: "Control panel connected", disconnected: "Control panel unavailable", codeTitle: "Code / PIN",
    codePlaceholder: "Enter code", cancel: "Cancel", validate: "Validate", confirm: "Confirm",
    actionError: "Unable to execute action", clickDetails: "Click for details", settingsDisplay: "Advanced display", keypadClear: "Clear", keypadBackspace: "Backspace"
  },
  de: {
    cardSettings:"Karteneinstellungen", alarmEntity:"Alarm-Entität", cardTitle:"Kartentitel", entity:"Entität", displayedName:"Angezeigter Name",
    alarm:"Alarm", sensorsTitle:"Status", resetsTitle:"Zurücksetzen", noSensors:"Kein Sensor ausgewählt", disarm:"Unscharf",
    away:"Abwesend", home:"Anwesend", night:"Nacht", confirmReset:"Zurücksetzen bestätigen", resetBattery:"Batteriefehler",
    resetAlarm:"Alarmfehler", resetLink:"Funkverbindung", battery:"Batterie", controlPanel:"Zentrale", doorsWindows:"Türen/Fenster",
    motion:"Bewegung", camera:"Kamera", sensors:"Sensoren", gsm:"GSM", operator:"Anbieter", gsmSignal:"GSM-Signal (/5)",
    defaultTitle:"Somfy Protexial — Steuerung", unavailable:"Nicht verfügbar", unknown:"Unbekannt",
    lessThanMinute:"seit weniger als einer Minute", sinceMinutes:"seit {n} Min.", sinceHours:"seit {n}",
    automaticDetection:"Automatische Entitätserkennung", showFaults:"Fehler anzeigen",
    showLastSync:"Letzte Synchronisierung anzeigen", showRefresh:"Aktualisierungsschaltfläche anzeigen", compactMode:"Kompaktmodus",
    lastSyncEntity:"Entität letzte Synchronisierung", refreshEntity:"Aktualisierungsschaltfläche", faultsTitle:"Fehler",
    noFaults:"Keine Fehler erkannt", lastSync:"Letzte Synchronisierung", refresh:"Aktualisieren", refreshing:"Aktualisierung…",
    connected:"Zentrale verbunden", disconnected:"Zentrale nicht verfügbar", codeTitle:"Code / PIN", codePlaceholder:"Code eingeben",
    cancel:"Abbrechen", validate:"Bestätigen", confirm:"Bestätigen", clickDetails:"Für Details klicken", settingsDisplay:"Erweiterte Anzeige", keypadClear:"Löschen", keypadBackspace:"Zurück",
    resetBatteryEntity:"Taste zum Zurücksetzen der Batteriefehler", resetAlarmEntity:"Taste zum Zurücksetzen der Alarmfehler",
    resetLinkEntity:"Taste zum Zurücksetzen der Funkverbindung"
  },
  es: {
    cardSettings:"Ajustes de la tarjeta", alarmEntity:"Entidad de alarma", cardTitle:"Título de la tarjeta", entity:"Entidad", displayedName:"Nombre mostrado",
    alarm:"Alarma", sensorsTitle:"Estado", resetsTitle:"Restablecimientos", noSensors:"Ningún sensor seleccionado", disarm:"Desarmar",
    away:"Ausente", home:"Presente", night:"Noche", confirmReset:"Confirmar restablecimiento", resetBattery:"Fallos de pilas",
    resetAlarm:"Fallos de alarma", resetLink:"Enlace de radio", battery:"Pila", controlPanel:"Central", doorsWindows:"Puertas/Ventanas",
    motion:"Movimiento", camera:"Cámara", sensors:"Sensores", gsm:"GSM", operator:"Operador", gsmSignal:"Señal GSM (/5)",
    defaultTitle:"Somfy Protexial — Control", unavailable:"No disponible", unknown:"Desconocido",
    lessThanMinute:"desde hace menos de un minuto", sinceMinutes:"desde hace {n} min", sinceHours:"desde hace {n}",
    automaticDetection:"Detección automática de entidades", showFaults:"Mostrar fallos",
    showLastSync:"Mostrar última sincronización", showRefresh:"Mostrar botón de actualización", compactMode:"Modo compacto",
    lastSyncEntity:"Entidad de última sincronización", refreshEntity:"Botón de actualización", faultsTitle:"Fallos",
    noFaults:"No se detectaron fallos", lastSync:"Última sincronización", refresh:"Actualizar", refreshing:"Actualizando…",
    connected:"Central conectada", disconnected:"Central no disponible", codeTitle:"Código / PIN", codePlaceholder:"Introducir código",
    cancel:"Cancelar", validate:"Validar", confirm:"Confirmar", clickDetails:"Haz clic para ver detalles", settingsDisplay:"Visualización avanzada", keypadClear:"Borrar", keypadBackspace:"Atrás",
    resetBatteryEntity:"Botón de reinicio de pilas", resetAlarmEntity:"Botón de reinicio de alarma", resetLinkEntity:"Botón de reinicio del enlace de radio"
  },
  it: {
    cardSettings:"Impostazioni scheda", alarmEntity:"Entità allarme", cardTitle:"Titolo scheda", entity:"Entità", displayedName:"Nome visualizzato",
    alarm:"Allarme", sensorsTitle:"Stato", resetsTitle:"Ripristini", noSensors:"Nessun sensore selezionato", disarm:"Disattiva",
    away:"Assente", home:"Presente", night:"Notte", confirmReset:"Conferma ripristino", resetBattery:"Errori batterie",
    resetAlarm:"Errori allarme", resetLink:"Collegamento radio", battery:"Batteria", controlPanel:"Centrale", doorsWindows:"Porte/Finestre",
    motion:"Movimento", camera:"Telecamera", sensors:"Sensori", gsm:"GSM", operator:"Operatore", gsmSignal:"Segnale GSM (/5)",
    defaultTitle:"Somfy Protexial — Controllo", unavailable:"Non disponibile", unknown:"Sconosciuto",
    lessThanMinute:"da meno di un minuto", sinceMinutes:"da {n} min", sinceHours:"da {n}",
    automaticDetection:"Rilevamento automatico entità", showFaults:"Mostra anomalie",
    showLastSync:"Mostra ultima sincronizzazione", showRefresh:"Mostra pulsante aggiorna", compactMode:"Modalità compatta",
    lastSyncEntity:"Entità ultima sincronizzazione", refreshEntity:"Pulsante aggiorna", faultsTitle:"Anomalie",
    noFaults:"Nessuna anomalia rilevata", lastSync:"Ultima sincronizzazione", refresh:"Aggiorna", refreshing:"Aggiornamento…",
    connected:"Centrale connessa", disconnected:"Centrale non disponibile", codeTitle:"Codice / PIN", codePlaceholder:"Inserisci codice",
    cancel:"Annulla", validate:"Conferma", confirm:"Conferma", clickDetails:"Clicca per i dettagli", settingsDisplay:"Visualizzazione avanzata", keypadClear:"Cancella", keypadBackspace:"Indietro",
    resetBatteryEntity:"Pulsante ripristino batterie", resetAlarmEntity:"Pulsante ripristino allarme", resetLinkEntity:"Pulsante ripristino collegamento radio"
  },
  nl: {
    cardSettings:"Kaartinstellingen", alarmEntity:"Alarmentiteit", cardTitle:"Kaarttitel", entity:"Entiteit", displayedName:"Weergavenaam",
    alarm:"Alarm", sensorsTitle:"Status", resetsTitle:"Resetten", noSensors:"Geen sensor geselecteerd", disarm:"Uitschakelen",
    away:"Afwezig", home:"Aanwezig", night:"Nacht", confirmReset:"Reset bevestigen", resetBattery:"Batterijfouten",
    resetAlarm:"Alarmfouten", resetLink:"Radioverbinding", battery:"Batterij", controlPanel:"Centrale", doorsWindows:"Deuren/Ramen",
    motion:"Beweging", camera:"Camera", sensors:"Sensoren", gsm:"GSM", operator:"Provider", gsmSignal:"GSM-signaal (/5)",
    defaultTitle:"Somfy Protexial — Bediening", unavailable:"Niet beschikbaar", unknown:"Onbekend",
    lessThanMinute:"sinds minder dan een minuut", sinceMinutes:"sinds {n} min", sinceHours:"sinds {n}",
    automaticDetection:"Automatische entiteitsdetectie", showFaults:"Storingen tonen",
    showLastSync:"Laatste synchronisatie tonen", showRefresh:"Vernieuwknop tonen", compactMode:"Compacte modus",
    lastSyncEntity:"Entiteit laatste synchronisatie", refreshEntity:"Vernieuwknop", faultsTitle:"Storingen",
    noFaults:"Geen storing gedetecteerd", lastSync:"Laatste synchronisatie", refresh:"Vernieuwen", refreshing:"Vernieuwen…",
    connected:"Centrale verbonden", disconnected:"Centrale niet beschikbaar", codeTitle:"Code / PIN", codePlaceholder:"Voer code in",
    cancel:"Annuleren", validate:"Bevestigen", confirm:"Bevestigen", clickDetails:"Klik voor details", settingsDisplay:"Geavanceerde weergave", keypadClear:"Wissen", keypadBackspace:"Terug",
    resetBatteryEntity:"Knop batterijfouten resetten", resetAlarmEntity:"Knop alarmfouten resetten", resetLinkEntity:"Knop radioverbinding resetten"
  },
  pt: {
    cardSettings:"Definições do cartão", alarmEntity:"Entidade do alarme", cardTitle:"Título do cartão", entity:"Entidade", displayedName:"Nome apresentado",
    alarm:"Alarme", sensorsTitle:"Estado", resetsTitle:"Reposições", noSensors:"Nenhum sensor selecionado", disarm:"Desarmar",
    away:"Ausente", home:"Presente", night:"Noite", confirmReset:"Confirmar reposição", resetBattery:"Erros das pilhas",
    resetAlarm:"Erros do alarme", resetLink:"Ligação de rádio", battery:"Pilha", controlPanel:"Central", doorsWindows:"Portas/Janelas",
    motion:"Movimento", camera:"Câmara", sensors:"Sensores", gsm:"GSM", operator:"Operador", gsmSignal:"Sinal GSM (/5)",
    defaultTitle:"Somfy Protexial — Controlo", unavailable:"Indisponível", unknown:"Desconhecido",
    lessThanMinute:"há menos de um minuto", sinceMinutes:"há {n} min", sinceHours:"há {n}",
    automaticDetection:"Deteção automática de entidades", showFaults:"Mostrar falhas",
    showLastSync:"Mostrar última sincronização", showRefresh:"Mostrar botão de atualização", compactMode:"Modo compacto",
    lastSyncEntity:"Entidade da última sincronização", refreshEntity:"Botão de atualização", faultsTitle:"Falhas",
    noFaults:"Nenhuma falha detetada", lastSync:"Última sincronização", refresh:"Atualizar", refreshing:"A atualizar…",
    connected:"Central ligada", disconnected:"Central indisponível", codeTitle:"Código / PIN", codePlaceholder:"Introduzir código",
    cancel:"Cancelar", validate:"Validar", confirm:"Confirmar", clickDetails:"Clique para ver detalhes", settingsDisplay:"Visualização avançada", keypadClear:"Limpar", keypadBackspace:"Voltar",
    resetBatteryEntity:"Botão de reposição das pilhas", resetAlarmEntity:"Botão de reposição do alarme", resetLinkEntity:"Botão de reposição da ligação de rádio"
  }
};

for (const lang of ["de", "es", "it", "nl", "pt"]) {
  TRANSLATIONS[lang] = { ...TRANSLATIONS.en, ...TRANSLATIONS[lang] };
}

function languageFor(hass) {
  const language = (hass?.locale?.language || hass?.language || navigator.language || "en").toLowerCase();
  const short = language.split("-")[0];
  return TRANSLATIONS[short] ? short : "en";
}

function tr(hass, key, values = {}) {
  const lang = languageFor(hass);
  let text = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  Object.entries(values).forEach(([name, value]) => { text = text.replace(`{${name}}`, value); });
  return text;
}

function fireMoreInfo(element, entityId) {
  element.dispatchEvent(new CustomEvent("hass-more-info", {
    detail: { entityId },
    bubbles: true,
    composed: true,
  }));
}

class SomfyProtexialCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._config = {};
    this._built = false;
  }

  set hass(hass) {
    const languageChanged = this._hass && languageFor(this._hass) !== languageFor(hass);
    this._hass = hass;
    if (languageChanged) {
      this._render();
      return;
    }
    this.shadowRoot.querySelectorAll("ha-form").forEach(el => { el.hass = hass; });
  }

  setConfig(config) {
    this._config = { ...config };
    if (!this._built) {
      this._built = true;
      this._render();
    }
  }

  _fireConfig(config) {
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config }, bubbles: true, composed: true,
    }));
  }

  _render() {
    const cfg = this._config || {};
    const shown = [...(cfg.sensors || SENSORS_DEF.map(sensor => sensor.key))];
    const labels = cfg.labels || {};
    const entities = cfg.entities || {};

    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; font-family:var(--primary-font-family, sans-serif); }
        ha-form { display:block; margin-bottom:8px; }
        ha-expansion-panel { display:block; margin-bottom:8px; --expansion-panel-content-padding:12px; border-radius:6px; --ha-card-border-radius:6px; }
        ha-expansion-panel h3 { margin:0; font-size:inherit; font-weight:600; }
        .block { border-top:1px solid var(--divider-color); padding:12px 0 4px; }
        .header { display:flex; align-items:center; gap:10px; margin-bottom:8px; }
        .name { font-size:13px; font-weight:600; color:var(--primary-text-color); flex:1; }
        .checks { display:grid; gap:8px; padding:8px 0; }
        label { display:flex; align-items:center; gap:10px; font-size:14px; color:var(--primary-text-color); }
        input[type=checkbox] { width:18px; height:18px; accent-color:var(--primary-color); cursor:pointer; flex-shrink:0; }
      </style>
      <ha-form id="form_alarm"></ha-form>
      <ha-expansion-panel outlined>
        <ha-icon slot="leading-icon" icon="mdi:cog"></ha-icon>
        <h3 slot="header">${tr(this._hass, "cardSettings")}</h3>
        <div>
          <ha-form id="form_title"></ha-form>
          <div class="block">
            <div class="name">${tr(this._hass, "settingsDisplay")}</div>
            <div class="checks" id="display_checks"></div>
            <ha-form id="form_advanced"></ha-form>
          </div>
          <div id="sensors_container"></div>
          <div class="block"><ha-form id="form_resets"></ha-form></div>
        </div>
      </ha-expansion-panel>`;

    requestAnimationFrame(() => {
      const formAlarm = this.shadowRoot.getElementById("form_alarm");
      formAlarm.hass = this._hass;
      formAlarm.schema = [{ name: "alarm_entity", selector: { entity: { domain: "alarm_control_panel" } } }];
      formAlarm.data = { alarm_entity: cfg.alarm_entity || "alarm_control_panel.alarme" };
      formAlarm.computeLabel = () => tr(this._hass, "alarmEntity");
      formAlarm.addEventListener("value-changed", event => {
        event.stopPropagation();
        this._fireConfig({ ...this._config, alarm_entity: event.detail.value.alarm_entity });
      });

      const formTitle = this.shadowRoot.getElementById("form_title");
      formTitle.hass = this._hass;
      formTitle.schema = [{ name: "title", selector: { text: {} } }];
      formTitle.data = { title: cfg.title || "" };
      formTitle.computeLabel = () => tr(this._hass, "cardTitle");
      formTitle.addEventListener("value-changed", event => {
        event.stopPropagation();
        this._fireConfig({ ...this._config, title: event.detail.value.title });
      });

      const checkDefs = [
        ["auto_detect", "automaticDetection", cfg.auto_detect !== false],
        ["show_faults", "showFaults", cfg.show_faults !== false],
        ["show_last_sync", "showLastSync", cfg.show_last_sync !== false],
        ["show_refresh", "showRefresh", cfg.show_refresh !== false],
        ["compact", "compactMode", cfg.compact === true],
      ];
      const checks = this.shadowRoot.getElementById("display_checks");
      checkDefs.forEach(([key, text, checked]) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" data-config-key="${key}" ${checked ? "checked" : ""}>${tr(this._hass, text)}`;
        label.querySelector("input").addEventListener("change", event => {
          this._fireConfig({ ...this._config, [key]: event.target.checked });
        });
        checks.appendChild(label);
      });

      const formAdvanced = this.shadowRoot.getElementById("form_advanced");
      formAdvanced.hass = this._hass;
      formAdvanced.schema = [
        { name: "last_sync_entity", selector: { entity: { domain: "sensor" } } },
        { name: "refresh_entity", selector: { entity: { domain: "button" } } },
      ];
      formAdvanced.data = {
        last_sync_entity: cfg.last_sync_entity || "",
        refresh_entity: cfg.refresh_entity || "",
      };
      formAdvanced.computeLabel = field => tr(this._hass, field.name === "last_sync_entity" ? "lastSyncEntity" : "refreshEntity");
      formAdvanced.addEventListener("value-changed", event => {
        event.stopPropagation();
        const values = event.detail.value || {};
        this._fireConfig({ ...this._config, ...values });
      });

      const container = this.shadowRoot.getElementById("sensors_container");
      SENSORS_DEF.forEach(sensor => {
        const block = document.createElement("div");
        block.className = "block";
        block.innerHTML = `
          <div class="header">
            <input type="checkbox" id="chk_${sensor.key}" ${shown.includes(sensor.key) ? "checked" : ""}>
            <div class="name">${tr(this._hass, sensor.defaultText)}</div>
          </div>
          <ha-form id="form_${sensor.key}"></ha-form>`;
        container.appendChild(block);

        block.querySelector(`#chk_${sensor.key}`).addEventListener("change", () => {
          const newShown = shown.includes(sensor.key) ? shown.filter(key => key !== sensor.key) : [...shown, sensor.key];
          shown.length = 0;
          shown.push(...newShown);
          this._fireConfig({ ...this._config, sensors: newShown });
        });

        const form = block.querySelector(`#form_${sensor.key}`);
        form.hass = this._hass;
        form.schema = [
          { name: `entity_${sensor.key}`, selector: { entity: {} } },
          { name: `label_${sensor.key}`, selector: { text: {} } },
        ];
        form.data = {
          [`entity_${sensor.key}`]: entities[sensor.key] || "",
          [`label_${sensor.key}`]: labels[sensor.key] || "",
        };
        form.computeLabel = field => field.name.startsWith("entity_") ? tr(this._hass, "entity") : tr(this._hass, "displayedName");
        form.addEventListener("value-changed", event => {
          event.stopPropagation();
          const value = event.detail.value;
          const newEntities = { ...(this._config.entities || {}) };
          const newLabels = { ...(this._config.labels || {}) };
          const entityValue = value[`entity_${sensor.key}`];
          const labelValue = value[`label_${sensor.key}`]?.trim();
          if (entityValue) newEntities[sensor.key] = entityValue;
          else delete newEntities[sensor.key];
          if (labelValue) newLabels[sensor.key] = labelValue;
          else delete newLabels[sensor.key];
          this._fireConfig({ ...this._config, entities: newEntities, labels: newLabels });
        });
      });

      const formResets = this.shadowRoot.getElementById("form_resets");
      formResets.hass = this._hass;
      formResets.schema = RESET_DEF.map(reset => ({ name: reset.configKey, selector: { entity: { domain: "button" } } }));
      formResets.data = Object.fromEntries(RESET_DEF.map(reset => [reset.configKey, cfg[reset.configKey] || ""]));
      formResets.computeLabel = field => {
        const reset = RESET_DEF.find(item => item.configKey === field.name);
        return tr(this._hass, reset ? `${reset.text}Entity` : field.name);
      };
      formResets.addEventListener("value-changed", event => {
        event.stopPropagation();
        this._fireConfig({ ...this._config, ...event.detail.value });
      });
    });
  }
}

if (!customElements.get("somfy-protexial-card-editor")) {
  customElements.define("somfy-protexial-card-editor", SomfyProtexialCardEditor);
}

class SomfyProtexialCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._rendered = false;
    this._language = null;
    this._refreshing = false;
  }

  static getConfigElement() { return document.createElement("somfy-protexial-card-editor"); }

  static getStubConfig() {
    return {
      alarm_entity: "alarm_control_panel.alarme",
      sensors: SENSORS_DEF.map(sensor => sensor.key),
      labels: {}, entities: {}, title: "",
      auto_detect: true, show_faults: true, show_last_sync: true, show_refresh: true, compact: false,
    };
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    console.info(`%c SOMFY-PROTEXIAL-CARD %c ${CARD_VERSION} `,
      "color:#c8a96e;background:#1e1e2e;font-weight:700;padding:2px 4px;border-radius:4px 0 0 4px",
      "color:#1e1e2e;background:#c8a96e;font-weight:700;padding:2px 4px;border-radius:0 4px 4px 0");
    this.config = {
      alarm_entity: config.alarm_entity || "alarm_control_panel.alarme",
      sensors: config.sensors || SENSORS_DEF.map(sensor => sensor.key),
      labels: config.labels || {},
      entities: config.entities || {},
      title: config.title || "",
      auto_detect: config.auto_detect !== false,
      show_faults: config.show_faults !== false,
      show_last_sync: config.show_last_sync !== false,
      show_refresh: config.show_refresh !== false,
      compact: config.compact === true,
      last_sync_entity: config.last_sync_entity || "",
      refresh_entity: config.refresh_entity || "",
      ...Object.fromEntries(RESET_DEF.map(reset => [reset.configKey, config[reset.configKey] || ""])),
      alarm_code: config.alarm_code,
    };
    this._rendered = false;
  }

  set hass(hass) {
    this._hass = hass;
    const language = languageFor(hass);
    if (!this._rendered || language !== this._language) {
      this._language = language;
      this._rendered = true;
      this._render();
    } else {
      this._update();
    }
  }

  _getState(entityId) { return entityId ? this._hass?.states?.[entityId] : undefined; }

  _allSomfyEntities(domain) {
    return Object.values(this._hass?.states || {}).filter(entity => {
      const id = entity.entity_id.toLowerCase();
      if (domain && !id.startsWith(`${domain}.`)) return false;
      return id.includes("somfy_protexial") || id.includes("somfy_protexiom") ||
        String(entity.attributes?.integration || "").toLowerCase().includes("somfy_protex");
    });
  }

  _findByAliases(domain, aliases = []) {
    const entities = this._allSomfyEntities(domain);
    const lowered = aliases.map(alias => alias.toLowerCase());
    return entities.find(entity => {
      const haystack = `${entity.entity_id} ${entity.attributes?.friendly_name || ""}`.toLowerCase();
      return lowered.some(alias => haystack.includes(alias));
    })?.entity_id;
  }

  _resolveSensorEntity(sensor) {
    const explicit = this.config.entities[sensor.key];
    if (explicit) return explicit;
    if (this._getState(sensor.defaultEntity)) return sensor.defaultEntity;
    if (this.config.auto_detect) return this._findByAliases(sensor.defaultEntity.split(".")[0], sensor.aliases);
    return sensor.defaultEntity;
  }

  _resolveReset(reset) {
    const explicit = this.config[reset.configKey];
    if (explicit) return explicit;
    if (this._getState(reset.defaultEntity)) return reset.defaultEntity;
    return this.config.auto_detect ? this._findByAliases("button", reset.aliases) : reset.defaultEntity;
  }

  _findLastSync() {
    if (this.config.last_sync_entity) return this.config.last_sync_entity;
    if (!this.config.auto_detect) return "";
    return this._findByAliases("sensor", ["derniere_sync", "dernière sync", "derniere_synchronisation", "last_sync", "last update", "last_update"]);
  }

  _findRefresh() {
    if (this.config.refresh_entity) return this.config.refresh_entity;
    if (!this.config.auto_detect) return "";
    return this._findByAliases("button", ["actualiser", "actualisation", "rafraichir", "rafraîchir", "refresh", "synchroniser", "synchronisation", "sync"]);
  }

  _faultEntities() {
    if (!this.config.show_faults) return [];

    const ignored = new Set(
      SENSORS_DEF.map(sensor => this._resolveSensorEntity(sensor)).filter(Boolean)
    );

    const normalLabels = new Set([
      "ok", "normal", "connected", "connecté", "connectee", "connectée",
      "fermé", "fermée", "fermés", "fermées", "closed",
      "non détecté", "non detecte", "not detected"
    ]);

    return this._allSomfyEntities("binary_sensor").filter(entity => {
      if (ignored.has(entity.entity_id)) return false;
      if (["unknown", "unavailable"].includes(entity.state)) return false;

      const dc = entity.attributes?.device_class || "";
      const haystack = `${entity.entity_id} ${entity.attributes?.friendly_name || ""}`.toLowerCase();
      const formatted = this._formatState(entity).trim().toLowerCase();

      // Never report an entity explicitly formatted by HA/integration as healthy.
      if (normalLabels.has(formatted)) return false;

      const isConnectivity =
        dc === "connectivity" ||
        ["communication", "comm ", "radio", "liaison", "link"].some(token => haystack.includes(token));

      // Somfy connectivity entities use ON for a healthy link and OFF for a fault.
      if (isConnectivity) return entity.state === "off";

      const isDiagnostic =
        ["battery", "problem", "tamper", "door", "window", "motion", "safety"].includes(dc) ||
        ["defaut", "défaut", "problem", "batter", "arrachement", "tamper", "ouverture", "alarm"]
          .some(token => haystack.includes(token));

      // Other binary diagnostic entities follow the usual HA convention:
      // ON = active problem, OFF = normal.
      return isDiagnostic && entity.state === "on";
    });
  }

  _formatState(entity) {
    if (!entity) return tr(this._hass, "unavailable");
    if (entity.state === "unavailable") return tr(this._hass, "unavailable");
    if (entity.state === "unknown") return tr(this._hass, "unknown");
    try { return this._hass.formatEntityState(entity); } catch (_) { return entity.state; }
  }

  _formatName(entity, fallbackKey) {
    if (entity) {
      try { return this._hass.formatEntityName(entity); } catch (_) {}
      if (entity.attributes?.friendly_name) return entity.attributes.friendly_name;
    }
    return tr(this._hass, fallbackKey);
  }

  _alarmValues() {
    const entity = this._getState(this.config.alarm_entity);
    const state = entity?.state ?? "unavailable";
    const colors = {
      disarmed: "var(--secondary-text-color)", armed_away: "#206633", armed_home: "#f59e0b",
      armed_night: "#8b5cf6", pending: "#f59e0b", arming: "#f59e0b", triggered: "#ef4444",
      unavailable: "var(--disabled-color)", unknown: "var(--disabled-color)",
    };
    return { label: this._formatState(entity), color: colors[state] || "var(--secondary-text-color)", state, entity };
  }

  _sinceLabel(entityId) {
    const entity = this._getState(entityId);
    if (!entity?.last_changed) return "";
    return this._relativeTime(entity.last_changed);
  }

  _relativeTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value || "");
    const diffMin = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
    if (diffMin < 1) return tr(this._hass, "lessThanMinute");
    if (diffMin < 60) return tr(this._hass, "sinceMinutes", { n: diffMin });
    const hours = Math.floor(diffMin / 60), minutes = diffMin % 60;
    const text = minutes === 0 ? `${hours}h` : `${hours}h${String(minutes).padStart(2, "0")}`;
    return tr(this._hass, "sinceHours", { n: text });
  }

  _entityIcon(entity, sensor) {
    if (entity?.attributes?.icon) return entity.attributes.icon;
    const state = entity?.state;
    const dc = entity?.attributes?.device_class;
    const icons = {
      battery: state === "on" ? "mdi:battery-alert" : "mdi:battery",
      connectivity: state === "on" ? "mdi:lan-disconnect" : "mdi:lan-connect",
      door: state === "on" ? "mdi:door-open" : "mdi:door-closed",
      window: state === "on" ? "mdi:window-open-variant" : "mdi:window-closed-variant",
      motion: state === "on" ? "mdi:motion-sensor" : "mdi:motion-sensor-off",
      tamper: state === "on" ? "mdi:shield-alert" : "mdi:shield-check",
      problem: state === "on" ? "mdi:alert-circle" : "mdi:check-circle",
    };
    if (icons[dc]) return icons[dc];
    const fallback = {
      capteur1: state === "on" ? "mdi:battery-alert" : "mdi:battery",
      capteur2: state === "on" ? "mdi:alert-circle" : "mdi:shield-check",
      capteur3: state === "on" ? "mdi:door-open" : "mdi:door-closed",
      capteur4: state === "on" ? "mdi:motion-sensor" : "mdi:motion-sensor-off",
      capteur5: state === "on" ? "mdi:cctv" : "mdi:cctv-off",
      capteur6: state === "on" ? "mdi:radio-tower" : "mdi:radio-tower-off",
      capteur7: state === "on" ? "mdi:signal" : "mdi:signal-off",
      capteur8: "mdi:access-point-network",
      capteur9: "mdi:signal-cellular-3",
    };
    return fallback[sensor?.key] || "mdi:alert-circle-outline";
  }

  _sensorValues(sensor) {
    const entityId = this._resolveSensorEntity(sensor);
    const entity = this._getState(entityId);
    const state = entity?.state ?? "unavailable";
    const unavailable = ["unavailable", "unknown"].includes(state);
    const statusLabel = this._formatState(entity);
    if (sensor.type === "binary") {
      const isOk = state === sensor.okState;
      const color = unavailable ? "var(--disabled-color)" : isOk ? "#22c55e" : "#ef4444";
      return { entityId, entity, statusLabel, statusColor: color, dotColor: color, icon: this._entityIcon(entity, sensor) };
    }
    return {
      entityId, entity, statusLabel,
      statusColor: unavailable ? "var(--disabled-color)" : "var(--primary-text-color)",
      dotColor: unavailable ? "var(--disabled-color)" : "var(--primary-color)",
      icon: this._entityIcon(entity, sensor),
    };
  }

  _supportedAlarmActions() {
    const entity = this._getState(this.config.alarm_entity);
    const features = Number(entity?.attributes?.supported_features || 0);
    const actions = [{ key: "disarm", label: "disarm", cls: "btn-disarm", icon: "mdi:lock-open-variant" }];
    if (!features || (features & ALARM_FEATURES.ARM_HOME)) actions.push({ key: "arm_home", label: "home", cls: "btn-arm-home", icon: "mdi:home-lock" });
    if (!features || (features & ALARM_FEATURES.ARM_AWAY)) actions.push({ key: "arm_away", label: "away", cls: "btn-arm-away", icon: "mdi:shield-lock" });
    if (features & ALARM_FEATURES.ARM_NIGHT) actions.push({ key: "arm_night", label: "night", cls: "btn-arm-night", icon: "mdi:weather-night" });
    return actions;
  }

  _connectionOk() {
    const alarm = this._getState(this.config.alarm_entity);
    return alarm && !["unavailable", "unknown"].includes(alarm.state);
  }

  _lastSyncText() {
    const entityId = this._findLastSync();
    const entity = this._getState(entityId);
    if (!entity) return "";
    const raw = entity.state;
    if (!raw || ["unknown", "unavailable"].includes(raw)) return this._formatState(entity);
    return this._relativeTime(raw);
  }

  _render() {
    if (!this._hass) return;
    const alarm = this._alarmValues();
    const isArmed = !["disarmed", "unavailable", "unknown"].includes(alarm.state);
    const activeSensors = SENSORS_DEF.filter(sensor => this.config.sensors.includes(sensor.key));
    const resets = RESET_DEF.map(reset => ({ ...reset, entityId: this._resolveReset(reset) })).filter(reset => this._getState(reset.entityId));
    const faultEntities = this._faultEntities();
    const refreshEntity = this._findRefresh();
    const lastSyncText = this._lastSyncText();
    const connectionOk = this._connectionOk();
    const alarmActions = this._supportedAlarmActions();

    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; font-family:var(--primary-font-family, sans-serif); }
        .card { background:var(--ha-card-background, var(--card-background-color)); border-radius:var(--ha-card-border-radius, 12px); overflow:hidden; border:1px solid var(--divider-color); box-shadow:var(--ha-card-box-shadow, none); }
        .alarm-section { padding:${this.config.compact ? "12px" : "16px"}; background:var(--secondary-background-color); border-bottom:1px solid var(--divider-color); }
        .topline { display:flex; align-items:center; gap:8px; margin-bottom:${this.config.compact ? "8px" : "14px"}; }
        .section-title { flex:1; font-size:11px; font-weight:700; letter-spacing:1.6px; text-transform:uppercase; color:var(--secondary-text-color); }
        .connection { display:flex; align-items:center; justify-content:flex-end; gap:5px; font-size:11px; color:var(--secondary-text-color); white-space:nowrap; }
        .connection-dot { width:7px; height:7px; border-radius:50%; background:${connectionOk ? "#22c55e" : "#ef4444"}; }
        .refresh-zone { display:flex; align-items:center; gap:7px; flex-shrink:0; }
        .status-sync-stack { display:flex; flex-direction:column; align-items:flex-end; gap:2px; min-width:0; }
        .refresh-sync { display:flex; flex-direction:column; align-items:flex-end; gap:1px; min-width:0; }
        .refresh-sync-label { font-size:9px; line-height:1.15; color:var(--secondary-text-color); white-space:nowrap; }
        .refresh-sync-value { font-size:10px; line-height:1.2; color:var(--primary-text-color); white-space:nowrap; font-weight:600; }
        .refresh-icon-btn { width:32px; height:32px; border:0; border-radius:50%; display:flex; align-items:center; justify-content:center; background:transparent; color:var(--primary-text-color); cursor:pointer; flex-shrink:0; }
        .refresh-icon-btn:hover { background:var(--secondary-background-color); }
        .refresh-icon-btn[disabled] { opacity:.5; cursor:default; }
        .spin { animation:spin 1s linear infinite; } @keyframes spin { to { transform:rotate(360deg); } }
        .alarm-row { display:flex; align-items:center; gap:14px; }
        .alarm-icon-wrap { width:${this.config.compact ? "42px" : "48px"}; height:${this.config.compact ? "42px" : "48px"}; display:flex; align-items:center; justify-content:center; border-radius:12px; background:var(--primary-background-color); flex-shrink:0; color:${alarm.color}; ${isArmed ? `box-shadow:0 0 14px ${alarm.color}88;` : ""} }
        .alarm-info { flex:1; display:flex; flex-direction:column; gap:3px; min-width:0; cursor:pointer; }
        .alarm-name { font-size:15px; font-weight:600; color:var(--primary-text-color); }
        .alarm-state-row { display:flex; align-items:baseline; gap:8px; flex-wrap:wrap; }
        .alarm-state { font-size:13px; color:${alarm.color}; }
        .alarm-since { font-size:11px; color:var(--secondary-text-color); font-style:italic; }
        .alarm-actions { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:7px; max-width:${this.config.compact ? "250px" : "320px"}; }
        .btn { min-height:36px; padding:0 10px; border-radius:8px; border:none; box-sizing:border-box; font:600 12px var(--primary-font-family, sans-serif); cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; transition:opacity .2s, transform .1s; white-space:nowrap; }
        .btn:hover { opacity:.85; transform:translateY(-1px); } .btn:active { transform:translateY(0); }
        .btn ha-icon { --mdc-icon-size:17px; }
        .btn-disarm { background:#4b5563; color:#fff; } .btn-arm-away { background:#206633; color:#fff; }
        .btn-arm-home { background:#f59e0b; color:#fff; } .btn-arm-night { background:#7c3aed; color:#fff; }
        .section { padding:${this.config.compact ? "10px 12px" : "14px 16px"}; background:var(--ha-card-background, var(--card-background-color)); }
        .section + .section { border-top:1px solid var(--divider-color); }
        .section-head { display:flex; align-items:center; margin-bottom:6px; }
        .section-head .section-title { margin:0; }
        .sensor-row, .fault-row { display:flex; align-items:center; gap:12px; padding:${this.config.compact ? "7px 0" : "10px 0"}; border-bottom:1px solid var(--divider-color); cursor:pointer; }
        .sensor-row:last-child, .fault-row:last-child { border-bottom:none; }
        .sensor-row:hover, .fault-row:hover { background:color-mix(in srgb, var(--primary-color) 5%, transparent); }
        .sensor-icon, .fault-icon { --mdc-icon-size:22px; color:var(--secondary-text-color); flex-shrink:0; }
        .fault-icon { color:#ef4444; }
        .sensor-label, .fault-info { flex:1; min-width:0; font-size:14px; color:var(--primary-text-color); }
        .fault-name { font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .fault-state { font-size:11px; color:var(--secondary-text-color); margin-top:2px; }
        .sensor-status { display:flex; align-items:center; gap:6px; font-size:13px; font-weight:600; text-align:right; }
        .dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
        .ok-box { display:flex; align-items:center; gap:8px; color:#22c55e; font-size:13px; padding:8px 0; }
        .reset-grid { display:grid; grid-template-columns:repeat(${Math.max(1, Math.min(3, resets.length))}, minmax(0, 1fr)); gap:8px; }
        .reset-btn { min-width:0; width:100%; min-height:42px; padding:6px 8px; background:var(--secondary-background-color); color:var(--primary-text-color); border:1px solid var(--divider-color); white-space:normal; }
        .footer { display:flex; align-items:center; gap:10px; padding:7px 16px; border-top:1px solid var(--divider-color); color:var(--disabled-color); font-size:10px; }
        .last-sync { flex:1; display:flex; align-items:center; gap:5px; }
        .version { margin-left:auto; }
        .modal-backdrop { position:fixed; inset:0; z-index:1000; display:none; align-items:center; justify-content:center; background:rgba(0,0,0,.45); padding:20px; }
        .modal-backdrop.open { display:flex; }
        .modal { width:min(380px, 100%); background:var(--ha-card-background, var(--card-background-color)); border-radius:16px; box-shadow:0 18px 50px rgba(0,0,0,.35); padding:20px; color:var(--primary-text-color); }
        .modal-title { font-size:18px; font-weight:700; margin-bottom:10px; }
        .modal-message { font-size:14px; color:var(--secondary-text-color); margin-bottom:14px; }
        .pin-entry { display:none; }
        .pin-entry.open { display:block; }

        .pin-display {
          min-height:50px;
          box-sizing:border-box;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:10px 14px;
          margin-bottom:14px;
          border:1px solid var(--divider-color);
          border-radius:10px;
          background:var(--primary-background-color);
          color:var(--primary-text-color);
          font-size:24px;
          font-weight:700;
          letter-spacing:7px;
          outline:none;
          user-select:none;
        }
        .pin-display:focus {
          border-color:var(--primary-color);
          box-shadow:0 0 0 1px var(--primary-color);
        }
        .pin-placeholder {
          color:var(--secondary-text-color);
          font-size:13px;
          font-weight:400;
          letter-spacing:0;
        }

        .pin-keypad {
          display:grid;
          grid-template-columns:repeat(3, minmax(0, 1fr));
          gap:9px;
        }
        .pin-key {
          height:52px;
          border:1px solid var(--divider-color);
          border-radius:12px;
          background:var(--secondary-background-color);
          color:var(--primary-text-color);
          font:600 20px var(--primary-font-family, sans-serif);
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
          transition:background .15s ease, transform .08s ease;
          -webkit-tap-highlight-color:transparent;
        }
        .pin-key:hover {
          background:color-mix(in srgb, var(--primary-color) 8%, var(--secondary-background-color));
        }
        .pin-key:active {
          transform:scale(.96);
        }
        .pin-key-action {
          color:var(--secondary-text-color);
        }
        .pin-key-action ha-icon {
          --mdc-icon-size:22px;
        }

        .modal-actions { display:flex; justify-content:flex-end; gap:8px; margin-top:16px; }
        .modal-actions button { min-height:36px; border-radius:8px; padding:0 14px; border:0; cursor:pointer; font-weight:600; }
        .secondary { background:var(--secondary-background-color); color:var(--primary-text-color); }
        .primary { background:var(--primary-color); color:var(--text-primary-color, #fff); }
        @media (max-width:650px) { .alarm-row { align-items:flex-start; flex-wrap:wrap; } .alarm-actions { width:100%; max-width:none; justify-content:flex-start; } .btn { flex:1; min-width:82px; } .reset-grid { grid-template-columns:1fr; } .connection { font-size:9px; } .connection span { display:inline; } .refresh-sync-label { display:none; } .refresh-sync-value { font-size:9px; } }
      </style>
      <ha-card class="card">
        <div class="alarm-section">
          <div class="topline">
            <div class="section-title">${this.config.title || tr(this._hass, "defaultTitle")}</div>
            ${(this.config.show_refresh || (this.config.show_last_sync && lastSyncText)) ? `
              <div class="refresh-zone">
                <div class="status-sync-stack">
                  <div class="connection" title="${connectionOk ? tr(this._hass, "connected") : tr(this._hass, "disconnected")}">
                    <span class="connection-dot"></span>
                    <span>${connectionOk ? tr(this._hass, "connected") : tr(this._hass, "disconnected")}</span>
                  </div>
                  ${this.config.show_last_sync && lastSyncText ? `
                    <div class="refresh-sync">
                      <span class="refresh-sync-label">${tr(this._hass, "lastSync")}</span>
                      <span class="refresh-sync-value">${lastSyncText}</span>
                    </div>` : ""}
                </div>
                ${this.config.show_refresh ? `<button class="refresh-icon-btn" data-refresh title="${tr(this._hass, "refresh")}"><ha-icon icon="mdi:refresh"></ha-icon></button>` : ""}
              </div>` : ""}
          </div>
          <div class="alarm-row">
            <div class="alarm-icon-wrap"><ha-icon icon="mdi:shield-home" style="--mdc-icon-size:26px"></ha-icon></div>
            <div class="alarm-info" data-more-info="${this.config.alarm_entity}" title="${tr(this._hass, "clickDetails")}">
              <span class="alarm-name">${this._formatName(alarm.entity, "alarm")}</span>
              <div class="alarm-state-row"><span class="alarm-state">${alarm.label}</span><span class="alarm-since">${this._sinceLabel(this.config.alarm_entity)}</span></div>
            </div>
            <div class="alarm-actions">
              ${alarmActions.map(action => `<button class="btn ${action.cls}" data-alarm-action="${action.key}"><ha-icon icon="${action.icon}"></ha-icon>${tr(this._hass, action.label)}</button>`).join("")}
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-head"><div class="section-title">${tr(this._hass, "sensorsTitle")}</div></div>
          ${activeSensors.length ? activeSensors.map(sensor => {
            const values = this._sensorValues(sensor);
            const label = this.config.labels[sensor.key] || this._formatName(values.entity, sensor.defaultText);
            return `<div class="sensor-row" data-key="${sensor.key}" ${values.entityId ? `data-more-info="${values.entityId}"` : ""}>
              <ha-icon class="sensor-icon" icon="${values.icon}"></ha-icon>
              <span class="sensor-label">${label}</span>
              <span class="sensor-status" style="color:${values.statusColor}"><span class="dot" style="background:${values.dotColor}"></span><span class="sensor-val">${values.statusLabel}</span></span>
            </div>`;
          }).join("") : `<div class="ok-box">${tr(this._hass, "noSensors")}</div>`}
        </div>

        ${this.config.show_faults ? `<div class="section">
          <div class="section-head"><div class="section-title">${tr(this._hass, "faultsTitle")}${faultEntities.length ? ` (${faultEntities.length})` : ""}</div></div>
          ${faultEntities.length ? faultEntities.map(entity => `<div class="fault-row" data-more-info="${entity.entity_id}">
            <ha-icon class="fault-icon" icon="${this._entityIcon(entity)}"></ha-icon>
            <div class="fault-info"><div class="fault-name">${this._formatName(entity, "faultsTitle")}</div><div class="fault-state">${this._formatState(entity)}</div></div>
          </div>`).join("") : `<div class="ok-box"><ha-icon icon="mdi:check-circle"></ha-icon>${tr(this._hass, "noFaults")}</div>`}
        </div>` : ""}

        ${resets.length ? `<div class="section">
          <div class="section-head"><div class="section-title">${tr(this._hass, "resetsTitle")}</div></div>
          <div class="reset-grid">${resets.map(reset => `<button class="btn reset-btn" data-reset-key="${reset.key}" data-entity-id="${reset.entityId}"><ha-icon icon="${reset.icon}"></ha-icon><span>${tr(this._hass, reset.text)}</span></button>`).join("")}</div>
        </div>` : ""}

        <div class="footer">
          <span></span>
          <span class="version">Somfy Protexial Card ${CARD_VERSION}</span>
        </div>
      </ha-card>

      <div class="modal-backdrop" id="modal">
        <div class="modal">
          <div class="modal-title" id="modal-title"></div>
          <div class="modal-message" id="modal-message"></div>

          <div class="pin-entry" id="pin-entry">
            <div
              class="pin-display"
              id="pin-display"
              tabindex="0"
              role="textbox"
              aria-label="${tr(this._hass, "codeTitle")}"
              aria-readonly="true">
              <span class="pin-placeholder">${tr(this._hass, "codePlaceholder")}</span>
            </div>

            <div class="pin-keypad" id="pin-keypad">
              ${[1,2,3,4,5,6,7,8,9].map(number => `
                <button type="button" class="pin-key" data-pin-key="${number}">${number}</button>
              `).join("")}

              <button
                type="button"
                class="pin-key pin-key-action"
                data-pin-clear
                title="${tr(this._hass, "keypadClear")}">
                <ha-icon icon="mdi:close-circle-outline"></ha-icon>
              </button>

              <button type="button" class="pin-key" data-pin-key="0">0</button>

              <button
                type="button"
                class="pin-key pin-key-action"
                data-pin-backspace
                title="${tr(this._hass, "keypadBackspace")}">
                <ha-icon icon="mdi:backspace-outline"></ha-icon>
              </button>
            </div>
          </div>

          <div class="modal-actions">
            <button class="secondary" data-modal-cancel>${tr(this._hass, "cancel")}</button>
            <button class="primary" data-modal-confirm>${tr(this._hass, "confirm")}</button>
          </div>
        </div>
      </div>`;

    this.shadowRoot.querySelectorAll("[data-more-info]").forEach(row => {
      row.addEventListener("click", event => {
        if (event.target.closest("button")) return;
        fireMoreInfo(this, row.dataset.moreInfo);
      });
    });
    this.shadowRoot.querySelectorAll("[data-alarm-action]").forEach(button => {
      button.addEventListener("click", () => this._callAlarmAction(button.dataset.alarmAction));
    });
    this.shadowRoot.querySelectorAll("[data-reset-key]").forEach(button => {
      button.addEventListener("click", () => this._callReset(button.dataset.resetKey, button.dataset.entityId));
    });
    const refresh = this.shadowRoot.querySelector("[data-refresh]");
    if (refresh) refresh.addEventListener("click", () => this._refresh(refreshEntity));
  }

  _showModal({ title, message = "", input = false, confirmText, inputPlaceholder = "" }) {
    return new Promise(resolve => {
      const modal = this.shadowRoot.getElementById("modal");
      const titleEl = this.shadowRoot.getElementById("modal-title");
      const messageEl = this.shadowRoot.getElementById("modal-message");
      const pinEntry = this.shadowRoot.getElementById("pin-entry");
      const pinDisplay = this.shadowRoot.getElementById("pin-display");
      const confirmBtn = modal.querySelector("[data-modal-confirm]");
      const cancelBtn = modal.querySelector("[data-modal-cancel]");

      let pinValue = "";

      titleEl.textContent = title;
      messageEl.textContent = message;
      messageEl.style.display = message ? "" : "none";
      pinEntry.classList.toggle("open", input);
      confirmBtn.textContent = confirmText || tr(this._hass, "confirm");

      const updatePinDisplay = () => {
        if (!input) return;

        if (!pinValue.length) {
          pinDisplay.innerHTML = `<span class="pin-placeholder">${inputPlaceholder || tr(this._hass, "codePlaceholder")}</span>`;
          confirmBtn.disabled = true;
        } else {
          pinDisplay.textContent = "•".repeat(pinValue.length);
          confirmBtn.disabled = false;
        }
      };

      const appendDigit = digit => {
        if (!input || !/^\d$/.test(String(digit))) return;

        // Somfy PINs are normally short. Keep a generous upper limit
        // so the card remains compatible with other alarm panels.
        if (pinValue.length >= 12) return;

        pinValue += String(digit);
        updatePinDisplay();
      };

      const backspace = () => {
        if (!input || !pinValue.length) return;
        pinValue = pinValue.slice(0, -1);
        updatePinDisplay();
      };

      const clearPin = () => {
        if (!input) return;
        pinValue = "";
        updatePinDisplay();
      };

      const close = result => {
        modal.classList.remove("open");

        confirmBtn.onclick = null;
        cancelBtn.onclick = null;
        modal.onclick = null;
        pinDisplay.onkeydown = null;

        modal.querySelectorAll("[data-pin-key]").forEach(button => {
          button.onclick = null;
        });

        const clearButton = modal.querySelector("[data-pin-clear]");
        const backspaceButton = modal.querySelector("[data-pin-backspace]");
        if (clearButton) clearButton.onclick = null;
        if (backspaceButton) backspaceButton.onclick = null;

        pinValue = "";
        updatePinDisplay();
        resolve(result);
      };

      modal.querySelectorAll("[data-pin-key]").forEach(button => {
        button.onclick = event => {
          event.preventDefault();
          appendDigit(button.dataset.pinKey);
        };
      });

      const clearButton = modal.querySelector("[data-pin-clear]");
      if (clearButton) {
        clearButton.onclick = event => {
          event.preventDefault();
          clearPin();
        };
      }

      const backspaceButton = modal.querySelector("[data-pin-backspace]");
      if (backspaceButton) {
        backspaceButton.onclick = event => {
          event.preventDefault();
          backspace();
        };
      }

      confirmBtn.onclick = () => {
        if (input && !pinValue.length) return;
        close(input ? pinValue : true);
      };

      cancelBtn.onclick = () => close(null);

      modal.onclick = event => {
        if (event.target === modal) close(null);
      };

      pinDisplay.onkeydown = event => {
        if (!input) return;

        if (/^\d$/.test(event.key)) {
          event.preventDefault();
          appendDigit(event.key);
          return;
        }

        if (event.key === "Backspace") {
          event.preventDefault();
          backspace();
          return;
        }

        if (event.key === "Delete") {
          event.preventDefault();
          clearPin();
          return;
        }

        if (event.key === "Enter" && pinValue.length) {
          event.preventDefault();
          close(pinValue);
          return;
        }

        if (event.key === "Escape") {
          event.preventDefault();
          close(null);
        }
      };

      updatePinDisplay();
      modal.classList.add("open");

      if (input) {
        requestAnimationFrame(() => pinDisplay.focus());
      }
    });
  }

  async _callAlarmAction(action) {
    const entity = this._getState(this.config.alarm_entity);
    const codeRequired = Boolean(entity?.attributes?.code_format || entity?.attributes?.code_arm_required === true);
    let code = this.config.alarm_code;
    if (codeRequired && !code) {
      code = await this._showModal({
        title: tr(this._hass, "codeTitle"),
        input: true,
        inputPlaceholder: tr(this._hass, "codePlaceholder"),
        confirmText: tr(this._hass, "validate"),
      });
      if (!code) return;
    }
    const serviceMap = {
      disarm: "alarm_disarm",
      arm_home: "alarm_arm_home",
      arm_away: "alarm_arm_away",
      arm_night: "alarm_arm_night",
    };
    const service = serviceMap[action];
    if (!service) return;
    try {
      await this._hass.callService("alarm_control_panel", service, code ? { code } : {}, { entity_id: this.config.alarm_entity });
    } catch (error) {
      console.error("Somfy Protexial Card alarm action failed", error);
    }
  }

  async _callReset(key, entityId) {
    const reset = RESET_DEF.find(item => item.key === key);
    if (!reset || !entityId) return;
    const entity = this._getState(entityId);
    const label = this._formatName(entity, reset.text);
    const confirmed = await this._showModal({
      title: tr(this._hass, "confirmReset"),
      message: label,
      confirmText: tr(this._hass, "confirm"),
    });
    if (!confirmed) return;
    try {
      await this._hass.callService("button", "press", {}, { entity_id: entityId });
    } catch (error) {
      console.error("Somfy Protexial Card reset failed", error);
    }
  }

  async _refresh(refreshEntity) {
    if (this._refreshing) return;
    this._refreshing = true;
    this._updateRefreshButton();
    try {
      if (refreshEntity && this._getState(refreshEntity)) {
        await this._hass.callService("button", "press", {}, { entity_id: refreshEntity });
      } else {
        const ids = SENSORS_DEF.map(sensor => this._resolveSensorEntity(sensor))
          .concat([this.config.alarm_entity])
          .filter(entityId => entityId && this._getState(entityId));
        if (ids.length) {
          await this._hass.callService("homeassistant", "update_entity", {}, { entity_id: ids });
        }
      }
    } catch (error) {
      console.error("Somfy Protexial Card refresh failed", error);
    } finally {
      window.setTimeout(() => {
        this._refreshing = false;
        this._updateRefreshButton();
      }, 600);
    }
  }

  _updateRefreshButton() {
    const button = this.shadowRoot.querySelector("[data-refresh]");
    if (!button) return;
    button.disabled = this._refreshing;
    const icon = button.querySelector("ha-icon");
    if (icon) icon.classList.toggle("spin", this._refreshing);
    button.title = this._refreshing ? tr(this._hass, "refreshing") : tr(this._hass, "refresh");
  }

  _update() {
    if (!this._hass || !this.shadowRoot.querySelector(".card")) return;
    if (this.shadowRoot.getElementById("modal")?.classList.contains("open")) return;
    // Dynamic fault sections can appear/disappear when entity states change.
    this._render();
    this._updateRefreshButton();
  }

  getCardSize() {
    const base = this.config?.compact ? 5 : 7;
    return base + (this.config?.show_faults ? 1 : 0);
  }
}

if (!customElements.get("somfy-protexial-card")) {
  customElements.define("somfy-protexial-card", SomfyProtexialCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some(card => card.type === "somfy-protexial-card")) {
  window.customCards.push({
    type: "somfy-protexial-card",
    name: "Somfy Protexial Card",
    description: "Multilingual card for Somfy Protexial and Protexiom alarm systems",
    configurable: true,
  });
}

/* Somfy Protexial Elements Card */
const ELEMENTS_CARD_VERSION = "v2.1.1";

const ELEMENTS_TRANSLATIONS = {
  fr: {
    battery:"Batterie", link:"Liaison", house:"Défaut", tamper:"Arrachement", door:"Ouverture", state:"État", zone:"Zone",
    openings:"Ouvertures", motion:"Mouvements", technical:"Technique", control:"Centrale", sirens:"Sirènes", keypads:"Claviers",
    remotes:"Télécommandes", badges:"Badges", other:"Autres", total:"Nombre total d’éléments", errors:"Éléments en erreur",
    allOk:"Tout est OK", fault:"Défaut détecté", unavailable:"Indisponible", unknown:"Inconnu", pause:"Pause", reactivate:"Réactiver",
    pauseTitle:"Mettre l’élément en pause", reactivateTitle:"Réactiver l’élément", loading:"Chargement des éléments…",
    noDevice:"Sélectionne l’appareil Somfy dans l’éditeur.", noElements:"Aucun élément Somfy avec attributs de diagnostic n’a été trouvé.",
    device:"Appareil Somfy", title:"Titre", onlyProblems:"Afficher uniquement les équipements en défaut",
    showEntityId:"Afficher les entity_id", compact:"Mode compact"
  },
  en: {
    battery:"Battery", link:"Link", house:"Fault", tamper:"Tamper", door:"Opening", state:"State", zone:"Zone",
    openings:"Openings", motion:"Motion", technical:"Technical", control:"Control", sirens:"Sirens", keypads:"Keypads",
    remotes:"Remotes", badges:"Badges", other:"Other", total:"Total equipment", errors:"Equipment with errors",
    allOk:"Everything OK", fault:"Fault detected", unavailable:"Unavailable", unknown:"Unknown", pause:"Pause", reactivate:"Reactivate",
    pauseTitle:"Pause equipment", reactivateTitle:"Reactivate equipment", loading:"Loading equipment…",
    noDevice:"Select the Somfy device in the editor.", noElements:"No Somfy equipment with diagnostic attributes was found.",
    device:"Somfy device", title:"Title", onlyProblems:"Show only equipment with faults", showEntityId:"Show entity IDs", compact:"Compact mode"
  },
  de: {
    battery:"Batterie", link:"Verbindung", house:"Fehler", tamper:"Sabotage", door:"Öffnung", state:"Status", zone:"Zone",
    openings:"Öffnungen", motion:"Bewegung", technical:"Technik", control:"Zentrale", sirens:"Sirenen", keypads:"Tastaturen",
    remotes:"Fernbedienungen", badges:"Badges", other:"Andere", total:"Anzahl Elemente", errors:"Elemente mit Fehler",
    allOk:"Alles OK", fault:"Fehler erkannt", unavailable:"Nicht verfügbar", unknown:"Unbekannt", pause:"Pausieren", reactivate:"Reaktivieren",
    pauseTitle:"Element pausieren", reactivateTitle:"Element reaktivieren", loading:"Elemente werden geladen…",
    noDevice:"Somfy-Gerät im Editor auswählen.", noElements:"Keine Somfy-Elemente mit Diagnoseattributen gefunden.",
    device:"Somfy-Gerät", title:"Titel", onlyProblems:"Nur fehlerhafte Geräte anzeigen", showEntityId:"Entity-IDs anzeigen", compact:"Kompaktmodus"
  },
  es: {
    battery:"Batería", link:"Enlace", house:"Fallo", tamper:"Sabotaje", door:"Apertura", state:"Estado", zone:"Zona",
    openings:"Aperturas", motion:"Movimiento", technical:"Técnico", control:"Central", sirens:"Sirenas", keypads:"Teclados",
    remotes:"Mandos", badges:"Badges", other:"Otros", total:"Número total de elementos", errors:"Elementos con error",
    allOk:"Todo OK", fault:"Fallo detectado", unavailable:"No disponible", unknown:"Desconocido", pause:"Pausar", reactivate:"Reactivar",
    pauseTitle:"Pausar elemento", reactivateTitle:"Reactivar elemento", loading:"Cargando elementos…",
    noDevice:"Selecciona el dispositivo Somfy en el editor.", noElements:"No se encontraron elementos Somfy con atributos de diagnóstico.",
    device:"Dispositivo Somfy", title:"Título", onlyProblems:"Mostrar solo equipos con fallos", showEntityId:"Mostrar entity_id", compact:"Modo compacto"
  },
  it: {
    battery:"Batteria", link:"Collegamento", house:"Anomalia", tamper:"Manomissione", door:"Apertura", state:"Stato", zone:"Zona",
    openings:"Aperture", motion:"Movimento", technical:"Tecnico", control:"Centrale", sirens:"Sirene", keypads:"Tastiere",
    remotes:"Telecomandi", badges:"Badge", other:"Altri", total:"Numero totale elementi", errors:"Elementi in errore",
    allOk:"Tutto OK", fault:"Anomalia rilevata", unavailable:"Non disponibile", unknown:"Sconosciuto", pause:"Pausa", reactivate:"Riattiva",
    pauseTitle:"Metti in pausa l’elemento", reactivateTitle:"Riattiva l’elemento", loading:"Caricamento elementi…",
    noDevice:"Seleziona il dispositivo Somfy nell’editor.", noElements:"Nessun elemento Somfy con attributi diagnostici trovato.",
    device:"Dispositivo Somfy", title:"Titolo", onlyProblems:"Mostra solo dispositivi con anomalie", showEntityId:"Mostra entity_id", compact:"Modalità compatta"
  },
  nl: {
    battery:"Batterij", link:"Verbinding", house:"Storing", tamper:"Sabotage", door:"Opening", state:"Status", zone:"Zone",
    openings:"Openingen", motion:"Beweging", technical:"Techniek", control:"Centrale", sirens:"Sirenes", keypads:"Bedienpanelen",
    remotes:"Afstandsbedieningen", badges:"Badges", other:"Overige", total:"Totaal aantal elementen", errors:"Elementen met fout",
    allOk:"Alles OK", fault:"Fout gedetecteerd", unavailable:"Niet beschikbaar", unknown:"Onbekend", pause:"Pauze", reactivate:"Heractiveren",
    pauseTitle:"Element pauzeren", reactivateTitle:"Element heractiveren", loading:"Elementen laden…",
    noDevice:"Selecteer het Somfy-apparaat in de editor.", noElements:"Geen Somfy-elementen met diagnostische attributen gevonden.",
    device:"Somfy-apparaat", title:"Titel", onlyProblems:"Alleen apparaten met fouten tonen", showEntityId:"Entity-ID’s tonen", compact:"Compacte modus"
  },
  pt: {
    battery:"Bateria", link:"Ligação", house:"Falha", tamper:"Violação", door:"Abertura", state:"Estado", zone:"Zona",
    openings:"Aberturas", motion:"Movimento", technical:"Técnico", control:"Central", sirens:"Sirenes", keypads:"Teclados",
    remotes:"Comandos", badges:"Crachás", other:"Outros", total:"Número total de elementos", errors:"Elementos com erro",
    allOk:"Tudo OK", fault:"Falha detetada", unavailable:"Indisponível", unknown:"Desconhecido", pause:"Pausa", reactivate:"Reativar",
    pauseTitle:"Colocar elemento em pausa", reactivateTitle:"Reativar elemento", loading:"A carregar elementos…",
    noDevice:"Selecione o dispositivo Somfy no editor.", noElements:"Nenhum elemento Somfy com atributos de diagnóstico foi encontrado.",
    device:"Dispositivo Somfy", title:"Título", onlyProblems:"Mostrar apenas equipamentos com falhas", showEntityId:"Mostrar entity_id", compact:"Modo compacto"
  }
};

function elementsLanguage(hass) {
  const language = (hass?.locale?.language || hass?.language || navigator.language || "en").toLowerCase().split("-")[0];
  return ELEMENTS_TRANSLATIONS[language] ? language : "en";
}

function et(hass, key) {
  const lang = elementsLanguage(hass);
  return ELEMENTS_TRANSLATIONS[lang]?.[key] || ELEMENTS_TRANSLATIONS.en[key] || key;
}

const ELEMENT_ATTRS = [
  { key: "Battery", tkey: "battery", fr: "Batterie", en: "Battery", icon: "mdi:battery", ok: ["ok"] },
  { key: "Link", tkey: "link", fr: "Liaison", en: "Link", icon: "mdi:radio-tower", ok: ["connected"] },
  { key: "House", tkey: "house", fr: "Défaut", en: "House", icon: "mdi:home-alert", ok: ["ok"] },
  { key: "Tamper", tkey: "tamper", fr: "Arrachement", en: "Tamper", icon: "mdi:shield-alert", ok: ["ok"] },
  { key: "Door open", tkey: "door", fr: "Ouverture", en: "Door", icon: "mdi:door", ok: ["closed"] },
  { key: "Running", tkey: "state", fr: "État", en: "State", icon: "mdi:pause-circle-outline", ok: ["running"] },
  { key: "Zone", tkey: "zone", fr: "Zone", en: "Zone", icon: "mdi:map-marker-radius", neutral: true },
];

const ELEMENT_CATEGORIES = [
  { key: "opening", tkey:"openings", fr: "Ouvertures", en: "Openings", icon: "mdi:door-open" },
  { key: "motion", tkey:"motion", fr: "Mouvements", en: "Motion", icon: "mdi:motion-sensor" },
  { key: "technical", tkey:"technical", fr: "Technique", en: "Technical", icon: "mdi:cog-outline" },
];

const TECHNICAL_SUBCATEGORIES = [
  { key: "control", tkey:"control", fr: "Centrale", en: "Control", icon: "mdi:shield-home-outline" },
  { key: "siren", tkey:"sirens", fr: "Sirènes", en: "Sirens", icon: "mdi:bullhorn" },
  { key: "keypad", tkey:"keypads", fr: "Claviers", en: "Keypads", icon: "mdi:dialpad" },
  { key: "remote", tkey:"remotes", fr: "Télécommandes", en: "Remotes", icon: "mdi:remote" },
  { key: "badge", tkey:"badges", fr: "Badges", en: "Badges", icon: "mdi:key-variant" },
  { key: "other", tkey:"other", fr: "Autres", en: "Other", icon: "mdi:dots-horizontal-circle-outline" },
];

function spLang(hass) { return elementsLanguage(hass); }

function spMoreInfo(el, entityId) {
  el.dispatchEvent(new CustomEvent("hass-more-info", {
    detail: { entityId }, bubbles: true, composed: true
  }));
}

class SomfyProtexialElementsCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._config = {};
    this._built = false;
    this._language = null;
  }

  set hass(hass) {
    const newLanguage = elementsLanguage(hass);
    const languageChanged =
      this._language &&
      this._language !== newLanguage;

    this._hass = hass;
    this._language = newLanguage;

    if (!this._built || languageChanged) {
      this._render();
    }
  }

  setConfig(config) {
    const nextConfig = { ...config };

    // Home Assistant can call `hass` before `setConfig()` when an existing
    // card is reopened in the dashboard editor. In that case the ha-form
    // may already have been built with an empty configuration.
    //
    // Compare the normalized form values BEFORE replacing this._config.
    // If the incoming saved configuration is genuinely different, update
    // form.data once so the previously selected device is restored.
    //
    // When the change comes from this editor itself, _fire() has already
    // stored the same config in this._config, so no form.data reassignment
    // occurs. This avoids recreating / refreshing the open device selector.
    const previousData = this._formData();
    const nextData = this._formDataFor(nextConfig);
    const configChanged =
      JSON.stringify(previousData) !== JSON.stringify(nextData);

    this._config = nextConfig;

    if (!this._built) {
      this._render();
      return;
    }

    if (configChanged) {
      const form = this.shadowRoot.getElementById("form");
      if (form) {
        form.data = nextData;
      }
    }
  }

  _fire(config) {
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true
    }));
  }

  _formDataFor(config = {}) {
    return {
      device_id: config.device_id || "",
      title: config.title || "",
      only_problems: config.only_problems === true,
      show_entity_id: config.show_entity_id === true,
      compact: config.compact === true,
    };
  }

  _formData() {
    return this._formDataFor(this._config);
  }

  _render() {
    if (!this._hass) return;

    this._built = true;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; }
        ha-form { display:block; }
      </style>
      <ha-form id="form"></ha-form>
    `;

    const form = this.shadowRoot.getElementById("form");
    form.hass = this._hass;
    form.schema = [
      { name: "device_id", selector: { device: {} } },
      { name: "title", selector: { text: {} } },
      { name: "only_problems", selector: { boolean: {} } },
      { name: "show_entity_id", selector: { boolean: {} } },
      { name: "compact", selector: { boolean: {} } },
    ];
    form.data = this._formData();

    form.computeLabel = field => {
      const labels = {
        device_id: et(this._hass, "device"),
        title: et(this._hass, "title"),
        only_problems: et(this._hass, "onlyProblems"),
        show_entity_id: et(this._hass, "showEntityId"),
        compact: et(this._hass, "compact"),
      };
      return labels[field.name] || field.name;
    };

    form.addEventListener("value-changed", event => {
      event.stopPropagation();

      const newConfig = {
        ...this._config,
        ...(event.detail?.value || {}),
      };

      this._fire(newConfig);
    });
  }
}

if (!customElements.get("somfy-protexial-elements-card-editor")) {
  customElements.define("somfy-protexial-elements-card-editor", SomfyProtexialElementsCardEditor);
}

class SomfyProtexialElementsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._entityRegistry = null;
    this._registryLoading = false;
    this._loadedDevice = null;

    // Preserve collapsed/open sections across Home Assistant state updates.
    this._collapsedGroups = new Set();
    this._collapsedSubgroups = new Set();
  }

  static getConfigElement() {
    return document.createElement("somfy-protexial-elements-card-editor");
  }

  static getStubConfig() {
    return {
      device_id: "",
      title: "",
      only_problems: false,
      show_entity_id: false,
      compact: false,
    };
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    this.config = {
      device_id: config.device_id || "",
      title: config.title || "",
      only_problems: config.only_problems === true,
      show_entity_id: config.show_entity_id === true,
      compact: config.compact === true,
    };
  }

  set hass(hass) {
    this._hass = hass;

    if (this.config?.device_id &&
        this._loadedDevice !== this.config.device_id &&
        !this._registryLoading) {
      this._loadRegistry();
      return;
    }

    this._render();
  }

  _lang() { return spLang(this._hass); }
  _t(fr, en) { return this._lang() === "fr" ? fr : en; }

  async _loadRegistry() {
    if (!this._hass || !this.config?.device_id || this._registryLoading) return;

    this._registryLoading = true;

    try {
      const registry = await this._hass.callWS({
        type: "config/entity_registry/list",
      });

      this._entityRegistry = Array.isArray(registry) ? registry : [];
      this._loadedDevice = this.config.device_id;
    } catch (error) {
      console.error("Somfy Protexial Elements Card: entity registry error", error);
      this._entityRegistry = [];
      this._loadedDevice = this.config.device_id;
    } finally {
      this._registryLoading = false;
      this._render();
    }
  }

  _deviceEntityIds() {
    if (!this.config?.device_id || !Array.isArray(this._entityRegistry)) return [];

    return this._entityRegistry
      .filter(entry => entry?.device_id === this.config.device_id)
      .map(entry => entry.entity_id)
      .filter(Boolean);
  }

  _isElementSensor(entity) {
    if (!entity?.entity_id?.startsWith("binary_sensor.")) return false;

    const attrs = entity.attributes || {};

    // Real attributes exposed by SomfyElementAggregateBinarySensor.
    const diagnosticKeys = [
      "Battery",
      "Link",
      "House",
      "Tamper",
      "Door open",
      "Running",
    ];

    return diagnosticKeys.some(key =>
      Object.prototype.hasOwnProperty.call(attrs, key)
    );
  }

  _elements() {
    if (!this.config?.device_id) return [];

    const ids = new Set(this._deviceEntityIds());

    let elements = [...ids]
      .map(entityId => this._hass?.states?.[entityId])
      .filter(entity => this._isElementSensor(entity));

    // Safe fallback: if registry resolution fails for some frontend/version,
    // use only entities exposing the very specific Somfy per-element attributes.
    if (!elements.length && this._entityRegistry !== null) {
      elements = Object.values(this._hass?.states || {})
        .filter(entity => this._isElementSensor(entity));
    }

    return elements
      .filter(entity => !this.config.only_problems || entity.state === "on")
      .sort((a, b) => this._name(a).localeCompare(this._name(b)));
  }

  _mainCategory(entity) {
    const attrs = entity.attributes || {};
    const icon = String(attrs.icon || "").toLowerCase();
    const entityId = entity.entity_id.toLowerCase();

    // Icon is preferred because it is generated from the Somfy hardware type.
    if (
      icon.includes("door") ||
      icon.includes("window") ||
      icon.includes("garage")
    ) return "opening";

    if (icon.includes("motion-sensor")) return "motion";

    // Smoke, remotes, keypads, sirens, badges and transmitters are technical.
    return "technical";
  }

  _technicalSubcategory(entity) {
    const attrs = entity.attributes || {};
    const icon = String(attrs.icon || "").toLowerCase();
    const zone = String(attrs.Zone || "").toUpperCase();

    // Order does not matter here; rendering order is defined by
    // TECHNICAL_SUBCATEGORIES.
    if (icon.includes("bullhorn") || icon.includes("home-sound")) {
      return "siren";
    }

    if (icon.includes("dialpad") || icon.includes("keyboard")) {
      return "keypad";
    }

    // Remotes must be kept separate from the control / transmitter group.
    if (icon.includes("remote")) {
      return "remote";
    }

    if (icon.includes("key-variant") || icon.includes("key-alert")) {
      return "badge";
    }

    // Central / transmitter equipment. The integration uses alpha-s-box
    // icons for transmitter-type technical elements, while SYS identifies
    // system-level equipment.
    if (icon.includes("alpha-s-box") || zone === "SYS") {
      return "control";
    }

    return "other";
  }

  _groups() {
    const groups = {
      opening: [],
      motion: [],
      technical: {
        control: [],
        siren: [],
        keypad: [],
        remote: [],
        badge: [],
        other: [],
      },
    };

    for (const entity of this._elements()) {
      const main = this._mainCategory(entity);

      if (main === "technical") {
        groups.technical[this._technicalSubcategory(entity)].push(entity);
      } else {
        groups[main].push(entity);
      }
    }

    return groups;
  }



  _name(entity) {
    try {
      return this._hass.formatEntityName(entity) ||
        entity.attributes?.friendly_name ||
        entity.entity_id;
    } catch (_) {
      return entity.attributes?.friendly_name || entity.entity_id;
    }
  }

  _stateLabel(entity) {
    if (entity.state === "on") return et(this._hass, "fault");
    if (entity.state === "off") return et(this._hass, "allOk");
    if (entity.state === "unavailable") return et(this._hass, "unavailable");
    return et(this._hass, "unknown");
  }

  _human(value) {
    const v = String(value ?? "");
    const n = v.toLowerCase();

    const values = {
      fr: {
        ok: "OK",
        low: "Faible",
        connected: "Connectée",
        disconnected: "Déconnectée",
        "domestic fault/intrusion": "Défaut / intrusion",
        "open/ripped off": "Ouvert / arraché",
        closed: "Fermée",
        open: "Ouverte",
        running: "Actif",
        paused: "En pause",
      },
      en: {
        ok: "OK",
        low: "Low",
        connected: "Connected",
        disconnected: "Disconnected",
        "domestic fault/intrusion": "Fault / intrusion",
        "open/ripped off": "Open / ripped off",
        closed: "Closed",
        open: "Open",
        running: "Active",
        paused: "Paused",
      },
      de: {
        ok: "OK",
        low: "Schwach",
        connected: "Verbunden",
        disconnected: "Getrennt",
        "domestic fault/intrusion": "Fehler / Einbruch",
        "open/ripped off": "Offen / abgerissen",
        closed: "Geschlossen",
        open: "Offen",
        running: "Aktiv",
        paused: "Pausiert",
      },
      es: {
        ok: "OK",
        low: "Baja",
        connected: "Conectado",
        disconnected: "Desconectado",
        "domestic fault/intrusion": "Fallo / intrusión",
        "open/ripped off": "Abierto / arrancado",
        closed: "Cerrado",
        open: "Abierto",
        running: "Activo",
        paused: "En pausa",
      },
      it: {
        ok: "OK",
        low: "Bassa",
        connected: "Connesso",
        disconnected: "Disconnesso",
        "domestic fault/intrusion": "Anomalia / intrusione",
        "open/ripped off": "Aperto / strappato",
        closed: "Chiuso",
        open: "Aperto",
        running: "Attivo",
        paused: "In pausa",
      },
      nl: {
        ok: "OK",
        low: "Laag",
        connected: "Verbonden",
        disconnected: "Niet verbonden",
        "domestic fault/intrusion": "Storing / inbraak",
        "open/ripped off": "Open / losgetrokken",
        closed: "Gesloten",
        open: "Open",
        running: "Actief",
        paused: "Gepauzeerd",
      },
      pt: {
        ok: "OK",
        low: "Fraca",
        connected: "Ligado",
        disconnected: "Desligado",
        "domestic fault/intrusion": "Falha / intrusão",
        "open/ripped off": "Aberto / arrancado",
        closed: "Fechado",
        open: "Aberto",
        running: "Ativo",
        paused: "Em pausa",
      },
    };

    const lang = this._lang();
    return values[lang]?.[n] ?? values.en[n] ?? v;
  }

  _ok(def, value) {
    if (def.neutral) return true;
    return (def.ok || []).includes(String(value ?? "").toLowerCase());
  }

  _registryEntry(entityId) {
    if (!entityId || !Array.isArray(this._entityRegistry)) return null;
    return this._entityRegistry.find(entry => entry?.entity_id === entityId) || null;
  }

  _normalizeElementObjectId(entityId) {
    if (!entityId) return "";

    let objectId = String(entityId).split(".")[1] || "";

    // Remove integration prefixes that can differ between installations.
    objectId = objectId
      .replace(/^somfy_protexial_/, "")
      .replace(/^somfy_protexiom_/, "");

    // Remove role suffixes.
    objectId = objectId
      .replace(/_aggregate$/, "")
      .replace(/_actif$/, "")
      .replace(/_active$/, "")
      .replace(/_pause$/, "");

    return objectId;
  }

  _pauseSwitchForElement(entity) {
    if (!entity?.entity_id || !this._hass) return null;

    const elementKey = this._normalizeElementObjectId(entity.entity_id);
    if (!elementKey) return null;

    // Search only switches attached to the selected Somfy device when possible.
    const deviceIds = new Set(this._deviceEntityIds());

    const switches = Object.values(this._hass.states || {}).filter(state => {
      if (!state?.entity_id?.startsWith("switch.")) return false;

      // If the registry gave us the device's entities, restrict matching to it.
      if (deviceIds.size && !deviceIds.has(state.entity_id)) return false;

      return true;
    });

    // 1) Exact normalized technical-name match.
    const exact = switches.find(state =>
      this._normalizeElementObjectId(state.entity_id) === elementKey
    );
    if (exact) return exact;

    // 2) Fallback: known switch naming convention:
    // switch.somfy_protexial_<element>_actif
    const expectedSuffixes = [
      `_${elementKey}_actif`,
      `_${elementKey}_active`,
      `_${elementKey}_pause`,
    ];

    const fallback = switches.find(state => {
      const objectId = state.entity_id.split(".")[1] || "";
      return expectedSuffixes.some(suffix => objectId.endsWith(suffix));
    });

    return fallback || null;
  }

  async _togglePauseSwitch(entityId) {
    const pauseSwitch = this._hass?.states?.[entityId];
    if (!pauseSwitch) return;

    // IMPORTANT:
    // ON  = element active  -> turn_off to pause
    // OFF = element paused  -> turn_on to reactivate
    const service = pauseSwitch.state === "on" ? "turn_off" : "turn_on";

    try {
      await this._hass.callService(
        "switch",
        service,
        {},
        { entity_id: entityId }
      );
    } catch (error) {
      console.error(
        "Somfy Protexial Elements Card: pause action failed",
        entityId,
        error
      );
    }
  }

  _renderElement(entity) {
    const attrs = entity.attributes || {};
    const problem = entity.state === "on";
    const defs = ELEMENT_ATTRS.filter(def =>
      Object.prototype.hasOwnProperty.call(attrs, def.key)
    );
    const icon = attrs.icon ||
      (problem ? "mdi:alert-circle-outline" : "mdi:check-circle-outline");

    const pauseSwitch = this._pauseSwitchForElement(entity);
    const active = pauseSwitch?.state === "on";
    const paused = pauseSwitch?.state === "off";

    return `
      <div class="element">
        <div class="head" data-more-info="${entity.entity_id}">
          <ha-icon class="main-icon ${problem ? "problem" : "ok"}" icon="${icon}"></ha-icon>
          <div class="info">
            <div class="name">${this._name(entity)}</div>
            ${this.config.show_entity_id
              ? `<div class="entity-id">${entity.entity_id}</div>`
              : ""}
          </div>
          <div class="summary ${problem ? "problem" : "ok"}">
            ${this._stateLabel(entity)}
          </div>
          ${pauseSwitch ? `
            <button
              type="button"
              class="pause-button ${paused ? "paused" : "active"}"
              data-pause-switch="${pauseSwitch.entity_id}"
              title="${active
                ? et(this._hass, "pauseTitle")
                : et(this._hass, "reactivateTitle")}">
              <ha-icon icon="${active ? "mdi:pause" : "mdi:play"}"></ha-icon>
              <span>${active
                ? et(this._hass, "pause")
                : et(this._hass, "reactivate")}</span>
            </button>` : ""}
        </div>
        <div class="attrs">
          ${defs.map(def => {
            const value = attrs[def.key];
            const ok = this._ok(def, value);
            return `
              <div class="attr">
                <ha-icon icon="${def.icon}"></ha-icon>
                <div class="attr-info">
                  <div class="attr-label">${et(this._hass, def.tkey)}</div>
                  <div class="attr-value ${def.neutral ? "neutral" : ok ? "ok" : "problem"}">
                    ${this._human(value)}
                  </div>
                </div>
              </div>`;
          }).join("")}
        </div>
      </div>`;
  }

  _renderGroup(category, entities) {
    if (!entities.length) return "";

    return `
      <div class="group ${this._collapsedGroups.has(category.key) ? "collapsed" : ""}" data-group="${category.key}">
        <button type="button" class="group-title" data-toggle-group="${category.key}">
          <ha-icon icon="${category.icon}"></ha-icon>
          <span class="group-name">${et(this._hass, category.tkey)}</span>
          <span class="group-count">${entities.length}</span>
          <ha-icon class="group-chevron" icon="mdi:chevron-down"></ha-icon>
        </button>
        <div class="group-content">
          ${entities.map(entity => this._renderElement(entity)).join("")}
        </div>
      </div>`;
  }


  _renderTechnical(groups) {
    const total = Object.values(groups).reduce((sum, list) => sum + list.length, 0);
    if (!total) return "";

    const main = ELEMENT_CATEGORIES.find(c => c.key === "technical");

    return `
      <div class="group ${this._collapsedGroups.has("technical") ? "collapsed" : ""}" data-group="technical">
        <button type="button" class="group-title" data-toggle-group="technical">
          <ha-icon icon="${main.icon}"></ha-icon>
          <span class="group-name">${et(this._hass, main.tkey)}</span>
          <span class="group-count">${total}</span>
          <ha-icon class="group-chevron" icon="mdi:chevron-down"></ha-icon>
        </button>

        <div class="group-content">
          ${TECHNICAL_SUBCATEGORIES.map(sub => {
            const items = groups[sub.key] || [];
            if (!items.length) return "";

            return `
              <div class="subgroup ${this._collapsedSubgroups.has(sub.key) ? "collapsed" : ""}" data-subgroup="${sub.key}">
                <button type="button" class="subgroup-title" data-toggle-subgroup="${sub.key}">
                  <ha-icon icon="${sub.icon}"></ha-icon>
                  <span class="subgroup-name">${et(this._hass, sub.tkey)}</span>
                  <span class="group-count">${items.length}</span>
                  <ha-icon class="subgroup-chevron" icon="mdi:chevron-down"></ha-icon>
                </button>
                <div class="subgroup-content">
                  ${items.map(entity => this._renderElement(entity)).join("")}
                </div>
              </div>`;
          }).join("")}
        </div>
      </div>`;
  }


  _render() {
    if (!this._hass || !this.config) return;

    const elements = this._elements();

    if (this.config.device_id && !this._registryLoading) {
      console.debug(`[Somfy Protexial Elements Card ${ELEMENTS_CARD_VERSION}]`, {
        device_id: this.config.device_id,
        registry_device_entities: this._deviceEntityIds(),
        detected_elements: elements.map(e => e.entity_id),
        pause_switches: elements.map(e => {
          const sw = this._pauseSwitchForElement(e);
          return {
            element: e.entity_id,
            element_key: this._normalizeElementObjectId(e.entity_id),
            switch: sw?.entity_id || null,
            state: sw?.state || null,
          };
        }),
      });
    }

    const title = this.config.title || this._t("Éléments Somfy", "Somfy equipment");

    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; font-family:var(--primary-font-family,sans-serif); }
        ha-card { overflow:hidden; }
        .header { display:flex; align-items:center; gap:12px; padding:${this.config.compact ? "12px" : "16px"}; border-bottom:1px solid var(--divider-color); }
        .title { flex:1; font-size:16px; font-weight:700; color:var(--primary-text-color); }
        .count { min-width:26px; height:26px; padding:0 7px; border-radius:13px; display:flex; align-items:center; justify-content:center; background:var(--secondary-background-color); color:var(--secondary-text-color); font-size:11px; font-weight:700; }
        .header-stats {
          display:flex;
          align-items:center;
          gap:7px;
        }
        .stat {
          height:28px;
          min-width:38px;
          box-sizing:border-box;
          padding:0 8px;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:5px;
          border-radius:14px;
          background:var(--secondary-background-color);
          color:var(--secondary-text-color);
          font-size:11px;
          font-weight:700;
        }
        .stat ha-icon { --mdc-icon-size:15px; }
        .stat.error {
          color:var(--error-color,#db4437);
          background:color-mix(in srgb, var(--error-color,#db4437) 10%, var(--secondary-background-color));
        }
        .stat.ok {
          color:var(--success-color,#43a047);
        }

        .group {
          border-bottom:1px solid var(--divider-color);
        }
        .group:last-of-type { border-bottom:0; }

        .group-title {
          width:100%;
          min-height:42px;
          box-sizing:border-box;
          padding:8px 16px;
          border:0;
          background:transparent;
          color:var(--primary-text-color);
          display:flex;
          align-items:center;
          gap:9px;
          font:inherit;
          cursor:pointer;
          text-align:left;
        }
        .group-title:hover {
          background:var(--secondary-background-color);
        }
        .group-title > ha-icon:first-child {
          --mdc-icon-size:19px;
          color:var(--secondary-text-color);
        }
        .group-title .group-name {
          flex:1;
          min-width:0;
          font-size:13px;
          font-weight:650;
        }
        .group-count {
          min-width:23px;
          height:23px;
          padding:0 6px;
          box-sizing:border-box;
          border-radius:12px;
          display:flex;
          align-items:center;
          justify-content:center;
          background:var(--secondary-background-color);
          color:var(--secondary-text-color);
          font-size:10px;
          font-weight:700;
        }
        .group-chevron {
          --mdc-icon-size:18px;
          color:var(--secondary-text-color);
          transition:transform .18s ease;
        }
        .group.collapsed > .group-title .group-chevron {
          transform:rotate(-90deg);
        }
        .group.collapsed > .group-content {
          display:none;
        }

        .subgroup {
          padding:0 10px;
        }
        .subgroup-title {
          width:100%;
          min-height:34px;
          box-sizing:border-box;
          padding:5px 8px;
          border:0;
          background:transparent;
          color:var(--secondary-text-color);
          display:flex;
          align-items:center;
          gap:8px;
          font:inherit;
          cursor:pointer;
          text-align:left;
        }
        .subgroup-title:hover {
          background:var(--secondary-background-color);
          border-radius:8px;
        }
        .subgroup-title > ha-icon:first-child {
          --mdc-icon-size:16px;
        }
        .subgroup-title .subgroup-name {
          flex:1;
          font-size:11px;
          font-weight:650;
        }
        .subgroup-chevron {
          --mdc-icon-size:16px;
          transition:transform .18s ease;
        }
        .subgroup.collapsed .subgroup-chevron {
          transform:rotate(-90deg);
        }
        .subgroup.collapsed .subgroup-content {
          display:none;
        }

        .element { padding:${this.config.compact ? "10px 12px" : "14px 16px"}; border-bottom:1px solid var(--divider-color); }
        .element:last-of-type { border-bottom:0; }
        .head { display:flex; align-items:center; gap:11px; cursor:pointer; }
        .main-icon { --mdc-icon-size:25px; flex-shrink:0; }
        .main-icon.ok { color:#22c55e; } .main-icon.problem { color:#ef4444; }
        .info { flex:1; min-width:0; }
        .name { font-size:14px; font-weight:650; color:var(--primary-text-color); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .entity-id { font-size:9px; color:var(--disabled-color); margin-top:2px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .summary { font-size:11px; font-weight:650; white-space:nowrap; }
        .summary.ok { color:#22c55e; } .summary.problem { color:#ef4444; }

        .pause-button {
          min-height:30px;
          padding:0 9px;
          border:1px solid var(--divider-color);
          border-radius:8px;
          background:var(--secondary-background-color);
          color:var(--primary-text-color);
          display:flex;
          align-items:center;
          justify-content:center;
          gap:5px;
          font:inherit;
          font-size:10px;
          font-weight:650;
          cursor:pointer;
          flex-shrink:0;
        }
        .pause-button ha-icon {
          --mdc-icon-size:16px;
        }
        .pause-button.active {
          color:var(--warning-color,#f59e0b);
        }
        .pause-button.paused {
          color:var(--success-color,#43a047);
        }
        .pause-button:hover {
          background:color-mix(in srgb, var(--primary-color) 7%, var(--secondary-background-color));
        }
        .attrs { display:grid; grid-template-columns:repeat(auto-fit,minmax(125px,1fr)); gap:7px; margin-top:11px; }
        .attr { min-width:0; display:flex; align-items:center; gap:8px; padding:8px 9px; border-radius:8px; background:var(--secondary-background-color); }
        .attr ha-icon { --mdc-icon-size:18px; color:var(--secondary-text-color); flex-shrink:0; }
        .attr-info { min-width:0; }
        .attr-label { font-size:8px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:var(--secondary-text-color); }
        .attr-value { font-size:11px; font-weight:650; margin-top:2px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .attr-value.ok { color:#22c55e; } .attr-value.problem { color:#ef4444; } .attr-value.neutral { color:var(--primary-text-color); }
        .empty { padding:18px 16px; color:var(--secondary-text-color); font-size:13px; }
        .footer { padding:6px 12px; text-align:right; border-top:1px solid var(--divider-color); color:var(--disabled-color); font-size:9px; }
        @media (max-width:500px) {
          .attrs { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .head { flex-wrap:wrap; }
          .pause-button { margin-left:36px; }
        }
      </style>
      <ha-card>
        <div class="header">
          <div class="title">${title}</div>
          <div class="header-stats">
            <div class="stat" title="${et(this._hass, "total")}">
              <ha-icon icon="mdi:devices"></ha-icon>
              <span>${elements.length}</span>
            </div>
            <div class="stat ${elements.filter(entity => entity.state === "on").length ? "error" : "ok"}"
                 title="${et(this._hass, "errors")}">
              <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
              <span>${elements.filter(entity => entity.state === "on").length}</span>
            </div>
          </div>
        </div>

        ${this._registryLoading ? `
          <div class="empty">
            ${et(this._hass, "loading")}
          </div>
        ` : elements.length ? (() => {
          const groups = this._groups();
          const opening = ELEMENT_CATEGORIES.find(c => c.key === "opening");
          const motion = ELEMENT_CATEGORIES.find(c => c.key === "motion");

          return [
            typeof this._renderGroup === "function" ? this._renderGroup(opening, groups.opening) : "",
            typeof this._renderGroup === "function" ? this._renderGroup(motion, groups.motion) : "",
            typeof this._renderTechnical === "function" ? this._renderTechnical(groups.technical) : "",
          ].join("");
        })() : `
          <div class="empty">
            ${this.config.device_id ? et(this._hass, "noElements") : et(this._hass, "noDevice")}
          </div>
        `}

        <div class="footer">Somfy Protexial Elements Card ${ELEMENTS_CARD_VERSION}</div>
      </ha-card>
    `;

    this.shadowRoot.querySelectorAll("[data-toggle-group]").forEach(button => {
      button.addEventListener("click", event => {
        event.stopPropagation();

        const key = button.dataset.toggleGroup;
        const group = button.closest(".group");
        if (!key || !group) return;

        const collapsed = group.classList.toggle("collapsed");

        if (collapsed) {
          this._collapsedGroups.add(key);
        } else {
          this._collapsedGroups.delete(key);
        }
      });
    });

    this.shadowRoot.querySelectorAll("[data-toggle-subgroup]").forEach(button => {
      button.addEventListener("click", event => {
        event.stopPropagation();

        const key = button.dataset.toggleSubgroup;
        const subgroup = button.closest(".subgroup");
        if (!key || !subgroup) return;

        const collapsed = subgroup.classList.toggle("collapsed");

        if (collapsed) {
          this._collapsedSubgroups.add(key);
        } else {
          this._collapsedSubgroups.delete(key);
        }
      });
    });

    this.shadowRoot.querySelectorAll("[data-pause-switch]").forEach(button => {
      button.addEventListener("click", event => {
        event.stopPropagation();
        this._togglePauseSwitch(button.dataset.pauseSwitch);
      });
    });

    this.shadowRoot.querySelectorAll("[data-more-info]").forEach(el => {
      el.addEventListener("click", () => spMoreInfo(this, el.dataset.moreInfo));
    });
  }

  getCardSize() {
    return Math.max(2, (this._elements()?.length || 0) + 1);
  }
}

if (!customElements.get("somfy-protexial-elements-card")) {
  customElements.define("somfy-protexial-elements-card", SomfyProtexialElementsCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some(c => c.type === "somfy-protexial-elements-card")) {
  window.customCards.push({
    type: "somfy-protexial-elements-card",
    name: "Somfy Protexial Elements Card",
    description: "Per-element diagnostics for Somfy Protexial / Protexiom",
    configurable: true,
  });
}