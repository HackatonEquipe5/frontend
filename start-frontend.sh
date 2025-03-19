#!/bin/bash

# Vérifier si MongoDB est accessible
echo "Vérification de la connexion à MongoDB..."

# Installer les dépendances
echo "Installation des dépendances frontend..."
npm install

# Démarrer le frontend
echo "Démarrage du serveur frontend..."
npm run dev
