uniapp返回上一级刷新页面：

```js
// 返回时绑定事件
uni.$emit('refreshData')
uni.navigateBack({
	delta: 1,
})
// 返回的页面订阅事件
onLoad(options) {
	if (options?.id) {
		this.id = options?.id
		this.getDetail(options?.id)
		uni.$on('refreshData', () => {
			this.getDetail(options?.id)
		})
	}
}
```



uniapp页面定位到指定位置

```vue
<view v-for="(item, index) in list" :key="index" class="item">
	<view :id="`detail${index}`" ref="detailRef"></view>
</view>

<script>
export default {
	data() {
        return{
            scrollTop:0
        }
    },
    methods: {
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
        // 页面滚动
		handleScroll(index) {
			if (index == undefined || null) return
            const _this = this
            //目标位置的节点：类或者id
			uni
				.createSelectorQuery()
				.select('#detail' + index)
				?.boundingClientRect((data) => {
                    //最外层盒子的节点：类或者id
					uni
						.createSelectorQuery()
						.select('.detail')
						?.boundingClientRect((res) => {
							uni.pageScrollTo({
								duration: 200, //过渡时间
								scrollTop: data?.top - res?.top + 6, //到达距离顶部的top值
								complete: function () {
									const timer = setTimeout(() => {
										_this.isTabChange = false // 关闭, 拦截onPageScroll事件
										clearTimeout(timer)
									}, 200)
								},
							})
						})
						.exec()
				})
				.exec()
		},
        
    }
}
</script>
```

