class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree {
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

  // accepts a value and returns true if the given value is in the tree.
  // If the value isn’t in the tree, it should return false.

  includes(value, node = this.root) {
    if (node === null) return false;
    if (node.data === value) return true;

    //if value is less than the node value, search the left side of the tree
    //if value is more than the node value, search the right side of the tree
    if (value < node.data) return this.includes(value, node.left);
    if (value > node.data) return this.includes(value, node.right);
  }

  findAndReturnNode(value, node = this.root) {
    if (node === null) return false;
    if (node.data === value) return node;

    //if value is less than the node value, search the left side of the tree
    //if value is more than the node value, search the right side of the tree
    if (value < node.data) return this.findAndReturnNode(value, node.left);
    if (value > node.data) return this.findAndReturnNode(value, node.right);
  }

  insert(value) {
    let root = this.root;
    let newNode = new Node(value);

    // if the tree is empty
    if (!root) {
      this.root = newNode;
      return true;
    }

    //find the node that will be the parent of the new node
    let current = root;

    while (current) {
      if (value < current.data && current.left) {
        current = current.left;
      } else if (value > current.data && current.right) {
        current = current.right;
      } else if (value === current.data) {
        return false;
      } else {
        break;
      }
    }

    //insert the node as a child
    if (value < current.data) {
      current.left = newNode;
    } else {
      current.right = newNode;
    }

    return true;
  }

  deleteNode(value, root = this.root) {
    if (root === null) return root;

    // helper function that gets the In-order Succesor (smallest in the right subtree) of a given node.
    function getInOrderSuccessor(node) {
      let current = node.right;
      while (current.left) {
        current = current.left;
      }
      console.log(
        `In-order Successor found (smallest in the right subtree of ${node.data}: ${current.data}`,
      );
      return current;
    }

    if (value < root.data) {
      root.left = this.deleteNode(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteNode(value, root.right);
    } else if (value === root.data) {
      // nodes with 0 or 1 children
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      //nodes with 2 children
      let successor = getInOrderSuccessor(root);
      root.data = successor.data;
      root.right = this.deleteNode(successor.data, root.right);
    }

    return root;
  }

  levelOrderForEach(callback) {
    //if the callback function is not provided - throw an error
    if (!callback || typeof callback !== "function")
      throw new Error("No callback function provided.");

    let q = [];
    q.push(this.root);

    while (q.length !== 0) {
      // enqueue discovered nodes
      let current = q[0];
      // console.log(`Current Node: ${current.data}`);
      if (current.left) {
        q.push(current.left);
        // console.log(`Discovered Node on the left: ${current.left.data}`);
      }
      if (current.right) {
        q.push(current.right);
        // console.log(`Discovered Node on the right: ${current.right.data}`);
      }

      // run the callback function
      callback(current.data);

      // and dequeue the top of the queue
      q.shift();
    }
  }

  // traverses the tree in in-order depth first manner,
  // and calls a passed callback function on each element
  inOrderForEach(callback, root = this.root) {
    if (!callback || typeof callback !== "function")
      throw new Error("No callback function provided.");

    if (!root) return null;

    // console.log(`Working on node: ${root.data}`);
    callback(root.data);
    root.left = this.inOrderForEach(callback, root.left);
    root.right = this.inOrderForEach(callback, root.right);

    return root;
  }

  // traverses the tree in pre-order depth first manner,
  // and calls a passed callback function on each element
  preOrderForEach(callback, root = this.root) {
    if (!callback || typeof callback !== "function")
      throw new Error("No callback function provided.");

    if (!root) return null;

    root.left = this.preOrderForEach(callback, root.left);
    // console.log(`Working on node: ${root.data}`);
    callback(root.data);
    root.right = this.preOrderForEach(callback, root.right);

    return root;
  }

  // traverses the tree in post-order depth first manner,
  // and calls a passed callback function on each element
  postOrderForEach(callback, root = this.root) {
    if (!callback || typeof callback !== "function")
      throw new Error("No callback function provided.");

    if (!root) return null;

    root.left = this.postOrderForEach(callback, root.left);
    root.right = this.postOrderForEach(callback, root.right);
    // console.log(`Working on node: ${root.data}`);
    callback(root.data);

    return root;
  }

  // returns the height of the given node
  // height is defined as the number of edges in the longest path from that node to a leaf node.

  height(value) {
    let findNode = this.findAndReturnNode(value);

    //helper function to find height
    function findHeight(root) {
      if (!root) return -1;

      let leftHeight = findHeight(root.left);
      let rightHeight = findHeight(root.right);

      return Math.max(leftHeight, rightHeight) + 1;
    }

    return findHeight(findNode);
  }

  depth(value, root = this.root) {
    let count = 0;
    if (!root) return;
    if (root.data === value) return 0;

    if (value < root.data) {
      count += this.depth(value, root.left);
    } else if (value > root.data) {
      count += this.depth(value, root.right);
    }
    if (!isNaN(count)) return count + 1;
  }

  isBalanced() {
    function checkForBalance(root) {
      if (!root) return 0;

      let leftHeight = checkForBalance(root.left);
      if (leftHeight < 0) return -1; //check if the recursive call was unbalanced and return immediately if it was
      let rightHeight = checkForBalance(root.right);
      if (rightHeight < 0) return -1; //check if the recursive call was unbalanced and return immediately if it was

      let diff =
        Math.max(leftHeight, rightHeight) - Math.min(leftHeight, rightHeight);

      if (diff === 0 || diff === 1) {
        return Math.max(leftHeight, rightHeight) + 1;
      } else return -1;
    }

    //convert the output of the recursive function to boolean
    const balance = checkForBalance(this.root);
    if (balance < 0) return false;
    else return true;
  }

  rebalance() {
    let root = this.root;
    let entries = [];

    function populateEntries(root) {
      if (!root) return;

      root.left = populateEntries(root.left);
      entries.push(root.data);
      root.right = populateEntries(root.right);

      return;
    }
    populateEntries(root);
    this.root = this.#buildTree(entries);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}
