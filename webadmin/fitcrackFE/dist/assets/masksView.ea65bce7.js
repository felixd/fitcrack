import{t as l}from"./fc_tile.d91a8612.js";import{F as d}from"./fileUploader.454c7e93.js";import{n as m}from"./index.91fa3596.js";import"./vendor.6aa46313.js";var u=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("v-container",{staticClass:"max500"},[e("fc-tile",{staticClass:"ma-2",attrs:{title:"Mask sets",icon:t.$route.meta.icon}},[e("v-alert",{staticClass:"mb-0",attrs:{tile:"",text:"",type:"warning"}},[t._v(" Mask files must have a .txt or .hcmask extension. ")]),e("v-data-table",{attrs:{headers:t.headers,items:t.masks.items,loading:t.loading,"footer-props":{itemsPerPageOptions:[10,25,50],itemsPerPageText:"Masks per page"}},scopedSlots:t._u([{key:"item.name",fn:function(n){var a=n.item;return[e("router-link",{attrs:{to:"masks/"+a.id}},[t._v(" "+t._s(a.name)+" ")])]}},{key:"item.time",fn:function(n){var a=n.item;return[t._v(" "+t._s(t.$moment.utc(a.time).local().format("DD.MM.YYYY HH:mm"))+" ")]}},{key:"item.actions",fn:function(n){var a=n.item;return[e("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(o){var r=o.on;return[e("a",t._g({attrs:{href:t.$serverAddr+"/masks/"+a.id+"/download",target:"_blank",download:""}},r),[e("v-btn",{attrs:{icon:""}},[e("v-icon",[t._v("mdi-file-download-outline")])],1)],1)]}}],null,!0)},[e("span",[t._v("Download")])]),e("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(o){var r=o.on;return[e("v-btn",t._g({attrs:{icon:""},on:{click:function(p){return t.deleteMask(a)}}},r),[e("v-icon",{attrs:{color:"error"}},[t._v(" mdi-delete-outline ")])],1)]}}],null,!0)},[e("span",[t._v("Delete")])])]}}])}),e("v-divider"),e("file-uploader",{attrs:{url:this.$serverAddr+"/masks/add"},on:{uploadComplete:t.loadMasks}})],1)],1)},c=[];const v={name:"MasksView",components:{FileUploader:d,"fc-tile":l},data:function(){return{loading:!1,masks:[],headers:[{text:"Name",align:"start",value:"name"},{text:"Added",value:"time",align:"end"},{text:"Actions",value:"actions",align:"end",sortable:!1}]}},mounted:function(){this.loadMasks()},methods:{loadMasks:function(){this.loading=!0,this.axios.get(this.$serverAddr+"/masks",{}).then(t=>{this.masks=t.data,this.loading=!1})},deleteMask:function(t){this.$root.$confirm("Delete",`This will remove ${t.name} from your masks. Are you sure?`).then(s=>{this.loading=!0,this.axios.delete(this.$serverAddr+"/masks/"+t.id).then(e=>{this.loadMasks()})})}}},i={};var _=m(v,u,c,!1,f,"6caa3144",null,null);function f(t){for(let s in i)this[s]=i[s]}var y=function(){return _.exports}();export{y as default};
