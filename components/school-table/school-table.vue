<template>
	<view class="result-table">
		<text class="title">{{ title }}</text>
		<table>
			<thead>
				<tr>
					<th>学校名称</th>
					<th>地区</th>
				</tr>
			</thead>
			<tbody>
				<tr 
					v-for="school in showSchoolList"
					:key="school.cid">
					<td>
						<text class="school-name">{{ school.name }}</text>
						<view class="flag-group">
							<text class="flag">{{ school.tag }}</text>
							<text class="flag">{{ school.runProperty }}</text>
							<text class="flag">{{ school.schoolType }}</text>
							<text class="flag">{{ school.level == 0 ? "本科" : "专科" }}</text>
							<text v-show="+school.is985" class="flag">985</text>
							<text v-show="+school.is211" class="flag">211</text>
							<text v-show="+school.is11" class="flag">双一流</text>
						</view>
					</td>
					<td>{{ school.province }}</td>
				</tr>
			</tbody>
		</table>
		
	</view>
</template>

<script>
	export default {
		props: ['showSchoolList', 'title']
	}
</script>

<style lang="scss">
	@import "@/assets/scss/common.scss";
	$fontColor: #999999;
	
	$backgroundColor: #e7e7e7;
	$activeBackground: #d3d3d3;
	$borderColor: rgba(0,0,0,.1);
	
	$primaryColor: #007AFF;
	.result-table {
		.title {
			padding: 30rpx;
			font-size: 45rpx;
			line-height: 2;
			font-weight: bold;
		}
	}
	table {
		width: 100%;
		background: white;
		border-collapse: collapse;
		.school-name {
			font-size: 30rpx;
			font-weight: bold;
		}
	}
	th {
		background: $backgroundColor;
	}
	th,
	td {
		text-align: left;
		font-size: 24rpx;
		padding: 20rpx 30rpx;
		border-top: 1rpx solid $borderColor;
		border-bottom: 1rpx solid $borderColor;
	}
</style>
