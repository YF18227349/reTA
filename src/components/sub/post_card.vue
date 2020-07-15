<template>
	<ul class="post_card_plate">
		<li class="item_title">
			<span class="fm-1 fc-dark fw-7">{{data.title}}</span>
			<span class="fc-red fw-6 fm-1">{{data.salary?data.salary:data.prices}}</span>
		</li>
		<li class="item_name">
			<span class="fs-3 fw-7 fc-dark">{{data.name?data.name:data.lastName}}</span>
		</li>
		<li class="item_addr">
			<span class="fs-3 fw-6 fc-gray">{{data.addr?data.addr:data.addressInfo}}</span>
		</li>
		<li class="item_explain mb-2">
			<span class="fs-3 fw-6 fc-gray pt-1 pb-1 pl-3 pr-3 bg-gray">{{data.experience?data.experience:data.exp}}</span>
			<span class="fs-3 fw-6 fc-gray pt-1 pb-1 pl-3 pr-3 bg-gray">{{data.education?data.education:data.education}}</span>
		</li>
		<li class="item_info">
			<div class="infos">
				<img v-if="data.logo" :src="data.logo?data.logo:data.portrait" alt>
				<span class="ml-2 fs-3 fw-5 fc-gray">{{data.position}}</span>
			</div>
			<div class="info_view">
				<span class="iconfont icon-eye fc-gray fs-3 fw-5"></span>
				<span class="fs-3 fc-gray fw-5">{{data.hot?data.hot:data.view}}</span>
			</div>
			<div>
				<span class="fs-3 fc-gray fw-5">{{data.time?data.time:data.create_time}}</span>
			</div>
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
	.post_card_plate {
		list-style: none;
		width: 100%;
		li {
			width: 100%;
			padding: 4px 0;
		}
		.item_explain,
		.item_info,
		.item_title {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.item_info {
			border-top: 1px solid #dbdbdb;
			.infos {
				display: flex;
				align-items: center;
				padding: 8px 0 0;
				img {
					width: 35px;
					height: 35px;
					border-radius: 50%;
				}
			}
		}
		.item_btns{}
	}
</style>
