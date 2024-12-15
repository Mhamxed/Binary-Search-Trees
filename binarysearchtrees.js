class node {
    constructor (value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class tree {
    constructor(array) {
        this.arr = [...new Set(array.sort(function(a, b){return a - b}))]
        this.root = this.buildTree(this.arr)
    }

    buildTree(array, start = 0, end = array.length - 1) {
        const mid = start + Math.floor((end - start) / 2)
        if (start > end) return null
        let root = new node(array[mid])
        //build the left subtree
        root.left = this.buildTree(array, start, mid - 1)
        //build the right subtree
        root.right = this.buildTree(array, mid + 1, end)
        return root
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    insert(root, value) {
        if (root === null)
            return new node(value);
            
        // Duplicates not allowed    
        if (root.value === value)
            return root;
            
        if (value < root.value)
            root.left = this.insert(root.left, value);
        else if (value > root.value)
            root.right = this.insert(root.right, value);
    
        return root;
    }

    delete(root, value) {
        
    }
         
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const bst = new tree(array)
bst.insert(bst.root, 100)
bst.prettyPrint(bst.root)