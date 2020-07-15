<template>
  <div class="amap-page-container">
		<el-amap-search-box
      class="search-box"
      :search-option="searchOption"
      :on-search-result="onSearchResult"
    ></el-amap-search-box>

    <div :style="mapSize">
      <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
      </el-amap>
    </div>
		<el-amap
      vid="amap"
      class="amap-demo"
		  :events="events"
      :plugin="plugin"
      :center="center"
      :zoom="zoom"
      :mapStyle="mapStyle"
    >
      <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" :events="marker.events" ></el-amap-marker>
    </el-amap>

    <div class="toolbar" style="display:none;">
      <span v-if="loaded">position: [{{ lng }}, {{ lat }}] address: {{ address }}</span>
      <span v-else>正在定位</span>
    </div>
  </div>
</template>

<script>
import VueAMap from 'vue-amap'
let amapManager = new VueAMap.AMapManager();
export default {
  data(){
		const self = this;
			return {
				mapSize: {
					width:true,
					height: true
				},
				markers: [
					{
						position: [121.59996, 31.197646],
						events: {
							click: (e)=>{
								// alert('icon clikc me');
							}
						}
					}
				],
				searchOption: {
					city: "西安 ",
					citylimit: true
				},
				header_title: "选择地址",
				zoom: 16,
				mapStyle: "amap://styles/8b6be8ec497009e17a708205348b899a", //设置地图样式
				center: [121.59996, 31.197646],
				events: {
					init: (o) => {
              console.log(o.getCenter())
              // console.log(this.$refs.map.$getInstance())
              o.getCity(result => {
                console.log(result)
              })
            },
            'moveend': () => {

            },
            'zoomchange': () => {
							
            },
            'click': (e) => {
							console.log(e)
							let lng = e.lnglat.lng;
							let lat = e.lnglat.lat;
							this.getData(lng,lat);
            }
				},
				address: "",
				lng: 0,
				lat: 0,
				loaded: false,
				plugin: [
					{
						pName: 'ToolBar',//工具条插件
						position:'RT',
					},
					{
						pName:'Scale',
						position: 'RB',
						events: {
							init(instance) {
								// console.log(instance);
							}
						}
        	},
					{
						pName: "Geolocation",
						events: {
							init(o) {
								// o 是高德地图定位插件实例
								o.getCurrentPosition((status, result) => {
									if (result && result.position) {
										self.lng = result.position.lng;
                    self.lat = result.position.lat;
                    self.center = [self.lng, self.lat];
                    self.loaded = true;
                    self.$nextTick();
									}
								});
							}
						}
					}
				]
		}
	},
	mounted() {
    var h = document.documentElement.clientHeight;
    $(".map_group").css("height", `${h * 0.93}px`);
  },
  created() {
    this.selfMainLoadOpend();
    this.$store.commit("setHeaderStyle", {
      txt: this.header_title,
      type: 1
    });
		this.init();
		this.autoMapHeight();
		this.defaultCenten();
  },
	methods: {
		autoMapHeight() {
			this.mapSize.width = "100%";
			this.mapSize.height = (document.body.clientHeight-(46.69+50))+"px";
		},
		init() {
      // this.getData();
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    },
    addMarker: function() {
      let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
      let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
      this.markers[0].position.push([lng, lat]);
		},
		onSearchResult(pois) {
			let latSum = 0;
			let lngSum = 0;
			//posi.length>0 add marker
      if (pois.length > 0) {
        // pois.forEach(poi => {	
				// 	let { lng, lat } = poi;
          // lngSum += lng;
					// latSum += lat;
					// let marker = {
					// 	position: [poi.lng, poi.lat],
					// 	events: {
					// 		//点坐标events
					// 		click: (e)=>{
					// 			alert(`lng:${e.lnglat.lng} lat:${e.lnglat.lat}`);
					// 			let lng = e.lnglat.lng;
					// 			let lat = e.lnglat.lat;
					// 			this.getData(lng,lat);
					// 		}
					// 	}
					// };
					// this.markers.push(marker);
        // });
        let center = {
          lng: pois[0].lng,
          lat: pois[0].lat
				};
				this.center = [center.lng, center.lat];
			}
		},
		getData(lonVal,latVal) {
			let url = 'Tools-getAddressInfo';
			let params = {
				token:this.getToken(),
				lon: lonVal,
				lat: latVal
			}
			this.__initAction(url,params,(res,s)=>{
				if(s == 1){
					console.log(res.data);
					let address = res.data.addressinfo;
					let lnglat = {};
					lnglat.lng = res.data.location.lng;
					lnglat.lat = res.data.location.lat;
					var info = this.getSelectData();
          if (!info) {
            info = {};
          }
          if (!info.type) {
            info.type = {};
					}
          info.select_addr = {};
          info.select_addr.addr = address;
          info.select_addr.point = lnglat;
					this.setCache("select_data", JSON.stringify(info));
          setTimeout(() => {
            window.history.go(-1);
          }, 300);
				}
			})
		},
		defaultCenten() { //默认初始定位
			let address = this.getCache("location");
			address = JSON.parse(address);
			let lng,lat;
			lng = address.lon;
			lat = address.lat;
			this.center[0] = lng;
			this.center[1] = lat;
			// this.markers[0].position[0] = lng;
			// this.markers[0].position[1] = lat;
		}
	}
}
</script>

<style scoped lang="scss">
.search-box{
	width: 100%; 
}
div.amap-touch-toolbar .amap-zoomcontrol{
	width:50px;
}
</style>
