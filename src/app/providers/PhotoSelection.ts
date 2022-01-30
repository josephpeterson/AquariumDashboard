
export class PhotoSelection  {

  public selection: any[] = [];
  public selecting: boolean = false;

  constructor() { }
  public toggleSelection(photo: any) {
    console.log("wat");
    this.setSelected(photo, !this.isSelected(photo));
  }
  public setSelected(photo: any, selected: boolean) {

    if (!selected && this.isSelected(photo))
      this.selection.splice(this.selection.indexOf(photo), 1);
    else if (selected)
      this.selection.push(photo);
  }
  public isSelected(photo: any) {
    return this.selection.indexOf(photo) != -1;
  }
  public toggleSelecting() {
    this.selecting = !this.selecting;
    if (!this.selecting)
      this.clearSelection();
  }
  public clearSelection() {
    this.selection = [];
  }
}

