<template>
<ul class="resume_card_plate">
	<li class="item_title">
		<span class="item_img pt-2">
			<img :src="data.logo?data.logo:data.portrait" alt>
		</span>
		<div class="items_detail">
			<div class="item_explain p-2">
				<span class="fm-1 fc-dark fw-6">{{data.name?data.name:data.consignee}}</span>
				<span class="item_exp fc-gray fs-3 fw-5 ml-2">{{data.experience?data.experience:data.Working+"年"}}</span>
				<span class="item_exp fc-gray fs-3 fw-5 ml-2">{{data.education?data.education:data.education}}</span>
			</div>
			<span class="p-2 fc-dark fs-3 fw-4">{{data.post?data.post:data.resumeIndustry}}</span>
		</div>
		<span class="item_salary fs-3 fc-red fw-6 pt-2">{{data.salary?data.salary:data.salary}}</span>
	</li>
	<li>
		<span class="fs-3 fc-gray fw-4">{{data.detail?data.detail:data.infos}}</span>
	</li>
	<li class="item_mark">
		<div class="item_view">
			<span class="iconfont icon-eye fc-gray fs-3 fw-5 mr-2"></span>
			<span class="fs-3 fc-gray fw-5">{{data.hot?data.hot:data.view}}</span>
		</div>
		<span class="fs-3 fc-gray fw-5">{{data.time?data.time:data.create_time}}</span>
	</li>
</ul>
</template>
<script>
export default {
	data() {
		return {};
	},
	props: ["data"]
};
</script>
<style lang="scss">
	.resume_card_plate {
		list-style: none;
		width: 100%;
		li {
			width: 100%;
			padding: 3px 0;
		}
		.item_title {
			display: flex;
			align-items: flex-start;
			flex-wrap: nowrap;
			.item_img {
				padding: 3px;
				img {
					width: 50px;
					height: 50px;
					border-radius: 50%;
				}
			}
			.items_detail {
				width: 100%;
				display: flex;
				flex-direction: column;
				.item_explain {
					display: flex;
					align-items: center;
				}
			}
		}
		.item_mark {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 8px;
			border-top: 1px solid #dbdbdb;
			.item_view {
					display: flex;
					align-items: center;
			}
		}
	}
</style>
