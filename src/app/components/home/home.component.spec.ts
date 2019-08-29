import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    component = new HomeComponent(mockRouter);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the players class and save it in sessionStorage', () => {
    spyOn(component, 'checkStartButton')

    component.playerClass("Ranger");

    expect(component.classSelected).toEqual("Ranger selected");

    expect(sessionStorage.getItem('playersClass')).toEqual("Ranger");

    expect(component.checkStartButton).toHaveBeenCalledTimes(1);
  });

  it('should get the difficulty selected, and save it in sessionStorage', () => {
    spyOn(component, 'checkStartButton');

    component.difficulty("Easy");

    expect(component.difficultySelected).toEqual("Easy selected");

    expect(sessionStorage.getItem('difficulty')).toEqual("Easy");

    expect(component.checkStartButton).toHaveBeenCalledTimes(1);
  });

  it('should save the username to sessionStorage and route to the dungion component', () => {
    component.username = "Michael";

    component.startGame();

    expect(sessionStorage.getItem('username')).toEqual("Michael");

    expect(mockRouter.navigate).toHaveBeenCalledTimes(1);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['dungion']);
  });

  it('should set isDisabled to false if everything has been filled in', () => {
    expect(component.isDisabled).toBe(true);

    component.classSelected = "Ranger selected";

    component.difficultySelected = "Easy selected";

    component.username = "Michael";

    component.checkStartButton();

    expect(component.isDisabled).toBe(false);
  });

  it('should keep isDisabled to true if only username is input', () => {
    expect(component.isDisabled).toBe(true);

    component.username = "Michael";

    component.checkStartButton();

    expect(component.isDisabled).toBe(true);
  });

  it('should keep isDisabled to true if only username is input', () => {
    expect(component.isDisabled).toBe(true);

    component.classSelected = "Ranger selected";

    component.checkStartButton();

    expect(component.isDisabled).toBe(true);
  });

  it('should keep isDisabled to true if only username is input', () => {
    expect(component.isDisabled).toBe(true);

    component.difficultySelected = "Easy selected";

    component.checkStartButton();

    expect(component.isDisabled).toBe(true);
  });
});
