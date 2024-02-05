import Matter from 'matter-js';
import Character from '../objects/character';
import { world } from '../main';
import { nameTagService } from './nameTag.service';
import { characterSpriteService } from './characterSprite.service';

class CharactersService {
    characters: Character[] = [];
    charactersMap: Map<string, Character> = new Map();

    public newCharacter(username: string): void {
        const character = new Character(window.innerWidth / 2, window.innerHeight / 2, username);
        this.characters.push(character);
        this.charactersMap.set(character.username, character);
        Matter.World.add(world, character.body);
        nameTagService.newTag(character.username);
        characterSpriteService.newSprite(character.username);
    }

    public updatecharacter(): void {
    }

    public removecharacter(username: string): void {
        const character = this.charactersMap.get(username);
        if (!character) return;
        Matter.World.remove(world, character.body);
        this.characters = this.characters.filter(plyr => plyr !== character);
        this.charactersMap.delete(character.username!);
        nameTagService.removeTag(character.username!);
    }

    public inBetween(): void {
        for (const character of this.characters) {
            Matter.Body.setAngle(character.body, 0);
        }
    }

}

export const charactersService = new CharactersService();
