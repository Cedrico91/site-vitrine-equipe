# Guide de l'équipe : travailler chacun sur sa branche

Ce guide explique, étape par étape, comment chaque membre de l'équipe travaille sur **sa propre branche** sans gêner les autres.

## Le principe en 30 secondes

- La branche **`main`** contient la version officielle du site. **Personne ne travaille directement dessus.**
- Chaque équipier a **sa propre branche** (une copie du projet où il peut modifier ce qu'il veut).
- Quand une partie du travail est prête, on demande à l'intégrer dans `main` grâce à une **Pull Request** sur GitHub. Le reste de l'équipe peut alors relire avant la fusion.

```
main      ●────────────●──────────────●────►   (version officielle)
           \          ↑ fusion       ↑ fusion
armand      ●──●──●───┘              │
             \                       │
rachad        ●──●──●──●─────────────┘
```

---

## 1. Première fois seulement : récupérer le projet

### a) Installer Git
Téléchargez Git sur https://git-scm.com/downloads, puis installez-le (laissez les options par défaut).

### b) Indiquer votre nom à Git
Ouvrez un terminal (sur Windows : **Git Bash**, ou le terminal de VS Code) et tapez :

```bash
git config --global user.name "Votre Prénom Nom"
git config --global user.email "l-email-de-votre-compte-github@exemple.com"
```

### c) Télécharger le projet sur votre ordinateur

```bash
git clone https://github.com/Cedrico91/site-vitrine-equipe.git
cd site-vitrine-equipe
```

Lors du premier envoi, GitHub vous demandera de vous connecter : une fenêtre s'ouvre, connectez-vous avec votre compte GitHub.

### d) Créer VOTRE branche
Remplacez `votre-prenom` par votre prénom, **en minuscules, sans accents ni espaces** (exemple : `armand`, `rachad`, `landry`).

```bash
git switch -c votre-prenom
git push -u origin votre-prenom
```

✅ Votre branche existe maintenant sur votre ordinateur **et** sur GitHub.

---

## 2. Tous les jours : travailler sur votre branche

### Avant de commencer : vérifier où vous êtes

```bash
git status
```

La première ligne doit afficher **`On branch votre-prenom`**. Si elle affiche `main`, changez de branche :

```bash
git switch votre-prenom
```

### Récupérer les nouveautés validées par l'équipe
À faire **chaque fois que vous commencez à travailler**, pour partir de la version la plus récente :

```bash
git fetch origin
git merge origin/main
```

### Enregistrer et envoyer votre travail
Après avoir modifié des fichiers :

```bash
git add .
git commit -m "Ce que j'ai fait, en une phrase (ex : Ajout de la section contact)"
git push
```

💡 Faites des petits commits réguliers, avec des messages clairs. Envoyez (`git push`) au moins une fois à la fin de chaque séance : vos coéquipiers pourront voir votre travail sur GitHub.

---

## 3. Quand votre travail est prêt : la Pull Request

1. Allez sur https://github.com/Cedrico91/site-vitrine-equipe
2. Cliquez sur l'onglet **Pull requests**, puis sur **New pull request**.
3. Choisissez : **base : `main`** ← **compare : `votre-prenom`**.
4. Cliquez sur **Create pull request**, donnez un titre clair et décrivez ce que vous avez fait.
5. Un coéquipier relit, puis clique sur **Merge pull request** pour fusionner votre travail dans `main`.

Après la fusion, vous pouvez continuer à travailler sur la même branche : pensez simplement à refaire `git fetch origin` puis `git merge origin/main` (étape 2).

---

## 4. Les règles de l'équipe

1. ❌ **Ne jamais travailler ni faire de `git push` sur `main`.**
2. ✅ Toujours vérifier sa branche avec `git status` avant de commencer.
3. 🔄 Récupérer les nouveautés de `main` (`git fetch origin` puis `git merge origin/main`) au début de chaque séance.
4. 🤝 Se répartir les fichiers ou sections à l'avance, pour éviter de modifier les mêmes lignes en même temps.
5. 💬 Toute fusion dans `main` passe par une Pull Request.

---

## 5. En cas de problème

### « J'ai modifié des fichiers alors que j'étais sur `main` »
Si vous **n'avez pas encore fait de commit**, rien n'est perdu. Allez simplement sur votre branche, vos modifications vous suivent :

```bash
git switch votre-prenom
```

Si cette commande refuse, utilisez plutôt :

```bash
git stash
git switch votre-prenom
git stash pop
```

### « Git parle de CONFLICT »
Cela arrive quand deux personnes ont modifié les mêmes lignes. Git marque l'endroit dans le fichier ainsi :

```
<<<<<<< HEAD
votre version
=======
la version de l'équipe
>>>>>>> origin/main
```

1. Ouvrez le fichier (VS Code affiche des boutons pour choisir la bonne version).
2. Gardez la bonne version et supprimez les lignes `<<<<<<<`, `=======` et `>>>>>>>`.
3. Puis tapez :

```bash
git add .
git commit -m "Résolution du conflit"
git push
```

En cas de doute, **ne forcez rien** : demandez de l'aide à l'équipe.

### « `git push` est refusé »
Récupérez d'abord les dernières modifications de votre branche, puis réessayez :

```bash
git pull
git push
```

---

## Aide-mémoire

| Je veux… | Commande |
|---|---|
| Savoir sur quelle branche je suis | `git status` |
| Voir toutes les branches | `git branch -a` |
| Aller sur ma branche | `git switch votre-prenom` |
| Récupérer les nouveautés de `main` | `git fetch origin` puis `git merge origin/main` |
| Enregistrer mon travail | `git add .` puis `git commit -m "message"` |
| Envoyer mon travail sur GitHub | `git push` |
