# Guide de résolution des erreurs

## Erreur: `Erreur lors du chargement des statistiques: {}`

Cette erreur indique que la base de données Supabase n'est pas encore configurée ou que les tables nécessaires n'existent pas.

### Solution

1. **Connectez-vous à votre projet Supabase**
   - Allez sur [supabase.com/dashboard](https://supabase.com/dashboard)
   - Connectez-vous avec votre compte
   - Sélectionnez votre projet

2. **Ouvrez l'éditeur SQL**
   - Dans le menu latéral, cliquez sur "SQL Editor"
   - Cliquez sur "New query" pour créer une nouvelle requête

3. **Exécutez le script d'initialisation**
   - Ouvrez le fichier `supabase/init.sql` dans votre éditeur VS Code
   - Copiez tout le contenu du fichier
   - Collez le contenu dans l'éditeur SQL de Supabase
   - Cliquez sur "Run" pour exécuter le script

4. **Vérifiez la création des tables**
   - Allez dans l'onglet "Table Editor" de Supabase
   - Vous devriez voir les tables suivantes :
     - `profiles`
     - `clients`
     - `missions`
     - `commission_settings`
     - `objectives`
     - `notes`

5. **Actualisez l'application**
   - Retournez sur votre application web
   - Rechargez la page (F5 ou Ctrl+R)
   - L'erreur devrait maintenant être résolue

## Si l'erreur persiste

1. **Vérifiez les variables d'environnement**
   - Assurez-vous que le fichier `.env.local` existe
   - Vérifiez que `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont correctement configurés

2. **Vérifiez les permissions RLS**
   - Dans Supabase, allez dans "Authentication" > "Policies"
   - Assurez-vous que RLS est activé sur toutes les tables
   - Vérifiez que les policies permettent l'accès aux utilisateurs authentifiés

3. **Créez un utilisateur de test**
   - Allez dans "Authentication" > "Users"
   - Cliquez sur "Add user" pour créer un utilisateur de test
   - Utilisez cet utilisateur pour vous connecter à l'application

## Erreurs communes et solutions

### "relation does not exist"
- La table n'existe pas dans la base de données
- Solution : Exécutez le script `supabase/init.sql`

### "Authentication error"
- L'utilisateur n'est pas connecté
- Solution : Allez sur `/login` et connectez-vous

### "Permission denied"
- Les policies RLS ne permettent pas l'accès
- Solution : Vérifiez les policies dans l'onglet "Authentication" > "Policies"

### L'application ne charge pas
- Vérifiez que le serveur de développement fonctionne
- Ouvrez la console du navigateur (F12) pour voir les erreurs
- Vérifiez les variables d'environnement Supabase
