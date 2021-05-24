import React from 'react';
import './App.css';
import Button from './components/Button'
import Bullet from './components/Bullet';
import Spaceship from './components/Spaceship';
import Alien from './components/Alien.jsx';
import Title from './img/titlev3.png';
import Github from './img/github.png';
import Linkedin from './img/linkedin.png';


class App extends React.Component {
  constructor() {
    super();

    this.state = {

      // Les Aliens sont placés au départ sur la row 2.
      alienPositionRow: 2,


      displayAlien: [],

      displayBullet: [],
      key: 0,

      // Le spaceship est au départ sur la colonne 23, au milieu.
      spaceshipPositionColumn: 33,

      noTouchYet: true,

      beginning: true,
      lostGame: false
    }

    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.moveForwardAlien = this.moveForwardAlien.bind(this);
    this.newBulletShot = this.newBulletShot.bind(this);
    this.bulletShot = this.bulletShot.bind(this);
    this.toBegin = this.toBegin.bind(this);
    this.toRestart = this.toRestart.bind(this);
  }

  componentDidUpdate() {
    if (document.getElementById("bigDiv")) {
      document.getElementById("bigDiv").focus()
    }
  }

  // 3/ La fonction toBegin change le state beginning en false.
  toBegin() {

    this.setState({
      beginning: false,
      // Au départ displayAlien est un array vide. 
      // Grâce à la méthode fill on lui ajoute 10 éléments de valeurs true à partir de l'index 0
      displayAlien: (new Array(10)).fill(true, 0)
    })
  }

  toRestart() {
    this.setState({
      displayAlien: (new Array(10)).fill(true, 0),
      alienPositionRow: 2,
      displayBullet: [],
      key: 0,
      spaceshipPositionColumn: 33,
      noTouchYet: true,
      beginning: false,
      lostGame: false
    })
  }

  // 5/ Ici la touche 39 représente le keycode de la flêche de droite
  // touche 37 keycode de la flêche de gauche
  // touche 32 keycode de la touche espace
  keyDownHandler(e) {

    // Lorsque l'on bouge le spaceship pour la 1ère fois ou on tir alors les Aliens se mettent
    // à avancer au même moment.
    if (this.state.noTouchYet) {
      if (e.keyCode === 39) {
        this.moveForwardAlien()
        this.setState({
          spaceshipPositionColumn: this.state.spaceshipPositionColumn + 1,
          noTouchYet: false
        })
      } else if (e.keyCode === 37) {
        this.moveForwardAlien()
        this.setState({
          spaceshipPositionColumn: this.state.spaceshipPositionColumn - 1,
          noTouchYet: false
        })
      } else if (e.keyCode === 32) {
        this.setState({ noTouchYet: false })
        this.newBulletShot();
        this.moveForwardAlien()
      } else {

      }
    } else {

      // Lorsque le joueur tape la touche de gauche ou de droite, on change la colonne
      // sur laquelle le spaceship est grâce à la state spaceshipPositionColumn qui est
      // envoyé en props au composant Spaceship
      if (e.keyCode === 39 && this.state.spaceshipPositionColumn < 60) {
        this.setState({ spaceshipPositionColumn: this.state.spaceshipPositionColumn + 1 })
      } else if (e.keyCode === 37 && this.state.spaceshipPositionColumn > 5) {
        this.setState({ spaceshipPositionColumn: this.state.spaceshipPositionColumn - 1 })
      }
      //  Si le joueur tape sur la touche espace il appelle la fonction bulletShot
      else if (e.keyCode === 32) {
        this.newBulletShot();
      }
    }
  }

  // 6/ la fonction moveForwardAlien à été appellé lorsque le joueur a bouger son spaceship ou a tirer
  // pour la 1ère fois.
  moveForwardAlien() {
    // Condition : Si il reste un alien  
    if (this.state.displayAlien.indexOf(true) !== -1) {
      // si la position row des aliens est inferieur ou égale à 35 sur la grid
      if (this.state.alienPositionRow <= 35) {
        // On avance d'une ligne sur la grid
        this.setState({ alienPositionRow: this.state.alienPositionRow + 1 });
        // SetTimeout permet d'attendre 1/2 seconde avant de relancer la fonction mooveForwardAlien
        // Encore une fois.
        setTimeout(() => {
          this.moveForwardAlien();
        }, 500);
      } else {
        // Si aucune des conditions n'est respecté alors le jeu est perdu car au moins un alien
        // est parvenue à la même row que le spaceship.
        this.setState({
          lostGame: true
        });
      }
    }
  }

  newBulletShot() {
    const newArrayBullet = this.state.displayBullet;

    let newBullet = {
      bulletPositionRow: 43,
      bulletPositionColumn: this.state.spaceshipPositionColumn,
      displayBullet: "grid",
      key: this.state.key
    }

    newArrayBullet.push(newBullet);

    this.setState({
      displayBullet: newArrayBullet,
      key: this.state.key + 1
    })

    this.bulletShot(newBullet.key)
  }

  bulletShot(bullet) {

    this.state.displayBullet.forEach((elem, indexBullet) => {

      for (let index = 0; index < this.state.displayAlien.length; index++) {
        const middleColumnAlien = (index + 1) * 6

        // Si la position column de la bullet est égale à la position column de l'alien
        // ET si la position row de la bullet est égale à la position row de l'alien 
        if (elem.bulletPositionColumn >= middleColumnAlien - 1
          && elem.bulletPositionColumn <= middleColumnAlien + 1
          && elem.bulletPositionRow <= (this.state.alienPositionRow + 3)
          && this.state.displayAlien[index]) {

          const newDisplayBullet = this.state.displayBullet
          const newDisplayAlien = [...this.state.displayAlien]

          newDisplayBullet[indexBullet] = {
            bulletPositionRow: elem.bulletPositionRow,
            bulletPositionColumn: elem.bulletPositionColumn,
            displayBullet: "none",
            key: elem.key
          }
          newDisplayAlien.splice(index, 1, false)

          return this.setState({
            displayAlien: newDisplayAlien,
            displayBullet: newDisplayBullet
          })
        }
      }
    });

    const bulletMoving = this.state.displayBullet.map(elem => {
      if (bullet === elem.key) {
        if (elem.bulletPositionRow >= 1) {
          let newPositionRow = elem.bulletPositionRow - 1;

          return {
            bulletPositionRow: newPositionRow,
            bulletPositionColumn: elem.bulletPositionColumn,
            displayBullet: elem.displayBullet,
            key: elem.key
          }
        } else {

          return {
            bulletPositionRow: elem.bulletPositionRow,
            bulletPositionColumn: elem.bulletPositionColumn,
            displayBullet: "none",
            key: elem.key
          }
        }
      } else {
        return {
          bulletPositionRow: elem.bulletPositionRow,
          bulletPositionColumn: elem.bulletPositionColumn,
          displayBullet: elem.displayBullet,
          key: elem.key
        }
      }
    });

    const filterArrayBullet = bulletMoving.filter(elem => elem.displayBullet === "grid")

    if (filterArrayBullet.length === 0) {

      this.setState({
        displayBullet: filterArrayBullet
      })

    } else {

      this.setState({
        displayBullet: filterArrayBullet
      })

      setTimeout(() => {
        this.bulletShot(bullet)
      }, 30);
    }
  }

  renderMenuStart() {
    return (
      <div id='firstMenu'>
        <div className='titleAndButton'>

          <img src={Title} alt="Space Invaders" ></img>

          {/* 2/ Lorsque que l'on click sur ce button, ça appelle la fonction toBegin  */}
          <Button begin={this.toBegin}> PLAY </Button>
        </div>
      </div>
    )
  }

  renderMenuEnd() {
    return (
      <div id='menuEnd'>
        <div className='titleAndButtonEnd'>

          <img className="titleEnd" src={Title} alt="Space Invaders"></img>

          <h2>
            {/* Si lostGame égale à true alors afficher Game Over sinon afficher You won */}
            {this.state.lostGame === true ? "GAME OVER" : "YOU WON !!!"}
          </h2>

          <p>Thanks for playing, I hope you had fun.<br /> if you want to contact me,
            you will found my contact below</p>

          {/* 2/ Lorsque que l'on click sur ce button, ça appelle la fonction toBegin  */}
          <Button begin={this.toRestart}>Restart</Button>

          <div className='linkEnd'>
          <a href="https://github.com/moncefbou" target="_blank" rel="noreferrer"><img src={Github} alt="Github"></img></a>
          <a href="https://www.linkedin.com/in/moncef-boughal-a3118620a/" target="_blank" rel="noreferrer"><img src={Linkedin} alt="Linkedin"></img></a>
          </div>

        </div>
      </div>
    )
  }

  renderGame() {
    return (
      // 4/ On arrive ici car aucune des autres conditions n'est bonne.
      // Lorsque que l'on presse une touche la fonction keyDownHandler est appliqué avec
      // la touche du clavier tapée.
      <div
        onKeyDown={(e) => { this.keyDownHandler(e) }}
        id="bigDiv"
        // tabindex permet de capturer le focus de la div, par défault on ne peut pas.
        tabIndex={1}>

        {/* Ici on parcours le tableau displayAlien grâce à map et on crée autant de 
        Alien qu'il y a d'élement dans le tableaux */}
        {
          this.state.displayAlien.map((elem, index) => {
            if (elem) {
              // On assigne à tout les éléments une key, nécessaire pour aider React à modifier ou supprimé un élément.
              // Ici GridPosition Column correspond à l'index de l'élément + 1 le tout multiplié par 4. 
              // Cela nous permet de tous les décaler de 4 colonnes. le + 1 était necessaire car l'index 
              // commence à 0 et 0*4 égale la tête à toto les amis.
              // Tout les Aliens ont la même valeur de row car ils sont sur la même ligne et avance à la même allure. 
              return <Alien key={index} gridPositionColumn={(index + 1) * 6} gridPositionRow={this.state.alienPositionRow} />
            } else {
              return <> </>
            }
          })
        }

        {
          this.state.displayBullet.map((bullet, index) => {
            return <Bullet key={index*2} display={bullet.displayBullet} gridPositionColumn={bullet.bulletPositionColumn}
              gridPositionRow={bullet.bulletPositionRow} />
          })
        }

        {/* <Bullet display={this.state.displayBullet} gridPositionColumn={this.state.bulletPositionColumn}
          gridPositionRow={this.state.bulletPositionRow} /> */}

        <Spaceship
          key={100} gridPositionColumn={this.state.spaceshipPositionColumn}
          gridPositionRow={39} />

      </div>
    );
  }

  render() {
    // Si il ne reste aucun alien ou si on a perdu le jeu.
    if (this.state.displayAlien.length !== 0 && (this.state.displayAlien.indexOf(true) === -1
      || this.state.lostGame)) {
      return (
        <>{this.renderMenuEnd()}</>
      )
    } else {
      // 1/ Le state beginning est par defaut sur true donc la 1ere page que l'on a est celle çi.
      if (this.state.beginning) {
        return (
          <>{this.renderMenuStart()}</>
        )
      } else {
        return (
          <>{this.renderGame()}</>
        )
      }
    }
  }
}

export default App;
