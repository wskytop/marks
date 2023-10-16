---
title: JavaScript 手撕单向链表
date: 2021-11-25 19:39:00
tags: js
cover_picture:
---

概念：链表（Linked list）是一种常见的基础数据结构，是一种线性表，但是并不会按线性的顺序存储数据，而是在每一个节点里存到下一个节点的指针(Pointer)[[1\]](https://www.zhihu.com/topic/19649942/intro#ref_1)。由于不必须按顺序存储，链表在插入的时候可以达到O(1)的复杂度，比另一种线性表顺序表快得多。

```javascript
//单向链表
class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}
class LinkedList {
    constructor() {
        this.size = 0
        this.head = null
    }
    //添加节点
    append(element) {
        let node = new Node(element)
        if (this.head === null)
            this.head = node
        else {
            let current = this.getNode(this.size - 1)
            current.next = node
        }
        this.size++
    }

    getNode(index) {
        if (index < 0 || index >= this.size)
            throw new Error('error')
        let current = this.head
        for (let i = 0; i < index; i++) {
            current = current.next
        }
        return current
    }

    //添加节点到指定位置
    appendAt(position, element) {
        if (position < 0 || position > this.size)
            throw new Error('error')
        let node = new Node(element)
        if (position === 0) {
            node.next = this.head
            this.head = node
        } else {
            let pre = this.getNode(position - 1)
            node.next = pre.next
            pre.next = node
        }
    }
    //删除指定节点
    remove(position) {
        if (position < 0 || position >= this.size)
            throw new Error('error')
        let current = this.head
        if (position === 0) {
            this.head = current.next
        } else {
            let pre = this.getNode(position - 1)
            current = pre.next
            pre.next = current.next
        }
        this.size--
    }
    //找到指定元素节点的位置
    indexOf(element) {
        let current = this.head
        for (let i = 0; i < this.size; i++) {
            if(current.element!=element){
                current=current.next
            }else{
                return i
            }
        }
        return -1
    }
}
let ll = new LinkedList()
ll.append(1)
ll.append(2)
ll.append(3)
ll.append(4)
ll.appendAt(2, 5)
ll.remove(2)
console.dir(ll, {
    depth: 100
});
console.log(ll.indexOf(3));
```

