"use strict";(self.webpackChunkgrade_scope_istic=self.webpackChunkgrade_scope_istic||[]).push([[592],{74218:(f,u,s)=>{s.d(u,{gK:()=>e,aW:()=>_,jo:()=>o,_l:()=>a});const e=20,_="asc",o="desc",a="sort"},97493:(f,u,s)=>{s.d(u,{N:()=>e,g:()=>_});class e{constructor(a,r,l,i,n,d,t){this.id=a,this.name=r,this.pagemin=l,this.pagemax=i,this.scanName=n,this.scanId=d,this.students=t}}function _(o){return o.id}},96356:(f,u,s)=>{s.d(u,{c:()=>i});var e=s(96037),_=s(95929),o=s(97493),a=s(5e3),r=s(40520),l=s(81082);let i=(()=>{class n{constructor(t,c){this.http=t,this.applicationConfigService=c,this.resourceUrl=this.applicationConfigService.getEndpointFor("api/exam-sheets")}create(t){return this.http.post(this.resourceUrl,t,{observe:"response"})}update(t){return this.http.put(`${this.resourceUrl}`,t,{observe:"response"})}partialUpdate(t){return this.http.patch(`${this.resourceUrl}/${(0,o.g)(t)}`,t,{observe:"response"})}find(t){return this.http.get(`${this.resourceUrl}/${t}`,{observe:"response"})}query(t){const c=(0,_.b)(t);return this.http.get(this.resourceUrl,{params:c,observe:"response"})}delete(t){return this.http.delete(`${this.resourceUrl}/${t}`,{observe:"response"})}addExamSheetToCollectionIfMissing(t,...c){const p=c.filter(e.E);if(p.length>0){const h=t.map(g=>(0,o.g)(g));return[...p.filter(g=>{const E=(0,o.g)(g);return null!=E&&!h.includes(E)&&(h.push(E),!0)}),...t]}return t}}return n.\u0275fac=function(t){return new(t||n)(a.LFG(r.eN),a.LFG(l.y))},n.\u0275prov=a.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()},64405:(f,u,s)=>{s.d(u,{o:()=>i});var e=s(96037),_=s(95929),o=s(17218),a=s(5e3),r=s(40520),l=s(81082);let i=(()=>{class n{constructor(t,c){this.http=t,this.applicationConfigService=c,this.resourceUrl=this.applicationConfigService.getEndpointFor("api/student-responses")}create(t){return this.http.post(this.resourceUrl,t,{observe:"response"})}update(t){return this.http.put(`${this.resourceUrl}`,t,{observe:"response"})}partialUpdate(t){return this.http.patch(`${this.resourceUrl}/${(0,o.A)(t)}`,t,{observe:"response"})}find(t){return this.http.get(`${this.resourceUrl}/${t}`,{observe:"response"})}query(t){const c=(0,_.b)(t);return this.http.get(this.resourceUrl,{params:c,observe:"response"})}delete(t){return this.http.delete(`${this.resourceUrl}/${t}`,{observe:"response"})}addStudentResponseToCollectionIfMissing(t,...c){const p=c.filter(e.E);if(p.length>0){const h=t.map(g=>(0,o.A)(g));return[...p.filter(g=>{const E=(0,o.A)(g);return null!=E&&!h.includes(E)&&(h.push(E),!0)}),...t]}return t}}return n.\u0275fac=function(t){return new(t||n)(a.LFG(r.eN),a.LFG(l.y))},n.\u0275prov=a.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()},17218:(f,u,s)=>{s.d(u,{g:()=>e,A:()=>_});class e{constructor(a,r,l,i,n,d,t){this.id=a,this.note=r,this.comments=l,this.questionNumero=i,this.questionId=n,this.studentName=d,this.studentId=t}}function _(o){return o.id}},39678:(f,u,s)=>{s.d(u,{V:()=>i});var e=s(96037),_=s(95929),o=s(38810),a=s(5e3),r=s(40520),l=s(81082);let i=(()=>{class n{constructor(t,c){this.http=t,this.applicationConfigService=c,this.resourceUrl=this.applicationConfigService.getEndpointFor("api/students")}create(t){return this.http.post(this.resourceUrl,t,{observe:"response"})}update(t){return this.http.put(`${this.resourceUrl}`,t,{observe:"response"})}partialUpdate(t){return this.http.patch(`${this.resourceUrl}/${(0,o.F)(t)}`,t,{observe:"response"})}find(t){return this.http.get(`${this.resourceUrl}/${t}`,{observe:"response"})}query(t){const c=(0,_.b)(t);return this.http.get(this.resourceUrl,{params:c,observe:"response"})}delete(t){return this.http.delete(`${this.resourceUrl}/${t}`,{observe:"response"})}addStudentToCollectionIfMissing(t,...c){const p=c.filter(e.E);if(p.length>0){const h=t.map(g=>(0,o.F)(g));return[...p.filter(g=>{const E=(0,o.F)(g);return null!=E&&!h.includes(E)&&(h.push(E),!0)}),...t]}return t}}return n.\u0275fac=function(t){return new(t||n)(a.LFG(r.eN),a.LFG(l.y))},n.\u0275prov=a.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()},38810:(f,u,s)=>{s.d(u,{Z:()=>e,F:()=>_});class e{constructor(a,r,l,i,n,d,t,c){this.id=a,this.name=r,this.firstname=l,this.ine=i,this.caslogin=n,this.mail=d,this.examSheets=t,this.groups=c}}function _(o){return o.id}},39003:(f,u,s)=>{s.d(u,{w:()=>i});var e=s(5e3),_=s(54728),o=s(69808),a=s(73357);function r(n,d){if(1&n){const t=e.EpF();e.TgZ(0,"ngb-alert",4),e.NdJ("closed",function(){e.CHM(t);const p=e.oxw().$implicit;return e.oxw().close(p)}),e._uU(1,"\n      "),e._UZ(2,"pre",5),e._uU(3,"\n    "),e.qZA()}if(2&n){const t=e.oxw().$implicit;e.Q6J("type",t.type),e.xp6(2),e.Q6J("innerHTML",t.message,e.oJD)}}function l(n,d){if(1&n&&(e.TgZ(0,"div",2),e._uU(1,"\n    "),e.YNc(2,r,4,2,"ngb-alert",3),e._uU(3,"\n  "),e.qZA()),2&n){const t=d.$implicit,c=e.oxw();e.Q6J("ngClass",c.setClasses(t)),e.xp6(2),e.Q6J("ngIf",t.message)}}let i=(()=>{class n{constructor(t){this.alertService=t,this.alerts=[]}ngOnInit(){this.alerts=this.alertService.get()}setClasses(t){const c={"jhi-toast":Boolean(t.toast)};return t.position?Object.assign(Object.assign({},c),{[t.position]:!0}):c}ngOnDestroy(){this.alertService.clear()}close(t){var c;null===(c=t.close)||void 0===c||c.call(t,this.alerts)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(_.c))},n.\u0275cmp=e.Xpm({type:n,selectors:[["jhi-alert"]],decls:5,vars:1,consts:[["role","alert",1,"alerts"],[3,"ngClass",4,"ngFor","ngForOf"],[3,"ngClass"],[3,"type","closed",4,"ngIf"],[3,"type","closed"],[3,"innerHTML"]],template:function(t,c){1&t&&(e.TgZ(0,"div",0),e._uU(1,"\n  "),e.YNc(2,l,4,2,"div",1),e._uU(3,"\n"),e.qZA(),e._uU(4,"\n")),2&t&&(e.xp6(2),e.Q6J("ngForOf",c.alerts))},directives:[o.sg,o.mk,o.O5,a.xm],encapsulation:2}),n})()},18133:(f,u,s)=>{s.d(u,{N:()=>a});var e=s(5e3),_=s(41995);const o=function(r,l,i){return{first:r,second:l,total:i}};let a=(()=>{class r{set params(i){i.page&&void 0!==i.totalItems&&i.itemsPerPage?(this.first=(i.page-1)*i.itemsPerPage+1,this.second=i.page*i.itemsPerPage<i.totalItems?i.page*i.itemsPerPage:i.totalItems):(this.first=void 0,this.second=void 0),this.total=i.totalItems}}return r.\u0275fac=function(i){return new(i||r)},r.\u0275cmp=e.Xpm({type:r,selectors:[["jhi-item-count"]],inputs:{params:"params"},decls:3,vars:5,consts:[["jhiTranslate","global.item-count",3,"translateValues"]],template:function(i,n){1&i&&(e._uU(0," "),e._UZ(1,"div",0),e._uU(2," ")),2&i&&(e.xp6(1),e.Q6J("translateValues",e.kEZ(1,o,n.first,n.second,n.total)))},directives:[_.P],encapsulation:2}),r})()},1408:(f,u,s)=>{s.d(u,{T:()=>i});var e=s(77579),_=s(82722),o=s(49444),a=s(90801),r=s(5e3),l=s(31427);let i=(()=>{class n{constructor(t){this.sort=t,this.sortIcon=a.CmM,this.sortAscIcon=a.foy,this.sortDescIcon=a.u9C,this.destroy$=new e.x,t.predicateChange.pipe((0,_.R)(this.destroy$)).subscribe(()=>this.updateIconDefinition()),t.ascendingChange.pipe((0,_.R)(this.destroy$)).subscribe(()=>this.updateIconDefinition())}onClick(){this.iconComponent&&this.sort.sort(this.jhiSortBy)}ngAfterContentInit(){this.updateIconDefinition()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}updateIconDefinition(){if(this.iconComponent){let t=this.sortIcon;this.sort.predicate===this.jhiSortBy&&(t=this.sort.ascending?this.sortAscIcon:this.sortDescIcon),this.iconComponent.icon=t,this.iconComponent.render()}}}return n.\u0275fac=function(t){return new(t||n)(r.Y36(l.b,1))},n.\u0275dir=r.lG2({type:n,selectors:[["","jhiSortBy",""]],contentQueries:function(t,c,p){if(1&t&&r.Suo(p,o.BN,5),2&t){let h;r.iGM(h=r.CRH())&&(c.iconComponent=h.first)}},hostBindings:function(t,c){1&t&&r.NdJ("click",function(){return c.onClick()})},inputs:{jhiSortBy:"jhiSortBy"}}),n})()},31427:(f,u,s)=>{s.d(u,{b:()=>_});var e=s(5e3);let _=(()=>{class o{constructor(){this.predicateChange=new e.vpe,this.ascendingChange=new e.vpe,this.sortChange=new e.vpe}get predicate(){return this._predicate}set predicate(r){this._predicate=r,this.predicateChange.emit(r)}get ascending(){return this._ascending}set ascending(r){this._ascending=r,this.ascendingChange.emit(r)}sort(r){this.ascending=r!==this.predicate||!this.ascending,this.predicate=r,this.predicateChange.emit(r),this.ascendingChange.emit(this.ascending),this.sortChange.emit({predicate:this.predicate,ascending:this.ascending})}}return o.\u0275fac=function(r){return new(r||o)},o.\u0275dir=e.lG2({type:o,selectors:[["","jhiSort",""]],inputs:{predicate:"predicate",ascending:"ascending"},outputs:{predicateChange:"predicateChange",ascendingChange:"ascendingChange",sortChange:"sortChange"}}),o})()}}]);