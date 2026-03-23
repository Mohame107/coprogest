#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Mini-Analyseur Syntaxique Multi-langues (Somali – Afar – Arabe)
Université de Djibouti – L3 Informatique
Fondements Théoriques de l'Informatique
"""

import re

# =============================================================================
# DÉFINITION DES 10 RÈGLES GRAMMATICALES
# =============================================================================

REGLES = {
    # ---- SOMALI ----
    "R1_somali_nom_propre": {
        "langue": "Somali",
        "description": "Nom propre somali : commence par une majuscule suivie de minuscules",
        "regex": r"^[A-Z][a-z]+$",
        "type": "Nom propre"
    },
    "R2_somali_article_ka": {
        "langue": "Somali",
        "description": "Nom masculin défini somali : se termine par '-ka'",
        "regex": r"^[a-z]+-ka$",
        "type": "Nom masculin défini (suffixe -ka)"
    },
    "R3_somali_article_ta": {
        "langue": "Somali",
        "description": "Nom féminin défini somali : se termine par '-ta'",
        "regex": r"^[a-z]+-ta$",
        "type": "Nom féminin défini (suffixe -ta)"
    },
    # ---- AFAR ----
    "R4_afar_pluriel": {
        "langue": "Afar",
        "description": "Pluriel afar : mot en minuscules se terminant par 'ta' (sans tiret)",
        "regex": r"^[a-z]+ta$",
        "type": "Pluriel (suffixe ta)"
    },
    "R5_afar_feminin_itto": {
        "langue": "Afar",
        "description": "Féminin afar : se termine par '-itto'",
        "regex": r"^[a-z]+-itto$",
        "type": "Féminin (suffixe -itto)"
    },
    "R6_afar_nom_simple": {
        "langue": "Afar",
        "description": "Nom simple afar : uniquement des lettres minuscules, 3 à 10 caractères",
        "regex": r"^[a-z]{3,10}$",
        "type": "Nom simple afar"
    },
    # ---- ARABE ----
    "R7_arabe_article_al": {
        "langue": "Arabe",
        "description": "Mot arabe transcrit avec l'article défini 'Al' ou 'al' en début",
        "regex": r"^[Aa]l[A-Za-z]+$",
        "type": "Mot avec article défini (Al-)"
    },
    "R8_arabe_script": {
        "langue": "Arabe",
        "description": "Mot écrit en script arabe (Unicode U+0600 à U+06FF)",
        "regex": r"^[\u0600-\u06FF]+$",
        "type": "Mot en écriture arabe"
    },
    # ---- STRUCTURES GÉNÉRALES ----
    "R9_phrase_declarative": {
        "langue": "Général",
        "description": "Phrase déclarative se terminant par un point",
        "regex": r"^[A-Za-z\u0600-\u06FF][^.!?]*\.$",
        "type": "Phrase déclarative"
    },
    "R10_question": {
        "langue": "Général",
        "description": "Question se terminant par un point d'interrogation",
        "regex": r"^[A-Za-z\u0600-\u06FF][^?]*\?$",
        "type": "Phrase interrogative"
    },
}


# =============================================================================
# AUTOMATE FINI DÉTERMINISTE (AFD) — Implémentation directe
# =============================================================================

class AFD:
    """
    Automate Fini Déterministe générique.
    États, alphabet, transitions, état initial, états finaux.
    """
    def __init__(self, nom, etats, alphabet, transitions, etat_initial, etats_finaux):
        self.nom = nom
        self.etats = etats
        self.alphabet = alphabet
        self.transitions = transitions  # dict: (etat, symbole) -> etat
        self.etat_initial = etat_initial
        self.etats_finaux = etats_finaux

    def reconnait(self, mot):
        """Simule l'AFD sur un mot. Retourne True si accepté."""
        etat_courant = self.etat_initial
        for symbole in mot:
            cle = (etat_courant, symbole)
            if cle not in self.transitions:
                # Essayer un wildcard '?'
                cle_wild = (etat_courant, '?')
                if cle_wild not in self.transitions:
                    return False
                etat_courant = self.transitions[cle_wild]
            else:
                etat_courant = self.transitions[cle]
        return etat_courant in self.etats_finaux


# AFD pour mot commençant par "Al" (article défini arabe transcrit)
# Reconnaît : Al suivi d'au moins une lettre
def creer_afd_article_al():
    """
    États : q0 (initial), q1 (lu 'A'), q2 (lu 'Al'), q3 (acceptant), qerr
    Transitions :
      q0 --A--> q1
      q0 --a--> q1
      q1 --l--> q2
      q2 --lettre--> q3
      q3 --lettre--> q3
    """
    transitions = {}
    # q0: attente du 'A' ou 'a'
    transitions[('q0', 'A')] = 'q1'
    transitions[('q0', 'a')] = 'q1'
    # q1: attente du 'l'
    transitions[('q1', 'l')] = 'q2'
    # q2 -> q3: premier caractère après 'Al'
    for c in 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ':
        transitions[('q2', c)] = 'q3'
        transitions[('q3', c)] = 'q3'

    return AFD(
        nom="AFD_Article_Al",
        etats={'q0', 'q1', 'q2', 'q3', 'qerr'},
        alphabet=set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
        transitions=transitions,
        etat_initial='q0',
        etats_finaux={'q3'}
    )


# AFD pour suffixe "-ka" (nom masculin défini somali)
def creer_afd_suffixe_ka():
    """
    Reconnaît : [a-z]+-ka
    États : q0 (initial), q1 (au moins une lettre lue), q2 (tiret lu), q3 (k lu), q4 (acceptant)
    """
    transitions = {}
    lettres = 'abcdefghijklmnopqrstuvwxyz'
    # q0: première lettre obligatoire
    for c in lettres:
        transitions[('q0', c)] = 'q1'
    # q1: autres lettres ou tiret
    for c in lettres:
        transitions[('q1', c)] = 'q1'
    transitions[('q1', '-')] = 'q2'
    # q2: après tiret, on attend 'k'
    transitions[('q2', 'k')] = 'q3'
    # q3: après k, on attend 'a'
    transitions[('q3', 'a')] = 'q4'

    return AFD(
        nom="AFD_Suffixe_ka",
        etats={'q0', 'q1', 'q2', 'q3', 'q4'},
        alphabet=set(lettres + '-'),
        transitions=transitions,
        etat_initial='q0',
        etats_finaux={'q4'}
    )


# AFD pour nom propre (commence par majuscule, suivi de minuscules)
def creer_afd_nom_propre():
    """
    Reconnaît : [A-Z][a-z]+
    États : q0, q1 (majuscule lue), q2 (acceptant), qerr
    """
    transitions = {}
    majuscules = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    minuscules = 'abcdefghijklmnopqrstuvwxyz'
    for c in majuscules:
        transitions[('q0', c)] = 'q1'
    for c in minuscules:
        transitions[('q1', c)] = 'q2'
        transitions[('q2', c)] = 'q2'

    return AFD(
        nom="AFD_Nom_Propre",
        etats={'q0', 'q1', 'q2'},
        alphabet=set(majuscules + minuscules),
        transitions=transitions,
        etat_initial='q0',
        etats_finaux={'q2'}
    )


# =============================================================================
# ANALYSEUR PRINCIPAL
# =============================================================================

class AnalyseurMultiLangues:
    def __init__(self):
        self.regles = REGLES
        self.afd_al = creer_afd_article_al()
        self.afd_ka = creer_afd_suffixe_ka()
        self.afd_nom = creer_afd_nom_propre()

    def analyser(self, entree: str) -> list:
        """
        Analyse une entrée et retourne la liste des règles reconnues.
        Retourne une liste de dict {regle, langue, type}.
        """
        resultats = []
        for nom_regle, info in self.regles.items():
            pattern = info["regex"]
            if re.match(pattern, entree):
                resultats.append({
                    "regle": nom_regle,
                    "langue": info["langue"],
                    "type": info["type"],
                    "description": info["description"]
                })
        return resultats

    def analyser_avec_afd(self, entree: str) -> list:
        """Vérification complémentaire via les AFD construits manuellement."""
        resultats_afd = []
        if self.afd_al.reconnait(entree):
            resultats_afd.append("AFD Article Al : ACCEPTÉ")
        if self.afd_ka.reconnait(entree):
            resultats_afd.append("AFD Suffixe -ka : ACCEPTÉ")
        if self.afd_nom.reconnait(entree):
            resultats_afd.append("AFD Nom propre : ACCEPTÉ")
        return resultats_afd

    def afficher_rapport(self, entree: str):
        """Affiche le rapport complet pour une entrée."""
        print("=" * 60)
        print(f"  ANALYSEUR SYNTAXIQUE MULTI-LANGUES")
        print(f"  Université de Djibouti — L3 Informatique")
        print("=" * 60)
        print(f"  Entrée analysée : « {entree} »")
        print("-" * 60)

        resultats = self.analyser(entree)
        resultats_afd = self.analyser_avec_afd(entree)

        if resultats:
            print(f"  ✔ Règles reconnues ({len(resultats)}) :")
            for r in resultats:
                print(f"    • Règle : {r['regle']}")
                print(f"      Langue : {r['langue']}")
                print(f"      Type   : {r['type']}")
                print()
        else:
            print("  ✘ Aucune règle grammaticale reconnue.")
            print()

        if resultats_afd:
            print("  [AFD] Vérification par automates :")
            for msg in resultats_afd:
                print(f"    • {msg}")
        else:
            print("  [AFD] Aucun automate n'accepte cette entrée.")

        print("=" * 60)


# =============================================================================
# INTERFACE UTILISATEUR
# =============================================================================

def menu_interactif():
    analyseur = AnalyseurMultiLangues()
    print("\n" + "=" * 60)
    print("  Mini-Analyseur Syntaxique Multi-langues")
    print("  Somali | Afar | Arabe")
    print("  Université de Djibouti — L3 Informatique")
    print("=" * 60)

    while True:
        print("\nOptions :")
        print("  1. Analyser un mot ou une phrase")
        print("  2. Mode démonstration (exemples prédéfinis)")
        print("  3. Quitter")
        choix = input("\nVotre choix : ").strip()

        if choix == "1":
            entree = input("Entrez un mot ou une phrase : ").strip()
            if entree:
                analyseur.afficher_rapport(entree)

        elif choix == "2":
            exemples = [
                # Somali
                "Maxamed",        # Nom propre somali
                "buug-ka",        # Nom masculin défini
                "gabar-ta",       # Nom féminin défini
                # Afar
                "qorubta",        # Pluriel afar
                "indhoo-itto",    # Féminin afar
                "barka",          # Nom simple afar
                # Arabe
                "AlKitab",        # Article défini transcrit
                "الكتاب",         # Script arabe
                # Général
                "Djibouti est une ville.",   # Phrase déclarative
                "Quelle langue parlez-vous?",  # Question
            ]
            print("\n--- DÉMONSTRATION ---")
            for ex in exemples:
                analyseur.afficher_rapport(ex)
                input("  [Appuyez sur Entrée pour continuer...]\n")

        elif choix == "3":
            print("\nAu revoir !\n")
            break
        else:
            print("Choix invalide. Veuillez entrer 1, 2 ou 3.")


# =============================================================================
# POINT D'ENTRÉE
# =============================================================================

if __name__ == "__main__":
    menu_interactif()