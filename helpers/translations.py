"""
dft/helpers/translations.py

Single source of truth for all translation strings.
Run this file to (re)generate src/messages/en.json, es.json, fr.json,
and it.json from the TRANSLATIONS dict below.

Every run fully OVERWRITES all four JSON files from this dict —
this file is the source of truth, not the JSON files. If you need
to add or change a translation, edit TRANSLATIONS below and re-run.

USAGE:
    python3 dft/helpers/translations.py

Shape of TRANSLATIONS:
{
    "namespace": {
        "keyName": {
            "en": "English text",
            "es": "Spanish text",
            "fr": "French text",
            "it": "Italian text",
        },
        ...
    },
    ...
}
"""

import json
from pathlib import Path

# ------------------------------------------------------------------
# Path to your messages folder. Adjust if your project structure differs.
# ------------------------------------------------------------------
MESSAGES_DIR = Path(__file__).resolve().parent.parent / "dutyhunter" / "src" / "messages"

LOCALES = ["en", "es", "fr", "it"]

# ------------------------------------------------------------------
# SOURCE OF TRUTH — every translation string in the app lives here.
# ------------------------------------------------------------------
TRANSLATIONS = {
    "nav": {
        "login": {
            "en": "Log in",
            "es": "Iniciar sesión",
            "fr": "Connexion",
            "it": "Accedi",
        },
        "signup": {
            "en": "Sign up",
            "es": "Registrarse",
            "fr": "S'inscrire",
            "it": "Registrati",
        },
        "logout": {
            "en": "Log out",
            "es": "Cerrar sesión",
            "fr": "Déconnexion",
            "it": "Esci",
        },
        "browse": {
            "en": "Browse",
            "es": "Explorar",
            "fr": "Parcourir",
            "it": "Esplora",
        },
        "products": {
            "en": "Products",
            "es": "Productos",
            "fr": "Produits",
            "it": "Prodotti",
        },
        "airports": {
            "en": "Airports",
            "es": "Aeropuertos",
            "fr": "Aéroports",
            "it": "Aeroporti",
        },
    },
    "auth": {
        "loginTitle": {
            "en": "Log in to Duty Hunter",
            "es": "Inicia sesión en Duty Hunter",
            "fr": "Connectez-vous à Duty Hunter",
            "it": "Accedi a Duty Hunter",
        },
        "showPassword": {
            "en": "Show password",
            "es": "Mostrar contraseña",
            "fr": "Afficher le mot de passe",
            "it": "Mostra password",
        },
        "hidePassword": {
            "en": "Hide password",
            "es": "Ocultar contraseña",
            "fr": "Masquer le mot de passe",
            "it": "Nascondi password",
        },
        "signupTitle": {
            "en": "Create an account",
            "es": "Crea una cuenta",
            "fr": "Créer un compte",
            "it": "Crea un account",
        },
        "emailLabel": {
            "en": "Email",
            "es": "Correo electrónico",
            "fr": "E-mail",
            "it": "E-mail",
        },
        "passwordLabel": {
            "en": "Password",
            "es": "Contraseña",
            "fr": "Mot de passe",
            "it": "Password",
        },
        "checkEmailMessage": {
            "en": "Check your email to confirm your account",
            "es": "Revisa tu correo para confirmar tu cuenta",
            "fr": "Vérifiez votre e-mail pour confirmer votre compte",
            "it": "Controlla la tua e-mail per confermare l'account",
        },
        "subtitle": {
            "en": "Track duty-free sightings at airports around the world.",
            "es": "Rastrea avistamientos de artículos libres de impuestos en aeropuertos de todo el mundo.",
            "fr": "Suivez les observations de produits hors taxes dans les aéroports du monde entier.",
            "it": "Traccia gli avvistamenti di prodotti duty-free negli aeroporti di tutto il mondo.",
        },
        "usernameLabel": {
            "en": "Username",
            "es": "Nombre de usuario",
            "fr": "Nom d'utilisateur",
            "it": "Nome utente",
        },
        "passwordHint": {
            "en": "At least 6 characters",
            "es": "Al menos 6 caracteres",
            "fr": "Au moins 6 caractères",
            "it": "Almeno 6 caratteri",
        },
        "creatingAccount": {
            "en": "Creating account…",
            "es": "Creando cuenta…",
            "fr": "Création du compte…",
            "it": "Creazione account…",
        },
        "loggedInTitle": {
            "en": "You're logged in",
            "es": "Has iniciado sesión",
            "fr": "Vous êtes connecté",
            "it": "Hai effettuato l'accesso",
        },
        "signedInAs": {
            "en": "Signed in as",
            "es": "Sesión iniciada como",
            "fr": "Connecté en tant que",
            "it": "Accesso effettuato come",
        },
        "goHome": {
            "en": "Go home",
            "es": "Ir al inicio",
            "fr": "Retour à l'accueil",
            "it": "Vai alla home",
        },
        "loginSubtitle": {
            "en": "Welcome back to Duty Hunter.",
            "es": "Bienvenido de nuevo a Duty Hunter.",
            "fr": "Content de vous revoir sur Duty Hunter.",
            "it": "Bentornato su Duty Hunter.",
        },
        "loggingIn": {
            "en": "Logging in…",
            "es": "Iniciando sesión…",
            "fr": "Connexion en cours…",
            "it": "Accesso in corso…",
        },
        "checkEmailTitle": {
            "en": "Check your email",
            "es": "Revisa tu correo",
            "fr": "Vérifiez votre e-mail",
            "it": "Controlla la tua e-mail",
        },
        "checkEmailBody": {
            "en": "We sent you a confirmation link. Click it to activate your account, then come back and log in.",
            "es": "Te enviamos un enlace de confirmación. Haz clic en él para activar tu cuenta, luego vuelve e inicia sesión.",
            "fr": "Nous vous avons envoyé un lien de confirmation. Cliquez dessus pour activer votre compte, puis revenez vous connecter.",
            "it": "Ti abbiamo inviato un link di conferma. Fai clic per attivare il tuo account, poi torna e accedi.",
        },
    },
    "sightings": {
        "newSighting": {
            "en": "New sighting",
            "es": "Nuevo avistamiento",
            "fr": "Nouvelle observation",
            "it": "Nuovo avvistamento",
        },
        "airportLabel": {
            "en": "Airport",
            "es": "Aeropuerto",
            "fr": "Aéroport",
            "it": "Aeroporto",
        },
        "storeLabel": {
            "en": "Store",
            "es": "Tienda",
            "fr": "Boutique",
            "it": "Negozio",
        },
        "productLabel": {
            "en": "Product",
            "es": "Producto",
            "fr": "Produit",
            "it": "Prodotto",
        },
        "notesLabel": {
            "en": "Notes (optional)",
            "es": "Notas (opcional)",
            "fr": "Notes (facultatif)",
            "it": "Note (facoltativo)",
        },
        "submitButton": {
            "en": "Submit sighting",
            "es": "Enviar avistamiento",
            "fr": "Envoyer l'observation",
            "it": "Invia avvistamento",
        },
        "pageTitle": {
            "en": "Report a sighting",
            "es": "Reportar un avistamiento",
            "fr": "Signaler une observation",
            "it": "Segnala un avvistamento",
        },
        "dateLabel": {
            "en": "Date seen",
            "es": "Fecha de avistamiento",
            "fr": "Date d'observation",
            "it": "Data avvistamento",
        },
        "photoLabel": {
            "en": "Photo (optional)",
            "es": "Foto (opcional)",
            "fr": "Photo (facultatif)",
            "it": "Foto (facoltativo)",
        },
        "searchAirports": {
            "en": "Search airports…",
            "es": "Buscar aeropuertos…",
            "fr": "Rechercher des aéroports…",
            "it": "Cerca aeroporti…",
        },
        "searchProducts": {
            "en": "Search products…",
            "es": "Buscar productos…",
            "fr": "Rechercher des produits…",
            "it": "Cerca prodotti…",
        },
        "selectStore": {
            "en": "Select a store",
            "es": "Selecciona una tienda",
            "fr": "Sélectionnez une boutique",
            "it": "Seleziona un negozio",
        },
        "selectAirportFirst": {
            "en": "Select an airport first",
            "es": "Selecciona primero un aeropuerto",
            "fr": "Sélectionnez d'abord un aéroport",
            "it": "Seleziona prima un aeroporto",
        },
        "dutyFreeFallback": {
            "en": "Duty free",
            "es": "Libre de impuestos",
            "fr": "Hors taxes",
            "it": "Duty free",
        },
        "terminal": {
            "en": "Terminal",
            "es": "Terminal",
            "fr": "Terminal",
            "it": "Terminal",
        },
        "nearGate": {
            "en": "Near",
            "es": "Cerca de",
            "fr": "Près de",
            "it": "Vicino a",
        },
        "changePhoto": {
            "en": "Change photo",
            "es": "Cambiar foto",
            "fr": "Changer la photo",
            "it": "Cambia foto",
        },
        "addPhoto": {
            "en": "Add a photo",
            "es": "Agregar una foto",
            "fr": "Ajouter une photo",
            "it": "Aggiungi una foto",
        },
        "processingPhoto": {
            "en": "Processing photo…",
            "es": "Procesando foto…",
            "fr": "Traitement de la photo…",
            "it": "Elaborazione foto…",
        },
        "photoErrorMessage": {
            "en": "Could not process that photo. Try a different one, or a standard JPEG/PNG.",
            "es": "No se pudo procesar esa foto. Prueba con otra, o con un JPEG/PNG estándar.",
            "fr": "Impossible de traiter cette photo. Essayez-en une autre, ou un JPEG/PNG standard.",
            "it": "Impossibile elaborare quella foto. Prova con un'altra, o con un JPEG/PNG standard.",
        },
        "selectAllFieldsError": {
            "en": "Please select an airport, store, and product.",
            "es": "Selecciona un aeropuerto, tienda y producto.",
            "fr": "Veuillez sélectionner un aéroport, une boutique et un produit.",
            "it": "Seleziona un aeroporto, un negozio e un prodotto.",
        },
        "mustBeLoggedInError": {
            "en": "You must be logged in.",
            "es": "Debes iniciar sesión.",
            "fr": "Vous devez être connecté.",
            "it": "Devi effettuare l'accesso.",
        },
        "sightingAdded": {
            "en": "Sighting added! 🎉",
            "es": "¡Avistamiento agregado! 🎉",
            "fr": "Observation ajoutée ! 🎉",
            "it": "Avvistamento aggiunto! 🎉",
        },
        "submitting": {
            "en": "Submitting…",
            "es": "Enviando…",
            "fr": "Envoi en cours…",
            "it": "Invio in corso…",
        },
        "noMatches": {
            "en": "No matches",
            "es": "Sin resultados",
            "fr": "Aucun résultat",
            "it": "Nessun risultato",
        },
    },
    "home": {
        "title": {
            "en": "Home",
            "es": "Inicio",
            "fr": "Accueil",
            "it": "Home",
        },
        "placeholder": {
            "en": "Placeholder — top 5 airports for now.",
            "es": "Provisional — los 5 aeropuertos principales por ahora.",
            "fr": "Provisoire — les 5 principaux aéroports pour l'instant.",
            "it": "Provvisorio — i primi 5 aeroporti per ora.",
        },
    },
    "welcome": {
        "title": {
            "en": "Welcome to Duty Hunter",
            "es": "Bienvenido a Duty Hunter",
            "fr": "Bienvenue sur Duty Hunter",
            "it": "Benvenuto su Duty Hunter",
        },
        "subtitle": {
            "en": "Fellow travelers helping each other find rare cigarettes, whiskeys, and fragrances at duty-free stores around the world.",
            "es": "Viajeros ayudándose mutuamente a encontrar cigarrillos, whiskies y fragancias raros en tiendas libres de impuestos alrededor del mundo.",
            "fr": "Des voyageurs qui s'entraident pour trouver des cigarettes, whiskies et parfums rares dans les boutiques hors taxes du monde entier.",
            "it": "Viaggiatori che si aiutano a vicenda a trovare sigarette, whisky e profumi rari nei negozi duty-free di tutto il mondo.",
        },
    },
    "airportsPage": {
        "title": {
            "en": "Airports",
            "es": "Aeropuertos",
            "fr": "Aéroports",
            "it": "Aeroporti",
        },
        "addToFavorites": {
            "en": "Add to favorites",
            "es": "Agregar a favoritos",
            "fr": "Ajouter aux favoris",
            "it": "Aggiungi ai preferiti",
        },
        "removeFromFavorites": {
            "en": "Remove from favorites",
            "es": "Quitar de favoritos",
            "fr": "Retirer des favoris",
            "it": "Rimuovi dai preferiti",
        },
        "listView": {
            "en": "List view",
            "es": "Vista de lista",
            "fr": "Vue liste",
            "it": "Vista elenco",
        },
        "mapView": {
            "en": "Map view",
            "es": "Vista de mapa",
            "fr": "Vue carte",
            "it": "Vista mappa",
        },
        "searchPlaceholder": {
            "en": "Search airports…",
            "es": "Buscar aeropuertos…",
            "fr": "Rechercher des aéroports…",
            "it": "Cerca aeroporti…",
        },
        "noResults": {
            "en": "No airports found.",
            "es": "No se encontraron aeropuertos.",
            "fr": "Aucun aéroport trouvé.",
            "it": "Nessun aeroporto trovato.",
        },
    },
}


def build_locale_dict(locale: str) -> dict:
    """Build the full nested JSON structure for one locale."""
    result = {}
    for namespace, keys in TRANSLATIONS.items():
        result[namespace] = {}
        for key_name, translations in keys.items():
            if locale not in translations:
                raise KeyError(
                    f"Missing '{locale}' translation for {namespace}.{key_name}"
                )
            result[namespace][key_name] = translations[locale]
    return result


def write_locale_file(locale: str, data: dict) -> None:
    file_path = MESSAGES_DIR / f"{locale}.json"
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")


def generate_all() -> None:
    if not MESSAGES_DIR.exists():
        raise FileNotFoundError(
            f"Messages directory not found at {MESSAGES_DIR}. "
            f"Update MESSAGES_DIR at the top of this script."
        )

    for locale in LOCALES:
        data = build_locale_dict(locale)
        write_locale_file(locale, data)
        key_count = sum(len(keys) for keys in TRANSLATIONS.values())
        print(f"✓ Wrote {locale}.json ({key_count} keys)")

    print("\nAll locale files regenerated from TRANSLATIONS.")
    print("Run `npm run check:i18n` to confirm everything is in sync.")


if __name__ == "__main__":
    generate_all()