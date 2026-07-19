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
        "brands": {
            "en": "Brands",
            "es": "Marcas",
            "fr": "Marques",
            "it": "Marchi",
        },
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
        "favorites": {
            "en": "Favorites",
            "es": "Favoritos",
            "fr": "Favoris",
            "it": "Preferiti",
        },
    },
    "auth": {
        "emailTypoSuggestion": {
            "en": "Did you mean",
            "es": "¿Quisiste decir",
            "fr": "Vouliez-vous dire",
            "it": "Intendevi",
        },
        "forgotPassword": {
            "en": "Forgot password?",
            "es": "¿Olvidaste tu contraseña?",
            "fr": "Mot de passe oublié ?",
            "it": "Password dimenticata?",
        },
        "forgotPasswordTitle": {
            "en": "Reset your password",
            "es": "Restablece tu contraseña",
            "fr": "Réinitialisez votre mot de passe",
            "it": "Reimposta la tua password",
        },
        "forgotPasswordSubtitle": {
            "en": "Enter your email and we'll send you a reset link.",
            "es": "Ingresa tu correo y te enviaremos un enlace para restablecerla.",
            "fr": "Entrez votre e-mail et nous vous enverrons un lien de réinitialisation.",
            "it": "Inserisci la tua e-mail e ti invieremo un link per reimpostarla.",
        },
        "sendResetLink": {
            "en": "Send reset link",
            "es": "Enviar enlace",
            "fr": "Envoyer le lien",
            "it": "Invia link",
        },
        "sendingResetLink": {
            "en": "Sending…",
            "es": "Enviando…",
            "fr": "Envoi en cours…",
            "it": "Invio in corso…",
        },
        "backToLogin": {
            "en": "Back to login",
            "es": "Volver a iniciar sesión",
            "fr": "Retour à la connexion",
            "it": "Torna al login",
        },
        "resetEmailSentTitle": {
            "en": "Check your email",
            "es": "Revisa tu correo",
            "fr": "Vérifiez votre e-mail",
            "it": "Controlla la tua e-mail",
        },
        "resetEmailSentBody": {
            "en": "We sent you a link to reset your password.",
            "es": "Te enviamos un enlace para restablecer tu contraseña.",
            "fr": "Nous vous avons envoyé un lien pour réinitialiser votre mot de passe.",
            "it": "Ti abbiamo inviato un link per reimpostare la tua password.",
        },
        "resetLinkInvalidTitle": {
            "en": "Link expired or invalid",
            "es": "Enlace expirado o inválido",
            "fr": "Lien expiré ou invalide",
            "it": "Link scaduto o non valido",
        },
        "resetLinkInvalidBody": {
            "en": "Please request a new password reset link.",
            "es": "Por favor solicita un nuevo enlace para restablecer tu contraseña.",
            "fr": "Veuillez demander un nouveau lien de réinitialisation.",
            "it": "Richiedi un nuovo link per reimpostare la password.",
        },
        "resetPasswordTitle": {
            "en": "Set a new password",
            "es": "Establece una nueva contraseña",
            "fr": "Définissez un nouveau mot de passe",
            "it": "Imposta una nuova password",
        },
        "resetPasswordSubtitle": {
            "en": "Choose a new password for your account.",
            "es": "Elige una nueva contraseña para tu cuenta.",
            "fr": "Choisissez un nouveau mot de passe pour votre compte.",
            "it": "Scegli una nuova password per il tuo account.",
        },
        "newPasswordLabel": {
            "en": "New password",
            "es": "Nueva contraseña",
            "fr": "Nouveau mot de passe",
            "it": "Nuova password",
        },
        "resetPasswordButton": {
            "en": "Reset password",
            "es": "Restablecer contraseña",
            "fr": "Réinitialiser le mot de passe",
            "it": "Reimposta password",
        },
        "resettingPassword": {
            "en": "Resetting…",
            "es": "Restableciendo…",
            "fr": "Réinitialisation en cours…",
            "it": "Reimpostazione in corso…",
        },
        "resetSuccessTitle": {
            "en": "Password updated!",
            "es": "¡Contraseña actualizada!",
            "fr": "Mot de passe mis à jour !",
            "it": "Password aggiornata!",
        },
        "resetSuccessBody": {
            "en": "Redirecting you now…",
            "es": "Redirigiendo…",
            "fr": "Redirection en cours…",
            "it": "Reindirizzamento in corso…",
        },
        "disposableEmailError": {
            "en": "Please use a real email address, not a temporary one.",
            "es": "Por favor usa una dirección de correo real, no una temporal.",
            "fr": "Veuillez utiliser une adresse e-mail réelle, pas une adresse temporaire.",
            "it": "Utilizza un indirizzo e-mail reale, non uno temporaneo.",
        },
        "dummyEmailError": {
            "en": "Please use a real email address you can access.",
            "es": "Por favor usa una dirección de correo real a la que puedas acceder.",
            "fr": "Veuillez utiliser une adresse e-mail réelle à laquelle vous avez accès.",
            "it": "Utilizza un indirizzo e-mail reale a cui puoi accedere.",
        },
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
    "productsPage": {
        "title": {
            "en": "Products",
            "es": "Productos",
            "fr": "Produits",
            "it": "Prodotti",
        },
        "searchPlaceholder": {
            "en": "Search products…",
            "es": "Buscar productos…",
            "fr": "Rechercher des produits…",
            "it": "Cerca prodotti…",
        },
        "noResults": {
            "en": "No products found.",
            "es": "No se encontraron productos.",
            "fr": "Aucun produit trouvé.",
            "it": "Nessun prodotto trovato.",
        },
        "noImage": {
            "en": "No image",
            "es": "Sin imagen",
            "fr": "Aucune image",
            "it": "Nessuna immagine",
        },
    },
    "feed": {
        "title": {
            "en": "Sightings Feed",
            "es": "Feed de avistamientos",
            "fr": "Fil d'observations",
            "it": "Feed avvistamenti",
        },
        "empty": {
            "en": "No sightings yet. Be the first to report one!",
            "es": "Aún no hay avistamientos. ¡Sé el primero en reportar uno!",
            "fr": "Aucune observation pour l'instant. Soyez le premier à en signaler une !",
            "it": "Ancora nessun avvistamento. Sii il primo a segnalarne uno!",
        },
        "reportedBy": {
            "en": "Reported by",
            "es": "Reportado por",
            "fr": "Signalé par",
            "it": "Segnalato da",
        },
        "seenOn": {
            "en": "Seen on",
            "es": "Visto el",
            "fr": "Vu le",
            "it": "Visto il",
        },
        "loadMore": {
            "en": "Load more",
            "es": "Cargar más",
            "fr": "Charger plus",
            "it": "Carica altro",
        },
    },
    "airportSightings": {
        "backToAirports": {
            "en": "Back to airports",
            "es": "Volver a aeropuertos",
            "fr": "Retour aux aéroports",
            "it": "Torna agli aeroporti",
        },
        "empty": {
            "en": "No sightings reported at this airport yet.",
            "es": "Aún no hay avistamientos reportados en este aeropuerto.",
            "fr": "Aucune observation signalée dans cet aéroport pour l'instant.",
            "it": "Ancora nessun avvistamento segnalato in questo aeroporto.",
        },
    },
    "profile": {
        "avatarLabel": {
            "en": "Profile picture",
            "es": "Foto de perfil",
            "fr": "Photo de profil",
            "it": "Immagine del profilo",
        },
        "changeAvatar": {
            "en": "Change photo",
            "es": "Cambiar foto",
            "fr": "Changer la photo",
            "it": "Cambia foto",
        },
        "uploadAvatar": {
            "en": "Upload photo",
            "es": "Subir foto",
            "fr": "Télécharger une photo",
            "it": "Carica foto",
        },
        "uploadingAvatar": {
            "en": "Uploading…",
            "es": "Subiendo…",
            "fr": "Téléchargement…",
            "it": "Caricamento…",
        },
        "avatarError": {
            "en": "Could not upload that image. Try a different one.",
            "es": "No se pudo subir esa imagen. Prueba con otra.",
            "fr": "Impossible de télécharger cette image. Essayez-en une autre.",
            "it": "Impossibile caricare quell'immagine. Prova con un'altra.",
        },
        "editTitle": {
            "en": "Edit profile",
            "es": "Editar perfil",
            "fr": "Modifier le profil",
            "it": "Modifica profilo",
        },
        "displayNameLabel": {
            "en": "Display name",
            "es": "Nombre para mostrar",
            "fr": "Nom affiché",
            "it": "Nome visualizzato",
        },
        "displayNameHint": {
            "en": "This is shown on your sightings instead of your username.",
            "es": "Esto se muestra en tus avistamientos en lugar de tu nombre de usuario.",
            "fr": "Ceci est affiché sur vos observations à la place de votre nom d'utilisateur.",
            "it": "Questo viene mostrato nei tuoi avvistamenti al posto del tuo nome utente.",
        },
        "saveButton": {
            "en": "Save changes",
            "es": "Guardar cambios",
            "fr": "Enregistrer les modifications",
            "it": "Salva modifiche",
        },
        "saving": {
            "en": "Saving…",
            "es": "Guardando…",
            "fr": "Enregistrement…",
            "it": "Salvataggio…",
        },
        "saveSuccess": {
            "en": "Profile updated!",
            "es": "¡Perfil actualizado!",
            "fr": "Profil mis à jour !",
            "it": "Profilo aggiornato!",
        },
        "editProfileLink": {
            "en": "Edit profile",
            "es": "Editar perfil",
            "fr": "Modifier le profil",
            "it": "Modifica profilo",
        },
    },
    "productSightings": {
        "backToProducts": {
            "en": "Back to products",
            "es": "Volver a productos",
            "fr": "Retour aux produits",
            "it": "Torna ai prodotti",
        },
        "empty": {
            "en": "No sightings reported for this product yet.",
            "es": "Aún no hay avistamientos reportados para este producto.",
            "fr": "Aucune observation signalée pour ce produit pour l'instant.",
            "it": "Ancora nessun avvistamento segnalato per questo prodotto.",
        },
    },
    "brandsPage": {
        "title": {
            "en": "Brands",
            "es": "Marcas",
            "fr": "Marques",
            "it": "Marchi",
        },
        "searchPlaceholder": {
            "en": "Search brands…",
            "es": "Buscar marcas…",
            "fr": "Rechercher des marques…",
            "it": "Cerca marchi…",
        },
        "noResults": {
            "en": "No brands found.",
            "es": "No se encontraron marcas.",
            "fr": "Aucune marque trouvée.",
            "it": "Nessun marchio trovato.",
        },
    },
    "errors": {
        "notFoundTitle": {
            "en": "Page not found",
            "es": "Página no encontrada",
            "fr": "Page introuvable",
            "it": "Pagina non trovata",
        },
        "notFoundBody": {
            "en": "The page you're looking for doesn't exist or may have been moved.",
            "es": "La página que buscas no existe o pudo haber sido movida.",
            "fr": "La page que vous recherchez n'existe pas ou a peut-être été déplacée.",
            "it": "La pagina che cerchi non esiste o potrebbe essere stata spostata.",
        },
        "genericErrorTitle": {
            "en": "Something went wrong",
            "es": "Algo salió mal",
            "fr": "Une erreur s'est produite",
            "it": "Qualcosa è andato storto",
        },
        "genericErrorBody": {
            "en": "An unexpected error occurred. Please try again.",
            "es": "Ocurrió un error inesperado. Por favor intenta de nuevo.",
            "fr": "Une erreur inattendue s'est produite. Veuillez réessayer.",
            "it": "Si è verificato un errore imprevisto. Riprova.",
        },
        "tryAgain": {
            "en": "Try again",
            "es": "Intentar de nuevo",
            "fr": "Réessayer",
            "it": "Riprova",
        },
        "backHome": {
            "en": "Back to home",
            "es": "Volver al inicio",
            "fr": "Retour à l'accueil",
            "it": "Torna alla home",
        },
        "loading": {
            "en": "Loading…",
            "es": "Cargando…",
            "fr": "Chargement…",
            "it": "Caricamento…",
        },
    },
    "favoritesPage": {
        "title": {
            "en": "My Favorites",
            "es": "Mis favoritos",
            "fr": "Mes favoris",
            "it": "I miei preferiti",
        },
        "empty": {
            "en": "You haven't favorited anything yet. Browse airports, products, or brands and tap the star to save them here.",
            "es": "Aún no has marcado nada como favorito. Explora aeropuertos, productos o marcas y toca la estrella para guardarlos aquí.",
            "fr": "Vous n'avez encore rien ajouté aux favoris. Parcourez les aéroports, produits ou marques et appuyez sur l'étoile pour les enregistrer ici.",
            "it": "Non hai ancora aggiunto nulla ai preferiti. Sfoglia aeroporti, prodotti o marchi e tocca la stella per salvarli qui.",
        },
    },
    "locations": {
        "Izmir": {"en": "Izmir", "es": "Esmirna", "fr": "Izmir", "it": "Smirne"},
        "Luxembourg": {"en": "Luxembourg", "es": "Luxemburgo", "fr": "Luxembourg", "it": "Lussemburgo"},
        "Riyadh": {"en": "Riyadh", "es": "Riad", "fr": "Riyad", "it": "Riyadh"},
        "Cairo": {"en": "Cairo", "es": "El Cairo", "fr": "Le Caire", "it": "Il Cairo"},
        "Tuxtla Gutierrez": {"en": "Tuxtla Gutierrez", "es": "Tuxtla Gutiérrez", "fr": "Tuxtla Gutiérrez", "it": "Tuxtla Gutiérrez"},
        "Panama City": {"en": "Panama City", "es": "Ciudad de Panamá", "fr": "Panama", "it": "Città di Panama"},
        "Singapore": {"en": "Singapore", "es": "Singapur", "fr": "Singapour", "it": "Singapore"},
        "Hanoi": {"en": "Hanoi", "es": "Hanói", "fr": "Hanoï", "it": "Hanoi"},
        "Belgrade": {"en": "Belgrade", "es": "Belgrado", "fr": "Belgrade", "it": "Belgrado"},
        "Manila": {"en": "Manila", "es": "Manila", "fr": "Manille", "it": "Manila"},
        "Addis Ababa": {"en": "Addis Ababa", "es": "Adís Abeba", "fr": "Addis-Abeba", "it": "Addis Abeba"},
        "Kuwait City": {"en": "Kuwait City", "es": "Ciudad de Kuwait", "fr": "Koweït", "it": "Città del Kuwait"},
        "Montreal": {"en": "Montreal", "es": "Montreal", "fr": "Montréal", "it": "Montreal"},
        "Brussels": {"en": "Brussels", "es": "Bruselas", "fr": "Bruxelles", "it": "Bruxelles"},
        "Zagreb": {"en": "Zagreb", "es": "Zagreb", "fr": "Zagreb", "it": "Zagabria"},
        "Naples": {"en": "Naples", "es": "Nápoles", "fr": "Naples", "it": "Napoli"},
        "Nassau": {"en": "Nassau", "es": "Nasáu", "fr": "Nassau", "it": "Nassau"},
        "Sharm El Sheikh": {"en": "Sharm El Sheikh", "es": "Sharm el-Sheij", "fr": "Charm el-Cheikh", "it": "Sharm el-Sheikh"},
        "Jeddah": {"en": "Jeddah", "es": "Yeda", "fr": "Djeddah", "it": "Gedda"},
        "Tunis": {"en": "Tunis", "es": "Túnez", "fr": "Tunis", "it": "Tunisi"},
        "Stockholm": {"en": "Stockholm", "es": "Estocolmo", "fr": "Stockholm", "it": "Stoccolma"},
        "Edinburgh": {"en": "Edinburgh", "es": "Edimburgo", "fr": "Édimbourg", "it": "Edimburgo"},
        "Torreon": {"en": "Torreon", "es": "Torreón", "fr": "Torreón", "it": "Torreón"},
        "Rhodes": {"en": "Rhodes", "es": "Rodas", "fr": "Rhodes", "it": "Rodi"},
        "Cape Town": {"en": "Cape Town", "es": "Ciudad del Cabo", "fr": "Le Cap", "it": "Città del Capo"},
        "Palma de Mallorca": {"en": "Palma de Mallorca", "es": "Palma de Mallorca", "fr": "Palma de Majorque", "it": "Palma di Maiorca"},
        "Muscat": {"en": "Muscat", "es": "Mascate", "fr": "Mascate", "it": "Muscat"},
        "Copenhagen": {"en": "Copenhagen", "es": "Copenhague", "fr": "Copenhague", "it": "Copenaghen"},
        "Frankfurt": {"en": "Frankfurt", "es": "Fráncfort", "fr": "Francfort", "it": "Francoforte"},
        "San Jose": {"en": "San Jose", "es": "San José", "fr": "San José", "it": "San José"},
        "Rio de Janeiro": {"en": "Rio de Janeiro", "es": "Río de Janeiro", "fr": "Rio de Janeiro", "it": "Rio de Janeiro"},
        "Larnaca": {"en": "Larnaca", "es": "Lárnaca", "fr": "Larnaca", "it": "Larnaca"},
        "New York": {"en": "New York", "es": "Nueva York", "fr": "New York", "it": "New York"},
        "Ljubljana": {"en": "Ljubljana", "es": "Liubliana", "fr": "Ljubljana", "it": "Lubiana"},
        "Guatemala City": {"en": "Guatemala City", "es": "Ciudad de Guatemala", "fr": "Guatemala", "it": "Città del Guatemala"},
        "Florianopolis": {"en": "Florianopolis", "es": "Florianópolis", "fr": "Florianópolis", "it": "Florianópolis"},
        "Reykjavik": {"en": "Reykjavik", "es": "Reikiavik", "fr": "Reykjavik", "it": "Reykjavík"},
        "Krakow": {"en": "Krakow", "es": "Cracovia", "fr": "Cracovie", "it": "Cracovia"},
        "Amsterdam": {"en": "Amsterdam", "es": "Ámsterdam", "fr": "Amsterdam", "it": "Amsterdam"},
        "Kolkata": {"en": "Kolkata", "es": "Calcuta", "fr": "Calcutta", "it": "Calcutta"},
        "Bogota": {"en": "Bogota", "es": "Bogotá", "fr": "Bogota", "it": "Bogotá"},
        "Dublin": {"en": "Dublin", "es": "Dublín", "fr": "Dublin", "it": "Dublino"},
        "San Luis Potosi": {"en": "San Luis Potosi", "es": "San Luis Potosí", "fr": "San Luis Potosí", "it": "San Luis Potosí"},
        "Venice": {"en": "Venice", "es": "Venecia", "fr": "Venise", "it": "Venezia"},
        "Taipei": {"en": "Taipei", "es": "Taipéi", "fr": "Taipei", "it": "Taipei"},
        "Split": {"en": "Split", "es": "Split", "fr": "Split", "it": "Spalato"},
        "Porto": {"en": "Porto", "es": "Oporto", "fr": "Porto", "it": "Porto"},
        "Sydney": {"en": "Sydney", "es": "Sídney", "fr": "Sydney", "it": "Sydney"},
        "Vilnius": {"en": "Vilnius", "es": "Vilna", "fr": "Vilnius", "it": "Vilnius"},
        "Tbilisi": {"en": "Tbilisi", "es": "Tiflis", "fr": "Tbilissi", "it": "Tbilisi"},
        "Thessaloniki": {"en": "Thessaloniki", "es": "Tesalónica", "fr": "Thessalonique", "it": "Salonicco"},
        "Amman": {"en": "Amman", "es": "Ammán", "fr": "Amman", "it": "Amman"},
        "Vienna": {"en": "Vienna", "es": "Viena", "fr": "Vienne", "it": "Vienna"},
        "Rome": {"en": "Rome", "es": "Roma", "fr": "Rome", "it": "Roma"},
        "St Louis": {"en": "St. Louis", "es": "San Luis", "fr": "Saint-Louis", "it": "St. Louis"},
        "Leon": {"en": "Leon", "es": "León", "fr": "León", "it": "León"},
        "Gdansk": {"en": "Gdansk", "es": "Gdansk", "fr": "Gdansk", "it": "Danzica"},
        "Bucharest": {"en": "Bucharest", "es": "Bucarest", "fr": "Bucarest", "it": "Bucarest"},
        "Medina": {"en": "Medina", "es": "Medina", "fr": "Médine", "it": "Medina"},
        "Cancun": {"en": "Cancun", "es": "Cancún", "fr": "Cancún", "it": "Cancún"},
        "Sofia": {"en": "Sofia", "es": "Sofía", "fr": "Sofia", "it": "Sofia"},
        "Ciudad Juarez": {"en": "Ciudad Juarez", "es": "Ciudad Juárez", "fr": "Ciudad Juárez", "it": "Ciudad Juárez"},
        "Lisbon": {"en": "Lisbon", "es": "Lisboa", "fr": "Lisbonne", "it": "Lisbona"},
        "Merida": {"en": "Merida", "es": "Mérida", "fr": "Mérida", "it": "Mérida"},
        "Beirut": {"en": "Beirut", "es": "Beirut", "fr": "Beyrouth", "it": "Beirut"},
        "Hurghada": {"en": "Hurghada", "es": "Hurgada", "fr": "Hurghada", "it": "Hurghada"},
        "Sao Paulo": {"en": "Sao Paulo", "es": "São Paulo", "fr": "São Paulo", "it": "San Paolo"},
        "Malaga": {"en": "Malaga", "es": "Málaga", "fr": "Malaga", "it": "Malaga"},
        "Corfu": {"en": "Corfu", "es": "Corfú", "fr": "Corfou", "it": "Corfù"},
        "Guangzhou": {"en": "Guangzhou", "es": "Cantón", "fr": "Canton", "it": "Canton"},
        "Abu Dhabi": {"en": "Abu Dhabi", "es": "Abu Dabi", "fr": "Abou Dabi", "it": "Abu Dhabi"},
        "Shanghai": {"en": "Shanghai", "es": "Shanghái", "fr": "Shanghai", "it": "Shanghai"},
        "Milan": {"en": "Milan", "es": "Milán", "fr": "Milan", "it": "Milano"},
        "Mumbai": {"en": "Mumbai", "es": "Bombay", "fr": "Bombay", "it": "Mumbai"},
        "Queretaro": {"en": "Queretaro", "es": "Querétaro", "fr": "Querétaro", "it": "Querétaro"},
        "Adelaide": {"en": "Adelaide", "es": "Adelaida", "fr": "Adélaïde", "it": "Adelaide"},
        "Los Angeles": {"en": "Los Angeles", "es": "Los Ángeles", "fr": "Los Angeles", "it": "Los Angeles"},
        "Tehran": {"en": "Tehran", "es": "Teherán", "fr": "Téhéran", "it": "Teheran"},
        "Istanbul": {"en": "Istanbul", "es": "Estambul", "fr": "Istanbul", "it": "Istanbul"},
        "Johannesburg": {"en": "Johannesburg", "es": "Johannesburgo", "fr": "Johannesburg", "it": "Johannesburg"},
        "Mexico City": {"en": "Mexico City", "es": "Ciudad de México", "fr": "Mexico", "it": "Città del Messico"},
        "Paris": {"en": "Paris", "es": "París", "fr": "Paris", "it": "Parigi"},
        "Tokyo": {"en": "Tokyo", "es": "Tokio", "fr": "Tokyo", "it": "Tokio"},
        "Asuncion": {"en": "Asuncion", "es": "Asunción", "fr": "Asunción", "it": "Asunción"},
        "Skopje": {"en": "Skopje", "es": "Skopie", "fr": "Skopje", "it": "Skopje"},
        "Tallinn": {"en": "Tallinn", "es": "Tallin", "fr": "Tallinn", "it": "Tallinn"},
        "Detroit": {"en": "Detroit", "es": "Detroit", "fr": "Détroit", "it": "Detroit"},
        "Cebu": {"en": "Cebu", "es": "Cebú", "fr": "Cebu", "it": "Cebu"},
        "Bengaluru": {"en": "Bengaluru", "es": "Bengaluru", "fr": "Bangalore", "it": "Bangalore"},
        "Manchester": {"en": "Manchester", "es": "Mánchester", "fr": "Manchester", "it": "Manchester"},
        "Mazatlan": {"en": "Mazatlan", "es": "Mazatlán", "fr": "Mazatlán", "it": "Mazatlán"},
        "Marrakesh": {"en": "Marrakesh", "es": "Marrakech", "fr": "Marrakech", "it": "Marrakech"},
        "New Delhi": {"en": "New Delhi", "es": "Nueva Delhi", "fr": "New Delhi", "it": "Nuova Delhi"},
        "Dubai": {"en": "Dubai", "es": "Dubái", "fr": "Dubaï", "it": "Dubai"},
        "Beijing": {"en": "Beijing", "es": "Pekín", "fr": "Pékin", "it": "Pechino"},
        "Geneva": {"en": "Geneva", "es": "Ginebra", "fr": "Genève", "it": "Ginevra"},
        "Prague": {"en": "Prague", "es": "Praga", "fr": "Prague", "it": "Praga"},
        "Baltimore": {"en": "Baltimore", "es": "Baltimore", "fr": "Baltimore", "it": "Baltimora"},
        "Munich": {"en": "Munich", "es": "Múnich", "fr": "Munich", "it": "Monaco di Baviera"},
        "Zurich": {"en": "Zurich", "es": "Zúrich", "fr": "Zurich", "it": "Zurigo"},
        "Ho Chi Minh City": {"en": "Ho Chi Minh City", "es": "Ciudad Ho Chi Minh", "fr": "Hô Chi Minh-Ville", "it": "Ho Chi Minh"},
        "Quebec City": {"en": "Quebec City", "es": "Ciudad de Quebec", "fr": "Québec", "it": "Québec"},
        "Seoul": {"en": "Seoul", "es": "Seúl", "fr": "Séoul", "it": "Seul"},
    },
    "countries": {
        "BE": {"en": "Belgium", "es": "Bélgica", "fr": "Belgique", "it": "Belgio"},
        "CO": {"en": "Colombia", "es": "Colombia", "fr": "Colombie", "it": "Colombia"},
        "GT": {"en": "Guatemala", "es": "Guatemala", "fr": "Guatemala", "it": "Guatemala"},
        "DK": {"en": "Denmark", "es": "Dinamarca", "fr": "Danemark", "it": "Danimarca"},
        "PE": {"en": "Peru", "es": "Perú", "fr": "Pérou", "it": "Perù"},
        "PY": {"en": "Paraguay", "es": "Paraguay", "fr": "Paraguay", "it": "Paraguay"},
        "SV": {"en": "El Salvador", "es": "El Salvador", "fr": "Salvador", "it": "El Salvador"},
        "SG": {"en": "Singapore", "es": "Singapur", "fr": "Singapour", "it": "Singapore"},
        "SI": {"en": "Slovenia", "es": "Eslovenia", "fr": "Slovénie", "it": "Slovenia"},
        "CZ": {"en": "Czech Republic", "es": "República Checa", "fr": "République tchèque", "it": "Repubblica Ceca"},
        "US": {"en": "United States", "es": "Estados Unidos", "fr": "États-Unis", "it": "Stati Uniti"},
        "KE": {"en": "Kenya", "es": "Kenia", "fr": "Kenya", "it": "Kenya"},
        "KR": {"en": "South Korea", "es": "Corea del Sur", "fr": "Corée du Sud", "it": "Corea del Sud"},
        "JP": {"en": "Japan", "es": "Japón", "fr": "Japon", "it": "Giappone"},
        "BS": {"en": "Bahamas", "es": "Bahamas", "fr": "Bahamas", "it": "Bahamas"},
        "NZ": {"en": "New Zealand", "es": "Nueva Zelanda", "fr": "Nouvelle-Zélande", "it": "Nuova Zelanda"},
        "GU": {"en": "Guam", "es": "Guam", "fr": "Guam", "it": "Guam"},
        "AE": {"en": "United Arab Emirates", "es": "Emiratos Árabes Unidos", "fr": "Émirats arabes unis", "it": "Emirati Arabi Uniti"},
        "UY": {"en": "Uruguay", "es": "Uruguay", "fr": "Uruguay", "it": "Uruguay"},
        "HN": {"en": "Honduras", "es": "Honduras", "fr": "Honduras", "it": "Honduras"},
        "IQ": {"en": "Iraq", "es": "Irak", "fr": "Irak", "it": "Iraq"},
        "IR": {"en": "Iran", "es": "Irán", "fr": "Iran", "it": "Iran"},
        "AU": {"en": "Australia", "es": "Australia", "fr": "Australie", "it": "Australia"},
        "CL": {"en": "Chile", "es": "Chile", "fr": "Chili", "it": "Cile"},
        "NL": {"en": "Netherlands", "es": "Países Bajos", "fr": "Pays-Bas", "it": "Paesi Bassi"},
        "QA": {"en": "Qatar", "es": "Catar", "fr": "Qatar", "it": "Qatar"},
        "CN": {"en": "China", "es": "China", "fr": "Chine", "it": "Cina"},
        "IN": {"en": "India", "es": "India", "fr": "Inde", "it": "India"},
        "GE": {"en": "Georgia", "es": "Georgia", "fr": "Géorgie", "it": "Georgia"},
        "EE": {"en": "Estonia", "es": "Estonia", "fr": "Estonie", "it": "Estonia"},
        "AT": {"en": "Austria", "es": "Austria", "fr": "Autriche", "it": "Austria"},
        "VN": {"en": "Vietnam", "es": "Vietnam", "fr": "Viêt Nam", "it": "Vietnam"},
        "KW": {"en": "Kuwait", "es": "Kuwait", "fr": "Koweït", "it": "Kuwait"},
        "ME": {"en": "Montenegro", "es": "Montenegro", "fr": "Monténégro", "it": "Montenegro"},
        "AR": {"en": "Argentina", "es": "Argentina", "fr": "Argentine", "it": "Argentina"},
        "ET": {"en": "Ethiopia", "es": "Etiopía", "fr": "Éthiopie", "it": "Etiopia"},
        "BR": {"en": "Brazil", "es": "Brasil", "fr": "Brésil", "it": "Brasile"},
        "PL": {"en": "Poland", "es": "Polonia", "fr": "Pologne", "it": "Polonia"},
        "MY": {"en": "Malaysia", "es": "Malasia", "fr": "Malaisie", "it": "Malesia"},
        "HK": {"en": "Hong Kong", "es": "Hong Kong", "fr": "Hong Kong", "it": "Hong Kong"},
        "SE": {"en": "Sweden", "es": "Suecia", "fr": "Suède", "it": "Svezia"},
        "EG": {"en": "Egypt", "es": "Egipto", "fr": "Égypte", "it": "Egitto"},
        "CH": {"en": "Switzerland", "es": "Suiza", "fr": "Suisse", "it": "Svizzera"},
        "AW": {"en": "Aruba", "es": "Aruba", "fr": "Aruba", "it": "Aruba"},
        "SA": {"en": "Saudi Arabia", "es": "Arabia Saudita", "fr": "Arabie saoudite", "it": "Arabia Saudita"},
        "DE": {"en": "Germany", "es": "Alemania", "fr": "Allemagne", "it": "Germania"},
        "TW": {"en": "Taiwan", "es": "Taiwán", "fr": "Taïwan", "it": "Taiwan"},
        "BO": {"en": "Bolivia", "es": "Bolivia", "fr": "Bolivie", "it": "Bolivia"},
        "LU": {"en": "Luxembourg", "es": "Luxemburgo", "fr": "Luxembourg", "it": "Lussemburgo"},
        "CA": {"en": "Canada", "es": "Canadá", "fr": "Canada", "it": "Canada"},
        "LT": {"en": "Lithuania", "es": "Lituania", "fr": "Lituanie", "it": "Lituania"},
        "JM": {"en": "Jamaica", "es": "Jamaica", "fr": "Jamaïque", "it": "Giamaica"},
        "FR": {"en": "France", "es": "Francia", "fr": "France", "it": "Francia"},
        "FJ": {"en": "Fiji", "es": "Fiyi", "fr": "Fidji", "it": "Figi"},
        "CY": {"en": "Cyprus", "es": "Chipre", "fr": "Chypre", "it": "Cipro"},
        "LV": {"en": "Latvia", "es": "Letonia", "fr": "Lettonie", "it": "Lettonia"},
        "PG": {"en": "Papua New Guinea", "es": "Papúa Nueva Guinea", "fr": "Papouasie-Nouvelle-Guinée", "it": "Papua Nuova Guinea"},
        "PF": {"en": "French Polynesia", "es": "Polinesia Francesa", "fr": "Polynésie française", "it": "Polinesia Francese"},
        "MX": {"en": "Mexico", "es": "México", "fr": "Mexique", "it": "Messico"},
        "RO": {"en": "Romania", "es": "Rumanía", "fr": "Roumanie", "it": "Romania"},
        "CW": {"en": "Curacao", "es": "Curazao", "fr": "Curaçao", "it": "Curaçao"},
        "HU": {"en": "Hungary", "es": "Hungría", "fr": "Hongrie", "it": "Ungheria"},
        "FI": {"en": "Finland", "es": "Finlandia", "fr": "Finlande", "it": "Finlandia"},
        "PH": {"en": "Philippines", "es": "Filipinas", "fr": "Philippines", "it": "Filippine"},
        "RS": {"en": "Serbia", "es": "Serbia", "fr": "Serbie", "it": "Serbia"},
        "EC": {"en": "Ecuador", "es": "Ecuador", "fr": "Équateur", "it": "Ecuador"},
        "IE": {"en": "Ireland", "es": "Irlanda", "fr": "Irlande", "it": "Irlanda"},
        "ID": {"en": "Indonesia", "es": "Indonesia", "fr": "Indonésie", "it": "Indonesia"},
        "OM": {"en": "Oman", "es": "Omán", "fr": "Oman", "it": "Oman"},
        "WS": {"en": "Samoa", "es": "Samoa", "fr": "Samoa", "it": "Samoa"},
        "LB": {"en": "Lebanon", "es": "Líbano", "fr": "Liban", "it": "Libano"},
        "SX": {"en": "Sint Maarten", "es": "Sint Maarten", "fr": "Sint Maarten", "it": "Sint Maarten"},
        "PA": {"en": "Panama", "es": "Panamá", "fr": "Panama", "it": "Panama"},
        "ZA": {"en": "South Africa", "es": "Sudáfrica", "fr": "Afrique du Sud", "it": "Sudafrica"},
        "DO": {"en": "Dominican Republic", "es": "República Dominicana", "fr": "République dominicaine", "it": "Repubblica Dominicana"},
        "PT": {"en": "Portugal", "es": "Portugal", "fr": "Portugal", "it": "Portogallo"},
        "ES": {"en": "Spain", "es": "España", "fr": "Espagne", "it": "Spagna"},
        "NO": {"en": "Norway", "es": "Noruega", "fr": "Norvège", "it": "Norvegia"},
        "IL": {"en": "Israel", "es": "Israel", "fr": "Israël", "it": "Israele"},
        "BA": {"en": "Bosnia and Herzegovina", "es": "Bosnia y Herzegovina", "fr": "Bosnie-Herzégovine", "it": "Bosnia ed Erzegovina"},
        "TH": {"en": "Thailand", "es": "Tailandia", "fr": "Thaïlande", "it": "Tailandia"},
        "JO": {"en": "Jordan", "es": "Jordania", "fr": "Jordanie", "it": "Giordania"},
        "TN": {"en": "Tunisia", "es": "Túnez", "fr": "Tunisie", "it": "Tunisia"},
        "IT": {"en": "Italy", "es": "Italia", "fr": "Italie", "it": "Italia"},
        "BG": {"en": "Bulgaria", "es": "Bulgaria", "fr": "Bulgarie", "it": "Bulgaria"},
        "GB": {"en": "United Kingdom", "es": "Reino Unido", "fr": "Royaume-Uni", "it": "Regno Unito"},
        "IS": {"en": "Iceland", "es": "Islandia", "fr": "Islande", "it": "Islanda"},
        "BH": {"en": "Bahrain", "es": "Baréin", "fr": "Bahreïn", "it": "Bahrein"},
        "TR": {"en": "Turkey", "es": "Turquía", "fr": "Turquie", "it": "Turchia"},
        "CR": {"en": "Costa Rica", "es": "Costa Rica", "fr": "Costa Rica", "it": "Costa Rica"},
        "MA": {"en": "Morocco", "es": "Marruecos", "fr": "Maroc", "it": "Marocco"},
        "AL": {"en": "Albania", "es": "Albania", "fr": "Albanie", "it": "Albania"},
        "HR": {"en": "Croatia", "es": "Croacia", "fr": "Croatie", "it": "Croazia"},
        "MK": {"en": "North Macedonia", "es": "Macedonia del Norte", "fr": "Macédoine du Nord", "it": "Macedonia del Nord"},
        "GR": {"en": "Greece", "es": "Grecia", "fr": "Grèce", "it": "Grecia"},
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