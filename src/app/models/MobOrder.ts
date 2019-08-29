import { ClassListEnum } from "../enum/ClassListEnum";

export class MobOrder {
    id ?: number;
    mob1 : ClassListEnum;
    mob2 : ClassListEnum;
    mob3 ?: ClassListEnum;
    mob4 ?: ClassListEnum;
    difficulty: string;
}