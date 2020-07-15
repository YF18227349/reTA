<template>
<div class="modal_frame_group">
	<div class="modal_plate w-100" :class="modalShow ?'modal_plate_show':'modal_plate_hid'" @click="click1" v-if="modalCode"></div>
	<div class="modal_container w-100" :class="modalShow ?'modal_up' : 'modal_down'">
		<ul class="data_list w-100 bg-white" :style="autoHeight">
			<li class="list_item w-100" v-for="(tmp,i) in dataList" :key="i">
				<self-line-item href="javascript:;" class="modal_items" @callBack="click(tmp.value,tmp.id)" :value="tmp.value">
					<img :src="tmp.logo" alt class="modal_logo mr-3" v-if="tmp.logo">
					<span class="fm-1 fc-blue fw-6">{{tmp.value}}</span>
				</self-line-item>
			</li>
		</ul>
		<!-- <a href="javascript:;" class="cancel_btn w-100 bg-white" @click.stop="click1">
			<span class="fm-2 fw-7 fc-blue">取消</span>
		</a> -->
	</div>
</div>
</template>
<script>
const CellItem = ()=>import("../../components/sub/cell_arrow_item");
const LineItem = ()=>import("../../components/sub/line_item");
export default {
	data() {
		return {
			value: "",
			id: '',
			autoHeight: {
				height: true,
				overflow: true
			}
		};
	},
	created() {
		this.modalShow = false;
		this.autoSizeModel()
	},
	updated() {
		this.autoSizeModel()
	},
	methods: {
		autoSizeModel() {
			var len = this.dataList.length;
			if (len <= 4) {
				this.autoHeight.height = "auto";
				this.autoHeight.overflow = "hidden";
			} else {
				this.autoHeight.height = "13.5rem";
				this.autoHeight.overflow = "auto";
			}
		},
		click1() {
			this.$emit("callBack");
		},
		click(value, id) {
			this.value = value;
			this.id = id;
			var opt = {value, id};
			this.$emit("callBack", opt);
		}
	},
	computed: {
		modalCode() {
			if (this.code) {
				return this.code;
			} else {
				return this.modalShow;
			}
		}
	},
	props: ["dataList", "modalShow", "code"],
	components: {
		"self-cell-item": CellItem, //2:注册子组件
		"self-line-item": LineItem
	}
};
</script>
<style lang="scss">
	.modal_container {
		width: 100%;
		position: fixed;
		z-index: 10001;
		transition: all 0.5s;
		// padding: 10px;
		.modal_items {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.modal_logo {
		width: 25px;
		height: 25px;
		// border-radius: 50%;
	}
	.data_list {
		list-style: none;
		border-radius: 5px;
		overflow: hidden;
		margin-bottom: 0;
		.list_item {
			padding: 5px;
		}

		.list_item:not(:last-child) {
			border-bottom: 1px solid #e7e7e7;
		}
	}
</style>
