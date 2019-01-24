class Player {
    constructor() {
        this.hand = [];
        this.selectedStone = null;
    }

    arrangeStones() {
        for (let i = 0; i < this.hand.length; i++) {
            this.hand[i].translate(i*65,500,500);
        }
    }


}