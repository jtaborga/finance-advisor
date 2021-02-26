const { Node } = require('./node');

class MinHeap {
    constructor() {
        this.array = [null];
    }

    getParent(idx) {
        return Math.floor(idx / 2);
    }

    getLeftChild(idx) {
        return idx * 2;
    }

    getRightChild(idx) {
        return (idx * 2) + 1;
    }

    swap(array, i, j) {
        [array[i], array[j]] = [array[j], array[i]]
    }

    siftUp(idx) {
        if (idx === 1) return;

        let parentIdx = this.getParent(idx);
        if (this.array[idx].val < this.array[parentIdx].val) {
            this.swap(this.array, idx, parentIdx);
            this.siftUp(parentIdx)
        }
    }

    siftDown(idx) {
        let leftIdx = this.getLeftChild(idx);
        let rightIdx = this.getRightChild(idx);

        let leftVal = this.array[leftIdx] ? this.array[leftIdx].val : Infinity;
        let rightVal = this.array[rightIdx] ? this.array[rightIdx].val : Infinity;

        if (this.array[idx].val < leftVal && this.array[idx].val < rightVal) return;

        let swapIdx = leftVal > rightVal ? rightIdx : leftIdx;

        this.swap(this.array, idx, swapIdx);
        this.siftDown(swapIdx);
    }

    deleteMin() {
        if (this.array.length === 2) return this.array.pop();
        if (this.array.length <= 1) return { val: null, idx: null };

        let min = this.array[1];
        this.array[1] = this.array.pop();
        this.siftDown(1);

        return min;
    }

    insert(val, idx) {
        const node = new Node(val, idx)
        this.array.push(node);
        this.siftUp(this.array.length - 1)
    }
}

module.exports = { MinHeap }