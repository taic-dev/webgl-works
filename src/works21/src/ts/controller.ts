import GUI from "lil-gui";

interface Arg {
  name: string
  obj: { [key: string]: number },
  range: number[]
}

export class Controller {
  [x: string]: any;

  constructor() {
    this.gui = new GUI();
  }
  _setGUI({ name, obj, range }: Arg) {
    this.gui.add( obj, name, range[0], range[1], range[2] );
  }
}