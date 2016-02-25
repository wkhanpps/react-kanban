!function e(t,n,r){function a(i,s){if(!n[i]){if(!t[i]){var c="function"==typeof require&&require;if(!s&&c)return c(i,!0);if(o)return o(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var d=n[i]={exports:{}};t[i][0].call(d.exports,function(e){var n=t[i][1][e];return a(n?n:e)},d,d.exports,e,t,n,r)}return n[i].exports}for(var o="function"==typeof require&&require,i=0;i<r.length;i++)a(r[i]);return a}({1:[function(e,t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},a=e("../helpers"),o=e("uuid"),i=function(e){return"string"!=typeof e?!1:/^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/.test(e)},s="CREATE_LANE",c=function(e){return"string"!=typeof e&&a.makeError("params",e),{type:s,payload:{id:o.v4(),name:e,notes:[]}}},u="UPDATE_LANE",d=function(e){return"object"===("undefined"==typeof e?"undefined":r(e))&&i(e.id)||a.makeError("params",e),{type:u,payload:e}},l="DELETE_LANE",p=function(e){return i(e)||a.makeError("params",e),{type:l,payload:{id:e}}},f="ATTACH_TO_LANE",E=function(e,t){return i(e)&&i(t)||a.makeError("params",{laneId:e,noteId:t}),{type:f,payload:{laneId:e,noteId:t}}},m="DETACH_FROM_LANE",y=function(e,t){return i(e)&&i(t)||a.makeError("params",{laneId:e,noteId:t}),{type:m,payload:{laneId:e,noteId:t}}},h="MOVE",N=function(e,t){return i(e)&&i(t)||a.makeError("params",{sourceId:e,targetId:t}),{type:h,payload:{sourceId:e,targetId:t}}};t.exports={types:{CREATE_LANE:s,UPDATE_LANE:u,DELETE_LANE:l,ATTACH_TO_LANE:f,DETACH_FROM_LANE:m,MOVE:h},createLane:c,updateLane:d,deleteLane:p,attachToLane:E,detachFromLane:y,move:N}},{"../helpers":11,uuid:"uuid"}],2:[function(e,t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},a=e("../helpers"),o=e("uuid"),i="CREATE_NOTE",s="UPDATE_NOTE",c="DELETE_NOTE",u=function(e){return"string"!=typeof e?!1:/^[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}$/.test(e)},d=function(e){return"string"!=typeof e&&a.makeError("params",e),{type:i,payload:{id:o.v4(),editing:!1,text:e}}},l=function(e){return"object"===("undefined"==typeof e?"undefined":r(e))&&u(e.id)||a.makeError("params",e),{type:s,payload:e}},p=function(e){return u(e)||a.makeError("params",e),{type:c,payload:{id:e}}};t.exports={types:{CREATE_NOTE:i,UPDATE_NOTE:s,DELETE_NOTE:c},createNote:d,updateNote:l,deleteNote:p}},{"../helpers":11,uuid:"uuid"}],3:[function(e,t,n){"use strict";var r=e("react"),a=r.createClass({displayName:"Editable",handleDelete:function(){this.props.onDelete()},handleValueClick:function(){this.props.onValueClick()},handleFinishEdit:function(e){if("keypress"!==e.type||"Enter"===e.key){var t=e.target.value;this.props.onEdit&&t.trim().length&&this.props.onEdit(t)}},renderEdit:function(){return r.createElement("input",{type:"text",autoFocus:!0,className:"editing",ref:function(e){e&&(e.selectionEnd=this.props.value.length)}.bind(this),defaultValue:this.props.value,onBlur:this.handleFinishEdit,onKeyPress:this.handleFinishEdit})},renderDelete:function(){return r.createElement("span",{className:"delete",onClick:this.handleDelete},"×")},renderValue:function(){return r.createElement("span",null,r.createElement("input",{type:"text",onClick:this.handleValueClick,defaultValue:this.props.value,readOnly:!0}),this.props.onDelete?this.renderDelete():null)},render:function(){return this.props.editing?this.renderEdit():this.renderValue()}});t.exports=a},{react:"react"}],4:[function(e,t,n){"use strict";var r=e("react"),a=e("./Notes.jsx"),o=e("./Editable.jsx");t.exports=r.createClass({displayName:"exports",handleDeleteLane:function(e,t){this.props.onDeleteLane(e),t.forEach(function(e){this.props.onDeleteNote(null,e)}.bind(this))},render:function(){var e=this.props.lane,t=this.props.allNotes,n=e.notes.map(function(e){return t.find(function(t){return t.id===e})}).filter(function(e){return e}),i=this.props.connectDropTarget;return i(r.createElement("div",{className:"lane"},r.createElement("h2",{className:"lane__name"},r.createElement(o,{editing:e.editing,value:e.name,onEdit:this.props.onEditLane.bind(null,e.id),onValueClick:this.props.onEditLane.bind(null,e.id)}),r.createElement("button",{className:"lane__delete",onClick:this.handleDeleteLane.bind(null,e.id,e.notes)},"-")),r.createElement(a,{notes:n,onDeleteNote:this.props.onDeleteNote.bind(null,e.id),onEditNote:this.props.onEditNote,onValueClick:this.props.onEditNote,onMoveNote:this.props.onMoveNote}),r.createElement("button",{className:"add-note",onClick:this.props.onCreateNote.bind(null,e.id)},"+ note")))}})},{"./Editable.jsx":3,"./Notes.jsx":7,react:"react"}],5:[function(e,t,n){"use strict";var r=e("react"),a=e("../containers/Lane.jsx");t.exports=r.createClass({displayName:"exports",render:function(){var e=this.props.lanes.map(function(e){return r.createElement(a,{key:e.id,lane:e,onEditLane:this.props.onEditLane,onDeleteLane:this.props.onDeleteLane})}.bind(this));return r.createElement("div",{className:"lanes"},e)}})},{"../containers/Lane.jsx":10,react:"react"}],6:[function(e,t,n){"use strict";var r=e("react"),a=e("react-dnd").DragSource,o=e("react-dnd").DropTarget,i=e("../constants/itemTypes"),s={beginDrag:function(e){var t={id:e.id};return t},isDragging:function(e,t){return e.id===t.getItem().id}},c={hover:function(e,t){var n=e.id,r=t.getItem(),a=r.id;a!==n&&e.onMoveNote(a,n)}},u=function(e,t){return{connectDragSource:e.dragSource(),isDragging:t.isDragging()}},d=function(e){return{connectDropTarget:e.dropTarget()}},l=r.createClass({displayName:"Note",render:function(){var e=this.props.connectDragSource,t=this.props.connectDropTarget,n=this.props.isDragging;return e(t(r.createElement("li",{style:{opacity:n?0:1},className:"note"},this.props.children)))}});t.exports=a(i.NOTE,s,u)(o(i.NOTE,c,d)(l))},{"../constants/itemTypes":8,react:"react","react-dnd":"react-dnd"}],7:[function(e,t,n){"use strict";var r=e("react"),a=e("./Note.jsx"),o=e("./Editable.jsx"),i=r.createClass({displayName:"Notes",render:function(){var e=this.props.notes.map(function(e){return r.createElement(a,{id:e.id,key:e.id,onMoveNote:this.props.onMoveNote},r.createElement(o,{editing:e.editing,value:e.text,onDelete:this.props.onDeleteNote.bind(null,e.id),onEdit:this.props.onEditNote.bind(null,e.id),onValueClick:this.props.onValueClick.bind(null,e.id)}))}.bind(this));return r.createElement("ul",{className:"notes-list"},e)}});t.exports=i},{"./Editable.jsx":3,"./Note.jsx":6,react:"react"}],8:[function(e,t,n){"use strict";t.exports={NOTE:"note"}},{}],9:[function(e,t,n){"use strict";var r=e("react"),a=e("../actions/lanes"),o=e("react-redux").connect,i=e("../components/Lanes.jsx"),s=e("react-dnd-html5-backend"),c=e("react-dnd").DragDropContext,u=r.createClass({displayName:"App",render:function(){return r.createElement("div",{className:"react-kanban"},r.createElement("h1",{className:"app-title"},"React.js Kanban"),r.createElement("button",{className:"add-lane",onClick:this.props.onCreateLane},"+"),r.createElement(i,{lanes:this.props.lanes,onEditLane:this.props.onEditLane,onDeleteLane:this.props.onDeleteLane}))}}),d=function(e){return{lanes:e.lanes}},l=function(e){return{onCreateLane:function(){e(a.createLane("Active"))},onEditLane:function(t,n){var r={id:t};n?(r.name=n,r.editing=!1):r.editing=!0,e(a.updateLane(r))},onDeleteLane:function(t){e(a.deleteLane(t))}}};t.exports=c(s)(o(d,l)(u))},{"../actions/lanes":1,"../components/Lanes.jsx":5,react:"react","react-dnd":"react-dnd","react-dnd-html5-backend":"react-dnd-html5-backend","react-redux":"react-redux"}],10:[function(e,t,n){"use strict";var r=e("../components/Lane.jsx"),a=e("../actions/lanes"),o=e("../actions/notes"),i=e("react-redux").connect,s=e("react-dnd").DropTarget,c=e("../constants/itemTypes"),u={hover:function(e,t){var n=e.lane.id,r=t.getItem(),a=r.id;e.lane.notes.length||(console.log(n,a),e.attachToLane(n,a))}},d=function(e){return{connectDropTarget:e.dropTarget()}},l=function(e){return{allNotes:e.notes}},p=function(e){return{onCreateNote:function(t){var n=o.createNote("New note");e(n),e(a.attachToLane(t,n.payload.id))},onDeleteNote:function(t,n){e(o.deleteNote(n)),t&&e(a.detachFromLane(t,n))},onEditNote:function(t,n){var r={id:t};n?(r.text=n,r.editing=!1):r.editing=!0,e(o.updateNote(r))},onMoveNote:function(t,n){e(a.move(t,n))},attachToLane:function(t,n){e(a.attachToLane(t,n))}}};t.exports=i(l,p)(s(c.NOTE,u,d)(r))},{"../actions/lanes":1,"../actions/notes":2,"../components/Lane.jsx":4,"../constants/itemTypes":8,"react-dnd":"react-dnd","react-redux":"react-redux"}],11:[function(e,t,n){"use strict";var r=function(e){this.message="Invalid parameters: "+JSON.stringify(e),this.stack=(new Error).stack};r.prototype=Object.create(Error.prototype),r.prototype.name="ParamsError";var a=function(e,t){switch(e){case"params":throw new r(t);default:throw new Error(JSON.stringify(t))}};t.exports={makeError:a}},{}],12:[function(e,t,n){"use strict";var r=e("react"),a=e("react-dom"),o=e("react-redux").Provider,i=e("./containers/App.jsx"),s=e("localforage"),c=e("./store"),u=s.createInstance({name:"kanban"});u.getItem("state").then(function(e){return c(e)},function(e){return console.error(e),c(null)}).then(function(e){a.render(r.createElement(o,{store:e},r.createElement(i,null)),document.querySelector(".app")),e.subscribe(function(){u.setItem("state",e.getState())})})},{"./containers/App.jsx":9,"./store":16,localforage:"localforage",react:"react","react-dom":"react-dom","react-redux":"react-redux"}],13:[function(e,t,n){"use strict";var r=e("redux").combineReducers,a=e("./lanes"),o=e("./notes");t.exports=r({lanes:a,notes:o})},{"./lanes":14,"./notes":15,redux:"redux"}],14:[function(e,t,n){"use strict";var r=e("../actions/lanes").types,a=e("uuid"),o=e("react-addons-update"),i=[{id:a.v4(),name:"Todo",notes:[]},{id:a.v4(),name:"In Progress",notes:[]},{id:a.v4(),name:"Review",notes:[]}];t.exports=function(e,t){switch(e=e||i,t.type){case r.CREATE_LANE:return e.concat(t.payload);case r.UPDATE_LANE:return e.map(function(e){return e.id===t.payload.id?Object.assign({},e,t.payload):e});case r.DELETE_LANE:return e.filter(function(e){return e.id!==t.payload.id});case r.ATTACH_TO_LANE:var n,a=t.payload.laneId,s=t.payload.noteId;return e.map(function(e){return n=e.notes.indexOf(s),~n?Object.assign({},e,{notes:e.notes.filter(function(e){return e!==s})}):e.id===a?Object.assign({},e,{notes:e.notes.concat(s)}):e});case r.DETACH_FROM_LANE:var a=t.payload.laneId,s=t.payload.noteId;return e.map(function(e){return e.id===a?Object.assign({},e,{notes:e.notes.filter(function(e){return e!==s})}):e});case r.MOVE:var c=t.payload.sourceId,u=t.payload.targetId,d=e.filter(function(e){return~e.notes.indexOf(c)})[0],l=e.filter(function(e){return~e.notes.indexOf(u)})[0],p=d.notes.indexOf(c),f=l.notes.indexOf(u);return d.id===l.id?e.map(function(e){return e.id===d.id?Object.assign({},e,{notes:o(d.notes,{$splice:[[p,1],[f,0,c]]})}):e}):e.map(function(e){return e.id===d.id?Object.assign({},e,{notes:o(e.notes,{$splice:[[p,1]]})}):e.id===l.id?Object.assign({},e,{notes:o(e.notes,{$splice:[[f,0,c]]})}):e});default:return e}}},{"../actions/lanes":1,"react-addons-update":"react-addons-update",uuid:"uuid"}],15:[function(e,t,n){"use strict";var r=e("../actions/notes").types,a=[],o=function(e,t){switch(e=e||a,t.type){case r.CREATE_NOTE:return e.concat(t.payload);case r.UPDATE_NOTE:return e.map(function(e){return e.id===t.payload.id?Object.assign({},e,t.payload):e});case r.DELETE_NOTE:return e.filter(function(e){return e.id!==t.payload.id});default:return e}};t.exports=o},{"../actions/notes":2}],16:[function(e,t,n){"use strict";var r=e("redux").createStore,a=e("redux").applyMiddleware,o=e("./reducers"),i=function(e){return function(t){return function(n){var r=window.console,a=e.getState(),o=t(n),i=e.getState();return r.log("%c prev state","color: #9E9E9E",a),r.log("%c action","color: #03A9F4",n),r.log("%c next state","color: #4CAF50",i),o}}};t.exports=function(e){return e=e||{},console.log("initialState %o",e),r(o,e,a(i))}},{"./reducers":13,redux:"redux"}]},{},[12]);