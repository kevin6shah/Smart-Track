import React, { Component } from 'react'
import HeaderMain from './components/HeaderMain'
import firebase from 'firebase'
import ListItem from './components/ListItem';
import { v4 as uuidv4 } from 'uuid';
require("firebase/firestore");

export default class TrackedList extends Component {
    state = {
        itemMap: {},
        instance: firebase.firestore(),
    }

    componentDidMount() {
        const UID = localStorage.getItem('uid').toString()
        const instance = this.state.instance
        instance.collection('users')
            .doc(UID).get().then(async (result) => {
                const trackedMap = result.data()['trackedMap']
                let itemMap = {};
                for (var ID in trackedMap) {
                    if (trackedMap.hasOwnProperty(ID)) {
                        const item = await instance.collection('items').doc(ID).get()
                        itemMap[[ID]] = {
                            'id': ID,
                            'threshold': trackedMap[ID],
                            'img': item.data()['img'],
                            'title': item.data()['title'],
                            'url': item.data()['url'],
                            'price': item.data()['priceHistory'][item.data()['priceHistory'].length - 1]['price']
                        }
                    }
                }
                this.setState({
                    itemMap: itemMap,
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
        let itemMap = this.state.itemMap

        delete trackedMap[[ID]]
        delete emailMap[[email]]
        delete itemMap[[ID]]

        userDocReference.update({
            trackedMap: trackedMap
        })
        itemDocReference.update({
            emailMap: emailMap
        })

        this.setState({
            itemMap: itemMap
        })
    }

    render() {
        const itemList = Object.keys(this.state.itemMap)
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
                    itemList.length === 0 ? 
                        <div style={{fontSize: '13px', padding: '20px'}}>No Tracked Items...</div> :
                    itemList.map((ID) => <ListItem
                        key={uuidv4()}
                        scrapedData={this.state.itemMap[ID]} showButton={true}
                        onClick={this.onItemClick} />)
                }
            </div>
        )
    }
}
