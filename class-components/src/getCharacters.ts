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

export async function getAllCharacters(): Promise<ICharacter[]> {
  const response = await fetch(baseURL, {
    headers: {
      Authorization: 'Bearer Ic5iqi0En-5oQyBlk-oH',
    },
  });
  const characters: Promise<ICharacter[]> = (await response.json()).docs;
  return characters;
}

export async function getSearchedCharacters(searchValue: string): Promise<ICharacter[]> {
  const searchURL = `${baseURL}?name=/${searchValue}/i`;
  const response = await fetch(searchURL, {
    headers: {
      Authorization: 'Bearer Ic5iqi0En-5oQyBlk-oH',
    },
  });
  const searchResult: Promise<ICharacter[]> = (await response.json()).docs;
  return searchResult;
}
