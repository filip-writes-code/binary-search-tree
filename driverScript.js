import { BinaryTree } from "./binarySearchTree.js";

const randomArray = (length) =>
  Array.from({ length: length }, () => Math.floor(Math.random() * 100));

let bst = new BinaryTree(randomArray(20));
bst.prettyPrint();

// console.log(`isBalanced: ${bst.isBalanced()}`);

console.log("\nPrinting in level order:");
// bst.levelOrderForEach();

console.log("\nPrinting pre order:");
// bst.preOrderForEach((value) => console.log(value));

console.log("\nPrinting in order:");
// bst.inOrderForEach();

console.log("\nPrinting post order:");
// bst.postOrderForEach(console.log);
