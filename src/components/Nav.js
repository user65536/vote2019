import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import store from '../store/store'

import vote from '../utils/vote'
import page from '../utils/page'
import storage from '../utils/storage'

import '../styles/nav.styl'


class Nav extends Component {
  state = {
    group: '0',
    groupListName: ['所有分类', '第一种分类', '第二种分类', '第三种分类', '第四种分类'],
    showGroupList: false,
    showSearchInput: false,
    loginState: false,
    searchValue: '',
    userID: '',
    ticketLeft: store.getState().voteLeft
  }


  componentDidMount () {
    let previousList = storage.getProjectList()
    if(previousList) {
      this.setState({
        group: previousList.group,
        searchValue: previousList.searchValue
      })
    }
    store.subscribe(() => {
      if(store.getState().voteLeft >= 0) {
        this.setState({
          ticketLeft: store.getState().voteLeft
        })
      }
    })
    vote.checkLogin().then( ({state, id}) => {
      if(state) {
        this.setState({loginState: true, userID: id})
        return vote.getVoteLeft()
      } else {
        this.setState({
          loginState: false
        })
      }
    }).then((num) => {
      let action = {
        type: 'RENEW_VOTE_NUM',
        value: num
      }
      store.dispatch(action)
    }).catch(page.showAlert)
  }

  render () {
    let groupDom = (
      <div className="group-by">
        <div onClick={this.toggleList}>
          <span className="group">{this.state.groupListName[this.state.group]}</span>
          <span className={`iconfont icon-down1 ${this.state.showGroupList ? 'rotate' : ''}`}></span>
        </div>
        <ul onClick={this.handleGroupListClick}
            className={`group-list ${this.state.showGroupList ? 'show' : ''}`}>
            {
              this.state.groupListName.map((item, index) => {
                return (
                  <li key={item + index} data-group-id={index} className="group-item">{item}</li>
                )
              })
            }
          {/* <li data-group-id="all" className="group-item">所有分类</li>
          <li data-group-id="1" className="group-item">字数不一样的分类</li>
          <li data-group-id="2" className="group-item">二样分类</li>
          <li data-group-id="3" className="group-item">还有啥分类</li>
          <li data-group-id="4" className="group-item">第四个分类</li>
          <li data-group-id="5" className="group-item">最后一个分类</li> */}
        </ul>
      </div>
    )

    let searchBarDom = (
      <div className="search-bar"> 
        <input 
          value={this.state.searchValue}
          onChange={(e) => {this.setState({searchValue: e.currentTarget.value})}}
          onKeyDown={this.testEnter}
          onFocus={this.showInput}
          onBlur={this.hideInput}
          type="text" 
          className={`search-input ${this.state.showSearchInput ? 'active' : 'active'}`}/>
        <span onClick={this.search} className="iconfont icon-sousuo search-btn"></span>
      </div>
    )
    return (
      <>
      {
        this.state.showGroupList ? (
          <div onClick={this.toggleList} className="mask"></div>
        ) : ''
      }
      <div className={`wrapper-nav ${this.props.blur ? 'blur' : ''}`}>
        <div className="top">
          <div className="left">
            <div onClick={this.backHome} className="logo"></div>
            {
              this.props.withBar ? (
                <div className="group-by-wrap">
                  {groupDom}
                </div>
              ) : ''
            }
          </div>
          <div className="slot">{
            this.props.children
          }</div>
          <div className="right">
          {
            this.props.withBar ? (
              <div className="search-bar-wrap">
                {searchBarDom}
              </div>
            ) : ''
          }
            
            {
              this.state.loginState ? (
                <>
                  <div className="ticker">
                    <span className="iconfont icon-toupiao"></span>
                    <span className="num">{this.state.ticketLeft}</span>
                  </div>
                  <div className="user">{this.state.userID}</div>
                  <div onClick={this.logout} className="quit">
                    <span className="iconfont icon-dengchu"></span>
                  </div>
                </>
              ) : (
                <button onClick={this.navigateToLogin} className="login">登录</button>
              )
            }
          </div>
        </div>
        {
          this.props.withBar ? (
            <div className="bottom">
                <div className="left">
                  {groupDom}
                </div>
                <div className="right">
                  {searchBarDom}
                </div>
            </div>
          ) : ''
        }
      </div>
      <div className="blank" style={this.props.withBar ? {} : {height: '48px'}}></div>
      </>
    )
  }
  navigateToLogin = () => {
    this.props.history.push("/login")
  }
  logout = () => {
    vote.logout().then((res) => {
      this.setState({
        loginState: false
      })
    }).catch(page.showAlert)
  }
  backHome = () => {
    this.props.history.push('/gallery')
  }
  showInput = () => {
    this.setState({
      showSearchInput: true
    })
  }
  hideInput = () => {
    this.setState({
      showSearchInput: false
    })
  }
  toggleList = () => {
    this.setState({
      showGroupList: !this.state.showGroupList
    })
  }
  handleGroupListClick = (e) => {
    let id = e.target.getAttribute('data-group-id')
    if(true || id !== this.state.group) {
      this.setState({
        group: id,
        searchValue: ''
      })
      this.props.onGroupChange(id)
    }
    this.toggleList()
  }
  search = () => {
    let searchValue = this.state.searchValue.trim()
    if(true || searchValue) {
      this.setState({
        group: '0'
      })
      this.props.onSearch(searchValue)
    }
  }
  testEnter = e => {
    if(e.which === 13) {
      this.search()
    }
  }
}

export default withRouter(Nav);