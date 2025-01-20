const characters = [
  {id:1,name: "Frodo Baggins", race: "Hobbit", weapon: "Sting", age: 50},
  {id:2,name: "Aragorn", race: "Human", weapon: "Andúril", age: 87},
  {id:3,name: "Legolas", race: "Elf", weapon: "Bow and Arrow", age: 2931},
  {id:4,name: "Gimli", race: "Dwarf", weapon: "Axe", age: 139},
  {id:5,name: "Gandalf", race: "Maia", weapon: "Staff", age: "Immortal"},
];

export function getAll() {
  return characters;
}

export function getItem(id) {
  return characters.find((character) => character.id === parseInt(id, 10));
}