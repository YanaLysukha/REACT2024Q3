import { Component, ReactNode } from "react";
import { ICharacter } from "../../getCharacters";

interface CharacterProps {
  character: ICharacter;
}

export default class ListItem extends Component<CharacterProps> {
  render(): ReactNode {
    const { character } = this.props;

    return (
      <div>
        <h1>{character.name}</h1>
        <p>Wiki: <a href={character.wikiUrl}>{character.wikiUrl}</a></p>
        <p>Race: {character.race}</p>
        <p>Gender: {character.gender}</p>
        <p>Spouse: {character.spouse}</p>
      </div>
    );
  }
}