import './font/iconfont.css'
const Message = {
	open(arg){
		if(document.getElementsByClassName('mymessage').length>0) return;  //存在两个提示框时只显示一个
		this.timer = null;
		this.props = {
			message:'',
			type:'',
			duration:3000,
			center:false,
			showClose:true,
			iconClass:'',
			onClose:()=>{}
		};
		if(typeof arg === 'string'){
			this.props.message = arg;
		}else if(typeof arg === 'object'){
			this.props = Object.assign(this.props,arg);
		}else{
			throw '参数错误'
		}
		let font,color,border,bg;
		switch (this.props.type) {
			case 'success' : font = 'icon-success';color = '#67c23a'; border = '#e1f3d8'; bg = '#f0f9eb'; break; //成功
			case 'warning' : font = 'icon-prompt';color = '#eb9e05'; border = '#fbeccd'; bg = '#fdf5e6';break; //警告
			case 'error' : font = 'icon-error';color = '#fa5555'; border = '#fedddd'; bg = '#fee';break; //错误
			default : font = 'icon-prompt' ;color = '#878d99'; border = '#e6ebf5'; bg = '#edf2fc'; //普通
		}
		if(this.props.iconClass)font = this.props.iconClass;
		let oBody = document.getElementsByTagName('body')[0];
		this.oStyle = document.createElement('style');
		this.oStyle.className = 'mymessageclass';
		this.oStyle.innerHTML = '.mymessage{  min-width: 380px; font-size: 14px; box-sizing: border-box;  border-radius: 4px; color: '+color+'; border: 1px solid '+border+';  position: fixed;  left: 50%;  transform: translateX(-50%);  background-color: '+bg+';  overflow: hidden;  padding: 15px 45px 15px 20px;  display: flex;  align-items: center;  top: 20px;  opacity: 1;  animation: mymessage .5s;  -moz-animation: mymessage .5s;  -webkit-animation: mymessage .5s;  -o-animation: mymessage .5s;  }\n' +
			'        .mymessage.hide{  transition: .3s;  opacity: 0;  top:0;  }\n' +
			'        @keyframes mymessage { 0%{opacity: 0; top:0;} 50%{ opacity: .75;} 100%{ opacity: 1;top:20px;}}\n' +
			'        @-moz-keyframes mymessage { 0%{opacity: 0; top:0;} 50%{ opacity: .75;} 100%{ opacity: 1;top:20px;}}\n' +
			'        @-webkit-keyframes mymessage { 0%{opacity: 0; top:0;} 50%{ opacity: .75;} 100%{ opacity: 1;top:20px;}}\n' +
			'        @-o-keyframes mymessage { 0%{opacity: 0; top:0;} 50%{ opacity: .75;} 100%{ opacity: 1;top:20px;}}\n' +
			'        .mymessage .content{  padding: 0;  line-height: 1;  margin: 0;'+(this.props.center?'text-align: center;':'')+' }\n' +
			'        .mymessage .right{'+(this.props.showClose?'':'display:none;')+'  position: absolute;  top: 50%;  right: 15px;  -webkit-transform: translateY(-50%); color: #b4bccc;  transform: translateY(-50%);  cursor: pointer;   font-size: 16px;  }\n' +
			'        .mymessage .left{  margin-right: 10px;  }';
		oBody.appendChild(this.oStyle);

		this.oMessage = document.createElement('div');
		this.oMessage.className = 'mymessage';
		this.oMessage.innerHTML = '<i class="iconfont '+font+' left"></i><p class="content">'+this.props.message+'</p><i id="cuowu" class="iconfont icon-cuowu right"></i>';
		oBody.appendChild(this.oMessage);
		let oCuo = document.getElementById('cuowu');
		oCuo.onclick = this.close.bind(this);

		this.timer = setTimeout(this.close.bind(this),this.props.duration+500);
		this.oMessage.onmouseover = ()=>{
			clearTimeout(this.timer)
		};
		this.oMessage.onmouseout = () => {
			this.timer = setTimeout(this.close.bind(this),this.props.duration+500);
		};
	},
	close() {
		clearTimeout(this.timer)
		this.oMessage.className = 'mymessage hide';
		setTimeout(() => {
			this.oMessage.remove();
			this.oStyle.remove();
			this.props.onClose();
		},300)
	}
};
let message = (arg) => {
	Message.open(arg);
	};
message.close = () => {
	Message.close()
};
message.success = (arg) => {
	open(arg,'success')
};
message.error = (arg) => {
	open(arg,'error')
};
message.warning = (arg) => {
	open(arg,'warning')
};
function open(arg,type) {
	if(typeof arg === 'string'){
		Message.open({type:type,message:arg});
	}else if(typeof arg === 'object'){
		arg.type = type;
		Message.open(arg)
	}else{throw '参数错误！'}
}
export default  message
