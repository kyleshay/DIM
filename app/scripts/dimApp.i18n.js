(function() {
  "use strict";

  // See https://angular-translate.github.io/docs/#/guide
  angular.module('dimApp')
    .config(['$translateProvider', function($translateProvider) {
      $translateProvider.useSanitizeValueStrategy('escape');

      $translateProvider
        .translations('en', {
          Level: "Level",
          Armor: "Armor",
          General: "General",
          Weapons: "Weapons",
          Vault: "Vault",
          About: {
            AboutDIM: "About Destiny Item Manager (DIM)",
            Description: "DIM is built upon the same services used by Bungie.net and the Destiny Companion App. DIM can access the items within your Guardians inventory and the Vault for both PlayStation and Xbox. You then can drag and drop items anywhere you wish to move them.",
            ContactUs: "Contact Us",
            ContactTwitterText: "Be sure to follow us to stay on top of updates and realtime application state information.",
            ContactRedditText: "If you have questions, comments, or suggestions- let us know!",
            ContactGitHubText: "If you're interested in contributing to the project, visit us at our project page on GitHub.",
            Q1: "How does DIM get access to my Destiny data?",
            A1: "Any chrome extension can ask for the data a website stores on your computer. When you log into Bungie.net, you are given a token (a cookie) that is generated uniquely for your account. You use this token to communicate with Bungie securely. The token is more secure than sending your username and password with each request to Bungie's server. DIM uses this token to communicate with Bungie on your behalf.",
            Q2: "How can I log out of DIM?",
            A2: "Your session is tied to Bungie.net. If you logout on Bungie.net, you're effectively logged out of DIM.",
            Q3: "Does DIM support keyboard shortcuts?",
            A3: "Yes! Press \"?\" to see a list of available shortcuts.",
            Q4: "I lost my item using your tool!",
            A4a: "More than likely a transfer failed, leaving your item in the vault or on another character. You could search for the item. If that doesn't turn it up, refresh the app by pressing F5. Check ",
            A4b: " or in game to see if your item still exists. We're sure it's still there.",
            Q5: "Hey, DIM duplicated my Gjallarhorn!",
            A5: "No, we didn't. Promise.",
            Note: "All images and content are property of Bungie. Please contact us if there are any issues." },
          Bucket: {
            Armor: "Armor",
            General: "General",
            Postmaster: "Postmaster",
            Progress: "Progress",
            Reputation: "Reputation",
            Show: "Show {{bucket}}",
            Vault: "Vault",
            Weapons: "Weapons" },
          Cooldown: {
            Grenade: "Grenade cooldown",
            Melee: "Melee cooldown",
            Super: "Super cooldown" },
          Debug: {
            Dump: "Dump info to console",
            View: "View Item Debug Info" },
          FarmingMode: {
            FarmingMode: "Farming Mode (move items)",
            Desc: "DIM is moving Engram and Glimmer items from {{store}} to the vault and leaving one space open per item type to prevent anything from going to the Postmaster.",
            Configuration: "Configuration",
            Greens: {
              Greens: "Move Uncommon/Green Items to Vault",
              Tooltip: "If checked, DIM will also transfer all uncommon (green) items to the vault. If it's not checked, then green items will stay on your active character." },
            Quickmove: "Quick Move",
            Stop: "Stop" },
          Header: {
            About: "About",
            Filters: "Filters",
            FilterHelp: "Search item/perk or is:arc",
            Refresh: "Refresh Destiny Data",
            SupportDIM: "Support DIM" },
          Help: {
            BackToDIM: "Back to DIM",
            Drag: "Hold shift or pause over drop zone to transfer a partial stack" },
          Hotkey: {
            StartSearch: "Start a search",
            RefreshInventory: "Refresh inventory",
            ToggleDetails: "Toggle showing full item details",
            MarkItemAs: "Mark item as '{{tag}}'",
            ClearNewItems: "Clear new items" },
          LB: {
            LB: "Loadout Builder",
            ShowGear: "Show {{class}} gear",
            HideGear: "Hide {{class}} gear",
            LockEquipped: "Lock Equipped",
            ClearLocked: "Clear Locked",
            Locked: "Locked Items",
            LockedHelp: "Drag and drop any item into its bucket to build set with that specific gear. Shift + click to exclude items.",
            FilterSets: "Filter sets",
            AdvancedOptions: "Advanced Options",
            Fast: "Fast",
            Full: "Full",
            ProcessingMode: {
              ProcessingMode: "Processing mode",
              HelpFast: "Only looks at your best gear.",
              HelpFull: "Looks at more gear, but takes longer." },
            Scaled: "Scaled",
            Current: "Current",
            LightMode: {
              LightMode: "Light mode",
              HelpScaled: "Calculates loadouts as if all items were 350 defense.",
              HelpCurrent: "Calculates loadouts at current defense levels." },
            LBIncludeRare: "Include rare (blue) items",
            Help: "Need help?",
            Equip: "Equip on Current Character",
            ShowAllConfigs: "Show all configurations",
            ShowConfigs: "Show configurations",
            HideAllConfigs: "Hide all configurations",
            HideConfigs: "Hide configurations",
            Loading: "Loading best sets ({{percentage}}%)",
            Vendor: "Include Vendor items",
            Exclude: "Excluded Items",
            ExcludeHelp: "Shift + click an item (or drag and drop into this bucket) to build sets without specific gear.",
            LockPerk: "Lock perk",
            Missing1: "Missing legendary or exotic pieces to build a full set!",
            Missing2: "Missing rare, legendary, or exotic pieces to build a full set!" },
          Loadouts: {
            Loadouts: "Loadouts",
            Before: "Before '{{name}}'",
            Create: "Create Loadout",
            FromEquipped: "Equipped",
            Edit: "Edit Loadout",
            Delete: "Delete Loadout",
            ConfirmDelete: "Are you sure you want to delete '{{name}}'?",
            ApplySearch: "Items = \"{{query}}\"",
            MaximizeLight: "Maximize Light",
            ItemLeveling: "Item Leveling",
            GatherEngrams: "Gather Engrams",
            GatherEngramsExceptExotics: "Exotics",
            RestoreAllItems: "All Items",
            LoadoutName: "Loadout Name...",
            Save: "Save",
            SaveAsNew: "Save As New",
            Cancel: "Cancel",
            ItemsWithIcon: "Items with this icon will be equipped.",
            ClickToEquip: "Click on an item toggle equip.",
            AppliedAuto: "Automatic Loadout Builder",
            Applied: "Your loadout of {{amount}} items have been transferred to your {{store}}.",
            AppliedError: "None of the items in your loadout could be transferred.",
            AppliedWarn: "Your loadout has been partially transferred, but {{failed}} of {{total}} items had errors." },
          Manifest: {
            Build: "Building Destiny info database",
            Download: "Downloading latest Destiny info from Bungie",
            Error1: "Error loading Destiny info: ",
            Error2: "Reload to retry.",
            Load: "Loading saved Destiny info",
            Save: "Saving latest Destiny info",
            Unzip: "Unzipping latest Destiny info" },
          Notes: {
            Error: "Error! Max 120 characters for notes.",
            Help: "Add notes to this item" },
          Settings: {
            Settings: "Settings",
            Language: "Language (reload DIM to take effect)",
            HideUnfiltered: "Hide Unfiltered Items while Filtering",
            HideUnfilteredHelp: "Items that do not match filter criteria will be hidden.",
            AlwaysShowDetails: "Always Show Item Details",
            AlwaysShowDetailsHelp: "Clicking on an item will show a popup that can be expanded to show perk and stat details.  This option will always show that detail when you click on an item.",
            EnableAdvancedStats: "Enable advanced stat quality comparison features",
            EnableAdvancedStatsHelp: "Will enable advanced min/max features on the move dialog and enable the armor comparison view.",
            ShowOverlay: "Show new items with an overlay",
            ShowOverlayHelp: "Will show new items with an overlay.",
            ShowAnimations: "Show new item overlay animations on new items.",
            ShowAnimationsHelp: "Will show the animated new item overlay on new items. Turning this off can save CPU cycles.",
            ShowElemental: "Show elemental damage icons on weapons",
            ShowElementalHelp: "Show elemental damage icons on weapons.",
            SetSort: "Sort Items by:",
            SetSortHelp: "Sort items by rarity or their primary stat value.",
            SortPrimary: "Primary stat",
            SortRarity: "Rarity",
            SortRoll: "Stat roll percent",
            InventoryColumns: "Character Inventory Columns",
            InventoryColumnsHelp: "Select the number of columns for character inventory.",
            VaultColumns: "Vault Maximum Inventory Columns",
            VaultColumnsHelp: "Select the maximum number of columns for vault.",
            SizeItem: "Item Size",
            SizeItemHelp: "How big should items be?",
            ResetToDefault: "Reset to Default",
            CharacterOrder: "Character Order",
            CharacterOrderHelp: "Characters can be ordered by last login or based on their creation date.",
            CharacterOrderRecent: "By Most Recent Character",
            CharacterOrderReversed: "By Most Recent Character (Reversed)",
            CharacterOrderFixed: "Fixed (By Character Age)",
            ExportSS: "Download Spreadsheets",
            ExportSSHelp: "Download a CSV list of your items that can be easily viewed in the spreadsheet app of your choice.",
            DIMPopups: "DIM Info Popups",
            DIMPopupsReset: "Reset previously hidden info tips" },
          Stats: {
            Discipline: "Discipline",
            Intellect: "Intellect",
            Strength: "Strength",
            TierProgress: "{{progress}} for {{tier}}" },
          Tags: {
            TagItem: "Tag Item",
            Favorite: "Favorite",
            Junk: "Junk",
            Infuse: "Infuse",
            Keep: "Keep" },
          Vendors: {
            Vendors: "Vendors",
            Load: "Loading Vendors",
            ArmorAndWeapons: "Armor & Weapons",
            ShipsAndVehicles: "Ships & Vehicles",
            Consumables: "Consumables",
            Bounties: "Bounties",
            ShadersAndEmblems: "Shaders & Emblems",
            Emotes: "Emotes" }
        })
        .translations('it', {
          Level: "Livello",
          Armor: "Armatura",
          General: "Generale",
          Weapons: "Armi",
          Vault: "Depositi",
          Bucket: {
            Armor: "Armatura",
            General: "Generale",
            Postmaster: "Amministratrice",
            Progress: "Progesso",
            Reputation: "Reputazione",
            Vault: "Depositi",
            Weapons: "Armi" },
          Cooldown: {
            Super: "Super tempo di recupero",
            Grenade: "Granate tempo di recupero",
            Melee: "Corpo a corpo tempo di recupero" },
          Notes: {
            Help: "Aggiungere note a questa voce" },
          Loadouts: {
            Create: "Creare Loadout",
            FromEquipped: "Fornito",
            Edit: "Modifica Loadout",
            Delete: "Cancellare Loadout",
            ApplySearch: "Elementi = \"{{query}}\"",
            MaximizeLight: "Massimizzare la Luce",
            ItemLeveling: "Elemento di Livellamento",
            GatherEngrams: "Raccogliere Engram",
            GatherEngramsExceptExotics: "Esotiche",
            RestoreAllItems: "Tutti gli Elementi",
            Loadouts: "Loadouts" },
          Header: {
            About: "Chi siamo",
            SupportDIM: "Aiutare DIM" },
          Settings: {
            Settings: "Impostazioni" },
          Stats: {
            Discipline: "Disciplina",
            Intellect: "Intelletto",
            Strength: "Forza",
            TierProgress: "{{progress}} per {{tier}}" },
          Tags: {
            TagItem: "Elemento Tag",
            Favorite: "Preferito",
            Keep: "Tenere",
            Junk: "Giunca",
            Infuse: "Infondi" },
          Vendors: {
            Vendors: "Mercanti" }
        })
        .translations('de', {
          Level: "Level",
          Weapons: "Waffen",
          Armor: "Rüstung",
          General: "Allgemein",
          Vault: "Tresor",
          About: {
            AboutDIM: "Über Destiny Item Manager (DIM)",
            Description: "DIM basiert auf denselben Diensten von Bungie.net und der Destiny Companion App. DIM kann auf die Elemente in deinem Hüter-Inventar und den Tresor für PlayStation und Xbox zugreifen. Du kannst dann Elemente per Drag & Drop verschieben, wenn Du sie verschieben möchtest.",
            ContactUs: "Kontaktiere uns",
            ContactTwitterText: "Folge uns, um über Updates und Informationen zu DIM benachrichtigt zu werden.",
            ContactRedditText: "Wenn du Fragen, Kommentare oder Anregungen hast - lass es uns wissen!",
            ContactGitHubText: "Wenn du an dem Projekt mitwirken möchtest, besuche uns auf unserer Projektseite auf GitHub.",
            Q1: "Wie bekommt DIM Zugriff auf meine Destiny-Daten?",
            A1: "Jede Chrome-Erweiterung kann nach den Daten, die eine Website auf dem Computer speichert, fragen. Wenn du dich bei Bungie.net anmeldest, erhältst du einen Token (ein Cookie), das für dein Konto eindeutig erzeugt wird. Dieses Token wird verwendet, um mit Bungie sicher zu kommunizieren. Das Token ist sicherer als das Senden des Benutzernamens und des Passwortes mit jeder Anfrage an den Server von Bungie. DIM verwendet dieses Token zur Kommunikation mit Bungie.",
            Q2: "Wie kann ich mich von DIM abmelden?",
            A2: "Deine Sitzung ist an Bungie.net gebunden. Wenn du dich auf Bungie.net abmeldest, wirst du auch von DIM abgemeldet.",
            Q3: "Unterstützt DIM Tastaturkürzel?",
            A3: "Ja! Drücke \"?\" um eine Liste der Kürzel zu sehen.",
            Q4: "Ich habe durch DIM einen Gegenstand verloren!",
            A4a: "Sehr wahrscheinlich ist eine Übertragung fehlgeschlagen, so dass das Element in dem Tresor oder auf einem anderen Charakter ist. Du kannst nach dem Gegenstand suchen. Wenn dies nicht geht, aktualisiere die App, indem du F5 drückst. Prüfe ",
            A4b: " oder im Spiel, um zu sehen, ob der Gegenstand existiert. Wir sind sicher, es ist da.",
            Q5: "Hey, DIM hat mein Gjallarhorn dupliziert!",
            A5: "Nein, haben wir nicht. Versprochen.",
            Note: "Alle Bilder und Bilder und Inhalte sind Eigentum von Bungie. Tritt mit uns bitte in Verbindung, wenn es irgendwelche Probleme gibt." },
          Bucket: {
            Armor: "Rüstung",
            General: "Allgemein",
            Postmaster: "Poststelle",
            Progress: "Fortschritt",
            Reputation: "Ruf",
            Show: "Zeige {{bucket}}",
            Vault: "Tresor",
            Vanguard: "Vorhut",
            Weapons: "Waffen" },
          Cooldown: {
            Grenade: "Granaten Abklingzeit",
            Melee: "Nahkampf Abklingzeit",
            Super: "Super Abklingzeit" },
          Debug: {
            Dump: "Info in Konsole ausgeben",
            View: "Zeige Item Debug Info" },
          FarmingMode: {
            Configuration: "Konfiguration",
            Desc: "DIM verschiebt Engramme und Glimmergegenstände vom {{store}} in den Tresor und lässt einen Platz pro Gegenstandstyp frei um zu verhindern, dass Engramme zur Poststelle geschickt werden.",
            FarmingMode: "Engramme zum Tresor",
            Greens: {
              Greens: "Verschiebe ungewöhnliche/grüne Gegenstände in den Tresor",
              Tooltip: "Wenn aktiviert, verschiebt DIM auch alle ungewöhnlichen/grünen Gegenstände in den Tresor. Andernfalls bleiben diese Gegenstände auf dem aktiven Charakter." },
            Quickmove: "Schnelles Verschieben",
            Stop: "Stop" },
          Header: {
            About: "Über",
            Filters: "Filter",
            FilterHelp: "Suche nach Item/Perk oder is:arc",
            Refresh: "Aktualisiere Destiny Daten",
            SupportDIM: "DIM Unterstützen" },
          Help: {
            BackToDIM: "Zurück zu DIM",
            Drag: "Halte Shift oder pausiere über der Drop-Zone, um einen Teilstapel zu übertragen" },
          Hotkey: {
            ClearNewItems: "Neue Elemente löschen",
            MarkItemAs: "Markiere Element als '{{tag}}'",
            RefreshInventory: "Aktualisiere Inventar",
            StartSearch: "Starte eine Suche",
            ToggleDetails: "Schalter für vollständige Artikeldetails" },
          LB: {
            LB: "Loadout Builder",
            ShowGear: "Zeige {{class}} Ausrüstung",
            HideGear: "Verstecke {{class}} Ausrüstung",
            LockEquipped: "Lock Equipped",
            ClearLocked: "Clear Locked",
            Locked: "Festgelegte Gegenstände",
            LockedHelp: "Ziehe einen beliebigen Gegenstand in sein Feld, um ihn für die generierten Loadouts festzulegen. Mit Shift + Klick kannst du Gegenstände ignorieren.",
            FilterSets: "Sets filtern",
            AdvancedOptions: "Erweiterte Optionen",
            Fast: "Schnelle",
            Full: "Vollständige",
            ProcessingMode: {
              ProcessingMode: "Berechnung",
              HelpFast: "Nur die beste Ausrüstung wird einbezogen.",
              HelpFull: "Bezieht die ganze Ausrüstung mit ein." },
            Scaled: "Skaliertes",
            Current: "Aktuelles",
            LightMode: {
              LightMode: "Lichtlevel",
              HelpScaled: "Berechnet Loadouts, bei denen alle Gegenstände Lichtlevel 350 besitzen.",
              HelpCurrent: "Berechnet Loadouts mit dem aktuellen Lichtlevel der Gegenstände." },
            IncludeRare: "Seltene (blaue) Gegenstände einbeziehen",
            Help: "Brauchst du Hilfe?",
            Equip: "Am aktuellen Charakter anlegen.",
            ShowAllConfigs: "Zeige alle Varianten",
            ShowConfigs: "Zeige Varianten",
            HideAllConfigs: "Verstecke alle Varianten",
            HideConfigs: "Verstecke Varianten",
            Loading: "Lade die besten Sets ({{percentage}}%)",
            Vendor: "Gegenstände von Händlern einschließen",
            Exclude: "Ignorierte Gegenstände",
            ExcludeHelp: "Benutze Shift + Klick bei einem Gegenstand (oder ziehe ihn in dieses Feld) um Sets ohne diesen Gegenstand zu generieren.",
            LockPerk: "Perk festlegen",
            Missing1: "Es fehlen legendäre oder exotische Gegenstände, um ein vollständiges Set zu generieren!",
            Missing2: "Es fehlen seltene, legendäre oder exotische Gegenstände, um ein vollständiges Set zu generieren!" },
          Loadouts: {
            Loadouts: "Loadouts",
            Before: "Zurück zu '{{name}}'",
            Create: "Loadout erstellen",
            FromEquipped: "Ausrüstung",
            Edit: "Loadout bearbeiten",
            Delete: "Loadout löschen",
            ApplySearch: "Gegenstand = \"{{query}}\"",
            MaximizeLight: "Licht maximieren",
            ItemLeveling: "Gegenstand aufwerten",
            GatherEngrams: "Engramme sammeln",
            GatherEngramsExceptExotics: "Exotics",
            RestoreAllItems: "Alle Elemente",
            LoadoutName: "Loadout Name...",
            Save: "Speichern",
            SaveAsNew: "Speichern als...",
            Cancel: "Abbrechen",
            ItemsWithIcon: "Gegenstände mit diesem Symbol werden angelegt.",
            ClickToEquip: "Klicke auf einen Gegenstand um das Anlegen zu aktivieren bzw. zu deaktivieren.",
            AppliedAuto: "Automatischer Loadout Builder",
            Applied: "Dein Loadout aus {{amount}} Gegenständen wurde zum {{store}} übertragen.",
            AppliedError: "Keiner der Gegenstände in deinem Loadout konnte übertragen werden.",
            AppliedWarn: "Dein Loadout wurde teilweise angewendet, aber {{failed}} von {{total}} Gegenständen waren fehlerhaft." },
          Manifest: {
            Build: "Lege Destiny Datenbank an",
            Error1: "Fehler beim Laden von Informationen: ",
            Error2: "App neu laden, um es nochmals zu versuchen.",
            Download: "Lade neueste Daten von Bungie herunter",
            Load: "Lade gespeicherte Daten",
            Unzip: "Entpacke neueste Daten",
            Save: "Speichere neueste Daten" },
          Notes: {
            Error: "Fehler! Max 120 Zeichen für Notizen.",
            Help: "Notiz für diesen Artikel" },
          Settings: {
            Settings: "Einstellungen",
            Language: "Sprache (lade DIM neu zum Übernehmnen)",
            HideUnfiltered: "Zeige nur die Suchergebnisse beim Filtern",
            HideUnfilteredHelp: "Gegenstände, die nicht zum Filter passen, werden ausgeblendet.",
            AlwaysShowDetails: "Zeige immer Details der Gegenstände",
            AlwaysShowDetailsHelp: "Ein Klick auf einen Gegenstand öffnet ein Popup, welches erweitert werden kann, um Details zu Statistiken und Perks zu zeigen. Diese Option wird immer diese Details zeigen, wenn du auf einen Gegenstand klickst.",
            EnableAdvancedStats: "Aktivieren der erweiterten Statusvergleichsfunktionen",
            EnableAdvancedStatsHelp: "Ermöglicht erweiterte Min/Max-Funktionen im Verschieben-Dialog und aktiviert die Rüstungsvergleichsansicht.",
            ShowOverlay: "Zeige neue Gegenstände mit einem Overlay",
            ShowOverlayHelp: "Zeigt neue Gegenstände mit einem hellen Overlay an.",
            ShowAnimations: "Zeige animiertes Overlay bei neuen Gegenständen an",
            ShowAnimationsHelp: "Zeigt ein animiertes Overlay bei neuen Gegenständen an. Abschalten verringert die CPU Auslastung.",
            ShowElemental: "Zeige Elementarschaden bei Waffen an",
            ShowElementalHelp: "Zeigt den Elementarschaden bei Waffen an.",
            SetSort: "Sortiere Gegenstände nach:",
            SetSortHelp: "Sortieren von Gegenständen nach Seltenheit oder ihrem primären Statuswert.",
            SortPrimary: "Primären Stat",
            SortRarity: "Seltenheit",
            SortRoll: "Stat-Roll Prozent",
            InventoryColumns: "Charakter Inventar Spalten",
            InventoryColumnsHelp: "Wähle die Anzahl der Spalten für das Charakter Inventar.",
            VaultColumns: "Maximale Anzahl von Spalten des Tresors",
            VaultColumnsHelp: "Wähle die maximale Anzahl von Spalten für den Tresor aus.",
            SizeItem: "Item Größe",
            SizeItemHelp: "Wie groß sollen die Gegenstände sein?",
            ResetToDefault: "Zurücksetzen auf Standard",
            CharacterOrder: "Charakter Reihenfolge",
            CharacterOrderHelp: "Charakter können nach dem letzten Login oder ihrem Erstelldatum sortiert werden.",
            CharacterOrderRecent: "Nach zuletzt aktivem Charakter",
            CharacterOrderReversed: "Nach zuletzt aktivem Charakter (umgedreht)",
            CharacterOrderFixed: "Fest (Nach Alter des Charakters)",
            ExportSS: "Lade Tabelle herunter",
            ExportSSHelp: "Lade eine CSV-Tabelle von deinen Gegenständen, die leicht mit jedem Tabellenprogramm angezeigt werden kann.",
            DIMPopups: "DIM Info Popups",
            DIMPopupsReset: "Zeige zuvor versteckte Info Tipps" },
          Stats: {
            Intellect: "Intellekt",
            Discipline: "Disziplin",
            Strength: "Stärke",
            TierProgress: "{{progress}} für {{tier}}" },
          Tags: {
            TagItem: "Item taggen",
            Favorite: "Favorit",
            Keep: "Behalten",
            Junk: "Trödel",
            Infuse: "Infundieren" },
          Vendors: {
            Vendors: "Händler",
            VendorsLoad: "Lade Händler",
            ArmorAndWeapons: "Panzerung & Waffen",
            ShipsAndVehicles: "Schiffe & Fahrzeuge",
            Consumables: "Verbrauchsgegenstände",
            Bounties: "Beutezüge",
            ShadersAndEmblems: "Shader & Embleme",
            Emotes: "Emotes" }
        })
        .translations('fr', {
          Level: "Niveau",
          Weapons: "Armes",
          Armor: "Armure",
          General: "Général",
          Vault: "Coffres",
          Bucket: {
            Weapons: "Armes",
            Armor: "Armure",
            General: "Général",
            Postmaster: "Commis des postes",
            Vault: "Coffres",
            Reputation: "Estime" },
          Cooldown: {
            Super: "Régénération du Super",
            Grenade: "Régénération de Grenade",
            Melee: "Régénération de Mêlée" },
          Header: {
            About: "À propos",
            SupportDIM: "Soutien DIM" },
          Loadouts: {
            Create: "Créer Loadout",
            FromEquipped: "Equipé",
            Edit: "Modifier Loadout",
            Delete: "Effacer Loadout",
            ApplySearch: "Articles = \"{{query}}\"",
            MaximizeLight: "Maximiser la Lumière",
            ItemLeveling: "Evolution d'article",
            GatherEngrams: "Rassembler les Engrammes",
            GatherEngramsExceptExotics: "Exotiques",
            RestoreAllItems: "Tous les Articles",
            Loadouts: "Loadouts",
            AppliedAuto: "Constructeur de Loadout automatique",
            Applied: "Votre loadout de {{amount}} articles a été transféré à votre {{store}}",
            AppliedError: "Aucun des articles de votre loadout n'a pu être transféré.",
            AppliedWarn: "Votre loadout a été partiellement transféré, mais {{failed}} sur {{total}} articles ont échoué." },
          Notes: {
            Help: "Ajouter des notes à cet article" },
          Settings: {
            Settings: "Paramètres" },
          Stats: {
            Intellect: "Intelligence",
            Discipline: "Discipline",
            Strength: "Force",
            TierProgress: "{{progress}} pour {{tier}}" },
          Tags: {
            TagItem: "Tagger Article",
            Favorite: "Préféré",
            Keep: "Garder",
            Junk: "Camelote",
            Infuse: "Infuser" },
          Vendors: {
            Vendors: "Marchands" }
        })
        .translations('es', {
          Level: "Nivel",
          Weapons: "Armas",
          Armor: "Armadura",
          Vault: "Depósito",
          Bucket: {
            Weapons: "Armas",
            Armor: "Armadura",
            Postmaster: "Administración",
            Progress: "Progreso",
            Vault: "Depósito",
            Reputation: "Reputación" },
          Cooldown: {
            Super: "Super tiempo",
            Grenade: "Granade tiempo",
            Melee: "Cuerpo a cuerpo tiempo" },
          Header: {
            About: "Sobre",
            SupportDIM: "Apoyo DIM" },
          Loadouts: {
            Create: "Crear Loadout",
            FromEquipped: "Equipado",
            Edit: "Editar Loadout",
            Delete: "Borrar Loadout",
            ApplySearch: "Artículos = \"{{query}}\"",
            MaximizeLight: "Maximizar la Luz",
            ItemLeveling: "Nivelación Elemento",
            GatherEngrams: "Recopilar Engramas",
            GatherEngramsExceptExotics: "Exóticas",
            RestoreAllItems: "Todos los Artículos",
            Loadouts: "Loadouts" },
          Notes: {
            Help: "Agregar notas a este artículo" },
          Settings: {
            Settings: "Configuración" },
          Stats: {
            Intellect: "Intelecto",
            Discipline: "Disciplina",
            Strength: "Fuerza",
            TierProgress: "{{progress}} por {{tier}}" },
          Tags: {
            TagItem: "Elemento de Etiqueta",
            Favorite: "Favorito",
            Keep: "Guardar",
            Junk: "Basura",
            Infuse: "Infundir" },
          Vendors: {
            Vendors: "Comerciantes" }
        })
        .translations('ja', {
          Level: "レベル",
          Weapons: "武器",
          Armor: "よろい",
          General: "全般",
          Vault: "装備",
          Bucket: {
            Weapons: "武器",
            Armor: "よろい",
            General: "全般",
            Postmaster: "ポストマスター",
            Vault: "装備",
            Vanguard: "バンガード",
            Progress: "進捗",
            Reputation: "評価" },
          Header: {
            About: "紹介",
            SupportDIM: "サポート DIM" },
          Loadouts: {
            Create: "作る Loadout",
            FromEquipped: "備える",
            Edit: "編集 Loadout",
            Delete: "削除 Loadout",
            ApplySearch: "箇条 = \"{{query}}\"",
            MaximizeLight: "ライトを最大化",
            ItemLeveling: "アイテムの平準化",
            GatherEngrams: "エングラムを収集",
            GatherEngramsExceptExotics: "エキゾチック",
            RestoreAllItems: "品揃え",
            Loadouts: "Loadouts" },
          Notes: {
            Help: "このアイテムにメモを追加" },
          Settings: {
            Settings: "設定" },
          Stats: {
            Intellect: "知性",
            Discipline: "鍛錬",
            Strength: "腕力" },
          Tags: {
            TagItem: "タグアイテム",
            Favorite: "本命",
            Keep: "保つ",
            Junk: "ジャンク",
            Infuse: "煎じる" },
          Vendors: {
            Vendors: "ベンダー" }
        })
        .translations('pt-br', {
          Level: "Nível",
          Weapons: "Armas",
          Armor: "Armaduras",
          General: "Geral",
          Vault: "Cofre",
          Bucket: {
            Weapons: "Armas",
            Armor: "Armaduras",
            General: "Geral",
            Postmaster: "Chefe do Correio",
            Progress: "Progresso",
            Vault: "Cofre",
            Vanguard: "Vanguarda",
            Reputation: "Reputação" },
          Cooldown: {
            Super: "Tempo de carga da Super",
            Grenade: "Tempo de carga da granada",
            Melee: "Tempo de carga do corpo-a-corpo" },
          Header: {
            About: "Sobre",
            FilterHelp: "Buscar item/perk ou is:arc",
            SupportDIM: "Apoie o DIM" },
          Loadouts: {
            Before: "Antes '{{name}}'",
            Create: "Criar Loadout",
            FromEquipped: "Equipado",
            Edit: "Editar Loadout",
            Delete: "Excluir Loadout",
            ApplySearch: "Itens = \"{{query}}\"",
            MaximizeLight: "Maximizar a Luz",
            ItemLeveling: "Nivelamento de item",
            GatherEngrams: "Obter engramas",
            GatherEngramsExceptExotics: "Exóticos",
            FarmingMode: "Modo Farm (mover engramas)",
            RestoreAllItems: "Todos os itens",
            Loadouts: "Loadouts",
            AppliedAuto: "Construtor automático de Loadouts",
            Applied: "Seu loadout de {{amount}} itens foram transferidos para seu {{store}}.",
            AppliedError: "Nenhum item em seu Loadout pode ser transferido.",
            AppliedWarn: "Seu Loadout foi parcialmente transferido, mas {{failed}} de {{total}} itens retornaram erros." },
          Notes: {
            Help: "Adicionar observações a este item" },
          Settings: {
            Settings: "Configurações" },
          Stats: {
            Intellect: "Intelecto",
            Discipline: "Disciplina",
            Strength: "Força",
            TierProgress: "{{progress}} para {{tier}}" },
          Tags: {
            TagItem: "Marcar item",
            Favorite: "Favorito",
            Keep: "Guardar",
            Junk: "Lixo",
            Infuse: "Infundir" },
          Vendors: {
            Vendors: "Vendedores" }
        })
        .fallbackLanguage('en');
    }]);
})();
