const baseURL = 'https://the-one-api.dev/v2/character';

export interface ICharacter {
  _id: string;
  name: string;
  wikiUrl: string;
  race: string;
  birth: string | null;
  gender: string;
  death: string | null;
  hair: string | null;
  height: string | null;
  realm: string | null;
  spouse: string;
}

export async function getCharacters(
  searchValue: string = '',
  page: number = 1,
): Promise<ICharacter[]> {
  const url = searchValue
    ? `${baseURL}?name=/${searchValue}/i`
    : `${baseURL}?limit=100&page=${page}`;

  const response = await fetch(url, {
    headers: {
      Authorization: 'Bearer Ic5iqi0En-5oQyBlk-oH',
    },
  });
  const characters: Promise<ICharacter[]> = (await response.json()).docs;
  return characters;
}

export async function getCharacterById(characterId: string) {
  const url = `${baseURL}/${characterId}`;
  const response = await fetch(url, {
    headers: {
      Authorization: 'Bearer Ic5iqi0En-5oQyBlk-oH',
    },
  });
  const character: Promise<ICharacter> = (await response.json()).docs[0];
  return character;
}
