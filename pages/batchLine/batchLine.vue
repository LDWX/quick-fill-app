<template>
	<view class="page">
		<quick-menus></quick-menus>
		<view class="container">
			<table class="table-wrapper">
				<thead>
					<tr>
						<th>省份</th>
						<th>年份</th>
						<th>本科一批</th>
						<th>本科二批</th>						
						<th>本科三批</th>
						<th>专科线</th>
						<th>学科</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item of lineList">
						<td>{{item.province}}</td>
						<td>{{item.year}}</td>
						<td>{{item.bkypBatch}}</td>
						<td>{{item.bkepBatch}}</td>
						<td>{{item.bkspBatch}}</td>
						<td>{{item.zkypBatch}}</td>
						<td>{{item.subject == "0" ? "理科" : "文科"}}</td>
					</tr>
				</tbody>
			</table>
		</view>
		<message-component v-if="showMessage" v-bind:showMessage.sync="showMessage" :code="statusCode"></message-component>
	</view>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				lineList: [],
				showMessage: false,
				statusCode: ""
			}
		},
		computed: {
			...mapState("auth", {
				token: state => state.token
			})
		},
		methods: {
			queryBatchLine() {
				uni.request({
					url: this.apiHost + "/common/auth/user/batchline",
					method: "GET",
					header: {
						Cookie: this.token
					},
					success: res => {
						if (res.statusCode == 200) {
							this.lineList = res.data
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("batchline >> queryBatchLine res::: ", res)
					}
					
				})
			}
		},
		onLoad() {
			this.queryBatchLine()
		}
	}
</script>

<style lang="scss">
	@import "@/assets/scss/common.scss";
	$fontColor: #999999;
	
	$backgroundColor: #e7e7e7;
	$activeBackground: #d3d3d3;
	$borderColor: rgba(0,0,0,.1);
	
	$primaryColor: #007AFF;
	.container {
		width: 100%;
		overflow: auto;
		margin-bottom: 20rpx;
	}
	.table-wrapper {
		position: relative;
		width: auto;
		text-align: center;
		color: $fontColor;
		border-collapse: collapse;
		
		th,
		td {
			padding: 15rpx 25rpx;
			border: 1rpx solid $borderColor;
		}
		
		th {
			min-width: 150rpx;
			color: black;
			font-size: 35rpx;
			font-weight: bold;
			background: $backgroundColor;
			
			&:nth-child(3),
			&:nth-child(4),
			&:nth-child(5),
			&:nth-child(6){
				min-width: 190rpx;
			}
		}
		
		td {
			font-size: 30rpx;
		}	
	
	}
</style>
