import{f as l}from"./numberFormat.773889d3.js";import{t as c}from"./fc_tile.aeb1d8c0.js";import{f as d}from"./fileCreator.d1707a53.js";import{n as f}from"./index.e2e1029e.js";import"./dictionarySelector.e537c1e3.js";import"./selectorMixin.c565e8b6.js";import"./fileUploader.4a23df87.js";import"./vendor.6aa46313.js";var m=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("v-container",{staticClass:"max700"},[t("fc-tile",{staticClass:"ma-2",attrs:{title:"PCFGs",icon:e.$route.meta.icon}},[t("v-alert",{staticClass:"mb-0",attrs:{tile:"",text:"",type:"warning"}},[e._v(" PCFG files must have a .zip extension. ")]),t("v-data-table",{attrs:{headers:e.headers,items:e.pcfg.items,loading:e.loading,"footer-props":{itemsPerPageOptions:[10,25,50],itemsPerPageText:"PCFGs per page"}},scopedSlots:e._u([{key:"item.name",fn:function(i){var a=i.item,o=a.id,n=a.name;return[t("router-link",{staticClass:"font-weight-bold",attrs:{to:{name:"pcfgBrowser",params:{id:o}}}},[e._v(" "+e._s(n)+" ")])]}},{key:"item.keyspace",fn:function(i){var a=i.item;return[e._v(" "+e._s(e.fmt(a.keyspace))+" ")]}},{key:"item.time_added",fn:function(i){var a=i.item;return[e._v(" "+e._s(e.$moment(a.time_added).format("DD.MM.YYYY HH:mm"))+" ")]}},{key:"item.actions",fn:function(i){var a=i.item;return[t("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function(o){var n=o.on;return[t("a",e._g({attrs:{href:e.$serverAddr+"/pcfg/"+a.id,target:"_blank",download:""}},n),[t("v-btn",{attrs:{icon:""}},[t("v-icon",[e._v("mdi-file-download-outline")])],1)],1)]}}],null,!0)},[t("span",[e._v("Download")])]),t("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function(o){var n=o.on;return[t("v-btn",e._g({attrs:{icon:""},on:{click:function(_){return e.deletePcfg(a)}}},n),[t("v-icon",{attrs:{color:"error"}},[e._v(" mdi-delete-outline ")])],1)]}}],null,!0)},[t("span",[e._v("Delete")])])]}}])}),t("div",{staticClass:"text-right pa-3"},[t("v-btn",{staticClass:"d-inline-block",attrs:{color:"primary",outlined:""},nativeOn:{click:function(i){i.stopPropagation(),e.dialog=!0}}},[e._v(" Add new ")])],1)],1),t("file-creator",{attrs:{title:"Add new PCFG grammar","upload-url":this.$serverAddr+"/pcfg/add",working:e.working},on:{fileUploaded:e.loadPcfg,dictionarySelected:e.makePcfgFromDictionary},model:{value:e.dialog,callback:function(i){e.dialog=i},expression:"dialog"}})],1)},u=[];const p={name:"PcfgView",components:{fileCreator:d,"fc-tile":c},data:function(){return{working:!1,dialog:!1,loading:!1,headers:[{text:"Name",align:"left",value:"name"},{text:"Keyspace",value:"keyspace",align:"start"},{text:"Added",value:"time_added",align:"end"},{text:"Actions",value:"actions",align:"end",sortable:!1}],pcfg:[]}},mounted:function(){this.loadPcfg()},methods:{fmt:l,loadPcfg:function(){this.loading=!0,this.axios.get(this.$serverAddr+"/pcfg",{}).then(e=>{this.pcfg=e.data,this.loading=!1})},makePcfgFromDictionary:function(e,r){this.working=!0,this.axios.post(this.$serverAddr+"/pcfg/makeFromDictionary",{dictionary_id:e,name:r}).then(t=>{this.working=!1,this.dialog=!1,this.loadPcfg()}).catch(t=>{this.working=!1})},deletePcfg:function(e){this.$root.$confirm("Delete",`This will remove ${e.name} from your PCFGs. Are you sure?`).then(r=>{this.loading=!0,this.axios.delete(this.$serverAddr+"/pcfg/"+e.id).then(t=>{this.loadPcfg()})})}}},s={};var v=f(p,m,u,!1,g,"fa725fc8",null,null);function g(e){for(let r in s)this[r]=s[r]}var $=function(){return v.exports}();export{$ as default};
