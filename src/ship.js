export class Ship {
    constructor(length) {
      this.length = length;
      this.nbhit = 0;
    }
  
    hit() {
      this.nbhit += 1;
    }
  
    isSunk() {
      return this.nbhit >= this.length;
    }
  }