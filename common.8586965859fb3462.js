"use strict";(self.webpackChunkgrade_scope_istic=self.webpackChunkgrade_scope_istic||[]).push([[592],{74218:(h,l,n)=>{n.d(l,{gK:()=>e,aW:()=>_,jo:()=>r,_l:()=>a});const e=20,_="asc",r="desc",a="sort"},64405:(h,l,n)=>{n.d(l,{o:()=>o});var e=n(96037),_=n(95929),r=n(17218),a=n(5e3),s=n(40520),u=n(81082);let o=(()=>{class i{constructor(t,c){this.http=t,this.applicationConfigService=c,this.resourceUrl=this.applicationConfigService.getEndpointFor("api/student-responses")}create(t){return this.http.post(this.resourceUrl,t,{observe:"response"})}update(t){return this.http.put(`${this.resourceUrl}`,t,{observe:"response"})}partialUpdate(t){return this.http.patch(`${this.resourceUrl}/${(0,r.A)(t)}`,t,{observe:"response"})}find(t){return this.http.get(`${this.resourceUrl}/${t}`,{observe:"response"})}query(t){const c=(0,_.b)(t);return this.http.get(this.resourceUrl,{params:c,observe:"response"})}delete(t){return this.http.delete(`${this.resourceUrl}/${t}`,{observe:"response"})}addStudentResponseToCollectionIfMissing(t,...c){const p=c.filter(e.E);if(p.length>0){const g=t.map(C=>(0,r.A)(C));return[...p.filter(C=>{const f=(0,r.A)(C);return null!=f&&!g.includes(f)&&(g.push(f),!0)}),...t]}return t}}return i.\u0275fac=function(t){return new(t||i)(a.LFG(s.eN),a.LFG(u.y))},i.\u0275prov=a.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})()},17218:(h,l,n)=>{n.d(l,{g:()=>e,A:()=>_});class e{constructor(a,s,u,o,i,d,t){this.id=a,this.note=s,this.comments=u,this.questionNumero=o,this.questionId=i,this.sheetName=d,this.sheetId=t}}function _(r){return r.id}},39003:(h,l,n)=>{n.d(l,{w:()=>o});var e=n(5e3),_=n(54728),r=n(69808),a=n(73357);function s(i,d){if(1&i){const t=e.EpF();e.TgZ(0,"ngb-alert",4),e.NdJ("closed",function(){e.CHM(t);const p=e.oxw().$implicit;return e.oxw().close(p)}),e._uU(1,"\n      "),e._UZ(2,"pre",5),e._uU(3,"\n    "),e.qZA()}if(2&i){const t=e.oxw().$implicit;e.Q6J("type",t.type),e.xp6(2),e.Q6J("innerHTML",t.message,e.oJD)}}function u(i,d){if(1&i&&(e.TgZ(0,"div",2),e._uU(1,"\n    "),e.YNc(2,s,4,2,"ngb-alert",3),e._uU(3,"\n  "),e.qZA()),2&i){const t=d.$implicit,c=e.oxw();e.Q6J("ngClass",c.setClasses(t)),e.xp6(2),e.Q6J("ngIf",t.message)}}let o=(()=>{class i{constructor(t){this.alertService=t,this.alerts=[]}ngOnInit(){this.alerts=this.alertService.get()}setClasses(t){const c={"jhi-toast":Boolean(t.toast)};return t.position?Object.assign(Object.assign({},c),{[t.position]:!0}):c}ngOnDestroy(){this.alertService.clear()}close(t){var c;null===(c=t.close)||void 0===c||c.call(t,this.alerts)}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(_.c))},i.\u0275cmp=e.Xpm({type:i,selectors:[["jhi-alert"]],decls:5,vars:1,consts:[["role","alert",1,"alerts"],[3,"ngClass",4,"ngFor","ngForOf"],[3,"ngClass"],[3,"type","closed",4,"ngIf"],[3,"type","closed"],[3,"innerHTML"]],template:function(t,c){1&t&&(e.TgZ(0,"div",0),e._uU(1,"\n  "),e.YNc(2,u,4,2,"div",1),e._uU(3,"\n"),e.qZA(),e._uU(4,"\n")),2&t&&(e.xp6(2),e.Q6J("ngForOf",c.alerts))},directives:[r.sg,r.mk,r.O5,a.xm],encapsulation:2}),i})()},18133:(h,l,n)=>{n.d(l,{N:()=>a});var e=n(5e3),_=n(41995);const r=function(s,u,o){return{first:s,second:u,total:o}};let a=(()=>{class s{set params(o){o.page&&void 0!==o.totalItems&&o.itemsPerPage?(this.first=(o.page-1)*o.itemsPerPage+1,this.second=o.page*o.itemsPerPage<o.totalItems?o.page*o.itemsPerPage:o.totalItems):(this.first=void 0,this.second=void 0),this.total=o.totalItems}}return s.\u0275fac=function(o){return new(o||s)},s.\u0275cmp=e.Xpm({type:s,selectors:[["jhi-item-count"]],inputs:{params:"params"},decls:3,vars:5,consts:[["jhiTranslate","global.item-count",3,"translateValues"]],template:function(o,i){1&o&&(e._uU(0," "),e._UZ(1,"div",0),e._uU(2," ")),2&o&&(e.xp6(1),e.Q6J("translateValues",e.kEZ(1,r,i.first,i.second,i.total)))},directives:[_.P],encapsulation:2}),s})()},1408:(h,l,n)=>{n.d(l,{T:()=>o});var e=n(77579),_=n(82722),r=n(49444),a=n(90801),s=n(5e3),u=n(31427);let o=(()=>{class i{constructor(t){this.sort=t,this.sortIcon=a.CmM,this.sortAscIcon=a.foy,this.sortDescIcon=a.u9C,this.destroy$=new e.x,t.predicateChange.pipe((0,_.R)(this.destroy$)).subscribe(()=>this.updateIconDefinition()),t.ascendingChange.pipe((0,_.R)(this.destroy$)).subscribe(()=>this.updateIconDefinition())}onClick(){this.iconComponent&&this.sort.sort(this.jhiSortBy)}ngAfterContentInit(){this.updateIconDefinition()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}updateIconDefinition(){if(this.iconComponent){let t=this.sortIcon;this.sort.predicate===this.jhiSortBy&&(t=this.sort.ascending?this.sortAscIcon:this.sortDescIcon),this.iconComponent.icon=t,this.iconComponent.render()}}}return i.\u0275fac=function(t){return new(t||i)(s.Y36(u.b,1))},i.\u0275dir=s.lG2({type:i,selectors:[["","jhiSortBy",""]],contentQueries:function(t,c,p){if(1&t&&s.Suo(p,r.BN,5),2&t){let g;s.iGM(g=s.CRH())&&(c.iconComponent=g.first)}},hostBindings:function(t,c){1&t&&s.NdJ("click",function(){return c.onClick()})},inputs:{jhiSortBy:"jhiSortBy"}}),i})()},31427:(h,l,n)=>{n.d(l,{b:()=>_});var e=n(5e3);let _=(()=>{class r{constructor(){this.predicateChange=new e.vpe,this.ascendingChange=new e.vpe,this.sortChange=new e.vpe}get predicate(){return this._predicate}set predicate(s){this._predicate=s,this.predicateChange.emit(s)}get ascending(){return this._ascending}set ascending(s){this._ascending=s,this.ascendingChange.emit(s)}sort(s){this.ascending=s!==this.predicate||!this.ascending,this.predicate=s,this.predicateChange.emit(s),this.ascendingChange.emit(this.ascending),this.sortChange.emit({predicate:this.predicate,ascending:this.ascending})}}return r.\u0275fac=function(s){return new(s||r)},r.\u0275dir=e.lG2({type:r,selectors:[["","jhiSort",""]],inputs:{predicate:"predicate",ascending:"ascending"},outputs:{predicateChange:"predicateChange",ascendingChange:"ascendingChange",sortChange:"sortChange"}}),r})()}}]);