<template>
	<div class="info_card_component w-100">
		<div class="card_left">
			<img class="info_logo" :src="data.logo?data.logo:data.portrait" alt>
		</div>
		<div class="card_right w-100">
			<ul class="card_info_list w-100">
				<li class="info_title">
					<span class="fc-dark fw-6 fm-1">{{data.title}}</span>
				</li>
				<li class="info_explain">
					<div class="explain_left">
						<span class="fs-3 mr-3 fc-gray">{{data.name?data.name:data.lastName}}</span>
						<span class="iconfont fm-3 fw-6" :class="data.type==1?'icon-renzheng fc-green ':data==2?'icon-3qiyezhengxin83a638 fc-blue':''"></span>
					</div>
					<div class="explain_right">
						<span class="fc-red fw-6 fm-1">¥</span>
						<span class="item_salary fc-red fw-6 fm-1">{{data.salary?data.salary:data.serviceDatd}}</span>
					</div>
				</li>
				<li class="info_detail">
					<span class="fs-3 fc-dark fw-4">{{data.detail?data.detail:data.infos}}</span>
				</li>
				<li class="info_imgs">
					<div class="img_group w-100">
						<span class="img" v-for="(item,i) in (data.imgs?data.imgs:data.images)" :key="i">
							<img class="" :src="item" alt>
						</span>
					</div>
				</li>
				<li class="info_mark">
					<div>
						<span class="iconfont icon-eye mr-1 fs-3 fc-gray fw-5"></span>
						<span class="fs-3 fc-gray fw-5">{{data.hot?data.hot:data.view}}</span>
					</div>
					<div>
						<span class="iconfont icon-dingwei fs-3 fc-gray fw-5 mr-1"></span>
						<span class="fs-3 fc-gray fw-5">{{data.distance>0?data.distance +'m':"距你很近..."}}</span>
					</div>
					<div>
						<span class="fs-3 fc-gray fw-5">{{data.time?data.time:data.create_time}}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	created() {},
	props: ["data"]
};
</script>
<style lang="scss">
	.info_card_component {
		// padding: 5px 10px;
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-end;
		.card_left {
			padding: 0 3px;
			display: flex;
			justify-content: center;
			.info_logo {
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}
		}
		.card_right {
			padding: 0 5px;
			.card_info_list {
				list-style: none;
				li {
					width: 100%;
					padding: 3px 0;
				}
				.info_explain {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.img_group {
					display: flex;
					flex-wrap: wrap;
					.img {
						width: 5rem;
						height: 5rem;
						padding: 3px;
						img {
							width: 100%;
							height: 100%;
						}
					}
				}
				.info_mark {
					border-top: 1px solid #dbdbdb;
					display: flex;
					justify-content: space-between;
					justify-items: center;
				}
			}
		}
	}
</style>
