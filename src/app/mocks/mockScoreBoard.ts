import { ClassListEnum } from "../enum/ClassListEnum";
import { DifficultyEnum } from "../enum/DifficultyEnum";
import { Scoreboard } from "../models/Scoreboard";

export let mockScoreBoardOne = {
    playersScore: 951,
    playersName: "Wargods3",
    playersClass: ClassListEnum.Fighter,
    difficulty: DifficultyEnum.Hard
}

export let mockScoreBoardTwo = {
    playersScore: 431,
    playersName: "RaiseTheRoof",
    playersClass: ClassListEnum.Black_Mage,
    difficulty: DifficultyEnum.Easy
}

export let mockScoreBoardThree = {
    playersScore: 689,
    playersName: "KitDaKat",
    playersClass: ClassListEnum.Ranger,
    difficulty: DifficultyEnum.Medium
}

export let mockScoreBoardList: Scoreboard[] = [];
mockScoreBoardList.push(mockScoreBoardOne);
mockScoreBoardList.push(mockScoreBoardTwo);
mockScoreBoardList.push(mockScoreBoardThree);