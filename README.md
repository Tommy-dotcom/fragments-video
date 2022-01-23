# Fragments vidéo 

Salut Théo,

tu trouveras sur ce repo git tout le code utile pour ton projet. J'ai fait un peu de ménage dans l'algo initial et l'ai transformé légèrement pour que :

* **Il soit compatible avec les navigateurs modernes** :
	* Tu trouveras un lien dans le code en commentaire vers le blog de Google qui explique la méthode
	* le pb venait que les vidéos que l'on ajoutait dynamiquement sur le D.O.M. n'était pas "muettes", Google, pour améliorer l'expérience utilisateur, ne les lis pas sans un clique explicit de l'internaute.
* **L'algorithme soit plus fluide** :
	* Au passage sur une cellule :
		* Y'a t'il une balise vidéo dans cette cellule ? 
			* *oui* : la vidéo se joue, à l'endroit ou elle s'était arrêtée
			* *non* : une balise vidéo est créée dans la cellule et elle s'auto démarre à l'instant ou l'autre vidéo s'était arrêtée (le temps courant est incrémentée de 10s)
	* Lorsqu'on quitte une cellule :
		* La vidéo de la cellule se met sur pause
		* le temps courant (`videoCurrentTime`, un attribut de notre classe) devient l'instant ou l'on a stoppé la vidéo.
* **une transition sur l'opacité se fait (avec la propriété `animate` dans le code si tu cherches ;)**

Si ton pote veut reprendre le code, ou même toi, j'ai essayé de le faire au plus simple, en gros : 

Tu as une fonction manager : 

```js
function VideoManager() {}
```

qui contient plusieurs sous fonctions (ça reproduit la programmation objet tout en assurant de la compatibilité pour les vieux navigateurs qui ne connaissent pas le mot clef `Class`) :

```js
function VideoManager() {
	this.init = () => {

	}
} 
````

La fonction `init` s'occupe de tout instancier pour toi, elle effectue successivement :

* La création d'une première vidéo (`createVideoDom`)
* La création de la grille (`peuplateGrid`)
* La création d'un "listener" qui va écouter les actions sur les cellules (`listenCellHover`)

Certaines données de la classe sont paramétrables facilement :

* `cellNumbers` : c'est le nombre de cellules à créer (j'ai gardé le nombre 260 par défaut)
* `videoZIndex` : c'est l'alignement sur l'axe z de départ de tes vidéos (il s'incrémente)
* `videoCurrentTime` : le moment de démarrage de ta vidéo.

Par ailleurs, je me suis permis d'organiser le code, tous les composants "front" seront dans le dossiers `assets`.

N'hésite pas à m'ouvrir des "Issues" sur ce repo si tu trouves des bugs ou des idées d'améliorations.

## Ajouter la vidéo si tu clones le projet

La vidéo est trop lourde pour être poussée sur un repo git, elle est donc ignorée par défaut, tu peux l'ajouter quand tu clones le projet dans le dossier `assets/video/`

# CHANGELOG

* **8/01/2022**
	* Réécriture du code initial
	* Comptabilité sur tous les navigateurs
	* Résolution du [problème d'autoplay](https://developer.chrome.com/blog/autoplay/).
* **23/01/2022**
	* Ajout d'une fonction de *callback* après la fin d'une vidéo.
	* Ajout d'une coupure plus douce quand on quitte la vidéo, 1s après
	* Test de la qualité du code en ligne

# TODO LIST

Restant à faire : 

* tester la charge sur un serveur
* vérifier le localStorage.