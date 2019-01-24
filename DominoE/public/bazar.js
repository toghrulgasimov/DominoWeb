class Bazar {
    constructor(S) {
        this.A = [];
        for(let i = 0; i < S.length; i++) {
            S[i].lightOff();
            this.A.push(S[i]);
        }
    }
    getStone(cnt) {
        let ans = [];
        while(cnt > 0) {
            ans.push(this.A.pop());
            cnt--;
        }
        return ans;
    }
    count() {
        return this.A.length;
    }
    isEmpty() {
        return this.A.length == 0;
    }
}