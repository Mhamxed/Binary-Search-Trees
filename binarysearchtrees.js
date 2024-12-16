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
        if (root === null) return root
        else if (value < root.value) {
            root.left = this.delete(root.left, value)
        } else if (value > root.value) {
            root.right = this.delete(root.right, value)
        } else {
            if (root.left === null) {
                return root.right
            } else if (root.right === null) {
                return root.right
            } else {
                let curr = root.right
                while (curr.left !== null) {
                    curr = curr.left
                }
                root.value = curr.value
                root.right = this.delete(root.right, curr.value)
            }
        }
        return root
    }

    find(root, value) {
        try {
            if (root.value === value) return root
            else if (value < root.value) {
                return this.find(root.left, value)
            } else if (value > root.value) {
                return this.find(root.right, value)
            }
        } catch (error) {
            return `${value} not found`
        }
    }

    levelOrder() {
        let levelOrder = []
        let queue = []
        queue.push(this.root)
        while (queue.length > 0) {
            const n = queue.shift()
            levelOrder.push(n.value)
            if (n.left !== null) queue.push(n.left)
            if (n.right !== null) queue.push(n.right)
        }
        return levelOrder
    }
    
    inOrder(root, array = []) {
        if (root === null) {
            return
        }
        this.inOrder(root.left, array)
        array.push(root.value)
        this.inOrder(root.right, array)
        return array
    }

    preOrder(root, array = []) {
        if (root === null) {
            return 
        }
        array.push(root.value)
        this.preOrder(root.left, array)
        this.preOrder(root.right, array)
        return array
    }

    postOrder(root, array = []) {
        if (root === null) return
        this.postOrder(root.left, array)
        this.postOrder(root.right, array)
        array.push(root.value)
        return array
    }

    height(node) {
        if (node === null) return 0
        const leftHeight = this.height(node.left)
        const rightHeight = this.height(node.right)
        if (leftHeight > rightHeight) {
            return 1 + leftHeight
        } else {
            return 1 + rightHeight
        }
    }

    depth(node) {
        try {
            let res = 0
            let p = this.root
            while (p.value !== node.value) {
                if (node.value < p.value) {
                    p = p.left
                    res++
                } else if (node.value > p.value) {
                    p = p.left
                    res++
                }
            }
            return res 
        }
        catch (error) {
            return `${node} not found`
        }
    }

    getAllNodes(root, array = []) {
        if (root === null) return
        array.push(root)
        this.getAllNodes(root.left)
        this.getAllNodes(root.right)
        return array
    }

    isBalanced() {
        let balanced = true
        const allNodes = this.getAllNodes(this.root);
        for (let i = 0; i < allNodes.length; i++) {
            const node = allNodes[i]
            const leftSubtree = this.height(node.left);
            const rightSubtree = this.height(node.right);
            if (Math.abs(leftSubtree - rightSubtree) > 1) {
                balanced = false
            }
        }
        return balanced
    }

    rebalance() {
        const treeArray = this.levelOrder()
        const sortedNoduplicatesArray = [...new Set(treeArray.sort(function(a, b){return a - b}))]
        const root = this.buildTree(sortedNoduplicatesArray)
        return root
    }

}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const bst = new tree(array)
bst.prettyPrint(bst.root) 
/*│           ┌── 6345
│       ┌── 324
│   ┌── 67
│   │   │   ┌── 23
│   │   └── 9
└── 8
    │       ┌── 7
    │   ┌── 5
    └── 4
        │   ┌── 3
        └── 1 
*/

console.log(bst.isBalanced()) //true
console.log(bst.levelOrder()) //[8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345]
console.log(bst.inOrder(bst.root)) // [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]
console.log(bst.preOrder(bst.root)) //[8, 4, 1, 3, 5, 7, 67, 9, 23, 324, 6345]
console.log(bst.postOrder(bst.root)) //[3, 1, 7, 5, 4, 23, 9, 6345, 324, 67, 8]