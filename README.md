[![PayPal](https://img.shields.io/badge/paypal-me-blue.svg?style=for-the-badge&color=purple&logo=paypal&logoColor=ccc&link=https%3A%2F%2Fpaypal.me%2hlaissus/5)](https://paypal.me/hlaissus/5)
[![GitHub Release]( https://img.shields.io/github/v/release/developpeurbox/somfy-protexial-card?style=for-the-badge)](https://github.com/developpeurbox/somfy-protexial-card/releases)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)
[![Community Forum]( https://img.shields.io/badge/community-forum-brightgreen.svg?style=for-the-badge)](https://community.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://github.com/developpeurbox/somfy-protexial-card/blob/main/LICENSE)

[![HACS Action](https://github.com/developpeurbox/somfy-protexial-card/actions/workflows/hacs.yml/badge.svg?style=for-the-badge)](https://github.com/developpeurbox/somfy-protexial-card/actions/workflows/hacs.yml)  

# 🇬🇧 🇩🇪 🇪🇸 🇮🇹 🇳🇱 🇵🇹 Multi-languages support

English | Deutsch | Español | Italiano | Nederlands | Português

# 🛡️ Somfy Protexial Cards

Cartes personnalisées Home Assistant pour les centrales **Somfy Protexial / Protexiom / Protexial IO**.

Ce dépôt fournit **deux cartes Lovelace complémentaires** :

### 🛡️ Somfy Protexial Card

Carte principale permettant de regrouper :

- le contrôle de l'alarme
- l'état de la centrale
- les principaux capteurs Somfy
- les défauts détectés
- les boutons de réinitialisation
- la dernière synchronisation
- l'actualisation manuelle

### 🧩 Somfy Protexial Elements Card

Carte dédiée aux éléments de l'installation permettant de :

- afficher tous les équipements Somfy
- regrouper les éléments par catégorie
- afficher leurs informations de diagnostic
- afficher le nombre total d'éléments
- afficher le nombre d'éléments en erreur
- mettre individuellement un élément en pause ou le réactiver

Les deux cartes sont fournies dans **un seul fichier JavaScript** et sont installées automatiquement ensemble via HACS.

Les cartes sont conçues pour fonctionner avec l'intégration : [**AuroreVgn/somfy-protexial**](https://github.com/AuroreVgn/somfy-protexial).

Elles disposent d'un **éditeur graphique**, s'adaptent automatiquement aux thèmes clair et sombre de Home Assistant et prennent en charge plusieurs langues.


## ✅ Prérequis

- **Home Assistant 2025.12 ou supérieur**
- Intégration [somfy-protexial](https://github.com/AuroreVgn/somfy-protexial) installée et configurée
- **Version minimale recommandée de l'intégration : 2.1.1**

> Les cartes peuvent détecter automatiquement une grande partie des entités créées par l'intégration.
>
> Les `entity_id` peuvent également être définis manuellement depuis l'éditeur graphique ou le YAML lorsque cette option est proposée.


## 📥 Installation

### Via HACS — recommandé

La carte est disponible directement dans le catalogue HACS, aucun dépôt personnalisé n'est nécessaire.

> [!NOTE]
> Avant la version **2026.11.0** de Home Assistant Core, cette section s'appelait **HACS**. Elle s'appelle désormais **Marketplace**.

1. Ouvrir **HACS** (**Marketplace** à partir de Home Assistant Core 2026.11.0)
2. Rechercher **Somfy Protexial Card**
3. Installer **Somfy Protexial Card**
4. Recharger Home Assistant si nécessaire puis vider le cache du navigateur / de l'application

#### Installée avant le 05/11/2026 via un dépôt personnalisé ?

Si la carte a été installée avant le **05/11/2026** en ajoutant `https://github.com/developpeurbox/somfy-protexial-card` comme dépôt personnalisé, ce dépôt personnalisé peut maintenant être supprimé :

1. Dans **HACS** (ou **Marketplace**), ouvrir le menu **⋮**
2. Choisir **Dépôts personnalisés**
3. Supprimer `developpeurbox/somfy-protexial-card` de la liste

La carte reste installée et continue de fonctionner, et les mises à jour arrivent désormais depuis le catalogue par défaut.

Une seule ressource JavaScript est installée par HACS :

```text
somfy-protexial-card.js
```

Cette ressource enregistre automatiquement les deux cartes :

```yaml
type: custom:somfy-protexial-card
```

et :

```yaml
type: custom:somfy-protexial-elements-card
```

> Aucune seconde ressource Lovelace n'est nécessaire pour utiliser la carte des éléments.

### Installation manuelle

1. Télécharger `somfy-protexial-card.js`
2. Copier le fichier dans :

```text
/config/www/
```

3. Dans Home Assistant :

**Paramètres → Tableaux de bord → Ressources → Ajouter une ressource**

4. Ajouter :

```text
/local/somfy-protexial-card.js
```

Type :

```text
Module JavaScript
```

5. Vider le cache du navigateur ou de l'application Home Assistant

Une seule ressource permet là aussi d'utiliser les deux cartes.


# 🎯 Utilisation

## 🛡️ Somfy Protexial Card

### Configuration minimale

```yaml
type: custom:somfy-protexial-card
alarm_entity: alarm_control_panel.alarme
```

Grâce à la **détection automatique**, cette configuration peut suffire dans la majorité des installations.


## Configuration complète

```yaml
type: custom:somfy-protexial-card
alarm_entity: alarm_control_panel.alarme
title: "Somfy Protexial — Contrôle"

auto_detect: true

show_faults: true
show_last_sync: true
show_refresh: true
compact: false

sensors:
  - capteur1
  - capteur2
  - capteur3
  - capteur4
  - capteur5
  - capteur6
  - capteur7
  - capteur8
  - capteur9

entities:
  capteur1: binary_sensor.somfy_protexial_batterie
  capteur2: binary_sensor.somfy_protexial_centrale
  capteur3: binary_sensor.somfy_protexial_portes_ou_fenetres
  capteur4: binary_sensor.somfy_protexial_mouvement
  capteur5: binary_sensor.somfy_protexial_camera
  capteur6: binary_sensor.somfy_protexial_comm_centrale_capteurs
  capteur7: binary_sensor.somfy_protexial_communication_gsm
  capteur8: sensor.somfy_protexial_operateur_gsm
  capteur9: sensor.somfy_protexial_signal_gsm_5

labels:
  capteur1: "Batterie"
  capteur3: "Portes / Fenêtres"
  capteur8: "Opérateur GSM"
```

La carte possède un **éditeur graphique intégré**. Il n'est donc normalement pas nécessaire d'éditer le YAML à la main.


## 🧩 Somfy Protexial Elements Card

### Configuration minimale

```yaml
type: custom:somfy-protexial-elements-card
```

Dans l'éditeur graphique, sélectionner simplement l'**appareil Somfy** correspondant à la centrale.

La carte récupère ensuite automatiquement les éléments rattachés à cet appareil.

### Exemple avec options

```yaml
type: custom:somfy-protexial-elements-card
title: Éléments Somfy
device_id: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
only_problems: false
show_entity_id: false
compact: false
```

Le `device_id` peut être sélectionné directement dans l'éditeur graphique.

# ✨ Fonctionnalités

## 🔐 Contrôle de l'alarme

La carte principale affiche l'état actuel de l'alarme avec une couleur dynamique et indique depuis combien de temps cet état est actif.

Les boutons disponibles dépendent automatiquement des fonctions exposées par `alarm_control_panel`.

| Bouton | Action Home Assistant |
|---|---|
| Désarmer | `alarm_control_panel.alarm_disarm` |
| Absent | `alarm_control_panel.alarm_arm_away` |
| Présent | `alarm_control_panel.alarm_arm_home` |
| Nuit | `alarm_control_panel.alarm_arm_night` |

Le bouton **Nuit** n'est affiché que lorsque la centrale le supporte.


## 🔑 Code / PIN

Si la centrale exige un code, la carte affiche une **fenêtre de saisie intégrée**.

Le code n'a pas besoin d'être stocké dans la configuration Lovelace.

Cela évite l'utilisation des fenêtres natives `prompt()` du navigateur et conserve une interface cohérente avec Home Assistant.


## 📡 État du système

La section **État** de la carte principale affiche jusqu'à neuf informations principales :

| Information | Entité par défaut |
|---|---|
| Batterie | `binary_sensor.somfy_protexial_batterie` |
| Centrale | `binary_sensor.somfy_protexial_centrale` |
| Portes / Fenêtres | `binary_sensor.somfy_protexial_portes_ou_fenetres` |
| Mouvement | `binary_sensor.somfy_protexial_mouvement` |
| Caméra | `binary_sensor.somfy_protexial_camera` |
| Communication centrale ↔ capteurs | `binary_sensor.somfy_protexial_comm_centrale_capteurs` |
| Communication GSM | `binary_sensor.somfy_protexial_communication_gsm` |
| Opérateur GSM | `sensor.somfy_protexial_operateur_gsm` |
| Signal GSM | `sensor.somfy_protexial_signal_gsm_5` |

Les entités peuvent être remplacées individuellement depuis l'éditeur graphique.

### Ouverture du More Info

Un clic sur une ligne ouvre directement la fenêtre **Plus d'informations** native de Home Assistant pour l'entité correspondante.

## 🚨 Défauts

La carte principale peut rechercher automatiquement les entités de diagnostic Somfy et afficher les anomalies dans une section dédiée.

Exemples :

- défaut batterie
- défaut radio
- défaut de communication
- arrachement
- ouverture
- défaut d'un équipement

Les valeurs normales comme **OK**, **Connecté** ou **Fermé** ne sont pas considérées comme des défauts.

Pour les entités de communication Somfy :

```text
ON  = communication correcte
OFF = défaut de communication
```

# 🧩 Détail des éléments

La **Somfy Protexial Elements Card** permet d'afficher individuellement les éléments rattachés à la centrale.

Chaque élément peut exposer les informations suivantes :

| Information | Attribut |
|---|---|
| Batterie | `Battery` |
| Liaison radio | `Link` |
| Défaut | `House` |
| Arrachement | `Tamper` |
| Ouverture | `Door open` |
| État | `Running` |
| Zone | `Zone` |

Les informations réellement disponibles dépendent du type d'équipement et de ce que remonte la centrale.

## 📂 Classement automatique des éléments

Les éléments sont automatiquement regroupés dans différentes catégories.

### 🚪 Ouvertures

Exemples :

- détecteurs d'ouverture
- détecteurs de fenêtres
- détecteurs de portes de garage

### 🚶 Mouvements

Exemples :

- détecteurs de mouvement
- détecteurs de mouvement avec prise d'images

### ⚙️ Technique

Les équipements techniques sont eux-mêmes classés dans l'ordre suivant :

1. Centrale
2. Sirènes
3. Claviers
4. Télécommandes
5. Badges
6. Autres

Les catégories et sous-catégories sont **dépliables et repliables** directement depuis la carte.

## 📊 Compteurs des éléments

En haut de la carte, deux indicateurs sont disponibles.

Le premier affiche le nombre total d'éléments détectés.

Le second affiche le nombre d'éléments actuellement en erreur.

Exemple :

```text
Éléments Somfy                     32   ⚠ 3
```

L'indicateur d'erreur change automatiquement selon l'état des équipements.


## ⏸️ Mise en pause des éléments

La gestion individuelle des pauses est disponible exclusivement dans la **Somfy Protexial Elements Card**.

Lorsqu'un switch de contrôle est disponible pour un élément, un bouton **Pause / Réactiver** est affiché directement sur sa ligne.

La logique de l'intégration est :

```text
switch ON  = équipement actif
switch OFF = équipement en pause
```

Pour un équipement actif :

```text
Pause
```

effectue :

```text
switch.turn_off
```

Pour un équipement en pause :

```text
Réactiver
```

effectue :

```text
switch.turn_on
```

La carte associe automatiquement chaque élément à son switch correspondant.


## 🔄 Actualisation

Un bouton **Actualiser** est disponible directement dans l'en-tête de la carte principale.

Lorsque l'intégration fournit un bouton d'actualisation / synchronisation, la carte l'utilise automatiquement.

Dans le cas contraire, elle peut utiliser `homeassistant.update_entity` comme solution de secours.

## 🕒 Dernière synchronisation

La carte principale peut afficher la date de dernière synchronisation sous forme relative :

```text
depuis moins d'une minute
depuis 4 min
depuis 1h32
```

L'état de connexion de la centrale est affiché au-dessus de cette information :

```text
● Centrale connectée
  Dernière synchronisation
  depuis moins d'une minute ↻
```


## ♻️ Réinitialisation des défauts

La carte principale peut afficher jusqu'à trois boutons de réinitialisation :

- défauts piles
- défauts alarme
- liaison radio

Les entités par défaut sont :

```yaml
button.somfy_protexial_reinitialiser_defaut_piles
button.somfy_protexial_reinitialiser_defaut_alarme
button.somfy_protexial_reinitialiser_defaut_liaison_radio
```

Une confirmation est demandée avant l'exécution.

Les boutons qui n'existent pas dans Home Assistant peuvent être masqués automatiquement.


## 🪄 Détection automatique des entités

Lorsque `auto_detect` est activé, la carte principale cherche automatiquement les entités correspondant aux différentes informations Somfy.

La détection utilise notamment :

- le domaine de l'entité
- son `entity_id`
- son nom
- les alias connus de l'intégration

Une entité définie manuellement dans `entities:` reste toujours prioritaire.

La **Elements Card** utilise quant à elle l'appareil Home Assistant sélectionné dans son éditeur pour retrouver les différents équipements de la centrale.


## 📱 Mode compact

Les deux cartes proposent un **mode compact** destiné aux tableaux de bord mobiles ou aux vues contenant plusieurs cartes.

Exemple pour la carte principale :

```yaml
type: custom:somfy-protexial-card
alarm_entity: alarm_control_panel.alarme
compact: true
```

Exemple pour la carte des éléments :

```yaml
type: custom:somfy-protexial-elements-card
compact: true
```

Le mode compact réduit l'espace utilisé tout en conservant les informations essentielles.

## 🎨 Thèmes

Les deux cartes utilisent les variables CSS natives de Home Assistant et s'adaptent automatiquement :

- aux thèmes clairs
- aux thèmes sombres
- aux couleurs principales du thème
- aux rayons et ombres des cartes Home Assistant


# ⚙️ Options de configuration

## Somfy Protexial Card

| Option | Description | Défaut |
|---|---|---|
| `alarm_entity` | Entité `alarm_control_panel` | `alarm_control_panel.alarme` |
| `title` | Titre de la carte | Somfy Protexial — Contrôle |
| `auto_detect` | Détection automatique des entités | `true` |
| `show_faults` | Affiche la section Défauts | `true` |
| `show_last_sync` | Affiche la dernière synchronisation | `true` |
| `show_refresh` | Affiche le bouton Actualiser | `true` |
| `compact` | Active le mode compact | `false` |
| `sensors` | Liste des capteurs affichés | Tous |
| `entities` | Remplacement manuel des entités | — |
| `labels` | Noms personnalisés | — |
| `last_sync_entity` | Entité utilisée pour la dernière synchronisation | Auto |
| `refresh_entity` | Bouton utilisé pour l'actualisation | Auto |

## Somfy Protexial Elements Card

| Option | Description | Défaut |
|---|---|---|
| `device_id` | Appareil Somfy utilisé pour retrouver les éléments | — |
| `title` | Titre personnalisé | Somfy Protexial Elements |
| `only_problems` | Affiche uniquement les éléments en défaut | `false` |
| `show_entity_id` | Affiche les `entity_id` | `false` |
| `compact` | Active le mode compact | `false` |

La configuration de la **Elements Card** peut être réalisée entièrement depuis l'éditeur graphique.


# 🚦 États de l'alarme

| État Home Assistant | Affichage |
|---|---|
| `disarmed` | Désarmée |
| `armed_away` | Armée — Absent |
| `armed_home` | Armée — Présent |
| `armed_night` | Armée — Nuit |
| `arming` | Armement… |
| `pending` | En attente… |
| `triggered` | Déclenchée |
| `unknown` | Inconnu |
| `unavailable` | Indisponible |


# 🌍 Langues

Les deux cartes prennent actuellement en charge :

- 🇫🇷 Français
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇪🇸 Español
- 🇮🇹 Italiano
- 🇳🇱 Nederlands
- 🇵🇹 Português

La langue est déterminée automatiquement à partir des paramètres Home Assistant / navigateur.
