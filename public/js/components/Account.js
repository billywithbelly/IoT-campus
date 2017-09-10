import React, { Component,PropTypes } from 'react'

export default class Account extends React.Component {

  constructor(props) {
    super(props);
    this.loginButHendler = this.loginButHendler.bind(this);
  }

	loginButHendler() {
		var acint = $('#accountInput').val();
		var psint = $('#passwordInput').val();
		if(acint!=""&&psint!=""){
			$.post('/login',{id:acint,password:psint},function() {
				window.location.replace('/');
			});
		}
	}

  render() {
    return (
      	<div id="login" className="modal">
		  <div className="modal-content">
		    <div className="modal-header">
		      <h4>登入</h4>
		    </div>
		    <div className="row">
		      <div className="input-field col s12">
		        <input id="accountInput" type="text" className="validate" />
		        <label htmlFor="Account">帳號</label>
		      </div>
		    </div>
		    <div className="row">
		      <div className="input-field col s12">
		        <input id="passwordInput" type="password" className="validate" />
		        <label htmlFor="password">密碼</label>
		      </div>
		    </div>
		    <div className="row">
		      <div className="input-field col s12">
		        <a className="waves-effect waves-light btn red" onClick={this.loginButHendler}>登入</a>
		      </div>
		    </div>
		  </div>
		  <div className="modal-footer">
		    <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">關閉</a>
		  </div>
		</div>
    );
  }
}
