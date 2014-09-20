// @require eventproxy.js
// cell model
(function(){function DlGridCellModel(e){arguments.length>0&&(DlEventProxy.call(this),typeof e!="object"&&(e={value:e}),DlGridCellModel.setDefaults(this,e),this.registerEvents(DEFAULT_EVENTS))}var DEFAULT_EVENTS;DlGridCellModel.inherits(DlEventProxy),eval(Dynarch.EXPORT("DlGridCellModel")),DEFAULT_EVENTS=["onChange"],D.DEFAULT_ARGS={_value:["value",null],_style:["style",{}]},P.setValue=function(e){var t=this._value;this._value=e,this.applyHooks("onChange",[this,"value",e,t])},P.getContent=function(){return this._value},P.getStyle=function(e,t){return e in this._style?this._style[e]:t},P.getIndex=function(){return this.index},P.getId=function(){return this.model.getColByIndex(this.index).id},P.setStyle=function(e,t){var n=this._style[e];this._style[e]=t,this.applyHooks("onChange",[this,"style",t,n,e])},P.compareTo=function(e){return this._value<e._value?-1:this._value>e._value?1:0}})(),function(){function DlGridColModel(args){arguments.length>0&&(DlEventProxy.call(this),DlGridColModel.setDefaults(this,args),this.registerEvents(DEFAULT_EVENTS),typeof this._cellType=="string"&&(this._cellType=eval(this._cellType)))}var DEFAULT_EVENTS;DlGridColModel.inherits(DlEventProxy),eval(Dynarch.EXPORT("DlGridColModel")),DEFAULT_EVENTS=["onChange"],D.DEFAULT_ARGS={width:["width",null],fill:["fill",!1],_label:["label",null],id:["id",null],_cellType:["cellType",DlGridCellModel],isResizable:["resizable",!1],isScrollable:["scrollable",!0],isSortable:["sortable",!0],tooltip:["tooltip",null],_style:["style",{}],_iconClass:["iconClass",null]},P.getId=function(){return this.id},P.getIndex=function(){return this.index},P.getIconClass=function(){return this._iconClass},P.setIconClass=function(e){var t=this._iconClass;this._iconClass=e,this.applyHooks("onChange",[this,"iconClass",val,t])},P.getLabel=function(){return this._label},P.setLabel=function(e){var t=this._label;this._label=e,this.applyHooks("onChange",[this,"label",val,t])},P.getCellType=function(){return this._cellType},P.createCell=function(e){var t=new this._cellType(e);return t},P.getStyle=function(e,t){return e in this._style?this._style[e]:t},P.setStyle=function(e,t){var n=this._style[e];this._style[e]=t,this.applyHooks("onChange",[this,"style",t,n,e])},P.sort=function(){this.model.sort(this)},P.compareRows=function(e,t){var n=this.getIndex();return e=e.getCellByIndex(n),t=t.getCellByIndex(n),e.compareTo(t)}}(),function(){function DlGridRowModel(e){var t;arguments.length>0&&(e instanceof Array&&(t={id:e.id,model:e.model,cells:{}},e.model.foreachCol(function(n,r){t.cells[n.getId()]=e[r]}),e=t),DlEventProxy.call(this),D.setDefaults(this,e),this.registerEvents(DEFAULT_EVENTS),this._init())}var DEFAULT_EVENTS;DlGridRowModel.inherits(DlEventProxy),eval(Dynarch.EXPORT("DlGridRowModel")),DEFAULT_EVENTS=["onChange"],D.DEFAULT_ARGS={id:["id",null],userData:["data",null],_cells:["cells",null],_model:["model",null],tooltip:["tooltip",null]},P.reset=function(e){this.id=e.id,this.userData=e.data,this.tooltip=e.tooltip,this.foreachCell(function(t,n){t.setValue(e.cells[n.getId()])})},P.getId=function(){return this.id},P.getIndex=function(){return this.index},P.getCells=function(){return this._cells},P.getCellByIndex=function(e){return this._cells[this.model.getColByIndex(e).getId()]},P.foreachCell=function(e,t){this.model.foreachCol(function(n,r){var i=this._cells[n.getId()];e.apply(t,[i,n,r])},this)},P._onCellChange=function(e,t,n,r){this.applyHooks("onChange",[this,e,t,n,r])},P._init=function(){var e,t,n,r,i=this._model,s=this._cells;this.model=i,delete this._model,e=this._onCellChange.$(this);for(t in s)n=s[t],r=i.getColById(t),n=s[t]=r.createCell(n),n.model=i,n.colId=t,n.index=r.getIndex(),n.parent=this,n.addEventListener("onChange",e)}}(),function(){function DlGridModel(e){arguments.length>0&&(DlEventProxy.call(this),DlGridModel.setDefaults(this,e),this.registerEvents(DEFAULT_EVENTS),this._init())}var DEFAULT_EVENTS;DlGridModel.inherits(DlEventProxy),eval(Dynarch.EXPORT("DlGridModel")),DEFAULT_EVENTS=["onInsertRow","onDeleteRow","onInsertCol","onInsertCol","onMoveRow","onMoveCol","onRowChange","onColChange","onSort"],D.DEFAULT_ARGS={_rows:["rows",[]],_cols:["cols",null]},P.getRowById=function(e){return this._rowsById[e]},P.getRowByIndex=function(e){return this._rows[e]},P.foreachRow=function(){return this._rows.foreach.apply(this._rows,arguments)},P.foreachCol=function(){return this._cols.foreach.apply(this._cols,arguments)},P.getColById=function(e){return this._colsById[e]},P.getColByIndex=function(e){return this._cols[e]},P._init=function(){var e,t;this.__sortCol=null,this.__sortDesc=!1,e=this._colsById={},t=this._rowsById={},this._onRowChange=this._onColChange.$(this),this._onRowChange=this._onRowChange.$(this),this._cols.r_assign_each(function(t,n){return n=new DlGridColModel(n),n.model=this,n.index=t,n.addEventListener("onChange",this._onColChange),n.id&&(e[n.id]=n),n},this),this._rows.r_assign_each(function(e,n){return n.model=this,n=new DlGridRowModel(n),n.index=e,n.addEventListener("onChange",this._onRowChange),n.id&&(t[n.id]=n),n},this)},P._onColChange=function(e,t,n,r){this.applyHooks("onColChange",[this,e,t,n,r])},P._onRowChange=function(e,t,n,r,i){this.applyHooks("onRowChange",[this,e,t,n,r,i])},P._getInsertPos=function(e){var t=this.__sortCol;return this._rows.foreach(function(n,r){var i=t.compareRows(n,e);this.__sortDesc&&(i=-i),i>=0&&$RETURN(r)},this)},P.insertRow=function(e,t){var n,r,i;e.model=this,e=new DlGridRowModel(e),n=this._rows,r=n.length;if(t==null||t==-1)t=this.__sortCol?this._getInsertPos(e):r;n.splice(t,0,e),++r;for(i=t;i<r;++i)n[i].index=i;return e.addEventListener("onChange",this._onRowChange),e.id&&(this._rowsById[e.id]=e),this.applyHooks("onInsertRow",[e]),e},P.deleteRowById=function(e){this.deleteRowByIndex(this.getRowById(e).getIndex())},P.deleteRowByIndex=function(e){var t,n=this._rows,r=n[e];r.id&&delete this._rowsById[r.id],n.splice(e,1);for(t=e;t<n.length;++t)n[t].index=t;return r.removeEventListener("onChange",this._onRowChange),this.applyHooks("onDeleteRow",[r]),r.destroy(),r},P.setValues=function(e){this.__sortDesc=!1,this.applyHooks("onSort",[null,this.__sortCol]),e.foreach(function(e,t){var n;e instanceof Array&&(e={cells:e}),n=this.getRowByIndex(t),n?(n.id&&delete this._rowsById[n.id],e.id&&(this._rowsById[e.id]=n),n.reset(e)):this.insertRow(e,this._rows.length)},this);while(e.length<this._rows.length)this.deleteRowByIndex(this._rows.length-1)},P.sort=function(e){var t,n,r=this.__sortCol;r===e?this.__sortDesc=!this.__sortDesc:this.__sortDesc=!1,this.__sortCol=e,t=e.getIndex(),this._rows=this._rows.mergeSort(function(t,n){return e.compareRows(t,n)},this.__sortDesc),n=this._rows.map(function(e,t){var n=e.index;return e.index=t,n}),this.applyHooks("onSort",[e,r,this.__sortDesc,n])}}();