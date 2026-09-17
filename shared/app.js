/* wl-engine-site — shared app helpers: partner resolution, i18n, API client, GIS init */
(function (global) {
  'use strict';

  // ---------- language ----------
  var LANGS = ['fr', 'en', 'es'];

  function getLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (LANGS.indexOf(q) !== -1) {
      try { localStorage.setItem('wl_lang', q); } catch (e) {}
      return q;
    }
    try {
      var stored = localStorage.getItem('wl_lang');
      if (LANGS.indexOf(stored) !== -1) return stored;
    } catch (e) {}
    return 'fr';
  }

  var DICT = {
    fr: {
      trimmed_for_budget_msg: 'Retirés pour respecter votre budget : {items}',
      email_signin_title: 'Connexion par courriel',
      email_signin_hint: 'Pas de mot de passe : on vous envoie un code à 6 chiffres.',
      email_label: 'Votre courriel',
      send_code: 'Recevoir mon code',
      code_sent: 'Code envoyé à {email}. Il est valide 15 minutes (vérifiez aussi les indésirables).',
      otp_code_label: 'Code à 6 chiffres',
      verify_code: 'Se connecter',
      code_invalid: 'Code invalide ou expiré. Demandez un nouveau code.',
      code_wait: 'Un code vient d’être envoyé. Attendez une minute avant d’en demander un autre.',
      email_invalid: 'Courriel invalide.',
      use_other_email: 'Changer de courriel',
      or_label: 'ou',
      location_title: '1. Où faites-vous votre épicerie ?',
      location_why: 'Votre position sert à trouver les circulaires de cette semaine et la succursale la plus proche de chaque magasin, avec la distance. On garde seulement votre code postal, jamais votre position exacte.',
      use_my_location: 'Utiliser ma position',
      locating: 'Recherche de votre position...',
      location_denied: 'Position refusée ou indisponible. Entrez votre code postal.',
      location_found: 'Position trouvée : {place}',
      city_label: 'Ville',
      check_stores: 'Voir les magasins près de chez moi',
      nearby_title: 'Magasins avec circulaires près de chez vous',
      nearby_loading: 'Lecture des circulaires de la semaine près de chez vous (jusqu’à 20 secondes)...',
      nearby_none: 'Aucune circulaire trouvée pour ce code postal : les prix seront estimés.',
      nearby_items: '{n} produits en circulaire',
      km_away: 'à {km} km',
      household_title: '2. Votre ménage et votre budget',
      adults_label: 'Adultes',
      children_label: 'Enfants',
      budget_hint: 'Pour tout le ménage, par semaine.',
      max_stores_label: 'Nombre maximum de magasins à visiter',
      stops_auto: 'Automatique (selon le budget)',
      diet_title: '3. Allergies et régime',
      allergies_label: 'Allergies — jamais dans le panier ni dans les repas',
      allergies_other_label: 'Autre allergie ou aliment à éviter (facultatif)',
      allergies_other_placeholder: 'ex. kiwi, coriandre',
      diet_label: 'Régime alimentaire (facultatif)',
      allergy_peanuts: 'Arachides',
      allergy_tree_nuts: 'Noix',
      allergy_milk: 'Lait et produits laitiers',
      allergy_eggs: 'Œufs',
      allergy_wheat_gluten: 'Blé et gluten',
      allergy_soy: 'Soya',
      allergy_fish: 'Poisson',
      allergy_shellfish: 'Fruits de mer',
      allergy_sesame: 'Sésame',
      allergy_mustard: 'Moutarde',
      allergy_sulphites: 'Sulfites',
      diet_vegetarian: 'Végétarien',
      diet_vegan: 'Végétalien',
      diet_pescatarian: 'Pescétarien',
      diet_halal: 'Halal',
      diet_kosher: 'Casher',
      diet_lactose_free: 'Sans lactose',
      diet_gluten_free: 'Sans gluten',
      diet_low_sodium: 'Moins de sel',
      diet_less_sugar: 'Moins de sucre',
      goals_wellness_label: 'Ce qui compte pour vous (facultatif)',
      goals_wellness_placeholder: 'ex. plus de protéines pour mes entraînements, des lunchs faciles pour les enfants',
      tastes_label: 'Goûts et habitudes (facultatif)',
      tastes_placeholder: 'ex. on n’aime pas le poisson, soupers prêts en 30 minutes',
      privacy_note_panier: 'Vos allergies et préférences servent seulement à bâtir votre panier et à préremplir le formulaire la prochaine fois. Recommandation d’IA, pas un avis professionnel : vérifiez toujours l’étiquette des produits.',
      removed_for_safety_msg: 'Retirés par sécurité (allergies ou régime) : {items}',
      result_summary: 'Total {total} · {stops} magasin(s)',
      training_location_label: 'Où vous entraînez-vous ?',
      place_gym: 'Au gym',
      place_home_equipment: 'À la maison, avec haltères ou élastiques',
      place_home_none: 'À la maison, sans équipement',
      place_outdoor: 'Dehors (parc, course)',
      level_label: 'Niveau',
      level_beginner: 'Débutant ou retour après une pause',
      level_intermediate: 'Intermédiaire (6 mois et plus)',
      level_advanced: 'Avancé (plusieurs années)',
      goal_flexibility: 'Flexibilité et mobilité',
      goal_general_health: 'Forme générale',
      injuries_title: 'Blessures ou douleurs à ménager (facultatif)',
      injury_zone_label: 'Zone',
      injury_severity_label: 'Intensité',
      severity_mild: 'Légère',
      severity_moderate: 'Modérée',
      severity_severe: 'Importante',
      injury_desc_placeholder: 'ex. entorse en 2024, douleur dans les escaliers',
      add_injury: '+ Ajouter une blessure',
      remove_label: 'Retirer',
      zone_neck: 'Cou',
      zone_left_shoulder: 'Épaule gauche',
      zone_right_shoulder: 'Épaule droite',
      zone_upper_back: 'Haut du dos',
      zone_lower_back: 'Bas du dos',
      zone_left_hip: 'Hanche gauche',
      zone_right_hip: 'Hanche droite',
      zone_left_knee: 'Genou gauche',
      zone_right_knee: 'Genou droit',
      zone_left_ankle: 'Cheville gauche',
      zone_right_ankle: 'Cheville droite',
      zone_left_wrist: 'Poignet gauche',
      zone_right_wrist: 'Poignet droit',
      zone_left_elbow: 'Coude gauche',
      zone_right_elbow: 'Coude droit',
      zone_chest: 'Poitrine',
      zone_abdomen: 'Abdomen',
      zone_other: 'Autre',
      nearest_gym_placeholder: 'ex. le gym de mon quartier (facultatif)',
      coach_location_why: 'Votre code postal sert à adapter l’épicerie et les prix à votre région.',
      privacy_note_coach: 'Vos réponses servent seulement à bâtir votre plan et à préremplir le formulaire la prochaine fois. Recommandation d’IA, pas un avis médical ni professionnel.',
      how_title: 'Comment ça marche',
      panier_step1: 'Partagez votre position ou votre code postal : on lit les circulaires de la semaine et on trouve la succursale la plus proche de chaque magasin.',
      panier_step2: 'Indiquez votre budget, votre ménage, vos allergies et votre régime. Les allergies ne sont jamais négociables.',
      panier_step3: 'Recevez un PDF : les menus de la semaine, la liste d’épicerie aux prix des circulaires, et le trajet magasin par magasin avec les adresses.',
      coach_step1: 'Vos mesures, votre objectif, votre niveau et où vous vous entraînez : gym, maison ou dehors.',
      coach_step2: 'Vos blessures, allergies et régime sont respectés dans chaque exercice et chaque repas.',
      coach_step3: 'Recevez un PDF : les entraînements de la semaine, vos calories expliquées, les menus et l’épicerie.',
      see_example: 'Voir un exemple de plan (PDF)',
      example_caption_panier: 'Exemple fictif : famille de Rosemont (Montréal), 2 adultes et 1 enfant, 170 $ par semaine, allergie aux arachides.',
      example_caption_coach: 'Exemple fictif : 38 ans, 92 kg, perte de gras, 3 séances à la maison avec haltères, genou gauche fragile.',
      ai_disclaimer: 'Recommandation d’IA, pas un avis professionnel.',
      signin: 'Commencer',
      partners: 'Partenaires',
      home: 'Accueil',
      no_prices: '',
      coach_title: 'Coach',
      coach_desc: 'Plan d’entraînement hebdomadaire personnalisé, livré en PDF.',
      panier_title: 'Panier',
      panier_desc: 'Le panier d’épicerie parfait selon votre budget, livré en PDF.',
      generate_plan: 'Générer mon plan',
      generating: 'Analyse en cours, 30 à 90 secondes...',
      open_pdf: 'Ouvrir le PDF',
      my_plans: 'Mes plans',
      service_unavailable: 'Service temporairement indisponible. Veuillez réessayer plus tard.',
      error_generic: 'Une erreur est survenue. Veuillez réessayer.',
      signed_in_as: 'Connecté en tant que',
      sign_out: 'Déconnexion',
      no_plans_yet: 'Aucun plan généré pour l’instant.',
      billing_portal: 'Facture et paiement',
      your_link: 'Votre lien',
      copy: 'Copier',
      copied: 'Copié !',
      plans_this_month: 'Plans ce mois',
      estimated_amount: 'Montant estimé',
      members: 'Membres',
      recent_generations: 'Générations récentes',
      branding: 'Image de marque',
      save: 'Enregistrer',
      saved: 'Enregistré !',
      admin_login: 'Connexion admin',
      admin_code: 'Code admin',
      invalid_code: 'Code invalide.',
      edit_partner: 'Modifier',
      cancel_edit: 'Annuler',
      partner_label: 'Partenaire',
      new_partner: 'Nouveau partenaire',
      create: 'Créer',
      activate_billing: 'Activer la facturation',
      finance: 'Finances',
      loading: 'À charger...',
      tier_free: 'Gratuit',
      tier_member: 'Membre',
      per_month_plan: '1 plan par mois',
      per_day_plans: '3 plans par jour',
      photo_scan_included: 'Analyse photo incluse',
      no_photo_scan: 'Sans analyse photo',
      history_included: 'Historique complet',
      sponsor_line: 'Offert grâce à un commanditaire',
      start_free: 'Commencer gratuitement',
      become_member: 'Devenir membre',
      sponsors_strip_title: 'Offert grâce à nos commanditaires',
      become_sponsor: 'Devenir commanditaire',
      your_tier: 'Votre forfait',
      plans_remaining_today: 'plans restants aujourd’hui',
      plans_remaining_month: 'plans restants ce mois',
      manage_subscription: 'Gérer mon abonnement',
      upgrade_card_title: 'Passez au forfait Membre',
      upgrade_card_body: 'Plus de plans, analyse photo et historique complet.',
      quota_exceeded_msg: 'Limite atteinte pour votre forfait. Revenez plus tard ou devenez membre.',
      upgrade_required_msg: 'L’analyse photo est réservée aux membres. Devenez membre pour l’utiliser.',
      rate_limited_msg: 'Trop de demandes. Veuillez patienter un instant.',
      checkout_thanks: 'Merci ! Votre abonnement est actif.',
      checkout_activating: 'Paiement reçu, activation en cours...',
      country_label: 'Pays',
      postal_label: 'Code postal',
      sponsor_pitch_title: 'Devenez commanditaire',
      sponsor_pitch_body: '500 $ par mois pour soutenir cette communauté gratuitement pour tous. Votre nom, votre logo et un court message apparaissent auprès de chaque utilisateur du forfait gratuit, et vous recevez un bilan d’impact mensuel.',
      sponsor_pitch_gets_title: 'Ce que vous recevez',
      contact_us: 'Nous joindre',
      current_sponsors: 'Commanditaires actuels',
      sponsors_panel: 'Commanditaires',
      add_sponsor: 'Ajouter un commanditaire',
      sponsor_name: 'Nom',
      sponsor_logo: 'URL du logo',
      sponsor_message: 'Message (120 car. max)',
      sponsor_product: 'Produit',
      sponsor_active: 'Actif',
      sponsor_email: 'Courriel de facturation',
      no_sponsors_yet: 'Aucun commanditaire pour l’instant.',
      sponsor_price_500: '500 $ par mois',
      country_other_hint: 'Pays non listé — nous traiterons votre demande manuellement.',
      sponsor_message_too_long: 'Le message ne doit pas dépasser 120 caractères.',
      profile_saved: 'Profil enregistré',
      diet_restrictions_label: 'Restrictions alimentaires (séparées par des virgules)',
      generate_with_profile: 'Générer avec mon profil',
      height_label: 'Taille (cm)',
      weight_label: 'Poids (kg)',
      age_label: 'Âge',
      gender_label: 'Sexe',
      gender_male: 'Homme',
      gender_female: 'Femme',
      gender_other: 'Autre',
      goal_label: 'Objectif',
      goal_fat_loss: 'Perte de gras',
      goal_muscle_gain: 'Gain musculaire',
      goal_maintenance: 'Maintien',
      days_per_week_label: 'Jours par semaine',
      target_weight_label: 'Poids cible (kg)',
      weekly_food_budget_label: 'Budget épicerie / semaine',
      nearest_gym_label: 'Gym le plus proche',
      injuries_label: 'Blessures (facultatif)',
      injuries_placeholder: 'ex. genou gauche, léger, depuis 2024',
      diet_restrictions_placeholder: 'ex. sans gluten, sans arachides',
      photo_label: 'Photo (facultatif)',
      panier_budget_label: 'Budget / semaine',
      people_label: 'Nombre de personnes',
      goals_label: 'Objectifs santé (facultatif)',
      goals_placeholder: 'ex. moins de sucre, plus de protéines',
      preferences_label: 'Préférences / restrictions (facultatif)',
      preferences_placeholder: 'ex. végétarien, sans gluten, allergies',
      tagline_label: 'Slogan',
      tagline_label_fr: 'Slogan (français)',
      tagline_label_en: 'Slogan (anglais)',
      tagline_label_es: 'Slogan (espagnol)',
      primary_color_label: 'Couleur primaire',
      accent_color_label: 'Couleur accent',
      dark_color_label: 'Couleur foncée',
      partner_type_label: 'Type',
      product_type_both: 'Coach + Panier',
      product_type_coach_only: 'Coach seulement',
      product_type_panier_only: 'Panier seulement',
      demo_label: 'Démo',
      billing_label: 'Facturation',
      code_label: 'Code',
      month_label: 'Mois',
      paid_label: 'Payé',
      active_subscriptions_label: 'Abonnements actifs : ',
      link_colon_label: 'Lien : ',
      embed_snippet_label: "Snippet d'intégration :",
      date_label: 'Date',
    },
    en: {
      trimmed_for_budget_msg: 'Removed to stay within your budget: {items}',
      email_signin_title: 'Sign in with email',
      email_signin_hint: 'No password: we email you a 6-digit code.',
      email_label: 'Your email',
      send_code: 'Send my code',
      code_sent: 'Code sent to {email}. It is valid for 15 minutes (check spam too).',
      otp_code_label: '6-digit code',
      verify_code: 'Sign in',
      code_invalid: 'Invalid or expired code. Ask for a new one.',
      code_wait: 'A code was just sent. Wait a minute before asking again.',
      email_invalid: 'Invalid email.',
      use_other_email: 'Use another email',
      or_label: 'or',
      location_title: '1. Where do you shop?',
      location_why: 'Your location finds this week’s flyers and the closest branch of each store, with the distance. We only keep your postal code, never your exact position.',
      use_my_location: 'Use my location',
      locating: 'Finding your location...',
      location_denied: 'Location denied or unavailable. Enter your postal code.',
      location_found: 'Location found: {place}',
      city_label: 'City',
      check_stores: 'Show stores near me',
      nearby_title: 'Stores with flyers near you',
      nearby_loading: 'Reading this week’s flyers near you (up to 20 seconds)...',
      nearby_none: 'No flyers found for this postal code: prices will be estimated.',
      nearby_items: '{n} flyer items',
      km_away: '{km} km away',
      household_title: '2. Your household and budget',
      adults_label: 'Adults',
      children_label: 'Children',
      budget_hint: 'For the whole household, per week.',
      max_stores_label: 'Maximum number of stores to visit',
      stops_auto: 'Automatic (based on budget)',
      diet_title: '3. Allergies and diet',
      allergies_label: 'Allergies — never in the basket or the meals',
      allergies_other_label: 'Other allergy or food to avoid (optional)',
      allergies_other_placeholder: 'e.g. kiwi, cilantro',
      diet_label: 'Diet (optional)',
      allergy_peanuts: 'Peanuts',
      allergy_tree_nuts: 'Tree nuts',
      allergy_milk: 'Milk and dairy',
      allergy_eggs: 'Eggs',
      allergy_wheat_gluten: 'Wheat and gluten',
      allergy_soy: 'Soy',
      allergy_fish: 'Fish',
      allergy_shellfish: 'Shellfish',
      allergy_sesame: 'Sesame',
      allergy_mustard: 'Mustard',
      allergy_sulphites: 'Sulphites',
      diet_vegetarian: 'Vegetarian',
      diet_vegan: 'Vegan',
      diet_pescatarian: 'Pescatarian',
      diet_halal: 'Halal',
      diet_kosher: 'Kosher',
      diet_lactose_free: 'Lactose-free',
      diet_gluten_free: 'Gluten-free',
      diet_low_sodium: 'Less salt',
      diet_less_sugar: 'Less sugar',
      goals_wellness_label: 'What matters to you (optional)',
      goals_wellness_placeholder: 'e.g. more protein for my workouts, easy lunches for the kids',
      tastes_label: 'Tastes and habits (optional)',
      tastes_placeholder: 'e.g. we don’t like fish, dinners ready in 30 minutes',
      privacy_note_panier: 'Your allergies and preferences are only used to build your basket and prefill the form next time. AI recommendation, not professional advice: always check product labels.',
      removed_for_safety_msg: 'Removed for safety (allergies or diet): {items}',
      result_summary: 'Total {total} · {stops} store(s)',
      training_location_label: 'Where do you train?',
      place_gym: 'At the gym',
      place_home_equipment: 'At home, with dumbbells or bands',
      place_home_none: 'At home, no equipment',
      place_outdoor: 'Outdoors (park, running)',
      level_label: 'Level',
      level_beginner: 'Beginner or coming back',
      level_intermediate: 'Intermediate (6+ months)',
      level_advanced: 'Advanced (several years)',
      goal_flexibility: 'Flexibility and mobility',
      goal_general_health: 'General fitness',
      injuries_title: 'Injuries or pain to work around (optional)',
      injury_zone_label: 'Area',
      injury_severity_label: 'Severity',
      severity_mild: 'Mild',
      severity_moderate: 'Moderate',
      severity_severe: 'Severe',
      injury_desc_placeholder: 'e.g. sprain in 2024, hurts on stairs',
      add_injury: '+ Add an injury',
      remove_label: 'Remove',
      zone_neck: 'Neck',
      zone_left_shoulder: 'Left shoulder',
      zone_right_shoulder: 'Right shoulder',
      zone_upper_back: 'Upper back',
      zone_lower_back: 'Lower back',
      zone_left_hip: 'Left hip',
      zone_right_hip: 'Right hip',
      zone_left_knee: 'Left knee',
      zone_right_knee: 'Right knee',
      zone_left_ankle: 'Left ankle',
      zone_right_ankle: 'Right ankle',
      zone_left_wrist: 'Left wrist',
      zone_right_wrist: 'Right wrist',
      zone_left_elbow: 'Left elbow',
      zone_right_elbow: 'Right elbow',
      zone_chest: 'Chest',
      zone_abdomen: 'Abdomen',
      zone_other: 'Other',
      nearest_gym_placeholder: 'e.g. my neighbourhood gym (optional)',
      coach_location_why: 'Your postal code adapts the groceries and prices to your area.',
      privacy_note_coach: 'Your answers are only used to build your plan and prefill the form next time. AI recommendation, not medical or professional advice.',
      how_title: 'How it works',
      panier_step1: 'Share your location or postal code: we read this week’s flyers and find the closest branch of each store.',
      panier_step2: 'Enter your budget, household, allergies and diet. Allergies are never negotiable.',
      panier_step3: 'Get a PDF: the week’s menus, the grocery list at flyer prices, and the store-by-store route with addresses.',
      coach_step1: 'Your measurements, goal, level and where you train: gym, home or outdoors.',
      coach_step2: 'Your injuries, allergies and diet are respected in every exercise and meal.',
      coach_step3: 'Get a PDF: the week’s workouts, your calories explained, meals and groceries.',
      see_example: 'See an example plan (PDF)',
      example_caption_panier: 'Fictional example: a Rosemont (Montreal) family, 2 adults and 1 child, $170 a week, peanut allergy.',
      example_caption_coach: 'Fictional example: 38 years old, 92 kg, fat loss, 3 home sessions with dumbbells, sensitive left knee.',
      ai_disclaimer: 'AI recommendation, not professional advice.',
      signin: 'Get started',
      partners: 'Partners',
      home: 'Home',
      no_prices: '',
      coach_title: 'Coach',
      coach_desc: 'A personalized weekly training plan, delivered as a PDF.',
      panier_title: 'Panier',
      panier_desc: 'The perfect grocery basket for your budget, delivered as a PDF.',
      generate_plan: 'Generate my plan',
      generating: 'Analyzing, 30 to 90 seconds...',
      open_pdf: 'Open the PDF',
      my_plans: 'My plans',
      service_unavailable: 'Service temporarily unavailable. Please try again later.',
      error_generic: 'Something went wrong. Please try again.',
      signed_in_as: 'Signed in as',
      sign_out: 'Sign out',
      no_plans_yet: 'No plans generated yet.',
      billing_portal: 'Billing and payment',
      your_link: 'Your link',
      copy: 'Copy',
      copied: 'Copied!',
      plans_this_month: 'Plans this month',
      estimated_amount: 'Estimated amount',
      members: 'Members',
      recent_generations: 'Recent generations',
      branding: 'Branding',
      save: 'Save',
      saved: 'Saved!',
      admin_login: 'Admin login',
      admin_code: 'Admin code',
      invalid_code: 'Invalid code.',
      edit_partner: 'Edit',
      cancel_edit: 'Cancel',
      partner_label: 'Partner',
      new_partner: 'New partner',
      create: 'Create',
      activate_billing: 'Activate billing',
      finance: 'Finance',
      loading: 'Loading...',
      tier_free: 'Free',
      tier_member: 'Member',
      per_month_plan: '1 plan per month',
      per_day_plans: '3 plans per day',
      photo_scan_included: 'Photo scan included',
      no_photo_scan: 'No photo scan',
      history_included: 'Full history',
      sponsor_line: 'Made possible by a sponsor',
      start_free: 'Start for free',
      become_member: 'Become a member',
      sponsors_strip_title: 'Made possible by our sponsors',
      become_sponsor: 'Become a sponsor',
      your_tier: 'Your plan',
      plans_remaining_today: 'plans left today',
      plans_remaining_month: 'plans left this month',
      manage_subscription: 'Manage my subscription',
      upgrade_card_title: 'Upgrade to the Member plan',
      upgrade_card_body: 'More plans, photo scan, and full history.',
      quota_exceeded_msg: 'Limit reached for your plan. Come back later or become a member.',
      upgrade_required_msg: 'Photo scan is a member feature. Become a member to use it.',
      rate_limited_msg: 'Too many requests. Please wait a moment.',
      checkout_thanks: 'Thank you! Your subscription is active.',
      checkout_activating: 'Payment received, activating...',
      country_label: 'Country',
      postal_label: 'Postal / ZIP code',
      sponsor_pitch_title: 'Become a sponsor',
      sponsor_pitch_body: '$500 per month to keep this community free for everyone. Your name, logo and a short message appear to every free-tier user, and you get a monthly impact email.',
      sponsor_pitch_gets_title: 'What you get',
      contact_us: 'Contact us',
      current_sponsors: 'Current sponsors',
      sponsors_panel: 'Sponsors',
      add_sponsor: 'Add a sponsor',
      sponsor_name: 'Name',
      sponsor_logo: 'Logo URL',
      sponsor_message: 'Message (120 chars max)',
      sponsor_product: 'Product',
      sponsor_active: 'Active',
      sponsor_email: 'Billing email',
      no_sponsors_yet: 'No sponsors yet.',
      sponsor_price_500: '$500 per month',
      country_other_hint: 'Country not listed — we will handle your request manually.',
      sponsor_message_too_long: 'Message must be at most 120 characters.',
      profile_saved: 'Profile saved',
      diet_restrictions_label: 'Dietary restrictions (comma-separated)',
      generate_with_profile: 'Generate with my profile',
      height_label: 'Height (cm)',
      weight_label: 'Weight (kg)',
      age_label: 'Age',
      gender_label: 'Gender',
      gender_male: 'Male',
      gender_female: 'Female',
      gender_other: 'Other',
      goal_label: 'Goal',
      goal_fat_loss: 'Fat loss',
      goal_muscle_gain: 'Muscle gain',
      goal_maintenance: 'Maintenance',
      days_per_week_label: 'Days per week',
      target_weight_label: 'Target weight (kg)',
      weekly_food_budget_label: 'Grocery budget / week',
      nearest_gym_label: 'Nearest gym',
      injuries_label: 'Injuries (optional)',
      injuries_placeholder: 'e.g. left knee, mild, since 2024',
      diet_restrictions_placeholder: 'e.g. gluten-free, no peanuts',
      photo_label: 'Photo (optional)',
      panier_budget_label: 'Budget / week',
      people_label: 'Number of people',
      goals_label: 'Health goals (optional)',
      goals_placeholder: 'e.g. less sugar, more protein',
      preferences_label: 'Preferences / restrictions (optional)',
      preferences_placeholder: 'e.g. vegetarian, gluten-free, allergies',
      tagline_label: 'Tagline',
      tagline_label_fr: 'Tagline (French)',
      tagline_label_en: 'Tagline (English)',
      tagline_label_es: 'Tagline (Spanish)',
      primary_color_label: 'Primary color',
      accent_color_label: 'Accent color',
      dark_color_label: 'Dark color',
      partner_type_label: 'Type',
      product_type_both: 'Coach + Panier',
      product_type_coach_only: 'Coach only',
      product_type_panier_only: 'Panier only',
      demo_label: 'Demo',
      billing_label: 'Billing',
      code_label: 'Code',
      month_label: 'Month',
      paid_label: 'Paid',
      active_subscriptions_label: 'Active subscriptions: ',
      link_colon_label: 'Link: ',
      embed_snippet_label: 'Embed snippet:',
      date_label: 'Date',
    },
    es: {
      trimmed_for_budget_msg: 'Retirados para respetar tu presupuesto: {items}',
      email_signin_title: 'Acceso por correo',
      email_signin_hint: 'Sin contraseña: te enviamos un código de 6 dígitos.',
      email_label: 'Tu correo',
      send_code: 'Recibir mi código',
      code_sent: 'Código enviado a {email}. Válido 15 minutos (revisa también el spam).',
      otp_code_label: 'Código de 6 dígitos',
      verify_code: 'Entrar',
      code_invalid: 'Código inválido o vencido. Pide uno nuevo.',
      code_wait: 'Acabamos de enviar un código. Espera un minuto.',
      email_invalid: 'Correo no válido.',
      use_other_email: 'Usar otro correo',
      or_label: 'o',
      location_title: '1. ¿Dónde haces tus compras?',
      location_why: 'Tu ubicación sirve para encontrar los folletos de esta semana y la sucursal más cercana de cada tienda. Solo guardamos tu código postal, nunca tu posición exacta.',
      use_my_location: 'Usar mi ubicación',
      locating: 'Buscando tu ubicación...',
      location_denied: 'Ubicación denegada o no disponible. Escribe tu código postal.',
      location_found: 'Ubicación encontrada: {place}',
      city_label: 'Ciudad',
      check_stores: 'Ver tiendas cerca de mí',
      nearby_title: 'Tiendas con folletos cerca de ti',
      nearby_loading: 'Leyendo los folletos de la semana cerca de ti (hasta 20 segundos)...',
      nearby_none: 'No hay folletos para este código postal: los precios serán estimados.',
      nearby_items: '{n} productos en folleto',
      km_away: 'a {km} km',
      household_title: '2. Tu hogar y tu presupuesto',
      adults_label: 'Adultos',
      children_label: 'Niños',
      budget_hint: 'Para todo el hogar, por semana.',
      max_stores_label: 'Número máximo de tiendas',
      stops_auto: 'Automático (según el presupuesto)',
      diet_title: '3. Alergias y dieta',
      allergies_label: 'Alergias — nunca en la canasta ni en las comidas',
      allergies_other_label: 'Otra alergia o alimento a evitar (opcional)',
      allergies_other_placeholder: 'ej. kiwi, cilantro',
      diet_label: 'Dieta (opcional)',
      allergy_peanuts: 'Cacahuetes',
      allergy_tree_nuts: 'Frutos secos',
      allergy_milk: 'Leche y lácteos',
      allergy_eggs: 'Huevos',
      allergy_wheat_gluten: 'Trigo y gluten',
      allergy_soy: 'Soja',
      allergy_fish: 'Pescado',
      allergy_shellfish: 'Mariscos',
      allergy_sesame: 'Sésamo',
      allergy_mustard: 'Mostaza',
      allergy_sulphites: 'Sulfitos',
      diet_vegetarian: 'Vegetariano',
      diet_vegan: 'Vegano',
      diet_pescatarian: 'Pescetariano',
      diet_halal: 'Halal',
      diet_kosher: 'Kosher',
      diet_lactose_free: 'Sin lactosa',
      diet_gluten_free: 'Sin gluten',
      diet_low_sodium: 'Menos sal',
      diet_less_sugar: 'Menos azúcar',
      goals_wellness_label: 'Lo que te importa (opcional)',
      goals_wellness_placeholder: 'ej. más proteína para mis entrenamientos, almuerzos fáciles para los niños',
      tastes_label: 'Gustos y hábitos (opcional)',
      tastes_placeholder: 'ej. no nos gusta el pescado, cenas listas en 30 minutos',
      privacy_note_panier: 'Tus alergias y preferencias solo sirven para armar tu canasta y rellenar el formulario la próxima vez. Recomendación de IA, no consejo profesional: revisa siempre las etiquetas.',
      removed_for_safety_msg: 'Retirados por seguridad (alergias o dieta): {items}',
      result_summary: 'Total {total} · {stops} tienda(s)',
      training_location_label: '¿Dónde entrenas?',
      place_gym: 'En el gimnasio',
      place_home_equipment: 'En casa, con mancuernas o bandas',
      place_home_none: 'En casa, sin equipo',
      place_outdoor: 'Al aire libre (parque, correr)',
      level_label: 'Nivel',
      level_beginner: 'Principiante o retomando',
      level_intermediate: 'Intermedio (6+ meses)',
      level_advanced: 'Avanzado (varios años)',
      goal_flexibility: 'Flexibilidad y movilidad',
      goal_general_health: 'Forma general',
      injuries_title: 'Lesiones o dolores a cuidar (opcional)',
      injury_zone_label: 'Zona',
      injury_severity_label: 'Intensidad',
      severity_mild: 'Leve',
      severity_moderate: 'Moderada',
      severity_severe: 'Fuerte',
      injury_desc_placeholder: 'ej. esguince en 2024, duele en escaleras',
      add_injury: '+ Agregar una lesión',
      remove_label: 'Quitar',
      zone_neck: 'Cuello',
      zone_left_shoulder: 'Hombro izquierdo',
      zone_right_shoulder: 'Hombro derecho',
      zone_upper_back: 'Espalda alta',
      zone_lower_back: 'Espalda baja',
      zone_left_hip: 'Cadera izquierda',
      zone_right_hip: 'Cadera derecha',
      zone_left_knee: 'Rodilla izquierda',
      zone_right_knee: 'Rodilla derecha',
      zone_left_ankle: 'Tobillo izquierdo',
      zone_right_ankle: 'Tobillo derecho',
      zone_left_wrist: 'Muñeca izquierda',
      zone_right_wrist: 'Muñeca derecha',
      zone_left_elbow: 'Codo izquierdo',
      zone_right_elbow: 'Codo derecho',
      zone_chest: 'Pecho',
      zone_abdomen: 'Abdomen',
      zone_other: 'Otra',
      nearest_gym_placeholder: 'ej. el gimnasio de mi barrio (opcional)',
      coach_location_why: 'Tu código postal adapta la compra y los precios a tu zona.',
      privacy_note_coach: 'Tus respuestas solo sirven para armar tu plan y rellenar el formulario la próxima vez. Recomendación de IA, no consejo médico ni profesional.',
      how_title: 'Cómo funciona',
      panier_step1: 'Comparte tu ubicación o código postal: leemos los folletos de la semana y encontramos la sucursal más cercana de cada tienda.',
      panier_step2: 'Indica tu presupuesto, tu hogar, tus alergias y tu dieta. Las alergias nunca se negocian.',
      panier_step3: 'Recibe un PDF: los menús de la semana, la lista de compras a precios de folleto y la ruta tienda por tienda con direcciones.',
      coach_step1: 'Tus medidas, objetivo, nivel y dónde entrenas: gimnasio, casa o al aire libre.',
      coach_step2: 'Tus lesiones, alergias y dieta se respetan en cada ejercicio y comida.',
      coach_step3: 'Recibe un PDF: los entrenamientos de la semana, tus calorías explicadas, menús y compras.',
      see_example: 'Ver un plan de ejemplo (PDF)',
      example_caption_panier: 'Ejemplo ficticio: familia de Rosemont (Montreal), 2 adultos y 1 niño, 170 $ por semana, alergia a los cacahuetes.',
      example_caption_coach: 'Ejemplo ficticio: 38 años, 92 kg, pérdida de grasa, 3 sesiones en casa con mancuernas, rodilla izquierda delicada.',
      ai_disclaimer: 'Recomendación de IA, no consejo profesional.',
      signin: 'Empezar',
      partners: 'Socios',
      home: 'Inicio',
      no_prices: '',
      coach_title: 'Coach',
      coach_desc: 'Plan de entrenamiento semanal personalizado, entregado en PDF.',
      panier_title: 'Panier',
      panier_desc: 'La canasta de compras perfecta según tu presupuesto, entregada en PDF.',
      generate_plan: 'Generar mi plan',
      generating: 'Analizando, de 30 a 90 segundos...',
      open_pdf: 'Abrir el PDF',
      my_plans: 'Mis planes',
      service_unavailable: 'Servicio temporalmente no disponible. Inténtalo de nuevo más tarde.',
      error_generic: 'Ocurrió un error. Inténtalo de nuevo.',
      signed_in_as: 'Sesión iniciada como',
      sign_out: 'Cerrar sesión',
      no_plans_yet: 'Aún no se ha generado ningún plan.',
      billing_portal: 'Facturación y pago',
      your_link: 'Tu enlace',
      copy: 'Copiar',
      copied: '¡Copiado!',
      plans_this_month: 'Planes este mes',
      estimated_amount: 'Monto estimado',
      members: 'Miembros',
      recent_generations: 'Generaciones recientes',
      branding: 'Imagen de marca',
      save: 'Guardar',
      saved: '¡Guardado!',
      admin_login: 'Acceso de administrador',
      admin_code: 'Código de administrador',
      invalid_code: 'Código inválido.',
      edit_partner: 'Editar',
      cancel_edit: 'Cancelar',
      partner_label: 'Socio',
      new_partner: 'Nuevo socio',
      create: 'Crear',
      activate_billing: 'Activar facturación',
      finance: 'Finanzas',
      loading: 'Cargando...',
      tier_free: 'Gratis',
      tier_member: 'Miembro',
      per_month_plan: '1 plan por mes',
      per_day_plans: '3 planes por día',
      photo_scan_included: 'Análisis de foto incluido',
      no_photo_scan: 'Sin análisis de foto',
      history_included: 'Historial completo',
      sponsor_line: 'Ofrecido gracias a un patrocinador',
      start_free: 'Comenzar gratis',
      become_member: 'Hazte miembro',
      sponsors_strip_title: 'Ofrecido gracias a nuestros patrocinadores',
      become_sponsor: 'Conviértete en patrocinador',
      your_tier: 'Tu plan',
      plans_remaining_today: 'planes restantes hoy',
      plans_remaining_month: 'planes restantes este mes',
      manage_subscription: 'Administrar mi suscripción',
      upgrade_card_title: 'Pasa al plan Miembro',
      upgrade_card_body: 'Más planes, análisis de foto e historial completo.',
      quota_exceeded_msg: 'Límite alcanzado para tu plan. Vuelve más tarde o hazte miembro.',
      upgrade_required_msg: 'El análisis de foto es exclusivo para miembros. Hazte miembro para usarlo.',
      rate_limited_msg: 'Demasiadas solicitudes. Espera un momento, por favor.',
      checkout_thanks: '¡Gracias! Tu suscripción está activa.',
      checkout_activating: 'Pago recibido, activando...',
      country_label: 'País',
      postal_label: 'Código postal',
      sponsor_pitch_title: 'Conviértete en patrocinador',
      sponsor_pitch_body: '500 $ al mes para mantener esta comunidad gratuita para todos. Tu nombre, tu logo y un mensaje corto aparecen ante cada usuario del plan gratuito, y recibes un informe de impacto mensual.',
      sponsor_pitch_gets_title: 'Lo que recibes',
      contact_us: 'Contáctanos',
      current_sponsors: 'Patrocinadores actuales',
      sponsors_panel: 'Patrocinadores',
      add_sponsor: 'Agregar un patrocinador',
      sponsor_name: 'Nombre',
      sponsor_logo: 'URL del logo',
      sponsor_message: 'Mensaje (máx. 120 caracteres)',
      sponsor_product: 'Producto',
      sponsor_active: 'Activo',
      sponsor_email: 'Correo de facturación',
      no_sponsors_yet: 'Aún no hay patrocinadores.',
      sponsor_price_500: '500 $ al mes',
      country_other_hint: 'País no listado — procesaremos tu solicitud manualmente.',
      sponsor_message_too_long: 'El mensaje no debe superar los 120 caracteres.',
      profile_saved: 'Perfil guardado',
      diet_restrictions_label: 'Restricciones alimentarias (separadas por comas)',
      generate_with_profile: 'Generar con mi perfil',
      height_label: 'Estatura (cm)',
      weight_label: 'Peso (kg)',
      age_label: 'Edad',
      gender_label: 'Sexo',
      gender_male: 'Hombre',
      gender_female: 'Mujer',
      gender_other: 'Otro',
      goal_label: 'Objetivo',
      goal_fat_loss: 'Pérdida de grasa',
      goal_muscle_gain: 'Ganancia muscular',
      goal_maintenance: 'Mantenimiento',
      days_per_week_label: 'Días por semana',
      target_weight_label: 'Peso objetivo (kg)',
      weekly_food_budget_label: 'Presupuesto de comida / semana',
      nearest_gym_label: 'Gimnasio más cercano',
      injuries_label: 'Lesiones (opcional)',
      injuries_placeholder: 'ej. rodilla izquierda, leve, desde 2024',
      diet_restrictions_placeholder: 'ej. sin gluten, sin maní',
      photo_label: 'Foto (opcional)',
      panier_budget_label: 'Presupuesto / semana',
      people_label: 'Número de personas',
      goals_label: 'Objetivos de salud (opcional)',
      goals_placeholder: 'ej. menos azúcar, más proteína',
      preferences_label: 'Preferencias / restricciones (opcional)',
      preferences_placeholder: 'ej. vegetariano, sin gluten, alergias',
      tagline_label: 'Eslogan',
      tagline_label_fr: 'Eslogan (francés)',
      tagline_label_en: 'Eslogan (inglés)',
      tagline_label_es: 'Eslogan (español)',
      primary_color_label: 'Color primario',
      accent_color_label: 'Color de acento',
      dark_color_label: 'Color oscuro',
      partner_type_label: 'Tipo',
      product_type_both: 'Coach + Panier',
      product_type_coach_only: 'Solo Coach',
      product_type_panier_only: 'Solo Panier',
      demo_label: 'Demo',
      billing_label: 'Facturación',
      code_label: 'Código',
      month_label: 'Mes',
      paid_label: 'Pagado',
      active_subscriptions_label: 'Suscripciones activas: ',
      link_colon_label: 'Enlace: ',
      embed_snippet_label: 'Fragmento de integración:',
      date_label: 'Fecha',
    }
  };

  var lang = getLang();
  function t(key) { return (DICT[lang] && DICT[lang][key]) || (DICT.fr[key]) || key; }

  function applyI18n() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
  }

  // ---------- language toggle (FR -> EN -> ES cycling) ----------
  function nextLang(current) {
    var idx = LANGS.indexOf(current);
    return LANGS[(idx + 1) % LANGS.length];
  }

  function langToggleLabel(current) {
    return LANGS.map(function (l) {
      var up = l.toUpperCase();
      return l === current ? '<strong>' + up + '</strong>' : up;
    }).join(' | ');
  }

  function initLangToggle(btn, opts) {
    if (!btn) return;
    opts = opts || {};
    btn.innerHTML = langToggleLabel(lang);
    btn.addEventListener('click', function () {
      var next = nextLang(lang);
      if (opts.postPreference && getToken()) {
        api('/me/preferences', { method: 'POST', body: { language: next } }).catch(function () {});
      }
      var url = new URL(location.href);
      url.searchParams.set('lang', next);
      location.href = url.toString();
    });
  }

  // ---------- localized video with graceful fallback to French ----------
  // Tries videos/<dir><baseName>-<lang>.mp4 first; if that source errors
  // (the file does not exist yet, e.g. Spanish not recorded), falls back to
  // the French file, then finally shows the sibling .wl-video-fallback text
  // node (existing inline behavior) by letting the error bubble untouched.
  function initLocalizedVideo(videoEl, sourceEl, baseName, dir) {
    if (!videoEl || !sourceEl) return;
    dir = dir || 'videos/';
    var candidates = [lang];
    if (lang !== 'fr') candidates.push('fr');
    var i = 0;
    function tryNext() {
      if (i >= candidates.length) return;
      sourceEl.src = dir + baseName + '-' + candidates[i] + '.mp4';
      videoEl.poster = dir + baseName + '-' + candidates[i] + '.jpg';
      videoEl.load();
    }
    videoEl.addEventListener('error', function () {
      i++;
      if (i < candidates.length) {
        tryNext();
      } else if (videoEl.nextElementSibling) {
        videoEl.style.display = 'none';
        videoEl.nextElementSibling.style.display = 'flex';
      }
    });
    tryNext();
  }

  // ---------- partner resolution ----------
  function getPartner() {
    var q = new URLSearchParams(location.search).get('p');
    if (q) {
      try { localStorage.setItem('wl_partner', q); } catch (e) {}
      return q;
    }
    try {
      return localStorage.getItem('wl_partner') || '';
    } catch (e) { return ''; }
  }

  function withPartnerParam(path) {
    var p = getPartner();
    if (!p) return path;
    var sep = path.indexOf('?') === -1 ? '?' : '&';
    return path + sep + 'p=' + encodeURIComponent(p);
  }

  // ---------- token / session ----------
  function getToken() {
    try { return localStorage.getItem('wl_token') || ''; } catch (e) { return ''; }
  }
  function setToken(token) {
    try { localStorage.setItem('wl_token', token); } catch (e) {}
  }
  function clearToken() {
    try { localStorage.removeItem('wl_token'); } catch (e) {}
  }

  // ---------- API client ----------
  function apiUrl(path) {
    var base = (global.WL && global.WL.API_URL) || '';
    return base.replace(/\/$/, '') + path;
  }

  function api(path, options) {
    options = options || {};
    var headers = options.headers || {};
    var token = getToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;

    var fetchOpts = {
      method: options.method || 'GET',
      headers: headers
    };

    if (options.formData) {
      fetchOpts.body = options.formData;
      // do not set Content-Type — browser sets multipart boundary
    } else if (options.body !== undefined) {
      headers['Content-Type'] = 'application/json';
      fetchOpts.body = JSON.stringify(options.body);
    }

    return fetch(apiUrl(path), fetchOpts).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok) {
          var err = new Error((data && data.error) || 'request_failed');
          err.data = data;
          err.status = res.status;
          throw err;
        }
        return data;
      });
    });
  }

  // After a Stripe checkout redirect (?checkout=success), the member webhook
  // that flips tier to 'member' can land a few seconds after the browser
  // returns — poll /me every 5s (up to 60s) until the tier updates instead
  // of showing "active" before it actually is. onUpdate(user) is called on
  // every poll (including the first, immediate one) so the caller can
  // refresh its own UI; polling stops once tier === 'member' or the 60s
  // budget runs out.
  function pollForMembership(onUpdate) {
    var attempts = 0;
    var maxAttempts = 12; // 12 * 5s = 60s
    function poll() {
      api('/me').then(function (data) {
        var user = data.user || data;
        onUpdate(user);
        if (user.tier !== 'member' && attempts < maxAttempts) {
          attempts++;
          setTimeout(poll, 5000);
        }
      }).catch(function () {
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(poll, 5000);
        }
      });
    }
    poll();
  }

  function fetchConfig() {
    var partner = getPartner();
    var params = new URLSearchParams();
    if (partner) params.set('partner', partner);
    params.set('host', location.hostname);
    params.set('lang', lang);
    return api('/config?' + params.toString()).catch(function (err) {
      // fallback brand per spec — apply it directly here, then re-throw so each
      // page's own .catch() still runs and shows the "service unavailable" banner.
      var fallback = { code: partner || '', type: partner ? '' : 'both', name: partner ? '' : 'Coach + Panier', tagline: '', colors: {} };
      if (global.applyBrand) global.applyBrand(fallback);
      throw err;
    });
  }

  // ---------- Google Identity Services ----------
  function loadGsiScript(cb) {
    if (global.google && global.google.accounts && global.google.accounts.id) {
      cb();
      return;
    }
    var s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.defer = true;
    s.onload = cb;
    s.onerror = function () { cb(new Error('gsi_load_failed')); };
    document.head.appendChild(s);
  }

  function initGoogleSignIn(buttonEl, onCredential) {
    loadGsiScript(function (err) {
      if (err || !global.google) {
        if (buttonEl) {
          buttonEl.innerHTML = '<div class="wl-alert wl-alert-warn">' + t('service_unavailable') + '</div>';
        }
        return;
      }
      try {
        global.google.accounts.id.initialize({
          client_id: (global.WL && global.WL.GOOGLE_CLIENT_ID) || '',
          callback: function (response) { onCredential(response.credential); }
        });
        if (buttonEl) {
          global.google.accounts.id.renderButton(buttonEl, {
            theme: 'outline', size: 'large', text: 'signin_with',
            locale: lang === 'fr' ? 'fr' : (lang === 'es' ? 'es' : 'en')
          });
        }
      } catch (e) {
        if (buttonEl) {
          buttonEl.innerHTML = '<div class="wl-alert wl-alert-warn">' + t('service_unavailable') + '</div>';
        }
      }
    });
  }

  // ---------- misc helpers ----------
  function maskEmail(email) {
    if (!email || email.indexOf('@') === -1) return email || '';
    var parts = email.split('@');
    return parts[0].charAt(0) + '***@' + parts[1];
  }

  function centsToDollars(cents) {
    return ((cents || 0) / 100).toLocaleString(lang === 'fr' ? 'fr-CA' : (lang === 'es' ? 'es-MX' : 'en-CA'), {
      style: 'currency', currency: 'CAD'
    });
  }

  function showError(container, message) {
    if (!container) return;
    container.innerHTML = '<div class="wl-alert wl-alert-error">' + message + '</div>';
  }


  // ---------- interpolation ----------
  function tf(key, vars) {
    var out = t(key);
    Object.keys(vars || {}).forEach(function (k) { out = out.split('{' + k + '}').join(String(vars[k])); });
    return out;
  }

  function escapeHtml(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ---------- sign-in ----------
  function isGoogleConfigured() {
    var id = global.WL && global.WL.GOOGLE_CLIENT_ID;
    return !!id && id !== 'REPLACE_AT_DEPLOY' && /\.apps\.googleusercontent\.com$/.test(id);
  }

  // E-mail one-time code: email -> "send code" -> 6 digits -> token.
  function initEmailSignIn(container, onSignedIn) {
    if (!container) return;
    container.innerHTML =
      '<form class="wl-form wl-email-signin" novalidate>' +
        '<h3>' + escapeHtml(t('email_signin_title')) + '</h3>' +
        '<p class="wl-muted">' + escapeHtml(t('email_signin_hint')) + '</p>' +
        '<div class="wl-field"><label for="wl-email-input">' + escapeHtml(t('email_label')) + '</label>' +
          '<input type="email" id="wl-email-input" autocomplete="email" inputmode="email" required></div>' +
        '<div class="wl-field wl-hidden" id="wl-code-field"><label for="wl-code-input">' + escapeHtml(t('otp_code_label')) + '</label>' +
          '<input type="text" id="wl-code-input" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}"></div>' +
        '<div id="wl-email-msg"></div>' +
        '<button type="submit" class="wl-btn wl-btn-block" id="wl-email-btn">' + escapeHtml(t('send_code')) + '</button>' +
        '<button type="button" class="wl-link-btn wl-hidden" id="wl-email-change">' + escapeHtml(t('use_other_email')) + '</button>' +
      '</form>';
    var form = container.querySelector('form');
    var emailInput = container.querySelector('#wl-email-input');
    var codeField = container.querySelector('#wl-code-field');
    var codeInput = container.querySelector('#wl-code-input');
    var msg = container.querySelector('#wl-email-msg');
    var btn = container.querySelector('#wl-email-btn');
    var change = container.querySelector('#wl-email-change');
    var stage = 'email';

    function setStage(next) {
      stage = next;
      var codeStage = next === 'code';
      codeField.classList.toggle('wl-hidden', !codeStage);
      change.classList.toggle('wl-hidden', !codeStage);
      emailInput.readOnly = codeStage;
      btn.textContent = codeStage ? t('verify_code') : t('send_code');
      if (codeStage) codeInput.focus();
    }
    change.addEventListener('click', function () { msg.innerHTML = ''; codeInput.value = ''; setStage('email'); emailInput.focus(); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = emailInput.value.trim();
      msg.innerHTML = '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { showError(msg, escapeHtml(t('email_invalid'))); return; }
      btn.disabled = true;
      if (stage === 'email') {
        api('/auth/email/start', { method: 'POST', body: { email: email, partner: getPartner(), language: lang } })
          .then(function () {
            msg.innerHTML = '<div class="wl-alert wl-alert-success">' + escapeHtml(tf('code_sent', { email: email })) + '</div>';
            setStage('code');
          })
          .catch(function (err) {
            var code = err && err.data && err.data.error;
            if (code === 'code_recently_sent') { msg.innerHTML = '<div class="wl-alert wl-alert-warn">' + escapeHtml(t('code_wait')) + '</div>'; setStage('code'); }
            else showError(msg, escapeHtml(code === 'invalid_email' ? t('email_invalid') : t('service_unavailable')));
          })
          .finally(function () { btn.disabled = false; });
      } else {
        api('/auth/email/verify', { method: 'POST', body: { email: email, code: codeInput.value.trim(), partner: getPartner() } })
          .then(function (data) { setToken(data.token); onSignedIn(data.user); })
          .catch(function () { showError(msg, escapeHtml(t('code_invalid'))); })
          .finally(function () { btn.disabled = false; });
      }
    });
  }

  // Google button when configured, e-mail code always.
  function initSignIn(googleEl, emailEl, onSignedIn, onError) {
    if (isGoogleConfigured() && googleEl) {
      initGoogleSignIn(googleEl, function (credential) {
        api('/auth/google', { method: 'POST', body: { credential: credential, partner: getPartner() } })
          .then(function (data) { setToken(data.token); onSignedIn(data.user); })
          .catch(function () { if (onError) onError(); });
      });
    } else if (googleEl) {
      googleEl.innerHTML = '';
    }
    initEmailSignIn(emailEl, onSignedIn);
  }

  // ---------- position ----------
  // Browser geolocation (asks permission) -> { lat, lng }.
  function getPosition() {
    return new Promise(function (resolve, reject) {
      if (!navigator.geolocation) { reject(new Error('unsupported')); return; }
      navigator.geolocation.getCurrentPosition(
        function (pos) { resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }); },
        function (err) { reject(err); },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 10 * 60 * 1000 }
      );
    });
  }

  // ---------- checkbox groups ----------
  var ALLERGY_IDS = ['peanuts', 'tree_nuts', 'milk', 'eggs', 'wheat_gluten', 'soy', 'fish', 'shellfish', 'sesame', 'mustard', 'sulphites'];
  var DIET_IDS = ['vegetarian', 'vegan', 'pescatarian', 'halal', 'kosher', 'lactose_free', 'gluten_free', 'low_sodium', 'less_sugar'];
  function renderChoices(container, ids, keyPrefix, name, selected) {
    if (!container) return;
    var sel = selected || [];
    container.innerHTML = ids.map(function (id) {
      return '<label class="wl-choice"><input type="checkbox" name="' + name + '" value="' + id + '"' + (sel.indexOf(id) !== -1 ? ' checked' : '') + '> <span>' + escapeHtml(t(keyPrefix + id)) + '</span></label>';
    }).join('');
  }
  function checkedValues(container) {
    if (!container) return [];
    return Array.prototype.slice.call(container.querySelectorAll('input[type=checkbox]:checked')).map(function (i) { return i.value; });
  }
  function setChecked(container, values) {
    if (!container) return;
    Array.prototype.slice.call(container.querySelectorAll('input[type=checkbox]')).forEach(function (i) { i.checked = (values || []).indexOf(i.value) !== -1; });
  }

  // ---------- postal / country detection ----------
  var CA_POSTAL = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  var US_ZIP = /^\d{5}(-\d{4})?$/;
  function looksLikeCaOrUs(value) {
    value = (value || '').trim();
    return CA_POSTAL.test(value) || US_ZIP.test(value);
  }
  // '' is the "not listed" option — the select must only ever send a real
  // ISO-2 code or nothing at all, never a sentinel string.
  var COUNTRIES = [
    ['CA', 'Canada'], ['US', 'United States'], ['FR', 'France'], ['GB', 'United Kingdom'],
    ['BE', 'Belgium'], ['CH', 'Switzerland'], ['DE', 'Germany'], ['MX', 'Mexico'],
    ['HT', 'Haïti'], ['MA', 'Maroc'], ['SN', 'Sénégal'], ['CI', "Côte d'Ivoire"],
    ['DZ', 'Algérie'], ['TN', 'Tunisie'], ['AU', 'Australia'],
    ['', lang === 'fr' ? 'Autre' : (lang === 'es' ? 'Otro' : 'Other')]
  ];

  // ---------- generation error mapping ----------
  function genErrorMessage(err) {
    var code = err && err.data && err.data.error;
    if (code === 'quota_exceeded') return t('quota_exceeded_msg');
    if (code === 'upgrade_required') return t('upgrade_required_msg');
    if (code === 'rate_limited') return t('rate_limited_msg');
    return t('error_generic');
  }

  // ---------- safe sponsor rendering ----------
  // Sponsor name/message/logo_url come from the API (partner-submitted data)
  // and must NEVER be concatenated into innerHTML. Build DOM nodes instead
  // and use textContent; only set an <img src> when it is an https:// URL.
  function renderSponsors(container, sponsors) {
    if (!container) return;
    container.innerHTML = '';
    if (!sponsors || !sponsors.length) {
      var empty = document.createElement('p');
      empty.textContent = t('no_sponsors_yet');
      container.appendChild(empty);
      return;
    }
    sponsors.forEach(function (s) {
      var item = document.createElement('div');
      item.className = 'wl-sponsor-item';
      if (s.logo_url && /^https:\/\//i.test(s.logo_url)) {
        var img = document.createElement('img');
        img.src = s.logo_url;
        img.alt = s.name || '';
        item.appendChild(img);
      }
      var textWrap = document.createElement('div');
      var nameEl = document.createElement('div');
      nameEl.className = 'wl-sponsor-name';
      if (s.link_url && /^https:\/\//i.test(s.link_url)) {
        var link = document.createElement('a');
        link.href = s.link_url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = s.name || '';
        nameEl.appendChild(link);
      } else {
        nameEl.textContent = s.name || '';
      }
      textWrap.appendChild(nameEl);
      if (s.message) {
        var msgEl = document.createElement('div');
        msgEl.className = 'wl-sponsor-message';
        msgEl.textContent = s.message;
        textWrap.appendChild(msgEl);
      }
      item.appendChild(textWrap);
      container.appendChild(item);
    });
  }

  global.WLApp = {
    lang: lang,
    t: t,
    tf: tf,
    escapeHtml: escapeHtml,
    isGoogleConfigured: isGoogleConfigured,
    initEmailSignIn: initEmailSignIn,
    initSignIn: initSignIn,
    getPosition: getPosition,
    allergyIds: ALLERGY_IDS,
    dietIds: DIET_IDS,
    renderChoices: renderChoices,
    checkedValues: checkedValues,
    setChecked: setChecked,
    applyI18n: applyI18n,
    initLangToggle: initLangToggle,
    initLocalizedVideo: initLocalizedVideo,
    getPartner: getPartner,
    withPartnerParam: withPartnerParam,
    getToken: getToken,
    setToken: setToken,
    clearToken: clearToken,
    api: api,
    apiUrl: apiUrl,
    fetchConfig: fetchConfig,
    pollForMembership: pollForMembership,
    initGoogleSignIn: initGoogleSignIn,
    maskEmail: maskEmail,
    centsToDollars: centsToDollars,
    showError: showError,
    looksLikeCaOrUs: looksLikeCaOrUs,
    countries: COUNTRIES,
    genErrorMessage: genErrorMessage,
    renderSponsors: renderSponsors
  };
})(window);
