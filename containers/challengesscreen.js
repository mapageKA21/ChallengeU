import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

import Item from '../components/griditem.js';
import { setTaggableFriends } from '../actions/taggableFriends.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 55
  },
  grid: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  gridItem: {
    flex:1,
    width: 178,
    height: 178,
    margin:3
  },
  gridFirst: {
    flex:1,
    width: 360,
    height: 360,
    margin:3
  }
});


class ChallengesScreen extends React.Component {

  constructor(props) {
    super(props);

    this.challengesList = [
      {
        "name": "Ice bucket challenge",
        "pic": "http://www.oneillinstituteblog.org/wp-content/uploads/2015/07/140819-ice-bucket-challenge-1949_899e03e1c58b45b56812f96bc79680a6.jpg",
        "views": 150
      },
      {
        "name": "Cinamonn challenge",
        "pic": "http://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg",
        "views": 50
      },
      {
        "name": "Coffee challenge",
        "pic": "http://7606-presscdn-0-74.pagely.netdna-cdn.com/wp-content/uploads/2016/03/Dubai-Photos-Images-Travel-Tourist-Images-Pictures-800x600.jpg",
        "views": 20
      },
      {
        "name": "Rounded challenge",
        "pic": "http://www.gettyimages.com/landing/assets/static_content/home/info-tabs2.jpg",
        "views": 150
      },
      {
        "name": "Alcohol challenge",
        "pic": "http://www.gettyimages.com/gi-resources/images/Editorial-Images/Entertainment.jpg",
        "views": 50
      },
      {
        "name": "Boot camp challenge",
        "pic": "http://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/03/ultraviolet_image_shows_the_sun_s_intricate_atmosphere/15891756-1-eng-GB/Ultraviolet_image_shows_the_Sun_s_intricate_atmosphere_node_full_image_2.jpg",
        "views": 20
      }
    ];

    this.state = {
    };
  }

  componentDidMount() {
    this.getTaggableFriends();
    Actions.camera({challengeId: "58419a471de12b2679f4a43c"}); // Just for testing, delete please!
  }

  items = function() {
    let itemsList = [];
    for (let i = 1; i < this.challengesList.length; i++) {
      itemsList.push(
        <Item key={i}
          style={styles.gridItem}
          pic={this.challengesList[i].pic}
          name={this.challengesList[i].name} />
      )
    }
    return itemsList
  }

  action = (data) => {
    console.log(data);
    Actions.SpecificChallenge({title: 'Ice Bucket Challenge'})
  }

  getTaggableFriends = () => {
    const infoRequest = new GraphRequest(
      '/me/taggable_friends',
      null,
      this._responseInfoCallback,
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  };

  _responseInfoCallback = function(error: ?Object, result: ?Object) {
    if (error) {
      console.log('Error fetching data: ',error);
    } else {
      console.log(this);
      this.props.setTaggableFriends(result.data);
    }
  }.bind(this);

  render() {
    return (
      <TouchableOpacity onPress={this.action}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.grid}>
              <Item style={styles.gridFirst} pic={this.challengesList[0].pic} name={this.challengesList[0].name} />
              {this.items()}
            </View>
          </View>
        </ScrollView>
      </TouchableOpacity>
    );
  }
}



const mapDispatchToProps = (dispatch) => ({
  setTaggableFriends: (list) => dispatch(setTaggableFriends(list)),
});

export default connect(({routes, login})=>({routes, login}), mapDispatchToProps)(ChallengesScreen);