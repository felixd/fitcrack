import{n as d}from"./index.a4521c40.js";import"./vendor.6aa46313.js";var c=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",[t("div",{staticClass:"users mx-auto mb-5"},[t("h2",[e._v("Users")]),t("v-card",[t("v-list",{attrs:{"two-line":""}},[e._l(e.users,function(s,a){return[t("v-list-item",{key:a},[t("v-list-item-content",[t("v-list-item-title",[e._v(" "+e._s(s.username)+" ")]),t("v-list-item-subtitle",[e._v(e._s(s.mail))])],1),t("v-list-item-action",{staticClass:"width150"},[t("v-select",{staticClass:"tinyselect",attrs:{outlined:"","hide-details":"",dense:"","item-text":"name","item-value":"id",items:e.userRoles,label:"Role",value:s.role.id},on:{change:function(r){return e.updateUserRole(r,s.id)}}})],1),t("v-list-item-action",[t("div",{staticClass:"addBtnCont"},[t("v-btn",{staticClass:"addBtn",attrs:{color:"primary",text:""},on:{click:function(r){return e.editUser(s.id)}}},[e._v(" Edit ")])],1)]),t("v-list-item-action",[t("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function(r){var l=r.on;return[t("v-btn",e._g({staticClass:"mx-0",attrs:{icon:""},on:{click:function(o){return e.deleteUser(s.id)}}},l),[t("v-icon",{attrs:{color:"error"}},[e._v(" close ")])],1)]}}],null,!0)},[t("span",[e._v("Delete user")])])],1)],1),a+1<e.users.length?t("v-divider",{key:a+"d"}):e._e()]})],2)],1),t("div",{staticClass:"addBtnCont"},[t("v-btn",{staticClass:"addBtn",attrs:{color:"primary",text:""},on:{click:function(s){e.userDialog=!0}}},[e._v(" Add user ")])],1)],1),t("h2",[e._v("User roles")]),t("div",{staticClass:"roleTable"},[t("v-data-table",{staticClass:"elevation-1 roleTable",attrs:{headers:e.headers,items:e.userRoles,loading:e.loading,"hide-default-footer":"","disable-sort":""},scopedSlots:e._u([{key:"item.MANAGE_USERS",fn:function(s){var a=s.item;return[t("v-checkbox",{attrs:{disabled:a.id==1},on:{change:function(r){return e.roleChange(r,a.id,"MANAGE_USERS")}},model:{value:a.MANAGE_USERS,callback:function(r){e.$set(a,"MANAGE_USERS",r)},expression:"item.MANAGE_USERS"}})]}},{key:"item.ADD_NEW_JOB",fn:function(s){var a=s.item;return[t("v-checkbox",{attrs:{disabled:a.id==1},on:{change:function(r){return e.roleChange(r,a.id,"ADD_NEW_JOB")}},model:{value:a.ADD_NEW_JOB,callback:function(r){e.$set(a,"ADD_NEW_JOB",r)},expression:"item.ADD_NEW_JOB"}})]}},{key:"item.VIEW_ALL_JOBS",fn:function(s){var a=s.item;return[t("v-checkbox",{attrs:{disabled:a.id==1},on:{change:function(r){return e.roleChange(r,a.id,"VIEW_ALL_JOBS")}},model:{value:a.VIEW_ALL_JOBS,callback:function(r){e.$set(a,"VIEW_ALL_JOBS",r)},expression:"item.VIEW_ALL_JOBS"}})]}},{key:"item.EDIT_ALL_JOBS",fn:function(s){var a=s.item;return[t("v-checkbox",{attrs:{disabled:a.id==1},on:{change:function(r){return e.roleChange(r,a.id,"EDIT_ALL_JOBS")}},model:{value:a.EDIT_ALL_JOBS,callback:function(r){e.$set(a,"EDIT_ALL_JOBS",r)},expression:"item.EDIT_ALL_JOBS"}})]}},{key:"item.OPERATE_ALL_JOBS",fn:function(s){var a=s.item;return[t("v-checkbox",{attrs:{disabled:a.id==1},on:{change:function(r){return e.roleChange(r,a.id,"OPERATE_ALL_JOBS")}},model:{value:a.OPERATE_ALL_JOBS,callback:function(r){e.$set(a,"OPERATE_ALL_JOBS",r)},expression:"item.OPERATE_ALL_JOBS"}})]}},{key:"item.UPLOAD_DICTIONARIES",fn:function(s){var a=s.item;return[t("v-checkbox",{attrs:{disabled:a.id==1},on:{change:function(r){return e.roleChange(r,a.id,"UPLOAD_DICTIONARIES")}},model:{value:a.UPLOAD_DICTIONARIES,callback:function(r){e.$set(a,"UPLOAD_DICTIONARIES",r)},expression:"item.UPLOAD_DICTIONARIES"}})]}},{key:"item.id",fn:function(s){var a=s.item;return[t("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function(r){var l=r.on;return[t("v-btn",e._g({directives:[{name:"show",rawName:"v-show",value:a.id>1,expression:"item.id > 1"}],staticClass:"mx-0",attrs:{icon:""},on:{click:function(o){return e.deleteRole(a.id)}}},l),[t("v-icon",{attrs:{color:"error"}},[e._v(" close ")])],1)]}}],null,!0)},[t("span",[e._v("Delete role")])])]}}])}),t("div",{staticClass:"addBtnCont"},[t("v-btn",{staticClass:"addBtn",attrs:{color:"primary",text:""},on:{click:function(s){e.roleDialog=!0}}},[e._v(" Add role ")])],1)],1),t("v-dialog",{attrs:{"max-width":"400px"},model:{value:e.roleDialog,callback:function(s){e.roleDialog=s},expression:"roleDialog"}},[t("v-card",[t("v-card-title",[t("h2",[e._v("Add new user role")])]),t("v-card-text",[t("v-text-field",{attrs:{label:"Role name"},model:{value:e.newRoleName,callback:function(s){e.newRoleName=s},expression:"newRoleName"}})],1),t("v-card-actions",[t("v-spacer"),t("v-btn",{attrs:{color:"primary",text:""},on:{click:function(s){s.stopPropagation(),e.roleDialog=!1}}},[e._v(" Cancel ")]),t("v-btn",{attrs:{color:"primary",text:"",disabled:!e.newRoleName},on:{click:function(s){return s.stopPropagation(),e.addRole.apply(null,arguments)}}},[e._v(" Add ")])],1),e.addingRole?t("div",{staticClass:"loadingOver"},[t("v-progress-circular",{staticClass:"progress",attrs:{size:"50",width:3,indeterminate:"",color:"primary"}})],1):e._e()],1)],1),t("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.editDialog,callback:function(s){e.editDialog=s},expression:"editDialog"}},[t("v-card",[t("v-card-title",[t("h2",[e._v("Edit user")])]),t("v-card-text",[t("p",[e._v(" All fields are optional. Empty fields will be left unchanged. ")]),t("v-form",{ref:"form",attrs:{"lazy-validation":""}},[t("v-text-field",{attrs:{label:"Username",rules:e.usernameRules,counter:10,autocomplete:"off"},model:{value:e.newUsername,callback:function(s){e.newUsername=s},expression:"newUsername"}}),t("v-text-field",{attrs:{label:"E-mail",rules:e.emailRules,autocomplete:"off"},model:{value:e.newEmail,callback:function(s){e.newEmail=s},expression:"newEmail"}}),t("p",[e._v(" Only change user's password if it's absolutely needed, for example if they forgot. Otherwise, you'll lock them out. ")]),t("v-text-field",{attrs:{type:"password",label:"New password",autocomplete:"off"},model:{value:e.newPassword,callback:function(s){e.newPassword=s},expression:"newPassword"}})],1)],1),t("v-card-actions",[t("v-spacer"),t("v-btn",{attrs:{color:"primary",text:""},on:{click:function(s){return s.stopPropagation(),e.editUserCancel.apply(null,arguments)}}},[e._v(" Cancel ")]),t("v-btn",{attrs:{color:"primary",text:""},on:{click:function(s){return s.stopPropagation(),e.editUserConfirm.apply(null,arguments)}}},[e._v(" Edit ")])],1),e.editingUser?t("div",{staticClass:"loadingOver"},[t("v-progress-circular",{staticClass:"progress",attrs:{size:"50",width:3,indeterminate:"",color:"primary"}})],1):e._e()],1)],1),t("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.userDialog,callback:function(s){e.userDialog=s},expression:"userDialog"}},[t("v-card",[t("v-card-title",[t("h2",[e._v("Add new user")])]),t("v-card-text",[t("p",[e._v(" All fields are mandatory. ")]),t("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.validNewUserForm,callback:function(s){e.validNewUserForm=s},expression:"validNewUserForm"}},[t("v-text-field",{attrs:{label:"Username",rules:e.usernameRules,counter:10,required:""},model:{value:e.newUsername,callback:function(s){e.newUsername=s},expression:"newUsername"}}),t("v-text-field",{attrs:{label:"E-mail",rules:e.emailRules,required:""},model:{value:e.newEmail,callback:function(s){e.newEmail=s},expression:"newEmail"}}),t("v-text-field",{attrs:{type:"password",label:"Password",required:""},model:{value:e.newPassword,callback:function(s){e.newPassword=s},expression:"newPassword"}}),t("v-select",{attrs:{label:"User role","item-text":"name","item-value":"id",items:e.userRoles,rules:[function(s){return!!s||"Item is required"}],required:""},model:{value:e.newUserRoleID,callback:function(s){e.newUserRoleID=s},expression:"newUserRoleID"}})],1)],1),t("v-card-actions",[t("v-spacer"),t("v-btn",{attrs:{color:"primary",text:""},on:{click:function(s){s.stopPropagation(),e.userDialog=!1}}},[e._v(" Cancel ")]),t("v-btn",{attrs:{color:"primary",text:"",disabled:!e.validNewUserForm||!e.newUsername||!e.newEmail||!e.newPassword||!e.newUserRoleID},on:{click:function(s){return s.stopPropagation(),e.addUser.apply(null,arguments)}}},[e._v(" Add user ")])],1),e.addingUser?t("div",{staticClass:"loadingOver"},[t("v-progress-circular",{staticClass:"progress",attrs:{size:"50",width:3,indeterminate:"",color:"primary"}})],1):e._e()],1)],1)],1)},u=[];const v={name:"UsersView",data:function(){return{newRoleName:null,addingRole:!1,roleDialog:!1,newPassword:null,newUsername:null,newEmail:null,newUserRoleID:null,editingUser:!1,editingUserId:null,editDialog:!1,addingUser:!1,userDialog:!1,users:[],totalItems:0,pagination:{},loading:!0,headers:[{text:"Name",align:"start",value:"name"},{text:"Manage users",value:"MANAGE_USERS",align:"start"},{text:"Add new job",value:"ADD_NEW_JOB",align:"start"},{text:"View all jobs",value:"VIEW_ALL_JOBS",align:"start"},{text:"Edit all jobs",value:"EDIT_ALL_JOBS",align:"start"},{text:"Operate all jobs",value:"OPERATE_ALL_JOBS",align:"start"},{text:"Add new dictionaries",value:"UPLOAD_DICTIONARIES",align:"start"},{text:"",value:"id",align:"end"}],userRoles:[],validEditUserForm:!0,validNewUserForm:!0,emailRules:[e=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e)],usernameRules:[e=>/^\w+.*$/.test(e)]}},created:function(){this.loadUsers(),this.loadRoles()},methods:{loadUsers(){this.axios.get(this.$serverAddr+"/user/").then(e=>{this.users=e.data.items})},loadRoles(){this.loading=!0,this.axios.get(this.$serverAddr+"/user/role").then(e=>{this.userRoles=e.data.items,this.loading=!1})},updateUserRole(e,i){this.axios.post(this.$serverAddr+"/user/role",{user_id:i,role_id:e}).then(t=>{this.$store.dispatch("refreshUser"),this.$store.dispatch("binInterface/load"),console.log(t.data),console.log("user role changed")})},roleChange(e,i,t){this.axios.post(this.$serverAddr+"/user/role/"+i,{key:t,value:e}).then(s=>{this.$store.dispatch("refreshUser"),this.$store.dispatch("binInterface/load"),console.log(s.data),console.log("user role changed")})},addRole(){this.addingRole=!0,this.axios.post(this.$serverAddr+"/user/role/new",{name:this.newRoleName}).then(e=>{console.log(e.data),this.loadRoles(),this.roleDialog=!1,this.newRoleName="",this.addingRole=!1})},deleteRole(e){this.axios.delete(this.$serverAddr+"/user/role/"+e).then(i=>{console.log(i.data),this.loadRoles()})},addUser(){this.addingUser=!0,this.axios.post(this.$serverAddr+"/user/",{username:this.newUsername,mail:this.newEmail,password:this.newPassword,role_id:this.newUserRoleID}).then(e=>{console.log(e.data),this.loadUsers(),this.userDialog=!1,this.addingUser=!1,this.newUsername="",this.newEmail="",this.newPassword="",this.newUserRoleID=""})},editUser(e){this.editDialog=!0,this.editingUserId=e},editUserCancel(){this.editDialog=!1,this.editingUserId=null},async editUserConfirm(){const e=a=>/^\s*$/.test(a)?null:a;this.editingUser=!0;const i=e(this.newUsername),t=e(this.newEmail),s=e(this.newPassword);await this.axios.patch(this.$serverAddr+"/user/"+this.editingUserId,{username:i,mail:t,password:s}),this.editingUser=!1,this.editDialog=!1,this.newUsername="",this.newEmail="",this.newPassword="",this.loadUsers()},deleteUser(e){this.axios.delete(this.$serverAddr+"/user/"+e).then(i=>{console.log(i.data),this.loadUsers()})}}},n={};var m=d(v,c,u,!1,h,"40984542",null,null);function h(e){for(let i in n)this[i]=n[i]}var p=function(){return m.exports}();export{p as default};
