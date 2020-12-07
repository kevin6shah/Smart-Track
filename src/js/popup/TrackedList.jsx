import React, { Component } from 'react'
import HeaderMain from './components/HeaderMain'
import firebase from 'firebase'
import ListItem from './components/ListItem';
require("firebase/firestore");

export default class TrackedList extends Component {
    state = {
        itemList: [],
        instance: firebase.firestore(),
    }

    componentDidMount() {
        const UID = localStorage.getItem('uid').toString()
        const instance = this.state.instance
        instance.collection('users')
            .doc(UID).get().then(async (result) => {
                const trackedMap = result.data()['trackedMap']
                let itemList = [];
                for (var ID in trackedMap) {
                    if (trackedMap.hasOwnProperty(ID)) {
                        const item = await instance.collection('items').doc(ID).get()
                        itemList.push({
                            'id': ID,
                            'threshold': trackedMap[ID],
                            'img': item.data()['img'],
                            'title': item.data()['title'],
                            'url': item.data()['url'],
                            'price': item.data()['priceHistory'][item.data()['priceHistory'].length - 1]['price']
                        })
                    }
                }
                this.setState({
                    itemList: itemList,
                })
        })
    }

    onItemClick = async (ID) => {
        const UID = localStorage.getItem('uid').toString()
        const instance = this.state.instance
        const userDocReference = instance.collection('users').doc(UID)
        const itemDocReference = instance.collection('items').doc(ID)
        const userSnapshot = await userDocReference.get()
        const itemSnapshot = await itemDocReference.get()
        const email = userSnapshot.data()['email']
        let trackedMap = userSnapshot.data()['trackedMap']
        let emailMap = itemSnapshot.data()['emailMap']

        delete trackedMap[[ID]]
        delete emailMap[[email]]
        userDocReference.update({
            trackedMap: trackedMap
        })
        itemDocReference.update({
            emailMap: emailMap
        })

        this.setState({
            itemList: Object.keys(trackedMap)
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
                        key={item.id}
                        index={item.id}
                        scrapedData={item} showButton={true}
                        onClick={this.onItemClick} />)
                }
            </div>
        )
    }
}
