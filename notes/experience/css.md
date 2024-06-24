##### grid布局

> 规定项目将横跨的列数

```css
  grid-column-start: span 2;// 项目横跨两列
```

```css
  /*  声明了三列，宽度分别为 200px 100px 200px */
  grid-template-columns: 200px 100px 200px;
 /*行/列间距*/
  grid-gap: 5px;
  /*  声明了两行，行高分别为 50px 50px  */
  grid-template-rows: 50px 50px;
 /*  2行，而且行高都为 50px  */
  grid-template-rows: repeat(2, 50px);
 /* fr 关键字：Grid 布局还引入了一个另外的长度单位来帮助我们创建灵活的网格轨道。fr 单位代表网格容器中可用空间的一等份。grid-template-columns: 200px 1fr 2fr 表示第一个列宽设置为 200px，后面剩余的宽度分为两部分，宽度分别为剩余宽度的 1/3 和 2/3。 */
 grid-template-columns: 200px 1fr 2fr;
```



##### 图标不对齐

```css
vertical-align: -0.1em;
```



sass 混入样式

```scss
<style lang="scss">
  // 定义需要混入的样式
	@mixin flexCenter {
		display: flex;
		align-items: center;
	}
	.top{
    	// 引入
			@include flexCenter;
	}
	</style>
```

