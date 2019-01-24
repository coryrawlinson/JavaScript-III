/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/

// constructor function: to build objects
function GameObject(attributes){
  this.createdAt = attributes.createdAt;
  this.dimensions = attributes.dimensions;
}

GameObject.prototype.destroy = function() {
  console.log(`Object was removed from the game`)
}
  

/*
  === CharacterStats ===
  * healthPoints
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(characterattributes){
  //This binds the "this" keyword to GameObject
  GameObject.call(this, characterattributes);
  this.healthPoints = characterattributes.healthPoints;
  this.name = characterattributes.name;
}

// this sets up the __proto__ and allows us to use methods now across objects (destroy)
CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function () {
  return `${this.name} took damage`;
}


/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(humanAttributes) {
  CharacterStats.call(this, humanAttributes);
  this.team = humanAttributes.team;
  this.weapons = humanAttributes.weapons;
  this.damage = humanAttributes.damage;
  this.language = humanAttributes.language;
}
Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function () {
  return `${this.name} offers a greeting in ${this.language}`;
}
Humanoid.prototype.attack = function (objectToAttack) {
  if (objectToAttack.healthPoints <= 0) {
    objectToAttack.destroy();
    console.log(`${objectToAttack.name} has been destroyed`);
  } else {
    objectToAttack.healthPoints -= this.damage;
    console.log(`
    ${this.name} attacked ${objectToAttack.name} for ${this.damage}\n
    ${objectToAttack.name} is now at ${objectToAttack.healthPoints} Health Points`);
  }
}
//Incomplete functionality
Humanoid.prototype.isAlive = function () {
  if(this.healthPoints > 0){
    this.alive = true;
  }else{
    this.alive = false;
    console.log(`${this.name} has been defeated!`)
  }
}

Humanoid.prototype.printStatistics = function () {
  console.log(`
  ===${this.name}=== \n
  Current Health: ${this.healthPoints} \n
  Weapons Available: ${this.weapons}
  ==================
  `)
}

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Kento Rei Fang',
    team: 'Mage Warrior',
    weapons: [
      'Staff',
    ],
    language: 'Anime J',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sage Date',
    team: 'Ancient Warriors',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Anime J',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Rowen Hashiba',
    team: 'Ronin Warriors',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Ancient Japanese',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Kento Rei Fang
  console.log(swordsman.team); // Ancient Warriors
  console.log(mage.weapons); // Staff
  console.log(archer.language); // Ancient Japanese
  console.log(archer.greet()); // Rowen Hashiba offers a greeting in Ancient Japanese.
  console.log(mage.takeDamage()); // Kento Rei Fang took damage.
  console.log(swordsman.destroy()); // Sage Date was removed from the game.

  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!

  function hero(heroattributes) {
    //This binds the "this" keyword to CharacterStats
    Humanoid.call(this, heroattributes);
    this.heropower = heroattributes.heropower;
  }
  
  // this sets up the __proto__ and allows us to use methods now across objects (destroy & takeDamage)
  hero.prototype = Object.create(Humanoid.prototype);
  
  hero.prototype.discover = function () {
    return (`${this.name} discovers ${this.heropower}.`)
  }
  
  hero.prototype.heal = function (character, hpheal) {
    console.log(`${this.name} has healed ${character.name}!. ${character.name}! gains ${hpheal} points.`);
    character.hp = character.hp + hpheal;
    return (character.hp);
  }
  
  const FlameWarrior = new hero({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 5,
    },
    hp: 20,
    name: 'Ryo Sanada',
    faction: 'Ronin Warriors',
    weapons: [
      'Sword',
      'White Blaze',
    ],
    language: 'Japanese',
  });
  
  console.log(FlameWarrior.heal(swordsman, 5));
  
  function villain(villainattributes) {
    //This binds the "this" keyword to CharacterStats
    Humanoid.call(this, villainattributes);
    this.defend = villainattributes.defend;
  }
  
  // this sets up the __proto__ and allows us to use methods now across objects (destroy & takeDamage)
  villain.prototype = Object.create(Humanoid.prototype);
  
  villain.prototype.taunt = function () {
    return (`Loser, your powers are too weak to defeat ${this.name}!`)
  }
  
  villain.prototype.curse = function(character, hpcurse) {
    character.hp = character.hp - hpcurse;
    if (character.hp <= 0) {
      console.log(`${this.name} has cursed ${character.name}!. ${character.name}! loses ${hpcurse} points.`);
      console.log(character.destroy()); 
      return (character.hp);
    }
    else {
      console.log(`${this.name} has cursed ${character.name}!. ${character.name}! loses ${hpcurse} points.`);
       return (character.hp);
    }
  }
  
  const Talpa = new villain({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 3,
    },
    hp: 20,
    name: 'Talpa, The Dark Emperor',
    faction: 'Nether Realm',
    weapons: [
      'Double-Edged Swords',
      'Dark Warlords',
    ],
    language: 'Ancient',
  });
  
  console.log(Talpa.curse(mage, 25));
  
  console.log(FlameWarrior.heal(swordsman, 5));
  
  