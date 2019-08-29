import { EndingDialogComponent } from './ending-dialog.component';

const mockDialogRef = {
  close: jasmine.createSpy('close')
}

describe('EndingDialogComponent', () => {
  let component: EndingDialogComponent;
  let matDialogRef: any;

  beforeEach(() => {
    matDialogRef = mockDialogRef;
    component = new EndingDialogComponent(matDialogRef, 'Data info');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should grab the username from sessionStorage on ngOnInit', () => {
    sessionStorage.setItem('username', 'Michael');
    component.ngOnInit();
    expect(component.username).toEqual('Michael');
  });

  it('should close the dialog reference', () => {
    component.onCloseConfirm();
    expect(matDialogRef.close).toHaveBeenCalledTimes(1);
    expect(matDialogRef.close).toHaveBeenCalledWith('Confirm');
  });
});
