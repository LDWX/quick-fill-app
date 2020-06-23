<template>
	<view class="page">
		<quick-menus></quick-menus>
		<score-info></score-info>
		<view class="container">			
			<table class="table-wrapper">
				<thead>
					<tr>
						<th v-for="name in schoolNameList">{{ name }}</th>
					</tr>
				</thead>
				<tbody>
					
					<tr>
						<td v-for="p in province">{{ p }}</td>
					</tr>
					<tr>
						<td v-for="found in foundingYear">{{ found }}&nbsp;年</td>
					</tr>
					<tr>
						<td v-for="level in levelList">{{ level }}</td>
					</tr>
					<tr>
						<td v-for="is985 in is985List">{{ is985 }}</td>
					</tr>
					<tr>
						<td v-for="is211 in is211List">{{ is211 }}</td>
					</tr>
					<tr>
						<td v-for="is11 in is11List">{{ is11 }}</td>
					</tr>
					<tr>
						<td v-for="(student, index) in studentCntList">{{ student }}
							<text v-show="index">人</text>						
						</td>
					</tr>
					<tr>
						<td v-for="master in masterDegreeCntList">{{ master }}&nbsp;个</td>
					</tr>
					<tr>
						<td v-for="doctor in doctorDegreeCunList">{{ doctor }}&nbsp;个</td>
					</tr>
					<tr>
						<td v-for="recent in recentYear">{{ recent }}&nbsp;年</td>
					</tr>
					<tr>
						<td v-for="rank in lowestRank">{{ rank }}&nbsp;名</td>
					</tr>
					<tr>
						<td v-for="property in runPropertyList">{{ property }}</td>
					</tr>
					<tr>
						<td v-for="type in schoolTypeList">{{ type }}</td>
					</tr>
				</tbody>
			</table>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schoolList: [],
				schoolNameList: ["学校"],
				levelList: ["本科/专科"],
				is985List: [985],
				is211List: [211],
				is11List: ["双一流"],
				runPropertyList: ["办学性质"],
				schoolTypeList: ["学校类型"],
				studentCntList: ["学生人数"],
				masterDegreeCntList: ["硕士点"],
				doctorDegreeCunList: ["博士点"],
				recentYear: ["最近招生年份"],
				lowestRank: ["最低排名"],
				province: ["湖北"],
				foundingYear: ["成立年份"]
				
			}
		},
		onLoad() {
			this.schoolList = this.$Route.query.schoolList
			if (this.schoolList.length > 1) {				
				this.schoolList.forEach( item => {
					this.schoolNameList.push(item.schoolInfo.name)
					this.levelList.push(item.schoolInfo.level == 0 ? "本科" : "专科")
					this.is985List.push(+item.schoolInfo.is985 ? "是" : "否")
					this.is211List.push(+item.schoolInfo.is211 ? "是" : "否")
					this.is11List.push(+item.schoolInfo.is11 ? "是" : "否")
					this.runPropertyList.push(item.schoolInfo.runProperty)
					this.schoolTypeList.push(item.schoolInfo.schoolType)
					this.studentCntList.push(item.schoolInfo.studentCnt)
					this.masterDegreeCntList.push(item.schoolInfo.masterDegreeCnt)
					this.doctorDegreeCunList.push(item.schoolInfo.doctorDegreeCnt)
					this.recentYear.push(item.schoolInfo.year)
					this.lowestRank.push(item.schoolInfo.lowestRank)
					this.province.push(item.schoolInfo.province)
					this.foundingYear.push(item.schoolInfo.foundingYear)
				})
			}
			console.log("compareList >> created >> schoolList::: ", this.schoolList)
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
			min-width: 350rpx;
			color: black;
			font-size: 35rpx;
			font-weight: bold;
			background: $backgroundColor;
			
			&:first-child {
				min-width: 230rpx;
			}
		}
		
		td {
			font-size: 30rpx;
		}
		
	
	}
</style>
