import { ClassListEnum } from "../enum/ClassListEnum";
import { DifficultyEnum } from "../enum/DifficultyEnum";

export class Scoreboard {
    id ?: number;
    playersScore: number;
    playersName: string;
    playersClass: ClassListEnum;
    difficulty: DifficultyEnum;
}