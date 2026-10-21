class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor(inputArray) {
    this.root = this.#buildTree(inputArray);
  }

  #buildTree(array) {
    //1. remove duplicates
    //2. sort the array
    let arrayWithoutDuplicates = [...new Set(array)];
    let sortedArray = arrayWithoutDuplicates.sort((a, b) => a - b);

    //build a binary tree recursively
    const sortedArrToBST = (arr, start, end) => {
      if (start > end) return null;

      let mid = start + Math.floor((end - start) / 2);
      let root = new Node(arr[mid]);

      root.left = sortedArrToBST(arr, start, mid - 1);
      root.right = sortedArrToBST(arr, mid + 1, end);

      return root;
    };

    return sortedArrToBST(sortedArray, 0, sortedArray.length - 1);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let test = new BinaryTree(testArray);

prettyPrint(test.root);
