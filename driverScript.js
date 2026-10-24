import { BinaryTree } from "./binarySearchTree.js";

const randomArray = (length) =>
  Array.from({ length: length }, () => Math.floor(Math.random() * 100));

let bst = new BinaryTree(randomArray(20));

console.log("\nPrinting in level order:");
bst.levelOrderForEach((value) => console.log(value));

console.log("\nPrinting pre order:");
bst.preOrderForEach((value) => console.log(value));

console.log("\nPrinting in order:");
bst.inOrderForEach((value) => console.log(value));

console.log("\nPrinting post order:");
bst.postOrderForEach((value) => console.log(value));

bst.prettyPrint();
console.log(`\nisBalanced: ${bst.isBalanced()}`);

bst.insert(101);
bst.insert(124);
bst.insert(167);

bst.prettyPrint();
console.log(`\nisBalanced: ${bst.isBalanced()}`);

bst.rebalance();

bst.prettyPrint();
console.log(`\nisBalanced: ${bst.isBalanced()}`);
