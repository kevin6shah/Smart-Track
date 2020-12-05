import React, { Component } from 'react'
import HeaderMain from './components/HeaderMain'
import firebase from 'firebase'
import ListItem from './components/ListItem';
require("firebase/firestore");

export default class TrackedList extends Component {
    state = {
        itemList: [],
        UID: localStorage.getItem('uid').toString(),
        instance: firebase.firestore(),
    }

    componentDidMount() {
        const UID = this.state.UID
        const instance = this.state.instance
        instance.collection('users')
            .doc(UID).get().then(async (result) => {
                const items = result.data()['trackedList']
                let itemList = [];
                for (var i = 0; i < items.length; i++) {
                    const item = await instance.collection('items').doc(items[i]).get()
                    itemList.push({
                        'id': items[i],
                        'img': item.data()['img'],
                        'title': item.data()['title'],
                        'url': item.data()['url'],
                        'price': item.data()['priceHistory'][item.data()['priceHistory'].length - 1]['price']
                    })
                }
                this.setState({
                    itemList: itemList,
                })
        })
    }

    onItemClick = (index) => {
        const UID = this.state.UID
        const instance = this.state.instance
        let itemList = this.state.itemList
        instance.collection('users').doc(UID).update({
            trackedList: firebase.firestore.FieldValue.arrayRemove(itemList[index]['id']),
        })
        itemList.splice(index, 1)
        this.setState({
            itemList: itemList
        })
    }

    render() {
        return (
            <div>
                <HeaderMain hideLogo={true} />
                <button className='customIcon' style={{
                    position: 'absolute',
                    fontSize: '24px',
                    top: '10px',
                    left: '5px',
                }} onClick={this.props.routeTo.bind(this, 'main')}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                {
                    this.state.itemList.length === 0 ? 
                        <div style={{fontSize: '13px', padding: '20px'}}>No Tracked Items...</div> :
                    this.state.itemList.map((item) => <ListItem
                        key={this.state.itemList.indexOf(item)}
                        index={this.state.itemList.indexOf(item)}
                        scrapedData={item} showButton={true}
                        onClick={this.onItemClick} />)
                    
                }
            </div>
        )
    }
}
