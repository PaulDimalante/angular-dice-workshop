import { MobOrder } from "../models/MobOrder";
import { ClassListEnum } from "../enum/ClassListEnum";

export let mockMobOrderEasy: MobOrder = {
    mob1: ClassListEnum.Ranger,
    mob2: ClassListEnum.Fighter,
    mob3: ClassListEnum.None,
    mob4: ClassListEnum.None,
    difficulty: "Easy"
}

export let mockMobOrderMedium: MobOrder = {
    mob1: ClassListEnum.Fighter,
    mob2: ClassListEnum.Black_Mage,
    mob3: ClassListEnum.Ranger,
    mob4: ClassListEnum.None,
    difficulty: "Medium"
}

export let mockMobOrderHard: MobOrder = {
    mob1: ClassListEnum.Black_Mage,
    mob2: ClassListEnum.Ranger,
    mob3: ClassListEnum.Fighter,
    mob4: ClassListEnum.Black_Mage,
    difficulty: "Hard"
}

export let mockMobOrderMob3: MobOrder = {
    mob1: ClassListEnum.None,
    mob2: ClassListEnum.None,
    mob3: ClassListEnum.Black_Mage,
    mob4: ClassListEnum.None,
    difficulty: 'Does not matter'
}

export let mockMobOrderMob4Ranger: MobOrder = {
    mob1: ClassListEnum.None,
    mob2: ClassListEnum.None,
    mob3: ClassListEnum.None,
    mob4: ClassListEnum.Ranger,
    difficulty: 'Does not matter'
}

export let mockMobOrderMob4Fighter: MobOrder = {
    mob1: ClassListEnum.None,
    mob2: ClassListEnum.None,
    mob4: ClassListEnum.Fighter,
    difficulty: 'Does not matter'
}

export let mockMobOrderList: MobOrder[] = [];
mockMobOrderList.push(mockMobOrderEasy);
mockMobOrderList.push(mockMobOrderMedium);
mockMobOrderList.push(mockMobOrderHard);