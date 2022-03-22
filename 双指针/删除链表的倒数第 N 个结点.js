/**
 * 给你一个链表， 删除链表的倒数第 n 个结点， 并且返回链表的头结点。
 */ 
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    let slow = head,
        fast = head
    for (let i = 0; i < n; i++) {
        fast = fast.next
    }
    if (!fast) {
        return head.next
    }
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next
    }
    slow.next = slow.next.next
    return head
};