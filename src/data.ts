type Character = {
  id: number;
  name: string;
  race: string;
  weapon: string;
  age: number | string;
};

const characters: Character[] = [
  { id: 1, name: "Frodo Baggins", race: "Hobbit", weapon: "Sting", age: 50 },
  { id: 2, name: "Aragorn", race: "Human", weapon: "Andúril", age: 87 },
  { id: 3, name: "Legolas", race: "Elf", weapon: "Bow and Arrow", age: 2931 },
  { id: 4, name: "Gimli", race: "Dwarf", weapon: "Axe", age: 139 },
  { id: 5, name: "Gandalf", race: "Maia", weapon: "Staff", age: "Immortal" },
];

export function getAll(): Character[] {
  return characters;
}

export function getItem(id: number): Character | undefined {
  return characters.find((character) => character.id === id);
}
