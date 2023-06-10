import { Avatar } from '@mui/material';
import React, { Component } from 'react';
import './historyPanel.css';

class HistoryPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            histories: [
                {
                    img: 'https://randomuser.me/api/portraits/women/79.jpg',
                    alt: 'Maria'
                },
                {
                    img: 'https://randomuser.me/api/portraits/men/20.jpg',
                    alt: 'Martin'
                },
                {
                    img: 'https://randomuser.me/api/portraits/men/33.jpg',
                    alt: 'Gonzalo'
                },
                {
                    img: 'https://randomuser.me/api/portraits/men/54.jpg',
                    alt: 'Pablo'
                },
                {
                    img: 'https://randomuser.me/api/portraits/women/65.jpg',
                    alt: 'Natalia'
                },
                {
                    img: 'https://randomuser.me/api/portraits/men/32.jpg',
                    alt: 'Pablo'
                },
                {
                    img: 'https://randomuser.me/api/portraits/women/89.jpg',
                    alt: 'Emma'
                },
                {
                    img: 'https://randomuser.me/api/portraits/men/44.jpg',
                    alt: 'William'
                },
                {
                    img: 'https://randomuser.me/api/portraits/women/49.jpg',
                    alt: 'Cecilia'
                },
                {
                    img: 'https://randomuser.me/api/portraits/men/88.jpg',
                    alt: 'Andres'
                }
            ]
        }
    }

  render() {
    return (
      <div className='historyPanel'>
        {
            this.state.histories.map((el, index) =>
            <Avatar className='historyPanel-avatar' alt={el.alt} src={el.img} key={index} />
            )
        }
      </div>
    )
  }
}


export default HistoryPanel;